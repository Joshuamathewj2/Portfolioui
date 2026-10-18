import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useInView,
} from 'motion/react';
import { ArrowUpRight, Brain, Eye, Layers, Shield } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;
const AUTOPLAY_MS = 5500;

// Every claim below points at a real project or internship elsewhere on the site.
const ROLES = [
  {
    id: 'ai',
    label: 'AI Agents',
    icon: Brain,
    line: 'Multi-agent planning, LLM pipelines and evaluation harnesses that pick the better model on real data.',
    stack: ['LangGraph', 'LangChain', 'Gemini API', 'FastAPI'],
    proof: [
      { label: 'MIRAGE', to: '/projects?project=mirage' },
      { label: 'Analyser Agent · #11 / 1,773', to: '/projects?project=analyser-agent' },
      { label: 'ResQ', to: '/projects?project=resq' },
    ],
    // Hotspot on the artwork's HUD list ("AI SYSTEMS …")
    spot: { x: 61, y: 31 },
  },
  {
    id: 'cv',
    label: 'Computer Vision',
    icon: Eye,
    line: 'Hand tracking, sign-language recognition and image-forensics pipelines built on classical and deep vision.',
    stack: ['OpenCV', 'MediaPipe', 'TensorFlow', 'OpenGL'],
    proof: [
      { label: 'Gesture Hologram AI PRO', to: '/projects?project=gesture-hologram-ai-pro' },
      { label: 'Silent Words MVC', to: '/projects?project=silent-words-mvc' },
      { label: 'PixelTrust', to: '/projects?project=pixeltrust' },
    ],
    spot: { x: 68, y: 50 },
  },
  {
    id: 'web',
    label: 'Full-Stack Web',
    icon: Layers,
    line: 'React and Next.js front ends on FastAPI and Node back ends; these three are live on Vercel.',
    stack: ['React', 'Next.js', 'TypeScript', 'FastAPI'],
    proof: [
      { label: 'PillPulse AI', to: '/projects?project=pillpulse-ai' },
      { label: 'Valora', to: '/projects?project=valora' },
      { label: 'Aura-X1', to: '/projects?project=aura-x1' },
    ],
    spot: { x: 49, y: 53 },
  },
  {
    id: 'sec',
    label: 'Security & Infra',
    icon: Shield,
    line: 'Deployed a Check Point firewall on AWS, studied utility-scale IT and GIS at TNEB, and wrote Solidity smart contracts.',
    stack: ['AWS', 'Check Point NGFW', 'Solidity', 'Docker'],
    proof: [
      { label: 'SNS India internship', to: '/experience' },
      { label: 'TNEB internship', to: '/experience' },
      { label: 'BloodChain', to: '/projects?project=bloodchain' },
    ],
    spot: { x: 30, y: 38 },
  },
] as const;

/** Types the line out character by character whenever it changes. */
function TypedLine({ text }: { text: string }) {
  const [shown, setShown] = useState('');

  useEffect(() => {
    setShown('');
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [text]);

  return (
    <p className="font-mono text-sm md:text-[15px] leading-relaxed text-[#D4D4D8] min-h-[3.5em]">
      <span className="text-[#a855f7] mr-2">&gt;</span>
      {shown}
      <span className="inline-block w-2 h-4 -mb-0.5 ml-1 bg-[#a855f7] animate-pulse" aria-hidden />
    </p>
  );
}

export default function RolesShowcase() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { margin: '-20% 0px' });
  const role = ROLES[active];

  // Cycle roles while the section is on screen, until the visitor picks one
  useEffect(() => {
    if (!autoplay || !inView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % ROLES.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [autoplay, inView]);

  const pick = (i: number) => {
    setActive(i);
    setAutoplay(false);
  };

  // Scroll parallax for the artwork
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.08, 1.18]);

  // Cursor spotlight + slight pan over the artwork
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const smx = useSpring(mx, { stiffness: 80, damping: 20 });
  const smy = useSpring(my, { stiffness: 80, damping: 20 });
  const panX = useTransform(smx, [0, 100], ['1.5%', '-1.5%']);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${smx}% ${smy}%, rgba(192,132,252,0.22), transparent 60%)`;

  return (
    <section
      ref={sectionRef}
      id="roles"
      className="relative w-full py-28 md:py-36 px-6 overflow-hidden border-t border-zinc-900 bg-[#07070B]"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,58,237,0.18),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto">
        {/* ── Quote ─────────────────────────────────────────────────────────── */}
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: EASE }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#a855f7]" />
            <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[#C084FC]">Operating Principle</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#a855f7]" />
          </div>
          <blockquote className="font-syne font-bold tracking-tighter leading-[0.95] text-5xl sm:text-6xl md:text-8xl">
            <span className="text-white">Talk is cheap.</span>
            <br />
            <span className="bg-gradient-to-r from-[#C084FC] via-[#a855f7] to-[#67E8F9] bg-clip-text text-transparent">
              Show me the code.
            </span>
          </blockquote>
          <figcaption className="mt-6 font-mono text-xs tracking-[0.25em] uppercase text-[#71717A]">
            Linus Torvalds
          </figcaption>
        </motion.figure>

        {/* ── Interactive role console ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
          className="mt-16 md:mt-20 max-w-5xl mx-auto rounded-2xl border border-[#a855f7]/25 bg-black/60 backdrop-blur-xl shadow-[0_0_60px_rgba(168,85,247,0.12)] overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
              <span className="ml-3 font-mono text-[10px] tracking-widest uppercase text-zinc-500">whoami --roles</span>
            </div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-600">
              {String(active + 1).padStart(2, '0')} / {String(ROLES.length).padStart(2, '0')}
            </span>
          </div>

          {/* Tabs */}
          <div role="tablist" aria-label="What I build" className="grid grid-cols-2 md:grid-cols-4 border-b border-white/5">
            {ROLES.map((r, i) => {
              const Icon = r.icon;
              const isActive = i === active;
              return (
                <button
                  key={r.id}
                  role="tab"
                  id={`role-tab-${r.id}`}
                  aria-selected={isActive}
                  aria-controls="role-panel"
                  onClick={() => pick(i)}
                  className={`relative flex items-center gap-3 px-5 py-4 text-left transition-colors duration-300 border-white/5 [&:not(:last-child)]:border-r ${
                    isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="role-tab-bg"
                      className="absolute inset-0 bg-gradient-to-b from-[#a855f7]/15 to-transparent"
                      transition={{ duration: 0.5, ease: EASE }}
                    />
                  )}
                  <Icon className={`relative w-4 h-4 shrink-0 ${isActive ? 'text-[#C084FC]' : ''}`} />
                  <span className="relative font-inter font-semibold text-sm">{r.label}</span>
                  {/* Autoplay progress */}
                  {isActive && (
                    <motion.span
                      key={`${r.id}-${autoplay}`}
                      className="absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-[#a855f7] to-[#67E8F9]"
                      initial={{ width: autoplay ? '0%' : '100%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: autoplay && inView ? AUTOPLAY_MS / 1000 : 0.3, ease: 'linear' }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div
            id="role-panel"
            role="tabpanel"
            aria-labelledby={`role-tab-${role.id}`}
            className="grid md:grid-cols-[1.4fr_1fr] gap-6 md:gap-10 p-6 md:p-8"
          >
            <div className="space-y-5">
              <TypedLine text={role.line} />
              <div className="flex flex-wrap gap-2">
                {role.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-[#a855f7]/30 bg-[#a855f7]/10 text-[#E9D5FF]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-500 mb-3">// Proof of work</div>
              <AnimatePresence mode="wait">
                <motion.ul
                  key={role.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1.5"
                >
                  {role.proof.map((p) => (
                    <li key={p.label}>
                      <Link
                        to={p.to}
                        className="group flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors no-underline"
                      >
                        {p.label}
                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#C084FC] group-hover:rotate-45 transition-all duration-300" />
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ── Cinematic centerpiece ────────────────────────────────────────── */}
        <div className="relative mt-14 md:mt-20">
        <motion.div
          ref={frameRef}
          initial={{ clipPath: 'inset(18% 0% 18% 0% round 28px)', opacity: 0.4 }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 28px)', opacity: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 1.6, ease: EASE }}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mx.set(((e.clientX - r.left) / r.width) * 100);
            my.set(((e.clientY - r.top) / r.height) * 100);
          }}
          onMouseLeave={() => {
            mx.set(50);
            my.set(50);
          }}
          className="relative aspect-[4/3] sm:aspect-[16/9] rounded-[28px] overflow-hidden border border-[#a855f7]/25 shadow-[0_40px_120px_-30px_rgba(124,58,237,0.6)]"
        >
          <motion.picture className="absolute inset-0 block" style={{ y: imgY, scale: imgScale, x: panX }}>
            <source srcSet="/Cyberpunk.webp" type="image/webp" />
            <img
              src="/Cyberpunk.png"
              alt="An engineer at a multi-monitor desk inside a purple cyberpunk data stream, surrounded by HUD panels"
              loading="lazy"
              draggable={false}
              className="w-full h-full object-cover select-none"
            />
          </motion.picture>

          {/* Atmosphere */}
          <motion.div className="absolute inset-0 pointer-events-none mix-blend-screen" style={{ background: spotlight }} />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#07070B] via-transparent to-[#07070B]/40" />
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(7,7,11,0.9)]" />
          <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.7)_50%)] bg-[size:100%_3px]" />

          {/* Hotspot tracking the selected role */}
          <motion.div
            className="absolute pointer-events-none"
            animate={{ left: `${role.spot.x}%`, top: `${role.spot.y}%` }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <span className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-[#C084FC]/60 animate-ping" />
            <span className="absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-[#C084FC] shadow-[0_0_24px_#a855f7]" />
            <span className="absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white" />
            <AnimatePresence mode="wait">
              <motion.span
                key={role.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                // Hotspots on the right half label leftward so the chip stays inside the frame on phones
                className={`absolute -top-3 ${role.spot.x > 55 ? 'right-8' : 'left-8'} whitespace-nowrap px-3 py-1 rounded-full bg-black/70 border border-[#a855f7]/50 font-mono text-[10px] tracking-[0.2em] uppercase text-white`}
              >
                {role.label}
              </motion.span>
            </AnimatePresence>
          </motion.div>

        </motion.div>

          {/* Caption: below the image on phones, overlaid on it from sm up */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
            className="relative mt-6 sm:mt-0 sm:absolute sm:left-8 sm:right-8 sm:bottom-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C084FC] mb-2">// The workspace</div>
              <p className="font-syne font-bold text-2xl md:text-4xl tracking-tight text-white leading-tight max-w-xl">
                Ten projects, two internships, one desk.
              </p>
            </div>
            <Link
              to="/projects"
              className="group self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-[11px] font-bold tracking-widest uppercase no-underline hover:bg-[#a855f7] hover:text-white transition-colors"
            >
              See the work
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
