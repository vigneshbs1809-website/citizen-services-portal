# 🏛️ Citizen Services Portal for First-Time and Low-Literacy Users

An accessible, human-centric public services web application engineered to help first-time internet users, elderly citizens, rural populations, and individuals with low literacy navigate government welfare schemes and entitlements with confidence.

---

## 🎯 Project Overview & Human-Centered Design Goals

Government websites are often plagued by complex bureaucratic vocabulary, confusing multi-tiered navigation, and dense blocks of text. First-time users and seniors frequently encounter severe usability barriers, creating dependency on unofficial middlemen.

The **Citizen Services Portal** solves this digital divide through:
1. **Plain-Language Scaffolding:** Complex government notifications are translated into clear, simple instructions with zero legal jargon.
2. **Integrated Web Speech Assistance (Voice Guidance):** One-click auditory reading in English, Hindi (हिन्दी), and Tamil (தமிழ்) for users who cannot read fine print or are non-literate.
3. **Accessibility-First Controls:** High-contrast mode toggle and multi-level scalable font sizing (`A`, `A+`, `A++`) meeting international accessibility guidelines (WCAG 2.1 AA / GIGW).
4. **Interactive Eligibility Wizard:** Low-literacy questionnaire that matches citizens to their exact entitlement without requiring prior knowledge of scheme names.
5. **Zero-Deception Design:** Clear badges for official fees (highlighting "Free of Cost"), processing times, and anti-corruption vigilance alerts.

---

## 💻 Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | React.js | 19.3 | Component-driven declarative user interface |
| **Build Engine** | Vite | 8.3 | Ultra-fast development and optimized production bundling |
| **Styling** | Tailwind CSS | 4.3 | Minimal, accessible utility classes and custom color tokens |
| **Routing** | React Router | 7.18 | Single Page Application client-side navigation |
| **Icons** | Lucide React | 1.70 | Clear, minimal SVG iconography (no childish cartoons or emojis) |
| **Localization** | i18next & react-i18next | 24.2 | Multilingual translation engine (English, Hindi, Tamil) |
| **Speech Engine** | Web Speech Synthesis API | Native | In-browser text-to-speech for elderly and non-literate users |
| **Backend (Later Phase)**| Python Flask | Planned | API services and document verification |
| **Database (Later Phase)**| SQLite | Planned | Offline-first citizen grievance and application tracking |

---

## 📁 Project Architecture & Folder Structure

```
citizen-services-portal/
├── public/
│   ├── favicon.svg             # Portal emblem favicon
│   └── vite.svg
├── src/
│   ├── assets/                 # Brand assets and graphics
│   ├── components/             # Reusable UI component architecture
│   │   ├── common/             # Primitive accessible components
│   │   │   ├── Badge.jsx       # Minimal status and scheme badges
│   │   │   ├── Button.jsx      # High-contrast buttons with 44px+ touch targets
│   │   │   ├── Card.jsx        # Subtle white cards with thin slate borders
│   │   │   └── Input.jsx       # Form inputs with clear labels
│   │   ├── layout/             # Global layout architecture
│   │   │   ├── AccessibilityBar.jsx # Text resizing & high-contrast controls
│   │   │   ├── Footer.jsx      # Official footer with toll-free helplines
│   │   │   ├── Header.jsx      # Official header with search & voice buttons
│   │   │   ├── Navigation.jsx  # Main navigation tabs
│   │   │   ├── PageContainer.jsx # Responsive max-width wrapper
│   │   │   └── TopGovernmentBar.jsx # Official government identification banner
│   │   ├── services/           # Service-specific presentation components
│   │   │   ├── ServiceCard.jsx # Service summary card with voice trigger
│   │   │   └── StepGuide.jsx   # Numbered visual application steps
│   │   └── voice/              # Speech accessibility components
│   │       └── VoiceAssistantButton.jsx # Auditory reading controller
│   ├── data/                   # Verified scheme information & domain categories
│   │   ├── categoriesData.js   # Service domain definitions (Pensions, Health, Food, etc.)
│   │   └── servicesData.js     # Curated public schemes, papers needed & spoken text
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAccessibility.js # Manages persistent font scaling and contrast modes
│   │   └── useVoiceReader.js   # Web Speech API speech synthesis controller
│   ├── pages/                  # Page-level route views
│   │   ├── GuidedStepsPage.jsx # Interactive 3-step recommendation wizard
│   │   ├── HelpAssistancePage.jsx # Toll-free helplines, CSC centers & anti-corruption
│   │   ├── HomePage.jsx        # Portal landing dashboard with category filters
│   │   ├── NotFoundPage.jsx    # Accessible 404 handler
│   │   ├── ServiceDetailPage.jsx # Step-by-step instructions & documents checklist
│   │   └── ServicesPage.jsx    # Complete searchable scheme directory
│   ├── translations/           # Multilingual localization dictionaries
│   │   ├── i18n.js             # i18next configuration and language detector
│   │   └── locales/
│   │       ├── en.json         # English language strings
│   │       ├── hi.json         # Hindi (हिन्दी) translations
│   │       └── ta.json         # Tamil (தமிழ்) translations
│   ├── utilities/              # Helper utilities
│   │   ├── classNames.js       # Tailwind merge and conditional class utility (cn)
│   │   └── speechUtils.js      # Speech synthesis support and voice detection
│   ├── App.jsx                 # Top-level application layout and route declarations
│   ├── index.css               # Global CSS, theme colors, and accessibility sizing
│   └── main.jsx                # Application DOM entry point
├── index.html                  # HTML5 template with accessible fonts (Plus Jakarta Sans)
├── package.json                # Project dependencies and script declarations
├── vite.config.js              # Vite configuration with path aliases and Tailwind plugin
└── README.md                   # Complete architectural guide
```

---

## 🎨 Design System & Accessibility Compliance

In accordance with strict government digital platform and enterprise SaaS standards:
- **Primary Color:** Royal Blue (`#2457A6`) for trustworthy, authoritative identity.
- **Secondary Color:** Teal (`#168C83`) for accent highlights, verification badges, and secondary actions.
- **Background:** White (`#FFFFFF`) primary page background.
- **Section Background:** Light Slate/Grey (`#F7F9FC`) for distinct content sections and contrast.
- **Primary Text:** Dark Charcoal (`#202938`) ensuring high legibility and WCAG AAA contrast.
- **Secondary Text:** Muted Slate (`#667085`) for descriptions, metadata, and timestamps.
- **Border:** Thin light border (`#E5EAF0`) replacing heavy card shadows.
- **Iconography:** Exclusively Lucide React outline SVG icons (`FileText`, `IdCard`, `GraduationCap`, `Wallet`, `Search`, `Volume2`, `Languages`, `Accessibility`, `ChevronRight`, `ArrowLeft`, `CheckCircle`, `Headphones`, `Mic`). Zero emojis, zero cartoon illustrations, zero excessive gradients.
- **8px Grid System:** Strict spatial cadence (`p-2`, `p-4`, `p-6`, `p-8`, `gap-2`, `gap-4`, `gap-6`, `min-h-[44px]` touch targets for elderly/rural citizens).
- **Multilingual Support (6 Regional Languages):**
  - English (`en`) — Inter (`src/i18n/locales/en.json`)
  - Kannada (`kn`) — Noto Sans Kannada (`src/i18n/locales/kn.json`)
  - Hindi (`hi`) — Noto Sans Devanagari (`src/i18n/locales/hi.json`)
  - Telugu (`te`) — Noto Sans Telugu (`src/i18n/locales/te.json`)
  - Tamil (`ta`) — Noto Sans Tamil (`src/i18n/locales/ta.json`)
  - Malayalam (`ml`) — Noto Sans Malayalam (`src/i18n/locales/ml.json`)

### 🌐 Instant Multilingual Translation Engine (`src/i18n/`)
- **Seamless In-Memory Switching:** Language switches immediately without page reload via `i18next` and `react-i18next`.
- **Persistent Preferences:** The user's selection is saved in `localStorage.getItem('i18nextLng')` and preserved across page transitions.
- **Dynamic HTML Language Binding:** Updates `<html lang="...">` dynamically on change to bind regional fonts automatically (`:lang(kn)`, `:lang(hi)`, `:lang(te)`, `:lang(ta)`, `:lang(ml)`).
- **Service Translation Architecture:** Centralized helper [`getServiceTranslation()`](file:///c:/Users/Vignesh/OneDrive/Desktop/HCI/citizen-services-portal/src/utilities/serviceTranslation.js) seamlessly delivers translated titles, statutory fees, processing times, and summaries with graceful fallback handling.

### Centralized Design System (`src/design-system/`)
- `Typography.jsx`: `Heading1`, `Heading2`, `Heading3`, `Subtitle`, `BodyText`, `BodySecondary`, `Caption`, `SectionLabel`
- `Button.jsx`: `primary` (`#2457A6`), `secondary` (`#168C83`), `tertiary` (white with border `#E5EAF0`), `ghost`, `audio`
- `Input.jsx`: Standard `Input` and `SearchInput` with Lucide `Search` icon
- `Dropdown.jsx`: Custom accessible select with `ChevronRight`, ARIA listbox, and keyboard navigation
- `ServiceCard.jsx`: Reusable service card with official fee badge, processing time, `CheckCircle`, `Volume2` audio button, `ChevronRight`
- `CategoryCard.jsx`: 4 category cards with Lucide icons (`FileText`, `IdCard`, `Wallet`, `GraduationCap`), scheme count, `ChevronRight`
- `StepIndicator.jsx`: `StepCard` (1, 2, 3, 4 badges), `VerticalStepGuide`, and `HorizontalProgressBar`
- `Checklist.jsx`: `DocumentChecklist` with interactive check states and photocopy counts
- `Alert.jsx`: `Alert` (`info`, `success`, `warning`, `critical`) and `AntiCorruptionBanner`
- `PageContainer.jsx`: `PageContainer` and `PageHeader` with `ArrowLeft` back link
- **Backgrounds:** Clean White (`#FFFFFF`) with secondary Light Grey (`#F8FAFC`).
- **Typography:** Dark Charcoal (`#0F172A`, `#1E293B`) ensuring minimum 4.5:1 contrast against all backgrounds.
- **Touch Targets:** All interactive buttons possess a minimum height of 44px for elderly accessibility.
- **Borders & Shadows:** Clean 1px borders (`#E2E8F0`) with subtle elevation (`shadow-xs`).
- **Excluded Elements:** Dark mode full-screen backgrounds, childish cartoon characters, emoji icons, and multi-colored bright cards have been completely avoided in favor of clean public administration aesthetics.

### 🗺️ Application Routing Architecture (12 Pages)

| # | Page Name | Route Path | Purpose & Features |
| :--- | :--- | :--- | :--- |
| **1** | **Welcome / Language Selection** | `/welcome` | Dedicated accessible onboarding; select from 6 official languages, listen to spoken audio sample, configure text size, and continue to portal. |
| **2** | **Home Dashboard** | `/` | Hero search bar, 4 category cards, 5 popular services, 4 numbered steps, and interactive voice narration. |
| **3** | **Services Directory** | `/services` | Filterable directory of all citizen welfare schemes with category tabs, fee tags, and search bar. |
| **4** | **Service Search Results** | `/search?q=...` | Dedicated search view showing query results, category chips, document matching, and search suggestions. |
| **5** | **Service Details** | `/services/:id` | Service overview with fee badges, processing timelines, audio read button, and 3-step action pathways. |
| **6** | **Eligibility Checker** | `/services/:id/eligibility`, `/eligibility` | Interactive assessment questionnaire verifying residency, income, and age with live positive feedback. |
| **7** | **Required Documents** | `/services/:id/documents`, `/documents` | Interactive checklist of required documents with photocopy counts, issuing authorities, and check-off state. |
| **8** | **Step-by-Step Guidance** | `/services/:id/guidance`, `/guidance` | Sequential instructions for Seva Kendra / Panchayat submission, token collection, fee receipts, and tracking. |
| **9** | **Accessibility Settings** | `/accessibility` | Text sizing (`A`, `A+`, `A++`), high contrast mode, voice speech speed test, and keyboard shortcuts guide. |
| **10**| **Help and Support** | `/help` | Free toll-free helplines, CSC directory, Gram Panchayat assistance, and vigilance anti-corruption hotline. |
| **11**| **About** | `/about` | Portal mission, HCI low-literacy design principles, GIGW / WCAG 2.1 compliance, and transparency guarantee. |
| **12**| **Not Found** | `*` | Accessible 404 recovery page with search bar and direct return buttons. |

---

## 🚀 Commands to Run the Application

### 1. Prerequisites
- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher

### 2. Navigate to Project
```bash
cd citizen-services-portal
```

### 3. Install Dependencies (If not already installed)
```bash
npm install
```

### 4. Start Development Server
```bash
npm run dev
```
The application will launch at:
```
http://localhost:5173
```

### 5. Build for Production Verification
```bash
npm run build
```

---

## 🗺️ Roadmap & Upcoming Phases

- **Phase 1 (Current):** Foundation, responsive accessible layout, multilingual engine (i18n), voice reader hook, curated service catalog, and routing architecture.
- **Phase 2:** Visual document scanner preview & sample filled application form illustrations.
- **Phase 3 (Backend):** Python Flask REST API for grievance ticketing and nearest Common Service Center (CSC) geolocation lookup.
- **Phase 4 (Database):** Local SQLite schema for application status tracking and document expiry reminders.
