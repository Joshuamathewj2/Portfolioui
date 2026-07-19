import { motion } from 'motion/react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Server, Layout, Brain, Cpu, Database, Terminal, Shield, Award } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   Data Configuration: 7 Multi-Tier Neural Nodes
───────────────────────────────────────────────────────────────────────────── */
const nodesData = [
  {
    title: 'Core Languages & Logic Systems',
    icon: Terminal,
    tags: ['TypeScript', 'JavaScript', 'Python', 'Java', 'PHP'],
    metrics: '37 Repositories Indexed // Type-Safe Workspaces',
    subNode: null
  },
  {
    title: 'Advanced Frontend Architectures',
    icon: Layout,
    tags: ['React 19', 'Next.js 16', 'Vite', 'Tailwind CSS', 'React Router', 'React Query'],
    metrics: 'Modern Component Architectures',
    subNode: {
      title: 'Framework Sub-Node',
      tags: ['Radix UI', 'Material-UI (MUI)', 'Emotion', 'Class Variance Authority']
    }
  },
  {
    title: 'Server-Side Architectures & APIs',
    icon: Server,
    tags: ['FastAPI', 'Express.js', 'Node.js', 'Uvicorn'],
    metrics: 'High-Throughput Services',
    subNode: {
      title: 'Pipeline Sub-Node',
      tags: ['Pydantic', 'SQLAlchemy', 'Drizzle ORM', 'Axios']
    }
  },
  {
    title: 'Intelligent Processing & Agentic AI',
    icon: Brain,
    tags: ['Google Gemini API', 'LangGraph', 'LangChain'],
    metrics: 'Cognitive Computing Loops',
    subNode: {
      title: 'Vision/Graphics Sub-Node',
      tags: ['OpenCV', 'MediaPipe', 'OpenGL', 'Pygame']
    }
  },
  {
    title: 'Cloud Data & Distributed Infrastructure',
    icon: Database,
    tags: ['PostgreSQL', 'MySQL', 'Redis', 'Supabase', 'Firebase'],
    metrics: 'State Management & Storage',
    subNode: {
      title: 'Geospatial Sub-Node',
      tags: ['Leaflet.js', 'GeoAlchemy2', 'GeoJSON', 'Spatial Asset Tracking']
    }
  },
  {
    title: 'Cross-Platform & Hardware Systems',
    icon: Cpu,
    tags: ['React Native', 'Expo', 'Capacitor (Camera/Geolocation Native Bridges)'],
    metrics: 'Native & Hardware Integrations',
    subNode: {
      title: 'Hardware Systems',
      tags: ['Data Center Operations', 'Network Redundancy Architectures']
    }
  },
  {
    title: 'Decentralized & Production Tooling',
    icon: Shield,
    tags: ['Ethers.js', 'Web3.js', 'Hardhat', 'Solidity'],
    metrics: 'Decentralized Smart Contracts',
    subNode: {
      title: 'Workflow Systems',
      tags: ['Monorepos (Turbo)', 'Pnpm', 'Docker', 'Git/GitHub', 'Vitest', 'Vercel Production']
    }
  }
];

/* ─────────────────────────────────────────────────────────────────────────────
   Main Stack Page Component
───────────────────────────────────────────────────────────────────────────── */
export default function Stack() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imgRef     = useRef<HTMLDivElement | null>(null);
  const mainRefs   = useRef<(HTMLDivElement | null)[]>(Array(7).fill(null));
  const subRefs    = useRef<(HTMLDivElement | null)[]>(Array(7).fill(null));

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [hoveredSubIdx, setHoveredSubIdx] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const [points, setPoints] = useState<{
    srcs: { x: number; y: number }[];
    mainDsts: { x: number; y: number }[];
    subDsts: { x: number; y: number }[];
    subSrcs: { x: number; y: number }[];
  } | null>(null);

  // Recalculate omni-directional connection coordinates
  const updatePoints = useCallback(() => {
    const sEl = sectionRef.current;
    const imgEl = imgRef.current;
    if (!sEl || !imgEl) return;

    const sRect = sEl.getBoundingClientRect();
    const imgRect = imgEl.getBoundingClientRect();

    // Set SVG boundary size explicitly to section dimensions to prevent clipping
    setSvgSize({
      width: sRect.width,
      height: sRect.height
    });

    const srcs: { x: number; y: number }[] = [];
    const mainDsts: { x: number; y: number }[] = [];
    const subDsts: { x: number; y: number }[] = [];
    const subSrcs: { x: number; y: number }[] = [];

    // Coordinates of central image edges relative to section origin
    const pLeft = imgRect.left - sRect.left;
    const pRight = imgRect.right - sRect.left;
    const pTop = imgRect.top - sRect.top;
    const pBottom = imgRect.bottom - sRect.top;
    const pWidth = imgRect.width;
    const pHeight = imgRect.height;

    for (let i = 0; i < nodesData.length; i++) {
      let srcX = pLeft + pWidth * 0.5;
      let srcY = pTop + pHeight * 0.5;
      let dstX = 0;
      let dstY = 0;

      // Distribution side logic
      const isLeftColumn = i === 0 || i === 2 || i === 5; // Node 1, 3, 6
      const isRightColumn = i === 1 || i === 3 || i === 4; // Node 2, 4, 5
      const isCenterColumn = i === 6; // Node 7 (Base)

      if (isLeftColumn) {
        // Emit from LEFT edge of the photo
        srcX = pLeft;
        if (i === 0) srcY = pTop + pHeight * 0.25; // Top-Left
        else if (i === 2) srcY = pTop + pHeight * 0.5; // Mid-Left
        else srcY = pTop + pHeight * 0.75; // Bottom-Left
      } else if (isRightColumn) {
        // Emit from RIGHT edge of the photo
        srcX = pRight;
        if (i === 1) srcY = pTop + pHeight * 0.25; // Top-Right
        else if (i === 3) srcY = pTop + pHeight * 0.5; // Mid-Right
        else srcY = pTop + pHeight * 0.75; // Bottom-Right
      } else if (isCenterColumn) {
        // Emit from BOTTOM edge of the photo
        srcX = pLeft + pWidth * 0.5;
        srcY = pBottom;
      }

      srcs.push({ x: srcX, y: srcY });

      const mainEl = mainRefs.current[i];
      if (mainEl) {
        const rect = mainEl.getBoundingClientRect();
        // Connect to closest side edge of the card
        dstX = isLeftColumn ? rect.right - sRect.left : isRightColumn ? rect.left - sRect.left : rect.left - sRect.left + rect.width * 0.5;
        dstY = isLeftColumn || isRightColumn ? rect.top - sRect.top + rect.height * 0.5 : rect.top - sRect.top;
        mainDsts.push({ x: dstX, y: dstY });
      } else {
        mainDsts.push({ x: 0, y: 0 });
      }

      const subEl = subRefs.current[i];
      if (subEl && mainEl) {
        const rect = subEl.getBoundingClientRect();
        const mainRect = mainEl.getBoundingClientRect();
        
        // Connect vertically inside row columns
        subDsts.push({
          x: rect.left - sRect.left + rect.width * 0.5,
          y: rect.top - sRect.top
        });
        subSrcs.push({
          x: mainRect.left - sRect.left + mainRect.width * 0.5,
          y: mainRect.bottom - sRect.top
        });
      } else {
        subDsts.push({ x: 0, y: 0 });
        subSrcs.push({ x: 0, y: 0 });
      }
    }

    setPoints({
      srcs,
      mainDsts,
      subDsts,
      subSrcs
    });
  }, []);

  useEffect(() => {
    updatePoints();

    // Use ResizeObserver to detect layout reflow changes immediately
    const observer = new ResizeObserver(() => {
      updatePoints();
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener('resize', updatePoints);
    window.addEventListener('scroll', updatePoints);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updatePoints);
      window.removeEventListener('scroll', updatePoints);
    };
  }, [updatePoints]);

  return (
    <section ref={sectionRef} id="stack" className="relative py-24 px-4 sm:px-6 overflow-hidden bg-[#050505]">
      
      {/* ── Dash Offset Keyframe Animation ── */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -40;
          }
        }
      `}</style>

      {/* ── Ambient background glows ───────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#4F46E5]/5 blur-[130px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-700/4 blur-[110px]" />
      </div>

      {/* ── Dynamic SVG Knowledge Nerves ── */}
      {points && (
        <svg
          width={svgSize.width}
          height={svgSize.height}
          viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
          className="absolute inset-0 pointer-events-none z-10 hidden lg:block"
          style={{ mixBlendMode: 'screen', overflow: 'visible' }}
        >
          <defs>
            <filter id="svg-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Primary Paths: Photo -> Main Cards */}
          {points.mainDsts.map((dst, i) => {
            if (dst.x === 0 && dst.y === 0) return null;
            const src = points.srcs[i];
            if (!src) return null;

            const dx = Math.abs(dst.x - src.x);
            const dy = Math.abs(dst.y - src.y);
            
            const isLeftColumn = i === 0 || i === 2 || i === 5;
            const isRightColumn = i === 1 || i === 3 || i === 4;
            
            let cp1x = src.x;
            let cp1y = src.y;
            let cp2x = dst.x;
            let cp2y = dst.y;

            if (isLeftColumn) {
              cp1x = src.x - dx * 0.45;
              cp2x = dst.x + dx * 0.45;
            } else if (isRightColumn) {
              cp1x = src.x + dx * 0.45;
              cp2x = dst.x - dx * 0.45;
            } else {
              // Node 7 (Center Down)
              cp1y = src.y + dy * 0.45;
              cp2y = dst.y - dy * 0.45;
            }
            
            const pathD = `M ${src.x} ${src.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${dst.x} ${dst.y}`;

            const isHighlighted = hoveredIdx === i || hoveredSubIdx === i || activeIdx === i;
            const isAnyHighlighted = hoveredIdx !== null || hoveredSubIdx !== null || activeIdx !== null;

            return (
              <g key={`main-${i}`}>
                {/* Background glow line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={isHighlighted ? '#8b5cf6' : '#4F46E5'}
                  strokeWidth={isHighlighted ? 4.5 : 1.5}
                  strokeOpacity={isHighlighted ? 0.85 : isAnyHighlighted ? 0.05 : 0.25}
                  filter="url(#svg-glow)"
                  className="transition-all duration-300"
                />
                {/* Pulsing trace line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={isHighlighted ? '#38BDF8' : '#4F46E5'}
                  strokeWidth={isHighlighted ? 2.2 : 1.1}
                  strokeDasharray="8 16"
                  strokeOpacity={isHighlighted ? 1.0 : isAnyHighlighted ? 0.1 : 0.55}
                  style={{
                    animation: 'dash 2.5s linear infinite',
                    animationDuration: isHighlighted ? '1s' : '2.5s',
                    transition: 'stroke 0.3s, stroke-width 0.3s, opacity 0.3s'
                  }}
                />
                {/* Flowing particle dot */}
                <circle r={isHighlighted ? 4.5 : 3.2} fill={isHighlighted ? '#38BDF8' : '#8b5cf6'}>
                  <animateMotion
                    path={pathD}
                    dur={isHighlighted ? "1.2s" : `${2.2 + (i % 3) * 0.4}s`}
                    repeatCount="indefinite"
                    begin={`${(i * 0.4) % 2}s`}
                  />
                </circle>
              </g>
            );
          })}

          {/* Secondary Paths: Main Cards -> Sub Cards */}
          {points.subSrcs.map((src, i) => {
            const dst = points.subDsts[i];
            if (!dst || !src || (src.x === 0 && src.y === 0) || (dst.x === 0 && dst.y === 0)) return null;
            const dy = Math.abs(dst.y - src.y);
            
            const cp1y = src.y + dy * 0.45;
            const cp2y = dst.y - dy * 0.45;
            const pathD = `M ${src.x} ${src.y} C ${src.x} ${cp1y}, ${dst.x} ${cp2y}, ${dst.x} ${dst.y}`;

            const isHighlighted = hoveredIdx === i || hoveredSubIdx === i || activeIdx === i;
            const isAnyHighlighted = hoveredIdx !== null || hoveredSubIdx !== null || activeIdx !== null;

            return (
              <g key={`sub-${i}`}>
                {/* Sub branch glow line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={isHighlighted ? '#8b5cf6' : '#4F46E5'}
                  strokeWidth={isHighlighted ? 3.5 : 1.2}
                  strokeOpacity={isHighlighted ? 0.8 : isAnyHighlighted ? 0.05 : 0.2}
                  filter="url(#svg-glow)"
                  className="transition-all duration-300"
                />
                {/* Sub branch pulse line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={isHighlighted ? '#38BDF8' : '#4F46E5'}
                  strokeWidth={isHighlighted ? 2.0 : 0.9}
                  strokeDasharray="6 12"
                  strokeOpacity={isHighlighted ? 1.0 : isAnyHighlighted ? 0.1 : 0.5}
                  style={{
                    animation: 'dash 3s linear infinite',
                    animationDuration: isHighlighted ? '1.2s' : '3s',
                    transition: 'stroke 0.3s, stroke-width 0.3s, opacity 0.3s'
                  }}
                />
              </g>
            );
          })}
        </svg>
      )}

      <div className="relative z-20 max-w-7xl mx-auto">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full" />
            <span className="text-[#4F46E5] font-mono text-xs tracking-widest uppercase">
              Subsystem // Control Panel
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-syne font-black tracking-tighter uppercase text-white">
            Engineering Toolkit
          </h2>
        </motion.div>

        {/* ── Multi-Directional Centered Mind-Map Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr_1.1fr] gap-12 lg:gap-10 items-start">

          {/* ── Left Wing Column: Nodes 1, 3, 6 ── */}
          <div className="flex flex-col gap-12">
            
            {/* Node 1: Core Languages & Logic Systems (Top-Left) */}
            <div className="flex flex-col gap-4">
              <div
                ref={(el) => { mainRefs.current[0] = el; }}
                onMouseEnter={() => setHoveredIdx(0)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => setActiveIdx(activeIdx === 0 ? null : 0)}
                className="p-8 bg-[#0A0A0E] border border-[#27272A]/80 rounded-xl hover:bg-[#0D0D14] hover:border-[#4F46E5]/50 transition-all duration-300 cursor-default group transform-gpu backface-hidden"
              >
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#4F46E5]/0 to-[#4F46E5]/0 group-hover:from-[#4F46E5]/8 group-hover:to-purple-900/5 transition-all duration-500 rounded-xl" />
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-[#16161D] rounded border border-[#27272A] group-hover:border-[#4F46E5]/60 group-hover:bg-[#1a1a2e] transition-all duration-300">
                      <Terminal className="w-5 h-5 text-[#4F46E5] group-hover:text-violet-400 transition-colors" />
                    </div>
                    <div className="text-[9px] text-[#4F46E5]/80 font-mono tracking-widest uppercase">NODE_01</div>
                  </div>
                  <h3 className="text-sm font-mono font-bold tracking-tighter uppercase text-white/90 group-hover:text-white transition-colors">{nodesData[0].title}</h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {nodesData[0].tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-[#16161D] text-[#A1A1AA] text-[10px] font-mono border border-[#27272A]/80 rounded-sm group-hover:border-[#4F46E5]/40 group-hover:text-[#C4B5FD] transition-all duration-300 shadow-sm">{tag}</span>
                    ))}
                  </div>
                  <div className="text-[9px] text-[#4F46E5] font-mono tracking-wider uppercase font-bold mt-4 pt-4 border-t border-[#27272A]/40">{nodesData[0].metrics}</div>
                </div>
              </div>
            </div>

            {/* Node 3: Server-Side Architectures & APIs (Mid-Left) */}
            <div className="flex flex-col gap-4">
              <div
                ref={(el) => { mainRefs.current[2] = el; }}
                onMouseEnter={() => setHoveredIdx(2)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => setActiveIdx(activeIdx === 2 ? null : 2)}
                className="p-8 bg-[#0A0A0E] border border-[#27272A]/80 rounded-xl hover:bg-[#0D0D14] hover:border-[#4F46E5]/50 transition-all duration-300 cursor-default group transform-gpu backface-hidden"
              >
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#4F46E5]/0 to-[#4F46E5]/0 group-hover:from-[#4F46E5]/8 group-hover:to-purple-900/5 transition-all duration-500 rounded-xl" />
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-[#16161D] rounded border border-[#27272A] group-hover:border-[#4F46E5]/60 group-hover:bg-[#1a1a2e] transition-all duration-300">
                      <Server className="w-5 h-5 text-[#4F46E5] group-hover:text-violet-400 transition-colors" />
                    </div>
                    <div className="text-[9px] text-[#4F46E5]/80 font-mono tracking-widest uppercase">NODE_03</div>
                  </div>
                  <h3 className="text-sm font-mono font-bold tracking-tighter uppercase text-white/90 group-hover:text-white transition-colors">{nodesData[2].title}</h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {nodesData[2].tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-[#16161D] text-[#A1A1AA] text-[10px] font-mono border border-[#27272A]/80 rounded-sm group-hover:border-[#4F46E5]/40 group-hover:text-[#C4B5FD] transition-all duration-300 shadow-sm">{tag}</span>
                    ))}
                  </div>
                  <div className="text-[9px] text-[#4F46E5] font-mono tracking-wider uppercase font-bold mt-4 pt-4 border-t border-[#27272A]/40">{nodesData[2].metrics}</div>
                </div>
              </div>

              {/* Sub-Node: Pipeline Sub-Node */}
              <div
                ref={(el) => { subRefs.current[2] = el; }}
                onMouseEnter={() => setHoveredSubIdx(2)}
                onMouseLeave={() => setHoveredSubIdx(null)}
                className="p-8 bg-[#07070B] border border-[#27272A]/60 rounded-xl hover:bg-[#0A0A0F] hover:border-[#38BDF8]/40 transition-all duration-300 cursor-default group transform-gpu backface-hidden"
              >
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#38BDF8]/0 to-[#38BDF8]/0 group-hover:from-[#38BDF8]/5 group-hover:to-cyan-900/5 transition-all duration-500 rounded-xl" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-1.5 bg-[#12121A] rounded border border-[#27272A] group-hover:border-[#38BDF8]/50 transition-all duration-300">
                      <Award className="w-4 h-4 text-[#38BDF8]" />
                    </div>
                    <div className="text-[9px] text-[#38BDF8]/70 font-mono tracking-wider">BRANCH_NODE</div>
                  </div>
                  <h4 className="text-xs font-mono font-bold tracking-tighter uppercase text-zinc-300 group-hover:text-white transition-colors">{nodesData[2].subNode?.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {nodesData[2].subNode?.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-[#12121A] text-[#8A8A93] text-[10px] font-mono border border-[#27272A] rounded-sm group-hover:border-[#38BDF8]/30 group-hover:text-[#93C5FD] transition-all duration-300 shadow-sm">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Node 6: Cross-Platform & Hardware Systems (Bottom-Left) */}
            <div className="flex flex-col gap-4">
              <div
                ref={(el) => { mainRefs.current[5] = el; }}
                onMouseEnter={() => setHoveredIdx(5)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => setActiveIdx(activeIdx === 5 ? null : 5)}
                className="p-8 bg-[#0A0A0E] border border-[#27272A]/80 rounded-xl hover:bg-[#0D0D14] hover:border-[#4F46E5]/50 transition-all duration-300 cursor-default group transform-gpu backface-hidden"
              >
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#4F46E5]/0 to-[#4F46E5]/0 group-hover:from-[#4F46E5]/8 group-hover:to-purple-900/5 transition-all duration-500 rounded-xl" />
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-[#16161D] rounded border border-[#27272A] group-hover:border-[#4F46E5]/60 group-hover:bg-[#1a1a2e] transition-all duration-300">
                      <Cpu className="w-5 h-5 text-[#4F46E5] group-hover:text-violet-400 transition-colors" />
                    </div>
                    <div className="text-[9px] text-[#4F46E5]/80 font-mono tracking-widest uppercase">NODE_06</div>
                  </div>
                  <h3 className="text-sm font-mono font-bold tracking-tighter uppercase text-white/90 group-hover:text-white transition-colors">{nodesData[5].title}</h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {nodesData[5].tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-[#16161D] text-[#A1A1AA] text-[10px] font-mono border border-[#27272A]/80 rounded-sm group-hover:border-[#4F46E5]/40 group-hover:text-[#C4B5FD] transition-all duration-300 shadow-sm">{tag}</span>
                    ))}
                  </div>
                  <div className="text-[9px] text-[#4F46E5] font-mono tracking-wider uppercase font-bold mt-4 pt-4 border-t border-[#27272A]/40">{nodesData[5].metrics}</div>
                </div>
              </div>

              {/* Sub-Node: Hardware Systems */}
              <div
                ref={(el) => { subRefs.current[5] = el; }}
                onMouseEnter={() => setHoveredSubIdx(5)}
                onMouseLeave={() => setHoveredSubIdx(null)}
                className="p-8 bg-[#07070B] border border-[#27272A]/60 rounded-xl hover:bg-[#0A0A0F] hover:border-[#38BDF8]/40 transition-all duration-300 cursor-default group transform-gpu backface-hidden"
              >
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#38BDF8]/0 to-[#38BDF8]/0 group-hover:from-[#38BDF8]/5 group-hover:to-cyan-900/5 transition-all duration-500 rounded-xl" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-1.5 bg-[#12121A] rounded border border-[#27272A] group-hover:border-[#38BDF8]/50 transition-all duration-300">
                      <Award className="w-4 h-4 text-[#38BDF8]" />
                    </div>
                    <div className="text-[9px] text-[#38BDF8]/70 font-mono tracking-wider">BRANCH_NODE</div>
                  </div>
                  <h4 className="text-xs font-mono font-bold tracking-tighter uppercase text-zinc-300 group-hover:text-white transition-colors">{nodesData[5].subNode?.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {nodesData[5].subNode?.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-[#12121A] text-[#8A8A93] text-[10px] font-mono border border-[#27272A] rounded-sm group-hover:border-[#38BDF8]/30 group-hover:text-[#93C5FD] transition-all duration-300 shadow-sm">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── Center Column: Central Workstation Node & Base Node 7 ── */}
          <div className="flex flex-col gap-12 items-center justify-center">
            
            {/* Dead-Center Core Workstation Node (Profile Photo) */}
            <motion.div
              ref={imgRef}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[340px] z-20 self-center"
            >
              <div className="relative group">
                <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-[#4F46E5]/60 via-[#38BDF8]/50 to-[#4F46E5]/40 blur-sm opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative rounded-2xl overflow-hidden border border-[#4F46E5]/30 bg-[#0A0A0E]">
                  <img
                    src="/toolkit.png"
                    alt="Joshua at the workstation"
                    className="w-full h-auto object-cover block"
                    draggable={false}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(79,70,229,0.15) 85%, rgba(79,70,229,0.05) 100%)',
                    }}
                  />
                  {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                    <div key={i} className={`absolute ${pos} w-6 h-6`}>
                      <div className={`absolute ${i < 2 ? 'top-0' : 'bottom-0'} ${i % 2 === 0 ? 'left-0' : 'right-0'} w-px h-5 bg-[#4F46E5]/70`} />
                      <div className={`absolute ${i < 2 ? 'top-0' : 'bottom-0'} ${i % 2 === 0 ? 'left-0' : 'right-0'} w-5 h-px bg-[#4F46E5]/70`} />
                    </div>
                  ))}
                </div>
                <div className="mt-3 px-4 py-2.5 bg-[#0A0A0E]/90 border border-[#27272A] rounded-xl flex items-center justify-center gap-3 backdrop-blur-sm shadow-md">
                  <div className="relative flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-[#71717A] uppercase">
                    Central Core: <span className="text-emerald-400">Sync_Active</span>
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Node 7: Decentralized & Production Tooling (Base/Footer Cluster) */}
            <div className="flex flex-col gap-4 w-full">
              <div
                ref={(el) => { mainRefs.current[6] = el; }}
                onMouseEnter={() => setHoveredIdx(6)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => setActiveIdx(activeIdx === 6 ? null : 6)}
                className="p-8 bg-[#0A0A0E] border border-[#27272A]/80 rounded-xl hover:bg-[#0D0D14] hover:border-[#4F46E5]/50 transition-all duration-300 cursor-default group w-full transform-gpu backface-hidden"
              >
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#4F46E5]/0 to-[#4F46E5]/0 group-hover:from-[#4F46E5]/8 group-hover:to-purple-900/5 transition-all duration-500 rounded-xl" />
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-[#16161D] rounded border border-[#27272A] group-hover:border-[#4F46E5]/60 group-hover:bg-[#1a1a2e] transition-all duration-300">
                      <Shield className="w-5 h-5 text-[#4F46E5] group-hover:text-violet-400 transition-colors" />
                    </div>
                    <div className="text-[9px] text-[#4F46E5]/80 font-mono tracking-widest uppercase">NODE_07</div>
                  </div>
                  <h3 className="text-sm font-mono font-bold tracking-tighter uppercase text-white/90 group-hover:text-white transition-colors">{nodesData[6].title}</h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {nodesData[6].tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-[#16161D] text-[#A1A1AA] text-[10px] font-mono border border-[#27272A]/80 rounded-sm group-hover:border-[#4F46E5]/40 group-hover:text-[#C4B5FD] transition-all duration-300 shadow-sm">{tag}</span>
                    ))}
                  </div>
                  <div className="text-[9px] text-[#4F46E5] font-mono tracking-wider uppercase font-bold mt-4 pt-4 border-t border-[#27272A]/40">{nodesData[6].metrics}</div>
                </div>
              </div>

              {/* Sub-Node: Workflow Systems */}
              <div
                ref={(el) => { subRefs.current[6] = el; }}
                onMouseEnter={() => setHoveredSubIdx(6)}
                onMouseLeave={() => setHoveredSubIdx(null)}
                className="p-8 bg-[#07070B] border border-[#27272A]/60 rounded-xl hover:bg-[#0A0A0F] hover:border-[#38BDF8]/40 transition-all duration-300 cursor-default group w-full transform-gpu backface-hidden"
              >
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#38BDF8]/0 to-[#38BDF8]/0 group-hover:from-[#38BDF8]/5 group-hover:to-cyan-900/5 transition-all duration-500 rounded-xl" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-1.5 bg-[#12121A] rounded border border-[#27272A] group-hover:border-[#38BDF8]/50 transition-all duration-300">
                      <Award className="w-4 h-4 text-[#38BDF8]" />
                    </div>
                    <div className="text-[9px] text-[#38BDF8]/70 font-mono tracking-wider">BRANCH_NODE</div>
                  </div>
                  <h4 className="text-xs font-mono font-bold tracking-tighter uppercase text-zinc-300 group-hover:text-white transition-colors">{nodesData[6].subNode?.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {nodesData[6].subNode?.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-[#12121A] text-[#8A8A93] text-[10px] font-mono border border-[#27272A] rounded-sm group-hover:border-[#38BDF8]/30 group-hover:text-[#93C5FD] transition-all duration-300 shadow-sm">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── Right Wing Column: Nodes 2, 4, 5 ── */}
          <div className="flex flex-col gap-12">
            
            {/* Node 2: Advanced Frontend Architectures (Top-Right) */}
            <div className="flex flex-col gap-4">
              <div
                ref={(el) => { mainRefs.current[1] = el; }}
                onMouseEnter={() => setHoveredIdx(1)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => setActiveIdx(activeIdx === 1 ? null : 1)}
                className="p-8 bg-[#0A0A0E] border border-[#27272A]/80 rounded-xl hover:bg-[#0D0D14] hover:border-[#4F46E5]/50 transition-all duration-300 cursor-default group transform-gpu backface-hidden"
              >
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#4F46E5]/0 to-[#4F46E5]/0 group-hover:from-[#4F46E5]/8 group-hover:to-purple-900/5 transition-all duration-500 rounded-xl" />
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-[#16161D] rounded border border-[#27272A] group-hover:border-[#4F46E5]/60 group-hover:bg-[#1a1a2e] transition-all duration-300">
                      <Layout className="w-5 h-5 text-[#4F46E5] group-hover:text-violet-400 transition-colors" />
                    </div>
                    <div className="text-[9px] text-[#4F46E5]/80 font-mono tracking-widest uppercase">NODE_02</div>
                  </div>
                  <h3 className="text-sm font-mono font-bold tracking-tighter uppercase text-white/90 group-hover:text-white transition-colors">{nodesData[1].title}</h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {nodesData[1].tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-[#16161D] text-[#A1A1AA] text-[10px] font-mono border border-[#27272A]/80 rounded-sm group-hover:border-[#4F46E5]/40 group-hover:text-[#C4B5FD] transition-all duration-300 shadow-sm">{tag}</span>
                    ))}
                  </div>
                  <div className="text-[9px] text-[#4F46E5] font-mono tracking-wider uppercase font-bold mt-4 pt-4 border-t border-[#27272A]/40">{nodesData[1].metrics}</div>
                </div>
              </div>

              {/* Sub-Node: Framework Sub-Node */}
              <div
                ref={(el) => { subRefs.current[1] = el; }}
                onMouseEnter={() => setHoveredSubIdx(1)}
                onMouseLeave={() => setHoveredSubIdx(null)}
                className="p-8 bg-[#07070B] border border-[#27272A]/60 rounded-xl hover:bg-[#0A0A0F] hover:border-[#38BDF8]/40 transition-all duration-300 cursor-default group transform-gpu backface-hidden"
              >
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#38BDF8]/0 to-[#38BDF8]/0 group-hover:from-[#38BDF8]/5 group-hover:to-cyan-900/5 transition-all duration-500 rounded-xl" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-1.5 bg-[#12121A] rounded border border-[#27272A] group-hover:border-[#38BDF8]/50 transition-all duration-300">
                      <Award className="w-4 h-4 text-[#38BDF8]" />
                    </div>
                    <div className="text-[9px] text-[#38BDF8]/70 font-mono tracking-wider">BRANCH_NODE</div>
                  </div>
                  <h4 className="text-xs font-mono font-bold tracking-tighter uppercase text-zinc-300 group-hover:text-white transition-colors">{nodesData[1].subNode?.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {nodesData[1].subNode?.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-[#12121A] text-[#8A8A93] text-[10px] font-mono border border-[#27272A] rounded-sm group-hover:border-[#38BDF8]/30 group-hover:text-[#93C5FD] transition-all duration-300 shadow-sm">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Node 4: Intelligent Processing & Agentic AI (Mid-Right) */}
            <div className="flex flex-col gap-4">
              <div
                ref={(el) => { mainRefs.current[3] = el; }}
                onMouseEnter={() => setHoveredIdx(3)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => setActiveIdx(activeIdx === 3 ? null : 3)}
                className="p-8 bg-[#0A0A0E] border border-[#27272A]/80 rounded-xl hover:bg-[#0D0D14] hover:border-[#4F46E5]/50 transition-all duration-300 cursor-default group transform-gpu backface-hidden"
              >
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#4F46E5]/0 to-[#4F46E5]/0 group-hover:from-[#4F46E5]/8 group-hover:to-purple-900/5 transition-all duration-500 rounded-xl" />
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-[#16161D] rounded border border-[#27272A] group-hover:border-[#4F46E5]/60 group-hover:bg-[#1a1a2e] transition-all duration-300">
                      <Brain className="w-5 h-5 text-[#4F46E5] group-hover:text-violet-400 transition-colors" />
                    </div>
                    <div className="text-[9px] text-[#4F46E5]/80 font-mono tracking-widest uppercase">NODE_04</div>
                  </div>
                  <h3 className="text-sm font-mono font-bold tracking-tighter uppercase text-white/90 group-hover:text-white transition-colors">{nodesData[3].title}</h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {nodesData[3].tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-[#16161D] text-[#A1A1AA] text-[10px] font-mono border border-[#27272A]/80 rounded-sm group-hover:border-[#4F46E5]/40 group-hover:text-[#C4B5FD] transition-all duration-300 shadow-sm">{tag}</span>
                    ))}
                  </div>
                  <div className="text-[9px] text-[#4F46E5] font-mono tracking-wider uppercase font-bold mt-4 pt-4 border-t border-[#27272A]/40">{nodesData[3].metrics}</div>
                </div>
              </div>

              {/* Sub-Node: Vision/Graphics Sub-Node */}
              <div
                ref={(el) => { subRefs.current[3] = el; }}
                onMouseEnter={() => setHoveredSubIdx(3)}
                onMouseLeave={() => setHoveredSubIdx(null)}
                className="p-8 bg-[#07070B] border border-[#27272A]/60 rounded-xl hover:bg-[#0A0A0F] hover:border-[#38BDF8]/40 transition-all duration-300 cursor-default group transform-gpu backface-hidden"
              >
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#38BDF8]/0 to-[#38BDF8]/0 group-hover:from-[#38BDF8]/5 group-hover:to-cyan-900/5 transition-all duration-500 rounded-xl" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-1.5 bg-[#12121A] rounded border border-[#27272A] group-hover:border-[#38BDF8]/50 transition-all duration-300">
                      <Award className="w-4 h-4 text-[#38BDF8]" />
                    </div>
                    <div className="text-[9px] text-[#38BDF8]/70 font-mono tracking-wider">BRANCH_NODE</div>
                  </div>
                  <h4 className="text-xs font-mono font-bold tracking-tighter uppercase text-zinc-300 group-hover:text-white transition-colors">{nodesData[3].subNode?.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {nodesData[3].subNode?.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-[#12121A] text-[#8A8A93] text-[10px] font-mono border border-[#27272A] rounded-sm group-hover:border-[#38BDF8]/30 group-hover:text-[#93C5FD] transition-all duration-300 shadow-sm">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Node 5: Cloud Data & Distributed Infrastructure (Bottom-Right) */}
            <div className="flex flex-col gap-4">
              <div
                ref={(el) => { mainRefs.current[4] = el; }}
                onMouseEnter={() => setHoveredIdx(4)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => setActiveIdx(activeIdx === 4 ? null : 4)}
                className="p-8 bg-[#0A0A0E] border border-[#27272A]/80 rounded-xl hover:bg-[#0D0D14] hover:border-[#4F46E5]/50 transition-all duration-300 cursor-default group transform-gpu backface-hidden"
              >
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#4F46E5]/0 to-[#4F46E5]/0 group-hover:from-[#4F46E5]/8 group-hover:to-purple-900/5 transition-all duration-500 rounded-xl" />
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-[#16161D] rounded border border-[#27272A] group-hover:border-[#4F46E5]/60 group-hover:bg-[#1a1a2e] transition-all duration-300">
                      <Database className="w-5 h-5 text-[#4F46E5] group-hover:text-violet-400 transition-colors" />
                    </div>
                    <div className="text-[9px] text-[#4F46E5]/80 font-mono tracking-widest uppercase">NODE_05</div>
                  </div>
                  <h3 className="text-sm font-mono font-bold tracking-tighter uppercase text-white/90 group-hover:text-white transition-colors">{nodesData[4].title}</h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {nodesData[4].tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-[#16161D] text-[#A1A1AA] text-[10px] font-mono border border-[#27272A]/80 rounded-sm group-hover:border-[#4F46E5]/40 group-hover:text-[#C4B5FD] transition-all duration-300 shadow-sm">{tag}</span>
                    ))}
                  </div>
                  <div className="text-[9px] text-[#4F46E5] font-mono tracking-wider uppercase font-bold mt-4 pt-4 border-t border-[#27272A]/40">{nodesData[4].metrics}</div>
                </div>
              </div>

              {/* Sub-Node: Geospatial Sub-Node */}
              <div
                ref={(el) => { subRefs.current[4] = el; }}
                onMouseEnter={() => setHoveredSubIdx(4)}
                onMouseLeave={() => setHoveredSubIdx(null)}
                className="p-8 bg-[#07070B] border border-[#27272A]/60 rounded-xl hover:bg-[#0A0A0F] hover:border-[#38BDF8]/40 transition-all duration-300 cursor-default group transform-gpu backface-hidden"
              >
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#38BDF8]/0 to-[#38BDF8]/0 group-hover:from-[#38BDF8]/5 group-hover:to-cyan-900/5 transition-all duration-500 rounded-xl" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-1.5 bg-[#12121A] rounded border border-[#27272A] group-hover:border-[#38BDF8]/50 transition-all duration-300">
                      <Award className="w-4 h-4 text-[#38BDF8]" />
                    </div>
                    <div className="text-[9px] text-[#38BDF8]/70 font-mono tracking-wider">BRANCH_NODE</div>
                  </div>
                  <h4 className="text-xs font-mono font-bold tracking-tighter uppercase text-zinc-300 group-hover:text-white transition-colors">{nodesData[4].subNode?.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {nodesData[4].subNode?.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-[#12121A] text-[#8A8A93] text-[10px] font-mono border border-[#27272A] rounded-sm group-hover:border-[#38BDF8]/30 group-hover:text-[#93C5FD] transition-all duration-300 shadow-sm">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Footer legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex items-center justify-center gap-6 px-1 border-t border-[#27272A]/30 pt-8"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-gradient-to-r from-[#4F46E5] to-transparent" />
            <span className="font-mono text-[9px] text-[#71717A] tracking-widest uppercase">
              Omni-Directional Convergence
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-violet-500/60" style={{ boxShadow: '0 0 6px #8b5cf6' }} />
            <span className="font-mono text-[9px] text-[#71717A] tracking-widest uppercase">
              {nodesData.reduce((n, s) => n + s.tags.length + (s.subNode?.tags.length || 0), 0)} Modules Indexed
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
