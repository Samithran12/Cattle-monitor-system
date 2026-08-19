import React, { useState } from "react";
import { Animal } from "../types";

interface DeleteConfirmModalProps {
  animal: Animal;
  onConfirmDelete: (animalId: string) => void;
  onClose: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  animal,
  onConfirmDelete,
  onClose,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onConfirmDelete(animal.id);
      setIsDeleting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white text-slate-900 w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4 animate-slide-up">
        <div className="w-12 h-12 bg-red-50 text-red-600 border border-red-200 rounded-2xl flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-2xl font-bold">
            delete_forever
          </span>
        </div>

        <div className="text-center space-y-1">
          <h3 className="font-extrabold text-base text-slate-900 font-display">
            Remove {animal.name}?
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Tag ID: <strong className="text-slate-900">{animal.tagId}</strong> ({animal.breed}). This will delete the animal's biometric digital passport and medical timeline.
          </p>
        </div>

        <div className="flex gap-2.5 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Removing...</span>
              </>
            ) : (
              <span>Confirm Delete</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
