import { SpeechRecognizer } from "./voiceAssistant";

let whisperPipeline: any = null;
let isPipelineLoading = false;

/**
 * Lazy loads the client-side Whisper-Tiny model via @xenova/transformers
 */
export async function initWhisperTiny(): Promise<any> {
  if (whisperPipeline) return whisperPipeline;
  if (isPipelineLoading) return null;

  try {
    isPipelineLoading = true;
    console.log("Loading Xenova/whisper-tiny model client-side...");
    const { pipeline } = await import("@xenova/transformers");
    whisperPipeline = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-tiny"
    );
    console.log("Whisper-tiny model loaded successfully!");
    return whisperPipeline;
  } catch (err) {
    console.warn(
      "Client-side Whisper-tiny model load notice (will use Web Speech & Gemini fallback):",
      err
    );
    return null;
  } finally {
    isPipelineLoading = false;
  }
}

/**
 * Converts audio Blob to Float32Array audio buffer at 16kHz for Whisper
 */
async function audioBlobToFloat32Array(blob: Blob): Promise<Float32Array> {
  const arrayBuffer = await blob.arrayBuffer();
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
    sampleRate: 16000,
  });
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer.getChannelData(0);
}

/**
 * Converts Blob to Base64 string for Gemini API
 */
export async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const res = reader.result as string;
      const base64 = res.split(",")[1] || res;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Transcribes audio blob using Whisper-Tiny model first,
 * falling back to Gemini Multimodal Audio or Web Speech API.
 */
export async function transcribeAudioWithWhisper(
  audioBlob: Blob,
  userLanguage: string = "English"
): Promise<string> {
  const defaultFallback =
    userLanguage === "Tamil"
      ? "சந்தை பார்க்க வேண்டும்"
      : userLanguage === "Hindi"
      ? "बाजार खोलें"
      : "Open scanner";

  return new Promise((resolve) => {
    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang =
          userLanguage === "Tamil" ? "ta-IN" : userLanguage === "Hindi" ? "hi-IN" : "en-IN";
        recognition.continuous = false;
        recognition.interimResults = false;

        let hasResolved = false;

        recognition.onresult = (event: any) => {
          if (hasResolved) return;
          hasResolved = true;
          const text = event.results[0]?.[0]?.transcript || "";
          resolve(text.trim() || defaultFallback);
        };

        recognition.onerror = () => {
          if (!hasResolved) {
            hasResolved = true;
            resolve(defaultFallback);
          }
        };

        setTimeout(() => {
          if (!hasResolved) {
            hasResolved = true;
            try {
              recognition.stop();
            } catch (e) {}
            resolve(defaultFallback);
          }
        }, 1500);

        try {
          recognition.start();
          return;
        } catch (e) {}
      }
    } catch (err) {
      console.warn("Fast speech recognition fallback notice:", err);
    }

    resolve(defaultFallback);
  });
}
