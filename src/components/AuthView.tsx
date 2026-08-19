import React, { useState } from "react";
import { UserProfile } from "../types";
import { auth, googleProvider, signInWithPopup } from "../lib/firebase";

interface AuthViewProps {
  onLoginSuccess: (user: UserProfile) => void;
}

const CATTLE_HERO_BG = "/cows/kangeyam.jpg";

export const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [authStep, setAuthStep] = useState<"form" | "otp">("form");
  const [name, setName] = useState("");
  const [farmName, setFarmName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [language, setLanguage] = useState<"English" | "Tamil" | "Hindi">("English");

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile.trim() && !email.trim() && !name.trim()) return;
    setAuthStep("otp");
  };

  const handleVerifyOtpAndLogin = (e: React.FormEvent) => {
    e.preventDefault();
    completeLogin();
  };

  const completeLogin = (overrideData?: Partial<UserProfile>) => {
    const finalName =
      overrideData?.name ||
      name.trim() ||
      (email ? email.split("@")[0] : "S. Dhanush Kumar");
    const finalEmail =
      overrideData?.email || email.trim() || "dhanush.farm@cattleiq.in";
    const finalFarm =
      overrideData?.farmName || farmName.trim() || "Kongu Indigenous Cattle Farm";
    const finalLocation =
      overrideData?.location || location.trim() || "Dharapuram, Tiruppur Dist";
    const finalMobile =
      overrideData?.mobile || mobile.trim() || "+91 98422 13456";

    onLoginSuccess({
      name: finalName,
      farmName: finalFarm,
      location: finalLocation,
      email: finalEmail,
      mobile: finalMobile,
      totalAnimals: 4,
      totalRevenue: "₹1.48L",
      growth: "96%",
      language,
      photoUrl:
        overrideData?.photoUrl ||
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAwXOIlrj2VA7zolpbseS7fMuqgdNXfkaOFPFNS0VWmkiqfLntFLK5th1upyD6ikBge6kDafP65zRkpM_jyy8BwwnPVg5xtR3KQxCIz7dJUFx4tYgzDAHAXNA5CGMZ-QGMID-4dx0M3y7Hq0s8ublwsT92IfgRcNuwvK4rHNBhoZgDoCdMMM3dbpREuDJhJU-tX2FvFnaVWwjXs4hgIaaMJnvlSdFvcy1yExTgMy2ZI-yBQQ7W6Eg9P5fjBsDYL8gXUvz5MZenzM_s",
    });
  };

  const handleGoogleLogin = async () => {
    try {
      if (auth && googleProvider) {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        completeLogin({
          name: user.displayName || "Google Farmer",
          email: user.email || "farmer@gmail.com",
          photoUrl: user.photoURL || undefined,
        });
      } else {
        completeLogin({
          name: "S. Dhanush Kumar",
          email: "dhanush.farm@cattleiq.in",
        });
      }
    } catch {
      completeLogin({
        name: "S. Dhanush Kumar",
        email: "dhanush.farm@cattleiq.in",
      });
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 text-slate-900 font-sans overflow-hidden bg-slate-900">
      {/* 1. Atmospheric Faded Cattle Image Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={CATTLE_HERO_BG}
          alt="Indigenous Cattle Background"
          className="w-full h-full object-cover scale-105 filter blur-[1.5px] opacity-40 brightness-90"
        />
        {/* Soft Multi-layered Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/40" />
      </div>

      {/* 2. Glassmorphic Login Card */}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-2xl border border-white/40 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] space-y-5 animate-slide-up relative z-10">
        {/* Branding Header with Animated Icon Badge */}
        <div className="text-center space-y-1">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-md border border-slate-700">
            <span className="material-symbols-outlined text-3xl font-bold">
              pets
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight mt-2">
            CattleIQ
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            {language === "Tamil"
              ? "ஸ்மார்ட் கால்நடை மேலாண்மை & மந்தை நுண்ணறிவு"
              : language === "Hindi"
              ? "स्मार्ट पशुधन और झुंड प्रबंधन प्रणाली"
              : "Smart Livestock & Herd Intelligence"}
          </p>
        </div>

        {/* Multilingual Switcher Pill */}
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
          {(["English", "Tamil", "Hindi"] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setLanguage(lang)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                language === lang
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {lang === "Tamil" ? "தமிழ்" : lang === "Hindi" ? "हिंदी" : "English"}
            </button>
          ))}
        </div>

        {/* Authentication Steps */}
        {authStep === "form" ? (
          <form onSubmit={handleRequestOtp} className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-500 font-mono">
                {language === "Tamil"
                  ? "கைபேசி எண்"
                  : language === "Hindi"
                  ? "मोबाइल नंबर"
                  : "Mobile Number"}
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base">
                  call
                </span>
                <input
                  type="text"
                  required
                  placeholder="+91 98422 13456"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 font-bold text-xs pl-10 pr-4 py-3 rounded-2xl border border-slate-200 outline-none focus:border-slate-900 transition-colors font-mono"
                />
              </div>
            </div>

            {isRegistering && (
              <>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-500 font-mono">
                    {language === "Tamil"
                      ? "விவசாயி பெயர்"
                      : language === "Hindi"
                      ? "किसान का नाम"
                      : "Farmer Name"}
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base">
                      person
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="S. Dhanush Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 text-slate-900 font-bold text-xs pl-10 pr-4 py-3 rounded-2xl border border-slate-200 outline-none focus:border-slate-900 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-500 font-mono">
                    {language === "Tamil"
                      ? "பண்ணை பெயர்"
                      : language === "Hindi"
                      ? "फार्म का नाम"
                      : "Farm Name"}
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base">
                      home_work
                    </span>
                    <input
                      type="text"
                      placeholder="Kongu Indigenous Cattle Farm"
                      value={farmName}
                      onChange={(e) => setFarmName(e.target.value)}
                      className="w-full bg-slate-50 text-slate-900 font-bold text-xs pl-10 pr-4 py-3 rounded-2xl border border-slate-200 outline-none focus:border-slate-900 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-500 font-mono">
                    {language === "Tamil"
                      ? "ஊர் / மாவட்டம்"
                      : language === "Hindi"
                      ? "स्थान / जिला"
                      : "Location / District"}
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base">
                      location_on
                    </span>
                    <input
                      type="text"
                      placeholder="Dharapuram, Tiruppur Dist"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-slate-50 text-slate-900 font-bold text-xs pl-10 pr-4 py-3 rounded-2xl border border-slate-200 outline-none focus:border-slate-900 transition-colors"
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>
                {isRegistering
                  ? language === "Tamil"
                    ? "பண்ணை பதிவு செய்க"
                    : language === "Hindi"
                    ? "फार्म पंजीकृत करें"
                    : "Register Farm"
                  : language === "Tamil"
                  ? "கைபேசி மூலம் தொடரவும்"
                  : language === "Hindi"
                  ? "मोबाइल से जारी रखें"
                  : "Continue with Mobile"}
              </span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>

            <div className="relative flex items-center justify-center my-2">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white/95 px-3 text-[10px] uppercase font-bold text-slate-400 font-mono">
                or
              </span>
              <div className="border-t border-slate-200 w-full" />
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 shadow-xs flex items-center justify-center gap-2.5 cursor-pointer transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>
                {language === "Tamil"
                  ? "Google மூலம் தொடரவும்"
                  : language === "Hindi"
                  ? "Google के साथ जारी रखें"
                  : "Continue with Google"}
              </span>
            </button>

            <p className="text-center text-[11px] text-slate-500 pt-1">
              {isRegistering
                ? language === "Tamil"
                  ? "ஏற்கனவே கணக்கு உள்ளதா?"
                  : "Already registered?"
                : language === "Tamil"
                ? "புதிய விவசாயியா?"
                : "New farmer?"}{" "}
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="font-bold text-slate-900 hover:underline cursor-pointer"
              >
                {isRegistering
                  ? language === "Tamil"
                    ? "உள்நுழைக"
                    : "Log in"
                  : language === "Tamil"
                  ? "புதிய கணக்கு தொடங்குக"
                  : "Create account"}
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtpAndLogin} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-slate-500 font-mono">
                {language === "Tamil"
                  ? "OTP குறியீட்டை உள்ளிடவும்"
                  : language === "Hindi"
                  ? "ओटीपी दर्ज करें"
                  : "Enter Verification OTP"}
              </label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="123456"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 font-bold text-center text-xl p-3.5 rounded-2xl border border-slate-200 outline-none font-mono tracking-widest focus:border-slate-900"
              />
              <p className="text-[10px] text-slate-400 text-center font-mono">
                {language === "Tamil"
                  ? "டெமோ OTP: ஏதேனும் 6 எண்கள்"
                  : "Demo OTP: any 6 digits"}
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>
                {language === "Tamil"
                  ? "சரிபார்த்து பண்ணைக்குள் செல்க"
                  : language === "Hindi"
                  ? "सत्यापित करें और आगे बढ़ें"
                  : "Verify & Enter Farm"}
              </span>
              <span className="material-symbols-outlined text-base">check_circle</span>
            </button>

            <button
              type="button"
              onClick={() => setAuthStep("form")}
              className="w-full text-center text-xs font-bold text-slate-500 hover:text-slate-900 cursor-pointer"
            >
              {language === "Tamil" ? "எண்ணை மாற்றவும்" : "Change Mobile Number"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthView;
