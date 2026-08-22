import React, { useState, useEffect } from "react";
import { Animal } from "../types";
import { t, Language } from "../utils/i18n";
import { motion } from "motion/react";
import { X, Save, Edit3 } from "lucide-react";

interface EditAnimalModalProps {
  animal: Animal | null;
  onSave: (updated: Animal) => void;
  onClose: () => void;
  userLanguage?: Language;
}

export const EditAnimalModal: React.FC<EditAnimalModalProps> = ({
  animal,
  onSave,
  onClose,
  userLanguage = "English",
}) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"Healthy" | "Needs Attention" | "Pregnant" | "Treatment">("Healthy");
  const [healthScore, setHealthScore] = useState(90);
  const [vaccinationStatus, setVaccinationStatus] = useState<"Up to Date" | "Action Needed" | "Overdue">("Up to Date");
  const [weight, setWeight] = useState(400);
  const [dailyMilkLiters, setDailyMilkLiters] = useState(0);
  const [location, setLocation] = useState("");
  const currentLang = userLanguage;

  useEffect(() => {
    if (animal) {
      setName(animal.name);
      setStatus(animal.status);
      setHealthScore(animal.healthScore);
      setVaccinationStatus(animal.vaccinationStatus);
      setWeight(animal.weight);
      setDailyMilkLiters(animal.dailyMilkLiters || 0);
      setLocation(animal.location);
    }
  }, [animal]);

  if (!animal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...animal,
      name: name.trim() || animal.name,
      status,
      healthScore,
      vaccinationStatus,
      weight,
      dailyMilkLiters: dailyMilkLiters > 0 ? dailyMilkLiters : undefined,
      location: location.trim() || animal.location,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-zinc-100 dark:border-zinc-800 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-base text-zinc-900 dark:text-white font-display">
              {t("edit", currentLang)} {animal.name} ({animal.tagId})
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Update animal records and health status
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-3.5 text-xs">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">Animal Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none cursor-pointer"
              >
                <option value="Healthy">Healthy</option>
                <option value="Needs Attention">Needs Attention</option>
                <option value="Treatment">Treatment</option>
                <option value="Pregnant">Pregnant</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">Health Score (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={healthScore}
                onChange={(e) => setHealthScore(Number(e.target.value))}
                className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">Vaccination</label>
              <select
                value={vaccinationStatus}
                onChange={(e) => setVaccinationStatus(e.target.value as any)}
                className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none cursor-pointer"
              >
                <option value="Up to Date">Up to Date</option>
                <option value="Action Needed">Action Needed</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">Daily Milk (L)</label>
              <input
                type="number"
                step="0.5"
                value={dailyMilkLiters}
                onChange={(e) => setDailyMilkLiters(Number(e.target.value))}
                className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">Shed Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none"
              />
            </div>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/60 border-t border-zinc-100 dark:border-zinc-800 flex gap-2 pt-4 rounded-2xl">
            <button
              type="submit"
              className="flex-1 py-3 rounded-2xl bg-zinc-900 dark:bg-emerald-600 hover:bg-zinc-800 dark:hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>{t("saveChanges", currentLang)}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-xs cursor-pointer transition-colors"
            >
              {t("close", currentLang)}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditAnimalModal;
