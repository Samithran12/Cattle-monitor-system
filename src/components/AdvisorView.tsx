import React, { useState, useRef, useEffect } from "react";
import { AdvisorMessage, TabType } from "../types";
import { t, Language } from "../utils/i18n";
import { motion, AnimatePresence } from "motion/react";
import {
  Brain,
  Trash2,
  Image as ImageIcon,
  ArrowUp,
  Sparkles,
  TrendingUp,
  ShieldAlert,
  BarChart3,
  Lightbulb
} from "lucide-react";

interface AdvisorViewProps {
  messages: AdvisorMessage[];
  onSendMessage: (text: string, image?: string) => Promise<void>;
  isLoading: boolean;
  onTabChange: (tab: TabType) => void;
  userLanguage?: Language;
  onClearHistory?: () => void;
}

export const AdvisorView: React.FC<AdvisorViewProps> = ({
  messages,
  onSendMessage,
  isLoading,
  userLanguage = "English",
  onClearHistory,
}) => {
  const [input, setInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentLang = userLanguage;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !selectedImage) || isLoading) return;

    onSendMessage(input.trim(), selectedImage || undefined);
    setInput("");
    setSelectedImage(null);
  };

  const handleSuggestionClick = (suggestionText: string) => {
    if (isLoading) return;
    onSendMessage(suggestionText);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="w-full px-4 py-4 pb-32 flex flex-col h-[calc(100vh-140px)] text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-200">
      {/* Top Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-4 shadow-xs flex items-center justify-between gap-3 shrink-0 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-zinc-900 dark:text-white font-display">
              {t("aiAdvisorTitle", currentLang)}
            </h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              {t("advisorSubtitle", currentLang)}
            </p>
          </div>
        </div>

        {onClearHistory && messages.length > 0 && (
          <button
            onClick={onClearHistory}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title={t("clearChat", currentLang)}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 no-scrollbar">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 text-xs font-medium leading-relaxed shadow-xs ${
                msg.sender === "user"
                  ? "bg-zinc-900 dark:bg-emerald-700 text-white rounded-br-xs"
                  : "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-100 dark:border-zinc-800 rounded-bl-xs"
              }`}
            >
              {msg.image && (
                <div className="mb-2 rounded-2xl overflow-hidden max-h-48 border border-white/20">
                  <img src={msg.image} alt="Uploaded" className="w-full h-full object-cover" />
                </div>
              )}

              <p className="whitespace-pre-line">{msg.text}</p>

              {/* Bento ROI / Financial Card */}
              {msg.bento && (
                <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-2 gap-2 text-zinc-900 dark:text-zinc-100 font-mono">
                  {msg.bento.estimatedRoi && (
                    <div className="bg-zinc-50 dark:bg-zinc-800/60 p-2 rounded-xl border border-zinc-100 dark:border-zinc-700">
                      <span className="text-[9px] text-zinc-400 uppercase flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-emerald-500" />
                        <span>Est. ROI</span>
                      </span>
                      <span className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                        {msg.bento.estimatedRoi}
                      </span>
                    </div>
                  )}
                  {msg.bento.demandBadge && (
                    <div className="bg-zinc-50 dark:bg-zinc-800/60 p-2 rounded-xl border border-zinc-100 dark:border-zinc-700">
                      <span className="text-[9px] text-zinc-400 uppercase flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-cyan-500" />
                        <span>Demand</span>
                      </span>
                      <span className="font-extrabold text-xs text-cyan-600 dark:text-cyan-400 truncate block">
                        {msg.bento.demandBadge}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Suggestions Chips */}
            {msg.sender === "advisor" && msg.suggestions && msg.suggestions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2 max-w-[85%]">
                {msg.suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(sug)}
                    className="px-3 py-1.5 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 rounded-full text-[11px] font-semibold transition-colors cursor-pointer shadow-2xs flex items-center gap-1"
                  >
                    <Lightbulb className="w-3 h-3 text-amber-500" />
                    <span>{sug}</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 p-3 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 w-fit text-xs text-zinc-500 dark:text-zinc-400 shadow-xs">
            <span className="material-symbols-outlined text-base text-zinc-900 dark:text-white animate-spin">
              progress_activity
            </span>
            <span>
              {currentLang === "Tamil"
                ? "AI ஆலோசனை தயாராகிறது..."
                : currentLang === "Hindi"
                ? "एआई परामर्श तैयार हो रहा है..."
                : "Synthesizing livestock insights..."}
            </span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-20 z-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-2 shadow-lg flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center cursor-pointer transition-colors shrink-0"
          title="Upload Photo for Diagnostic Advice"
        >
          <ImageIcon className="w-5 h-5" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("askPlaceholder", currentLang)}
          className="flex-1 bg-transparent text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 text-xs font-medium outline-none px-2"
        />

        <button
          type="submit"
          disabled={(!input.trim() && !selectedImage) || isLoading}
          className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all shrink-0 cursor-pointer ${
            input.trim() || selectedImage
              ? "bg-zinc-900 dark:bg-emerald-600 text-white shadow-xs"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500"
          }`}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </form>
    </main>
  );
};

export default AdvisorView;
