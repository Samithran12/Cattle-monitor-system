import React, { useState } from "react";
import { SmartTask, Animal, UserProfile } from "../types";
import { generatePersonalizedTasks } from "../utils/smartTaskGenerator";
import { t, translateAnimalName, Language } from "../utils/i18n";

interface SmartTasksViewProps {
  tasks: SmartTask[];
  onToggleTask: (taskId: string) => void;
  onAddTask?: (task: Omit<SmartTask, "id">) => void;
  onRegenerateTasks?: (newTasks: SmartTask[]) => void;
  animals: Animal[];
  user: UserProfile;
  userLanguage?: string;
}

export const SmartTasksView: React.FC<SmartTasksViewProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
  onRegenerateTasks,
  animals,
  userLanguage = "English",
}) => {
  const currentLang = userLanguage as Language;
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAnimalName, setNewAnimalName] = useState(animals[0]?.name || "All Herd");
  const [newTime, setNewTime] = useState("07:00 AM");
  const [newDesc, setNewDesc] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleGenerateAiCarePlan = () => {
    const freshTasks = generatePersonalizedTasks(animals);
    if (onRegenerateTasks) {
      onRegenerateTasks(freshTasks);
    }
    showToast("Personalized AI care plan generated!");
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    if (onAddTask) {
      onAddTask({
        title: newTitle.trim(),
        animalName: newAnimalName,
        time: newTime,
        location: "Farm Shed",
        urgent: isUrgent,
        isCompleted: false,
        description: newDesc.trim() || "Daily farm care activity.",
        category: "General",
        isAiSuggested: false,
      });
    }

    setNewTitle("");
    setNewDesc("");
    setIsAddModalOpen(false);
    showToast("New care task added!");
  };

  const filteredTasks = tasks.filter((task) => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Pending") return !task.isCompleted;
    if (selectedCategory === "Completed") return task.isCompleted;
    return task.category === selectedCategory;
  });

  const completedCount = tasks.filter((t) => t.isCompleted).length;

  return (
    <main className="w-full px-4 py-4 pb-28 space-y-4 text-slate-900 font-sans">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-2xl animate-fade-in flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-emerald-400">task_alt</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-[0_2px_14px_rgba(15,23,42,0.03)] flex items-center justify-between gap-3">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            {t("smartTasks", currentLang)}
          </span>
          <h2 className="font-extrabold text-lg text-slate-900 font-display mt-0.5">
            {t("todayTasks", currentLang)}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {completedCount}/{tasks.length} tasks completed
          </p>
        </div>

        <button
          onClick={handleGenerateAiCarePlan}
          className="px-3.5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0 active:scale-95"
        >
          <span className="material-symbols-outlined text-base">auto_awesome</span>
          <span>AI Plan</span>
        </button>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
        {["All", "Pending", "Feeding", "Weather", "Vaccination", "Completed"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedCategory === cat
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {cat === "All"
              ? t("all", currentLang)
              : cat === "Feeding"
              ? "Feeding"
              : cat === "Weather"
              ? "Weather"
              : cat === "Vaccination"
              ? "Vaccination"
              : cat}
          </button>
        ))}

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold shrink-0 flex items-center gap-1 cursor-pointer ml-auto"
        >
          <span className="material-symbols-outlined text-sm font-bold">add</span>
          <span>{t("newTask", currentLang)}</span>
        </button>
      </div>

      {/* Task Checklist */}
      <div className="space-y-2.5">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white border rounded-3xl p-4 shadow-xs transition-all ${
              task.isCompleted ? "border-slate-100 opacity-60" : "border-slate-100"
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => onToggleTask(task.id)}
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 cursor-pointer border transition-all ${
                  task.isCompleted
                    ? "bg-slate-900 border-slate-900 text-white"
                    : "border-slate-300 hover:border-slate-900 text-transparent"
                }`}
              >
                <span className="material-symbols-outlined text-sm font-bold">check</span>
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-slate-700 bg-slate-100 px-2 py-0.2 rounded font-semibold">
                      {task.time}
                    </span>
                    {task.urgent && (
                      <span className="text-[9px] font-mono font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                        PRIORITY
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 font-semibold">
                    {task.category || "General"}
                  </span>
                </div>

                <h4
                  className={`font-bold text-xs leading-snug ${
                    task.isCompleted ? "line-through text-slate-400" : "text-slate-900"
                  }`}
                >
                  {task.title}
                </h4>

                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  {task.description}
                </p>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50 text-[10px] font-mono text-slate-400">
                  <span>Target: <strong className="text-slate-700">{translateAnimalName(task.animalName, currentLang)}</strong></span>
                  <span>{task.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-3">
          <form
            onSubmit={handleCreateTask}
            className="bg-white text-slate-900 w-full max-w-md rounded-3xl p-5 shadow-2xl border border-slate-100 space-y-3.5 animate-slide-up"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-sm text-slate-900 font-display">
                {t("newTask", currentLang)}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Task Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Deworm 3-month calf"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">Target Animal</label>
                <select
                  value={newAnimalName}
                  onChange={(e) => setNewAnimalName(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none cursor-pointer"
                >
                  <option value="All Herd">All Herd Animals</option>
                  {animals.map((a) => (
                    <option key={a.id} value={a.name}>
                      {translateAnimalName(a.name, currentLang)} ({a.breed})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">Schedule Time</label>
                <input
                  type="text"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Description</label>
              <textarea
                rows={2}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Dosage or feed instructions..."
                className="w-full bg-slate-50 text-slate-900 text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all cursor-pointer active:scale-95"
            >
              Save Care Task
            </button>
          </form>
        </div>
      )}
    </main>
  );
};

export default SmartTasksView;
