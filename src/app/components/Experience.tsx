'use client';
import { motion, useScroll, useSpring, useInView } from 'motion/react';
import { GraduationCap, MapPin } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router';

const EASE = [0.16, 1, 0.3, 1] as const;

const experiences = [
  {
    org: 'TAMIL NADU ELECTRICITY BOARD (TNEB)',
    role: 'Intern — IT & GIS Infrastructure',
    period: 'HEAD OFFICE, CHENNAI',
    session: 'TAMIL_INTEL',
    images: ['/tnebi.png'],
    // Each tag is named in the points below
    tags: ['Data Center Ops', 'Network Architecture', 'GIS', 'LT Billing Systems', 'Substation Monitoring'],
    points: [
      'Industrial exposure to Data Center Operations, Network Architectures, and Enterprise Hardware systems supporting state-level utility infrastructure',
      'Studied Web Applications and LT Billing Systems architecture for large-scale public service management',
      'Deep dive into Geographical Information Systems (GIS) for power distribution network management and spatial asset tracking',
      'Analysis of Sub Station Monitoring Systems and real-time reliability engineering in critical infrastructure',
      'Observed large-scale network redundancy and redundancy design supporting critical utility services at state scale'
    ]
  },
  {
    org: 'Secure Network Solutions (SNS) India Pvt Ltd',
    role: 'Cyber Security & Cloud Infrastructure Intern',
    period: 'HYBRID PIPELINE // SECURE_INTEL',
    session: 'SECURE_INTEL',
    images: ['/snsi.png', '/snsi2.png'],
    tags: ['AWS', 'Check Point NGFW', 'CloudGuard', 'Linux CLI', 'iptables', 'DLP'],
    points: [
      'Engineered an enterprise Next-Generation Firewall (NGFW) architecture on AWS from scratch, deploying a Check Point Security Management Server and CloudGuard Gateway.',
      'Troubleshot system initialization by dropping into Linux Expert Mode via CLI to bypass config wizard lockouts.',
      'Configured AWS Security Groups and network routing protocols to establish secure inter-appliance communications.',
      'Resolved Secure Internal Communication (SIC) trust mismatches to synchronize remote gateways inside Check Point SmartConsole.',
      'Provisioned Gateway network objects, deployed stateful Access Control policies, and enforced granular default-drop rulesets.',
      'Evaluated AWS Network Firewall domain-list constraints and local iptables rule targets to sandbox malicious endpoints.',
      'Analyzed corporate data loss prevention (DLP) mechanics, mapping out network-level blocks for LLMs (ChatGPT/Claude) to mitigate enterprise data leaks.'
    ]
  }
];

const education = [
  {
    degree: 'B.E. Computer Science & Engineering',
    school: 'Loyola ICAM College of Engineering and Technology',
    detail: 'Anna University · Expected 2028',
    stats: { value: '8.9', label: '/ 10.0 CGPA' }
  },
  {
    degree: 'AISSCE (Class XII)',
    school: 'DAV Boys Senior Secondary School, Gopalapuram',
    detail: 'CBSE · Science Stream',
    stats: { value: '94%', label: '/ CBSE Board' }
  },
  {
    degree: 'Secondary School Examination (Class X)',
    school: 'DAV Boys Senior Secondary School, Gopalapuram',
    detail: 'CBSE · Academic Excellence',
    stats: { value: '96%', label: '/ CBSE Board' }
  }
];

/** Score as a 0–100 fill: "8.9" on a 10-point scale → 89, "94%" → 94. */
const scoreToPercent = (value: string) =>
  value.endsWith('%') ? parseFloat(value) : parseFloat(value) * 10;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-1.5 h-1.5 bg-[#a855f7] rounded-full shadow-[0_0_8px_#a855f7]" />
      <span className="text-[#C084FC] font-mono text-xs tracking-widest uppercase">{children}</span>
    </div>
  );
}

function ExperienceBlock({ exp, index }: { exp: (typeof experiences)[number]; index: number }) {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] });
  const rail = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <article className="relative grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20">
      {/* Left: identity, pinned while the points scroll past on large screens */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="lg:sticky lg:top-28 self-start space-y-7"
      >
        <div className="flex items-end gap-5">
          <span className="font-syne font-bold text-[7rem] md:text-[9rem] leading-[0.75] tracking-tighter text-outline select-none" aria-hidden>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="mb-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 font-mono text-[10px] tracking-widest uppercase text-[#7DD3FC]">
            <MapPin className="w-3 h-3" />
            {exp.period}
          </span>
        </div>

        <div className="space-y-3">
          <h3 className="font-syne font-bold text-3xl md:text-4xl tracking-tight text-white leading-tight">{exp.role}</h3>
          <div className="font-mono text-sm font-bold uppercase tracking-wider text-[#a855f7]">
            <span className="text-[#71717A]">@</span> {exp.org}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {exp.tags.map((t) => (
            <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[#D4D4D8]">
              {t}
            </span>
          ))}
        </div>

        {/* Screenshot stack that fans out on hover */}
        <div className="group relative pt-2" style={{ perspective: 1000 }}>
          {exp.images.map((src, i) => (
            <div
              key={src}
              className={`rounded-xl overflow-hidden border border-[#a855f7]/25 bg-[#0D0D12] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                i === 0
                  ? 'relative z-10 group-hover:[transform:rotateY(-6deg)_rotateX(3deg)]'
                  : 'absolute top-2 left-0 right-0 z-0 [transform:translate(18px,18px)_rotate(3deg)] group-hover:[transform:translate(48px,36px)_rotate(6deg)] opacity-80'
              }`}
            >
              <img
                src={src}
                alt={`${exp.org} screenshot ${i + 1}`}
                className="w-full h-auto block"
                draggable={false}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right: points on a scroll-driven progress rail */}
      <ol ref={listRef} className="relative space-y-5 lg:pt-24">
        <span className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10" aria-hidden />
        <motion.span
          className="absolute left-[15px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-[#C084FC] via-[#a855f7] to-[#38BDF8] shadow-[0_0_10px_#a855f7]"
          style={{ scaleY: rail }}
          aria-hidden
        />
        {exp.points.map((point, pi) => (
          <motion.li
            key={pi}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="group relative pl-12"
          >
            <span className="absolute left-0 top-4 w-[31px] h-[31px] rounded-full bg-[#07070B] border border-[#a855f7]/50 flex items-center justify-center font-mono text-[10px] text-[#C084FC] group-hover:bg-[#a855f7] group-hover:text-white transition-colors duration-300">
              {String(pi + 1).padStart(2, '0')}
            </span>
            <div className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] group-hover:border-[#a855f7]/40 group-hover:bg-[#a855f7]/[0.06] transition-colors duration-500">
              <p className="text-[15px] md:text-base text-[#D4D4D8] leading-relaxed font-inter">{point}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </article>
  );
}

function ScoreRing({ value, percent }: { value: string; percent: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const R = 44;
  const C = 2 * Math.PI * R;

  return (
    <div className="relative w-28 h-28 shrink-0">
      <svg ref={ref} viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <defs>
          <linearGradient id="score-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r={R} fill="none" stroke="#1f1b2e" strokeWidth="6" />
        <motion.circle
          cx="50" cy="50" r={R} fill="none"
          stroke="url(#score-ring)" strokeWidth="6" strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: inView ? C * (1 - percent / 100) : C }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-syne font-bold text-2xl text-white tracking-tight">
        {value}
      </div>
    </div>
  );
}

export default function Experience() {
  const location = useLocation();

  // Smooth scroll to #education if present in hash on navigation
  useEffect(() => {
    if (location.hash === '#education') {
      const timer = setTimeout(() => {
        const element = document.getElementById('education');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <section id="experience" className="relative pt-40 pb-32 px-6 overflow-x-clip">
      <div className="absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(ellipse_at_70%_0%,rgba(124,58,237,0.2),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-end mb-28 md:mb-36"
        >
          <div className="space-y-6">
            <SectionLabel>System // Execution Logs</SectionLabel>
            <h1 className="font-syne font-bold tracking-tighter leading-[0.85] text-7xl sm:text-8xl md:text-[9rem]">
              Experience<span className="text-[#a855f7]">.</span>
            </h1>
          </div>
          <div className="space-y-8">
            <p className="text-lg text-[#A1A1AA] font-inter leading-relaxed max-w-md">
              Two internships, one in cloud security and one in utility-scale IT, alongside a Computer Science degree at LICET.
            </p>
            <dl className="grid grid-cols-3 gap-4 max-w-md">
              {[
                { k: 'Internships', v: '02' },
                { k: 'CGPA', v: '8.9' },
                { k: 'Graduating', v: '2028' },
              ].map((s) => (
                <div key={s.k} className="border-l border-[#a855f7]/40 pl-4">
                  <dd className="font-syne font-bold text-3xl text-white tracking-tight">{s.v}</dd>
                  <dt className="font-mono text-[10px] tracking-widest uppercase text-[#71717A] mt-1">{s.k}</dt>
                </div>
              ))}
            </dl>
          </div>
        </motion.header>

        {/* Internships */}
        <div className="space-y-32 md:space-y-44">
          {experiences.map((exp, i) => (
            <ExperienceBlock key={exp.org} exp={exp} index={i} />
          ))}
        </div>

        {/* Education */}
        <div id="education" className="pt-36 md:pt-44 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div className="space-y-5">
              <SectionLabel>Academic // Educational History</SectionLabel>
              <h2 className="font-syne font-bold tracking-tighter leading-[0.9] text-6xl md:text-8xl">
                Education
              </h2>
            </div>
            <GraduationCap className="hidden md:block w-14 h-14 text-[#a855f7]/40" aria-hidden />
          </motion.div>

          <div className="relative grid md:grid-cols-3 gap-6">
            {/* Connector line between the cards */}
            <span className="hidden md:block absolute left-[8%] right-[8%] top-[4.5rem] h-px bg-gradient-to-r from-transparent via-[#a855f7]/40 to-transparent" aria-hidden />
            {education.map((edu, i) => (
              <motion.div
                key={edu.school + '-' + edu.degree}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
                className="group relative flex flex-col gap-6 p-7 rounded-2xl border border-white/[0.07] bg-[#0D0D12]/80 backdrop-blur-md hover:border-[#a855f7]/40 transition-colors duration-500 overflow-hidden"
              >
                <span className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#a855f7]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden />
                <div className="relative flex items-center justify-between gap-4">
                  <ScoreRing value={edu.stats.value} percent={scoreToPercent(edu.stats.value)} />
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#71717A] text-right">
                    {edu.stats.label}
                  </span>
                </div>
                <div className="relative space-y-2">
                  <h3 className="font-syne font-bold text-xl text-white leading-snug group-hover:text-[#C084FC] transition-colors">
                    {edu.degree}
                  </h3>
                  <div className="text-sm text-[#A1A1AA] font-inter">{edu.school}</div>
                  <div className="font-mono text-[11px] tracking-wider text-[#71717A]">{edu.detail}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
