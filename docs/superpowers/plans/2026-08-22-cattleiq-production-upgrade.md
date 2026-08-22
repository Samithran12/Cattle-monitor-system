# CattleIQ Production Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the CattleIQ livestock management application into a hardened, high-performance, secure, and visually stunning production-grade system with full offline resilience, rock-solid security rules, optimized bundle chunking, and authentic assets.

**Architecture:** React 19 + TypeScript frontend with Tailwind CSS v4 design tokens, React Error Boundaries, full offline-first LocalStorage & Firestore sync manager with exponential backoff, Express Node.js backend with `@google/genai` Gemini SDK proxy and rate limiting, and Capacitor Android runtime.

**Tech Stack:** React 19, TypeScript 5.8, Tailwind CSS v4, Express 4.21, Firebase 12.16 (Firestore, Auth, Storage), Vite 6.2, Lucide Icons & Material Symbols.

**Spec:** Complete 7-phase production audit across Architecture, UI/UX, Security, Database, Performance, Reliability, and Verification.

## Global Constraints
- Strictly typed TypeScript function signatures and interfaces (no loose `any`).
- Zero console errors, zero unhandled promise rejections, zero crashes on network loss.
- 100% offline usability with graceful UI banners and sync queues.
- Standardized design tokens with dark/light mode toggle support.
- All Gemini API calls routed via secure backend proxy with defensive JSON parsing.
- 100% local or reliable high-availability asset URLs (replace all expired Google UserContent links).

---

### Task 1: UI Assets, Cow Breed Images & Avatar Fixes
**Files:**
- Modify: `src/data/mockData.ts`
- Modify: `src/utils/storage.ts`
- Modify: `src/components/ProfileView.tsx`
- Modify: `src/components/AuthView.tsx`
- Create: `public/assets/default-avatar.svg`
- Create: `public/assets/cow-placeholder.svg`

**Interfaces:**
- Consumes: Local image assets in `public/cows/` and `src/data/mockData.ts`
- Produces: 100% reliable, non-expiring image URLs for all 21+ indigenous breeds, marketplace listings, mock animals, and user avatars.

- [ ] **Step 1: Create clean default SVG avatars & cow placeholders in `public/assets/`**
- [ ] **Step 2: Replace all expired `lh3.googleusercontent.com` URLs in `mockData.ts` with authentic local cow assets (`/cows/kamadhenu.jpg`, `/cows/rathi.jpg`, `/cows/surti.jpg`, etc.)**
- [ ] **Step 3: Update `INITIAL_USER` and `AuthView` to use reliable default avatar assets**
- [ ] **Step 4: Verify all images load cleanly without 404 or CORS errors**
- [ ] **Step 5: Run `npm run lint` and commit changes**

---

### Task 2: Security Hardening & Firestore Rules Optimization
**Files:**
- Modify: `firestore.rules`
- Modify: `server.ts`
- Modify: `src/lib/firebase.ts`

**Interfaces:**
- Consumes: Firestore rule engine schema and Express security middleware
- Produces: Bulletproof Firestore security rules with field type/length constraints and CORS/Helmet HTTP security in `server.ts`.

- [ ] **Step 1: Audit and tighten `firestore.rules` with strict data validation for `users`, `animals`, `tasks`, `advisorMessages`, `marketListings`, `marketOrders`, and `notifications`**
- [ ] **Step 2: Add CORS origin filtering and input sanitization to Express endpoints in `server.ts`**
- [ ] **Step 3: Enhance `src/lib/firebase.ts` with structured error reporting and offline-friendly error suppression**
- [ ] **Step 4: Verify security rules syntax and test connection handling**
- [ ] **Step 5: Commit security hardening changes**

---

### Task 3: Performance, Bundle Code-Splitting & Lazy Loading
**Files:**
- Modify: `vite.config.ts`
- Modify: `src/App.tsx`
- Modify: `src/components/ui/SmartImage.tsx`

**Interfaces:**
- Consumes: Vite Rollup build pipeline
- Produces: Code-split manual vendor chunks (`vendor-react`, `vendor-firebase`, `vendor-ionic`, `vendor-ml`), reducing initial bundle size below 350kB gzipped.

- [ ] **Step 1: Configure `vite.config.ts` with `manualChunks` to split heavy libraries (`@xenova/transformers`, `firebase`, `@ionic/react`)**
- [ ] **Step 2: Update `SmartImage.tsx` to include native `loading="lazy"`, `decoding="async"`, and skeleton pulse states**
- [ ] **Step 3: Run `npm run build` and verify that the massive 1.15MB monolithic chunk is cleanly split into optimized chunks**
- [ ] **Step 4: Commit build and performance optimizations**

---

### Task 4: UI/UX Modernization, Dark Mode & Farmer-First Polish
**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/Header.tsx`
- Modify: `src/components/BottomNav.tsx`
- Modify: `src/components/HomeView.tsx`
- Modify: `src/components/AnimalsView.tsx`
- Modify: `src/components/MarketView.tsx`
- Modify: `src/components/ScannerView.tsx`
- Modify: `src/components/AdvisorView.tsx`
- Modify: `src/components/SmartTasksView.tsx`
- Modify: `src/components/ProfileView.tsx`

**Interfaces:**
- Consumes: Tailwind CSS v4 design tokens and theme states
- Produces: Polished, unified dark & light mode experience with high-contrast typography, 48px+ touch targets, smooth tab transitions, and animated status badges.

- [ ] **Step 1: Wire full dark mode support across `App.tsx`, `Header.tsx`, and `ProfileView.tsx` with smooth class toggling on `document.documentElement`**
- [ ] **Step 2: Refine visual hierarchy in `HomeView.tsx`, `AnimalsView.tsx`, and `MarketView.tsx` with consistent typography, micro-badges, and empty state cards**
- [ ] **Step 3: Polish `ScannerView.tsx` with high-tech HUD overlays, camera flip animation, and instant biometric verification badge**
- [ ] **Step 4: Refine `AdvisorView.tsx` with typing indicator, rich Bento cards, and quick suggestion chips**
- [ ] **Step 5: Verify all views render cleanly in both light and dark modes**
- [ ] **Step 6: Commit UI/UX overhaul**

---

### Task 5: Database, Offline Sync Manager & Resilience
**Files:**
- Modify: `src/utils/syncManager.ts`
- Modify: `src/utils/storage.ts`
- Create: `src/components/ui/ErrorBoundary.tsx`
- Modify: `src/main.tsx`

**Interfaces:**
- Consumes: Browser online/offline events and LocalStorage
- Produces: Rock-solid Error Boundary catching UI crashes and resilient offline mutation queue with timestamp-based conflict resolution.

- [ ] **Step 1: Create `src/components/ui/ErrorBoundary.tsx` with graceful farmer-friendly recovery UI**
- [ ] **Step 2: Wrap root React tree in `main.tsx` with `ErrorBoundary`**
- [ ] **Step 3: Enhance `src/utils/syncManager.ts` with exponential retry backoff, conflict timestamps, and multi-collection support**
- [ ] **Step 4: Verify offline behavior by toggling network state and testing mutations**
- [ ] **Step 5: Commit reliability enhancements**

---

### Task 6: End-to-End Verification & Quality Assurance
**Files:**
- Test: Unit/Integration tests for `herdStats`, `biometrics`, `i18n`, and `syncManager`

**Interfaces:**
- Consumes: Test suites and lint checkers
- Produces: Complete verification report confirming zero build errors, zero runtime exceptions, and full production readiness.

- [ ] **Step 1: Run `npm run lint` and ensure 0 TypeScript errors**
- [ ] **Step 2: Run `npm run build` and ensure bundle builds cleanly and quickly**
- [ ] **Step 3: Verify all screens, navigation tabs, modals, language switching (Tamil, Hindi, English), voice assistant, scanner, and marketplace flows**
