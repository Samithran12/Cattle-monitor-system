import { Animal, SmartTask, MarketOrder } from "../types";
import { Language } from "../utils/i18n";
import { AppNotification } from "../utils/storage";
import { LocalNotifications } from "@capacitor/local-notifications";

export interface NotificationPermissionStatus {
  granted: boolean;
  supported: boolean;
  permission: NotificationPermission;
}

export function checkNotificationPermission(): NotificationPermissionStatus {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return { granted: false, supported: false, permission: "denied" };
  }
  return {
    granted: Notification.permission === "granted",
    supported: true,
    permission: Notification.permission,
  };
}

export async function requestPushNotificationPermission(): Promise<boolean> {
  // Request Capacitor native LocalNotifications permission for mobile APK
  try {
    const localPerm = await LocalNotifications.requestPermissions();
    if (localPerm.display === "granted") {
      console.log("Capacitor LocalNotifications permission granted");
    }
  } catch (err) {
    console.warn("Capacitor LocalNotifications permission notice:", err);
  }

  if (typeof window === "undefined" || !("Notification" in window)) {
    console.warn("Native notifications are not supported on this browser.");
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      registerServiceWorker();
      sendNativePushNotification(
        "🔔 CattleIQ Real-time Alerts Active!",
        "Real-time herd health alerts, marketplace order updates, and vaccination reminders are now active."
      );
      return true;
    }
  } catch (err) {
    console.error("Failed to request notification permission:", err);
  }

  return false;
}

export function registerServiceWorker() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        console.log("CattleIQ Service Worker registered:", reg.scope);
      })
      .catch((err) => {
        console.warn("Service worker registration failed:", err);
      });
  }
}

export async function sendNativePushNotification(
  title: string,
  body: string,
  url = "/"
) {
  // 1. Send via Capacitor LocalNotifications (for native mobile Android / iOS APK)
  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          title,
          body,
          id: Math.floor(Math.random() * 1000000) + 1,
          schedule: { at: new Date(Date.now() + 500) },
          sound: undefined,
          actionTypeId: "",
          extra: { url },
        },
      ],
    });
  } catch (err) {
    console.warn("Capacitor native push notification notice:", err);
  }

  // 2. Web Notification API & Service Worker fallback
  if (typeof window === "undefined" || !("Notification" in window)) return;

  if (Notification.permission === "granted") {
    if ("navigator" in window && "serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, {
          body,
          icon: "/assets/default-avatar.svg",
          data: { url },
        });
      });
    } else {
      new Notification(title, {
        body,
        icon: "/assets/default-avatar.svg",
      });
    }
  }
}

/**
 * Real-time Dynamic Evaluation Engine:
 * Analyzes active herd state, pending orders, weather conditions, and care tasks
 * to synthesize real-time actionable notifications.
 */
export function generateRealtimeNotifications(
  animals: Animal[],
  tasks: SmartTask[],
  orders: MarketOrder[],
  existingNotifications: AppNotification[],
  userLanguage: Language = "English"
): AppNotification[] {
  const dynamicAlerts: AppNotification[] = [];
  const nowStr = "Just now";

  // 1. Real-time Vaccination & Medical Audit Check
  animals.forEach((animal) => {
    if (animal.vaccinationStatus !== "Up to Date") {
      dynamicAlerts.push({
        id: `dyn-vax-${animal.id}`,
        type: "Vaccination",
        title:
          userLanguage === "Tamil"
            ? `தடுப்பூசி எச்சரிக்கை: ${animal.name} (${animal.tagId})`
            : userLanguage === "Hindi"
            ? `टीकाकरण चेतावनी: ${animal.name} (${animal.tagId})`
            : `Vaccination Booster Overdue: ${animal.name} (${animal.tagId})`,
        description:
          userLanguage === "Tamil"
            ? `கோமாரி (FMD) தடுப்பூசி தவணை முடிவடைந்தது. பாஸ்போர்ட் திறந்து மருத்துவ பதிவை புதுப்பிக்கவும்.`
            : userLanguage === "Hindi"
            ? `खुरपका (FMD) बूस्टर टीका बकाया है। पासपोर्ट खोलकर अपडेट करें।`
            : `FMD booster vaccine is overdue. Tap to inspect Digital Passport and update medical history.`,
        time: nowStr,
        read: false,
        animalId: animal.id,
      });
    }

    if (animal.status === "Needs Attention" || animal.healthScore < 90) {
      dynamicAlerts.push({
        id: `dyn-health-${animal.id}`,
        type: "Health",
        title:
          userLanguage === "Tamil"
            ? `சுகாதார எச்சரிக்கை: ${animal.name} (மதிப்பெண் ${animal.healthScore}%)`
            : userLanguage === "Hindi"
            ? `स्वास्थ्य अलर्ट: ${animal.name} (स्कोर ${animal.healthScore}%)`
            : `Health Score Alert: ${animal.name} (${animal.healthScore}%)`,
        description:
          userLanguage === "Tamil"
            ? `உடலியல் சோர்வு காணப்படுகிறது. அவசர கால்நடை மருத்துவரை அழைக்கவும் (1800-425-9000).`
            : userLanguage === "Hindi"
            ? `स्वास्थ्य स्कोर कम है। आपातकालीन पशु चिकित्सक से संपर्क करें (1800-425-9000)।`
            : `Bovine vitality dropped to ${animal.healthScore}%. Veterinary consultation recommended (1800-425-9000).`,
        time: nowStr,
        read: false,
        animalId: animal.id,
      });
    }

    if (animal.pregnancyMonths && animal.pregnancyMonths >= 7) {
      dynamicAlerts.push({
        id: `dyn-preg-${animal.id}`,
        type: "Pregnancy",
        title:
          userLanguage === "Tamil"
            ? `முதுகர்ப்ப கவனிப்பு: ${animal.name} (${animal.pregnancyMonths} மாதங்கள்)`
            : userLanguage === "Hindi"
            ? `गर्भावस्था देखभाल: ${animal.name} (${animal.pregnancyMonths} माह)`
            : `Advanced Gestation: ${animal.name} (Month ${animal.pregnancyMonths})`,
        description:
          userLanguage === "Tamil"
            ? `பிரசவ கொட்டகை தயார் செய்து தாது உப்பு மற்றும் கால்சியம் சப்ளிமெண்ட் வழங்கவும்.`
            : userLanguage === "Hindi"
            ? `बछड़े के जन्म के लिए शेड तैयार करें और अतिरिक्त कैल्शियम दें।`
            : `Prepare calving pen and ensure daily calcium supplementation prior to parturition.`,
        time: nowStr,
        read: false,
        animalId: animal.id,
      });
    }
  });

  // 2. Real-time Urgent Task Reminders
  const urgentPendingTasks = tasks.filter((t) => !t.isCompleted && t.urgent);
  if (urgentPendingTasks.length > 0) {
    const firstTask = urgentPendingTasks[0];
    dynamicAlerts.push({
      id: `dyn-task-${firstTask.id}`,
      type: "Urgent",
      title:
        userLanguage === "Tamil"
          ? `அவசர பணி: ${firstTask.title}`
          : userLanguage === "Hindi"
          ? `प्राथमिकता कार्य: ${firstTask.title}`
          : `Priority Task Due: ${firstTask.title}`,
      description:
        userLanguage === "Tamil"
          ? `${firstTask.animalName} - நேரம்: ${firstTask.time} (${firstTask.location})`
          : `${firstTask.animalName} - Scheduled at ${firstTask.time} (${firstTask.location})`,
      time: nowStr,
      read: false,
    });
  }

  // 3. Real-time Orders Tracker Alerts
  orders.forEach((order) => {
    if (order.status !== "completed") {
      dynamicAlerts.push({
        id: `dyn-ord-${order.id}`,
        type: "Market",
        title:
          userLanguage === "Tamil"
            ? `சந்தை ஆர்டர்: #${order.id} (${order.itemTitle})`
            : userLanguage === "Hindi"
            ? `बाज़ार ऑर्डर: #${order.id} (${order.itemTitle})`
            : `Marketplace Order #${order.id} (${order.itemTitle})`,
        description:
          userLanguage === "Tamil"
            ? `நிலை: ${order.status.toUpperCase()} • விற்பனையாளர்: ${order.sellerName}. நேரலை கண்காணிப்பு கிடைக்கிறது.`
            : `Status: ${order.status.toUpperCase()} • Seller: ${order.sellerName}. Live dispatch tracking enabled.`,
        time: nowStr,
        read: false,
        orderId: order.id,
      });
    }
  });

  // 4. Real-time Weather / Heat Index Surge Alert
  dynamicAlerts.push({
    id: `dyn-weather-heat`,
    type: "Weather",
    title:
      userLanguage === "Tamil"
        ? `வெப்ப அலை எச்சரிக்கை (35°C)`
        : userLanguage === "Hindi"
        ? `उच्च तापमान चेतावनी (35°C)`
        : `High Temperature Alert (35°C)`,
    description:
      userLanguage === "Tamil"
        ? `பிற்பகல் 12:00 முதல் 3:00 வரை கொட்டகை நீர் தெளிப்பான் இயக்கி குளிர்நீர் வழங்கவும்.`
        : userLanguage === "Hindi"
        ? `दोपहर में शेड स्प्रिंकलर चालू रखें और भरपूर पीने का पानी सुनिश्चित करें।`
        : `Activate shed cooling sprinklers between 12:00 PM and 3:00 PM to mitigate heat stress.`,
    time: "Today",
    read: true,
  });

  // Merge with existing user-read state
  const readIds = new Set(existingNotifications.filter((n) => n.read).map((n) => n.id));
  const userCreated = existingNotifications.filter((n) => !n.id.startsWith("dyn-"));

  const finalMerged: AppNotification[] = [
    ...dynamicAlerts.map((d) => ({
      ...d,
      read: readIds.has(d.id),
    })),
    ...userCreated,
  ];

  return finalMerged;
}
