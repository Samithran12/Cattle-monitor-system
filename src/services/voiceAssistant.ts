import { TabType } from "../types";

export interface VoiceActionResult {
  type: "function_call" | "conversation";
  functionName?: string;
  args?: Record<string, any>;
  responseText?: string;
  speakText?: string;
}

// Function Registry Interface for CattleIQ
export interface RegisteredAppFunctions {
  navigateTo: (tab: TabType) => void;
  openScanner: () => void;
  openAddAnimal: () => void;
  openPassport: (animalIdOrTag?: string) => void;
  openMarketplace: (category?: string) => void;
  changeLanguage: (lang: "English" | "Tamil" | "Hindi") => void;
  toggleDarkMode: () => void;
  searchHerd: (query: string) => void;
}

// Web Speech Synthesis (TTS) Helper for Multilingual Voice Output (Tamil, Hindi, English)
export function speakResponse(text: string, lang: string = "en-IN") {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  try {
    window.speechSynthesis.cancel(); // Stop any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Normalize language tag (ta-IN, hi-IN, en-IN)
    let targetLang = lang;
    if (lang === "Tamil" || lang === "ta") targetLang = "ta-IN";
    if (lang === "Hindi" || lang === "hi") targetLang = "hi-IN";
    if (lang === "English" || lang === "en") targetLang = "en-IN";

    utterance.lang = targetLang;
    
    // Find exact voice matching target language (ta, hi, en)
    const voices = window.speechSynthesis.getVoices();
    const langPrefix = targetLang.split("-")[0].toLowerCase();
    
    const matchedVoice = voices.find(
      (v) => v.lang.toLowerCase().replace("_", "-").startsWith(targetLang.toLowerCase())
    ) || voices.find(
      (v) => v.lang.toLowerCase().startsWith(langPrefix)
    );

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.rate = 0.92; // Natural, clear rate for regional farmers
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn("Speech Synthesis error:", err);
  }
}

// Web Speech Recognition (STT) Setup with dynamic language selection
export class SpeechRecognizer {
  private recognition: any = null;
  public isSupported: boolean = false;

  constructor(lang: string = "ta-IN") {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.isSupported = true;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = lang;
    }
  }

  public setLanguage(lang: string) {
    if (this.recognition) {
      this.recognition.lang = lang;
    }
  }

  public startListening(
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (err: any) => void,
    onEnd: () => void
  ) {
    if (!this.recognition) {
      onError("Speech Recognition not supported in this browser.");
      return;
    }

    this.recognition.onresult = (event: any) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      const text = final || interim;
      onResult(text, !!final);
    };

    this.recognition.onerror = (event: any) => {
      onError(event.error);
    };

    this.recognition.onend = () => {
      onEnd();
    };

    try {
      this.recognition.start();
    } catch (e) {
      // If already started, ignore error
    }
  }

  public stopListening() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }
  }
}
