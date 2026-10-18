/**
 * CUSTOMIZATION GUIDE:
 *
 * To personalize this portfolio for Joshua:
 *
 * 1. PHOTO: change the `src` passed to <PhotoCard3D /> (files in /public, e.g. "/profilepic.png")
 *
 * 2. NAME & BIO: Lines ~67-89 - Update the text content
 *
 * 3. CONTACT INFO: Update Contact.tsx with real email, GitHub, LinkedIn
 *
 * 4. PROJECTS: Update Systems.tsx with actual project details
 */

import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, Github, Linkedin } from 'lucide-react';
import PhotoCard3D from './PhotoCard3D';
import TextScramble from './TextScramble';

function MagneticButton({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set(clientX - centerX);
    y.set(clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
    >
      {children}
    </motion.div>
  );
}

const EASE = [0.16, 1, 0.3, 1] as const;

const TAGLINE: { text: string; highlight?: boolean }[] = [
  { text: 'I build' },
  { text: 'AI agents', highlight: true },
  { text: ', computer-vision tools and full-stack web apps.' },
];

export default function Hero() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-[100svh] md:min-h-[110vh] flex items-center pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[1.2fr_1fr] gap-16 items-center">

        {/* Left: Content */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-20 space-y-10"
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-[#4F46E5]/10 border border-[#4F46E5]/20 rounded-full text-[#38BDF8] font-mono text-[11px] sm:text-xs tracking-widest uppercase backdrop-blur-md"
            >
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-[#10B981] animate-ping opacity-75" />
                <span className="relative w-1.5 h-1.5 bg-[#10B981] rounded-full" />
              </span>
              Engineering Status // Open to internships
            </motion.div>

            {/* Name rises out of a mask */}
            <h1 className="text-[clamp(3rem,6.4vw,6.25rem)] font-syne font-bold leading-[0.9] tracking-tighter overflow-hidden pb-4 -mb-4">
              <motion.span
                className="inline-flex items-end"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
              >
                <span className="hero-name-glow">
                  <TextScramble text="Joshua A" textClassName="hero-name-gradient" />
                </span>
                <span className="text-[#4F46E5]">.</span>
              </motion.span>
            </h1>

            <p className="text-2xl md:text-3xl text-[#F5F5F5] font-syne font-medium max-w-xl leading-tight">
              {TAGLINE.map((part, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.9, delay: 0.9 + i * 0.15, ease: EASE }}
                  className={part.highlight
                    ? 'inline text-white underline decoration-[#4F46E5]/60 underline-offset-8'
                    : 'inline'}
                >
                  {part.text}{i === 0 ? ' ' : ''}
                </motion.span>
              ))}
            </p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.35, ease: EASE }}
              className="text-[#A1A1AA] text-lg max-w-2xl font-inter leading-relaxed"
            >
              Third-year Computer Science student at <span className="text-white font-medium">LICET</span>, with internships in cloud security at SNS India and IT &amp; GIS infrastructure at TNEB. I work mostly in Python, TypeScript, React and FastAPI.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.5, ease: EASE }}
            className="flex flex-wrap items-center gap-6"
          >
            <MagneticButton>
              <button
                onClick={() => navigate('/projects')}
                className="group relative overflow-hidden px-8 py-4 bg-white text-black rounded-full font-inter text-sm font-bold flex items-center gap-3 transition-colors duration-500 hover:text-white"
              >
                <span className="absolute inset-0 bg-[#4F46E5] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full" />
                <span className="relative">VIEW PROJECTS</span>
                <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </MagneticButton>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Joshuamathewj2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub" className="w-14 h-14 flex items-center justify-center bg-[#0D0D12]/70 backdrop-blur-md border border-[#27272A] text-white rounded-full hover:border-[#4F46E5] hover:text-[#818CF8] hover:-translate-y-0.5 transition-all duration-300 group relative"
              >
                <Github className="w-5 h-5" />
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#4F46E5] text-white text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">GITHUB_PROFILE</div>
              </a>
              <a
                href="https://www.linkedin.com/in/joshua-learns"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn" className="w-14 h-14 flex items-center justify-center bg-[#0D0D12]/70 backdrop-blur-md border border-[#27272A] text-white rounded-full hover:border-[#4F46E5] hover:text-[#818CF8] hover:-translate-y-0.5 transition-all duration-300 group relative"
              >
                <Linkedin className="w-5 h-5" />
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#4F46E5] text-white text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">LINKEDIN_CONNECT</div>
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-x-3 gap-y-5 pt-6 border-t border-[#27272A]/50">
            {[
              { label: 'SYSTEMS', value: 'Backend' },
              { label: 'AI_PIPELINES', value: 'Integration' },
              { label: 'SEC_TOOLS', value: 'Cybersecurity' },
              { label: 'INFRA', value: 'Scalable' },
              { label: 'UX_ENGINE', value: 'Immersive' },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 + (i * 0.08), duration: 0.6 }}
                className="space-y-1"
              >
                <div className="text-[10px] text-[#818CF8] font-mono tracking-tight uppercase">{stat.label}</div>
                <div className="text-[11px] text-white font-bold tracking-normal uppercase">
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Portrait & Visuals */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, clipPath: 'inset(50% 0% 50% 0%)' }}
          animate={{ opacity: 1, scale: 1, clipPath: 'inset(-50% -50% -50% -50%)' }}
          transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
          className="relative aspect-square md:h-[700px] flex items-center justify-center"
          style={{ y: portraitY }}
        >
          <PhotoCard3D src="/profilepic.png" alt="Joshua A Portrait" />
        </motion.div>

      </div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-3 pointer-events-none"
        aria-hidden
      >
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#71717A]">Scroll</span>
        <span className="relative w-px h-14 bg-white/10 overflow-hidden">
          <motion.span
            className="absolute left-0 top-0 w-px h-1/2 bg-gradient-to-b from-transparent via-[#818CF8] to-transparent"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>

      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 diagonal-stripes" />
      </div>

      {/* Background Architectural Connectors */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#27272A] to-transparent" />
      <div className="absolute top-0 right-[20%] w-px h-full bg-gradient-to-b from-transparent via-[#27272A]/30 to-transparent" />
    </section>
  );
}


