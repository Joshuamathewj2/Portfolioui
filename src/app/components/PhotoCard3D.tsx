import { useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react';

/** Push a layer toward (positive) or away from (negative) the viewer. */
const depth = (z: number): React.CSSProperties => ({
  transform: `translateZ(${z}px)`,
  transformStyle: 'preserve-3d',
});

/**
 * Layered 3D portrait card. It tilts toward the cursor, the photo parallaxes inside its
 * frame, a light glare follows the pointer, and HUD chips float at different depths.
 */
export default function PhotoCard3D({ src, alt }: { src: string; alt: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Pointer position relative to the card, 0..1 on each axis (0.5 = centred)
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 140, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 140, damping: 18, mass: 0.6 });

  const rotateY = useTransform(sx, [0, 1], [-18, 18]);
  const rotateX = useTransform(sy, [0, 1], [14, -14]);
  const photoX = useTransform(sx, [0, 1], [14, -14]);
  const photoY = useTransform(sy, [0, 1], [10, -10]);
  const glareX = useTransform(sx, [0, 1], [0, 100]);
  const glareY = useTransform(sy, [0, 1], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.32), rgba(255,255,255,0.06) 30%, transparent 55%)`;
  const shadowX = useTransform(sx, [0, 1], [30, -30]);

  useEffect(() => {
    // The card follows the cursor anywhere on screen; it reaches full tilt about
    // three-quarters of a card width away from its centre.
    const onMove = (e: MouseEvent) => {
      const el = cardRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / (r.width * 1.5);
      const ny = (e.clientY - (r.top + r.height / 2)) / (r.height * 1.5);
      px.set(0.5 + Math.max(-0.5, Math.min(0.5, nx)));
      py.set(0.5 + Math.max(-0.5, Math.min(0.5, ny)));
    };
    const onLeave = () => {
      px.set(0.5);
      py.set(0.5);
    };
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [px, py]);

  return (
    <div className="relative flex items-center justify-center" style={{ perspective: 1300 }}>
      {/* Idle sway so the card feels alive on touch screens too */}
      <motion.div
        animate={{ rotateZ: [0, 0.8, 0, -0.8, 0], y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          ref={cardRef}
          className="relative w-[min(78vw,400px)] aspect-[4/5]"
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        >
          {/* Deep glow plate */}
          <div
            className="absolute -inset-8 rounded-[44px] opacity-70 blur-3xl bg-[conic-gradient(from_200deg,#4F46E5,#a855f7,#38BDF8,#4F46E5)]"
            style={depth(-120)}
          />

          {/* Offset back plate for visible thickness */}
          <div
            className="absolute inset-0 rounded-[30px] bg-[#0B0A16] border border-[#a855f7]/25"
            style={{ ...depth(-40), translate: '18px 18px' }}
          />

          {/* Grid backdrop */}
          <div
            className="absolute inset-0 rounded-[30px] opacity-40 bg-[linear-gradient(rgba(168,85,247,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.25)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(circle,black,transparent_75%)]"
            style={depth(-20)}
          />

          {/* Main photo face with gradient border */}
          <div
            className="absolute inset-0 rounded-[30px] p-[1.5px] bg-gradient-to-br from-[#C084FC] via-white/10 to-[#38BDF8] shadow-[0_40px_80px_-20px_rgba(79,70,229,0.6)]"
            style={depth(0)}
          >
            <div className="relative w-full h-full rounded-[28.5px] overflow-hidden bg-[#07070B]">
              <motion.img
                src={src}
                alt={alt}
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover scale-[1.14]"
                style={{ x: photoX, y: photoY }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07070B] via-[#07070B]/10 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(168,85,247,0.35),transparent_55%)] mix-blend-screen" />
              <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.6)_50%)] bg-[size:100%_3px]" />
              <motion.div className="absolute inset-0 mix-blend-overlay pointer-events-none" style={{ background: glare }} />
              {/* Scanning line */}
              <motion.div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#67E8F9]/80 to-transparent shadow-[0_0_12px_#67E8F9]"
                animate={{ top: ['8%', '92%', '8%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>

          {/* Corner brackets */}
          <div className="absolute inset-4 pointer-events-none" style={depth(35)}>
            <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#67E8F9]/70 rounded-tl-lg" />
            <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#67E8F9]/70 rounded-tr-lg" />
            <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#67E8F9]/70 rounded-bl-lg" />
            <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#67E8F9]/70 rounded-br-lg" />
          </div>

          {/* Status chip */}
          <div className="absolute top-8 left-8" style={depth(70)}>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/15 font-mono text-[10px] tracking-[0.2em] uppercase text-white shadow-lg">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-[#10B981] animate-ping opacity-75" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              </span>
              SYS_ONLINE
            </div>
          </div>

          {/* Floating side chip */}
          <div className="absolute top-[38%] right-3 sm:-right-14" style={depth(120)}>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="px-3 py-2 rounded-xl bg-[#16121F]/90 border border-[#a855f7]/40 shadow-[0_10px_30px_rgba(168,85,247,0.35)] font-mono text-[10px] leading-relaxed text-[#E9D5FF]"
            >
              <div className="text-[#a855f7]">// FOCUS</div>
              AI · SEC · INFRA
            </motion.div>
          </div>

          {/* Floating left chip */}
          <div className="absolute top-[62%] left-3 sm:-left-12" style={depth(95)}>
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              className="px-3 py-2 rounded-xl bg-[#0D1420]/90 border border-[#38BDF8]/40 shadow-[0_10px_30px_rgba(56,189,248,0.3)] font-mono text-[10px] text-[#BAE6FD]"
            >
              <div className="text-[#38BDF8]">// CGPA</div>
              <span className="font-bold text-white text-sm">8.9</span> / 10
            </motion.div>
          </div>

          {/* Name plate */}
          <div className="absolute left-6 right-6 bottom-6" style={depth(85)}>
            <div className="flex items-end justify-between gap-4 px-5 py-4 rounded-2xl bg-black/55 border border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
              <div>
                <div className="font-syne font-bold text-2xl tracking-tight text-white leading-none">
                  Joshua A<span className="text-[#a855f7]">.</span>
                </div>
                <div className="mt-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-[#A1A1AA]">
                  CSE · LICET · '28
                </div>
              </div>
              <div className="flex items-end gap-[3px] h-6" aria-hidden>
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] rounded-full bg-gradient-to-t from-[#4F46E5] to-[#67E8F9]"
                    animate={{ height: ['30%', '100%', '30%'] }}
                    transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Orbiting satellites */}
          <motion.div
            className="absolute -inset-8 pointer-events-none"
            style={{ z: 50 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          >
            <span className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_14px_#38BDF8]" />
          </motion.div>
        </motion.div>

        {/* Ground shadow that slides opposite the tilt */}
        <motion.div
          className="absolute left-1/2 -bottom-14 w-[70%] h-8 -translate-x-1/2 rounded-[100%] bg-[#4F46E5]/30 blur-2xl"
          style={{ x: shadowX }}
        />
      </motion.div>
    </div>
  );
}
