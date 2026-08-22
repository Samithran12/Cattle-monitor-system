import React from "react";
import { UserProfile, TabType } from "../types";
import { t, translateFarmName, Language } from "../utils/i18n";
import { requestPushNotificationPermission } from "../services/notificationService";
import { Bell } from "lucide-react";

interface HeaderProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  user: UserProfile;
  unreadNotificationsCount?: number;
  onToggleNotifications: () => void;
  onLanguageChange?: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  user,
  unreadNotificationsCount = 0,
  onToggleNotifications,
  onLanguageChange,
}) => {
  const currentLang = (user.language as Language) || "English";

  if (currentTab === "scanner") {
    return null;
  }

  const firstName = user.name ? user.name.split(" ").filter(Boolean)[0] : "Farmer";

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800/90 px-3 sm:px-4 py-2.5 sm:py-3 w-full pt-safe transition-colors duration-200">
      <div className="w-full flex items-center justify-between gap-2">
        {/* Left Branding & User Greeting */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <button
            onClick={() => onTabChange("profile")}
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center shrink-0 hover:opacity-90 transition-all cursor-pointer group active:scale-95 shadow-xs"
            title={t("profile", currentLang)}
          >
            <img
              src={user.photoUrl}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </button>

          <div
            onClick={() => onTabChange("home")}
            className="cursor-pointer min-w-0 flex-1 text-left"
          >
            <h1 className="font-extrabold text-xs sm:text-sm md:text-base text-zinc-900 dark:text-white tracking-tight leading-tight truncate font-display">
              {currentTab === "home"
                ? `${t("goodMorning", currentLang)}, ${firstName}`
                : currentTab === "market"
                ? t("marketplaceTitle", currentLang)
                : currentTab === "animals"
                ? t("myHerdTab", currentLang)
                : currentTab === "advisor"
                ? t("aiAdvisor", currentLang)
                : currentTab === "profile"
                ? t("profile", currentLang)
                : currentTab === "tasks"
                ? t("smartTasks", currentLang)
                : "CattleIQ"}
            </h1>
            <p className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 font-medium truncate mt-0.5">
              {currentTab === "home"
                ? translateFarmName(user.farmName, currentLang) || t("farmSubtitle", currentLang)
                : t("cattleIqSubtitle", currentLang)}
            </p>
          </div>
        </div>

        {/* Right Actions: Language Switcher & Notification Button */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Language Switcher Pill */}
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 p-0.5 rounded-full border border-zinc-200/80 dark:border-zinc-800">
            {(["English", "Tamil", "Hindi"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => onLanguageChange?.(lang)}
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-semibold transition-all cursor-pointer ${
                  currentLang === lang
                    ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {lang === "Tamil" ? "தமிழ்" : lang === "Hindi" ? "हिंदी" : "EN"}
              </button>
            ))}
          </div>

          {/* Notification Button */}
          <button
            onClick={() => {
              requestPushNotificationPermission();
              onToggleNotifications();
            }}
            className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-2xl bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer border border-zinc-200 dark:border-zinc-800 active:scale-95 shrink-0 shadow-2xs"
            aria-label={t("alertsNotifications", currentLang)}
          >
            <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[15px] h-[15px] bg-red-500 text-white text-[8px] font-black rounded-full flex items-center justify-center px-0.5 ring-2 ring-white dark:ring-black animate-pulse">
                {unreadNotificationsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
