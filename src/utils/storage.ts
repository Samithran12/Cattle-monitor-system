import { Animal, SmartTask, UserProfile, AdvisorMessage, MarketListing, MarketOrder } from "../types";
import {
  INITIAL_ANIMALS,
  INITIAL_TASKS,
  INITIAL_ORDERS,
  MARKET_LISTINGS,
} from "../data/mockData";

export interface AppNotification {
  id: string;
  type: "Vaccination" | "Pregnancy" | "Health" | "Market" | "Weather" | "Scheme" | "Urgent";
  title: string;
  description: string;
  time: string;
  read: boolean;
  animalId?: string;
  orderId?: string;
}

export const INITIAL_USER: UserProfile = {
  name: "S. Dhanush Kumar",
  farmName: "Kongu Indigenous Cattle Farm",
  location: "Dharapuram, Tiruppur Dist, Tamil Nadu",
  email: "dhanush.farm@cattleiq.in",
  mobile: "+91 98422 13456",
  totalAnimals: 4,
  totalRevenue: "₹1.48L",
  growth: "96%",
  language: "English",
  photoUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAwXOIlrj2VA7zolpbseS7fMuqgdNXfkaOFPFNS0VWmkiqfLntFLK5th1upyD6ikBge6kDafP65zRkpM_jyy8BwwnPVg5xtR3KQxCIz7dJUFx4tYgzDAHAXNA5CGMZ-QGMID-4dx0M3y7Hq0s8ublwsT92IfgRcNuwvK4rHNBhoZgDoCdMMM3dbpREuDJhJU-tX2FvFnaVWwjXs4hgIaaMJnvlSdFvcy1yExTgMy2ZI-yBQQ7W6Eg9P5fjBsDYL8gXUvz5MZenzM_s",
};

const STORAGE_KEYS = {
  ANIMALS: "cattleiq_animals",
  TASKS: "cattleiq_tasks",
  USER: "cattleiq_user",
  ADVISOR_MESSAGES: "cattleiq_advisor_messages",
  DARK_MODE: "cattleiq_dark_mode",
  NOTIFICATIONS: "cattleiq_notifications",
  MARKET: "cattleiq_market_listings",
  ORDERS: "cattleiq_market_orders",
};

export const loadStoredOrders = (): MarketOrder[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("Failed to load stored orders", e);
  }
  return INITIAL_ORDERS;
};

export const saveStoredOrders = (orders: MarketOrder[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  } catch (e) {
    console.error("Failed to save orders", e);
  }
};

export const loadStoredMarketListings = (): MarketListing[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MARKET);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("Failed to load stored market listings", e);
  }
  return MARKET_LISTINGS;
};

export const saveStoredMarketListings = (listings: MarketListing[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.MARKET, JSON.stringify(listings));
  } catch (e) {
    console.error("Failed to save market listings", e);
  }
};

export const loadStoredAnimals = (): Animal[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ANIMALS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("Failed to load stored animals", e);
  }
  return INITIAL_ANIMALS;
};

export const saveStoredAnimals = (animals: Animal[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ANIMALS, JSON.stringify(animals));
  } catch (e) {
    console.error("Failed to save animals", e);
  }
};

export const loadStoredTasks = (): SmartTask[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("Failed to load stored tasks", e);
  }
  return INITIAL_TASKS;
};

export const saveStoredTasks = (tasks: SmartTask[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (e) {
    console.error("Failed to save tasks", e);
  }
};

export const loadStoredUser = (): UserProfile => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...INITIAL_USER, ...parsed };
    }
  } catch (e) {
    console.warn("Failed to load stored user", e);
  }
  return INITIAL_USER;
};

export const saveStoredUser = (user: UserProfile) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (e) {
    console.error("Failed to save user", e);
  }
};

export const loadStoredAdvisorMessages = (): AdvisorMessage[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADVISOR_MESSAGES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("Failed to load stored advisor messages", e);
  }
  return [
    {
      id: "ai-welcome",
      sender: "ai",
      time: "Just now",
      text: "வணக்கம்! I am your CattleIQ Indigenous Livestock Farming Advisor. Ask me anything about Kangayam or Gir feeding rations, summer heat protection, A2 milk pricing, or Rashtriya Gokul Mission subsidies.",
      suggestions: [
        "Kangayam cow feed ration",
        "Summer heat protection in Tamil Nadu",
        "How to apply for Gokul Mission subsidy",
      ],
    },
  ];
};

export const saveStoredAdvisorMessages = (messages: AdvisorMessage[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ADVISOR_MESSAGES, JSON.stringify(messages));
  } catch (e) {
    console.error("Failed to save advisor messages", e);
  }
};

export const loadStoredDarkMode = (): boolean => {
  return true; // Always Dark / Black themed
};

export const saveStoredDarkMode = (_isDark: boolean) => {
  // Persistence for consistency
};

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: "notif-1",
    type: "Vaccination",
    title: "Foot and Mouth (FMD) Booster Due",
    description: "Sundari (TN-BRG-104) is due for 6-month FMD vaccination booster this week.",
    time: "Today, 08:30 AM",
    read: false,
    animalId: "c-104",
  },
  {
    id: "notif-2",
    type: "Market",
    title: "Marketplace Order Accepted",
    description: "Your order for Purebred Kangayam Cow (ORD-8921) has been accepted by K. Palanisamy.",
    time: "Yesterday, 04:30 PM",
    read: false,
    orderId: "ORD-8921",
  },
  {
    id: "notif-3",
    type: "Weather",
    title: "High Heat Stress Warning (36°C)",
    description: "Heat index surge in Tiruppur/Coimbatore. Activate shed sprinklers between 12:00 PM and 03:00 PM.",
    time: "Yesterday",
    read: true,
  },
];

export const loadStoredNotifications = (): AppNotification[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn("Failed to load notifications", e);
  }
  return INITIAL_NOTIFICATIONS;
};

export const saveStoredNotifications = (notifs: AppNotification[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  } catch (e) {
    console.error("Failed to save notifications", e);
  }
};
