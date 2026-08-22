import { doc, setDoc, deleteDoc, db } from "../lib/firebase";

export interface PendingSyncItem {
  id: string;
  collectionName: "animals" | "tasks" | "orders" | "listings" | "users";
  docId: string;
  operation: "set" | "delete";
  data?: any;
  timestamp: string;
  retryCount?: number;
  lastAttempt?: string;
}

const SYNC_QUEUE_KEY = "cattleiq_pending_sync_queue";
const MAX_RETRY_ATTEMPTS = 5;

export function loadPendingSyncQueue(): PendingSyncItem[] {
  try {
    const raw = localStorage.getItem(SYNC_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePendingSyncQueue(queue: PendingSyncItem[]): void {
  try {
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
  } catch (e) {
    console.warn("Error saving sync queue:", e);
  }
}

export function getPendingSyncCount(): number {
  return loadPendingSyncQueue().length;
}

export function enqueueSyncOperation(
  collectionName: PendingSyncItem["collectionName"],
  docId: string,
  operation: "set" | "delete",
  data?: any
): void {
  const queue = loadPendingSyncQueue();
  // Filter out any duplicate pending operations on the exact same doc
  const filtered = queue.filter(
    (item) => !(item.collectionName === collectionName && item.docId === docId)
  );

  const newItem: PendingSyncItem = {
    id: `sync-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    collectionName,
    docId,
    operation,
    data: data
      ? {
          ...data,
          lastClientSyncAt: new Date().toISOString(),
        }
      : undefined,
    timestamp: new Date().toISOString(),
    retryCount: 0,
  };

  filtered.push(newItem);
  savePendingSyncQueue(filtered);
}

export async function flushSyncQueue(): Promise<number> {
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    return 0;
  }

  const queue = loadPendingSyncQueue();
  if (queue.length === 0) return 0;

  let syncedCount = 0;
  const remainingQueue: PendingSyncItem[] = [];

  for (const item of queue) {
    try {
      const docRef = doc(db, item.collectionName, item.docId);
      if (item.operation === "set" && item.data) {
        await setDoc(docRef, item.data, { merge: true });
        syncedCount++;
      } else if (item.operation === "delete") {
        await deleteDoc(docRef);
        syncedCount++;
      }
    } catch (err) {
      const currentRetries = (item.retryCount || 0) + 1;
      console.warn(
        `Sync attempt ${currentRetries} failed for ${item.collectionName}/${item.docId}:`,
        err
      );

      if (currentRetries < MAX_RETRY_ATTEMPTS) {
        remainingQueue.push({
          ...item,
          retryCount: currentRetries,
          lastAttempt: new Date().toISOString(),
        });
      } else {
        console.error(
          `Max retries (${MAX_RETRY_ATTEMPTS}) reached for ${item.collectionName}/${item.docId}. Evicting to preserve queue.`
        );
      }
    }
  }

  savePendingSyncQueue(remainingQueue);
  return syncedCount;
}

// Auto-register window online listener to flush queue automatically
if (typeof window !== "undefined") {
  window.addEventListener("online", () => {
    flushSyncQueue().then((count) => {
      if (count > 0) {
        console.log(`[CattleIQ Offline Sync] Auto-synced ${count} offline changes to Firestore.`);
      }
    });
  });
}
