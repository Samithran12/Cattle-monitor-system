import React, { useState, useEffect, useRef } from "react";
import { TabType, Animal, UserProfile } from "../types";
import { parseVoiceIntent } from "../services/geminiService";
import { Language } from "../utils/i18n";

interface VoiceAssistantWidgetProps {
  currentTab: TabType;
  userLanguage: string;
  onNavigate: (tab: TabType) => void;
  onOpenScanner: () => void;
  onOpenAddAnimal: () => void;
  onChangeLanguage: (lang: Language) => void;
  onToggleDarkMode: () => void;
  animals: Animal[];
  user: UserProfile;
}

export const VoiceAssistantWidget: React.FC<VoiceAssistantWidgetProps> = ({
  currentTab,
  userLanguage = "English",
  onNavigate,
  onOpenScanner,
  onOpenAddAnimal,
  onChangeLanguage,
  animals,
  user,
}) => {
  const currentLang = userLanguage as Language;
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("Tap microphone or speak");
  const [history, setHistory] = useState<Array<{ sender: "user" | "ai"; text: string }>>([]);

  const recognitionRef = useRef<any>(null);

  const suggestedCommands =
    currentLang === "Tamil"
      ? [
          "மாடுகளை காட்டு",
          "புதிய மாடு பதிவு செய்",
          "தீவனம் வாங்க வேண்டும்",
          "இன்றைய பணிகள் என்ன?",
          "மருத்துவருக்கு அழை",
        ]
      : currentLang === "Hindi"
      ? [
          "मेरे पशु दिखाओ",
          "नया पशु जोड़ें",
          "चारा खरीदना है",
          "आज के कार्य दिखाओ",
          "डॉक्टर को बुलाओ",
        ]
      : [
          "Show my cattle",
          "Register a new cow",
          "I want to buy fodder",
          "What are today's tasks?",
          "Emergency vet call",
        ];

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang =
        currentLang === "Tamil"
          ? "ta-IN"
          : currentLang === "Hindi"
          ? "hi-IN"
          : "en-IN";

      recognition.onstart = () => {
        setIsListening(true);
        setStatusMessage(
          currentLang === "Tamil" ? "கேட்கிறது..." : currentLang === "Hindi" ? "सुन रहा हूँ..." : "Listening..."
        );
      };

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        handleVoiceInput(text);
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        setIsProcessing(false);
        setStatusMessage("Mic ready. Tap to speak.");
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [currentLang]);

  const speakText = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      if (currentLang === "Tamil") utterance.lang = "ta-IN";
      else if (currentLang === "Hindi") utterance.lang = "hi-IN";
      else utterance.lang = "en-IN";
      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech synthesis fallback
    }
  };

  const handleVoiceInput = async (userInput: string) => {
    if (!userInput.trim()) return;

    setIsProcessing(true);
    setStatusMessage("Processing query...");
    setHistory((prev) => [...prev, { sender: "user", text: userInput }]);

    try {
      const result = await parseVoiceIntent(userInput, currentLang);

      const responseSpeech = result.speakText || result.responseText || "Understood";
      setAiResponse(result.responseText || "");
      setHistory((prev) => [...prev, { sender: "ai", text: result.responseText || responseSpeech }]);
      speakText(responseSpeech);

      if (result.type === "function_call") {
        if (result.functionName === "navigate_tab" && result.args?.tab) {
          setTimeout(() => {
            onNavigate(result.args?.tab as TabType);
          }, 1000);
        } else if (result.functionName === "open_scanner") {
          setTimeout(() => onOpenScanner(), 800);
        } else if (result.functionName === "open_add_animal") {
          setTimeout(() => onOpenAddAnimal(), 800);
        } else if (result.functionName === "open_marketplace") {
          setTimeout(() => onNavigate("market"), 800);
        } else if (result.functionName === "set_language" && result.args?.language) {
          onChangeLanguage(result.args.language as Language);
        }
      }
    } catch {
      setAiResponse("Understood query.");
    } finally {
      setIsProcessing(false);
      setStatusMessage("Tap microphone or speak");
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setTranscript("");
      setAiResponse(null);
      try {
        recognitionRef.current?.start();
      } catch {
        // Recognition fallback
      }
    }
  };

  if (currentTab === "scanner") return null;

  return (
    <>
      {/* Floating Microphone Trigger */}
      <div className="fixed bottom-20 inset-x-0 max-w-md mx-auto pointer-events-none px-4 flex justify-end z-40">
        <button
          onClick={() => {
            setIsOpen(true);
            setTimeout(() => toggleListening(), 300);
          }}
          className="pointer-events-auto w-13 h-13 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-xl flex items-center justify-center cursor-pointer transition-all active:scale-95 border border-slate-700"
          title="Voice Assistant"
        >
          <span className="material-symbols-outlined text-2xl font-bold">mic</span>
        </button>
      </div>

      {/* Voice Assistant Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-3">
          <div className="bg-white text-slate-900 w-full max-w-md rounded-3xl p-5 shadow-2xl border border-slate-100 space-y-4 animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-base font-bold">mic</span>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 font-display">
                  Voice Assistant
                </h3>
              </div>

              <button
                onClick={() => {
                  window.speechSynthesis?.cancel();
                  setIsOpen(false);
                }}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            {/* Mic Visualizer Area */}
            <div className="py-6 flex flex-col items-center justify-center space-y-3">
              <button
                onClick={toggleListening}
                className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer ${
                  isListening
                    ? "bg-red-500 text-white ring-8 ring-red-100 animate-pulse"
                    : isProcessing
                    ? "bg-slate-900 text-white animate-spin"
                    : "bg-slate-900 text-white hover:scale-105"
                }`}
              >
                <span className="material-symbols-outlined text-3xl font-bold">
                  {isProcessing ? "progress_activity" : "mic"}
                </span>
              </button>

              <p className="text-xs font-bold text-slate-700 font-mono">
                {statusMessage}
              </p>

              {transcript && (
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 font-medium max-w-xs text-center">
                  "{transcript}"
                </div>
              )}

              {aiResponse && (
                <div className="p-3 bg-slate-900 text-white rounded-2xl text-xs leading-relaxed max-w-xs text-center font-medium shadow-xs">
                  {aiResponse}
                </div>
              )}
            </div>

            {/* Quick Command Suggestions */}
            <div className="space-y-1.5 pt-1 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase text-slate-400">
                Suggested Commands:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {suggestedCommands.map((cmd, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setTranscript(cmd);
                      handleVoiceInput(cmd);
                    }}
                    className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-full text-[11px] font-semibold border border-slate-200 transition-colors cursor-pointer"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceAssistantWidget;
