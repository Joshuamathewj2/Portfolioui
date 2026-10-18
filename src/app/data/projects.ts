// Project registry shared by the Systems page and the home page showcase.

export interface GalleryItem {
  url: string;
  video?: string;
  title: string;
  category: string;
  description: string;
  color?: string;
  glow?: string;
  tags?: string[];
  link?: string;
  github?: string;
  telemetry?: {
    title: string;
    tagline: string;
    summary: string;
    description: string;
    techStack: string[];
    highlights: string[];
    dataFlow: string;
    video?: string;
    certificate?: {
      header: string;
      text: string;
      image: string;
    };
  };
}



export const galleryProjects: GalleryItem[] = [
  {
    url: "miragetn.png",
    title: "MIRAGE: Cyclone Prevention System",
    category: "DISASTER OPERATIONS",
    description: "Research-grade multi-agent disaster coordination platform that couples explainable AI reasoning with deterministic safety guarantees, validated across 45 controlled scenarios.",
    glow: "rgba(239,68,68,0.4)",
    tags: ["FastAPI", "LangGraph", "SimPy", "PostgreSQL", "Redis"],
    link: "https://github.com/Joshuamathewj2/mirage-cyclone-prevention",
    github: "https://github.com/Joshuamathewj2/mirage-cyclone-prevention",
    telemetry: {
      title: "MIRAGE: Cyclone Prevention System",
      tagline: "Research-grade multi-agent disaster coordination platform that couples explainable AI reasoning with deterministic safety guarantees, validated across 45 controlled scenarios.",
      video: "dfB6zRLU4Gg",
      summary: "AI-driven disaster coordination platform combining multi-agent planning, deterministic resource allocation, and geospatial real-time decision-making for emergency response.",
      description: "MIRAGE is a research-grade emergency operations system designed for the Horn of Africa that combines digital twin physics simulation (cyclone tracking, population displacement, shelter capacity) with agentic advisory layer (6 independent agents generating recommendations), deterministic conflict resolution (rule-based allocation with pro-rata fairness), and human-in-the-loop governance (L1/L2/L3 approval gates). Uniquely separates AI creativity (agents generate reasoning) from execution safety (mathematical optimizer guarantees decisions). Evaluated against 5 baselines across 3 disaster scenarios with 3 random seeds (45-run matrix). Statistically validated: 2.1× faster than manual coordination, fairness σ = 0.000088 under resource constraints.",
      techStack: [
        "Backend: Python 3.10+, FastAPI, Uvicorn, SQLAlchemy, PostgreSQL, GeoAlchemy2",
        "Cache: Redis",
        "Simulation: SimPy, NetworkX, Pandas",
        "AI/ML: LangGraph, LangChain, Google Generative AI",
        "Frontend: Next.js 15, React, TypeScript, Tailwind CSS",
        "Database: PostgreSQL with spatial extensions",
        "Infrastructure: Docker deployment"
      ],
      highlights: [
        "Multi-Agent Reasoning Pipeline: Risk, Resource, Shelter, Logistics agents independently monitor state and generate structured recommendations to shared blackboard.",
        "Deterministic Conflict Resolution: Mathematical optimizer (WEIGHTED/FCFS/EQUAL/PRO_RATA) ensures no hallucinations in life-safety decisions.",
        "Digital Twin Engine: 5 physics simulation modules (Cyclone, Population, Shelter, Resource, Infrastructure) with real-time state synchronization.",
        "Rigorous Evaluation Framework: 45-run evaluation matrix with statistical validation reports, hypothesis testing (H1/H2/H3).",
        "REST + WebSocket API: Live dashboard communication for real-time geospatial visualization.",
        "GIS Integration: Cyclone tracking, population displacement modeling, shelter accessibility routing.",
        "Multi-Level Governance: Approval state machine with human veto capability at L1/L2/L3.",
        "Production Fallbacks: Graceful degradation if Redis/PostgreSQL offline; in-memory store backup."
      ],
      dataFlow: `Digital Twins (Cyclone, Pop, Shelter, Resource, Infra)
         ↓ (state sync via Blackboard)
   Shared MirageState (PostgreSQL + Redis)
         ↓ (subscribe + react)
   Agent Pipeline (Risk/Resource/Shelter/Logistics agents)
         ↓ (write recommendations)
   Deterministic Conflict Resolver (weighted scoring)
         ↓ (apply fairness rules)
   Governance State Machine (L1/L2/L3 approval)
         ↓ (finalize allocation)
   Next.js Dashboard (live geospatial map, WebSocket updates)`
    }
  },
  {
    url: "analysertn.png",
    title: "Analyser Agent: AI-Powered Damage Claim Verification",
    category: "AI PIPELINES",
    description: "Production-ready AI damage assessment pipeline with adaptive model selection, comprehensive rate-limit resilience, and deterministic schema validation.",
    glow: "rgba(6,182,212,0.4)",
    tags: ["Python", "Gemini API", "LangChain", "Multi-modal"],
    link: "https://github.com/Joshuamathewj2/analyser-agent",
    github: "https://github.com/Joshuamathewj2/analyser-agent",
    telemetry: {
      title: "Analyser Agent: AI-Powered Damage Claim Verification",
      tagline: "Production-ready AI damage assessment pipeline with adaptive model selection, comprehensive rate-limit resilience, and deterministic schema validation.",
      summary: "Production-grade multi-modal AI pipeline automating damage claim analysis using Google Gemini vision with strategy selection, confidence scoring, and structured audit trails.",
      description: "Analyser Agent is a damage claim verification system that processes CSV batches of claims (cars, laptops, packages) against submitted images using Google Gemini's vision capabilities. Core innovation: two-phase evaluation pipeline that benchmarks two competing strategies (gemini-2.0-flash vs gemini-1.5-pro) against ground truth sample data, automatically selects the higher-accuracy winner, then processes all test claims with that strategy. Implements model rotation across 6 Gemini variants to avoid rate-limit exhaustion. Produces 14-field structured verdict with risk flags, severity scoring, and justification. Handles rate-limit retry logic (5 attempts with exponential backoff). Deterministic schema validation prevents hallucinations.",
      techStack: [
        "Language: Python 3.10+",
        "AI/ML: Google Gemini API (multi-modal vision), PIL/Pillow (image loading)",
        "Processing: CSV I/O (stdlib), JSON parsing, threading (rate-limit protection)",
        "Evaluation: Accuracy metrics, strategy comparison reports",
        "CLI Engine: argparse with 6 execution modes (sample-only, test-only, dry-run, single-index, strategy selection, full eval)"
      ],
      highlights: [
        "Strategy A/B Testing: Automatically benchmarks gemini-2.0-flash (fast/cheap) vs gemini-1.5-pro (deeper reasoning) on sample data.",
        "Model Rotation: Cycles across 6 Gemini model variants to avoid RPM/TPM exhaustion on free tier quotas.",
        "Rate-Limit Resilience: ResourceExhausted exception handling with 5-attempt exponential backoff routines (10s, 30s, 45s, 60s, 60s).",
        "Structured Output Schema: 14-field validation (boolean, enum, list enforcement) with strict enum sets per claim object (CAR_PARTS, LAPTOP_PARTS, PACKAGE_PARTS).",
        "Multi-Modal Analysis: Image parsing via PIL, direct multi-modal tensor passing to Gemini, and automated confidence scoring per image frame.",
        "Risk Flag Injection: Auto-injects historical user metadata flags into active model context loops (user_history_risk, manual_review_required).",
        "Confidence Fusion: Resolves evidence_standard_met boolean fields with severity enums and claim_status tri-state decisions (supported / contradicted / not_enough_information).",
        "Fallback Row Generation: Graceful degradation processing with predefined structured defaults on API timeout or image pipeline faults."
      ],
      dataFlow: `CSV Input (claims.csv, user_history.csv, evidence_requirements.csv)
    ↓ (parse & validate)
Evaluation Phase (sample_claims.csv)
    ├── Strategy A run (gemini-2.0-flash)
    ├── Strategy B run (gemini-1.5-pro)
    ├── Accuracy comparison
    └── Winner selection
Test Phase (claims.csv)
    ├── Image loading (PIL)
    ├── Model cycling (avoid rate limits)
    ├── Gemini API call with retry logic
    ├── JSON parsing + schema validation
    └── CSV output (output.csv)`,
      certificate: {
        header: "// VALIDATED RECOGNITION",
        text: "Awarded to Joshua A for participating in the June 2026 edition of HackerRank’s Orchestrate by building and deploying an AI agent. Achieved a Final Rank of #11 out of 1,773 participants.",
        image: "certificate1.png"
      }
    }
  },
  {
    url: "resqtn.png",
    title: "ResQ: AI Emergency Response Agent with Multi-Modal Fusion",
    category: "EMERGENCY OPERATIONS",
    description: "AI-powered emergency detection system fusing accelerometer physics with vision intelligence for accurate accident response automation.",
    glow: "rgba(139,92,246,0.4)",
    tags: ["React 18", "Capacitor", "Zustand", "Gemini API", "Twilio"],
    link: "https://github.com/Joshuamathewj2/resQ",
    github: "https://github.com/Joshuamathewj2/resQ",
    telemetry: {
      title: "ResQ: AI Emergency Response Agent with Multi-Modal Fusion",
      tagline: "AI-powered emergency detection system fusing accelerometer physics with vision intelligence for accurate accident response automation.",
      video: "anRpnUqzWWY",
      summary: "Progressive Web App autonomously detecting accidents via smartphone motion sensors and Gemini vision AI, dispatching SMS alerts via multi-modal confidence fusion.",
      description: "ResQ is a sophisticated accident detection system that combines smartphone accelerometer sensor analysis with AI vision processing via Gemini 1.5 Flash. Core innovation: multi-modal confidence fusion that weighs accelerometer severity (40%) + Gemini scene analysis (60%) to determine dispatch decision. Implements sustained-force impact detection algorithm, progressive monitoring (borderline scores trigger second check before full dispatch), and SMS alert dispatch via Twilio with email fallback. Features IndexedDB incident logging, GPS location tracking with Google Maps integration, PWA offline support, service worker caching, React error boundaries, Vitest unit+integration tests (40+ cases), and TypeScript strict mode.",
      techStack: [
        "Frontend Core: React 18, TypeScript, Vite, Tailwind CSS",
        "Mobile Integration APIs: Capacitor (camera, geolocation, motion, haptics, notifications)",
        "State Management: Zustand",
        "AI/ML Core: Gemini 1.5 Flash API (vision analysis)",
        "Telephony & Alerts: Twilio SMS (with mailto fallback mechanism)",
        "Database & Local Persistence: IndexedDB (local log serialization)",
        "PWA Pipeline: Service worker, manifest.json, offline capabilities",
        "Testing Engine: Vitest (unit + integration suites)",
        "Component Library: Radix UI, Lucide icons"
      ],
      highlights: [
        "Multi-Modal Confidence Fusion: Weighted blend of accelerometer physics (40%) + vision context scores (60%) paired with a 7.0/10 active dispatch threshold.",
        "Accelerometer Impact Detection: Custom sustained-force math filtering false positives from simple device bumps or taps.",
        "Gemini Vision Analysis: Structural scene understanding pipeline parsing vehicle damage indicators, injury risk markers, and road context.",
        "Progressive Monitoring: Dynamic loop where borderline confidence scores (5-7) trigger an automated 10-second sensor recheck before running a full emergency dispatch.",
        "IndexedDB Audit Trail: Persistent local incident log utilizing full JSON serialization schemas.",
        "GPS Integration: Real-time geospatial location processing with automated Google Maps sharing links.",
        "Offline PWA: Robust service worker network-first caching strategy with integrated push notifications.",
        "Comprehensive Testing: Over 40+ modular Vitest test cases (impactDetection.test.ts, geminiParser.test.ts, agentFlow.test.ts, agentStateMachine.test.ts).",
        "State Machine Architecture: Centralized Zustand store managing IDLE → MONITORING → DISPATCH → PROGRESSIVE_CHECK → POST_INCIDENT operational states.",
        "Error Boundaries: React error boundary encapsulations wrapping the Dashboard, EmergencyContactForm, IncidentTimeline, and MonitoringStatus components."
      ],
      dataFlow: `Smartphone Hardware
    ├── Accelerometer (DeviceMotionEvent)
    ├── Camera (getUserMedia)
    └── GPS (Geolocation API)
    ↓
React App (Vite dev server)
    ├── Sensor hooks (useAccelerometer, useCamera, useGPS)
    ├── ResQ Agent (confidence fusion logic)
    ├── Zustand store (global state)
    └── Vitest test suite
    ↓
Fusion Engine
    ├── Impact score = 0.4 × accel_score + 0.6 × gemini_vision_score
    ├── Decision threshold: 7.0/10
    └── Progressive check loop (borderline scores)
    ↓
Alert Dispatch
    ├── Twilio SMS (primary)
    ├── mailto/tel (fallback)
    └── IndexedDB logging`,
      certificate: {
        header: "// VALIDATED RECOGNITION",
        text: "Awarded to Joshua A for outstanding performance in engineering and deploying multi-modal AI systems for emergency response and sensor-fusion diagnostics.",
        image: "certificate2.png"
      }
    }
  },
  {
    url: "pillpulsetn.png",
    title: "PillPulse AI: AI-Powered Medication Adherence Platform",
    category: "HEALTHCARE OPERATIONS",
    description: "Full-stack healthcare platform automating prescription processing, medication adherence tracking, and caregiver escalation via Firebase real-time notifications and workflow automation.",
    glow: "rgba(245,158,11,0.4)",
    tags: ["React", "FastAPI", "n8n", "Firebase", "Ollama"],
    link: "https://pill-pulse-172010-rhl4.vercel.app/",
    github: "https://github.com/Joshuamathewj2/PillPulse_172010",
    telemetry: {
      title: "PillPulse AI: AI-Powered Medication Adherence Platform",
      tagline: "Full-stack healthcare platform automating prescription processing, medication adherence tracking, and caregiver escalation via Firebase real-time notifications and workflow automation.",
      summary: "Healthcare platform automating prescription OCR, medication scheduling, and caregiver escalation via Firebase push notifications and n8n workflow automation.",
      description: "PillPulse AI is a healthcare adherence system addressing India's 69% medication non-adherence re-hospitalization rate affecting 320 million chronically ill patients. Core system: prescription OCR (image upload → AI extracts medicine names, dosage, frequency), auto-scheduling (converts medical shorthand BD/TDS/OD/AC/PC/HS to exact clock times), drug conflict spacing (computes minimum safe inter-dose intervals), and escalation chain (patient skip → 15-minute reminder → caregiver alert after 2 skips). Implements Firebase Cloud Messaging (FCM) for browser push notifications (works offline via Service Worker), dual-user system (patient generates code for caregiver linking), and n8n automation (Cron workflows for medication reminders, refill prediction, missed-dose detection). Dashboard tracks adherence percentage, dose history, refill dates.",
      techStack: [
        "Frontend: React + Vite, TypeScript, Tailwind CSS, Radix UI (20+ components), Material-UI",
        "Backend: Python Flask, FastAPI, Uvicorn",
        "Notifications: Firebase Cloud Messaging (FCM), Service Worker (firebase-messaging-sw.js)",
        "Automation: n8n workflow engine (Cron-based triggers)",
        "Maps & GIS: Leaflet.js + OpenStreetMap (hospital locator)",
        "Database: PostgreSQL, Firebase Firestore (implied)",
        "Hosting: Vercel (frontend), Render (Flask backend)",
        "AI/ML Core: Prescription OCR (Ollama with llama3:8b for AI chat parsing)"
      ],
      highlights: [
        "Prescription OCR Pipeline: Image upload automatically triggers AI models to extract medicine names, dosage, frequency, and duration.",
        "Medical Shorthand Conversion: BD/TDS/OD/AC/PC/HS shorthand is parsed and converted to precise local clock times with timezone safety.",
        "Drug Conflict Spacing: System computes safe inter-dose intervals and automatically spaces conflicting schedules out to prevent adverse reactions.",
        "FCM Push Notifications: Custom real-time push engine supporting 3-action browser payloads: (Taken, Snooze 15min, Skip).",
        "Off-Tab Service Worker: Background push notification worker continues monitoring and firing reminders even when browser windows are closed.",
        "Escalation Protocol: First skip fires a 15-minute reminder; consecutive skips trigger an automated immediate push alert to the linked caregiver's device.",
        "Dual-User Linking: Patient generates a secure 8-character code (e.g., JOSH-4521) to link external caregiver devices to a shared real-time stream.",
        "n8n Workflow Automation: 3 micro-service workflows running on CRON: automated schedule reminders, missed-dose escalation monitoring, and predictive refill warning pipelines.",
        "Telemetry Dashboard: Full statistical tracking of Taken/Missed/Escalated events, historical adherence percentages, and geographic hospital map plotting.",
        "Developer Demo Mode: Global state switch enabling instant 10-second escalation times (instead of 15-minute schedules) for clean live demonstrations."
      ],
      dataFlow: `Patient Workflow:
  Upload Prescription Image → Extract medicines (OCR backend) → Convert shorthand (BD → 8am, 8pm)
         ↓
  Conflict Space Checking → Set dynamic intervals → Create schedule DB → Register FCM Device
         ↓
  Fire FCM payload at scheduled time → User Actions (Taken/Snooze/Skip)
         ↓ (On Skip 2x)
  Trigger REST POST /api/notify-caregiver → Escalate live Firebase push to Caregiver node

n8n Automation Architecture:
  Cron Checklist → Fetch daily schedules → Compare times → Run reminder dispatch
  Cron Anomalies → Query missing event logs → If count ≥ 2, trigger escalation
  Cron Inventory → Run remaining pill depletion estimation → If days < 5, suggest refill order`
    }
  },
  {
    url: "bbmstn.png",
    title: "BloodChain: Blockchain Blood Bank Management System",
    category: "DECENTRALIZED SUPPLY",
    description: "Academic-grade blockchain application demonstrating smart contract design, dual-layer architecture, and healthcare supply chain automation.",
    glow: "rgba(239,68,68,0.4)",
    tags: ["Solidity", "Hardhat", "Ethers.js", "React", "MySQL"],
    link: "#",
    github: "https://github.com/Joshuamathewj2/blockchain-bbms",
    telemetry: {
      title: "BloodChain: Blockchain Blood Bank Management System",
      tagline: "Academic-grade blockchain application demonstrating smart contract design, dual-layer architecture, and healthcare supply chain automation.",
      summary: "Decentralized blood bank system using Ethereum smart contracts, dual-layer storage (MySQL + blockchain), and full-stack web interface with real-time inventory.",
      description: "BloodChain is a decentralized blood bank platform built on Ethereum. It deploys a dual-layer architecture combining high-performance relational databases (MySQL) with an immutable blockchain ledger (Solidity). MySQL processes rapid analytical and read queries (donor directories, historical lists, request logs) while Ethereum smart contracts guarantee tamper-proof ledger tracking for critical donor registration events, verified blood unit handovers, and strict 42-day automatic shelf-life expirations. Integrates local Hardhat nodes, Ethers.js v6 web3 bridges, wallet-based signature validations, and real-time inventory dashboards using Recharts visual interfaces.",
      techStack: [
        "Frontend Frame: React 18, React Router, Recharts, Axios, Crimson & Cyber Theme",
        "Backend Server: Node.js, Express.js, Ethers.js v6, jsonwebtoken (JWT)",
        "Smart Contract Environment: Solidity 0.8.19, Hardhat Suite, Ganache local networks",
        "Relational Database: MySQL 8.0, mysql2 pool wrappers",
        "Local Tooling: npm workspaces, automated shell scripts"
      ],
      highlights: [
        "9-Function Solidity Smart Contract: Core blood tracking logic including registerDonor, donateBlood, registerHospital, requestBlood, and approveRequest.",
        "Event-Driven MySQL Synchronization: Direct blockchain listener subscribing to contract events (DonorRegistered, BloodDonated, BloodRequested) to instantly synchronize the relational database.",
        "Gas-Optimized Operations: Storage structures configured using indexed logging and view constraints to ensure zero-gas read executions.",
        "Cryptographic Signature Verification: MetaMask wallet mapping to handle hospital administrative privileges and donor authorization schemas securely.",
        "Automated Life-Safety Expiry: Implements decentralized 42-day expiration checking inside Solidity state machines, bypassing manual administrative inputs.",
        "Dual-Layer Integrity: Combines rapid MySQL tables for rendering list states with the immutable blockchain ledger to prevent malicious data tampering."
      ],
      dataFlow: `MetaMask Browser Extension (Sign injection)
         ↓
  React Portal (Wallet connect, dashboard views, Recharts ledger)
         ↓ (Ethers.js Contract Calls + Axios Express Requests)
  Node.js API Middleware (JWT Authentication & Database Pool checks)
    ├── Blockchain Writes: Direct Ethers transactions -> Solidity (Hardhat Local Chain)
    └── Local Table Synchronization: MySQL writes (donors, blood_units, requests, tx_logs)`
    }
  },
  {
    url: "pttn.png",
    title: "PixelTrust: AI Image Authenticity Verification System",
    category: "MEDIA FORENSICS",
    description: "Multi-layer image forensics platform combining pixel analysis, noise detection, metadata inspection, and AI pattern recognition for authenticating images.",
    glow: "rgba(16,185,129,0.4)",
    tags: ["OpenCV", "FastAPI", "TensorFlow", "React", "SciPy"],
    link: "#",
    github: "https://github.com/Joshuamathewj2/PixelTrust",
    telemetry: {
      title: "PixelTrust: AI Image Authenticity Verification System",
      tagline: "Multi-layer forensics platform providing explainable image authenticity verification combining classical signal processing with AI pattern recognition.",
      summary: "Multi-layer image forensics platform combining pixel analysis, noise detection, metadata inspection, and AI pattern recognition for authenticating images.",
      description: "PixelTrust is an image verification system designed to address digital media authenticity gaps by implementing a multi-layer forensics pipeline. It processes uploaded images or live camera captures to detect anomalies, analyzing pixel consistency (resampling/edges), noise frequencies (Fast Fourier Transforms identifying AI generation smoothing), EXIF data metadata footprints (tampering flags), and deep learning pattern models (identifying GAN/diffusion synthetic traces). The system provides explainable outputs including weighted confidence metrics and human-readable checklists rather than black-box verdicts.",
      techStack: [
        "Frontend View: React, Tailwind CSS, MediaDevices capture interfaces",
        "Backend Service: Python (FastAPI / Flask micro-modules)",
        "Verification Core: OpenCV, PIL, NumPy, SciPy (Signal/FFT modules)",
        "Deep Inference: TensorFlow / PyTorch pattern detection engines",
        "Data Exchange Schema: Structured JSON output responses"
      ],
      highlights: [
        "4-Tier Forensics Pipeline: Synthesizes pixel-level, frequency-level, metadata-level, and deep synthetic pattern checks.",
        "Signal Domain FFT Processing: Uses Fast Fourier Transforms (FFT) to spot artificial high-frequency damping characteristic of Generative AI.",
        "EXIF Metadata Inspection: Parses nested camera metadata, checking historical camera consistency and flag mismatches.",
        "Multi-Model Inference: Uses neural network processing to detect generative model signatures, differentiating camera sensor noise from synthetic noise.",
        "Parallel Analysis Streams: Runs all four core forensics modules concurrently to reduce image processing times.",
        "Explainable Confidence Score: Merges the results of each analysis module into a clear percentage trust value accompanied by human-readable reasoning."
      ],
      dataFlow: `User File Upload / Camera Stream capture
         ↓
  React UI Container -> REST POST Multi-Part Image Payload
         ↓
  FastAPI Forensic Pipeline (Parallel module execution thread pool)
    ├── Module 1: Edge & resample compression checking (OpenCV)
    ├── Module 2: Fast Fourier Transform frequency analysis (NumPy/SciPy)
    ├── Module 3: EXIF validation & metadata parsing (PIL)
    └── Module 4: GAN pattern extraction & AI noise profiling (PyTorch/TF)
         ↓
  Confidence Fusion Layer (Weight module ratings -> Calculate Final Score)
         ↓
  JSON Diagnosis (Trust score %, check summaries, plain-text audit remarks)`
    }
  },
  {
    url: "auratn.png",
    title: "Aura-X1: Advanced 3D Animation & Interactive Frontend",
    category: "CREATIVE FRONTEND",
    description: "Advanced frontend system showcasing 3D graphics, particle animations, and interactive design using React 19, Three.js, and production-grade animation libraries.",
    glow: "rgba(168,85,247,0.4)",
    tags: ["React 19", "Next.js", "Three.js", "GSAP", "Lenis"],
    link: "https://aura-x1.vercel.app/",
    github: "https://github.com/Joshuamathewj2/Aura-X1",
    telemetry: {
      title: "Aura-X1: Advanced 3D Animation & Interactive Frontend",
      tagline: "Advanced frontend system showcasing 3D graphics, particle animations, and interactive design using React 19, Three.js, and production-grade animation libraries.",
      summary: "Modern React frontend showcasing advanced 3D graphics, particle animations, and complex interactive UI using Three.js, Framer Motion, and GSAP.",
      description: "Aura-X1 is an experimental visual showcase built with React 19 and Next.js, displaying high-performance 3D graphics and complex animation pipelines. It renders interactive 3D WebGL scenes using Three.js via React Three Fiber, integrates custom particle physics engines, and choreographs fluid UI state transitions using Framer Motion v12 and GSAP timeline engines. Designed with custom Tailwind structures and Lenis smooth-scrolling configurations, it demonstrates visual performance engineering, code-splitting optimizations, and interactive responsive structures on modern displays.",
      techStack: [
        "Base Core: React 19, Next.js 16 (App Router), TypeScript",
        "3D WebGL: Three.js, React Three Fiber (R3F), Drei library helpers",
        "Motion Engineering: Framer Motion v12, GSAP v3.12.5, Lenis Scroll",
        "Core Utilities: Canvas-Confetti, Tailwind CSS, clsx, tailwind-merge",
        "Deployment Platform: Vercel"
      ],
      highlights: [
        "Declarative 3D Scenes: Composes WebGL cameras, lighting sources, and geometries directly into the React lifecycle via React Three Fiber.",
        "Spring-Based Motion: Uses Framer Motion's physics-based spring models for natural UI transitions.",
        "Interactive Gesture Tracking: Dynamic mouse, scroll-position, and touch tracking that adjusts 3D camera angles and lighting in real time.",
        "GSAP Timeline Orchestration: Groups complex multidirectional animation sequences into unified timelines.",
        "Physics Particle Systems: Renders custom canvas-based animations with dynamic bounce-back and collision calculations.",
        "Responsive 3D Scaling: Dynamically recalculates rendering canvases on screen size changes to prevent visual asset distortion."
      ],
      dataFlow: `Next.js App Router (Page configurations)
         ↓
  React Components (Interactive state hooks)
    ├── Canvas Container: Three.js WebGL (meshes, materials, ambient lights, perspective cameras)
    ├── Animation Wrappers: Framer Motion spring values & scroll tracking (Lenis)
    └── Physics layer: Canvas-Confetti collision loops
         ↓
  Unified GSAP Timeline triggers -> High Performance 60 FPS visual rendering loop`
    }
  },
  {
    url: "valoratn.png",
    title: "Valora: Accessible Disability Talent Platform",
    category: "ACCESSIBILITY PORTALS",
    description: "Design-to-code implementation showcasing comprehensive Radix UI component system mastery, WCAG accessibility compliance, and type-safe frontend architecture.",
    glow: "rgba(79,70,229,0.4)",
    tags: ["React 18", "Radix UI", "TypeScript", "Tailwind v4", "Recharts"],
    link: "https://valora-gray.vercel.app/",
    github: "https://github.com/Joshuamathewj2/Valora",
    telemetry: {
      title: "Valora: Accessible Disability Talent Platform",
      tagline: "Design-to-code implementation showcasing comprehensive Radix UI component system mastery, WCAG accessibility compliance, and type-safe frontend architecture.",
      summary: "Modern web application for disability talent and inclusion featuring comprehensive design system implementation, 55+ Radix UI components, and WCAG accessibility compliance.",
      description: "Valora is a web portal connecting and highlighting disability talent, developed from strict Figma design system guidelines. It features deep layout structures with a 55+ dependency node tree including the complete Radix UI accessibility primitive library, Material-UI design utilities, interactive Recharts data panels, React DnD layouts, and next-themes light/dark modes. Built using 96.7% TypeScript with strict compiler validation, Valora showcases high-fidelity frontend component design, fluid interface transitions, and strict WCAG accessibility standards.",
      techStack: [
        "Framework Core: React 18.3, TypeScript, Vite 6.3, Tailwind CSS 4.1",
        "Accessible Primitives: Radix UI (20+ layout, menu, modal, and utility primitives)",
        "Graphics & Graphs: Recharts 2.15, Material-UI (MUI icons), Emotion CSS-in-JS",
        "UI Interactions: React DnD (Drag-and-Drop), React Resizable Panels, Embla Carousel",
        "Utilities: React Hook Form 7.55, next-themes, class-variance-authority (CVA)",
        "Deployment Platform: Vercel"
      ],
      highlights: [
        "Figma-to-Code Precision: Direct conversion of detailed design layouts into responsive, production-ready React components.",
        "WCAG Accessibility: Implements keyboard navigation, ARIA tags, and screen-reader support natively using Radix UI primitives.",
        "Type Safety: Written in 96.7% TypeScript with strict compiler rules enabled to catch bugs early.",
        "Theme Management: Flexible light, dark, and system theme-switching configurations using next-themes.",
        "Advanced Layout Patterns: Seamless integration of drag-and-drop mechanics, nested tabs, sliding drawers, and resizable layout columns.",
        "State-Based Form Validation: High-efficiency forms utilizing React Hook Form with validation schemas."
      ],
      dataFlow: `Figma Specification Blueprint
         ↓
  Accessible Component Mapping (TypeScript strict components)
    ├── Input UI Elements (Radix primitives, MUI wrappers, controlled hook forms)
    ├── Content Display Panels (Drag-drop grids, resizable containers, Embla carousels)
    └── Theme Providers (next-themes system, custom Emotion CSS rules)
         ↓
  WCAG Accessibility Checking -> Rendered Static Application (Vite HMR deploy -> Vercel)`
    }
  },
  {
    url: "swtn.png",
    title: "Silent Words MVC: Sign Language Recognition with CNN",
    category: "DEEP LEARNING",
    description: "Deep learning sign language recognition system achieving 98% accuracy through adaptive multi-layer classification and real-time gesture-to-text conversion.",
    glow: "rgba(236,72,153,0.4)",
    tags: ["TensorFlow", "Keras", "OpenCV", "Tkinter", "NumPy"],
    link: "#",
    github: "https://github.com/Joshuamathewj2/silent-words-mvc",
    telemetry: {
      title: "Silent Words MVC: Sign Language Recognition with CNN",
      tagline: "Deep learning sign language recognition system achieving 98% accuracy through adaptive multi-layer classification and real-time gesture-to-text conversion.",
      summary: "Deep learning sign language recognition system using CNN with 98% accuracy achieved through dual-layer classification strategy for disambiguating similar gestures.",
      description: "Silent Words MVC is a computer vision application that converts American Sign Language (ASL) hand gestures to text using Convolutional Neural Networks (CNN). Implements a two-layer classification strategy: Layer 1 identifies 26 ASL letters (A-Z) with 95.8% accuracy. Layer 2 refines predictions for frequently-confused gesture pairs: {D,R,U}, {T,K,D,I}, {S,M,N}. Combined accuracy reaches 98.0%. Pipeline: webcam capture → Gaussian blur + adaptive thresholding → CNN inference → word formation. Includes GUI (tkinter) for real-time interaction with spell-checking (pyenchant/hunspell). Custom dataset created by user via region-of-interest (ROI) capture and preprocessing.",
      techStack: [
        "Language: Python 3.8+",
        "Deep Learning: TensorFlow, Keras",
        "Computer Vision: OpenCV (image processing, webcam capture, Gaussian blur, adaptive thresholding)",
        "Image Processing: PIL/Pillow",
        "GUI Engine: tkinter",
        "Spell Checking: pyenchant, cyhunspell",
        "Data Processing: NumPy"
      ],
      highlights: [
        "CNN Architecture: Standard layered CNN routing raw pixel inputs from Convolutional → Pooling → Fully Connected → Output layers.",
        "Dataset Creation: Custom training and testing data collection pipeline constructed via automated ROI extraction across 26 letter classes.",
        "Image Preprocessing Pipeline: Converts input video frames through grayscale translation, Gaussian blur (5×5 kernel), adaptive thresholding, and OTSU thresholding.",
        "Multi-Classifier Strategy: Implements a Layer 1 general classifier backed by a specialized Layer 2 model designed purely for resolving frequent character confusion sets.",
        "Real-Time Inference: High-speed OpenCV webcam streaming setup capturing, processing, and outputting classification predictions instantly.",
        "GUI Desktop Application: Clean tkinter user interface displaying live predictions, thresholded frame feeds, and text string assembly blocks.",
        "Spell Correction Pipeline: Integrates post-processing hooks using pyenchant/hunspell dictionaries to automatically evaluate and correct minor letter misclassifications.",
        "Performance Metrics: Achieves 95.8% single-layer accuracy, escalating to 98.0% dual-layer accuracy validated via confusion matrix analytics."
      ],
      dataFlow: `Webcam Input (OpenCV VideoCapture)
    ↓
ROI Extraction (5x5 blue box)
    ↓
Image Preprocessing
    ├── Grayscale conversion
    ├── Gaussian blur (5x5)
    ├── Adaptive thresholding
    └── OTSU thresholding
    ↓
CNN Model (Layer 1)
    ├── Convolutional layers
    ├── Pooling layers
    ├── Fully connected layers
    └── Output (26 classes)
    ↓
Prediction Refinement (Layer 2)
    ├── Check if prediction in confusion set {D,R,U}
    ├── If yes, run specialized classifier
    └── Otherwise, output Layer 1 prediction
    ↓
Spell Checking (pyenchant)
    └── GUI display (tkinter)`
    }
  },
  {
    url: "htn.png",
    title: "Gesture Hologram AI PRO: Computer Vision + 3D Graphics",
    category: "COMPUTER VISION",
    description: "Computer vision system combining hand keypoint detection, gesture recognition, and 3D graphics rendering for intuitive human-computer interaction.",
    glow: "rgba(6,182,212,0.4)",
    tags: ["Python", "OpenCV", "MediaPipe", "OpenGL", "Pygame"],
    link: "#",
    github: "https://github.com/Joshuamathewj2/hologram-3d",
    telemetry: {
      title: "Gesture Hologram AI PRO: Computer Vision + 3D Graphics",
      tagline: "Computer vision system combining hand keypoint detection, gesture recognition, and 3D graphics rendering for intuitive human-computer interaction.",
      summary: "Real-time gesture-controlled 3D hologram system using MediaPipe hand tracking, OpenCV processing, and OpenGL rendering with 8 interactive 3D objects.",
      description: "Gesture Hologram AI PRO is a Python-based gesture recognition system that detects hand movements via webcam (OpenCV + MediaPipe), interprets gestures (pinch, swipe, open palm, movement), and controls 3D holographic objects in real-time using OpenGL rendering. Implements 8 3D models (cube, pyramid, sphere, diamond, cylinder, double pyramid, wire sphere, wire cube) with smooth rotation and zoom via gesture input. Features HUD interface overlay, real-time gesture classification, and sustained gesture tracking. Inspired by Iron Man/JARVIS interface design. Processes video frames at ~30 FPS, handles multiple simultaneous gestures, and provides visual feedback via hologram state changes.",
      techStack: [
        "Language: Python 3.11",
        "Computer Vision: OpenCV 4.8+, MediaPipe 0.10+ (hand tracking, 21-point hand skeleton)",
        "3D Graphics: OpenGL (PyOpenGL 3.1.7+), Pygame 2.5+ (window management)",
        "Numerical Computing: NumPy 1.24+",
        "Automated Testing: Pytest 8.0+",
        "Video I/O: OpenCV VideoCapture (webcam stream)"
      ],
      highlights: [
        "Real-Time Hand Tracking: Uses MediaPipe's framework to track 21 hand keypoints per frame concurrently with zero initial training weights.",
        "Gesture Classification Engine: Dynamic algorithmic classification mapping pinching (finger distance vectors), swiping (velocity direction delta), open palm states, and movement parameters.",
        "3D Object Rendering: Smooth matrix-based render configurations displaying 8 distinct 3D models utilizing lighting models and transformation matrices.",
        "Performance Optimization: Ultra-lean frame-loop calculations targeting stable 30 FPS processing on standard commodity web cameras.",
        "Gesture State Machine: Tracks sustained operations securely (e.g., locking active model auto-rotation on sustained open-palm hold signals).",
        "Multi-Modal Input Parsing: Simultaneously decodes physical hand spatial positioning and independent finger gesture parameters within the same frame processing thread.",
        "Heads-Up Telemetry Display (HUD): Overlays live diagnostics, tracked vector paths, recognized gestures, confidence values, and current active model labels on top of the screen feed.",
        "Smooth Animation interpolation: Linear interpolation (LERP) algorithms applied to rotation and zoom parameters to eliminate video jitter."
      ],
      dataFlow: `Webcam Input (VideoCapture)
    ↓ (frame rate: ~30 FPS)
OpenCV Frame Processing
    ├── Resize + color space conversion
    └── Hand detection ROI extraction
    ↓
MediaPipe Hand Tracking
    ├── 21-point hand skeleton
    └── Confidence scoring per point
    ↓
Gesture Classifier (custom logic)
    ├── Pinch detection (thumb-finger distance)
    ├── Swipe detection (velocity vectors)
    ├── Rotation detection (hand position)
    └── Palm open detection (finger spread)
    ↓
OpenGL Renderer (Pygame window)
    ├── Load 3D mesh (cube, sphere, etc.)
    ├── Apply rotation matrix (from hand position)
    ├── Apply zoom (from pinch gesture)
    ├── Render with lighting
    └── Draw HUD overlay`
    }
  }
];


/** Display name without the subtitle, e.g. "MIRAGE" from "MIRAGE: Cyclone Prevention System". */
export const shortTitle = (item: GalleryItem) => item.title.split(':')[0].trim();

/** Subtitle after the colon, if any. */
export const subTitle = (item: GalleryItem) => item.title.split(':').slice(1).join(':').trim();

export const projectSlug = (item: GalleryItem) =>
  shortTitle(item).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
