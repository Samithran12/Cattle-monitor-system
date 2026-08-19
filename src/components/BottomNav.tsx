import React from "react";
import { TabType } from "../types";
import { t, Language } from "../utils/i18n";

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

  const navItems: Array<{ id: TabType; labelKey: any; icon: string; isAction?: boolean }> = [
    { id: "home", labelKey: "home", icon: "home" },
    { id: "animals", labelKey: "animals", icon: "pets" },
    { id: "scanner", labelKey: "scanAnimal", icon: "center_focus_strong", isAction: true },
    { id: "market", labelKey: "market", icon: "storefront" },
    { id: "profile", labelKey: "profile", icon: "person" },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 pointer-events-none pb-safe max-w-md mx-auto">
      <div className="w-full px-3 pb-2.5 pt-1 pointer-events-auto">
        <nav className="bg-white/95 backdrop-blur-2xl border border-slate-200/80 rounded-full p-1.5 shadow-[0_12px_36px_rgba(15,23,42,0.08)] flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;

            if (item.isAction) {
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange("scanner")}
                  className="w-12 h-12 -my-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center shadow-md transition-all transform active:scale-90 hover:scale-105 cursor-pointer shrink-0 border border-slate-700"
                  title={t("scanAnimal", userLanguage)}
                >
                  <span className="material-symbols-outlined text-2xl font-bold">
                    {item.icon}
                  </span>
                </button>
              );
            }

            if (item.id === "profile" && userPhotoUrl) {
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange("profile")}
                  className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all duration-200 cursor-pointer active:scale-95 flex-1 ${
                    isActive ? "text-slate-900 font-bold" : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full overflow-hidden border ${isActive ? "border-slate-900 ring-2 ring-slate-900/20" : "border-slate-200"}`}>
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
                    ? "text-slate-900 font-bold"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-slate-100 rounded-full -z-10 animate-fade-in" />
                )}
                <span
                  className="material-symbols-outlined text-[22px] transition-transform duration-200"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
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
