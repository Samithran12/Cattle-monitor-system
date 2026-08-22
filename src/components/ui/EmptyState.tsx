import React from "react";

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  className = "",
}) => {
  return (
    <div
      className={`p-8 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 flex flex-col items-center justify-center space-y-3 shadow-xs ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex items-center justify-center border border-zinc-200/80 dark:border-zinc-700">
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </div>

      <div className="space-y-1 max-w-xs">
        <h4 className="text-sm font-extrabold text-zinc-900 dark:text-white font-display">
          {title}
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {description}
        </p>
      </div>

      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-2 px-4 py-2 bg-zinc-900 dark:bg-emerald-600 hover:bg-zinc-800 dark:hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all active:scale-95 shadow-xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm font-bold">add</span>
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
