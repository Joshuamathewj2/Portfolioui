'use client';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const EASE = [0.76, 0, 0.24, 1] as const;
const MIN_MS = 2300; // keep the intro on screen long enough to read
const MAX_WAIT_MS = 6000; // never block the site on a slow asset

const STAGES = [
  { at: 0, label: 'Booting core' },
  { at: 22, label: 'Loading AI agents' },
  { at: 48, label: 'Indexing 10 projects' },
  { at: 74, label: 'Calibrating Bit' },
  { at: 100, label: 'Systems online' },
];

const NAME = 'JOSHUA A.';

function preload(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = img.onerror = () => resolve();
    img.src = src;
  });
}

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Progress follows real asset loading (fonts + hero imagery), paced by a minimum duration
  useEffect(() => {
    let assetsReady = false;
    let frame = 0;
    let finished = false;
    let shown = 0;
    const start = performance.now();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const minMs = reduced ? 400 : MIN_MS;

    Promise.race([
      Promise.all([
        document.fonts?.ready ?? Promise.resolve(),
        preload('/profilepic.png'),
        preload('/bg.png'),
        preload('/j-logo-mark.png'),
      ]),
      new Promise((r) => setTimeout(r, MAX_WAIT_MS)),
    ]).then(() => {
      assetsReady = true;
    });

    const tick = (now: number) => {
      const timeCap = Math.min(100, ((now - start) / minMs) * 100);
      const target = Math.min(assetsReady ? 100 : 92, timeCap);
      shown += (target - shown) * 0.12;
      if (target === 100 && shown > 99.4) shown = 100;
      setProgress(shown);

      if (shown >= 100 && !finished) {
        finished = true;
        setTimeout(() => onCompleteRef.current(), reduced ? 100 : 550);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const pct = Math.round(progress);
  const stage = [...STAGES].reverse().find((s) => pct >= s.at) ?? STAGES[0];
  const R = 86;
  const C = 2 * Math.PI * R;

  return (
    <motion.div
      className="fixed inset-0 z-[1000] overflow-hidden"
      // Holds the exit open long enough for the shutters to finish
      exit={{ opacity: 1, transition: { duration: 0.9 } }}
      role="status"
      aria-live="polite"
      aria-label={`Loading portfolio, ${pct} percent`}
    >
      {/* Split shutters that part to reveal the site */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-[#050507]"
        exit={{ y: '-100%', transition: { duration: 0.9, ease: EASE } }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#050507]"
        exit={{ y: '100%', transition: { duration: 0.9, ease: EASE } }}
      />
      <motion.div
        className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#C084FC] to-transparent shadow-[0_0_20px_#a855f7]"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={pct >= 100 ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        transition={{ duration: 0.5, ease: EASE }}
      />

      <motion.div
        className="absolute inset-0"
        exit={{ opacity: 0, scale: 1.08, filter: 'blur(8px)', transition: { duration: 0.45 } }}
      >
        {/* Perspective grid floor */}
        <div
          className="absolute inset-x-0 bottom-0 h-[50%] overflow-hidden pointer-events-none"
          style={{ perspective: 320, perspectiveOrigin: '50% 0%' }}
        >
          <div
            className="absolute left-[-100%] right-[-100%] top-0 h-[300%] origin-top opacity-60 animate-[loader-grid_1.6s_linear_infinite]"
            style={{
              transform: 'rotateX(72deg)',
              backgroundImage:
                'linear-gradient(rgba(168,85,247,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.35) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
              maskImage: 'linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)',
            }}
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(124,58,237,0.28),transparent_55%)]" />

        {/* Corner HUD */}
        {[
          'top-6 left-6 border-t border-l',
          'top-6 right-6 border-t border-r',
          'bottom-6 left-6 border-b border-l',
          'bottom-6 right-6 border-b border-r',
        ].map((pos) => (
          <motion.span
            key={pos}
            className={`absolute w-8 h-8 border-[#a855f7]/50 ${pos}`}
            initial={{ opacity: 0, scale: 1.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
          />
        ))}
        <div className="absolute top-8 left-16 font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-600">Portfolio // v3</div>
        <div className="absolute top-8 right-16 font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-600">Chennai · IN</div>
        <div className="absolute bottom-8 left-16 font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-600 tabular-nums">
          SYS {String(pct).padStart(3, '0')}
        </div>
        <div className="absolute bottom-8 right-16 font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-600">© {new Date().getFullYear()}</div>

        {/* Center stack */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6">
          <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px]">
            <svg viewBox="0 0 220 220" className="absolute inset-0 w-full h-full overflow-visible">
              <defs>
                <linearGradient id="loader-arc" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#C084FC" />
                  <stop offset="60%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#67E8F9" />
                </linearGradient>
                <filter id="loader-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Outer tick ring */}
              <motion.g
                style={{ transformOrigin: '110px 110px' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              >
                {Array.from({ length: 60 }).map((_, i) => (
                  <line
                    key={i}
                    x1="110" y1="4" x2="110" y2={i % 5 === 0 ? 14 : 9}
                    stroke={i % 5 === 0 ? '#a855f7' : '#3f3f46'}
                    strokeWidth={i % 5 === 0 ? 2 : 1}
                    transform={`rotate(${i * 6} 110 110)`}
                  />
                ))}
              </motion.g>

              {/* Counter-rotating arc segments */}
              <motion.g
                style={{ transformOrigin: '110px 110px' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              >
                <circle cx="110" cy="110" r="100" fill="none" stroke="#67E8F9" strokeOpacity="0.6" strokeWidth="1.5"
                  strokeDasharray="40 120 12 140" strokeLinecap="round" />
              </motion.g>

              {/* Progress track + arc */}
              <circle cx="110" cy="110" r={R} fill="none" stroke="#1f1b2e" strokeWidth="6" />
              <circle
                cx="110" cy="110" r={R} fill="none"
                stroke="url(#loader-arc)" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - progress / 100)}
                transform="rotate(-90 110 110)"
                filter="url(#loader-glow)"
              />

              {/* Inner pulse ring */}
              <motion.circle
                cx="110" cy="110" r="66" fill="none" stroke="#a855f7" strokeWidth="1"
                animate={{ r: [62, 70, 62], opacity: [0.5, 0.15, 0.5] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />

            </svg>

            {/* J logo: traced in from the bottom, then a scan line sweeps across it */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[34%] aspect-[216/278]">
                <motion.img
                  src="/j-logo-mark.png"
                  alt=""
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-contain select-none drop-shadow-[0_0_14px_rgba(56,189,248,0.75)]"
                  // Clip extends past the image edges so the drop-shadow glow isn't cut into a box
                  initial={{ clipPath: 'inset(130% -40% -40% -40%)', opacity: 0.4 }}
                  animate={{ clipPath: 'inset(-40% -40% -40% -40%)', opacity: [0.4, 1, 0.75, 1] }}
                  transition={{
                    clipPath: { duration: 1.3, ease: [0.65, 0, 0.35, 1], delay: 0.2 },
                    opacity: { duration: 1.6, times: [0, 0.6, 0.8, 1], delay: 0.2 },
                  }}
                />
                <motion.span
                  aria-hidden
                  className="absolute left-[-15%] right-[-15%] h-[2px] bg-gradient-to-r from-transparent via-[#E0F2FE] to-transparent shadow-[0_0_12px_#38BDF8]"
                  initial={{ top: '100%', opacity: 0 }}
                  animate={{ top: ['100%', '0%', '100%'], opacity: [0, 1, 0] }}
                  transition={{ duration: 2.4, delay: 0.2, repeat: Infinity, repeatDelay: 0.6, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </div>

          {/* Name, percentage, stage */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex font-syne font-bold text-3xl sm:text-4xl tracking-tight text-white" aria-hidden>
              {NAME.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className={ch === '.' ? 'text-[#a855f7]' : ''}
                >
                  {ch === ' ' ? ' ' : ch}
                </motion.span>
              ))}
            </div>

            <div className="flex items-center gap-4 font-mono text-xs tracking-[0.3em] uppercase">
              <span className="text-white tabular-nums w-[4ch] text-right">{pct}%</span>
              <span className="w-px h-3 bg-zinc-700" />
              <motion.span
                key={stage.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={pct >= 100 ? 'text-[#10B981]' : 'text-[#C084FC]'}
              >
                {stage.label}
              </motion.span>
            </div>

            {/* Segmented bar */}
            <div className="flex gap-1" aria-hidden>
              {Array.from({ length: 20 }).map((_, i) => (
                <span
                  key={i}
                  className="w-2.5 h-1 rounded-full transition-colors duration-200"
                  style={{ background: pct >= (i + 1) * 5 ? (i > 15 ? '#67E8F9' : '#a855f7') : '#27272a' }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
