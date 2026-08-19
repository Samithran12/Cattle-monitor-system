import React from "react";
import { NativeBreed, TabType } from "../types";
import { t, translateBreedName, Language } from "../utils/i18n";
import { SmartImage } from "./ui/SmartImage";

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
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col animate-slide-up">
        {/* Top Hero Image Banner */}
        <div className="relative h-56 sm:h-64 bg-slate-100 shrink-0">
          <SmartImage
            src={breed.imageUrl}
            alt={breed.name}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-slate-700 shadow-md flex items-center justify-center hover:bg-white transition-colors z-10 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>

          {/* Title Badges */}
          <div className="absolute bottom-2 left-4 right-4 space-y-1">
            <div className="flex flex-wrap gap-1.5 mb-1">
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 bg-slate-900 text-white rounded-full shadow-xs">
                {breed.state || "Indigenous India"}
              </span>
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 bg-slate-100 text-slate-800 rounded-full border border-slate-200">
                {breed.status}
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 font-display leading-tight">
              {translateBreedName(breed.name, currentLang)}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {breed.scientificName} • {breed.origin}
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto space-y-3.5 text-xs">
          {/* Quick Specs Grid */}
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">Purpose</span>
              <span className="font-bold text-slate-900 mt-0.5 block">{breed.primaryUse}</span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">Milk Yield</span>
              <span className="font-bold text-slate-900 mt-0.5 block truncate">{breed.avgMilkYield}</span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">Climate</span>
              <span className="font-bold text-slate-900 mt-0.5 block truncate">{breed.climate}</span>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase block font-semibold">Heat Tolerance</span>
              <span className="font-bold text-emerald-700 mt-0.5 block">{breed.heatTolerance}</span>
            </div>
          </section>

          {/* Description */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <h4 className="font-bold text-slate-900 uppercase font-mono text-[11px]">
              Breed Overview
            </h4>
            <p className="text-slate-600 leading-relaxed">{breed.description}</p>
          </div>

          {/* Physical Characteristics */}
          {breed.physicalCharacteristics && (
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <h4 className="font-bold text-slate-900 uppercase font-mono text-[11px]">
                Physical Characteristics
              </h4>
              <p className="text-slate-600 leading-relaxed">{breed.physicalCharacteristics}</p>
            </div>
          )}

          {/* Disease Resistance */}
          {breed.diseaseResistance && (
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <h4 className="font-bold text-slate-900 uppercase font-mono text-[11px]">
                Disease Resilience
              </h4>
              <p className="text-slate-600 leading-relaxed">{breed.diseaseResistance}</p>
            </div>
          )}

          {/* Special Characteristics & Productivity */}
          {breed.specialCharacteristics && (
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <h4 className="font-bold text-slate-900 uppercase font-mono text-[11px]">
                Special Characteristics & Ecology
              </h4>
              <p className="text-slate-600 leading-relaxed">{breed.specialCharacteristics}</p>
            </div>
          )}

          {/* Government Incentives & Subsidies */}
          {breed.incentivesActive && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/70 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <span className="material-symbols-outlined text-sm">verified_user</span>
                <span className="uppercase font-mono text-[11px]">
                  Government Conservation Subsidies
                </span>
              </div>
              <p className="text-slate-700 text-xs leading-relaxed">
                {breed.incentivesDescription ||
                  "Eligible for National Gokul Mission pedigree bull breeding subsidy and state livestock preservation grants."}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-white flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
          >
            {t("close", currentLang)}
          </button>

          <button
            onClick={() => {
              onClose();
              onTabChange("market");
            }}
            className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">storefront</span>
            <span>{t("findInMarketplace", currentLang)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreedDetailModal;
