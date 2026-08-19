import React from "react";
import { UserProfile, TabType } from "../types";
import { t, Language } from "../utils/i18n";
import { requestPushNotificationPermission } from "../services/notificationService";

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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-100 px-4 py-3 w-full pt-safe">
      <div className="w-full flex items-center justify-between gap-2.5">
        {/* Left Branding & User Greeting */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <button
            onClick={() => onTabChange("profile")}
            className="relative w-11 h-11 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center shrink-0 hover:opacity-90 transition-all cursor-pointer group active:scale-95 shadow-sm"
            title="Open Profile"
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
            <h1 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight leading-tight truncate font-display">
              {currentTab === "home"
                ? `${t("goodMorning", currentLang)}, ${user.name.split(" ")[0]}`
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
            <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
              {currentTab === "home" ? user.farmName || "CattleIQ Herd" : "CattleIQ"}
            </p>
          </div>
        </div>

        {/* Right Actions: Language Switcher & Notification Button */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language Switcher Pill */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200/60">
            {(["English", "Tamil", "Hindi"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => onLanguageChange?.(lang)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  currentLang === lang
                    ? "bg-slate-900 text-white font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {lang === "Tamil" ? "தமிழ்" : lang === "Hindi" ? "हिंदी" : "EN"}
              </button>
            ))}
          </div>

          {/* Rounded Notification Button */}
          <button
            onClick={() => {
              requestPushNotificationPermission();
              onToggleNotifications();
            }}
            className="relative w-10 h-10 flex items-center justify-center rounded-2xl bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer border border-slate-200 active:scale-95 shrink-0 shadow-xs"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center px-0.5 ring-2 ring-white">
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
