import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router';
import { ArrowUpRight, ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { scrollToTop } from './SmoothScroll';

const links = [
  { label: 'Root', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Stack', to: '/stack' },
  { label: 'Systems', to: '/projects' },
  { label: 'Experience', to: '/experience' },
  { label: 'Recognition', to: '/recognition' },
  { label: 'Connect', to: '/connect' },
];

export default function Footer() {
  const isHome = useLocation().pathname === '/';

  return (
    <footer className="relative z-10 border-t border-[#27272A] bg-[#07070B]/90 backdrop-blur-xl overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px hairline-gradient" />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-40%] w-[80vw] h-[60vh] bg-[#4F46E5]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className={`relative max-w-7xl mx-auto px-6 pb-10 ${isHome ? 'pt-24' : 'pt-10'}`}>
        {/* Closing CTA (home page only) */}
        {isHome && <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-end pb-20 border-b border-[#27272A]/60">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse shadow-[0_0_8px_#10B981]" />
              <span className="text-[#10B981] font-mono text-[10px] tracking-widest uppercase font-bold">
                Open to internships · 2026
              </span>
            </div>
            <h2 className="font-syne font-bold text-5xl sm:text-6xl md:text-8xl tracking-tighter leading-[0.9]">
              Let's build
              <br />
              <span className="text-outline">what's next</span>
              <span className="text-[#4F46E5]">.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 lg:items-end">
            <Link to="/connect" className="group no-underline">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-4 pl-8 pr-3 py-3 rounded-full bg-white text-black font-inter font-bold text-sm tracking-wide"
              >
                START A CONVERSATION
                <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-[#4F46E5] transition-colors">
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                </span>
              </motion.span>
            </Link>
            <div className="flex gap-3">
              {[
                { icon: Mail, href: 'mailto:joshuamathewj2@gmail.com', label: 'Email' },
                { icon: Github, href: 'https://github.com/Joshuamathewj2', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/joshua-learns', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-12 h-12 rounded-full border border-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:border-[#4F46E5] hover:bg-[#4F46E5]/10 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>}

        {/* Bottom bar (right padding keeps the back-to-top button clear of Bit in the corner) */}
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pr-24 md:pr-20 ${isHome ? 'pt-10' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#4F46E5] rounded-full" />
            <span className="font-syne font-bold text-lg tracking-tighter">
              JOSHUA A<span className="text-[#4F46E5]">.</span>
            </span>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-[#71717A] hover:text-white transition-colors font-mono text-[10px] tracking-widest uppercase"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <p className="text-[#52525B] text-[10px] font-mono tracking-widest uppercase">
              © {new Date().getFullYear()} // ALL_SYSTEM_RIGHTS_RESERVED
            </p>
            <button
              onClick={() => scrollToTop(false)}
              aria-label="Back to top"
              className="w-10 h-10 rounded-full border border-[#27272A] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:border-[#4F46E5] transition-all"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
