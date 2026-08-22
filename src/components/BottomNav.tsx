import React from "react";
import { TabType } from "../types";
import { t, Language } from "../utils/i18n";
import { motion } from "motion/react";
import { Home, Store, User, Scan } from "lucide-react";

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  userLanguage?: Language;
  userPhotoUrl?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  userLanguage = "English",
  userPhotoUrl,
}) => {
  if (currentTab === "scanner") {
    return null;
  }

  const navItems: Array<{ id: TabType; labelKey: any; iconName: string; isAction?: boolean }> = [
    { id: "home", labelKey: "home", iconName: "home" },
    { id: "animals", labelKey: "animals", iconName: "pets" },
    { id: "scanner", labelKey: "scanAnimal", iconName: "center_focus_strong", isAction: true },
    { id: "market", labelKey: "market", iconName: "storefront" },
    { id: "profile", labelKey: "profile", iconName: "person" },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 pointer-events-none pb-safe max-w-md mx-auto">
      <div className="w-full px-3 pb-2.5 pt-1 pointer-events-auto">
        <nav className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800 rounded-full p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.8)] flex items-center justify-around transition-colors duration-200">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;

            if (item.isAction) {
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange("scanner")}
                  className="w-12 h-12 -my-2 rounded-full bg-zinc-900 dark:bg-emerald-600 hover:bg-zinc-800 dark:hover:bg-emerald-500 text-white flex items-center justify-center shadow-md transition-all transform active:scale-90 hover:scale-105 cursor-pointer shrink-0 border border-zinc-700 dark:border-emerald-500/50"
                  title={t("scanAnimal", userLanguage)}
                >
                  <Scan className="w-6 h-6" />
                </button>
              );
            }

            if (item.id === "profile" && userPhotoUrl) {
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange("profile")}
                  className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all duration-200 cursor-pointer active:scale-95 flex-1 ${
                    isActive
                      ? "text-zinc-900 dark:text-white font-bold"
                      : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <div
                    className={`w-6 h-6 rounded-full overflow-hidden border ${
                      isActive
                        ? "border-zinc-900 dark:border-white ring-2 ring-zinc-900/20 dark:ring-white/20"
                        : "border-zinc-200 dark:border-zinc-700"
                    }`}
                  >
                    <img src={userPhotoUrl} alt="User" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] leading-none mt-1 font-semibold tracking-tight truncate max-w-[58px]">
                    {t("profile", userLanguage)}
                  </span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all duration-200 cursor-pointer active:scale-95 flex-1 ${
                  isActive
                    ? "text-zinc-900 dark:text-white font-bold"
                    : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span
                  className="material-symbols-outlined text-[22px] transition-transform duration-200"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.iconName}
                </span>
                <span className="text-[10px] leading-none mt-0.5 font-semibold tracking-tight truncate max-w-[58px]">
                  {t(item.labelKey, userLanguage) || item.labelKey}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default BottomNav;
