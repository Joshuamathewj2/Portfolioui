import { motion, useMotionValue, useTransform, animate, PanInfo, AnimatePresence, MotionValue } from 'motion/react';
import { ExternalLink, Github, Shield, Globe, Activity, Cpu, Search, Brain, Linkedin, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import StellarCardGallery from './StellarCardGallery';
import ProjectIndex from './ProjectIndex';
import { lockScroll } from './SmoothScroll';
import { useSearchParams } from 'react-router';
import { galleryProjects, GalleryItem, projectSlug } from '../data/projects';

const projects = [
  {
    id: 'debatrix',
    title: 'Debatrix',
    description: 'Developed an AI-powered reasoning engine that optimizes structured argument evaluation, achieving 95% accuracy in evidence-backed discussion flows through RAG-based retrieval pipelines.',
    tags: ['FastAPI', 'RAG', 'Vector Retrieval', 'AI Pipelines', 'React'],
    category: 'AI REASONING',
    visual: 'reasoning',
    accent: '#4F46E5',
    icon: Brain,
    link: 'https://github.com/Joshuamathewj2',
    github: 'https://github.com/Joshuamathewj2',
    details: [
      'Engineered modular RAG pipelines for contextual evidence retrieval with reduced latency',
      'Orchestrated multi-perspective debate logic for complex reasoning chains',
      'Implemented semantic retrieval workflows delivering evidence-backed response generation',
      'Optimized backend infrastructure for high-concurrency reasoning processing',
    ],
  },
  {
    id: 'mirage',
    title: 'MIRAGE',
    description: 'Architected a behavioral trust-analysis platform that identifies adversarial patterns with high precision, utilizing layered scoring mechanisms to secure digital interactions.',
    tags: ['Python', 'Behavioral Analysis', 'Flask', 'Security Systems', 'Trust Scoring'],
    category: 'ADVERSARIAL INTEL',
    visual: 'security',
    accent: '#EF4444',
    icon: Shield,
    link: 'https://github.com/Joshuamathewj2',
    github: 'https://github.com/Joshuamathewj2',
    details: [
      'Designed adaptive behavioral trust scoring system for real-time threat evaluation',
      'Deployed layered anomaly detection workflows using advanced heuristic analysis',
      'Built a modular engine that monitors and flags adversarial interaction patterns',
      'Minimized false positives in behavior analysis through iterative model tuning',
    ],
  },
  {
    id: 'pixeltrust',
    title: 'PixelTrust',
    description: 'Engineered a pixel-level image forensics pipeline that detects AI manipulations with sub-2s latency, providing enterprise-grade authenticity verification.',
    tags: ['React', 'FastAPI', 'Python', 'CV'],
    category: 'AI FORENSICS',
    visual: 'scan',
    accent: '#38BDF8',
    icon: Search,
    link: 'https://pixel-trust.vercel.app/',
    github: 'https://github.com/Joshuamathewj2/PixelTrust',
    details: [
      'Reduced inference latency to <2s for production-grade image forensic analysis',
      'Developed a three-stage decomposition model: metadata, frequency, and neural features',
      'Implemented a pluggable trust-score pipeline for multi-vector authentic verification',
      'Architected a decoupled React + FastAPI system for scalable request handling',
    ],
  },
  {
    id: 'thrillcircuit',
    title: 'ThrillCircuit',
    description: 'Built a high-throughput prompt injection detection engine that secures LLM applications against jailbreaks with a sub-10ms evaluation overhead.',
    tags: ['Python', 'Flask', 'Heuristics'],
    category: 'LLM SECURITY',
    visual: 'security',
    accent: '#EF4444',
    icon: Shield,
    link: 'https://github.com/Joshuamathewj2',
    github: 'https://github.com/Joshuamathewj2',
    details: [
      'Achieved <10ms evaluation latency through optimized heuristic pattern matching',
      'Defended against obfuscated cross-lingual payloads and encoded adversarial attacks',
      'Designed a stateless microservice architecture for seamless middleware integration',
      'Integrated regex-entropy hybrid scoring for robust threat detection',
    ],
  },
  {
    id: 'gis',
    title: 'GIS Evacuation',
    description: 'Optimized a geospatial emergency platform that identifies nearest-neighbor shelters in real-time, functioning flawlessly in degraded connectivity environments.',
    tags: ['JS', 'Leaflet.js', 'GeoJSON'],
    category: 'GEOSPATIAL',
    visual: 'map',
    accent: '#10B981',
    icon: Globe,
    link: 'https://gis-smart-evacuation-system.vercel.app/',
    github: 'https://github.com/Joshuamathewj2',
    details: [
      'Enabled backend-independent operation via client-side nearest-neighbor search',
      'Optimized GeoJSON processing for rapid rendering of massive spatial datasets',
      'Implemented tile-loading strategies to ensure reliability on unreliable networks',
      'Directly improved emergency response times through low-latency route rendering',
    ],
  },
  {
    id: 'valora',
    title: 'Valora',
    description: 'Designed a high-fidelity system interface for collaborative engineering, improving spatial awareness and workflow orchestration for complex node management.',
    tags: ['React', 'Framer Motion', 'Tailwind'],
    category: 'SYSTEM INTERFACE',
    visual: 'interface',
    accent: '#EC4899',
    icon: Cpu,
    link: 'https://vercel.com/joshuas-projects-71456ba4/valora',
    github: 'https://github.com/Joshuamathewj2',
    linkedin: 'https://www.linkedin.com/in/joshua-learns',
    details: [
      'Developed a motion-driven UI system enhancing spatial context for engineers',
      'Architected modular dashboards for real-time system status monitoring',
      'Streamlined asset pipelines resulting in a seamless interactive performance',
      'Integrated node-management controls for efficient collaborative workflows',
    ],
  },
  {
    id: 'musicmaster',
    title: 'Music Master',
    description: 'Transformed complex music theory into an intuitive visual learning system, simplifying the discovery of scales and notations through an interactive digital platform.',
    tags: ['React', 'JavaScript', 'Web Audio API', 'Interactive UI'],
    category: 'MUSIC THEORY',
    visual: 'audio',
    accent: '#A855F7',
    icon: Activity,
    link: 'https://music-master-josh.vercel.app/',
    github: 'https://github.com/Joshuamathewj2',
    details: [
      'Authored interactive learning modules scaling from basic notes to advanced theory',
      'Built a dynamic note-visualization engine using the Web Audio API',
      'Focused on UI clarity to reduce cognitive load during theoretical learning',
      'Delivered a responsive educational experience optimized for browser use',
    ],
  },
  {
    id: 'pillpulse',
    title: 'PillPulse',
    description: 'Automated medication adherence by engineering an OCR-driven pipeline that links prescription parsing to caregiver notification systems via Firebase.',
    tags: ['React', 'Flask', 'OCR', 'n8n'],
    category: 'HEALTHCARE AI',
    visual: 'medical',
    accent: '#F59E0B',
    icon: Activity,
    link: 'https://pill-pulse-172010-rhl4.vercel.app/',
    github: 'https://github.com/Joshuamathewj2',
    details: [
      'Automated the OCR-to-FCM notification loop, improving reliability of medication adherence',
      'Orchestrated multi-stage workflows using n8n for serverless execution',
      'Achieved Top 10 Finalist status at CTRL+ALT+HACK 2.0 (30+ Technical Events)',
      'Built resilient asynchronous pipelines for state-level delivery of health updates',
    ],
  },
];

// ─── Project-specific animated motion graphics ───────────────────────────────
function ProjectVisual({ visual, accent, isActive }: { visual: string; accent: string; isActive: boolean }) {
  const opacity = isActive ? 1 : 0.3;

  if (visual === 'reasoning') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" style={{ opacity }}>
          {[0, 1, 2, 3].map((i) => (
            <motion.line
              key={i}
              x1={`${10 + i * 20}%`} y1="10%" x2={`${30 + i * 15}%`} y2="90%"
              stroke={accent} strokeWidth="0.5" strokeDasharray="4 8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isActive ? { pathLength: [0, 1, 0], opacity: [0, 0.4, 0] } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.7, ease: 'easeInOut' }}
            />
          ))}
          {[[15, 20], [70, 40], [40, 70], [80, 80]].map(([cx, cy], i) => (
            <motion.circle
              key={i} cx={`${cx}%`} cy={`${cy}%`} r="3" fill="none"
              stroke={accent} strokeWidth="1"
              animate={isActive ? { r: [3, 8, 3], opacity: [0.6, 0.1, 0.6] } : { r: 3, opacity: 0.1 }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (visual === 'security') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_30px,rgba(239,68,68,0.03)_30px,rgba(239,68,68,0.03)_60px)]" style={{ opacity }} />
        {isActive && (
          <motion.div
            className="absolute left-0 right-0 h-px"
            style={{ background: `linear-gradient(to right, transparent, ${accent}60, transparent)` }}
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
        )}
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: opacity * 0.5 }}>
          <motion.rect
            x="30%" y="30%" width="40%" height="40%" rx="4"
            fill="none" stroke={accent} strokeWidth="0.5"
            animate={isActive ? { strokeDashoffset: [0, -50] } : {}}
            style={{ strokeDasharray: '10 5' }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </svg>
      </div>
    );
  }

  if (visual === 'scan') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isActive && (
          <>
            <motion.div
              className="absolute left-0 right-0 h-[2px]"
              style={{ background: `linear-gradient(to right, transparent, ${accent}80, transparent)`, boxShadow: `0 0 12px ${accent}40` }}
              animate={{ top: ['10%', '90%', '10%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            {[20, 40, 60, 80].map((x, i) => (
              <motion.div
                key={i}
                className="absolute top-0 bottom-0 w-px"
                style={{ left: `${x}%`, background: `linear-gradient(to bottom, transparent, ${accent}20, transparent)` }}
                animate={{ opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </>
        )}
        <div className="absolute inset-0" style={{ opacity: opacity * 0.15, backgroundImage: `radial-gradient(${accent} 1px, transparent 1px)`, backgroundSize: '12px 12px' }} />
      </div>
    );
  }

  if (visual === 'map') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{ opacity: opacity * 0.12, backgroundImage: `radial-gradient(${accent} 1px, transparent 1px)`, backgroundSize: '14px 14px' }} />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity }}>
          <motion.polyline
            points="10,80 30,55 55,65 70,35 90,50"
            fill="none" stroke={accent} strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: [0, 1] } : { pathLength: 0 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
          />
          {[[30, 55], [55, 65], [70, 35]].map(([cx, cy], i) => (
            <motion.circle key={i} cx={`${cx}%`} cy={`${cy}%`} r="3"
              fill={accent}
              animate={isActive ? { r: [3, 6, 3], opacity: [0.8, 0.2, 0.8] } : { r: 3, opacity: 0.2 }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (visual === 'interface') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" style={{ opacity }}>
          {[['5%', '5%', '30%', '5%'], ['5%', '5%', '5%', '95%'], ['70%', '5%', '95%', '5%'], ['95%', '5%', '95%', '95%']].map(([x1, y1, x2, y2], i) => (
            <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={accent} strokeWidth="0.5"
              animate={isActive ? { opacity: [0.3, 0.8, 0.3] } : { opacity: 0.1 }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
          {[[50, 50]].map(([cx, cy], i) => (
            <motion.circle key={i} cx={`${cx}%`} cy={`${cy}%`} r="20"
              fill="none" stroke={accent} strokeWidth="0.5"
              animate={isActive ? { r: [20, 35, 20], opacity: [0.4, 0.1, 0.4] } : { r: 20, opacity: 0.1 }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (visual === 'audio') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute bottom-4 left-0 right-0 w-full" height="60" style={{ opacity }}>
          {[...Array(16)].map((_, i) => (
            <motion.rect
              key={i} x={`${4 + i * 6}%`} width="3%" rx="1"
              fill={accent}
              animate={isActive ? { height: [4, Math.random() * 40 + 8, 4], y: [50, 50 - (Math.random() * 40 + 8), 50] } : { height: 4, y: 50 }}
              transition={{ duration: 0.6 + Math.random() * 0.8, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (visual === 'medical') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" style={{ opacity }}>
          <motion.polyline
            points="0,50 15,50 20,20 25,80 35,35 45,65 55,50 65,50 70,30 75,70 85,50 100,50"
            fill="none" stroke={accent} strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            animate={isActive ? { strokeDashoffset: [0, -200] } : {}}
            style={{ strokeDasharray: '8 4' }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </svg>
      </div>
    );
  }

  return <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/5 to-transparent" style={{ opacity }} />;
}

// ─── Glass Coin Carousel Component ───────────────────────────────────────────
const coinLabels = [
  "MIRAGE",
  "Analyser Agent",
  "ResQ",
  "PillPulse AI",
  "BloodChain",
  "PixelTrust",
  "Aura-X1",
  "Valora",
  "Silent Words MVC",
  "Gesture Hologram PRO"
];

// A single coin. It counter-rotates against the orbit so its face always points at
// the viewer (labels never render mirrored), and fades as it swings to the back.
function OrbitCoin({
  item,
  index,
  count,
  radius,
  rotationY,
  isCoinHovered,
  onClick,
  onHover,
}: {
  item: GalleryItem;
  index: number;
  count: number;
  radius: number;
  rotationY: MotionValue<number>;
  isCoinHovered: boolean;
  onClick: () => void;
  onHover: () => void;
}) {
  const angle = (index * 360) / count;
  const transform = useTransform(
    rotationY,
    (r) => `rotateY(${angle}deg) translateZ(${radius}px) rotateY(${-angle - r}deg) rotateX(-12deg)`
  );
  const depthOpacity = useTransform(rotationY, (r) => {
    const facing = Math.cos(((angle + r) * Math.PI) / 180); // 1 = front, -1 = back
    return 0.35 + 0.65 * ((facing + 1) / 2);
  });
  const coinLabel = coinLabels[index] || item.title;

  return (
    <motion.button
      type="button"
      aria-label={`Open ${coinLabel} telemetry`}
      className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full cursor-pointer flex items-center justify-center p-3 text-center"
      onClick={onClick}
      onMouseEnter={onHover}
      onFocus={onHover}
      style={{ transform, opacity: isCoinHovered ? 1 : depthOpacity, transformStyle: "preserve-3d" }}
    >
      {/* 3D Glass Coin Surface with rotating electric conic gradient border */}
      <motion.div
        className="absolute inset-0 rounded-full p-[2px] overflow-hidden flex items-center justify-center bg-zinc-950/80 shadow-[0_0_20px_rgba(0,0,0,0.6)]"
        whileHover={{ scale: 1.12, y: -10 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {/* Conic-gradient rotating border */}
        <div
          className="absolute inset-[-50%] rounded-full animate-[spin_4s_linear_infinite] pointer-events-none"
          style={{
            background: "conic-gradient(from 0deg, #a855f7 0%, #8b5cf6 25%, #00fffc 50%, #8b5cf6 75%, #a855f7 100%)",
            opacity: isCoinHovered ? 1 : 0.45,
          }}
        />

        {/* Inner Content Container (Masking center of conic gradient) */}
        <div
          className="relative w-full h-full rounded-full bg-[#050508]/95 backdrop-blur-md flex flex-col items-center justify-center p-3 text-center z-10 transition-all duration-300"
          style={{
            boxShadow: isCoinHovered
              ? "0 0 18px rgba(168, 85, 247, 0.5), inset 0 0 10px rgba(168, 85, 247, 0.3)"
              : "inset 0 0 10px rgba(255,255,255,0.02)",
          }}
        >
          {/* Neon Glow Ring */}
          <div
            className="absolute inset-1.5 rounded-full border border-dashed opacity-25 pointer-events-none"
            style={{ borderColor: isCoinHovered ? "#a855f7" : "rgba(255,255,255,0.08)" }}
          />

          {/* Coin Label */}
          <span
            className="text-[7px] font-mono tracking-widest uppercase mb-1 opacity-60"
            style={{ color: isCoinHovered ? "#a855f7" : "#888888" }}
          >
            COIN {index + 1}
          </span>

          {/* Project Title */}
          <span className="text-[9px] sm:text-[10px] font-mono font-bold leading-tight uppercase text-zinc-100 tracking-tighter max-w-[80px] break-words line-clamp-2">
            {coinLabel}
          </span>
        </div>
      </motion.div>
    </motion.button>
  );
}

const GlassCoinCarousel: React.FC<{
  items: GalleryItem[];
  onCoinClick: (item: GalleryItem) => void;
  onCoinHover: (glow: string | null) => void;
}> = ({ items, onCoinClick, onCoinHover }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeCoinIndex, setActiveCoinIndex] = useState<number | null>(null);
  const [radius, setRadius] = useState(420);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius(240);
      } else if (window.innerWidth < 1024) {
        setRadius(330);
      } else {
        setRadius(420);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rotationY = useMotionValue(0);

  useEffect(() => {
    let controls;
    if (!isHovered) {
      controls = animate(rotationY, [rotationY.get(), rotationY.get() + 360], {
        ease: "linear",
        duration: 35,
        repeat: Infinity,
      });
    }
    return () => controls?.stop();
  }, [isHovered, rotationY]);

  const coins = items.slice(0, 10);

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] flex items-center justify-center overflow-hidden">
      {/* 3D Scene Container */}
      <div
        className="relative w-full h-full flex items-center justify-center select-none"
        style={{
          perspective: "1400px",
          transformStyle: "preserve-3d"
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setActiveCoinIndex(null);
          onCoinHover(null);
        }}
      >
        {/* Central Anchor Text */}
        <div className="absolute z-10 text-center pointer-events-none">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-syne font-extrabold tracking-tighter uppercase text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.35)]">
            JOSHUA PROJECTS
          </h2>
          <span className="text-[10px] text-[#38BDF8] font-mono tracking-[0.3em] uppercase block mt-2 opacity-80">
            // INTERACTIVE TELEMETRY ORBIT //
          </span>
        </div>

        {/* Floating Orbiting Coins Container */}
        <motion.div
          className="relative w-[300px] h-[300px] flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            rotateX: 12,
            rotateY: rotationY,
          }}
        >
          {coins.map((item, index) => (
            <OrbitCoin
              key={index}
              item={item}
              index={index}
              count={coins.length}
              radius={radius}
              rotationY={rotationY}
              isCoinHovered={activeCoinIndex === index}
              onClick={() => onCoinClick(item)}
              onHover={() => {
                setActiveCoinIndex(index);
                onCoinHover(item.glow || "rgba(79,70,229,0.3)");
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// ─── Main Systems Component ───────────────────────────────────────────────────
export default function Systems() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hoveredGlow, setHoveredGlow] = useState<string | null>(null);

  // The open project lives in the URL (?project=<slug>) so it can be deep-linked and shared.
  const selectedSlug = searchParams.get('project');
  const selectedTelemetry = useMemo(
    () => galleryProjects.find((p) => p.telemetry && projectSlug(p) === selectedSlug) ?? null,
    [selectedSlug]
  );

  const openProject = useCallback(
    (item: GalleryItem) => {
      if (!item.telemetry) return;
      setSearchParams({ project: projectSlug(item) }, { replace: true, preventScrollReset: true });
    },
    [setSearchParams]
  );

  const closeProject = useCallback(() => {
    setSearchParams({}, { replace: true, preventScrollReset: true });
  }, [setSearchParams]);

  useEffect(() => {
    if (!selectedTelemetry) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProject();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      lockScroll(false);
    };
  }, [selectedTelemetry, closeProject]);

  return (
    <section id="projects" className="relative pt-40 pb-24 overflow-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-[1fr_auto] gap-8 items-end"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full" />
              <span className="text-[#4F46E5] font-mono text-xs tracking-widest uppercase">
                Deployed // Production Systems
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-syne font-bold tracking-tighter leading-[0.9]">
              Selected <span className="text-outline">systems</span><span className="text-[#4F46E5]">.</span>
            </h1>
          </div>
          <p className="text-[#A1A1AA] font-inter max-w-sm leading-relaxed">
            {galleryProjects.length} production-grade builds across AI agents, security, healthcare and spatial interfaces. Pick any one to open its full telemetry.
          </p>
        </motion.div>
      </div>

      {/* Ambient background reactive to active hovered coin */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ background: `radial-gradient(ellipse 60% 50% at 50% 30%, ${hoveredGlow || "rgba(79,70,229,0.03)"} 0%, transparent 70%)` }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* ── 3D Glass Coin Carousel Stage ── */}
      <div className="relative max-w-7xl mx-auto px-6 z-20">
        <GlassCoinCarousel
          items={galleryProjects}
          onCoinClick={openProject}
          onCoinHover={(glow) => setHoveredGlow(glow)}
        />
      </div>

      {/* Interaction hint */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="font-mono text-[9px] text-[#71717A]/70 tracking-[0.3em] uppercase text-center px-6">
          Hover to pause · Select nodes to initialize telemetry
        </span>
      </motion.div>

      {/* ── Project Index: readable list of every system ── */}
      <div className="max-w-7xl mx-auto px-6 mt-32 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between gap-6 mb-10"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-[#a855f7] rounded-full" />
              <span className="text-[#a855f7] font-mono text-xs tracking-wider uppercase font-semibold">
                // SYSTEM INDEX
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-syne font-bold tracking-tighter text-white">
              Every build, at a glance
            </h2>
          </div>
          <span className="hidden sm:block font-mono text-xs text-[#71717A]">
            {String(galleryProjects.length).padStart(2, '0')} ENTRIES
          </span>
        </motion.div>

        <ProjectIndex items={galleryProjects} onSelect={openProject} />
      </div>

      {/* ── Additional Systems: 3D Stellar Card Galaxy ── */}
      <div className="max-w-7xl mx-auto px-6 mt-32 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full" />
            <span className="text-[#38BDF8] font-mono text-xs tracking-wider uppercase font-semibold">
              // DEPLOYED CODEBASES // {galleryProjects.length} ACTIVE SYSTEM ARCHITECTURES
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-syne font-bold tracking-tighter text-white">
            Production Core Registry
          </h2>
          <p className="text-sm text-[#71717A] max-w-xl font-mono leading-relaxed">
            A high-fidelity visual console indexing {galleryProjects.length} production-grade engineering systems. Select any active node to initialize live telemetry diagnostics, trace complex data-flow pipelines, and access deployment builds.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-24 relative z-20" data-lenis-prevent>
        <StellarCardGallery items={galleryProjects} onProjectSelect={openProject} />
      </div>

      {/* System Telemetry Overlay Modal (portaled: <main> is its own stacking context below the navbar) */}
      {createPortal(<AnimatePresence>
        {selectedTelemetry?.telemetry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProject}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/90 backdrop-blur-xl p-4 sm:p-6"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="telemetry-title"
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.97, y: 20, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-4xl w-full bg-[#0D0D12]/95 border border-[#27272A] rounded-2xl shadow-[0_0_80px_rgba(79,70,229,0.15)] max-h-[90vh] overflow-y-auto overscroll-contain"
            >
              {/* Hero thumbnail */}
              <div className="relative h-48 sm:h-64 overflow-hidden rounded-t-2xl">
                <img src={selectedTelemetry.url} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-[#0D0D12]/40 to-transparent" />
                <div
                  className="absolute inset-0 mix-blend-overlay"
                  style={{ background: `radial-gradient(ellipse at 30% 100%, ${selectedTelemetry.glow ?? 'rgba(79,70,229,0.4)'}, transparent 70%)` }}
                />
              </div>

              <div className="relative -mt-20 p-6 sm:p-8 md:p-12 flex flex-col gap-6">
                {/* Header Row */}
                <div className="flex justify-between items-start gap-4 border-b border-[#27272A]/80 pb-4">
                  <div>
                    <span className="text-[#38BDF8] font-mono text-xs tracking-widest uppercase">
                      SYSTEM TELEMETRY DATA ACTIVE
                    </span>
                    <h3 id="telemetry-title" className="text-2xl sm:text-4xl font-syne font-bold tracking-tighter text-white mt-1">
                      {selectedTelemetry.telemetry.title}
                    </h3>
                  </div>
                  <button
                    onClick={closeProject}
                    autoFocus
                    className="shrink-0 text-[#71717A] hover:text-white transition-colors font-mono text-xs border border-[#27272A] rounded px-3 py-1.5 bg-[#16161D]"
                  >
                    ESC // CLOSE
                  </button>
                </div>

                {/* Source / live links */}
                {(selectedTelemetry.github || (selectedTelemetry.link && selectedTelemetry.link !== '#')) && (
                  <div className="flex flex-wrap gap-3">
                    {selectedTelemetry.github && (
                      <a
                        href={selectedTelemetry.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-mono text-[11px] font-bold tracking-wider uppercase hover:bg-[#4F46E5] hover:text-white transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" /> View Source
                      </a>
                    )}
                    {selectedTelemetry.link && selectedTelemetry.link !== '#' && selectedTelemetry.link !== selectedTelemetry.github && (
                      <a
                        href={selectedTelemetry.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#27272A] text-white font-mono text-[11px] font-bold tracking-wider uppercase hover:border-[#4F46E5] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live Build
                      </a>
                    )}
                  </div>
                )}

                {/* Tagline */}
                <p className="text-zinc-300 text-sm font-mono leading-relaxed border-l-2 border-[#4F46E5] pl-4">
                  {selectedTelemetry.telemetry.tagline}
                </p>

                {/* Grid Layout of Data */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-mono">
                  {/* Left Side: Summary & Details */}
                  <div className="space-y-6">
                    <div>
                      <span className="text-[#71717A] uppercase tracking-wider block mb-2 font-bold">
                        // Telemetry Summary Logs
                      </span>
                      <div className="bg-[#050508] border border-[#27272A] rounded p-4 font-mono text-xs text-amber-500 leading-tight">
                        <span className="text-amber-600 font-bold">[INFO] </span>
                        {selectedTelemetry.telemetry.summary}
                      </div>
                    </div>

                    <div>
                      <span className="text-[#71717A] uppercase tracking-wider block mb-2 font-bold">
                        // Detailed System Operations
                      </span>
                      <p className="text-zinc-300 font-sans text-sm leading-relaxed antialiased">
                        {selectedTelemetry.telemetry.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Tech Stack */}
                  <div>
                    <span className="text-[#71717A] uppercase tracking-wider block mb-3 font-bold">
                      // System Tech Stack
                    </span>
                    <ul className="space-y-2 text-zinc-400">
                      {selectedTelemetry.telemetry.techStack.map((tech: string, idx: number) => (
                        <li key={idx} className="flex gap-2 items-start">
                          <span className="text-[#4F46E5] font-bold">»</span>
                          <span>{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Highlights */}
                <div className="text-xs font-mono">
                  <span className="text-[#71717A] uppercase tracking-wider block mb-3 font-bold">
                    // Key Engineering Highlights & Diagnostics
                  </span>
                  <div className="bg-[#050508] border border-[#27272A] rounded p-5 text-emerald-400 font-mono leading-tight space-y-2.5">
                    {selectedTelemetry.telemetry.highlights.map((h: string, idx: number) => (
                      <div key={idx} className="flex gap-2 items-start">
                        <span className="text-emerald-500 font-bold shrink-0">&gt;</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data Flow Diagram */}
                <div className="text-xs font-mono">
                  <span className="text-[#71717A] uppercase tracking-wider block mb-3 font-bold">
                    // System Data Flow Diagram
                  </span>
                  <pre className="bg-[#050508] p-5 border border-[#27272A] rounded font-mono text-[10px] text-amber-500 overflow-x-auto leading-5 shadow-inner">
                    {selectedTelemetry.telemetry.dataFlow}
                  </pre>
                </div>

                {/* Validated Recognition Section */}
                {selectedTelemetry.telemetry.certificate && (
                  <div className="text-xs font-mono border-t border-[#27272A]/40 pt-6">
                    <span className="text-[#71717A] uppercase tracking-wider block mb-3 font-bold">
                      {selectedTelemetry.telemetry.certificate.header}
                    </span>
                    <div className="flex flex-col md:flex-row gap-6 items-center bg-[#050508]/80 border border-[#27272A]/60 rounded-xl p-6 shadow-inner">
                      <div className="space-y-3 flex-1">
                        <p className="text-zinc-200 text-sm font-semibold leading-relaxed antialiased">
                          {selectedTelemetry.telemetry.certificate.text}
                        </p>
                        <div className="text-[10px] text-emerald-400/90 font-mono">
                          » STATUS: VERIFIED CREDENTIAL SYNCED
                        </div>
                      </div>
                      <div className="relative group shrink-0 w-full md:w-64 aspect-[4/3] rounded-lg overflow-hidden border border-emerald-500/20 bg-zinc-950/40 p-1 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                        <img
                          src={selectedTelemetry.telemetry.certificate.image}
                          alt="Validated Credential Badge"
                          className="w-full h-full object-contain rounded"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Encapsulated Video Demo */}
                {selectedTelemetry.telemetry.video && (
                  <div className="text-xs font-mono">
                    <span className="text-[#71717A] uppercase tracking-wider block mb-3 font-bold">
                      // Live System Demo Simulation
                    </span>
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#27272A] bg-[#050508] shadow-lg">
                      <iframe
                        src={`https://www.youtube.com/embed/${selectedTelemetry.telemetry.video}?autoplay=1&mute=1&loop=1&playlist=${selectedTelemetry.telemetry.video}&controls=1`}
                        title="System Simulation"
                        className="absolute inset-0 w-full h-full"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                        style={{ border: 'none' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>, document.body)}
    </section>
  );
}
