import { motion, useMotionValue, useTransform, animate, PanInfo, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Shield, Globe, Activity, Cpu, Search, Brain, Linkedin, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';

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

// ─── Main Systems Component ───────────────────────────────────────────────────
// ─── Glass Coin Carousel Component ───────────────────────────────────────────
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

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
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
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-mono font-black tracking-tighter uppercase text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.45)]">
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
          {items.slice(0, 10).map((item, index) => {
            const angle = (index * 360) / 10;
            const coinLabel = coinLabels[index] || item.title;
            const isCoinHovered = activeCoinIndex === index;

            return (
              <div
                key={index}
                className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full cursor-pointer flex items-center justify-center p-3 text-center transition-all duration-300"
                onClick={() => onCoinClick(item)}
                onMouseEnter={() => {
                  setActiveCoinIndex(index);
                  onCoinHover(item.glow || "rgba(79,70,229,0.3)");
                }}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px) rotateY(${-angle}deg) rotateX(-12deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* 3D Glass Coin Surface */}
                <motion.div
                  className="absolute inset-0 rounded-full border bg-[#050508]/60 backdrop-blur-md flex flex-col items-center justify-center p-3 text-center"
                  style={{
                    borderColor: isCoinHovered 
                      ? (item.glow || "rgba(79,70,229,0.5)") 
                      : "rgba(255,255,255,0.08)",
                    boxShadow: isCoinHovered
                      ? `0 0 35px ${item.glow || "rgba(79,70,229,0.3)"}, inset 0 0 15px rgba(255,255,255,0.05)`
                      : "0 0 20px rgba(0,0,0,0.5), inset 0 0 10px rgba(255,255,255,0.02)",
                  }}
                  whileHover={{ scale: 1.12, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {/* Neon Glow Ring */}
                  <div 
                    className="absolute inset-1.5 rounded-full border border-dashed opacity-25 pointer-events-none"
                    style={{ borderColor: item.glow || "rgba(79,70,229,0.3)" }}
                  />

                  {/* Coin Label */}
                  <span 
                    className="text-[7px] font-mono tracking-widest uppercase mb-1 opacity-45"
                    style={{ color: isCoinHovered ? (item.glow || "#ffffff") : "#888888" }}
                  >
                    COIN {index + 1}
                  </span>

                  {/* Project Title */}
                  <span className="text-[9px] sm:text-[10px] font-mono font-bold leading-tight uppercase text-zinc-100 tracking-tighter max-w-[80px] break-words line-clamp-2">
                    {coinLabel}
                  </span>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

// ─── Main Systems Component ───────────────────────────────────────────────────
export default function Systems() {
  const [selectedTelemetry, setSelectedTelemetry] = useState<any | null>(null);
  const [hoveredGlow, setHoveredGlow] = useState<string | null>(null);

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full" />
            <span className="text-[#4F46E5] font-mono text-xs tracking-widest uppercase">
              Deployed // Production Systems
            </span>
          </div>
        </motion.div>
      </div>

      {/* Ambient background reactive to active hovered coin */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ background: `radial-gradient(ellipse 60% 50% at 50% 60%, ${hoveredGlow || "rgba(79,70,229,0.03)"} 0%, transparent 70%)` }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* ── 3D Glass Coin Carousel Stage ── */}
      <div className="relative max-w-7xl mx-auto px-6 z-20">
        <GlassCoinCarousel
          items={galleryProjects}
          onCoinClick={(item) => setSelectedTelemetry(item)}
          onCoinHover={(glow) => setHoveredGlow(glow)}
        />
      </div>

      {/* Interaction hint */}
      <motion.div
        className="flex justify-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="font-mono text-[9px] text-[#71717A]/50 tracking-[0.3em] uppercase">
          Hover to pause · Select nodes to initialize telemetry
        </span>
      </motion.div>

      {/* ── Additional Systems: 3D Hover Gallery ── */}
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
              // DEPLOYED CODEBASES // 10 ACTIVE SYSTEM ARCHITECTURES
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-mono font-black tracking-tighter uppercase text-white">
            Production Core Registry
          </h2>
          <p className="text-sm text-[#71717A] max-w-xl font-mono leading-relaxed">
            A high-fidelity visual console indexing 10 production-grade engineering systems. Select any active node to initialize live telemetry diagnostics, trace complex data-flow pipelines, and access deployment builds.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-24 relative z-20">
        <ThreeDHoverGallery
          items={galleryProjects}
          onImageClick={(index, item) => {
            if (item.telemetry) {
              setSelectedTelemetry(item);
            }
          }}
        />
      </div>

      {/* System Telemetry Overlay Modal */}
      <AnimatePresence>
        {selectedTelemetry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/95 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
               initial={{ scale: 0.95, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.95, y: 20 }}
               transition={{ type: 'spring', duration: 0.5 }}
               className="relative max-w-4xl w-full bg-[#0D0D12]/95 border border-[#27272A] rounded-2xl p-6 sm:p-8 md:p-12 shadow-[0_0_80px_rgba(79,70,229,0.15)] flex flex-col gap-6 my-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Header Row */}
              <div className="flex justify-between items-start gap-4 border-b border-[#27272A]/80 pb-4">
                <div>
                  <span className="text-[#38BDF8] font-mono text-xs tracking-widest uppercase">
                    SYSTEM TELEMETRY DATA ACTIVE
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-mono font-extrabold tracking-tighter uppercase text-white mt-1">
                    {selectedTelemetry.telemetry.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedTelemetry(null)}
                  className="text-[#71717A] hover:text-white transition-colors font-mono text-xs border border-[#27272A] rounded px-3 py-1.5 bg-[#16161D]"
                >
                  ESC // CLOSE
                </button>
              </div>

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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   3D Hover Gallery Types & Components (Lightswind UI)
───────────────────────────────────────────────────────────────────────────── */
const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");

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

export interface ThreeDHoverGalleryProps {
  images?: string[];
  items?: GalleryItem[];
  itemHeight?: string | number;
  gap?: number;
  perspective?: number;
  hoverScale?: number;
  transitionDuration?: number;
  enableKeyboardNavigation?: boolean;
  autoPlay?: boolean;
  autoPlayDelay?: number;
  className?: string;
  style?: React.CSSProperties;
  onImageClick?: (index: number, item: GalleryItem) => void;
  onImageHover?: (index: number, item: GalleryItem) => void;
}

const galleryProjects: GalleryItem[] = [
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

const DEFAULT_ITEMS: GalleryItem[] = [
  {
    url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=compress&cs=tinysrgb&w=800&q=80",
    title: "Neo Tokyo",
    category: "Cyberpunk",
    description: "Immersive neon skylines and futuristic streets glowing in the rain.",
    glow: "rgba(236,72,153,0.35)"
  }
];

const ThreeDHoverGallery: React.FC<ThreeDHoverGalleryProps> = ({
  images,
  items,
  itemHeight = 500,
  gap = 10,
  perspective = 1000,
  hoverScale = 1.05,
  transitionDuration = 0.5,
  enableKeyboardNavigation = true,
  autoPlay = false,
  autoPlayDelay = 4000,
  className,
  style,
  onImageClick,
  onImageHover,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Normalize data sources
  const galleryItems = useMemo(() => {
    if (items && items.length > 0) return items;
    if (images && images.length > 0) {
      return images.map((url, index) => {
        const fallback = DEFAULT_ITEMS[index % DEFAULT_ITEMS.length];
        return {
          url,
          title: fallback.title,
          category: fallback.category,
          description: fallback.description,
          glow: fallback.glow
        };
      });
    }
    return DEFAULT_ITEMS;
  }, [images, items]);

  // Handle Autoplay Loop
  useEffect(() => {
    if (autoPlay && galleryItems.length > 0) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          const nextIndex = prev === null ? 0 : (prev + 1) % galleryItems.length;
          return nextIndex;
        });
      }, autoPlayDelay);

      return () => {
        if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      };
    }
  }, [autoPlay, autoPlayDelay, galleryItems.length]);

  const handleImageClick = (index: number, item: GalleryItem) => {
    setActiveIndex(activeIndex === index ? null : index);
    onImageClick?.(index, item);
  };

  const handleImageHover = (index: number, item: GalleryItem) => {
    if (!autoPlay) {
      setActiveIndex(index);
    }
    onImageHover?.(index, item);
  };

  const handleImageLeave = () => {
    if (!autoPlay) {
      setActiveIndex(null);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (!enableKeyboardNavigation) return;

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        handleImageClick(index, galleryItems[index]);
        break;
      case "ArrowLeft":
        event.preventDefault();
        const prevIndex = index > 0 ? index - 1 : galleryItems.length - 1;
        (containerRef.current?.children[prevIndex] as HTMLElement)?.focus();
        break;
      case "ArrowRight":
        event.preventDefault();
        const nextIndex = index < galleryItems.length - 1 ? index + 1 : 0;
        (containerRef.current?.children[nextIndex] as HTMLElement)?.focus();
        break;
      case "Escape":
        setActiveIndex(null);
        break;
    }
  };

  return (
    <div
      className={cn(
        "w-full flex items-center justify-center overflow-hidden py-4",
        className
      )}
      style={style}
      onMouseLeave={handleImageLeave}
    >
      <div
        ref={containerRef}
        className="flex justify-center items-center w-full"
        style={{
          perspective: `${perspective}px`,
          transformStyle: "preserve-3d",
          gap: `${gap}px`,
        }}
      >
        {galleryItems.map((item, index) => {
          const isActive = activeIndex === index;
          const isFocused = focusedIndex === index;

          return (
            <motion.div
              key={index}
              role="button"
              tabIndex={enableKeyboardNavigation ? 0 : -1}
              onClick={() => handleImageClick(index, item)}
              onMouseEnter={() => handleImageHover(index, item)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-label={item.title}
              aria-pressed={isActive}
              layout
              animate={{
                rotateY: activeIndex === null ? 0 : index < activeIndex ? 24 : index > activeIndex ? -24 : 0,
              }}
              transition={{
                layout: { type: "spring", stiffness: 100, damping: 17 },
                rotateY: { type: "spring", stiffness: 90, damping: 15 },
                filter: { duration: 0.3 }
              }}
              style={{
                height: typeof itemHeight === "number" ? `${itemHeight}px` : itemHeight,
                zIndex: isActive ? 20 : 10,
                flex: isActive ? 5.8 : 1,
                minWidth: isActive ? "280px" : "60px",
                transformStyle: "preserve-3d",
              }}
              className={cn(
                "relative cursor-pointer select-none overflow-hidden rounded-2xl border transition-all duration-300",
                isActive
                  ? "border-zinc-300/80 dark:border-zinc-700/60"
                  : activeIndex === null
                    ? "grayscale-[0.25] brightness-[0.8] dark:brightness-[0.7] border-zinc-200/50 dark:border-zinc-800/40 hover:border-zinc-300 dark:hover:border-zinc-700/60"
                    : "grayscale brightness-[0.4] dark:brightness-[0.3] border-zinc-200/30 dark:border-zinc-800/20",
                isFocused
                  ? "ring-2 ring-[#4F46E5] ring-offset-2 dark:ring-offset-zinc-950 scale-[1.01] border-[#4F46E5]/50"
                  : "",
                "bg-zinc-100 dark:bg-zinc-900 shadow-sm"
              )}
            >
              {/* Outer Neon Shadow Glow when Active */}
              {isActive && item.glow && (
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl transition-all duration-500 z-10"
                  style={{
                    boxShadow: `inset 0 0 20px ${item.glow}, 0 0 15px ${item.glow}`,
                  }}
                />
              )}

              {/* Background Video or Image Container */}
              {isActive && item.video ? (
                <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-[1]">
                  <iframe
                    src={`https://www.youtube.com/embed/${item.video}?autoplay=1&mute=1&loop=1&playlist=${item.video}&controls=0&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&modestbranding=1`}
                    title={item.title}
                    className="w-full h-full scale-[1.35] object-cover pointer-events-none"
                    allow="autoplay; encrypted-media"
                    style={{ border: 'none' }}
                  />
                </div>
              ) : (
                <motion.div
                  animate={{ scale: isActive ? hoverScale : 1.0 }}
                  transition={{ duration: transitionDuration, ease: [0.1, 0.7, 0, 1] }}
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `url(${item.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              )}

              {/* Text Readable Gradient Overlay */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t transition-opacity duration-300 z-[2]",
                  isActive
                    ? "from-black/90 via-black/40 to-black/10 opacity-100"
                    : "from-black/60 via-transparent to-transparent opacity-40"
                )}
              />

              {/* Dynamic Overlay Content (shown only on active card) */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 z-[4] text-white overflow-hidden">
                <AnimatePresence>
                  {isActive && (
                    <div className="flex flex-col items-start w-full">
                      {/* Category */}
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 0.9, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                        className="text-[9px] font-black tracking-widest uppercase text-[#38BDF8] mb-1"
                      >
                        {item.category}
                      </motion.span>

                      {/* Title */}
                      <motion.h4
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="text-base md:text-lg lg:text-xl font-bold leading-tight tracking-tight mb-1 text-zinc-50"
                      >
                        {item.title}
                      </motion.h4>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 0.7, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                        className="text-[11px] md:text-xs font-medium leading-relaxed tracking-wide text-zinc-300 mb-3 max-w-[280px] sm:max-w-sm"
                      >
                        {item.description}
                      </motion.p>

                      {/* Tags */}
                      {item.tags && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {item.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="text-[9px] font-mono px-2 py-0.5 rounded border border-white/20 text-zinc-300 bg-white/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Explore / Action Links */}
                      <div className="flex items-center gap-4">
                        {item.github && item.github !== "#" && (
                          <a
                            href={item.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-zinc-100 hover:text-[#38BDF8] transition-colors group/btn"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>Source</span>
                          </a>
                        )}
                        {item.link && item.link !== "#" && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-zinc-100 hover:text-[#38BDF8] transition-colors group/btn"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
                          </a>
                        )}
                        {(!item.github || item.github === "#") && (!item.link || item.link === "#") && (
                          <div className="flex items-center gap-1 text-[9px] font-bold tracking-widest uppercase text-zinc-400">
                            <span>Repository Sync Pending</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
