import React, { useState } from "react";
import { TabType, Animal, UserProfile, SmartTask, NativeBreed } from "../types";
import { t, translateAnimalName, translateBreedName, Language } from "../utils/i18n";
import { NATIVE_BREEDS } from "../data/mockData";
import { SmartImage } from "./ui/SmartImage";

interface HomeViewProps {
  onTabChange: (tab: TabType) => void;
  user: UserProfile;
  animals: Animal[];
  tasks: SmartTask[];
  onToggleTask?: (taskId: string) => void;
  onSelectAnimal: (animal: Animal) => void;
  onRefreshData?: () => void;
  onSelectBreed?: (breed: NativeBreed) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onTabChange,
  user,
  animals,
  tasks,
  onToggleTask,
  onSelectAnimal,
  onSelectBreed,
}) => {
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isAlertDismissed, setIsAlertDismissed] = useState<boolean>(false);
  const currentLang: Language = (user.language as Language) || "English";

  const totalCattle = animals.length;
  const healthyCattle = animals.filter((a) => a.status === "Healthy" || a.healthScore >= 90).length;
  const pregnantCount = animals.filter(
    (a) => a.pregnancyStatus && a.pregnancyStatus.toLowerCase().includes("pregnant")
  ).length;
  const totalDailyMilk = animals.reduce((acc, curr) => acc + (curr.dailyMilkLiters || 0), 0);
  const urgentTasks = tasks.filter((t) => !t.isCompleted).slice(0, 3);
  const featuredBreed = NATIVE_BREEDS[0]; // Kangayam

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleEmergencyVetCall = () => {
    window.location.href = "tel:18004259000";
    showToast(
      currentLang === "Tamil"
        ? "அவசர கால்நடை மருத்துவ உதவி: 1800-425-9000"
        : currentLang === "Hindi"
        ? "आपातकालीन पशु चिकित्सा हेल्पलाइन: 1800-425-9000"
        : "Dialing 24x7 Animal Husbandry Helpline: 1800-425-9000"
    );
  };

  return (
    <main className="w-full px-4 py-4 pb-28 space-y-4 text-slate-900 font-sans">
      {/* Toast Feedback */}
      {toastMsg && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-2xl animate-fade-in flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-emerald-400">check_circle</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 1. Hero Summary Card */}
      <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-[0_2px_14px_rgba(15,23,42,0.03)] space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 block">
              {t("totalAnimals", currentLang)}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display mt-0.5 tracking-tight">
              {totalCattle} <span className="text-lg font-semibold text-slate-500">Cattle</span>
            </h2>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase">
              {t("milkYield", currentLang)}
            </span>
            <span className="text-lg font-bold text-emerald-600 font-display">
              {totalDailyMilk.toFixed(1)} L <span className="text-xs text-slate-500 font-normal">/ day</span>
            </span>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={() => onTabChange("scanner")}
          className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">center_focus_strong</span>
          <span>{t("scanAnimal", currentLang)}</span>
        </button>

        {/* Secondary Metrics Strip */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
            <span className="text-slate-500">{t("healthyStatus", currentLang)}</span>
            <span className="font-bold text-slate-900">{healthyCattle}/{totalCattle}</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
            <span className="text-slate-500">{t("pregnantCattle", currentLang)}</span>
            <span className="font-bold text-slate-900">{pregnantCount}</span>
          </div>
        </div>
      </div>

      {/* 2. Refined Weather & Heat Alert Card */}
      {!isAlertDismissed && (
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-4 shadow-xs flex items-start justify-between gap-3 animate-fade-in">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-700 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-xl">wb_sunny</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full">
                  {t("weatherAlert", currentLang)} (35°C)
                </span>
              </div>
              <p className="text-xs text-slate-700 font-medium mt-1 leading-snug">
                {currentLang === "Tamil"
                  ? "பிற்பகலில் மாடுகளுக்கு தண்ணீர் தெளிப்பு & நிழல் வசதி அமைக்கவும்."
                  : currentLang === "Hindi"
                  ? "दोपहर 12 से 3 बजे के बीच शेड में पानी का छिड़काव चालू रखें।"
                  : "Activate shed water misting between 12:00 PM and 3:00 PM to prevent heat stress."}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAlertDismissed(true)}
            className="w-7 h-7 rounded-full bg-amber-200/50 hover:bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 cursor-pointer"
            title="Dismiss"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      )}

      {/* 3. Horizontal Cattle Cards Section */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-base font-bold text-slate-900 font-display">
            {t("yourCattle", currentLang)}
          </h3>
          <button
            onClick={() => onTabChange("add-animal")}
            className="text-xs font-bold text-slate-900 hover:text-slate-600 flex items-center gap-0.5 cursor-pointer"
          >
            <span>+</span>
            <span>{t("newAnimal", currentLang)}</span>
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {animals.map((animal) => (
            <div
              key={animal.id}
              onClick={() => onSelectAnimal(animal)}
              className="min-w-[220px] max-w-[220px] bg-white border border-slate-100 rounded-3xl p-3.5 shadow-xs flex flex-col justify-between space-y-3 cursor-pointer hover:border-slate-300 transition-all shrink-0"
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100">
                <SmartImage
                  src={animal.photoUrl}
                  alt={animal.name}
                  className="w-full h-full"
                />
                <span className="absolute top-2 left-2 text-[10px] font-mono font-bold bg-white/95 text-slate-800 px-2 py-0.5 rounded-full shadow-xs">
                  {animal.tagId}
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-slate-900 font-display truncate">
                    {translateAnimalName(animal.name, currentLang)}
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {animal.healthScore}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {translateBreedName(animal.breed, currentLang)} • {animal.age}
                </p>
              </div>

              <button
                type="button"
                className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">badge</span>
                <span>{t("details", currentLang)}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Grouped Navigation Menu */}
      <div className="space-y-2">
        <h3 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider px-1">
          {t("quickActions", currentLang)}
        </h3>

        <div className="bg-white border border-slate-100 rounded-3xl divide-y divide-slate-100 shadow-[0_2px_14px_rgba(15,23,42,0.03)] overflow-hidden">
          {/* Action 1: Marketplace */}
          <button
            onClick={() => onTabChange("market")}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50/80 transition-colors text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">storefront</span>
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                  {t("marketplace", currentLang)}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {currentLang === "Tamil" ? "மாடுகள் மற்றும் தீவனம் வாங்க, விற்க" : currentLang === "Hindi" ? "पशु और चारा खरीदें व बेचें" : "Buy & sell cattle and green fodder"}
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-lg">chevron_right</span>
          </button>

          {/* Action 2: Emergency Vet Call */}
          <button
            onClick={handleEmergencyVetCall}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50/80 transition-colors text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">call</span>
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                  {t("emergencyVet", currentLang)} (1800-425-9000)
                </h4>
                <p className="text-[11px] text-slate-500">
                  {currentLang === "Tamil" ? "24x7 அவசர கால்நடை மருத்துவ உதவி" : currentLang === "Hindi" ? "24x7 आपातकालीन पशु चिकित्सा हेल्पलाइन" : "24x7 Animal Husbandry Helpline"}
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-lg">chevron_right</span>
          </button>

          {/* Action 3: AI Advisor */}
          <button
            onClick={() => onTabChange("advisor")}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50/80 transition-colors text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">psychology</span>
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                  {t("businessAdvisor", currentLang)}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {currentLang === "Tamil" ? "தீவனம், A2 பால் விலை மற்றும் அரசு மானியங்கள்" : currentLang === "Hindi" ? "चारा, A2 दूध मूल्य निर्धारण और सरकारी योजनाएं" : "Feed planning, A2 milk pricing & subsidies"}
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-lg">chevron_right</span>
          </button>

          {/* Action 4: Today's Tasks */}
          <button
            onClick={() => onTabChange("tasks")}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50/80 transition-colors text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">task_alt</span>
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                  {t("smartTasks", currentLang)}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {tasks.filter((t) => !t.isCompleted).length} {t("todayTasks", currentLang)}
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-lg">chevron_right</span>
          </button>
        </div>
      </div>

      {/* 5. Priority Tasks Checklist */}
      <div className="space-y-2 pt-1">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
            {t("todayTasks", currentLang)}
          </h3>
          <button
            onClick={() => onTabChange("tasks")}
            className="text-xs font-bold text-slate-900 hover:underline"
          >
            {t("seeAll", currentLang)} →
          </button>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-2 divide-y divide-slate-50 shadow-xs">
          {urgentTasks.map((task) => (
            <div
              key={task.id}
              className="p-3 flex items-start gap-3 hover:bg-slate-50/50 rounded-2xl transition-colors"
            >
              <button
                onClick={() => onToggleTask && onToggleTask(task.id)}
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 cursor-pointer border ${
                  task.isCompleted
                    ? "bg-slate-900 border-slate-900 text-white"
                    : "border-slate-300 hover:border-slate-900 text-transparent"
                }`}
              >
                <span className="material-symbols-outlined text-xs font-bold">check</span>
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.2 rounded font-semibold">
                    {task.time}
                  </span>
                  {task.urgent && (
                    <span className="text-[9px] font-mono font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                      PRIORITY
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug truncate">
                  {task.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {translateAnimalName(task.animalName, currentLang)} • {task.location}
                </p>
              </div>
            </div>
          ))}

          {urgentTasks.length === 0 && (
            <div className="p-4 text-center text-xs text-slate-400">
              All daily care tasks completed.
            </div>
          )}
        </div>
      </div>

      {/* 6. Indigenous Breed Spotlight */}
      <div
        onClick={() => onSelectBreed && onSelectBreed(featuredBreed)}
        className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs flex items-center gap-3.5 cursor-pointer hover:border-slate-300 transition-all"
      >
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
          <SmartImage
            src={featuredBreed.imageUrl}
            alt={featuredBreed.name}
            className="w-full h-full"
          />
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider block">
            {t("nativeBreedsTab", currentLang)}
          </span>
          <h4 className="font-extrabold text-sm text-slate-900 font-display truncate">
            {translateBreedName(featuredBreed.name, currentLang)}
          </h4>
          <p className="text-xs text-slate-500 truncate">
            {featuredBreed.origin} • {featuredBreed.primaryUse}
          </p>
        </div>

        <span className="material-symbols-outlined text-slate-400 text-lg shrink-0">
          chevron_right
        </span>
      </div>
    </main>
  );
};

export default HomeView;
