import React, { useState } from "react";
import { UserProfile } from "../types";
import { auth, googleProvider, signInWithPopup } from "../lib/firebase";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Phone, User, Home, MapPin, Sparkles, CheckCircle2, ArrowRight, Lock } from "lucide-react";

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
  const [mobile, setMobile] = useState("+91 98422 13456");
  const [otpCode, setOtpCode] = useState("");
  const [language, setLanguage] = useState<"English" | "Tamil" | "Hindi">("English");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile.trim()) {
      setErrorMsg("Please enter a valid mobile number.");
      return;
    }
    setErrorMsg(null);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAuthStep("otp");
    }, 600);
  };

  const handleVerifyOtpAndLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length < 4) {
      setErrorMsg("Please enter the complete verification passcode.");
      return;
    }
    setErrorMsg(null);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      completeLogin();
    }, 600);
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
      photoUrl: overrideData?.photoUrl || "/assets/default-avatar.svg",
    });
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      if (auth && googleProvider) {
        const result = await signInWithPopup(auth, googleProvider);
        const fbUser = result.user;
        completeLogin({
          name: fbUser.displayName || "Google Farmer",
          email: fbUser.email || "farmer@gmail.com",
          photoUrl: fbUser.photoURL || undefined,
        });
      } else {
        completeLogin();
      }
    } catch {
      completeLogin();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 text-zinc-900 font-sans overflow-hidden bg-black">
      {/* 1. Atmospheric Hero Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={CATTLE_HERO_BG}
          alt="Indigenous Cattle Background"
          className="w-full h-full object-cover scale-105 filter blur-[1.5px] opacity-35 brightness-75"
        />
        {/* Soft Multi-layered Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-zinc-950/50" />
      </div>

      {/* 2. Glassmorphic Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl border border-white/40 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-[0_24px_64px_rgba(0,0,0,0.4)] space-y-5 relative z-10"
      >
        {/* Branding Header */}
        <div className="text-center space-y-1.5">
          <div className="relative w-16 h-16 rounded-2xl bg-zinc-900 dark:bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg border border-zinc-800 dark:border-emerald-500/40 group">
            <span className="material-symbols-outlined text-3xl font-bold">pets</span>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-2 ring-white dark:ring-zinc-900">
              <Sparkles className="w-3 h-3" />
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-display tracking-tight mt-2">
            CattleIQ
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            {language === "Tamil"
              ? "ஸ்மார்ட் கால்நடை மேலாண்மை & மந்தை நுண்ணறிவு"
              : language === "Hindi"
              ? "स्मार्ट पशुधन और झुंड प्रबंधन प्रणाली"
              : "Smart Livestock & Herd Intelligence Platform"}
          </p>
        </div>

        {/* Multilingual Switcher Pill */}
        <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-2xl border border-zinc-200/80 dark:border-zinc-700">
          {(["English", "Tamil", "Hindi"] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setLanguage(lang)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                language === lang
                  ? "bg-zinc-900 dark:bg-emerald-600 text-white shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              {lang === "Tamil" ? "தமிழ்" : lang === "Hindi" ? "हिंदी" : "English"}
            </button>
          ))}
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 rounded-2xl text-xs font-semibold border border-red-200 dark:border-red-900/50 animate-fade-in">
            {errorMsg}
          </div>
        )}

        {/* Authentication Steps */}
        <AnimatePresence mode="wait">
          {authStep === "form" ? (
            <motion.form
              key="auth-form"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleRequestOtp}
              className="space-y-3.5 text-xs"
            >
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400 font-mono">
                  {language === "Tamil"
                    ? "கைபேசி எண்"
                    : language === "Hindi"
                    ? "मोबाइल नंबर"
                    : "Farmer Mobile Number"}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="+91 98422 13456"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-white font-bold text-xs pl-10 pr-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 outline-none focus:border-zinc-900 dark:focus:border-emerald-500 transition-colors font-mono"
                  />
                </div>
              </div>

              {isRegistering && (
                <div className="space-y-3 pt-1">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400 font-mono">
                      {language === "Tamil"
                        ? "விவசாயி பெயர்"
                        : language === "Hindi"
                        ? "किसान का नाम"
                        : "Farmer Name"}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500">
                        <User className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="S. Dhanush Kumar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-white font-bold text-xs pl-10 pr-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 outline-none focus:border-zinc-900 dark:focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400 font-mono">
                      {language === "Tamil"
                        ? "பண்ணை பெயர்"
                        : language === "Hindi"
                        ? "फार्म का नाम"
                        : "Farm Name"}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500">
                        <Home className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        placeholder="Kongu Cattle Farm"
                        value={farmName}
                        onChange={(e) => setFarmName(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-white font-bold text-xs pl-10 pr-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 outline-none focus:border-zinc-900 dark:focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400 font-mono">
                      {language === "Tamil"
                        ? "இடம் / மாவட்டம்"
                        : language === "Hindi"
                        ? "स्थान / जिला"
                        : "Location / District"}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500">
                        <MapPin className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        placeholder="Dharapuram, Tiruppur"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-white font-bold text-xs pl-10 pr-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 outline-none focus:border-zinc-900 dark:focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-zinc-900 dark:bg-emerald-600 hover:bg-zinc-800 dark:hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>
                  {isLoading
                    ? "Sending..."
                    : language === "Tamil"
                    ? "பாதுகாப்பான OTP பெறுக"
                    : language === "Hindi"
                    ? "सुरक्षित OTP प्राप्त करें"
                    : "Send Secure OTP"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="otp-form"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleVerifyOtpAndLogin}
              className="space-y-4 text-xs"
            >
              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/80 rounded-2xl border border-zinc-200/80 dark:border-zinc-700 text-center space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-zinc-500 dark:text-zinc-400">
                  OTP sent to
                </span>
                <p className="font-mono font-bold text-zinc-900 dark:text-white text-sm">
                  {mobile || email || "+91 98422 13456"}
                </p>
                <button
                  type="button"
                  onClick={() => setAuthStep("form")}
                  className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  Change Mobile Number
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400 font-mono block text-center">
                  Enter 6-Digit Verification Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={6}
                    autoFocus
                    placeholder="4 2 1 9 8 5"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                    className="w-full bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-white font-extrabold text-lg text-center tracking-widest py-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-700 outline-none focus:border-zinc-900 dark:focus:border-emerald-500 font-mono"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                    <Lock className="w-4 h-4" />
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-zinc-900 dark:bg-emerald-600 hover:bg-zinc-800 dark:hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isLoading ? "Verifying..." : "Verify & Launch Farm"}</span>
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-zinc-200 dark:border-zinc-800 w-full" />
          <span className="bg-white dark:bg-zinc-900 px-3 text-[10px] font-mono uppercase text-zinc-400 font-bold absolute">
            or
          </span>
        </div>

        {/* Google & Demo Launch */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3 px-4 rounded-2xl bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-750 text-zinc-800 dark:text-zinc-200 font-bold text-xs border border-zinc-200 dark:border-zinc-700 shadow-2xs flex items-center justify-center gap-2.5 transition-colors cursor-pointer active:scale-[0.98]"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            onClick={() => completeLogin()}
            className="w-full py-2.5 px-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Launch Instant Demo Account</span>
          </button>
        </div>

        {/* Toggle Register / Login */}
        <div className="text-center pt-1">
          <button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setAuthStep("form");
              setErrorMsg(null);
            }}
            className="text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-colors"
          >
            {isRegistering
              ? "Already registered? Login with Phone"
              : "New Farmer? Register New Farm Profile"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthView;
