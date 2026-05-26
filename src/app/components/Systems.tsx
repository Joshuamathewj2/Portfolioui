import { motion, useMotionValue, useTransform, animate, PanInfo } from 'motion/react';
import { ExternalLink, Github, Shield, Globe, Activity, Cpu, Search, Brain, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';

const projects = [
  {
    id: 'debatrix',
    title: 'Debatrix',
    description: 'AI-assisted debate and reasoning platform designed for structured argument evaluation, evidence-backed discussion flow, and contextual response generation using retrieval-augmented pipelines.',
    tags: ['FastAPI', 'RAG', 'Vector Retrieval', 'AI Pipelines', 'React'],
    category: 'AI REASONING',
    visual: 'reasoning',
    accent: '#4F46E5',
    icon: Brain,
    link: 'https://github.com/Joshuamathewj2',
    github: 'https://github.com/Joshuamathewj2',
    details: [
      'Built modular RAG-based reasoning pipelines for contextual evidence retrieval',
      'Designed structured argument orchestration system for multi-perspective debate handling',
      'Implemented semantic retrieval workflows for evidence-backed response generation',
      'Developed scalable backend architecture for realtime reasoning chains',
    ],
  },
  {
    id: 'mirage',
    title: 'MIRAGE',
    description: 'Adaptive behavioral trust-analysis platform focused on detecting suspicious interaction patterns, adversarial behavior, and digital deception through layered scoring mechanisms.',
    tags: ['Python', 'Behavioral Analysis', 'Flask', 'Security Systems', 'Trust Scoring'],
    category: 'ADVERSARIAL INTEL',
    visual: 'security',
    accent: '#EF4444',
    icon: Shield,
    link: 'https://github.com/Joshuamathewj2',
    github: 'https://github.com/Joshuamathewj2',
    details: [
      'Designed behavioral trust scoring architecture for adaptive threat evaluation',
      'Implemented layered anomaly detection workflows using heuristic analysis pipelines',
      'Developed modular analysis engine for adversarial interaction monitoring',
      'Architected scalable backend logic for realtime behavioral pattern processing',
    ],
  },
  {
    id: 'pixeltrust',
    title: 'PixelTrust',
    description: 'AI-powered image authenticity verification. Detects manipulated and AI-generated images through layered frequency analysis and pixel-level feature extraction.',
    tags: ['React', 'FastAPI', 'Python', 'CV'],
    category: 'AI FORENSICS',
    visual: 'scan',
    accent: '#38BDF8',
    icon: Search,
    link: 'https://pixel-trust.vercel.app/',
    github: 'https://github.com/Joshuamathewj2/PixelTrust',
    details: [
      'Decoupled React + FastAPI architecture with async request handling',
      'Pluggable trust-score pipeline with independent detection modules',
      'Three-stage decomposition: metadata, frequency domain, and neural features',
      'Sub-2s inference latency on production-grade imaging',
    ],
  },
  {
    id: 'thrillcircuit',
    title: 'ThrillCircuit',
    description: 'Production-grade prompt injection detection engine. Protects LLM applications from jailbreaks and adversarial attacks with sub-10ms latency.',
    tags: ['Python', 'Flask', 'Heuristics'],
    category: 'LLM SECURITY',
    visual: 'security',
    accent: '#EF4444',
    icon: Shield,
    link: 'https://github.com/Joshuamathewj2',
    github: 'https://github.com/Joshuamathewj2',
    details: [
      'Multi-layer analysis: regex pattern matching and entropy scoring',
      'Detects encoded attacks and obfuscated cross-lingual payloads',
      'Stateless microservice designed for middleware integration',
      'Optimized heuristic evaluation for high-throughput environments',
    ],
  },
  {
    id: 'gis',
    title: 'GIS Evacuation',
    description: 'Emergency evacuation platform. Real-time nearest-neighbor shelter identification using structured GeoJSON datasets optimized for degraded connectivity.',
    tags: ['JS', 'Leaflet.js', 'GeoJSON'],
    category: 'GEOSPATIAL',
    visual: 'map',
    accent: '#10B981',
    icon: Globe,
    link: 'https://gis-smart-evacuation-system.vercel.app/',
    github: 'https://github.com/Joshuamathewj2',
    details: [
      'Client-side nearest-neighbor search for backend-independent operation',
      'Dynamic route rendering via Leaflet.js with live tracking',
      'Low-latency tile loading strategies for unreliable networks',
      'Structured GeoJSON optimization for massive spatial datasets',
    ],
  },
  {
    id: 'valora',
    title: 'Valora',
    description: 'Interactive system node for spatial information management and collaborative engineering workflows.',
    tags: ['React', 'Framer Motion', 'Tailwind'],
    category: 'SYSTEM INTERFACE',
    visual: 'interface',
    accent: '#EC4899',
    icon: Cpu,
    link: 'https://vercel.com/joshuas-projects-71456ba4/valora',
    github: 'https://github.com/Joshuamathewj2',
    linkedin: 'https://www.linkedin.com/in/joshua-learns',
    details: [
      'High-fidelity motion system for spatial context awareness',
      'Modular dashboard architecture for real-time status monitoring',
      'Optimized asset pipeline for seamless interactive experience',
      'Integrated system-level controls for node management',
    ],
  },
  {
    id: 'musicmaster',
    title: 'Music Master',
    description: 'Interactive music theory and scale-learning platform designed to simplify complex musical concepts through structured visual learning systems and intuitive interface design.',
    tags: ['React', 'JavaScript', 'Web Audio API', 'Interactive UI'],
    category: 'MUSIC THEORY',
    visual: 'audio',
    accent: '#A855F7',
    icon: Activity,
    link: 'https://music-master-josh.vercel.app/',
    github: 'https://github.com/Joshuamathewj2',
    details: [
      'Designed an interactive learning workflow for scales, notes, and advanced music theory',
      'Built modular frontend systems for dynamic note visualization',
      'Developed responsive UI architecture optimized for interactive educational experiences',
      'Focused on intuitive user interaction and visual clarity for complex theoretical concepts',
    ],
  },
  {
    id: 'pillpulse',
    title: 'PillPulse',
    description: 'Medication adherence automation. Prescription OCR extraction coupled with asynchronous caregiver notification pipelines via Firebase.',
    tags: ['React', 'Flask', 'OCR', 'n8n'],
    category: 'HEALTHCARE AI',
    visual: 'medical',
    accent: '#F59E0B',
    icon: Activity,
    link: 'https://pill-pulse-172010-rhl4.vercel.app/',
    github: 'https://github.com/Joshuamathewj2',
    details: [
      'End-to-end workflow: OCR parsing to automated scheduling',
      'n8n orchestration with Firebase Cloud Messaging notifications',
      'Asynchronous delivery pipelines for high-reliability updates',
      'Top 10 Finalist — CTRL+ALT+HACK 2.0 (30+ Technical Events)',
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
export default function Systems() {
  const [active, setActive] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragX = useMotionValue(0);
  
  // Interactive Cursor Parallax State
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width - 0.5);
    mouseY.set((clientY - top) / height - 0.5);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const total = projects.length;

  const goTo = useCallback((index: number) => {
    setActive(((index % total) + total) % total);
  }, [total]);

  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  // Mouse wheel horizontal navigation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        if (e.deltaX > 30) next();
        else if (e.deltaX < -30) prev();
      } else {
        if (Math.abs(e.deltaY) > 40) {
          e.preventDefault();
          if (e.deltaY > 0) next();
          else prev();
        }
      }
    };
    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, [active]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    setIsDragging(false);
    if (info.offset.x < -60) next();
    else if (info.offset.x > 60) prev();
    animate(dragX, 0, { type: 'spring', stiffness: 400, damping: 40 });
  };

  const getCardProps = (i: number) => {
    let offset = i - active;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    const absOffset = Math.abs(offset);
    const visible = absOffset <= 2;
    const isActive = offset === 0;
    const scale = isActive ? 1 : absOffset === 1 ? 0.8 : 0.65;
    const x = offset * 340;
    const zIndex = isActive ? 30 : absOffset === 1 ? 20 : 10;
    const opacity = isActive ? 1 : absOffset === 1 ? 0.5 : 0.2;
    const blur = isActive ? 0 : absOffset === 1 ? 1 : 3;
    const rotateY = offset * -8;
    return { visible, isActive, scale, x, zIndex, opacity, blur, rotateY };
  };

  const proj = projects[active];

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
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="text-6xl md:text-7xl font-syne font-bold tracking-tighter">Projects</h2>
            <div className="font-mono text-[10px] text-[#71717A] tracking-widest uppercase">
              {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Ambient background reactive to active project */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ background: `radial-gradient(ellipse 60% 50% at 50% 60%, ${proj.accent}08 0%, transparent 70%)` }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* ── Carousel Stage ── */}
      <div
        ref={containerRef}
        className="relative flex items-center justify-center"
        style={{ height: 520, perspective: 1200 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
        }}
      >
        {projects.map((project, i) => {
          const { visible, isActive, scale, x, zIndex, opacity, blur, rotateY } = getCardProps(i);
          if (!visible) return null;

          // Local tilt for the active card based on mouse
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const cardRotateX = useTransform(mouseY, [-0.5, 0.5], isActive && !isDragging ? [8, -8] : [0, 0]);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const cardRotateY = useTransform(mouseX, [-0.5, 0.5], isActive && !isDragging ? [-8, 8] : [0, 0]);

          return (
            <motion.div
              key={project.id}
              className="absolute cursor-grab active:cursor-grabbing"
              style={{ width: 520, zIndex }}
              animate={{
                x,
                scale,
                opacity,
                filter: `blur(${blur}px)`,
                rotateY: isActive ? 0 : rotateY,
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              drag={isActive ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={onDragEnd}
              onClick={() => { if (!isDragging && !isActive) goTo(i); }}
              whileHover={isActive ? {} : { opacity: opacity + 0.15 }}
            >
              {/* Inner container to hold mouse tilt independently from drag rotation */}
              <motion.div
                className="relative rounded-xl overflow-hidden border transition-colors duration-700 w-full h-full"
                style={{
                  rotateX: cardRotateX,
                  rotateY: isActive && !isDragging ? cardRotateY : 0,
                  transformStyle: 'preserve-3d',
                  background: '#0A0A0E',
                  borderColor: isActive ? `${project.accent}50` : '#27272A30',
                  boxShadow: isActive
                    ? `0 0 60px ${project.accent}20, 0 0 120px ${project.accent}08, inset 0 1px 0 ${project.accent}20`
                    : 'none',
                  height: isActive ? 460 : 400,
                }}
              >
                {/* Project-specific motion graphic */}
                <ProjectVisual visual={project.visual} accent={project.accent} isActive={isActive} />

                {/* Cursor-reactive spotlight */}
                {isActive && (
                  <motion.div 
                    className="absolute inset-0 pointer-events-none z-30"
                    style={{
                      background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]: number[]) => `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, ${project.accent}15 0%, transparent 60%)`
                      )
                    }}
                  />
                )}

                {/* Scan line on active */}
                {isActive && (
                  <motion.div
                    className="absolute left-0 right-0 h-px z-10 pointer-events-none"
                    style={{ background: `linear-gradient(to right, transparent, ${project.accent}60, transparent)` }}
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                  />
                )}

                {/* Cinematic border top */}
                {isActive && (
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-px z-20"
                    style={{ background: `linear-gradient(to right, transparent, ${project.accent}, transparent)` }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Top row */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="p-2.5 rounded-lg border"
                        style={{ borderColor: `${project.accent}30`, background: `${project.accent}10` }}
                        animate={isActive ? { boxShadow: [`0 0 0px ${project.accent}00`, `0 0 16px ${project.accent}40`, `0 0 0px ${project.accent}00`] } : {}}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      >
                        <project.icon className="w-5 h-5" style={{ color: project.accent }} />
                      </motion.div>
                      <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: project.accent }}>
                        {project.category}
                      </span>
                    </div>

                    {/* Action links */}
                    <div className="flex gap-1">
                      {project.linkedin && (
                        <a href={project.linkedin} target="_blank" rel="noopener noreferrer"
                          className="p-2 rounded text-[#71717A] transition-all duration-200 hover:text-white group/l relative"
                          style={{ ['--hover-color' as string]: project.accent }}
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-[#1A1A22] text-[#A1A1AA] text-[8px] font-mono rounded border border-[#27272A] opacity-0 group-hover/l:opacity-100 transition-opacity whitespace-nowrap">LINKEDIN</div>
                        </a>
                      )}
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="p-2 rounded text-[#71717A] hover:text-white transition-colors group/g relative">
                        <Github className="w-3.5 h-3.5" />
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-[#1A1A22] text-[#A1A1AA] text-[8px] font-mono rounded border border-[#27272A] opacity-0 group-hover/g:opacity-100 transition-opacity whitespace-nowrap">SOURCE</div>
                      </a>
                      <a href={project.link} target="_blank" rel="noopener noreferrer"
                        className="p-2 rounded text-[#71717A] hover:text-white transition-colors group/e relative">
                        <ExternalLink className="w-3.5 h-3.5" />
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-[#1A1A22] text-[#A1A1AA] text-[8px] font-mono rounded border border-[#27272A] opacity-0 group-hover/e:opacity-100 transition-opacity whitespace-nowrap">LIVE</div>
                      </a>
                    </div>
                  </div>

                  {/* Title & description */}
                  <div className="flex-grow space-y-3 mb-6">
                    <h3 className="text-3xl font-syne font-bold text-white leading-tight">{project.title}</h3>
                    <p className="text-[#A1A1AA] text-sm leading-relaxed font-inter">{project.description}</p>
                  </div>

                  {/* Architecture details — visible on active only */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ delay: 0.15 }}
                      className="space-y-2 mb-6"
                    >
                      <div className="font-mono text-[9px] text-[#71717A] uppercase tracking-widest border-b border-[#27272A]/60 pb-2 mb-3">
                        System Architecture
                      </div>
                      {project.details.map((d, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.06 }}
                          className="flex items-start gap-2 text-[11px] text-[#A1A1AA] font-mono"
                        >
                          <div className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.accent }} />
                          {d}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag}
                        className="text-[9px] font-mono px-2 py-0.5 rounded border"
                        style={{ borderColor: `${project.accent}25`, color: '#71717A', background: `${project.accent}08` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Navigation Controls ── */}
      <div className="flex items-center justify-center gap-8 mt-10">
        <motion.button
          onClick={prev}
          className="flex items-center gap-2 px-5 py-2.5 border border-[#27272A] text-[#71717A] hover:text-white hover:border-[#4F46E5]/50 transition-all duration-300 rounded font-mono text-[10px] uppercase tracking-widest"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Prev
        </motion.button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {projects.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              animate={{
                width: i === active ? 24 : 6,
                height: 6,
                background: i === active ? proj.accent : '#27272A',
                opacity: i === active ? 1 : 0.5,
              }}
            />
          ))}
        </div>

        <motion.button
          onClick={next}
          className="flex items-center gap-2 px-5 py-2.5 border border-[#27272A] text-[#71717A] hover:text-white hover:border-[#4F46E5]/50 transition-all duration-300 rounded font-mono text-[10px] uppercase tracking-widest"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          Next
          <ChevronRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>

      {/* Drag hint */}
      <motion.div
        className="flex justify-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="font-mono text-[9px] text-[#71717A]/50 tracking-[0.3em] uppercase">
          Drag · Scroll · Arrow Keys
        </span>
      </motion.div>
    </section>
  );
}
