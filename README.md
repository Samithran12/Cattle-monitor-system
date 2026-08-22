# 🐮 CattleIQ - Smart AI Livestock & Herd Intelligence Platform

> **Production-Ready Livestock Management, Biometrics & Market Intelligence for Indian Farmers (Specialized for Tamil Nadu & Indigenous Breeds)**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-38bdf8.svg)](https://tailwindcss.com/)
[![Gemini 2.5](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-orange.svg)](https://ai.google.dev/)
[![Capacitor](https://img.shields.io/badge/Mobile-Capacitor%207%20(Android)-119EFF.svg)](https://capacitorjs.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 Overview

**CattleIQ** is a farmer-first livestock management, biometric verification, and intelligence platform designed specifically for Indian dairy farmers, breeders, and veterinarians. Built with zero learning curve and high rural accessibility, CattleIQ bridges digital, linguistic, and breed-identification divides by offering:

- 🌐 **Deep Multilingual Translation (தமிழ், हिंदी, English)**: Every single interface label, animal record, breed characteristic, medical history log, task, and market listing dynamically adapts to the farmer's native tongue.
- 🧬 **AI Muzzle Biometrics & Digital Bovine Passports**: Live camera biometric noseprint hash generation and verifiable digital QR certificates.
- 🔔 **Dynamic Real-Time Notification & Alerting Engine**: Automated monitoring for vaccine overdue alerts, vitality drops, calving reminders, and live marketplace order progress.
- 🐄 **Comprehensive Indigenous Breeds Encyclopedia (21+ Breeds)**: Detailed pedigrees, heat resistance, milk yields, and Rashtriya Gokul Mission subsidy grants.
- 🛒 **Location-Based Marketplace & WhatsApp Integration**: 5-step order progress tracking with 1-click structured WhatsApp purchase dispatches.
- 🎙️ **Multilingual Voice Assistant**: Understands spoken Tamil, Tanglish, Hindi, and English with spoken audio responses.
- 🛡️ **Zero-Vulnerability Security Architecture**: Strict Content Security Policy (CSP), HSTS, IP rate limiting, memory-safe garbage collection, and Firestore per-user isolation.

---

## ✨ Key Capabilities

### 🌐 1. Deep Multilingual Localization (Tamil, Hindi, English)
- **Dynamic Translation of Dynamic Records**: Unlike standard static apps, CattleIQ translates dynamic database records:
  - Animal ages (e.g. `4 Years` ➔ `4 ஆண்டுகள்` / `4 वर्ष`)
  - Shed locations (e.g. `Main Dairy Shed` ➔ `முதன்மை பண்ணை தொழுவம்` / `मुख्य डेयरी शेड`)
  - Pregnancy & lactation statuses (e.g. `Pregnant - 5 Months` ➔ `சினை (5 மாதங்கள்)` / `गर्भवती (5 महीने)`)
  - Medical history logs & Doctor credentials (e.g. `Administered FMD booster` ➔ `கோமாரி நோய் (FMD) தடுப்பூசி போடப்பட்டது`)
  - Task instructions & Market listings.
- **Adaptive Responsive Layouts**: Automatically reflows grid containers and text sizing to prevent long Tamil/Hindi strings from clipping or overlapping on mobile viewports.

---

### 🧬 2. AI Muzzle Biometrics & Official Digital Passports
- **Noseprint Identification**: Analyzes unique bovine muzzle groove patterns using computer vision heuristics, generating unique immutable biometric hashes (`NOSE-XXXX-XXXX`).
- **Verifiable Digital Passport**:
  - Official cryptographic QR Code scanning.
  - Complete chronological medical history (Vaccinations, Treatments, Health Audits, Pregnancy Checks).
  - Shareable digital passports via WhatsApp and system share dialogs.

---

### 🔔 3. Dynamic Real-Time Notification Engine
- **Automated Event-Driven Heuristics**:
  - **Vaccination Overdue Alerts**: Flags booster shot deadlines with 1-tap navigation to the animal's digital passport.
  - **Vitality Drop Detection**: Alerts the farmer when an animal's health score dips below 90% or marks "Needs Attention".
  - **Gestation & Calving Warnings**: Notifies when cows reach 7+ months gestation to prepare maternity straw bedding and calcium bolus.
  - **Live Marketplace Transitions**: Pushes instant updates when orders transition (`Placed` ➔ `Confirmed` ➔ `Transit` ➔ `Vet Check` ➔ `Delivered`).
  - **Summer Heat Index Warnings**: Alerts when ambient temperatures exceed 35°C, advising sprinkler and misting activation.
- **Interactive UI**: Animated in-app floating toasts, real-time unread bell badge counter, and category filter chips.

---

### 🐄 4. Indigenous Indian & Tamil Nadu Breeds (21+ Breeds)
- **Tamil Nadu Breeds**: *Kangayam, Pulikulam (Jallikattu Bull), Bargur (Semmarai), Umbalachery, Alambadi, Malai Maadu, Thanjavur Kuttai Maadu, Manapparai*.
- **South & Central Indian Breeds**: *Punganur Dwarf, Hallikar, Ongole, Deoni, Krishna Valley, Vechur Dwarf, Dangi*.
- **North & Western Indian Breeds**: *Gir, Sahiwal, Red Sindhi, Kankrej, Hariana, Rathi, Tharparkar, Murrah Buffalo, Surti Buffalo*.
- Complete data on: physical traits, disease immunity, climate adaptability, daily milk yields, and Rashtriya Gokul Mission subsidy grants.

---

### 🛒 5. Direct WhatsApp & Live Order Marketplace
- **Location-Based Discovery**: Radius distance filters (10 km to 100+ km) for buying/selling cattle, high-protein green fodder (Super Napier CO-5), and equipment.
- **Structured WhatsApp Dispatch**: Generates pre-formatted WhatsApp order messages sent directly to sellers.
- **5-Stage Visual Stepper**: Live tracking for active buyer orders and seller fulfillment inbox.

---

### 🎙️ 6. Conversational Multilingual Voice Assistant
- Interprets natural farmer speech across **Tamil**, **Tanglish**, **Hindi**, and **English** (e.g. *"Show my cattle"*, *"புதிய மாடு பதிவு செய்"*, *"இன்றைய பணிகள் என்ன?"*).
- Speaks back clear audio responses in the chosen language.

---

### 📋 7. Personalized Daily Smart Tasks Engine
- Automatically evaluates registered herd genetics to generate daily care tasks:
  - **Lactating Cows**: Calculates exact balanced concentrate ration (cottonseed cake + wheat bran + mineral mixture).
  - **Pregnant Cattle**: Pre-calving calcium tonic and gestation pen isolation.
  - **Calves**: Albendazole deworming syrup and grower mash schedule.
  - **Draught Breeds**: High-energy horsegram (*Kollu*) ration and hoof fitness checks.

---

### 🛡️ 8. Security & Supply Chain Hardening
- **Zero Vulnerabilities**: Completely eliminated outdated transitive dependencies (`npm audit` ➔ 0 vulnerabilities).
- **Hardened Express Server**:
  - Strict Content Security Policy (`CSP`), `HSTS` transport security, `X-Frame-Options: SAMEORIGIN`, and anti-fingerprinting.
  - Memory-safe IP rate limiter with automated garbage collection.
  - ASCII control character sanitization and 15MB payload size caps on base64 media uploads.
- **Firestore Security Rules**: Default-deny rules, per-user authenticated isolation, and immutable transaction logs.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend UI** | React 19, TypeScript, Tailwind CSS v4, Motion (Framer Motion) |
| **Icons & Design** | Google Material Symbols, Lucide React, Plus Jakarta Sans & Outfit Fonts |
| **Backend & Proxy** | Node.js Express server, `@google/genai` (Gemini 2.5 Flash) |
| **Mobile Runtime** | Ionic Capacitor 7 (Android APK & iOS Ready) |
| **Database & Auth** | Firebase Firestore, Firebase Authentication, Offline LocalStorage |
| **Audio Engine** | Browser-native Web Speech API & MediaStream Audio Engine |

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- **Node.js**: v18+ or v20+ installed
- **Git**

### 2. Clone and Install
```bash
git clone https://github.com/SriSuriya007/cattleIQ.git
cd cattleIQ
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Type-Check and Build
```bash
# Type check without errors
npm run lint

# Build production bundle
npm run build
```

---

## 📱 Android APK & Capacitor Build

### Google Sign-In & Certificate Setup
1. Generate your debug keystore SHA-1 and SHA-256 fingerprints:
   ```bash
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
   ```
2. In **Firebase Console** ➔ **Project Settings** ➔ **Android App** (`in.cattleiq.app`):
   - Add both **SHA-1** and **SHA-256** certificate fingerprints.
   - Download the updated `google-services.json` and place it in `android/app/google-services.json`.
3. Sync and build Capacitor:
   ```bash
   npm run build
   npx cap sync android
   npx cap open android
   ```
4. Build APK or run directly on your Android device from Android Studio.

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
