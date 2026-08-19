import React, { useState, useRef, useEffect } from "react";
import { AdvisorMessage, TabType } from "../types";
import { t, Language } from "../utils/i18n";

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
    <main className="w-full px-4 py-4 pb-32 flex flex-col h-[calc(100vh-140px)] text-slate-900 font-sans">
      {/* Top Header */}
      <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-xs flex items-center justify-between gap-3 shrink-0 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">psychology</span>
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-slate-900 font-display">
              {t("aiAdvisorTitle", currentLang)}
            </h2>
            <p className="text-[11px] text-slate-500">
              Livestock economics & veterinary guidance
            </p>
          </div>
        </div>

        {onClearHistory && messages.length > 0 && (
          <button
            onClick={onClearHistory}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Clear Chat History"
          >
            <span className="material-symbols-outlined text-lg">delete_sweep</span>
          </button>
        )}
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 no-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 text-xs font-medium leading-relaxed shadow-xs ${
                msg.sender === "user"
                  ? "bg-slate-900 text-white rounded-br-xs"
                  : "bg-white text-slate-800 border border-slate-100 rounded-bl-xs"
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
                <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-slate-900 font-mono">
                  {msg.bento.estimatedRoi && (
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <span className="text-[9px] text-slate-400 uppercase block">Est. ROI</span>
                      <span className="font-bold text-xs text-emerald-700">{msg.bento.estimatedRoi}</span>
                    </div>
                  )}
                  {msg.bento.initialHerdSize && (
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <span className="text-[9px] text-slate-400 uppercase block">Recommended</span>
                      <span className="font-bold text-xs">{msg.bento.initialHerdSize}</span>
                    </div>
                  )}
                  {msg.bento.riskLevel && (
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <span className="text-[9px] text-slate-400 uppercase block">Risk Profile</span>
                      <span className="font-bold text-xs">{msg.bento.riskLevel}</span>
                    </div>
                  )}
                  {msg.bento.demandBadge && (
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                      <span className="text-[9px] text-slate-400 uppercase block">Market Demand</span>
                      <span className="font-bold text-xs text-slate-900 truncate">{msg.bento.demandBadge}</span>
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
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-full text-[11px] font-semibold transition-colors cursor-pointer shadow-xs"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-slate-100 w-fit text-xs text-slate-500 shadow-xs">
            <span className="material-symbols-outlined text-base text-slate-900 animate-spin">
              progress_activity
            </span>
            <span>Thinking...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-20 z-20 bg-white border border-slate-200 rounded-3xl p-2 shadow-lg flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors shrink-0"
          title="Upload Photo"
        >
          <span className="material-symbols-outlined text-lg">add_photo_alternate</span>
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
          className="flex-1 bg-transparent text-slate-900 text-xs font-medium outline-none px-2"
        />

        <button
          type="submit"
          disabled={(!input.trim() && !selectedImage) || isLoading}
          className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all shrink-0 cursor-pointer ${
            input.trim() || selectedImage
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-slate-100 text-slate-400"
          }`}
        >
          <span className="material-symbols-outlined text-lg font-bold">arrow_upward</span>
        </button>
      </form>
    </main>
  );
};

export default AdvisorView;
