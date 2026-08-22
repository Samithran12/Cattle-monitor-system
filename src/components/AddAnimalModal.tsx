import React, { useState, useRef, useEffect } from "react";
import { Animal, TabType } from "../types";
import { uploadImageToStorage } from "../lib/firebase";
import { generateQrSvgDataUrl } from "../utils/qrCode";
import { analyzeMuzzleBiometrics } from "../utils/biometrics";
import { t, translateBreedName, Language } from "../utils/i18n";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Camera,
  Upload,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  Fingerprint,
  Activity,
  Award,
  QrCode,
  ShieldCheck
} from "lucide-react";

interface AddAnimalModalProps {
  onAddAnimal: (animal: Animal) => void;
  onClose: () => void;
  onTabChange: (tab: TabType) => void;
  initialData?: Partial<Animal> | null;
  userLanguage?: Language;
}

export const AddAnimalModal: React.FC<AddAnimalModalProps> = ({
  onAddAnimal,
  onClose,
  initialData,
  userLanguage = "English",
}) => {
  const currentLang = userLanguage;
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Basic Info
  const [tagId, setTagId] = useState(
    initialData?.tagId || `TN-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`
  );
  const [name, setName] = useState(initialData?.name || "");
  const [breed, setBreed] = useState(initialData?.breed || "Kangayam");
  const [species, setSpecies] = useState<"Cattle" | "Goat" | "Sheep" | "Pig">("Cattle");
  const [gender, setGender] = useState<"Female" | "Male">("Female");
  const [age, setAge] = useState(initialData?.age || "3 Years");
  const [weight, setWeight] = useState(initialData?.weight || 420);
  const [location, setLocation] = useState(initialData?.location || "Main Dairy Shed");

  // Step 2: Biometric & Media
  const [photoUrl, setPhotoUrl] = useState(initialData?.photoUrl || "/cows/kangeyam.jpg");
  const [noseprintId, setNoseprintId] = useState(
    initialData?.noseprintId || `NOSE-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
  );
  const [isExtractingBiometrics, setIsExtractingBiometrics] = useState(false);
  const [landmarksCount, setLandmarksCount] = useState(48);

  // Step 3: Health & Production
  const [status, setStatus] = useState<"Healthy" | "Needs Attention" | "Treatment" | "Pregnant">(
    (initialData?.status as any) || "Healthy"
  );
  const [healthScore, setHealthScore] = useState(initialData?.healthScore || 98);
  const [dailyMilkLiters, setDailyMilkLiters] = useState(initialData?.dailyMilkLiters || 6.5);
  const [vaccinationStatus, setVaccinationStatus] = useState<"Up to Date" | "Action Needed" | "Overdue">(
    (initialData?.vaccinationStatus as any) || "Up to Date"
  );
  const [pregnancyStatus, setPregnancyStatus] = useState(initialData?.pregnancyStatus || "None");

  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData?.breed) setBreed(initialData.breed);
    if (initialData?.photoUrl) setPhotoUrl(initialData.photoUrl);
    if (initialData?.noseprintId) setNoseprintId(initialData.noseprintId);
    if (initialData?.name) setName(initialData.name);
  }, [initialData]);

  const handleRunBiometricExtraction = async (imageSrc: string) => {
    setIsExtractingBiometrics(true);
    try {
      const bio = await analyzeMuzzleBiometrics(imageSrc);
      setNoseprintId(bio.noseprintId);
      setLandmarksCount(bio.landmarksDetected);
    } catch {
      // fallback
    } finally {
      setIsExtractingBiometrics(false);
    }
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const downloadUrl = await uploadImageToStorage(file, "animals");
      setPhotoUrl(downloadUrl);
      handleRunBiometricExtraction(downloadUrl);
    } catch {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPhotoUrl(result);
        handleRunBiometricExtraction(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNextStep = () => {
    setErrorMsg(null);
    if (currentStep === 1) {
      if (!name.trim()) {
        setErrorMsg("Please enter an animal name.");
        return;
      }
      if (weight <= 0) {
        setErrorMsg("Please enter a valid weight in kg.");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    }
  };

  const handleFinalSubmit = () => {
    setIsSaving(true);
    const qrCodeUrl = generateQrSvgDataUrl(tagId);

    const newAnimal: Animal = {
      id: `c-${Date.now()}`,
      tagId,
      name: name.trim(),
      breed,
      species,
      gender,
      age,
      weight,
      status,
      healthScore,
      dailyMilkLiters: gender === "Female" ? dailyMilkLiters : undefined,
      pregnancyStatus: gender === "Female" && pregnancyStatus !== "None" ? pregnancyStatus : undefined,
      vaccinationStatus,
      location: location.trim() || "Main Farm Shed",
      photoUrl,
      noseprintId,
      noseprintVerified: true,
      registeredDate: new Date().toISOString().split("T")[0],
      qrCodeUrl,
      medicalHistory: [
        {
          id: `m-${Date.now()}`,
          type: "Health Audit",
          date: t("today", currentLang),
          description: "Registered into official government herd registry with verified noseprint ID.",
        },
      ],
    };

    setTimeout(() => {
      setIsSaving(false);
      onAddAnimal(newAnimal);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-zinc-100 dark:border-zinc-800 max-h-[90vh] flex flex-col relative"
      >
        {/* Header with Progress Steps */}
        <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                Step {currentStep} of 4 • {currentStep === 1 ? "Bovine Profile" : currentStep === 2 ? "Biometric Noseprint" : currentStep === 3 ? "Health & Productivity" : "Passport Issuance"}
              </span>
              <h3 className="font-extrabold text-base text-zinc-900 dark:text-white font-display mt-0.5">
                {t("registerBreed", currentLang)}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-zinc-200/60 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-3 flex">
            <motion.div
              className="bg-zinc-900 dark:bg-emerald-500 h-full rounded-full"
              initial={{ width: "25%" }}
              animate={{ width: `${(currentStep / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs flex-1">
          {errorMsg && (
            <div className="p-3 bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 rounded-2xl text-xs font-semibold border border-red-200 dark:border-red-900/50 animate-fade-in">
              {errorMsg}
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* STEP 1: BASIC PROFILE */}
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-3.5"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500 font-mono">
                      Official Tag ID
                    </label>
                    <input
                      type="text"
                      required
                      value={tagId}
                      onChange={(e) => setTagId(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-mono font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500 font-mono">
                      Animal Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lakshmi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none focus:border-zinc-900 dark:focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500 font-mono">
                      Indigenous Breed
                    </label>
                    <select
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none cursor-pointer"
                    >
                      <option value="Kangayam">Kangayam (Tamil Nadu)</option>
                      <option value="Pulikulam">Pulikulam (Tamil Nadu)</option>
                      <option value="Bargur">Bargur (Tamil Nadu)</option>
                      <option value="Umbalachery">Umbalachery (Tamil Nadu)</option>
                      <option value="Alambadi">Alambadi (Tamil Nadu)</option>
                      <option value="Gir">Gir (Gujarat)</option>
                      <option value="Sahiwal">Sahiwal (Punjab/Rajasthan)</option>
                      <option value="Punganur">Punganur (Andhra Pradesh)</option>
                      <option value="Hallikar">Hallikar (Karnataka)</option>
                      <option value="Ongole">Ongole (Andhra Pradesh)</option>
                      <option value="Deoni">Deoni (Maharashtra)</option>
                      <option value="Vechur">Vechur (Kerala)</option>
                      <option value="Hariana">Hariana (Haryana)</option>
                      <option value="Rathi">Rathi (Rajasthan)</option>
                      <option value="Tharparkar">Tharparkar (Rajasthan)</option>
                      <option value="Murrah Buffalo">Murrah Buffalo</option>
                      <option value="Surti Buffalo">Surti Buffalo</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500 font-mono">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none cursor-pointer"
                    >
                      <option value="Female">Female (Milch Cow)</option>
                      <option value="Male">Male (Breeding Bull / Ox)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500 font-mono">
                      Age
                    </label>
                    <input
                      type="text"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="3 Years"
                      className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500 font-mono">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500 font-mono">
                    Shed Location / Pasture
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Main Dairy Shed"
                    className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none"
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 2: BIOMETRIC NOSEPRINT */}
            {currentStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200/80 dark:border-zinc-700 space-y-3 text-center">
                  <div className="relative w-36 h-36 mx-auto rounded-2xl overflow-hidden border-2 border-dashed border-emerald-500/60 bg-black">
                    <img src={photoUrl} alt="Cattle Profile" className="w-full h-full object-cover" />
                    {/* Reticle Overlay */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full border border-emerald-400 border-dashed animate-spin-slow flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-2 bg-zinc-900 dark:bg-emerald-600 hover:bg-zinc-800 dark:hover:bg-emerald-500 text-white rounded-xl font-bold text-xs cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Clear Photo</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageFileChange}
                    />
                  </div>
                </div>

                {/* Extracted Biometric Token Card */}
                <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200/80 dark:border-emerald-900/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold font-mono">
                      <Fingerprint className="w-4 h-4" />
                      <span>NOSEPRINT BIOMETRIC TOKEN</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-emerald-200/70 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                      {landmarksCount} Landmarks
                    </span>
                  </div>

                  <div className="bg-white/80 dark:bg-zinc-900/80 p-2.5 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 flex items-center justify-between">
                    <span className="font-mono font-extrabold text-sm text-zinc-900 dark:text-white">
                      {noseprintId}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>LOCKED</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-snug">
                    Dermatoglyphic muzzle pattern locked for tamper-proof digital passport issuance and insurance verification.
                  </p>
                </div>
              </motion.div>
            )}

            {/* STEP 3: HEALTH & PRODUCTIVITY */}
            {currentStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-3.5"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500 font-mono">
                      Health Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none cursor-pointer"
                    >
                      <option value="Healthy">Healthy (Optimal)</option>
                      <option value="Needs Attention">Needs Attention</option>
                      <option value="Treatment">Under Treatment</option>
                      <option value="Pregnant">Pregnant</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500 font-mono">
                      Health Score (%)
                    </label>
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
                    <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500 font-mono">
                      Vaccination Status
                    </label>
                    <select
                      value={vaccinationStatus}
                      onChange={(e) => setVaccinationStatus(e.target.value as any)}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none cursor-pointer"
                    >
                      <option value="Up to Date">Up to Date (FMD / HS)</option>
                      <option value="Action Needed">Action Needed</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500 font-mono">
                      Daily Milk Yield (Liters)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      disabled={gender === "Male"}
                      value={dailyMilkLiters}
                      onChange={(e) => setDailyMilkLiters(Number(e.target.value))}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none font-mono disabled:opacity-50"
                    />
                  </div>
                </div>

                {gender === "Female" && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500 font-mono">
                      Lactation / Breeding Status
                    </label>
                    <select
                      value={pregnancyStatus}
                      onChange={(e) => setPregnancyStatus(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none cursor-pointer"
                    >
                      <option value="None">Dry / Non-Pregnant</option>
                      <option value="Lactating (Early Stage)">Lactating (Early Stage)</option>
                      <option value="Lactating (Mid Stage)">Lactating (Mid Stage)</option>
                      <option value="Pregnant (1-3 Months)">Pregnant (1-3 Months)</option>
                      <option value="Pregnant (4-6 Months)">Pregnant (4-6 Months)</option>
                      <option value="Pregnant (7+ Months)">Pregnant (7+ Months)</option>
                    </select>
                  </div>
                )}
              </motion.div>
            )}

            {/* STEP 4: PASSPORT REVIEW & CONFIRMATION */}
            {currentStep === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Certificate Preview Card */}
                <div className="bg-zinc-900 text-white p-5 rounded-2xl space-y-3.5 shadow-md border border-zinc-800">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-emerald-400" />
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                          Digital Passport Ready
                        </span>
                        <h4 className="font-extrabold text-base font-display">{name}</h4>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full">
                      {tagId}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-zinc-300">
                    <div>Breed: <strong className="text-white">{translateBreedName(breed, currentLang)}</strong></div>
                    <div>Health Score: <strong className="text-emerald-400">{healthScore}%</strong></div>
                    <div>Noseprint: <strong className="text-white text-[10px] block truncate">{noseprintId}</strong></div>
                    <div>Location: <strong className="text-white">{location}</strong></div>
                  </div>

                  <div className="p-2.5 bg-zinc-800/80 rounded-xl border border-zinc-700/80 flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <p className="text-[11px] text-zinc-300 leading-snug">
                      Ready to register into CattleIQ decentralized ledger and generate verifiable QR passport.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => (prev - 1) as any)}
              className="py-3 px-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-xs rounded-2xl flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="flex-1 py-3 bg-zinc-900 dark:bg-emerald-600 hover:bg-zinc-800 dark:hover:bg-emerald-500 text-white font-bold text-xs rounded-2xl shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSaving}
              onClick={handleFinalSubmit}
              className="flex-1 py-3 bg-zinc-900 dark:bg-emerald-600 hover:bg-zinc-800 dark:hover:bg-emerald-500 text-white font-bold text-xs rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSaving ? "Generating Passport..." : "Issue Digital Passport"}</span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AddAnimalModal;
