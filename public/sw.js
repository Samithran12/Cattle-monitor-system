// Service Worker for CattleIQ PWA & Push Notifications
const CACHE_NAME = "cattleiq-pwa-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Handle incoming Push Notifications
self.addEventListener("push", (event) => {
  let data = { title: "CattleIQ Herd Notification", body: "Check your herd intelligence dashboard for updates." };
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || "https://lh3.googleusercontent.com/aida-public/AB6AXuAwXOIlrj2VA7zolpbseS7fMuqgdNXfkaOFPFNS0VWmkiqfLntFLK5th1upyD6ikBge6kDafP65zRkpM_jyy8BwwnPVg5xtR3KQxCIz7dJUFx4tYgzDAHAXNA5CGMZ-QGMID-4dx0M3y7Hq0s8ublwsT92IfgRcNuwvK4rHNBhoZgDoCdMMM3dbpREuDJhJU-tX2FvFnaVWwjXs4hgIaaMJnvlSdFvcy1yExTgMy2ZI-yBQQ7W6Eg9P5fjBsDYL8gXUvz5MZenzM_s",
    badge: data.badge || "https://lh3.googleusercontent.com/aida-public/AB6AXuAwXOIlrj2VA7zolpbseS7fMuqgdNXfkaOFPFNS0VWmkiqfLntFLK5th1upyD6ikBge6kDafP65zRkpM_jyy8BwwnPVg5xtR3KQxCIz7dJUFx4tYgzDAHAXNA5CGMZ-QGMID-4dx0M3y7Hq0s8ublwsT92IfgRcNuwvK4rHNBhoZgDoCdMMM3dbpREuDJhJU-tX2FvFnaVWwjXs4hgIaaMJnvlSdFvcy1yExTgMy2ZI-yBQQ7W6Eg9P5fjBsDYL8gXUvz5MZenzM_s",
    vibrate: [200, 100, 200],
    data: {
      url: data.url || "/"
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle clicking on notification
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow("/");
      }
    })
  );
});
