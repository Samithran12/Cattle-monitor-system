import React, { useState, useEffect } from "react";
import { Language } from "../../utils/i18n";

interface OfflineBannerProps {
  userLanguage?: Language;
  pendingSyncCount?: number;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({
  userLanguage = "English",
  pendingSyncCount = 0,
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setIsDismissed(false);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setIsDismissed(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline || isDismissed) return null;

  return (
    <div className="sticky top-14 z-40 bg-amber-500 text-slate-950 px-4 py-2 text-xs font-bold shadow-md flex items-center justify-between gap-2 animate-slide-up border-b border-amber-600">
      <div className="flex items-center gap-2 min-w-0">
        <span className="material-symbols-outlined text-base shrink-0 animate-pulse">
          cloud_off
        </span>
        <span className="truncate">
          {userLanguage === "Tamil"
            ? "இணைய இணைப்பு இல்லை — பண்ணை தரவு உள்ளூரில் பாதுகாக்கப்பட்டுள்ளது"
            : userLanguage === "Hindi"
            ? "ऑफ़लाइन मोड सक्रिय — डेटा स्थानीय रूप से सुरक्षित है"
            : "Offline Mode — Data cached locally & will sync when connected"}
          {pendingSyncCount > 0 && ` (${pendingSyncCount} changes pending sync)`}
        </span>
      </div>

      <button
        onClick={() => setIsDismissed(true)}
        className="w-6 h-6 rounded-full bg-amber-600/30 hover:bg-amber-600/50 flex items-center justify-center shrink-0 cursor-pointer text-slate-900"
        title="Dismiss"
      >
        <span className="material-symbols-outlined text-sm">close</span>
      </button>
    </div>
  );
};

export default OfflineBanner;
