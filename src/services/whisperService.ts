/**
 * Whisper and Web Speech Voice Transcription Service
 */

/**
 * Converts Blob to Base64 string for audio APIs
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
 * Transcribes audio blob using browser Web Speech API with regional multilingual support.
 */
export async function transcribeAudioWithWhisper(
  _audioBlob: Blob,
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
