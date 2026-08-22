# CattleIQ UI/UX Refinement — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform CattleIQ into a polished, commercial-grade livestock intelligence platform with modernized design system, 4-step cattle registration wizard, biometric HUD muzzle scanner, responsive dashboard, and fluid micro-animations.

**Architecture:** React 19 + TypeScript + Tailwind CSS v4 + Motion (`motion/react`) + Lucide Icons + Firebase/Firestore. Components maintain strict separation of concerns, offline-first synchronization, and full i18n support.

**Tech Stack:** React 19, TypeScript 5.8, Tailwind CSS 4.1, Motion (Framer Motion) 12.23, Lucide React, Firebase 12.16.

**Spec:** `docs/superpowers/specs/2026-08-22-cattleiq-ui-ux-refinement-design.md`

## Global Constraints
- Preserve all existing Firebase, Firestore, offline sync (`syncManager.ts`), and storage functions (`storage.ts`).
- Maintain multilingual translations (English, Tamil, Hindi) in `utils/i18n.ts`.
- Ensure clean TypeScript typing without `any` regressions.
- Provide loading, empty, and error states for all screens.
- Build strictly using established design tokens and responsive safe-area insets.

---

### Task 1: Design Tokens, Global CSS & Shared UI Components

**Files:**
- Modify: `src/index.css`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/EmptyState.tsx`
- Create: `src/components/ui/Skeleton.tsx`
- Modify: `src/components/ui/SpotlightCard.tsx`
- Modify: `src/components/ui/SmartImage.tsx`

- [ ] **Step 1: Update `src/index.css` with modernized design tokens, glassmorphic styles, and biometric animations**
- [ ] **Step 2: Create reusable `Badge.tsx`, `EmptyState.tsx`, and `Skeleton.tsx` components**
- [ ] **Step 3: Enhance `SpotlightCard.tsx` and `SmartImage.tsx` with smooth loading skeleton shimmer and error fallbacks**
- [ ] **Step 4: Verify typecheck with `npm run lint`**

---

### Task 2: Modernized Authentication & Onboarding Flow

**Files:**
- Modify: `src/components/AuthView.tsx`

- [ ] **Step 1: Redesign `AuthView.tsx` layout with atmospheric background, brand badge, and `motion/react` entrance animations**
- [ ] **Step 2: Implement seamless multilingual switcher, phone OTP verification flow, and full farm registration form**
- [ ] **Step 3: Add Google 1-Tap button and instant demo login button with micro-interactions**
- [ ] **Step 4: Verify typecheck with `npm run lint`**

---

### Task 3: Executive Livestock Dashboard

**Files:**
- Modify: `src/components/HomeView.tsx`

- [ ] **Step 1: Upgrade `HomeView.tsx` with high-impact hero metrics (Total Cattle, Milk Yield, Health Index, Pregnant Cows)**
- [ ] **Step 2: Implement Quick Action Bar (Scanner, Add Cattle, Advisor, 24x7 Emergency Hotline `1800-425-9000`)**
- [ ] **Step 3: Add dynamic Weather & Heat Stress alert with dismiss animation**
- [ ] **Step 4: Implement horizontal cattle cards with health rings, tags, and one-tap passport launcher**
- [ ] **Step 5: Add priority task checklist with animated completion toggles and Indigenous Breed Spotlight**
- [ ] **Step 6: Verify typecheck with `npm run lint`**

---

### Task 4: 4-Step Guided Cattle Registration Wizard

**Files:**
- Modify: `src/components/AddAnimalModal.tsx`

- [ ] **Step 1: Re-architect `AddAnimalModal.tsx` into a 4-step wizard with animated progress indicator**
- [ ] **Step 2: Step 1 (Bovine Profile) — Tag ID generation, Name, Species, Breed selector (21+ breeds), Gender, Age, Weight, Location**
- [ ] **Step 3: Step 2 (Biometric Noseprint Capture) — Live camera frame extraction or sample picker, landmark point preview, and biometric hash generation (`NOSE-XXXX-XXX`)**
- [ ] **Step 4: Step 3 (Health & Production Config) — Health score, status, lactation stage, daily milk yield, vaccination status**
- [ ] **Step 5: Step 4 (Digital Passport Review & Issuance) — Instant certificate preview with generated QR code and celebratory confirmation**
- [ ] **Step 6: Verify typecheck with `npm run lint`**

---

### Task 5: Biometric HUD Scanner Experience

**Files:**
- Modify: `src/components/ScannerView.tsx`

- [ ] **Step 1: Build futuristic camera HUD with corner brackets, laser scan line, and live data telemetry**
- [ ] **Step 2: Add rotating muzzle landmark reticle with animated ridge point indicators in Noseprint mode**
- [ ] **Step 3: Implement Dual Scan Modes ("AI Breed Detection" & "Bovine Noseprint Biometric ID")**
- [ ] **Step 4: Create animated Match Sheet with confidence score, biometric hash, verified badge, and direct passport navigation**
- [ ] **Step 5: Verify typecheck with `npm run lint`**

---

### Task 6: Herd Management & Native Breeds Catalog

**Files:**
- Modify: `src/components/AnimalsView.tsx`
- Modify: `src/components/BreedDetailModal.tsx`

- [ ] **Step 1: Update `AnimalsView.tsx` sub-tabs ("My Herd" vs "21+ Indigenous Breeds") with pill animations**
- [ ] **Step 2: Implement search and categorized filter chips (Healthy, Pregnant, Vaccine Due, Dairy, Draught, State)**
- [ ] **Step 3: Upgrade cattle cards with health badges, milk yield, tag IDs, and quick action menus (Passport, Edit, Delete)**
- [ ] **Step 4: Upgrade `BreedDetailModal.tsx` with full-bleed hero banner, subsidy information, and specs grid**
- [ ] **Step 5: Verify typecheck with `npm run lint`**

---

### Task 7: Digital Cattle Passport & Veterinary Logs

**Files:**
- Modify: `src/components/DigitalPassportModal.tsx`
- Modify: `src/components/EditAnimalModal.tsx`
- Modify: `src/components/DeleteConfirmModal.tsx`

- [ ] **Step 1: Elevate `DigitalPassportModal.tsx` with official bovine certificate styling, biometric hash badge, and QR code**
- [ ] **Step 2: Add interactive medical log timeline with "Add Medical Record" modal and doctor credentials**
- [ ] **Step 3: Add Web Share API integration with fallback clipboard feedback**
- [ ] **Step 4: Polish `EditAnimalModal.tsx` and `DeleteConfirmModal.tsx` with smooth animations and clean validation**
- [ ] **Step 5: Verify typecheck with `npm run lint`**

---

### Task 8: AI Advisor, Smart Tasks, Marketplace & Navigation

**Files:**
- Modify: `src/components/AdvisorView.tsx`
- Modify: `src/components/SmartTasksView.tsx`
- Modify: `src/components/MarketView.tsx`
- Modify: `src/components/VoiceAssistantWidget.tsx`
- Modify: `src/components/Header.tsx`
- Modify: `src/components/BottomNav.tsx`
- Modify: `src/components/ProfileView.tsx`

- [ ] **Step 1: Polish `AdvisorView.tsx` with Bento ROI cards, suggestion pills, and responsive chat bubbles**
- [ ] **Step 2: Polish `SmartTasksView.tsx` with category filters, AI plan generator, and task creation modal**
- [ ] **Step 3: Polish `MarketView.tsx` with GPS radius filter, 5-step order progress bar, WhatsApp checkout, and sales inbox**
- [ ] **Step 4: Polish `VoiceAssistantWidget.tsx` with sleek audio visualizer pulse**
- [ ] **Step 5: Upgrade `Header.tsx` and `BottomNav.tsx` with active pill indicators and floating glass dock**
- [ ] **Step 6: Upgrade `ProfileView.tsx` with OLED Dark Mode toggle, avatar upload, and settings**
- [ ] **Step 7: Verify typecheck with `npm run lint`**

---

### Task 9: Final Verification, Production Build & Quality Review

**Files:**
- Test all components across Light and Dark themes
- Build and verify zero runtime/compile errors

- [ ] **Step 1: Run `npm run lint` (`tsc --noEmit`) to verify 100% type safety**
- [ ] **Step 2: Run `npm run build` to verify clean Vite production bundle**
- [ ] **Step 3: Perform comprehensive UI/UX sanity check across all routes, modals, and user flows**
