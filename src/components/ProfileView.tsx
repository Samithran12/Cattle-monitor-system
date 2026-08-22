import React, { useState } from "react";
import { UserProfile, TabType, Animal } from "../types";
import { t, translateFarmName, Language } from "../utils/i18n";
import { requestPushNotificationPermission } from "../services/notificationService";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Home,
  MapPin,
  Phone,
  Mail,
  Moon,
  Sun,
  Globe,
  Bell,
  LogOut,
  Edit2,
  X,
  ShieldCheck,
  Award
} from "lucide-react";

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
  isDarkMode,
  onToggleDarkMode,
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
    photoUrl: user?.photoUrl || "/assets/default-avatar.svg",
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
    <main className="w-full px-4 py-4 pb-28 space-y-5 text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-200">
      {/* Toast Feedback */}
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

      {/* Screen Title */}
      <div className="text-center pt-2">
        <h2 className="text-base font-bold text-zinc-900 dark:text-white font-display">
          {t("profile", currentLang)}
        </h2>
      </div>

      {/* Centered Large Avatar with Edit Badge */}
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="relative">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-md bg-zinc-100 dark:bg-zinc-800">
            <img
              src={safeUser.photoUrl}
              alt={safeUser.name}
              className="w-full h-full object-cover"
            />
          </div>

          <label
            htmlFor="profile-photo-upload"
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 shadow-md flex items-center justify-center cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
            title="Change Photo"
          >
            <Edit2 className="w-4 h-4" />
            <input
              id="profile-photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </label>
        </div>

        <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white font-display">
          {safeUser.name}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          {translateFarmName(safeUser.farmName, currentLang)}
        </p>
      </div>

      {/* Grouped Card 1: Personal Info */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-5 shadow-[0_2px_14px_rgba(0,0,0,0.02)] dark:shadow-none space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <span className="font-extrabold text-xs text-zinc-900 dark:text-white font-display uppercase tracking-wider">
            {t("personalInfo", currentLang)}
          </span>
          <button
            onClick={() => setShowEditProfile(true)}
            className="text-xs font-bold text-zinc-900 dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-1"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>{t("edit", currentLang)}</span>
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 dark:text-zinc-500 font-medium flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>{t("phoneLabel", currentLang)}</span>
            </span>
            <span className="font-bold text-zinc-900 dark:text-zinc-200 font-mono">{safeUser.mobile}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-400 dark:text-zinc-500 font-medium flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>{t("emailLabel", currentLang)}</span>
            </span>
            <span className="font-bold text-zinc-900 dark:text-zinc-200">{safeUser.email}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-400 dark:text-zinc-500 font-medium flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>{t("locationLabel", currentLang)}</span>
            </span>
            <span className="font-bold text-zinc-900 dark:text-zinc-200 text-right truncate max-w-[200px]">
              {safeUser.location}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-zinc-400 dark:text-zinc-500 font-medium flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>{t("registeredHerdCount", currentLang)}</span>
            </span>
            <span className="font-bold text-zinc-900 dark:text-zinc-200 font-mono">
              {safeUser.totalAnimals} {t("cattleUnit", currentLang)}
            </span>
          </div>
        </div>
      </div>

      {/* Grouped Card 2: App Preferences */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-5 shadow-[0_2px_14px_rgba(0,0,0,0.02)] dark:shadow-none space-y-4">
        <span className="font-extrabold text-xs text-zinc-900 dark:text-white font-display uppercase tracking-wider block border-b border-zinc-100 dark:border-zinc-800 pb-3">
          {t("appPreferences", currentLang)}
        </span>

        <div className="space-y-3.5 text-xs">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </div>
              <div>
                <span className="font-bold text-zinc-900 dark:text-white block">{t("darkModeTheme", currentLang)}</span>
                <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                  {isDarkMode ? t("darkModeDesc", currentLang) : t("lightModeDesc", currentLang)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onToggleDarkMode}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 cursor-pointer ${
                isDarkMode ? "bg-emerald-600 justify-end" : "bg-zinc-300 dark:bg-zinc-700 justify-start"
              }`}
            >
              <span className="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform" />
            </button>
          </div>

          {/* Language Selector */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-zinc-900 dark:text-white block">{t("languageSetting", currentLang)}</span>
                <span className="text-[11px] text-zinc-400 dark:text-zinc-500">{t("languageDesc", currentLang)}</span>
              </div>
            </div>

            <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-full border border-zinc-200/60 dark:border-zinc-700">
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
                      ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs"
                      : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  {lang === "Tamil" ? "தமிழ்" : lang === "Hindi" ? "हिंदी" : "EN"}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications Permission */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-zinc-900 dark:text-white block">{t("alertsNotifications", currentLang)}</span>
                <span className="text-[11px] text-zinc-400 dark:text-zinc-500">Vaccine & order alerts</span>
              </div>
            </div>

            <button
              onClick={async () => {
                const granted = await requestPushNotificationPermission();
                showToast(granted ? "Push notifications enabled!" : "Notifications active");
              }}
              className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Test Alert
            </button>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="w-full py-3.5 rounded-2xl bg-white dark:bg-zinc-900 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 font-bold text-xs border border-red-200/80 dark:border-red-900/50 shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-98"
      >
        <LogOut className="w-4 h-4" />
        <span>{t("logout", currentLang)}</span>
      </button>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showEditProfile && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-3">
            <motion.form
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              onSubmit={handleSaveProfile}
              className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white w-full max-w-md rounded-3xl p-5 shadow-2xl border border-zinc-100 dark:border-zinc-800 space-y-3.5"
            >
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white font-display">
                  {t("edit", currentLang)} {t("personalInfo", currentLang)}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowEditProfile(false)}
                  className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">
                  {currentLang === "Tamil" ? "முழு பெயர்" : currentLang === "Hindi" ? "पूरा नाम" : "Full Name"}
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">
                  {t("farmName", currentLang)}
                </label>
                <input
                  type="text"
                  value={editFarmName}
                  onChange={(e) => setEditFarmName(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">{t("phoneLabel", currentLang)}</label>
                  <input
                    type="text"
                    value={editMobile}
                    onChange={(e) => setEditMobile(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">{t("emailLabel", currentLang)}</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500">{t("locationLabel", currentLang)}</label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="submit"
                  className="py-3 rounded-xl bg-zinc-900 dark:bg-emerald-600 hover:bg-zinc-800 dark:hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer active:scale-95"
                >
                  {t("saveChanges", currentLang)}
                </button>

                <button
                  type="button"
                  onClick={() => setShowEditProfile(false)}
                  className="py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-xs transition-colors cursor-pointer"
                >
                  {t("close", currentLang)}
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ProfileView;
