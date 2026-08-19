import React, { useState } from "react";
import { NativeBreed, Animal, TabType } from "../types";
import { t, translateAnimalName, translateBreedName, translateStatus, Language } from "../utils/i18n";
import { SmartImage } from "./ui/SmartImage";

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
    if (selectedHerdFilter === "Healthy") return matchesSearch && a.status === "Healthy";
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
    <main className="w-full px-4 py-4 pb-28 space-y-4 text-slate-900 font-sans">
      {/* Sub-tab Pill Switch */}
      <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1 border border-slate-200/60">
        <button
          onClick={() => setSubTab("herd")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            subTab === "herd"
              ? "bg-white text-slate-900 shadow-xs font-extrabold"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <span className="material-symbols-outlined text-base">pets</span>
          <span>{t("myHerdTab", currentLang)} ({animals.length})</span>
        </button>

        <button
          onClick={() => setSubTab("breeds")}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            subTab === "breeds"
              ? "bg-white text-slate-900 shadow-xs font-extrabold"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <span className="material-symbols-outlined text-base">auto_stories</span>
          <span>{t("nativeBreedsTab", currentLang)} ({breeds.length})</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-2.5">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
            search
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
            className="w-full bg-white pl-10 pr-4 py-3 rounded-2xl border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none focus:border-slate-900 transition-colors shadow-xs"
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
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedHerdFilter === filter
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
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
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1 shrink-0 ml-auto cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm font-bold">add</span>
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
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
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

      {/* Roster Grid */}
      {subTab === "herd" ? (
        filteredAnimals.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-100 space-y-2">
            <span className="material-symbols-outlined text-3xl text-slate-400">pets</span>
            <h4 className="text-sm font-bold text-slate-900">{t("noAnimalsFound", currentLang)}</h4>
            <p className="text-xs text-slate-500">{t("adjustFilterDesc", currentLang)}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAnimals.map((animal) => (
              <div
                key={animal.id}
                className="bg-white border border-slate-100 rounded-3xl p-4 shadow-[0_2px_14px_rgba(15,23,42,0.03)] space-y-3"
              >
                <div className="flex gap-3.5">
                  <div className="relative w-22 h-22 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                    <SmartImage
                      src={animal.photoUrl}
                      alt={animal.name}
                      className="w-full h-full"
                    />
                    <span className="absolute bottom-1 right-1 bg-white text-slate-900 rounded-full p-0.5 shadow-xs">
                      <span className="material-symbols-outlined text-[10px] font-bold">verified</span>
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                        {animal.tagId}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {translateStatus(animal.status, currentLang)}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-base text-slate-900 font-display mt-1 truncate">
                      {translateAnimalName(animal.name, currentLang)}
                    </h4>

                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {translateBreedName(animal.breed, currentLang)} • {animal.age} • {animal.gender}
                    </p>

                    <div className="flex items-center gap-3 mt-1.5 text-[11px] font-mono text-slate-500">
                      <span>Health: <strong className="text-slate-900">{animal.healthScore}%</strong></span>
                      {animal.dailyMilkLiters && (
                        <span>Yield: <strong className="text-slate-900">{animal.dailyMilkLiters}L/d</strong></span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => onSelectAnimal(animal)}
                    className="col-span-2 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">badge</span>
                    <span>{t("digitalPassport", currentLang)}</span>
                  </button>

                  <div className="flex gap-1.5">
                    <button
                      onClick={() => onEditAnimal(animal)}
                      className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 flex items-center justify-center cursor-pointer"
                      title={t("edit", currentLang)}
                    >
                      <span className="material-symbols-outlined text-base">edit</span>
                    </button>

                    <button
                      onClick={() => onDeleteAnimal(animal)}
                      className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl border border-red-200 flex items-center justify-center cursor-pointer"
                      title={t("delete", currentLang)}
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Indigenous Breeds Catalog (21+ Breeds) */
        <div className="space-y-3">
          {filteredBreeds.map((breed) => (
            <div
              key={breed.id}
              onClick={() => onSelectBreed(breed)}
              className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs space-y-3 cursor-pointer hover:border-slate-300 transition-all"
            >
              <div className="flex gap-3.5">
                <div className="relative w-22 h-22 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                  <SmartImage
                    src={breed.imageUrl}
                    alt={breed.name}
                    className="w-full h-full"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      {breed.state}
                    </span>
                    {breed.incentivesActive && (
                      <span className="text-[9px] font-mono font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded-full">
                        GOVT SUBSIDY
                      </span>
                    )}
                  </div>

                  <h4 className="font-extrabold text-sm text-slate-900 font-display mt-1 truncate">
                    {translateBreedName(breed.name, currentLang)}
                  </h4>

                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {breed.origin} • {breed.primaryUse}
                  </p>

                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-1 leading-snug">
                    {breed.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
                <span>Yield: <strong className="text-slate-900">{breed.avgMilkYield}</strong></span>
                <span className="text-slate-900 font-bold flex items-center gap-0.5">
                  <span>{t("viewDetails", currentLang)}</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default AnimalsView;
