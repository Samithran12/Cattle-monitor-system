import React, { useState } from "react";
import { Animal, MedicalLog } from "../types";
import { generateQrSvgDataUrl } from "../utils/qrCode";
import { t, translateAnimalName, translateBreedName, translateStatus, Language } from "../utils/i18n";
import { SmartImage } from "./ui/SmartImage";

interface DigitalPassportModalProps {
  animal: Animal | null;
  onClose: () => void;
  onUpdateMedicalLog?: (animalId: string, log: MedicalLog) => void;
  userLanguage?: Language;
}

export const DigitalPassportModal: React.FC<DigitalPassportModalProps> = ({
  animal,
  onClose,
  onUpdateMedicalLog,
  userLanguage = "English",
}) => {
  const [showAddLog, setShowAddLog] = useState(false);
  const [logType, setLogType] = useState<
    "Vaccination" | "Pregnancy Check" | "Treatment" | "Health Audit"
  >("Vaccination");
  const [logDesc, setLogDesc] = useState("");
  const [logDoctor, setLogDoctor] = useState("");
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const currentLang = userLanguage;

  if (!animal) return null;

  const qrUrl = animal.qrCodeUrl || generateQrSvgDataUrl(animal.tagId || animal.id);

  const handleAddLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logDesc.trim()) return;

    const newLog: MedicalLog = {
      id: `m-${Date.now()}`,
      type: logType,
      date: t("today", userLanguage) + ", " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      description: logDesc.trim(),
      doctor: logDoctor.trim() || undefined,
    };

    if (onUpdateMedicalLog) {
      onUpdateMedicalLog(animal.id, newLog);
    } else {
      animal.medicalHistory.unshift(newLog);
    }

    setLogDesc("");
    setLogDoctor("");
    setShowAddLog(false);
    showToast("Medical record added!");
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleShare = async () => {
    const shareData = {
      title: `Official Bovine Digital Passport - ${animal.name} (${animal.tagId})`,
      text: `Official Bovine Digital Passport for ${animal.name}. Tag ID: ${animal.tagId}. Noseprint: ${animal.noseprintId || "Verified"}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        showToast("Passport copied to clipboard!");
      }
    } else {
      navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}`);
      showToast("Passport copied to clipboard!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col animate-slide-up relative">
        {/* Toast Feedback */}
        {toastMsg && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-2xl animate-fade-in flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base text-emerald-400">check_circle</span>
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Header */}
        <div className="bg-slate-900 text-white p-5 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-700 shrink-0 bg-slate-800">
              <SmartImage
                src={animal.photoUrl}
                alt={animal.name}
                className="w-full h-full"
              />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 block">
                {t("officialDigitalPassport", currentLang)}
              </span>
              <h3 className="text-lg font-extrabold font-display leading-tight">
                {translateAnimalName(animal.name, currentLang)}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {animal.tagId} • {translateBreedName(animal.breed, currentLang)}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Biometrics Card */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">fingerprint</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">
                  Noseprint Biometric Hash
                </span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {animal.noseprintId || "NOSE-9241-KNG1"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px] px-2.5 py-1 rounded-full">
              <span className="material-symbols-outlined text-xs">verified</span>
              <span>VERIFIED</span>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 block">{t("healthScore", currentLang)}</span>
              <span className="font-bold text-slate-900 text-sm">{animal.healthScore}%</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 block">{t("status", currentLang)}</span>
              <span className="font-bold text-slate-900 text-sm truncate">
                {translateStatus(animal.status, currentLang)}
              </span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 block">{t("vaccineStatus", currentLang)}</span>
              <span className="font-bold text-emerald-700 text-sm truncate">
                {translateStatus(animal.vaccinationStatus, currentLang)}
              </span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
              <span className="text-[10px] text-slate-400 block">{t("weight", currentLang)}</span>
              <span className="font-bold text-slate-900 text-sm">{animal.weight} kg</span>
            </div>
          </div>

          {/* QR Code & Registry */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-sm text-slate-900">Digital Registry QR</h4>
              <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">
                Scan with any standard smartphone to verify government registration and veterinary records.
              </p>
            </div>
            <div className="w-16 h-16 bg-white p-1 rounded-xl border border-slate-200 shrink-0">
              <img src={qrUrl} alt="QR Code" className="w-full h-full" />
            </div>
          </div>

          {/* Medical History Section */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-sm text-slate-900 font-display">
                {t("medicalLogs", currentLang)}
              </h4>
              <button
                onClick={() => setShowAddLog(!showAddLog)}
                className="text-xs font-bold text-slate-900 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>+</span>
                <span>{t("addRecord", currentLang)}</span>
              </button>
            </div>

            {showAddLog && (
              <form
                onSubmit={handleAddLogSubmit}
                className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5 animate-slide-up"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">
                      Event Type
                    </label>
                    <select
                      value={logType}
                      onChange={(e) => setLogType(e.target.value as any)}
                      className="w-full p-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold"
                    >
                      <option value="Vaccination">Vaccination</option>
                      <option value="Pregnancy Check">Pregnancy Check</option>
                      <option value="Treatment">Treatment</option>
                      <option value="Health Audit">Health Audit</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">
                      Doctor Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={logDoctor}
                      onChange={(e) => setLogDoctor(e.target.value)}
                      placeholder="e.g. Dr. Senthil Kumar"
                      className="w-full p-2 bg-white rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">
                    Details
                  </label>
                  <input
                    type="text"
                    value={logDesc}
                    onChange={(e) => setLogDesc(e.target.value)}
                    placeholder="e.g. Booster dose given..."
                    className="w-full p-2 bg-white rounded-xl border border-slate-200 text-xs"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddLog(false)}
                    className="px-3 py-1.5 bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-slate-900 text-white font-bold rounded-xl text-xs"
                  >
                    Save Record
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {animal.medicalHistory.map((log) => (
                <div
                  key={log.id}
                  className="p-3 bg-white rounded-2xl border border-slate-100 shadow-xs space-y-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full uppercase">
                      {log.type}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{log.date}</span>
                  </div>
                  <p className="text-xs text-slate-800 font-medium">{log.description}</p>
                  {log.doctor && (
                    <p className="text-[11px] text-slate-500 font-mono">Doctor: {log.doctor}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-white flex gap-2">
          <button
            onClick={handleShare}
            className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">share</span>
            <span>{t("sharePassport", currentLang)}</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            {t("close", currentLang)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DigitalPassportModal;
