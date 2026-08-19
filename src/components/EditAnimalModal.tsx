import React, { useState, useRef } from "react";
import { Animal } from "../types";

interface EditAnimalModalProps {
  animal: Animal;
  onSave: (updatedAnimal: Animal) => void;
  onClose: () => void;
}

export const EditAnimalModal: React.FC<EditAnimalModalProps> = ({
  animal,
  onSave,
  onClose,
}) => {
  const [name, setName] = useState(animal.name);
  const [tagId, setTagId] = useState(animal.tagId);
  const [breed, setBreed] = useState(animal.breed);
  const [species, setSpecies] = useState(animal.species);
  const [gender, setGender] = useState(animal.gender);
  const [age, setAge] = useState(animal.age);
  const [weight, setWeight] = useState(animal.weight);
  const [status, setStatus] = useState(animal.status);
  const [healthScore, setHealthScore] = useState(animal.healthScore);
  const [pregnancyStatus, setPregnancyStatus] = useState(
    animal.pregnancyStatus || "Not Checked"
  );
  const [vaccinationStatus, setVaccinationStatus] = useState(
    animal.vaccinationStatus
  );
  const [location, setLocation] = useState(animal.location);
  const [photoUrl, setPhotoUrl] = useState(animal.photoUrl);

  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Animal Name is required.");
      return;
    }
    if (!tagId.trim()) {
      setErrorMsg("Tag ID is required.");
      return;
    }
    if (weight <= 0) {
      setErrorMsg("Weight must be greater than 0 kg.");
      return;
    }

    setErrorMsg(null);
    setIsSaving(true);

    const updatedAnimal: Animal = {
      ...animal,
      name: name.trim(),
      tagId: tagId.trim(),
      breed,
      species,
      gender,
      age,
      weight,
      status,
      healthScore,
      pregnancyStatus,
      vaccinationStatus,
      location,
      photoUrl,
    };

    setTimeout(() => {
      setIsSaving(false);
      onSave(updatedAnimal);
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 font-display">
              Edit Animal Profile
            </h3>
            <p className="text-xs text-slate-500">
              Update passport & health records
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

          {/* Photo Strip */}
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
                Change Photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Animal Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Tag ID</label>
              <input
                type="text"
                required
                value={tagId}
                onChange={(e) => setTagId(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Breed</label>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Health Score (%)</label>
              <input
                type="number"
                min="1"
                max="100"
                value={healthScore}
                onChange={(e) => setHealthScore(Number(e.target.value))}
                className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Health Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none cursor-pointer"
              >
                <option value="Healthy">Healthy</option>
                <option value="Needs Attention">Needs Attention</option>
                <option value="Pregnant">Pregnant</option>
                <option value="Treatment">Under Treatment</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Vaccination</label>
              <select
                value={vaccinationStatus}
                onChange={(e) => setVaccinationStatus(e.target.value as any)}
                className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none cursor-pointer"
              >
                <option value="Up to Date">Up to Date</option>
                <option value="Action Needed">Action Needed</option>
                <option value="Scheduled">Scheduled</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2 pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all cursor-pointer active:scale-95"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAnimalModal;
