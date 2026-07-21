"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Terminal, Cpu, Shield, Brain, CheckCircle2 } from "lucide-react";
import { cn } from "../../lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface RoleSlide {
  title: string;
  description: string;
  glowColor: string;
  shadowColor: string;
  borderColor: string;
}

export interface CoolSlideGalleryProps {
  /** Array of slides to display */
  slides: RoleSlide[];
  /** Card width in pixels */
  cardWidth?: number;
  /** Card height in pixels */
  cardHeight?: number;
  /** Border radius scale 0–20 (maps to pixel radius relative to card size) */
  radius?: number;
  /** Y-rotation angle (degrees) applied to side cards */
  tilt?: number;
  /** Z-rotation (degrees) applied to side cards for slight lean */
  sideTilt?: number;
  /** Horizontal gap multiplier between cards */
  gap?: number;
  /** Dim intensity (0–100) applied to non-active cards */
  dimOpacity?: number;
  /** Whether to enable autoplay */
  autoplay?: boolean;
  /** Direction of autoplay progression */
  autoplayDirection?: "left-to-right" | "right-to-left";
  /** Delay in seconds between autoplay slides */
  autoplayDelay?: number;
  /** Animation duration in seconds for slide transitions */
  animationDuration?: number;
  /** Easing preset for the slide animation */
  easing?: "smooth" | "spring" | "bouncy" | "snappy";
  /** Whether click on side cards navigates to them */
  clickable?: boolean;
  /** Whether drag/swipe is enabled */
  draggable?: boolean;
  /** Minimum drag distance in px to trigger a slide change */
  dragThreshold?: number;
  /** Whether keyboard navigation is enabled */
  keyboardNavigation?: boolean;
  /** Number of side cards visible on each side */
  maxVisible?: number;
  /** Depth (z-translate in px) applied per offset position */
  depth?: number;
  /** Scale reduction per offset step from center */
  scaleStep?: number;
  /** Perspective value for the 3D scene */
  perspective?: number;
  /** Additional CSS classes on the root wrapper */
  className?: string;
  /** Controlled active index */
  activeIndex: number;
  /** Callback fired when the active index changes */
  onActiveIndexChange: (index: number) => void;
}

const EASING_MAP: Record<string, [number, number, number, number]> = {
  smooth: [0.22, 1, 0.36, 1],
  spring: [0.34, 1.56, 0.64, 1],
  bouncy: [0.5, 1.7, 0.5, 1],
  snappy: [0.16, 1, 0.3, 1],
};

const TypewriterTitle: React.FC<{
  text: string;
  isActive: boolean;
  glowColor: string;
}> = ({ text, isActive, glowColor }) => {
  const [displayedText, setDisplayedText] = useState(isActive ? "" : text);

  useEffect(() => {
    if (!isActive) {
      setDisplayedText(text);
      return;
    }

    let currentIndex = 0;
    setDisplayedText("");

    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 45);

    return () => clearInterval(intervalId);
  }, [text, isActive]);

  return (
    <h4 
      className="text-[14px] sm:text-base font-syne font-bold tracking-tight flex items-center gap-1.5 whitespace-nowrap overflow-hidden text-white"
    >
      <span 
        className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0" 
        style={{ backgroundColor: glowColor, boxShadow: `0 0 10px ${glowColor}` }} 
      />
      <span>{displayedText}</span>
      {isActive && (
        <span 
          className="animate-[pulse_1s_infinite] font-mono font-extrabold" 
          style={{ color: glowColor }}
        >
          _
        </span>
      )}
    </h4>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CoolSlideGallery Component (Inline implementation adapted for Role Cards)
// ─────────────────────────────────────────────────────────────────────────────

const CoolSlideGallery: React.FC<CoolSlideGalleryProps> = ({
  slides,
  cardWidth = 280,
  cardHeight = 320,
  radius = 5,
  tilt = 14,
  sideTilt = 6,
  gap = 8,
  dimOpacity = 55,
  autoplay = false,
  autoplayDirection = "right-to-left",
  autoplayDelay = 2.8,
  animationDuration = 0.6,
  easing = "smooth",
  clickable = true,
  draggable = true,
  dragThreshold = 45,
  keyboardNavigation = true,
  maxVisible = 2,
  depth = 230,
  scaleStep = 0.15,
  perspective = 1500,
  className,
  activeIndex: active,
  onActiveIndexChange: setActive,
}) => {
  const n = slides.length;
  const lockRef = useRef(false);
  const dragStartX = useRef(0);
  const isDragging = useRef(false);

  // ── Locking ──────────────────────────────────────────────────────────────
  const lock = useCallback(() => {
    lockRef.current = true;
    window.setTimeout(() => {
      lockRef.current = false;
    }, Math.max(50, animationDuration * 1000));
  }, [animationDuration]);

  // ── Step ─────────────────────────────────────────────────────────────────
  const step = useCallback(
    (dir: 1 | -1) => {
      if (lockRef.current) return;
      lock();
      setActive((((active + dir) % n) + n) % n);
    },
    [n, lock, active, setActive]
  );

  const goTo = useCallback(
    (i: number) => {
      if (lockRef.current || i === active) return;
      lock();
      setActive(i);
    },
    [active, lock, setActive]
  );

  // ── Keyboard ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!keyboardNavigation) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); step(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, keyboardNavigation]);

  // ── Autoplay ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!autoplay || n < 2) return;
    const ms = Math.max(300, autoplayDelay * 1000);
    const dir: 1 | -1 = autoplayDirection === "left-to-right" ? -1 : 1;
    const id = window.setInterval(() => step(dir), ms);
    return () => window.clearInterval(id);
  }, [autoplay, autoplayDirection, autoplayDelay, n, step]);

  // ── Pointer drag ─────────────────────────────────────────────────────────
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!draggable || lockRef.current) return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > dragThreshold) {
      step(delta > 0 ? -1 : 1);
    }
  };

  // ── Touch ─────────────────────────────────────────────────────────────────
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > dragThreshold) step(delta > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  // ── Animation bezier ─────────────────────────────────────────────────────
  const [x1, y1, x2, y2] = EASING_MAP[easing];
  const transition = {
    type: "tween" as const,
    duration: animationDuration,
    ease: [x1, y1, x2, y2] as [number, number, number, number],
  };

  // ── Derived values ────────────────────────────────────────────────────────
  const effectiveRadius =
    (Math.max(0, Math.min(20, radius)) / 20) * (Math.min(cardWidth, cardHeight) / 2);
  const dimValue = 1 - Math.max(0, Math.min(100, dimOpacity)) / 100;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center w-full select-none overflow-hidden",
        className
      )}
      style={{
        height: cardHeight + 40,
        perspective: `${perspective}px`,
        touchAction: "none",
        cursor: draggable ? "grab" : "default",
      }}
      tabIndex={keyboardNavigation ? 0 : undefined}
      role="region"
      aria-roledescription="carousel"
      aria-label="Roles Matrix Gallery"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── 3D Stage ───────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          width: cardWidth,
          height: cardHeight,
          transformStyle: "preserve-3d",
          pointerEvents: "none",
        }}
      >
        {slides.map((slide, i) => {
          let rel = i - active;
          // Wrap for infinite loop
          if (rel > n / 2) rel -= n;
          if (rel < -n / 2) rel += n;

          const ax = Math.abs(rel);
          const visible = ax <= maxVisible;
          const isActive = rel === 0;
          const sc = Math.max(0.3, 1 - ax * scaleStep);
          const tx = rel * (gap * 30);
          const tz = -ax * depth;
          const ry = -rel * tilt;
          const rz = rel * sideTilt;

          return (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: cardWidth,
                height: cardHeight,
                borderRadius: effectiveRadius,
                transformStyle: "preserve-3d",
                transformOrigin: "center center",
                pointerEvents: visible && !autoplay ? "auto" : "none",
                willChange: "transform, opacity",
                cursor: clickable && visible && !isActive ? "pointer" : "default",
              }}
              animate={{
                x: `calc(-50% + ${tx}px)`,
                y: "-50%",
                translateZ: tz,
                rotateY: ry,
                rotateZ: rz,
                scale: sc,
                opacity: visible ? 1 : 0,
              }}
              transition={transition}
              onClick={() => {
                if (clickable && !isDragging.current && !isActive && visible) {
                  goTo(i);
                }
              }}
              aria-label={slide.title}
              aria-hidden={!visible}
            >
              {/* Compact Rectangular Snug Card Styling (Title Only) */}
              <div 
                className="absolute inset-0 bg-black/95 rounded-xl flex items-center p-3 select-none border border-purple-500/50 backdrop-blur-xl shadow-[0_0_35px_rgba(168,85,247,0.35)] justify-center"
              >
                {/* Tech Scanlines / Grid Decor */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%]" />
                
                {/* Role Title with Typewriter Effect */}
                <TypewriterTitle text={slide.title} isActive={isActive} glowColor={slide.glowColor} />
              </div>

              {/* Dim overlay on non-active cards */}
              <motion.div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#000000",
                  pointerEvents: "none",
                  borderRadius: effectiveRadius,
                }}
                animate={{ opacity: isActive ? 0 : dimValue }}
                transition={transition}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Capabilities Component (Main)
// ─────────────────────────────────────────────────────────────────────────────

export default function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0);

  // 6 Custom slides configured according to streamlined specifications
  const slides: RoleSlide[] = [
    {
      title: "AI Systems Architect",
      description: "Engineering RAG engines and local LLMs with 98% classification accuracy.",
      glowColor: "#A855F7", // Purple
      shadowColor: "rgba(168, 85, 247, 0.25)",
      borderColor: "rgba(168, 85, 247, 0.5)",
    },
    {
      title: "Computer Vision Engineer",
      description: "Developing spatial tracking and gesture interfaces rendering keypoints at 30 FPS.",
      glowColor: "#C084FC", // Violet
      shadowColor: "rgba(192, 132, 252, 0.25)",
      borderColor: "rgba(192, 132, 252, 0.5)",
    },
    {
      title: "Full-Stack Systems Engineer",
      description: "Building scalable web applications and UI systems with 55+ production components.",
      glowColor: "#A855F7", // Purple
      shadowColor: "rgba(168, 85, 247, 0.25)",
      borderColor: "rgba(168, 85, 247, 0.5)",
    },
    {
      title: "Agentic Workflow Engineer",
      description: "Designing autonomous agentic systems with sub-10s critical caregiver escalation loops.",
      glowColor: "#D8B4FE", // Light Purple
      shadowColor: "rgba(216, 180, 254, 0.25)",
      borderColor: "rgba(216, 180, 254, 0.5)",
    },
    {
      title: "Web3 & Blockchain Developer",
      description: "Deploying immutable decentralized supply ledgers and Solidity smart contracts.",
      glowColor: "#8B5CF6", // Violet
      shadowColor: "rgba(139, 92, 246, 0.25)",
      borderColor: "rgba(139, 92, 246, 0.5)",
    },
    {
      title: "Cybersecurity & Forensics Specialist",
      description: "Securing applications with EXIF audits, FFT signal analyses, and GAN profiling.",
      glowColor: "#A855F7", // Purple
      shadowColor: "rgba(168, 85, 247, 0.25)",
      borderColor: "rgba(168, 85, 247, 0.5)",
    },
  ];

  // Map 4 left console telemetry roles to active index states
  const rolesChecklist = [
    {
      id: "ROLE 01",
      name: "AI Systems & Agentic Pipelines",
      targetIndex: 0, // AI Systems Architect
      altIndex: 3, // Agentic Workflow Engineer
      icon: Brain,
    },
    {
      id: "ROLE 02",
      name: "Real-Time Computer Vision & Graphics",
      targetIndex: 1, // Computer Vision Engineer
      altIndex: 1,
      icon: Cpu,
    },
    {
      id: "ROLE 03",
      name: "Enterprise Full-Stack & Systems Architecture",
      targetIndex: 2, // Full-Stack Systems Engineer
      altIndex: 2,
      icon: Terminal,
    },
    {
      id: "ROLE 04",
      name: "Smart Contracts & Forensic Security",
      targetIndex: 4, // Web3 & Blockchain Developer
      altIndex: 5, // Cybersecurity & Forensics Specialist
      icon: Shield,
    },
  ];

  const handleRoleClick = (role: typeof rolesChecklist[0]) => {
    // If activeIndex matches targetIndex, toggle to altIndex, otherwise switch to targetIndex
    if (activeIndex === role.targetIndex) {
      setActiveIndex(role.altIndex);
    } else {
      setActiveIndex(role.targetIndex);
    }
  };

  // Determine if a checklist item matches current carousel state
  const isRoleActive = (role: typeof rolesChecklist[0]) => {
    return activeIndex === role.targetIndex || activeIndex === role.altIndex;
  };

  return (
    <section id="capabilities" className="relative w-full py-16 px-6 lg:px-12 bg-[#090a10] border-t border-zinc-900 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0 diagonal-stripes bg-white" />
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* ── LEFT COLUMN: DARK TERMINAL CONSOLE ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-black/85 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(168,85,247,0.15)] flex flex-col gap-6"
        >
          {/* Decorative Terminal Dots */}
          <div className="flex items-center gap-1.5 border-b border-zinc-800/60 pb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/35" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/35" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/35" />
            <span className="text-[10px] font-mono text-zinc-500 ml-4 tracking-widest uppercase">// CAPABILITY_MATRIX_INITIALIZED</span>
          </div>

          <div className="space-y-4">
            {/* Monospace Cyan/Purple Accent */}
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#38BDF8] uppercase block">
              // CAPABILITY MATRIX // MULTI-DISCIPLINARY ARCHITECTURE
            </span>
            
            {/* Main Section Title */}
            <h2 className="text-4xl md:text-5xl font-syne font-black text-white leading-[1.1] tracking-tight uppercase">
              Engineering Roles & Systems Specialization
            </h2>

            {/* Description */}
            <p className="text-[#A1A1AA] text-sm font-inter leading-relaxed max-w-xl">
              Bridging complex full-stack architectures with deep learning inference, real-time spatial computer vision, and autonomous agent workflows. Each node projected in the interactive matrix represents a core execution role deployed across my 10 production-grade applications.
            </p>
          </div>

          {/* Interactive Telemetry Checklist Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {rolesChecklist.map((role) => {
              const active = isRoleActive(role);
              const RoleIcon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => handleRoleClick(role)}
                  className={cn(
                    "flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-300 group",
                    active 
                      ? "bg-purple-950/20 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.1)]" 
                      : "bg-[#0A0A0F] border-zinc-800/80 hover:border-purple-500/30 hover:bg-zinc-900/30"
                  )}
                >
                  <div 
                    className={cn(
                      "p-2 rounded-lg border transition-colors shrink-0",
                      active 
                        ? "bg-purple-500/10 border-purple-500/40 text-purple-400" 
                        : "bg-zinc-900 border-zinc-800 text-zinc-500 group-hover:text-zinc-300"
                    )}
                  >
                    <RoleIcon className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <span 
                      className={cn(
                        "text-[9px] font-mono font-bold tracking-widest uppercase block",
                        active ? "text-purple-400" : "text-zinc-500"
                      )}
                    >
                      {role.id}
                    </span>
                    <span 
                      className={cn(
                        "text-xs font-inter font-bold leading-tight block",
                        active ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                      )}
                    >
                      {role.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Prompt Symbol Info Bar */}
          <div className="flex items-center gap-2 mt-2 bg-zinc-950/60 p-3 rounded-lg border border-zinc-900 font-mono text-[9px] text-zinc-500">
            <span className="text-[#38BDF8] animate-pulse">&gt;_</span>
            <span>CLICK_ROLE_NODE_TO_TRIGGER_HOLOGRAM_TELEMETRY_DATAFEED</span>
          </div>
        </motion.div>

        {/* ── RIGHT COLUMN: HOLOGRAM IMAGE & CAROUSEL OVERLAY ──────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full max-w-[550px] lg:max-w-[620px] mx-auto flex justify-center items-center relative"
        >
          {/* Hologram Image Asset */}
          <div className="relative w-full aspect-square flex items-center justify-center rounded-full overflow-hidden bg-gradient-radial from-purple-500/5 via-transparent to-transparent">
            <img 
              src="/hologram.png" 
              alt="Holographic Projection Interface" 
              className="w-full h-auto object-contain select-none pointer-events-none filter drop-shadow-[0_0_30px_rgba(168,85,247,0.25)]" 
            />
          </div>

          {/* Absolute Positioning Anchor (Carousel Frame) */}
          <div className="absolute top-[38%] left-[12%] sm:left-[15%] w-[250px] sm:w-[270px] z-20 pointer-events-auto flex flex-col items-center">
            
            {/* Floating Carousel Box Wrapper */}
            <div className="w-full bg-black/95 border border-purple-500/50 rounded-xl shadow-[0_0_35px_rgba(168,85,247,0.35)] overflow-hidden backdrop-blur-xl">
              <CoolSlideGallery
                slides={slides}
                cardWidth={250}
                cardHeight={70}
                radius={8}
                tilt={12}
                sideTilt={4}
                gap={3}
                dimOpacity={65}
                showArrows={false}
                showDots={true}
                showCounter={false}
                showBadge={false}
                clickable={true}
                draggable={true}
                maxVisible={1}
                depth={120}
                scaleStep={0.18}
                activeIndex={activeIndex}
                onActiveIndexChange={setActiveIndex}
              />
            </div>

            {/* Glowing purple vertical tether line centered under the card */}
            <div className="w-[2px] h-12 bg-gradient-to-t from-purple-500/80 to-transparent animate-pulse mx-auto mt-3" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
