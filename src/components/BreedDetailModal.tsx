import React from "react";
import { NativeBreed, TabType } from "../types";
import { t, translateBreedName, Language } from "../utils/i18n";
import { SmartImage } from "./ui/SmartImage";
import { motion } from "motion/react";
import { X, Scan, Store, ShieldCheck, Sparkles, Award } from "lucide-react";

interface BreedDetailModalProps {
  breed: NativeBreed | null;
  onClose: () => void;
  onTabChange: (tab: TabType) => void;
  userLanguage?: Language;
}

export const BreedDetailModal: React.FC<BreedDetailModalProps> = ({
  breed,
  onClose,
  onTabChange,
  userLanguage = "English",
}) => {
  if (!breed) return null;
  const currentLang = userLanguage;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-zinc-100 dark:border-zinc-800 max-h-[90vh] flex flex-col"
      >
        {/* Top Hero Image Banner */}
        <div className="relative h-56 sm:h-64 bg-zinc-100 dark:bg-zinc-800 shrink-0">
          <SmartImage
            src={breed.imageUrl}
            alt={breed.name}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-900 via-transparent to-transparent pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-200 shadow-md flex items-center justify-center hover:bg-white dark:hover:bg-zinc-800 transition-colors z-10 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title Badges */}
          <div className="absolute bottom-2 left-4 right-4 space-y-1">
            <div className="flex flex-wrap gap-1.5 mb-1">
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full shadow-xs">
                {breed.state || "Indigenous India"}
              </span>
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-full border border-zinc-200 dark:border-zinc-700">
                {breed.status}
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white font-display leading-tight">
              {translateBreedName(breed.name, currentLang)}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              {breed.scientificName} • {breed.origin}
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto space-y-3.5 text-xs">
          {/* Quick Specs Grid */}
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
            <div className="bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-2xl border border-zinc-100 dark:border-zinc-700">
              <span className="text-[10px] text-zinc-400 block font-semibold">{t("primaryUse", currentLang)}</span>
              <span className="font-bold text-zinc-900 dark:text-white mt-0.5 block">
                {t(breed.primaryUse.toLowerCase() === "dairy" ? "dairy" : breed.primaryUse.toLowerCase() === "draught" ? "draught" : "dualPurpose", currentLang) || breed.primaryUse}
              </span>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-2xl border border-zinc-100 dark:border-zinc-700">
              <span className="text-[10px] text-zinc-400 block font-semibold">{t("milkYield", currentLang)}</span>
              <span className="font-bold text-zinc-900 dark:text-white mt-0.5 block truncate">{breed.avgMilkYield}</span>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-2xl border border-zinc-100 dark:border-zinc-700">
              <span className="text-[10px] text-zinc-400 block font-semibold">{t("climateAdapt", currentLang)}</span>
              <span className="font-bold text-zinc-900 dark:text-white mt-0.5 block truncate">{breed.climate}</span>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-2xl border border-zinc-100 dark:border-zinc-700">
              <span className="text-[10px] text-zinc-400 block font-semibold">
                {currentLang === "Tamil" ? "வெப்ப தாங்குதிறன்" : currentLang === "Hindi" ? "गर्मी सहनशीलता" : "Heat Tolerance"}
              </span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 block">{breed.heatTolerance}</span>
            </div>
          </section>

          {/* Description */}
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-100 dark:border-zinc-700 space-y-1">
            <h4 className="font-bold text-zinc-900 dark:text-white uppercase font-mono text-[11px]">
              {currentLang === "Tamil" ? "இனத்தின் கண்ணோட்டம்" : currentLang === "Hindi" ? "नस्ल अवलोकन" : "Breed Overview"}
            </h4>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">{breed.description}</p>
          </div>

          {/* Physical Characteristics */}
          {breed.physicalCharacteristics && (
            <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-100 dark:border-zinc-700 space-y-1">
              <h4 className="font-bold text-zinc-900 dark:text-white uppercase font-mono text-[11px]">
                {currentLang === "Tamil" ? "உடல் பண்புகள்" : currentLang === "Hindi" ? "शारीरिक लक्षण" : "Physical Characteristics"}
              </h4>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">{breed.physicalCharacteristics}</p>
            </div>
          )}

          {/* Disease Resistance & Productivity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {breed.diseaseResistance && (
              <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/40 space-y-1">
                <span className="text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-300 uppercase block">
                  {currentLang === "Tamil" ? "நோய் எதிர்ப்பு சக்தி" : currentLang === "Hindi" ? "रोग प्रतिरोधक क्षमता" : "Natural Immunity"}
                </span>
                <p className="text-zinc-700 dark:text-zinc-300 leading-snug">{breed.diseaseResistance}</p>
              </div>
            )}

            {breed.productivity && (
              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-100 dark:border-zinc-700 space-y-1">
                <span className="text-[10px] font-mono font-bold text-zinc-700 dark:text-zinc-300 uppercase block">
                  {currentLang === "Tamil" ? "வேலை உற்பத்தி திறன்" : currentLang === "Hindi" ? "कार्य उत्पादकता" : "Work Productivity"}
                </span>
                <p className="text-zinc-600 dark:text-zinc-300 leading-snug">{breed.productivity}</p>
              </div>
            )}
          </div>

          {/* Government Subsidies & Schemes */}
          {breed.incentivesActive && (
            <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/20 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 space-y-1.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                <h4 className="font-bold text-amber-900 dark:text-amber-300 uppercase font-mono text-[11px]">
                  {currentLang === "Tamil" ? "அரசு பாதுகாப்பு மானியங்கள்" : currentLang === "Hindi" ? "सक्रिय संरक्षण सब्सिडी" : "Active Conservation Subsidies"}
                </h4>
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {breed.incentivesDescription || "Eligible for Rashtriya Gokul Mission pedigree bull breeding assistance up to 50% capital subsidy."}
              </p>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center gap-2">
          <button
            onClick={() => {
              onClose();
              onTabChange("scanner");
            }}
            className="flex-1 py-3 bg-zinc-900 dark:bg-emerald-600 hover:bg-zinc-800 dark:hover:bg-emerald-500 text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <Scan className="w-4 h-4" />
            <span>{t("scanAnimal", currentLang)}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onTabChange("market");
            }}
            className="py-3 px-4 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs font-bold rounded-2xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Store className="w-4 h-4" />
            <span>{currentLang === "Tamil" ? "சந்தையில் காண்க" : currentLang === "Hindi" ? "बाज़ार में खोजें" : "Find in Market"}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default BreedDetailModal;
