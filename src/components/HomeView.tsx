import React, { useState } from "react";
import { TabType, Animal, UserProfile, SmartTask, NativeBreed } from "../types";
import { t, translateAnimalName, translateBreedName, translateAge, translateTime, translateTaskTitle, translateLocation, Language } from "../utils/i18n";
import { NATIVE_BREEDS } from "../data/mockData";
import { SmartImage } from "./ui/SmartImage";
import { motion, AnimatePresence } from "motion/react";
import {
  Scan,
  Plus,
  PhoneCall,
  Store,
  Brain,
  ListTodo,
  Sun,
  X,
  ChevronRight,
  Check,
  ShieldCheck,
  Award,
  Sparkles,
  Activity,
  Heart
} from "lucide-react";

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
  const healthyCattle = animals.filter(
    (a) => a.status === "Healthy" || a.healthScore >= 90
  ).length;
  const healthRate = totalCattle > 0 ? Math.round((healthyCattle / totalCattle) * 100) : 100;
  const pregnantCount = animals.filter(
    (a) =>
      (a.pregnancyStatus && a.pregnancyStatus.toLowerCase().includes("pregnant")) ||
      a.status === "Pregnant"
  ).length;
  const totalDailyMilk = animals.reduce(
    (acc, curr) => acc + (curr.dailyMilkLiters || 0),
    0
  );
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
    <main className="w-full px-4 py-4 pb-28 space-y-4 text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-200">
      {/* Toast Feedback */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Hero Executive Summary Bento Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.02)] dark:shadow-none space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
              {t("totalAnimals", currentLang)}
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white font-display tracking-tight">
                {totalCattle}
              </h2>
              <span className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                {t("registeredCattle", currentLang)}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
              {t("milkYield", currentLang)}
            </span>
            <div className="flex items-baseline justify-end gap-1 mt-0.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">
                {totalDailyMilk.toFixed(1)}
              </span>
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                {t("literPerDay", currentLang)}
              </span>
            </div>
          </div>
        </div>

        {/* Primary Biometric Action Button */}
        <button
          onClick={() => onTabChange("scanner")}
          className="w-full py-3.5 px-4 rounded-2xl bg-zinc-900 dark:bg-emerald-600 hover:bg-zinc-800 dark:hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md cursor-pointer group"
        >
          <Scan className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>{t("scanCattleBtn", currentLang)}</span>
        </button>

        {/* Secondary Metrics Strip */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-100 dark:border-zinc-800 text-xs">
          <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 min-w-0 gap-1">
            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 min-w-0">
              <Activity className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="text-[10px] sm:text-xs font-semibold truncate">{t("healthyStatus", currentLang)}</span>
            </div>
            <span className="font-mono font-extrabold text-zinc-900 dark:text-white shrink-0 text-xs sm:text-sm">
              {healthRate}%
            </span>
          </div>

          <div className="flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 min-w-0 gap-1">
            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 min-w-0">
              <Heart className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="text-[10px] sm:text-xs font-semibold truncate">{t("pregnantCattle", currentLang)}</span>
            </div>
            <span className="font-mono font-extrabold text-zinc-900 dark:text-white shrink-0 text-xs sm:text-sm">
              {pregnantCount}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Weather & Heat Alert Banner */}
      <AnimatePresence>
        {!isAlertDismissed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200/90 dark:border-amber-900/50 rounded-3xl p-4 shadow-2xs flex items-start justify-between gap-3 overflow-hidden"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <Sun className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-amber-800 dark:text-amber-300 bg-amber-200/70 dark:bg-amber-900/70 px-2 py-0.5 rounded-full">
                    {t("weatherAlert", currentLang)} (35°C)
                  </span>
                </div>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 font-medium mt-1 leading-snug">
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
              className="w-7 h-7 rounded-full bg-amber-200/60 dark:bg-amber-900/50 hover:bg-amber-200 dark:hover:bg-amber-900 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0 cursor-pointer transition-colors"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Horizontal Cattle Carousel */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-base font-bold text-zinc-900 dark:text-white font-display">
            {t("yourCattle", currentLang)}
          </h3>
          <button
            onClick={() => onTabChange("add-animal")}
            className="text-xs font-bold text-zinc-900 dark:text-emerald-400 hover:text-zinc-600 dark:hover:text-emerald-300 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t("newAnimal", currentLang)}</span>
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {animals.map((animal) => (
            <motion.div
              key={animal.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectAnimal(animal)}
              className="min-w-[220px] max-w-[220px] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-3.5 shadow-2xs flex flex-col justify-between space-y-3 cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shrink-0"
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <SmartImage
                  src={animal.photoUrl}
                  alt={animal.name}
                  className="w-full h-full"
                />
                <span className="absolute top-2 left-2 text-[10px] font-mono font-bold bg-white/95 dark:bg-black/95 text-zinc-800 dark:text-zinc-200 px-2 py-0.5 rounded-full shadow-xs">
                  {animal.tagId}
                </span>
                {animal.noseprintVerified && (
                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-zinc-900 dark:text-white font-display truncate">
                    {translateAnimalName(animal.name, currentLang)}
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    {animal.healthScore}%
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                  {translateBreedName(animal.breed, currentLang)} • {translateAge(animal.age, currentLang)}
                </p>
              </div>

              <button
                type="button"
                className="w-full py-2 bg-zinc-50 dark:bg-zinc-800/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <Award className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                <span>{t("details", currentLang)}</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. Quick Actions Hub */}
      <div className="space-y-2">
        <h3 className="text-xs font-mono font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider px-1">
          {t("quickActions", currentLang)}
        </h3>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl divide-y divide-zinc-100 dark:divide-zinc-800 shadow-[0_2px_14px_rgba(0,0,0,0.02)] dark:shadow-none overflow-hidden">
          {/* Action 1: Marketplace */}
          <button
            onClick={() => onTabChange("market")}
            className="w-full p-4 flex items-center justify-between hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50 transition-colors text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white">
                  {t("marketplace", currentLang)}
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {currentLang === "Tamil"
                    ? "மாடுகள் மற்றும் தீவனம் வாங்க, விற்க"
                    : currentLang === "Hindi"
                    ? "पशु और चारा खरीदें व बेचें"
                    : "Buy & sell cattle, green fodder & equipment"}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Action 2: Emergency Vet Call */}
          <button
            onClick={handleEmergencyVetCall}
            className="w-full p-4 flex items-center justify-between hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50 transition-colors text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white">
                  {t("emergencyVet", currentLang)} (1800-425-9000)
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {currentLang === "Tamil"
                    ? "24x7 அவசர கால்நடை மருத்துவ உதவி"
                    : currentLang === "Hindi"
                    ? "24x7 आपातकालीन पशु चिकित्सा हेल्पलाइन"
                    : "24x7 Animal Husbandry Government Helpline"}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Action 3: AI Advisor */}
          <button
            onClick={() => onTabChange("advisor")}
            className="w-full p-4 flex items-center justify-between hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50 transition-colors text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white">
                  {t("businessAdvisor", currentLang)}
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {currentLang === "Tamil"
                    ? "தீவனம், A2 பால் விலை மற்றும் அரசு மானியங்கள்"
                    : currentLang === "Hindi"
                    ? "चारा, A2 दूध मूल्य निर्धारण और सरकारी योजनाएं"
                    : "Feed planning, A2 milk pricing & subsidies"}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Action 4: Today's Tasks */}
          <button
            onClick={() => onTabChange("tasks")}
            className="w-full p-4 flex items-center justify-between hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50 transition-colors text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ListTodo className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white">
                  {t("smartTasks", currentLang)}
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {tasks.filter((t) => !t.isCompleted).length} {t("todayTasks", currentLang)}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* 5. Priority Tasks Checklist */}
      <div className="space-y-2 pt-1">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xs font-mono font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">
            {t("todayTasks", currentLang)}
          </h3>
          <button
            onClick={() => onTabChange("tasks")}
            className="text-xs font-bold text-zinc-900 dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-0.5"
          >
            <span>{t("seeAll", currentLang)}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-2 divide-y divide-zinc-50 dark:divide-zinc-800/60 shadow-2xs">
          {urgentTasks.map((task) => (
            <div
              key={task.id}
              className="p-3 flex items-start gap-3 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 rounded-2xl transition-colors"
            >
              <button
                onClick={() => onToggleTask && onToggleTask(task.id)}
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 cursor-pointer border transition-all ${
                  task.isCompleted
                    ? "bg-zinc-900 dark:bg-emerald-600 border-zinc-900 dark:border-emerald-600 text-white"
                    : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-zinc-500 text-transparent"
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] font-mono text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.2 rounded font-semibold">
                    {translateTime(task.time, currentLang)}
                  </span>
                  {task.urgent && (
                    <span className="text-[9px] font-mono font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-1.5 py-0.2 rounded">
                      {t("priorityBadge", currentLang)}
                    </span>
                  )}
                </div>
                <h4
                  className={`text-xs font-bold leading-snug truncate ${
                    task.isCompleted
                      ? "line-through text-zinc-400 dark:text-zinc-500"
                      : "text-zinc-900 dark:text-white"
                  }`}
                >
                  {translateTaskTitle(task.title, currentLang)}
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                  {translateAnimalName(task.animalName, currentLang)} • {translateLocation(task.location, currentLang)}
                </p>
              </div>
            </div>
          ))}

          {urgentTasks.length === 0 && (
            <div className="p-4 text-center text-xs text-zinc-400 dark:text-zinc-500">
              {t("allDailyTasksCompleted", currentLang)}
            </div>
          )}
        </div>
      </div>

      {/* 6. Indigenous Breed Spotlight */}
      <motion.div
        whileTap={{ scale: 0.99 }}
        onClick={() => onSelectBreed && onSelectBreed(featuredBreed)}
        className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-4 shadow-2xs flex items-center gap-3.5 cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group"
      >
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
          <SmartImage
            src={featuredBreed.imageUrl}
            alt={featuredBreed.name}
            className="w-full h-full group-hover:scale-105 transition-transform"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>{t("nativeBreedsTab", currentLang)}</span>
          </div>
          <h4 className="font-extrabold text-sm text-zinc-900 dark:text-white font-display truncate mt-0.5">
            {translateBreedName(featuredBreed.name, currentLang)}
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
            {featuredBreed.origin} • {t(featuredBreed.primaryUse.toLowerCase() === "dairy" ? "dairy" : featuredBreed.primaryUse.toLowerCase() === "draught" ? "draught" : "dualPurpose", currentLang) || featuredBreed.primaryUse}
          </p>
        </div>

        <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
      </motion.div>
    </main>
  );
};

export default HomeView;
