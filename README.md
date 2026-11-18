# 🇮🇳 India Citizen Services Portal (28 States & 8 Union Territories)

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-Flask%203.0-3776AB?logo=python&logoColor=white)](https://flask.palletsprojects.com/)
[![SQLite](https://img.shields.io/badge/Database-SQLite-003B57?logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Accessibility](https://img.shields.io/badge/WCAG-2.2%20AA%20Compliant-green)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![Languages](https://img.shields.io/badge/Languages-6%20Regional-blue)](#-multilingual-support)

An accessible, highly responsive, multilingual citizen e-governance navigation platform covering all **28 Indian States and 8 Union Territories**. Designed following Human-Computer Interaction (HCI) best practices, Indian Government Web Guidelines (GIGW), and WCAG 2.2 AA accessibility principles for first-time internet users, rural citizens, and elderly individuals.

---

## 🌟 Key Features

### 🏛️ 1. Complete National & State Coverage (36 States & UTs)
- **All 28 States & 8 Union Territories** included with official state portal links (e.g., *Seva Sindhu* for Karnataka, *e-Sevai* for Tamil Nadu, *Aaple Sarkar* for Maharashtra, *e-District* for Delhi & UP, *MeeSeva* for Telangana & Andhra Pradesh).
- **Searchable State Selection Grid & Dropdown** with regional emblems and capital details.
- **270+ Verified Administrative Districts** with dynamic district filtering for localized services.
- **Official Government Portals Only**: Direct links verified against official government registries (`india.gov.in`, `myscheme.gov.in`).

### 🗣️ 2. Comprehensive Multilingual Experience
- **6 Indian Languages Supported**:
  - English (`en`)
  - Hindi (`hi` - हिन्दी)
  - Kannada (`kn` - ಕನ್ನಡ)
  - Telugu (`te` - తెలుగు)
  - Tamil (`ta` - தமிழ்)
  - Malayalam (`ml` - മലയാളം)
- **Deep Translation**: UI headers, buttons, service cards, step-by-step walkthroughs, legal glossaries, document checklists, and eligibility questions dynamically adjust to the selected language.

### 🔊 3. Triple-Tier Regional Audio & Voice Assistance
Standard desktop and mobile browsers often lack built-in speech synthesis engines for regional Indian languages like Kannada, Telugu, Tamil, and Malayalam. This platform implements a robust **3-tier audio playback engine**:
1. **Tier 1 (Instant Pre-rendered MP3 Assets)**: 430 authentic high-quality regional voice recordings served directly with zero lag.
2. **Tier 2 (Dynamic Flask Streaming TTS)**: Server-side `GET /api/tts` endpoint powered by Google TTS (`gTTS`) to synthesize custom queries and texts.
3. **Tier 3 (Native Web Speech Synthesis)**: Fallback engine utilizing device OS voice capabilities when available.

### ♿ 4. Accessibility First (HCI & GIGW Standards)
- **Font Scaling Controls**: Normal, Large, and Extra Large typography adjustments.
- **High-Contrast & Dark Mode**: Specially tuned color contrast ratios meeting WCAG 2.2 AA compliance for visually impaired citizens.
- **Plain-Language Legal Glossary**: Difficult bureaucratic terminology simplified into plain everyday language across all 6 languages.
- **Screen Reader Friendly**: ARIA labels, semantic landmark elements, and keyboard navigability throughout.

### 📋 5. Guided Citizen Workflows
- **Interactive Eligibility Checker**: Step-by-step questionnaire with affirmative/negative visual cues and audio narration.
- **Document Preparation Checklist**: Interactive checklists for required proofs (Aadhaar, income certificate, ration card, residence proof).
- **Direct Official Application Links**: Secure outgoing external links opening official government portals with clear departure warnings.

---

## 🏗️ Project Architecture

```
├── backend/
│   ├── app.py                     # Python Flask REST API + TTS Streaming Server
│   ├── database.py                # SQLite schema, queries & state data helpers
│   ├── citizen_services.db        # Seeded relational database (36 states, 270+ districts)
│   ├── init_db.py                 # Database initialization and migration script
│   ├── populate_states_db.py      # 36 States/UTs and official portal seed script
│   ├── populate_all_languages.py  # Regional translation dictionary seeder
│   ├── generate_all_audio.py      # Batch MP3 audio generation script (gTTS)
│   ├── test_api.py                # 24 automated unit & integration tests
│   └── requirements.txt           # Python backend dependencies
│
├── citizen-services-portal/       # React 19 + Vite Frontend SPA
│   ├── src/
│   │   ├── components/            # Header, Footer, StateSelector, Voice, Accessibility
│   │   ├── pages/                 # 15 interactive application routes
│   │   ├── context/               # AccessibilityContext, TextToSpeechContext
│   │   ├── locales/               # Complete i18n translation bundles
│   │   ├── data/                  # Verified service data & state directories
│   │   ├── utilities/             # Portal link handlers & helper functions
│   │   └── services/              # Dual-mode API client with resilient offline fallback
│   ├── public/
│   │   └── audio/                 # 430 authentic regional MP3 voice clips
│   ├── package.json               # Frontend dependencies & scripts
│   └── vite.config.js             # Vite build configuration
│
└── README.md                      # Project documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18.0 or higher) and **npm**
- **Python** (v3.9 or higher) and **pip**
- **Git**

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/vigneshbs1809-website/citizen-services-portal.git
cd citizen-services-portal
```

---

### Step 2: Backend Setup (Python Flask)
```bash
# Navigate to the backend directory
cd backend

# (Optional) Create and activate a virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install required dependencies
pip install -r requirements.txt

# Run the Flask API Server (runs on http://127.0.0.1:5000)
python app.py
```

---

### Step 3: Frontend Setup (React 19 + Vite)
Open a new terminal window:
```bash
# Navigate to the frontend directory
cd citizen-services-portal

# Install NPM dependencies
npm install

# Start the Vite development server
npm run dev
```

Visit **`http://localhost:5173`** in your browser to experience the portal.

---

## 🧪 Testing & Validation

### Backend API Automated Tests
Run the comprehensive 24-test suite validating all endpoints, database queries, state listings, search filters, and audio generation:
```bash
cd backend
python -m unittest test_api.py
```
> **Output:** `Ran 24 tests in 0.122s - OK`

### Frontend Production Build
Validate production bundling and linting:
```bash
cd citizen-services-portal
npm run build
```
> **Output:** Production build succeeds with 0 errors.

---

## 📱 Routes & Pages

| Route | Page | Purpose |
|---|---|---|
| `/` | `WelcomePage` | Initial onboarding, language selection & state picker |
| `/home` | `HomePage` | Personalized state dashboard & popular services |
| `/states` | `StateSelectionPage` | Interactive 36 States & UTs grid & district filter |
| `/services` | `ServicesPage` | Comprehensive categorized citizen service directory |
| `/services/:serviceId` | `ServiceDetailPage` | Detailed eligibility, steps, documents & official links |
| `/eligibility/:serviceId` | `EligibilityPage` | Audio-guided interactive eligibility questionnaire |
| `/documents/:serviceId` | `DocumentsPage` | Required documentation checklist & verification |
| `/steps/:serviceId` | `StepsPage` | Step-by-step application walkthrough with regional TTS |
| `/glossary` | `GlossaryPage` | Plain-language government terms simplification |
| `/contact` | `ContactPage` | Helplines & state department contact directories |
| `/settings` | `SettingsPage` | Accessibility options, high contrast & font scaling |

---

## 🛡️ License

This project is developed for educational and public-benefit purposes under the **MIT License**.

Developed by **[Vignesh B S](https://github.com/vigneshbs1809-website)**.
