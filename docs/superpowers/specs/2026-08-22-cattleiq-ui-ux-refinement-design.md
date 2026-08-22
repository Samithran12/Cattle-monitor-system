# CattleIQ UI/UX Refinement — Design Specification

**Document Version:** 2.0.0  
**Date:** 2026-08-22  
**Status:** Approved for Implementation  
**Target:** Production-Grade Livestock Intelligence & Herd Biometrics Platform  

---

## 1. Executive Summary

CattleIQ is an indigenous livestock management platform combining AI Breed Identification, Bovine Muzzle (Noseprint) Biometrics, Digital Passports, Veterinary Logs, Smart Daily Care Tasks, and a Localized Livestock Marketplace.

This specification outlines a full UI/UX refinement to elevate CattleIQ from a prototype-like interface into a commercial-grade, trustworthy, and modern mobile/web application.

### Key Objectives:
1. **Design System & Consistent Aesthetics:** Harmonize colors, typography, elevations, spacing, and micro-interactions across both Light and True OLED Dark modes.
2. **Modern Auth & Onboarding Flow:** Professional branding, sleek OTP keypad, Google 1-Tap integration, multilingual selector, and subtle entrance animations.
3. **Step-Based Cattle Registration:** Multi-step wizard (Basic Info -> Biometric Noseprint Capture -> Health/Productivity Config -> Digital Passport Issuance).
4. **Futuristic Biometric Noseprint Scanner:** High-tech HUD viewfinder, rotating landmark reticle, real-time ridge sampling, biometric confidence metrics, and matching bovine detection.
5. **Livestock Management Dashboard:** Dynamic metrics, herd health index, interactive horizontal cattle cards, quick actions, and priority task checklists.
6. **Polished Modals & Pages:** Commercial-grade Digital Passport, Breeds Catalog, Market Order Tracker with 5-step progress, Voice Assistant widget, and Profile management.

---

## 2. Design System & Tokens

### 2.1 Color Palette
- **Primary Action / Emerald Brand:** `#059669` (Emerald 600), `#10b981` (Emerald 500), `#047857` (Emerald 700)
- **Neutral Dark / OLED:** `#000000` (Pitch Black background), `#09090b` (Zinc 950 Card surface), `#18181b` (Zinc 900 borders/subtle surfaces)
- **Neutral Light:** `#f8fafc` (Slate 50 background), `#ffffff` (Card surface), `#e2e8f0` (Borders)
- **Text Tokens:**
  - Primary Light: `#09090b` | Primary Dark: `#fafafa`
  - Secondary Light: `#52525b` | Secondary Dark: `#a1a1aa`
  - Muted Light: `#94a3b8` | Muted Dark: `#71717a`
- **Semantic Accents:**
  - Success/Verified: `#10b981` (Emerald)
  - Warning/Alerts: `#f59e0b` (Amber)
  - Destructive/Emergency: `#ef4444` (Red)
  - AI/Intelligence: `#8b5cf6` (Purple/Violet)
  - Biometrics: `#06b6d4` (Cyan)

### 2.2 Typography Hierarchy
- **Display / Headers:** `Outfit`, sans-serif (Weights: 600, 700, 800)
- **Body & UI Controls:** `Plus Jakarta Sans`, -apple-system, sans-serif (Weights: 400, 500, 600, 700)
- **Technical & Biometric Data:** `ui-monospace`, `SFMono-Regular`, `Menlo`, monospace (Weights: 600, 700)

### 2.3 Iconography
- Consistent Lucide Icons (`lucide-react`) alongside Material Symbols Outlined.
- Standardized 20px / 24px bounding boxes, matching stroke weights and rounded corner styles.

---

## 3. Screen Specifications

### 3.1 Authentication & Onboarding (`AuthView.tsx`)
- **Visuals:** Atmospheric indigenous cattle photo background with subtle dark blur gradient overlay.
- **Card:** Glassmorphic container with 24px border radius and refined elevation.
- **Header:** Animated CattleIQ logo badge with pulsating emerald ring.
- **Controls:**
  - Language switch pill (English, Tamil, Hindi).
  - Mode toggle between "Phone + OTP" and "Full Farm Registration".
  - Clean 6-digit passcode inputs with clear visual cues.
  - Google 1-Tap button and Instant Demo profile button with micro-bounce active states.

### 3.2 Main Dashboard (`HomeView.tsx`)
- **Hero Metrics Bento:**
  - Total Animals count with breed breakdown pill.
  - Daily Milk Production (Liters/day) with trend indicator.
  - Herd Health Index (% optimal) and In-Calf pregnancy count.
- **Quick Action Bar:** Quick Scan, Add Animal, AI Advisor, and 24x7 Emergency Vet Hotline (1800-425-9000).
- **Weather & Heat Alert:** Dynamic card with dismiss animation and temperature threshold advisory.
- **Horizontal Cattle Scroll:** Aspect ratio cards with health score badges, tag IDs, breed tags, and one-tap passport button.
- **Smart Tasks:** Interactive checklist with strike-through animations on toggle.

### 3.3 Cattle Registration Wizard (`AddAnimalModal.tsx`)
- **Step 1: Bovine Profile:** Tag ID generator, Name, Species, Breed selector (21+ indigenous breeds), Gender, Age, Weight, Shed Location.
- **Step 2: Biometric Noseprint Capture:** Live camera capture or sample upload with real-time landmark ridge detector and generated `NOSE-XXXX-XXX` biometric hash.
- **Step 3: Health & Production Config:** Health status, lactation status, daily milk yield, vaccination status.
- **Step 4: Digital Passport Review & Issuance:** Instant certificate preview with generated QR code and celebratory confirmation.

### 3.4 Biometric Scanner View (`ScannerView.tsx`)
- **Viewfinder HUD:**
  - Corner targeting brackets with laser scanning bar animation.
  - Rotating muzzle landmark reticle with animated pulse point indicators.
  - Dual modes: "AI Breed Detection" and "Bovine Noseprint Biometric ID".
  - Camera flip & flash controls.
- **Match Result Sheet:**
  - Instant bottom sheet on detection.
  - Confidence rating badge (e.g., 99.4%), verified checkmark, extracted biometric token, breed characteristics, and "Issue / View Digital Passport" action.

### 3.5 Animals View & Indigenous Breeds Catalog (`AnimalsView.tsx`)
- **Tabs:** "My Herd" vs "21+ Indigenous Breeds Catalog".
- **Filter Chips:** Dynamic status filtering (All, Healthy, Pregnant, Vaccine Due, Dairy, Draught, State).
- **Cattle Cards:** Clean layout with photo, health score, milk yield, tag ID, and action buttons for Passport, Edit, and Delete.
- **Empty States:** Friendly illustration and direct action button to register or scan an animal.

### 3.6 Digital Cattle Passport (`DigitalPassportModal.tsx`)
- **Design:** Official bovine government-standard passport aesthetic.
- **Features:** Muzzle biometric hash, QR code, health score metrics, timeline-based medical log history, and "Add Medical Record" modal.
- **Share:** Integrated Web Share API with fallback clipboard copy.

### 3.7 AI Advisor (`AdvisorView.tsx`) & Smart Tasks (`SmartTasksView.tsx`)
- **Advisor:** Conversational interface with Bento ROI & economics cards, quick question suggestions, and multimodal image uploads.
- **Smart Tasks:** Category filters, AI plan generator with personalized daily nutrition & heat management routines.

### 3.8 Marketplace & Orders (`MarketView.tsx`)
- **Browse:** GPS distance calculation (15km, 50km, 100km, All India), category pills (Cattle, Fodder, Veterinarians), verified badges.
- **Direct Orders & WhatsApp:** Instant order creation with WhatsApp pre-filled order receipt payload.
- **Order Tracker:** 5-step visual progress bar (Pending -> Accepted -> Preparing -> Ready -> Completed).
- **Sales Inbox:** Farmer dashboard to accept/reject incoming livestock orders.

### 3.9 Profile & Settings (`ProfileView.tsx`)
- **Farmer Info:** Avatar upload, name, farm location, contact info with inline edit modal.
- **Settings:** True OLED Dark Mode toggle, Multilingual selection, Push notification permission test.

---

## 4. Animation & Motion Guidelines
- Framer Motion / Motion for React (`motion/react`) used for smooth transitions.
- `AnimatePresence` for modal dialogs and step transitions.
- Standard easing: `cubic-bezier(0.16, 1, 0.3, 1)` (spring-like snappy deceleration).
- Reduced motion support honoring `prefers-reduced-motion`.
