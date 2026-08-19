import React, { useState } from "react";
import { UserProfile, TabType, Animal } from "../types";
import { t, Language } from "../utils/i18n";
import { requestPushNotificationPermission } from "../services/notificationService";

interface ProfileViewProps {
  user: UserProfile;
  animals?: Animal[];
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onTabChange: (tab: TabType) => void;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onGoogleSignIn?: () => void;
  isFirebaseAuthenticated?: boolean;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUpdateProfile,
  onLogout,
}) => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const safeUser: UserProfile = {
    name: user?.name || "S. Dhanush Kumar",
    farmName: user?.farmName || "Kongu Indigenous Cattle Farm",
    location: user?.location || "Dharapuram, Tiruppur Dist, Tamil Nadu",
    email: user?.email || "dhanush.farm@cattleiq.in",
    mobile: user?.mobile || "+91 98422 13456",
    totalAnimals: user?.totalAnimals || 4,
    totalRevenue: user?.totalRevenue || "₹1.48L",
    growth: user?.growth || "96%",
    language: user?.language || "English",
    photoUrl:
      user?.photoUrl ||
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAwXOIlrj2VA7zolpbseS7fMuqgdNXfkaOFPFNS0VWmkiqfLntFLK5th1upyD6ikBge6kDafP65zRkpM_jyy8BwwnPVg5xtR3KQxCIz7dJUFx4tYgzDAHAXNA5CGMZ-QGMID-4dx0M3y7Hq0s8ublwsT92IfgRcNuwvK4rHNBhoZgDoCdMMM3dbpREuDJhJU-tX2FvFnaVWwjXs4hgIaaMJnvlSdFvcy1yExTgMy2ZI-yBQQ7W6Eg9P5fjBsDYL8gXUvz5MZenzM_s",
  };

  const [editName, setEditName] = useState(safeUser.name);
  const [editFarmName, setEditFarmName] = useState(safeUser.farmName);
  const [editLocation, setEditLocation] = useState(safeUser.location);
  const [editMobile, setEditMobile] = useState(safeUser.mobile);
  const [editEmail, setEditEmail] = useState(safeUser.email);
  const currentLang = safeUser.language as Language;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      onUpdateProfile({ photoUrl: result });
      showToast("Profile picture updated!");
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: editName.trim() || safeUser.name,
      farmName: editFarmName.trim() || safeUser.farmName,
      location: editLocation.trim() || safeUser.location,
      mobile: editMobile.trim() || safeUser.mobile,
      email: editEmail.trim() || safeUser.email,
    });
    setShowEditProfile(false);
    showToast("Profile updated successfully!");
  };

  return (
    <main className="w-full px-4 py-4 pb-28 space-y-5 text-slate-900 font-sans">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-2xl animate-fade-in flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-emerald-400">check_circle</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Screen Title (Screen 3 in Reference) */}
      <div className="text-center pt-2">
        <h2 className="text-base font-bold text-slate-900 font-display">
          {t("profile", currentLang)}
        </h2>
      </div>

      {/* Centered Large Avatar with Edit Badge */}
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="relative">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-100">
            <img
              src={safeUser.photoUrl}
              alt={safeUser.name}
              className="w-full h-full object-cover"
            />
          </div>

          <label
            htmlFor="profile-photo-upload"
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-700 shadow-md flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors"
            title="Change Photo"
          >
            <span className="material-symbols-outlined text-base">edit</span>
            <input
              id="profile-photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </label>
        </div>

        <h3 className="font-extrabold text-lg text-slate-900 font-display">
          {safeUser.name}
        </h3>
        <p className="text-xs text-slate-500 font-medium">
          {safeUser.farmName}
        </p>
      </div>

      {/* Grouped Card 1: Personal Info (Directly matching Screen 3 in Reference) */}
      <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-[0_2px_14px_rgba(15,23,42,0.03)] space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-sm text-slate-900">
            {t("personalInfo", currentLang)}
          </h4>
          <button
            onClick={() => setShowEditProfile(true)}
            className="text-xs font-bold text-slate-900 hover:text-slate-600 transition-colors cursor-pointer"
          >
            {t("edit", currentLang)}
          </button>
        </div>

        <div className="space-y-3.5 divide-y divide-slate-50 text-xs">
          {/* Row 1: Name */}
          <div className="flex items-start gap-3 pt-1">
            <span className="material-symbols-outlined text-slate-400 text-lg shrink-0 mt-0.5">person</span>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] text-slate-400 block font-medium">Name</span>
              <span className="font-bold text-slate-900 block truncate">{safeUser.name}</span>
            </div>
          </div>

          {/* Row 2: Email */}
          <div className="flex items-start gap-3 pt-3">
            <span className="material-symbols-outlined text-slate-400 text-lg shrink-0 mt-0.5">mail</span>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] text-slate-400 block font-medium">E-mail</span>
              <span className="font-bold text-slate-900 block truncate">{safeUser.email}</span>
            </div>
          </div>

          {/* Row 3: Phone */}
          <div className="flex items-start gap-3 pt-3">
            <span className="material-symbols-outlined text-slate-400 text-lg shrink-0 mt-0.5">call</span>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] text-slate-400 block font-medium">Phone number</span>
              <span className="font-bold text-slate-900 block truncate font-mono">{safeUser.mobile}</span>
            </div>
          </div>

          {/* Row 4: Location */}
          <div className="flex items-start gap-3 pt-3">
            <span className="material-symbols-outlined text-slate-400 text-lg shrink-0 mt-0.5">home</span>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] text-slate-400 block font-medium">Home address</span>
              <span className="font-bold text-slate-900 block">{safeUser.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grouped Card 2: Account & App Settings */}
      <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-[0_2px_14px_rgba(15,23,42,0.03)] space-y-4">
        <h4 className="font-bold text-sm text-slate-900">
          {t("accountInfo", currentLang)}
        </h4>

        <div className="space-y-3.5 divide-y divide-slate-50 text-xs">
          {/* App Language Selector */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-400 text-lg">translate</span>
              <div>
                <span className="font-bold text-slate-900 block">{t("appLanguage", currentLang)}</span>
                <span className="text-[11px] text-slate-400">{safeUser.language}</span>
              </div>
            </div>

            <div className="flex bg-slate-100 p-0.5 rounded-full border border-slate-200/60">
              {(["English", "Tamil", "Hindi"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    onUpdateProfile({ language: lang });
                    showToast(`Language set to ${lang}`);
                  }}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                    safeUser.language === lang
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {lang === "Tamil" ? "தமிழ்" : lang === "Hindi" ? "हिंदी" : "EN"}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications Permission */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-400 text-lg">notifications</span>
              <div>
                <span className="font-bold text-slate-900 block">Push Notifications</span>
                <span className="text-[11px] text-slate-400">Vaccine & order alerts</span>
              </div>
            </div>

            <button
              onClick={async () => {
                const granted = await requestPushNotificationPermission();
                showToast(granted ? "Push notifications enabled!" : "Notifications active");
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Test Alert
            </button>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="w-full py-3.5 rounded-2xl bg-white hover:bg-red-50 text-red-600 font-bold text-xs border border-red-200/80 shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        <span className="material-symbols-outlined text-lg">logout</span>
        <span>{t("logout", currentLang)}</span>
      </button>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-3">
          <form
            onSubmit={handleSaveProfile}
            className="bg-white text-slate-900 w-full max-w-md rounded-3xl p-5 shadow-2xl border border-slate-100 space-y-3.5 animate-slide-up"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-sm text-slate-900 font-display">
                {t("edit", currentLang)} {t("personalInfo", currentLang)}
              </h3>
              <button
                type="button"
                onClick={() => setShowEditProfile(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Full Name</label>
              <input
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Farm Name</label>
              <input
                type="text"
                value={editFarmName}
                onChange={(e) => setEditFarmName(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">Phone</label>
                <input
                  type="text"
                  value={editMobile}
                  onChange={(e) => setEditMobile(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">Email</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-400">Location</label>
              <input
                type="text"
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="submit"
                className="py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all cursor-pointer active:scale-95"
              >
                {t("saveChanges", currentLang)}
              </button>

              <button
                type="button"
                onClick={() => setShowEditProfile(false)}
                className="py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                {t("close", currentLang)}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
};

export default ProfileView;
