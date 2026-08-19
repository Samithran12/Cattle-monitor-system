import React, { useState, useRef, useEffect } from "react";
import { Animal, TabType } from "../types";
import { uploadImageToStorage } from "../lib/firebase";
import { generateQrSvgDataUrl } from "../utils/qrCode";
import { t, Language } from "../utils/i18n";

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
  const [name, setName] = useState(initialData?.name || "");
  const [breed, setBreed] = useState(initialData?.breed || "Kangayam");
  const [species, setSpecies] = useState<"Cattle" | "Goat" | "Sheep" | "Pig">("Cattle");
  const [gender, setGender] = useState<"Female" | "Male">("Female");
  const [age, setAge] = useState(initialData?.age || "3 Years");
  const [weight, setWeight] = useState(initialData?.weight || 400);
  const [location, setLocation] = useState(initialData?.location || "Main Dairy Shed");
  const [photoUrl, setPhotoUrl] = useState(
    initialData?.photoUrl ||
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCBQg5UVCWScCauWXK56yTX7m432h5tl0s9u4PAc8CWK_13hMLMZzPxBB6MkwGp4qL9sz9toOhX-1HUlRbQcLPRDBWewM2Fu457y76aUp4aY6iVZisDoCCco9UdclOwE2EUWGdkO32-ZGc6B2AXzudagjLEvEdo7F3US5oKDhiXu5ezAd6UGdnT2PgJDYcwqgjRV6skQV5pwGgnwKMIJfux3N8fB3dUgH-QM7kILYhQubSFYEMqeXSES66p1Dp4vheql3Gtbwny8fo"
  );
  const [noseprintId, setNoseprintId] = useState(
    initialData?.noseprintId || `NOSE-${Math.floor(1000 + Math.random() * 9000)}-IN`
  );

  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentLang = userLanguage;

  useEffect(() => {
    if (initialData?.breed) setBreed(initialData.breed);
    if (initialData?.photoUrl) setPhotoUrl(initialData.photoUrl);
    if (initialData?.noseprintId) setNoseprintId(initialData.noseprintId);
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg("Please enter animal name.");
      return;
    }
    if (weight <= 0) {
      setErrorMsg("Please enter a valid weight in kg.");
      return;
    }

    setErrorMsg(null);
    setIsSaving(true);

    const tagId = `AL-${Math.floor(1000 + Math.random() * 9000)}`;
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
      status: "Healthy",
      healthScore: 98,
      vaccinationStatus: "Up to Date",
      location,
      photoUrl,
      noseprintId,
      noseprintVerified: !!initialData?.noseprintVerified,
      registeredDate: new Date().toISOString().split("T")[0],
      qrCodeUrl,
      medicalHistory: [
        {
          id: `m-${Date.now()}`,
          type: "Health Audit",
          date: t("today", currentLang),
          description: "Registered into official herd registry.",
        },
      ],
    };

    setTimeout(() => {
      setIsSaving(false);
      onAddAnimal(newAnimal);
      onClose();
    }, 400);
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const downloadUrl = await uploadImageToStorage(file, "animals");
      setPhotoUrl(downloadUrl);
    } catch {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 font-display">
              {t("registerBreed", currentLang)}
            </h3>
            <p className="text-xs text-slate-500">
              Create official bovine passport
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-3.5 text-xs">
          {errorMsg && (
            <div className="p-3 bg-red-50 text-red-700 rounded-2xl text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          {/* Photo Upload Strip */}
          <div className="flex items-center gap-3.5 p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
              <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs cursor-pointer"
              >
                Upload Photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageFileChange}
              />
              <p className="text-[11px] text-slate-400 mt-1">Clear head/muzzle profile</p>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Animal Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Lakshmi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Breed</label>
              <select
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none cursor-pointer"
              >
                <option value="Kangayam">Kangayam</option>
                <option value="Pulikulam">Pulikulam</option>
                <option value="Bargur">Bargur</option>
                <option value="Umbalachery">Umbalachery</option>
                <option value="Gir">Gir</option>
                <option value="Sahiwal">Sahiwal</option>
                <option value="Punganur">Punganur</option>
                <option value="Hallikar">Hallikar</option>
                <option value="Ongole">Ongole</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none cursor-pointer"
              >
                <option value="Female">Female (Cow)</option>
                <option value="Male">Male (Bull)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Age</label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Shed Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
            />
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2 pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all cursor-pointer active:scale-95"
            >
              {isSaving ? "Issuing..." : t("registerBreed", currentLang)}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
            >
              {t("close", currentLang)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAnimalModal;
