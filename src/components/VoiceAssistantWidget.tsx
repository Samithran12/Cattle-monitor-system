import React, { useState, useEffect, useRef } from "react";
import { TabType, Animal, UserProfile } from "../types";
import { speakResponse, SpeechRecognizer } from "../services/voiceAssistant";
import { Language } from "../utils/i18n";
import { motion, AnimatePresence } from "motion/react";
import { Mic, MicOff, Sparkles, X } from "lucide-react";

interface VoiceAssistantWidgetProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  user: UserProfile;
  animals: Animal[];
  userLanguage?: Language | string;
}

export const VoiceAssistantWidget: React.FC<VoiceAssistantWidgetProps> = ({
  currentTab,
  onTabChange,
  animals,
  userLanguage = "English",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const recognizerRef = useRef<SpeechRecognizer | null>(null);
  const currentLang = (userLanguage as Language) || "English";

  if (currentTab === "scanner") return null;

  const getLangCode = () => {
    if (currentLang === "Tamil") return "ta-IN";
    if (currentLang === "Hindi") return "hi-IN";
    return "en-IN";
  };

  const startListening = () => {
    const langCode = getLangCode();
    const recognizer = new SpeechRecognizer(langCode);
    recognizerRef.current = recognizer;

    if (!recognizer.isSupported) {
      setResponseMsg("Speech recognition is not supported on this device/browser.");
      return;
    }

    setIsListening(true);
    setTranscript("");
    setResponseMsg(
      currentLang === "Tamil"
        ? "கேட்கிறேன்... சொல்லுங்கள்"
        : currentLang === "Hindi"
        ? "सुन रहा हूँ... बोलिए"
        : "Listening... speak your command"
    );

    recognizer.startListening(
      (text, isFinal) => {
        setTranscript(text);
        if (isFinal && text.trim()) {
          processVoiceCommand(text.trim());
        }
      },
      () => {
        setIsListening(false);
        setResponseMsg("Couldn't hear clearly. Tap mic to try again.");
      },
      () => {
        setIsListening(false);
      }
    );
  };

  const stopListening = () => {
    if (recognizerRef.current) {
      recognizerRef.current.stopListening();
    }
    setIsListening(false);
  };

  const processVoiceCommand = (text: string) => {
    const lower = text.toLowerCase();
    let reply = "";
    let targetTab: TabType | null = null;

    if (lower.includes("scan") || lower.includes("camera") || lower.includes("noseprint") || lower.includes("ஸ்கேன்")) {
      targetTab = "scanner";
      reply = currentLang === "Tamil" ? "கால்நடை ஸ்கேனர் திறக்கப்படுகிறது..." : "Opening Biometric Scanner...";
    } else if (lower.includes("herd") || lower.includes("cows") || lower.includes("animals") || lower.includes("மாடுகள்") || lower.includes("மந்தை")) {
      targetTab = "animals";
      reply = currentLang === "Tamil" ? `உங்கள் பண்ணையில் ${animals.length} மாடுகள் பதிவு செய்யப்பட்டுள்ளன.` : `Showing your herd of ${animals.length} registered cattle.`;
    } else if (lower.includes("market") || lower.includes("buy") || lower.includes("sell") || lower.includes("விலை") || lower.includes("சந்தை")) {
      targetTab = "market";
      reply = currentLang === "Tamil" ? "கால்நடை சந்தை திறக்கப்படுகிறது..." : "Navigating to CattleIQ Marketplace...";
    } else if (lower.includes("advisor") || lower.includes("feed") || lower.includes("doctor") || lower.includes("உதவி") || lower.includes("ஆலோசனை")) {
      targetTab = "advisor";
      reply = currentLang === "Tamil" ? "AI கால்நடை ஆலோசகர் திறக்கப்படுகிறது..." : "Opening AI Livestock Advisor...";
    } else if (lower.includes("task") || lower.includes("today") || lower.includes("வேலை")) {
      targetTab = "tasks";
      reply = currentLang === "Tamil" ? "இன்றைய பணிகளைப் பார்க்கிறீர்கள்..." : "Opening Today's Smart Care Tasks...";
    } else if (lower.includes("home") || lower.includes("முகப்பு")) {
      targetTab = "home";
      reply = currentLang === "Tamil" ? "முகப்புப் பக்கத்திற்கு செல்கிறது..." : "Going to Dashboard Home...";
    } else {
      reply = currentLang === "Tamil" ? `புரிந்துகொண்டேன்: "${text}"` : `Understood: "${text}"`;
    }

    setResponseMsg(reply);
    speakResponse(reply, getLangCode());

    if (targetTab) {
      setTimeout(() => {
        onTabChange(targetTab!);
        setIsOpen(false);
      }, 1000);
    }
  };

  return (
    <>
      {/* Floating Orb Button */}
      <div className="fixed bottom-22 right-4 z-40">
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            setIsOpen(true);
            startListening();
          }}
          className="w-13 h-13 rounded-full bg-zinc-900 dark:bg-emerald-600 text-white shadow-xl flex items-center justify-center cursor-pointer border-2 border-white dark:border-zinc-800 ring-4 ring-emerald-500/20 active:scale-95 group"
          title="Voice Assistant"
        >
          <Mic className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </motion.button>
      </div>

      {/* Voice Assistant Sheet */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-3">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-zinc-100 dark:border-zinc-800 space-y-4 text-center"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>CattleIQ Voice Assistant</span>
                </div>
                <button
                  onClick={() => {
                    stopListening();
                    setIsOpen(false);
                  }}
                  className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Pulsating Voice Mic Core */}
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                {isListening && (
                  <>
                    <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
                    <div className="absolute inset-2 rounded-full bg-emerald-500/30 animate-pulse" />
                  </>
                )}
                <button
                  type="button"
                  onClick={() => (isListening ? stopListening() : startListening())}
                  className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-all cursor-pointer ${
                    isListening ? "bg-red-500 scale-105" : "bg-zinc-900 dark:bg-emerald-600"
                  }`}
                >
                  {isListening ? <Mic className="w-7 h-7 animate-pulse" /> : <MicOff className="w-7 h-7" />}
                </button>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-zinc-900 dark:text-white">
                  {transcript || (isListening ? "Listening to your voice..." : "Tap mic to speak")}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                  {responseMsg}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                {["Scan Cattle", "My Herd", "Today's Tasks", "Marketplace"].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => processVoiceCommand(cmd)}
                    className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-[10px] font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer"
                  >
                    "{cmd}"
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceAssistantWidget;
