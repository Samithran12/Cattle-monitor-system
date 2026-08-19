# 🐮 CattleIQ - Smart AI Livestock & Herd Intelligence Platform

> **Production-Ready Livestock Management & Biometrics for Indian Farmers (Specialized for Tamil Nadu)**

---

## 🌟 Overview

**CattleIQ** is a farmer-first livestock management and intelligence application built for Indian farmers, breeders, and veterinarians. The application is designed for simplicity, minimal learning curve, and high accessibility—featuring an extensive 21+ indigenous Indian cattle database, live camera muzzle biometric noseprint identification, location-based marketplace with WhatsApp order automation, conversational multilingual AI voice assistance, and dynamic personalized herd care schedules.

---

## ✨ Key Capabilities

### 🧬 1. Expanded Tamil Nadu & Indian Indigenous Breeds (21+ Breeds)
- **Tamil Nadu Breeds**: *Kangayam, Pulikulam (Jallikattu Bull), Bargur (Semmarai), Umbalachery, Alambadi, Malai Maadu, Thanjavur Kuttai Maadu, Manapparai*.
- **South & Central Indian Breeds**: *Punganur Dwarf, Hallikar, Ongole, Deoni, Krishna Valley, Vechur Dwarf, Dangi*.
- **North & Western Indian Breeds**: *Gir, Sahiwal, Red Sindhi, Kankrej, Hariana, Rathi, Tharparkar*.
- Each breed includes: physical characteristics, disease resistance, climate adaptability, milk yield productivity, special characteristics (e.g. Kaveri delta wetland puddling, Jallikattu bull lineage, 8% A2 butterfat), and active Rashtriya Gokul Mission government subsidies.

### 🚜 2. Farmer-First Home UX
- High-contrast, large touch action buttons designed for effortless use by elderly rural farmers.
- One-tap quick actions: **Scan Cow**, **My Cattle**, **Marketplace**, **Daily Tasks**, **Emergency Vet Call (1800-425-9000)**, and **AI Advisor**.
- Instant real-time telemetry (Herd size, Health score, Pregnant cattle count) and summer heat stress weather warnings.

### 🛒 3. Marketplace Flow & WhatsApp Order Lifecycle
- **Complete In-App Order Lifecycle**: State tracking across `Pending` ➔ `Accepted` ➔ `Preparing` ➔ `Ready` ➔ `Completed` (or `Rejected`).
- **Instant Structured WhatsApp Dispatch**: One-click WhatsApp message sent directly to the seller with formatted payload (Product, Total Price, Quantity, Buyer Name, Contact, Delivery Location, Order ID).
- **Buyer & Seller Dashboards**: Buyers track active orders with live progress bars; Sellers get 1-tap Accept/Reject buttons and buyer chat.

### 🎙️ 4. Conversational Multilingual Voice Assistant
- Interprets natural conversational speech across **Tamil**, **Tanglish**, **Hindi**, and **English** (e.g. *"Show my cattle"*, *"புதிய மாடு பதிவு செய்"*, *"I want to buy feed"*, *"இன்றைய பணிகள் என்ன?"*).
- Speaks back clear responses using Web Speech Synthesis (TTS).

### 📋 5. Personalized Daily Smart Tasks Engine
- Automatically generates tailored care schedules based on:
  - **Lactating Cows**: Daily balanced concentrate calculation (e.g. 400g concentrate per liter of milk produced).
  - **Pregnant Cattle**: Pre-calving calcium bolus and gestation pen isolation.
  - **Young Calves**: Deworming schedule (Albendazole) and grower mash.
  - **Draught Breeds**: High-energy horsegram (Kollu) ration and hoof care.
  - **Weather Alerts**: Summer heat misting and monsoon foot-rot prevention.

### 🔒 6. Secure Backend Gemini AI Proxy
- All AI calls (Advisor Chat, Breed Detection, Voice Intent Parsing) route securely through backend Express endpoints (`/api/*`), keeping API keys hidden from client-side code.
- Resilient offline fallback heuristics ensure farmers always receive actionable answers.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Google Material Symbols, Outfit & Plus Jakarta Sans typography.
- **Backend Server**: Node.js Express server with Vite middleware mode, `@google/genai` SDK.
- **Mobile Runtime**: Ionic Capacitor 7 (Android APK & iOS ready).
- **Database & Storage**: Offline-first LocalStorage persistence + Firebase Firestore & Auth integration.

---

## 🚀 Getting Started

### 1. Installation
```bash
git clone https://github.com/SriSuriya007/cattleIQ.git
cd cattleIQ
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and set your Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 📱 Android Build & Authentication Setup

### Fixing Google Sign-In on Android
When running as an Android APK (Capacitor/Cordova):
1. Obtain your Android signing key SHA-1 and SHA-256 fingerprints:
   ```bash
   # For Debug keystore:
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
   ```
2. Go to **Firebase Console** ➔ **Project Settings** ➔ **Your Android App** (`in.cattleiq.app`).
3. Click **Add Fingerprint** and paste both your **SHA-1** and **SHA-256** certificates.
4. Download the updated `google-services.json` and place it in `android/app/google-services.json`.
5. Sync Capacitor Android project:
   ```bash
   npm run build
   npx cap sync android
   npx cap open android
   ```
6. Build your debug or release APK in Android Studio.
