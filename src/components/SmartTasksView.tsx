import React, { useState } from "react";
import { SmartTask, Animal, UserProfile } from "../types";
import { generatePersonalizedTasks } from "../utils/smartTaskGenerator";
import { t, translateAnimalName, translateTaskTitle, translateTaskDesc, translateTaskCategory, translateTime, translateLocation, Language } from "../utils/i18n";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  Plus,
  Sparkles,
  ListTodo,
  X,
  Clock,
  MapPin,
  ShieldCheck,
  CalendarCheck
} from "lucide-react";

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
    <main className="w-full px-4 py-4 pb-28 space-y-4 text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-200">
      {/* Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-5 shadow-[0_2px_14px_rgba(0,0,0,0.02)] dark:shadow-none flex items-center justify-between gap-3">
        <div>
          <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
            {t("smartTasks", currentLang)}
          </span>
          <h2 className="font-extrabold text-lg text-zinc-900 dark:text-white font-display mt-0.5">
            {t("todayTasks", currentLang)}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            {completedCount}/{tasks.length} {currentLang === "Tamil" ? "பணிகள் முடிக்கப்பட்டன" : currentLang === "Hindi" ? "कार्य पूर्ण हुए" : "tasks completed"}
          </p>
        </div>

        <button
          onClick={handleGenerateAiCarePlan}
          className="px-3.5 py-2.5 rounded-2xl bg-zinc-900 dark:bg-emerald-600 hover:bg-zinc-800 dark:hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0 active:scale-95"
        >
          <Sparkles className="w-4 h-4" />
          <span>{t("generateAiPlan", currentLang)}</span>
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
                ? "bg-zinc-900 dark:bg-emerald-600 text-white shadow-xs font-extrabold"
                : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            }`}
          >
            {cat === "All"
              ? t("all", currentLang)
              : cat === "Pending"
              ? t("pendingFilter", currentLang)
              : cat === "Completed"
              ? t("completedFilter", currentLang)
              : cat === "Feeding"
              ? currentLang === "Tamil"
                ? "தீவனம்"
                : currentLang === "Hindi"
                ? "चारा"
                : "Feeding"
              : cat === "Weather"
              ? currentLang === "Tamil"
                ? "வானிலை"
                : currentLang === "Hindi"
                ? "मौसम"
                : "Weather"
              : cat === "Vaccination"
              ? currentLang === "Tamil"
                ? "தடுப்பூசி"
                : currentLang === "Hindi"
                ? "टीकाकरण"
                : "Vaccination"
              : cat}
          </button>
        ))}

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs font-bold shrink-0 flex items-center gap-1 cursor-pointer ml-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{t("newTask", currentLang)}</span>
        </button>
      </div>

      {/* Task Checklist */}
      <div className="space-y-2.5">
        {filteredTasks.map((task) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white dark:bg-zinc-900 border rounded-3xl p-4 shadow-xs transition-all ${
              task.isCompleted
                ? "border-zinc-100 dark:border-zinc-800/80 opacity-60 dark:opacity-40"
                : "border-zinc-100 dark:border-zinc-800"
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => onToggleTask(task.id)}
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 cursor-pointer border transition-all ${
                  task.isCompleted
                    ? "bg-zinc-900 dark:bg-emerald-600 border-zinc-900 dark:border-emerald-600 text-white"
                    : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-zinc-500 text-transparent"
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.2 rounded font-semibold">
                      {translateTime(task.time, currentLang)}
                    </span>
                    {task.urgent && (
                      <span className="text-[9px] font-mono font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-1.5 py-0.2 rounded">
                        {t("priorityBadge", currentLang)}
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 font-semibold">
                    {translateTaskCategory(task.category, currentLang) || (currentLang === "Tamil" ? "பொது" : currentLang === "Hindi" ? "सामान्य" : "General")}
                  </span>
                </div>

                <h4
                  className={`font-bold text-xs leading-snug ${
                    task.isCompleted ? "line-through text-zinc-400 dark:text-zinc-500" : "text-zinc-900 dark:text-white"
                  }`}
                >
                  {translateTaskTitle(task.title, currentLang)}
                </h4>

                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  {translateTaskDesc(task.description, currentLang)}
                </p>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-50 dark:border-zinc-800/60 text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                  <span>
                    {currentLang === "Tamil" ? "மாடு" : currentLang === "Hindi" ? "पशु" : "Target"}:{" "}
                    <strong className="text-zinc-700 dark:text-zinc-300">
                      {translateAnimalName(task.animalName, currentLang)}
                    </strong>
                  </span>
                  <span>{translateLocation(task.location, currentLang)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="p-8 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 text-xs text-zinc-400 dark:text-zinc-500">
            {currentLang === "Tamil"
              ? "இந்தப் பிரிவில் பணிகள் எதுவும் இல்லை."
              : currentLang === "Hindi"
              ? "इस श्रेणी में कोई कार्य नहीं मिला।"
              : "No care tasks found in this filter category."}
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-3">
            <motion.form
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              onSubmit={handleCreateTask}
              className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white w-full max-w-md rounded-3xl p-5 shadow-2xl border border-zinc-100 dark:border-zinc-800 space-y-3.5"
            >
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white font-display">
                  {t("newTask", currentLang)}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mineral Mixture & Concentrate"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">Target Animal</label>
                  <select
                    value={newAnimalName}
                    onChange={(e) => setNewAnimalName(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none"
                  >
                    <option value="All Herd">All Herd</option>
                    {animals.map((a) => (
                      <option key={a.id} value={a.name}>
                        {a.name} ({a.tagId})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">Scheduled Time</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="07:00 AM"
                    className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">Description / Dosage</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Details of feed, dosage, or care instructions..."
                  className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="urgentTaskCheckbox"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="rounded text-zinc-900 dark:text-emerald-500 focus:ring-zinc-900"
                />
                <label htmlFor="urgentTaskCheckbox" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 cursor-pointer">
                  Mark as High Priority / Urgent
                </label>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="submit"
                  className="py-3 rounded-xl bg-zinc-900 dark:bg-emerald-600 hover:bg-zinc-800 dark:hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer active:scale-95"
                >
                  Add Care Task
                </button>

                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 font-bold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default SmartTasksView;
