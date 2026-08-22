import React, { useState } from "react";
import { Animal, MedicalLog } from "../types";
import { generateQrSvgDataUrl } from "../utils/qrCode";
import { t, translateAnimalName, translateBreedName, translateStatus, translateMedicalType, translateMedicalDesc, translateDoctorName, Language } from "../utils/i18n";
import { SmartImage } from "./ui/SmartImage";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Share2,
  Fingerprint,
  CheckCircle2,
  Plus,
  QrCode,
  ShieldCheck,
  Stethoscope,
  Calendar,
  UserCheck
} from "lucide-react";

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
    showToast("Medical record added successfully!");
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
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-zinc-100 dark:border-zinc-800 max-h-[90vh] flex flex-col relative"
      >
        {/* Toast Feedback */}
        <AnimatePresence>
          {toastMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
              <span>{toastMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Passport Header */}
        <div className="bg-zinc-900 text-white p-5 shrink-0 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border border-zinc-700 shrink-0 bg-zinc-800">
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
              <p className="text-xs text-zinc-400 font-mono">
                {animal.tagId} • {translateBreedName(animal.breed, currentLang)}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Biometrics Card */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-100 dark:border-zinc-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-emerald-600 text-white flex items-center justify-center">
                <Fingerprint className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase font-bold block">
                  {currentLang === "Tamil" ? "மூக்கு ரேகை பயோமெட்ரிக் குறியீடு" : currentLang === "Hindi" ? "नोज़प्रिंट बायोमेट्रिक हैश" : "Noseprint Biometric Hash"}
                </span>
                <span className="font-mono font-bold text-zinc-900 dark:text-white text-sm">
                  {animal.noseprintId || "NOSE-9241-KNG1"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-[10px] px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/50">
              <CheckCircle2 className="w-3 h-3" />
              <span>{currentLang === "Tamil" ? "சரிபார்க்கப்பட்டது" : currentLang === "Hindi" ? "सत्यापित" : "VERIFIED"}</span>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
            <div className="bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-2xl border border-zinc-100 dark:border-zinc-700">
              <span className="text-[10px] text-zinc-400 block">{t("healthScore", currentLang)}</span>
              <span className="font-bold text-zinc-900 dark:text-white text-sm">{animal.healthScore}%</span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-2xl border border-zinc-100 dark:border-zinc-700">
              <span className="text-[10px] text-zinc-400 block">{t("status", currentLang)}</span>
              <span className="font-bold text-zinc-900 dark:text-white text-sm truncate">
                {translateStatus(animal.status, currentLang)}
              </span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-2xl border border-zinc-100 dark:border-zinc-700">
              <span className="text-[10px] text-zinc-400 block">{t("vaccineStatus", currentLang)}</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm truncate">
                {translateStatus(animal.vaccinationStatus, currentLang)}
              </span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-2xl border border-zinc-100 dark:border-zinc-700">
              <span className="text-[10px] text-zinc-400 block">{t("weight", currentLang)}</span>
              <span className="font-bold text-zinc-900 dark:text-white text-sm">{animal.weight} kg</span>
            </div>
          </section>

          {/* QR Code & Registry */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-100 dark:border-zinc-700 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white">
                  {currentLang === "Tamil" ? "டிஜிட்டல் பதிவு QR குறியீடு" : currentLang === "Hindi" ? "डिजिटल रजिस्ट्री क्यूआर" : "Digital Registry QR"}
                </h4>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1 leading-relaxed">
                {currentLang === "Tamil"
                  ? "அரசு கால்நடை மருத்துவர் அல்லது ஸ்மார்ட்போன் மூலம் ஸ்கேன் செய்து அதிகாரப்பூர்வ சான்றிதழைப் பார்க்கலாம்."
                  : currentLang === "Hindi"
                  ? "स्मार्टफोन से स्कैन करके वंशावली और स्वास्थ्य रिकॉर्ड सत्यापित करें।"
                  : "Scan with any smartphone or livestock scanner to verify official pedigree and veterinary records."}
              </p>
            </div>
            <div className="w-16 h-16 bg-white p-1 rounded-xl border border-zinc-200 shrink-0">
              <img src={qrUrl} alt="QR Code" className="w-full h-full" />
            </div>
          </div>

          {/* Medical History Section */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-sm text-zinc-900 dark:text-white font-display">
                {t("medicalLogs", currentLang)}
              </h4>
              <button
                onClick={() => setShowAddLog(!showAddLog)}
                className="text-xs font-bold text-zinc-900 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t("addRecord", currentLang)}</span>
              </button>
            </div>

            <AnimatePresence>
              {showAddLog && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleAddLogSubmit}
                  className="p-3.5 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 space-y-2.5 overflow-hidden"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-mono font-bold text-zinc-500 dark:text-zinc-400 uppercase block mb-1">
                        {currentLang === "Tamil" ? "நிகழ்வு வகை" : currentLang === "Hindi" ? "इवेंट प्रकार" : "Event Type"}
                      </label>
                      <select
                        value={logType}
                        onChange={(e) => setLogType(e.target.value as any)}
                        className="w-full p-2 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold cursor-pointer"
                      >
                        <option value="Vaccination">{translateMedicalType("Vaccination", currentLang)}</option>
                        <option value="Pregnancy Check">{translateMedicalType("Pregnancy Check", currentLang)}</option>
                        <option value="Treatment">{translateMedicalType("Treatment", currentLang)}</option>
                        <option value="Health Audit">{translateMedicalType("Health Audit", currentLang)}</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono font-bold text-zinc-500 dark:text-zinc-400 uppercase block mb-1">
                        {currentLang === "Tamil" ? "மருத்துவர் பெயர்" : currentLang === "Hindi" ? "चिकित्सक का नाम" : "Doctor Name"}
                      </label>
                      <input
                        type="text"
                        value={logDoctor}
                        onChange={(e) => setLogDoctor(e.target.value)}
                        placeholder="e.g. Dr. Senthil Kumar"
                        className="w-full p-2 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-zinc-500 dark:text-zinc-400 uppercase block mb-1">
                      {currentLang === "Tamil" ? "விவரங்கள்" : currentLang === "Hindi" ? "विवरण" : "Details"}
                    </label>
                    <input
                      type="text"
                      value={logDesc}
                      onChange={(e) => setLogDesc(e.target.value)}
                      placeholder={currentLang === "Tamil" ? "எ.கா. பூஸ்டர் தடுப்பூசி போடப்பட்டது..." : "e.g. Booster dose given..."}
                      className="w-full p-2 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAddLog(false)}
                      className="px-3 py-1.5 bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 font-bold rounded-xl text-xs cursor-pointer"
                    >
                      {t("cancel", currentLang)}
                    </button>
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-zinc-900 dark:bg-emerald-600 text-white font-bold rounded-xl text-xs cursor-pointer shadow-xs"
                    >
                      {t("save", currentLang)}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              {animal.medicalHistory.map((log) => (
                <div
                  key={log.id}
                  className="p-3 bg-white dark:bg-zinc-800/60 rounded-2xl border border-zinc-100 dark:border-zinc-700 shadow-2xs space-y-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-700 px-2 py-0.5 rounded-full uppercase">
                      {translateMedicalType(log.type, currentLang)}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">{log.date}</span>
                  </div>
                  <p className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">
                    {translateMedicalDesc(log.description, currentLang)}
                  </p>
                  {log.doctor && (
                    <div className="flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                      <Stethoscope className="w-3 h-3" />
                      <span>{currentLang === "Tamil" ? "மருத்துவர்" : currentLang === "Hindi" ? "चिकित्सक" : "Doctor"}: {translateDoctorName(log.doctor, currentLang)}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex gap-2">
          <button
            onClick={handleShare}
            className="flex-1 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>{t("sharePassport", currentLang)}</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-zinc-900 dark:bg-emerald-600 hover:bg-zinc-800 dark:hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            {t("close", currentLang)}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DigitalPassportModal;
