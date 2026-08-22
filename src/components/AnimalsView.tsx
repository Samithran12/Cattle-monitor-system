import React, { useState } from "react";
import { NativeBreed, Animal, TabType } from "../types";
import { t, translateAnimalName, translateBreedName, translateStatus, translateGender, translateAge, translateBreedState, translateBreedField, Language } from "../utils/i18n";
import { SmartImage } from "./ui/SmartImage";
import { EmptyState } from "./ui/EmptyState";
import { motion } from "motion/react";
import {
  Search,
  Plus,
  BookOpen,
  Award,
  Edit2,
  Trash2,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from "lucide-react";

interface AnimalsViewProps {
  breeds: NativeBreed[];
  animals: Animal[];
  onSelectBreed: (breed: NativeBreed) => void;
  onSelectAnimal: (animal: Animal) => void;
  onEditAnimal: (animal: Animal) => void;
  onDeleteAnimal: (animal: Animal) => void;
  onTabChange: (tab: TabType) => void;
  userLanguage?: Language;
}

export const AnimalsView: React.FC<AnimalsViewProps> = ({
  breeds,
  animals,
  onSelectBreed,
  onSelectAnimal,
  onEditAnimal,
  onDeleteAnimal,
  onTabChange,
  userLanguage = "English",
}) => {
  const [subTab, setSubTab] = useState<"herd" | "breeds">("herd");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHerdFilter, setSelectedHerdFilter] = useState("All");
  const [selectedBreedFilter, setSelectedBreedFilter] = useState("All");
  const currentLang = userLanguage as Language;

  const filteredAnimals = animals.filter((a) => {
    const nameTranslated = translateAnimalName(a.name, currentLang);
    const breedTranslated = translateBreedName(a.breed, currentLang);
    const matchesSearch =
      !searchQuery ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nameTranslated.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tagId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breedTranslated.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedHerdFilter === "All") return matchesSearch;
    if (selectedHerdFilter === "Healthy") return matchesSearch && (a.status === "Healthy" || a.healthScore >= 90);
    if (selectedHerdFilter === "Needs Attention") return matchesSearch && a.status === "Needs Attention";
    if (selectedHerdFilter === "Pregnant") return matchesSearch && (a.status === "Pregnant" || a.pregnancyStatus?.includes("Pregnant"));
    if (selectedHerdFilter === "Vaccine Due") return matchesSearch && a.vaccinationStatus !== "Up to Date";
    return matchesSearch;
  });

  const filteredBreeds = breeds.filter((b) => {
    const breedTranslated = translateBreedName(b.name, currentLang);
    const matchesSearch =
      !searchQuery ||
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breedTranslated.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.primaryUse.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedBreedFilter === "All") return matchesSearch;
    if (selectedBreedFilter === "Dairy") return matchesSearch && b.primaryUse === "Dairy";
    if (selectedBreedFilter === "Draught") return matchesSearch && b.primaryUse === "Draught";
    if (selectedBreedFilter === "Tamil Nadu") return matchesSearch && b.state.includes("Tamil Nadu");
    return matchesSearch;
  });

  return (
    <main className="w-full px-4 py-4 pb-28 space-y-4 text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-200">
      {/* Sub-tab Pill Switch */}
      <div className="bg-zinc-100 dark:bg-zinc-900 p-1 rounded-2xl flex items-center gap-1 border border-zinc-200/80 dark:border-zinc-800">
        <button
          onClick={() => setSubTab("herd")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            subTab === "herd"
              ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-extrabold"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <span className="material-symbols-outlined text-base">pets</span>
          <span>{t("myHerdTab", currentLang)} ({animals.length})</span>
        </button>

        <button
          onClick={() => setSubTab("breeds")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            subTab === "breeds"
              ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-extrabold"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{t("nativeBreedsTab", currentLang)} ({breeds.length})</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-2.5">
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              subTab === "herd"
                ? t("searchHerdPlaceholder", currentLang)
                : t("searchBreedsPlaceholder", currentLang)
            }
            className="w-full bg-white dark:bg-zinc-900 pl-10 pr-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:border-zinc-900 dark:focus:border-emerald-500 transition-colors shadow-2xs"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
          {subTab === "herd" ? (
            <>
              {["All", "Healthy", "Needs Attention", "Pregnant", "Vaccine Due"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedHerdFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedHerdFilter === filter
                      ? "bg-zinc-900 dark:bg-emerald-600 text-white shadow-xs font-extrabold"
                      : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  {filter === "All"
                    ? t("all", currentLang)
                    : filter === "Healthy"
                    ? t("healthyStatus", currentLang)
                    : filter === "Pregnant"
                    ? t("pregnantCattle", currentLang)
                    : filter === "Needs Attention"
                    ? translateStatus("Needs Attention", currentLang)
                    : filter === "Vaccine Due"
                    ? translateStatus("Action Needed", currentLang)
                    : filter}
                </button>
              ))}

              <button
                onClick={() => onTabChange("add-animal")}
                className="px-3.5 py-1.5 bg-zinc-900 dark:bg-emerald-600 hover:bg-zinc-800 dark:hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1 shrink-0 ml-auto cursor-pointer shadow-xs transition-all active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t("addAnimal", currentLang)}</span>
              </button>
            </>
          ) : (
            <>
              {["All", "Tamil Nadu", "Dairy", "Draught"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedBreedFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedBreedFilter === filter
                      ? "bg-zinc-900 dark:bg-emerald-600 text-white shadow-xs font-extrabold"
                      : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  {filter === "All"
                    ? t("all", currentLang)
                    : filter === "Tamil Nadu"
                    ? currentLang === "Tamil"
                      ? "தமிழ்நாடு"
                      : currentLang === "Hindi"
                      ? "तमिलनाडु"
                      : "Tamil Nadu"
                    : filter === "Dairy"
                    ? currentLang === "Tamil"
                      ? "பால் பண்ணை"
                      : currentLang === "Hindi"
                      ? "डेयरी"
                      : "Dairy"
                    : filter === "Draught"
                    ? currentLang === "Tamil"
                      ? "உழவு மாடுகள்"
                      : currentLang === "Hindi"
                      ? "भारवाही"
                      : "Draught"
                    : filter}
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      {subTab === "herd" ? (
        filteredAnimals.length === 0 ? (
          <EmptyState
            icon="pets"
            title={t("noAnimalsFound", currentLang)}
            description={t("adjustFilterDesc", currentLang)}
            actionText={t("addAnimal", currentLang)}
            onAction={() => onTabChange("add-animal")}
          />
        ) : (
          <div className="space-y-3">
            {filteredAnimals.map((animal) => (
              <motion.div
                key={animal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-4 shadow-[0_2px_14px_rgba(0,0,0,0.02)] dark:shadow-none space-y-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
              >
                <div className="flex gap-3.5">
                  <div className="relative w-22 h-22 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-100 dark:border-zinc-800">
                    <SmartImage
                      src={animal.photoUrl}
                      alt={animal.name}
                      className="w-full h-full"
                    />
                    {animal.noseprintVerified && (
                      <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                        {animal.tagId}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          animal.status === "Healthy"
                            ? "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60"
                            : "text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60"
                        }`}
                      >
                        {translateStatus(animal.status, currentLang)}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-base text-zinc-900 dark:text-white font-display mt-1 truncate">
                      {translateAnimalName(animal.name, currentLang)}
                    </h4>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                      {translateBreedName(animal.breed, currentLang)} • {translateAge(animal.age, currentLang)} • {translateGender(animal.gender, currentLang)}
                    </p>

                    <div className="flex items-center gap-3 mt-1.5 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                      <span>
                        {t("health", currentLang)}: <strong className="text-zinc-900 dark:text-white">{animal.healthScore}%</strong>
                      </span>
                      {animal.dailyMilkLiters && (
                        <span>
                          {t("yield", currentLang)}: <strong className="text-zinc-900 dark:text-white">{animal.dailyMilkLiters} {t("literPerDay", currentLang)}</strong>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions Grid */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    onClick={() => onSelectAnimal(animal)}
                    className="col-span-2 py-2.5 bg-zinc-900 dark:bg-emerald-600 hover:bg-zinc-800 dark:hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-95 shadow-2xs"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>{t("digitalPassport", currentLang)}</span>
                  </button>

                  <div className="flex gap-1.5">
                    <button
                      onClick={() => onEditAnimal(animal)}
                      className="flex-1 py-2 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-center cursor-pointer transition-colors"
                      title={t("edit", currentLang)}
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onDeleteAnimal(animal)}
                      className="flex-1 py-2 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800 flex items-center justify-center cursor-pointer transition-colors"
                      title={t("delete", currentLang)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )
      ) : (
        /* Indigenous Breeds Catalog */
        <div className="space-y-3">
          {filteredBreeds.map((breed) => (
            <motion.div
              key={breed.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => onSelectBreed(breed)}
              className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-4 shadow-2xs space-y-3 cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group"
            >
              <div className="flex gap-3.5">
                <div className="relative w-22 h-22 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                  <SmartImage
                    src={breed.imageUrl}
                    alt={breed.name}
                    className="w-full h-full group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                      {translateBreedState(breed.state, currentLang)}
                    </span>
                    {breed.incentivesActive && (
                      <span className="text-[9px] font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-1.5 py-0.2 rounded-full flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>{t("govtSubsidy", currentLang)}</span>
                      </span>
                    )}
                  </div>

                  <h4 className="font-extrabold text-sm text-zinc-900 dark:text-white font-display mt-1 truncate">
                    {translateBreedName(breed.name, currentLang)}
                  </h4>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                    {breed.origin} • {t(breed.primaryUse.toLowerCase() === "dairy" ? "dairy" : breed.primaryUse.toLowerCase() === "draught" ? "draught" : "dualPurpose", currentLang) || breed.primaryUse}
                  </p>

                  <p className="text-[11px] text-zinc-600 dark:text-zinc-300 line-clamp-2 mt-1 leading-snug">
                    {translateBreedField(breed.description, currentLang)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
                <span>
                  {t("yield", currentLang)}: <strong className="text-zinc-900 dark:text-white">{breed.avgMilkYield.replace("Liters / day", t("literPerDay", currentLang))}</strong>
                </span>
                <span className="text-zinc-900 dark:text-emerald-400 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>{t("viewDetails", currentLang)}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
};

export default AnimalsView;
