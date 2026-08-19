import { Animal } from "../types";
import { Language } from "../utils/i18n";
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
        "🔔 CattleIQ Notifications Enabled!",
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
          schedule: { at: new Date(Date.now() + 600) }, // Trigger in 600ms on mobile OS
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
          icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwXOIlrj2VA7zolpbseS7fMuqgdNXfkaOFPFNS0VWmkiqfLntFLK5th1upyD6ikBge6kDafP65zRkpM_jyy8BwwnPVg5xtR3KQxCIz7dJUFx4tYgzDAHAXNA5CGMZ-QGMID-4dx0M3y7Hq0s8ublwsT92IfgRcNuwvK4rHNBhoZgDoCdMMM3dbpREuDJhJU-tX2FvFnaVWwjXs4hgIaaMJnvlSdFvcy1yExTgMy2ZI-yBQQ7W6Eg9P5fjBsDYL8gXUvz5MZenzM_s",
          data: { url },
        });
      });
    } else {
      new Notification(title, {
        body,
        icon: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwXOIlrj2VA7zolpbseS7fMuqgdNXfkaOFPFNS0VWmkiqfLntFLK5th1upyD6ikBge6kDafP65zRkpM_jyy8BwwnPVg5xtR3KQxCIz7dJUFx4tYgzDAHAXNA5CGMZ-QGMID-4dx0M3y7Hq0s8ublwsT92IfgRcNuwvK4rHNBhoZgDoCdMMM3dbpREuDJhJU-tX2FvFnaVWwjXs4hgIaaMJnvlSdFvcy1yExTgMy2ZI-yBQQ7W6Eg9P5fjBsDYL8gXUvz5MZenzM_s",
      });
    }
  }
}

export function notifyOrderPlaced(orderId: string, itemTitle: string) {
  sendNativePushNotification(
    `📦 New Order Placed (${orderId})`,
    `Your order for "${itemTitle}" has been sent to seller for confirmation.`
  );
}

export function notifyOrderStatusChanged(orderId: string, status: string, itemTitle: string) {
  sendNativePushNotification(
    `🔔 Order ${status.toUpperCase()} (${orderId})`,
    `Order for "${itemTitle}" is now marked as ${status}.`
  );
}

export function notifyWeatherHeatAlert(temperature: number) {
  sendNativePushNotification(
    `☀️ High Heat Alert (${temperature}°C)`,
    `High afternoon temperature detected. Activate shed water sprinklers and ensure cool drinking water.`
  );
}

export function notifyNewTaskCreated(
  taskTitle: string,
  animalName: string,
  scheduledTime: string
) {
  const title = `⏰ Reminder Active: ${taskTitle}`;
  const body = `Scheduled for ${animalName} at ${scheduledTime}. Live alert dispatched to mobile.`;
  sendNativePushNotification(title, body);
}

export function triggerHerdPushCheck(animals: Animal[], userLanguage: Language = "English") {
  const overdueVaccine = animals.find((a) => a.vaccinationStatus !== "Up to Date");
  const needsAttention = animals.find((a) => a.status === "Needs Attention" || a.healthScore < 85);

  if (overdueVaccine) {
    const title = userLanguage === "Tamil" ? `🚨 தடுப்பூசி எச்சரிக்கை - ${overdueVaccine.name}` : userLanguage === "Hindi" ? `🚨 टीकाकरण चेतावनी - ${overdueVaccine.name}` : `🚨 Vaccination Booster Alert - ${overdueVaccine.name}`;
    const body = userLanguage === "Tamil" ? `கோமாரி (FMD) தடுப்பூசி பாக்கி. பாஸ்போர்ட் மற்றும் மருத்துவக் குறிப்பைப் பார்வையிடவும்.` : userLanguage === "Hindi" ? `खुरपका-मुंहपका (FMD) बूस्टर बकाया है। पासपोर्ट देखें।` : `FMD vaccination booster overdue. Tap to view official digital passport.`;
    sendNativePushNotification(title, body);
    return;
  }

  if (needsAttention) {
    const title = userLanguage === "Tamil" ? `⚠️ சுகாதார எச்சரிக்கை - ${needsAttention.name}` : userLanguage === "Hindi" ? `⚠️ स्वास्थ्य चेतावनी - ${needsAttention.name}` : `⚠️ Health Alert - ${needsAttention.name}`;
    const body = userLanguage === "Tamil" ? `ஆரோக்கிய நிலை ${needsAttention.healthScore}%. கால்நடை மருத்துவர் பரிசோதனை தேவை.` : userLanguage === "Hindi" ? `स्वास्थ्य स्कोर ${needsAttention.healthScore}%. डॉक्टर निरीक्षण आवश्यक।` : `Health score is ${needsAttention.healthScore}%. Vet inspection recommended.`;
    sendNativePushNotification(title, body);
  }
}
