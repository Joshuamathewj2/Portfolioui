'use client';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { motion, animate, useInView, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, BadgeCheck, Trophy } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1] as const;

const certifications = [
  { title: 'Ethical Hacking', issuer: 'NPTEL · IIT Certified' },
  { title: 'Programming in Java — Gold Elite', issuer: 'NPTEL · IIT Madras' },
  { title: 'Problem Solving Through Programming in C — Elite', issuer: 'NPTEL · IIT Kanpur' },
  { title: 'Entrepreneurial Activity Bootcamp', issuer: 'Cambridge University Press' }
];

const achievements = [
  { rank: '01', title: 'Top 10 — CTRL+ALT+HACK 2.0', detail: '30+ Technical Events · LICET, Chennai' },
  { rank: '02', title: 'Vice President, Literary Club', detail: 'Coordinated inter-college events · 20+ member team' },
  { rank: '03', title: 'Startup Pitch Participant', detail: 'Cambridge Entrepreneurship Bootcamp' },
  { rank: '04', title: '1st Place — Spin a Yarn Competition', detail: 'Inter-college literary event' },
  { rank: '05', title: '3rd Place — Channel Surfing', detail: 'Inter-college creative competition' }
];

const cultural = [
  {
    image: '/culturals1.png',
    badge: '1st',
    tag: 'First Year // Cultural Collective',
    title: 'ENGINIEA 2024 // Spin a Yarn',
    result: '1st Place — Inter-Departmental Championship',
    discipline: 'English Composition & Storytelling',
    body: 'Secured the top position out of all competing college departments by engineering a cohesive, high-speed narrative framework under strict algorithmic improvisation rules.',
  },
  {
    image: '/culturals2.png',
    badge: '3rd',
    tag: 'Second Year // Cultural Collective',
    title: 'ENGINIEA 2025 // Channel Surfing',
    result: '3rd Place — Lead Performer (Bear Grylls Simulation)',
    discipline: 'Improvisational Stage Satire & Performance',
    body: 'Commanded the stage as the lead actor, delivering a high-energy, real-time satirical performance mimicking survivalist protocols under rapid, unpredictable multi-channel shifts.',
  },
  {
    image: '/culturals3.png',
    badge: '100',
    tag: 'Academic Milestone // Graphics Topper',
    title: 'Engineering Graphics Topper // 100/100',
    result: 'DAV Boys Senior Secondary School, Gopalapuram',
    discipline: 'Perfect Score Achievement',
    body: 'Achieved a perfect score of 100/100 in Engineering Drawing/Graphics, securing the school topper designation within a highly competitive cohort.',
  },
];

// Headline numbers, each backed by an entry on this page or in the project data
const STATS = [
  { prefix: '#', value: 11, suffix: '', label: 'of 1,773 · HackerRank Orchestrate' },
  { prefix: 'Top ', value: 10, suffix: '', label: 'CTRL+ALT+HACK 2.0' },
  { prefix: '', value: 100, suffix: '/100', label: 'Engineering Graphics' },
  { prefix: '', value: 4, suffix: '', label: 'Certifications' },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-1.5 h-1.5 bg-[#a855f7] rounded-full shadow-[0_0_8px_#a855f7]" />
      <span className="text-[#C084FC] font-mono text-xs tracking-widest uppercase">{children}</span>
    </div>
  );
}

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: 1.6, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref} className="tabular-nums">{n}</span>;
}

/** Photo card that tilts toward the pointer with a moving glare. */
function TrophyCard({ item, index, large }: { item: (typeof cultural)[number]; index: number; large?: boolean }) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 160, damping: 18 });
  const sy = useSpring(py, { stiffness: 160, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-9, 9]);
  const rotateX = useTransform(sy, [0, 1], [7, -7]);
  const gx = useTransform(sx, [0, 1], [0, 100]);
  const gy = useTransform(sy, [0, 1], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.22), transparent 50%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: EASE }}
      className={large ? 'lg:col-span-2' : ''}
      style={{ perspective: 1200 }}
    >
      <motion.article
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }}
        onMouseLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`group relative h-full flex flex-col ${large ? 'lg:flex-row' : ''} rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0D0D12] hover:border-[#a855f7]/50 transition-colors duration-500 shadow-[0_30px_80px_-30px_rgba(124,58,237,0.5)]`}
      >
        <div className={`relative overflow-hidden ${large ? 'aspect-[16/10] lg:aspect-auto lg:w-[58%] lg:min-h-[440px] shrink-0' : 'aspect-[16/10]'}`}>
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-[1.06] transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
            draggable={false}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-[#0D0D12]/10 to-transparent" />
          <motion.div className="absolute inset-0 pointer-events-none mix-blend-overlay" style={{ background: glare }} />

          {/* Placement medallion */}
          <div className="absolute top-4 right-4 w-16 h-16 rounded-full p-[2px] bg-[conic-gradient(from_180deg,#C084FC,#38BDF8,#F0ABFC,#C084FC)] shadow-[0_0_24px_rgba(168,85,247,0.6)]">
            <div className="w-full h-full rounded-full bg-[#0D0D12]/90 backdrop-blur-md flex items-center justify-center font-syne font-bold text-lg text-white">
              {item.badge}
            </div>
          </div>
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 border border-white/10 font-mono text-[9px] tracking-widest uppercase text-[#7DD3FC]">
            {item.tag}
          </span>
        </div>

        <div className={`relative p-6 space-y-3 ${large ? 'lg:p-12 lg:self-center' : ''}`}>
          <h3 className={`font-syne font-bold text-white leading-snug group-hover:text-[#C084FC] transition-colors ${large ? 'text-3xl' : 'text-2xl'}`}>
            {item.title}
          </h3>
          <div className="text-[#38BDF8] font-mono text-[11px] tracking-widest font-bold uppercase">{item.result}</div>
          <div className="text-[#A1A1AA] font-mono text-[10px] tracking-wider uppercase font-semibold">{item.discipline}</div>
          <p className="text-sm text-[#A1A1AA] font-inter leading-relaxed">{item.body}</p>
        </div>
      </motion.article>
    </motion.div>
  );
}

export default function Recognition() {
  return (
    <section id="recognition" className="relative pt-40 pb-32 px-6 overflow-x-clip">
      <div className="absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(ellipse_at_30%_0%,rgba(124,58,237,0.22),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header + stat counters */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          className="mb-24 md:mb-32"
        >
          <SectionLabel>Recognition // Credentials & Honors</SectionLabel>
          <h1 className="mt-6 font-syne font-bold tracking-tighter leading-[0.85] text-6xl sm:text-8xl md:text-[9rem]">
            Recognition<span className="text-[#a855f7]">.</span>
          </h1>
          <dl className="mt-14 grid grid-cols-2 lg:grid-cols-4 border-t border-l border-white/[0.08]">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.08, ease: EASE }}
                className="p-6 md:p-8 border-r border-b border-white/[0.08]"
              >
                <dd className="font-syne font-bold text-4xl md:text-6xl tracking-tighter text-white">
                  <span className="text-[#C084FC]">{s.prefix}</span>
                  <CountUp to={s.value} />
                  <span className="text-[#71717A] text-2xl md:text-3xl">{s.suffix}</span>
                </dd>
                <dt className="mt-2 font-mono text-[10px] tracking-widest uppercase text-[#71717A]">{s.label}</dt>
              </motion.div>
            ))}
          </dl>
        </motion.header>

        {/* Featured result */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: EASE }}
          className="relative mb-32 md:mb-40 rounded-3xl p-[1.5px] bg-gradient-to-br from-[#C084FC] via-white/10 to-[#38BDF8]"
        >
          <div className="relative grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center rounded-[22px] bg-[#09080F] p-8 md:p-12 overflow-hidden">
            <span className="absolute -left-24 -top-24 w-72 h-72 rounded-full bg-[#a855f7]/20 blur-[100px]" aria-hidden />
            <div className="relative space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 font-mono text-[10px] tracking-widest uppercase text-[#34D399]">
                <BadgeCheck className="w-3.5 h-3.5" /> Verified credential
              </div>
              <div className="font-syne font-bold tracking-tighter leading-none">
                <span className="text-7xl md:text-9xl text-white">#11</span>
                <span className="block mt-2 text-2xl md:text-3xl text-[#A1A1AA]">of 1,773 participants</span>
              </div>
              <p className="text-[#A1A1AA] font-inter leading-relaxed max-w-lg">
                Awarded for participating in the June 2026 edition of HackerRank’s Orchestrate by building and deploying an AI agent.
              </p>
              <Link
                to="/projects?project=analyser-agent"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-[11px] font-bold tracking-widest uppercase no-underline hover:bg-[#a855f7] hover:text-white transition-colors"
              >
                See the agent: Analyser Agent
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
              </Link>
            </div>
            <motion.div
              whileHover={{ rotate: 0, scale: 1.02 }}
              initial={{ rotate: 2 }}
              className="relative rounded-xl overflow-hidden border border-white/15 shadow-[0_30px_80px_-20px_rgba(56,189,248,0.35)] bg-zinc-950"
            >
              <img src="/certificate1.png" alt="HackerRank Orchestrate certificate" className="w-full h-auto block" loading="lazy" />
            </motion.div>
          </div>
        </motion.div>

        {/* Cultural trophy wall */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-12 space-y-5"
        >
          <SectionLabel>Cultural Achievements // Extracurricular Logs</SectionLabel>
          <h2 className="font-syne font-bold tracking-tighter leading-[0.9] text-5xl md:text-7xl">
            Off the <span className="text-outline">keyboard</span>
          </h2>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-6 mb-32 md:mb-40">
          {cultural.map((item, i) => (
            <TrophyCard key={item.title} item={item} index={i} large={i === 0} />
          ))}
        </div>

        {/* Certifications + achievements */}
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-16">
          <div>
            <div className="mb-10 space-y-5">
              <SectionLabel>Credentials</SectionLabel>
              <h2 className="font-syne font-bold tracking-tighter text-4xl md:text-6xl">Certifications</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                  className="group relative p-6 rounded-2xl border border-white/[0.08] bg-[#0D0D12] overflow-hidden hover:border-[#a855f7]/50 transition-colors duration-500"
                >
                  {/* Holographic sheen sweeping on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-0 group-hover:translate-x-[300%] transition-transform duration-1000 ease-out"
                  />
                  <BadgeCheck className="w-6 h-6 text-[#C084FC] mb-5" />
                  <h3 className="text-white font-bold font-inter leading-snug mb-3 group-hover:text-[#E9D5FF] transition-colors">{cert.title}</h3>
                  <div className="text-[#71717A] text-[10px] font-mono tracking-widest uppercase">{cert.issuer}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-10 space-y-5">
              <SectionLabel>Leaderboard</SectionLabel>
              <h2 className="font-syne font-bold tracking-tighter text-4xl md:text-6xl flex items-center gap-4">
                Achievements <Trophy className="w-8 h-8 text-[#a855f7]/60" aria-hidden />
              </h2>
            </div>
            <ol className="border-t border-white/[0.08]">
              {achievements.map((ach, i) => (
                <motion.li
                  key={ach.rank}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
                  className="group relative flex items-center gap-6 py-6 px-2 border-b border-white/[0.08] overflow-hidden"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-[#a855f7]/15 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  <span className="relative font-syne font-bold text-4xl tracking-tighter text-outline group-hover:text-[#C084FC] transition-colors w-14 shrink-0">
                    {ach.rank}
                  </span>
                  <div className="relative">
                    <h3 className="text-white font-bold font-inter text-lg group-hover:translate-x-1 transition-transform duration-500">{ach.title}</h3>
                    <p className="text-[#71717A] text-sm mt-1">{ach.detail}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
