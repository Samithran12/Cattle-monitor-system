import React from "react";
import { Animal } from "../types";
import { t, translateAnimalName, Language } from "../utils/i18n";
import { motion } from "motion/react";
import { AlertTriangle, Trash2 } from "lucide-react";

interface DeleteConfirmModalProps {
  animal: Animal | null;
  onConfirmDelete: (animalId: string) => void;
  onClose: () => void;
  userLanguage?: Language;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  animal,
  onConfirmDelete,
  onClose,
  userLanguage = "English",
}) => {
  if (!animal) return null;
  const currentLang = userLanguage;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 15 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-zinc-100 dark:border-zinc-800 space-y-4 text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 mx-auto flex items-center justify-center border border-red-200 dark:border-red-900/50">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div className="space-y-1.5">
          <h3 className="font-extrabold text-base text-zinc-900 dark:text-white font-display">
            {t("delete", currentLang)} {translateAnimalName(animal.name, currentLang)}?
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {currentLang === "Tamil"
              ? `டேக் எண் ${animal.tagId} உடைய மாட்டை உங்கள் மந்தை பதிவேட்டில் இருந்து நிரந்தரமாக நீக்க விரும்புகிறீர்களா?`
              : currentLang === "Hindi"
              ? `क्या आप वाकई टैग आईडी ${animal.tagId} को अपने रिकॉर्ड से स्थायी रूप से हटाना चाहते हैं?`
              : `Are you sure you want to permanently remove tag ID ${animal.tagId} from your herd? This action cannot be undone.`}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={() => onConfirmDelete(animal.id)}
            className="py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t("delete", currentLang)}</span>
          </button>
          <button
            onClick={onClose}
            className="py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-xs transition-colors cursor-pointer"
          >
            {t("cancel", currentLang)}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteConfirmModal;
