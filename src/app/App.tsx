import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Routes, Route, Link, useLocation } from 'react-router';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Capabilities from './components/Capabilities';
import About from './components/About';
import Stack from './components/Stack';
import Experience from './components/Experience';
import Education from './components/Education';
import Systems from './components/Systems';
import Recognition from './components/Recognition';
import Contact from './components/Contact';
import AnimatedBackground from './components/AnimatedBackground';
import CursorGlow from './components/CursorGlow';
import Loader from './components/Loader';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  // Disable scrolling during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-[#F5F5F5] font-satoshi overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <AnimatedBackground opacity={backgroundOpacity} />
            <CursorGlow />

            <Navbar />
            <ScrollToTop />

            <main className="relative z-10">
              <Routes>
                <Route path="/" element={
                  <>
                    <Reveal><Hero /></Reveal>
                    <Reveal><Capabilities /></Reveal>
                  </>
                } />
                <Route path="/about" element={<Reveal><About /></Reveal>} />
                <Route path="/stack" element={<Reveal><Stack /></Reveal>} />
                <Route path="/projects" element={<Reveal><Systems /></Reveal>} />
                <Route path="/experience" element={<Reveal><Experience /></Reveal>} />
                <Route path="/education" element={<Reveal><Education /></Reveal>} />
                <Route path="/recognition" element={<Reveal><Recognition /></Reveal>} />
                <Route path="/connect" element={<Reveal><Contact /></Reveal>} />
              </Routes>
            </main>

            <footer className="relative z-10 border-t border-[#27272A] bg-[#0B0B0F]/80 backdrop-blur-xl">
              <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4F46E5] rounded-full" />
                  <span className="font-syne font-bold text-lg tracking-tighter">JOSHUA A<span className="text-[#4F46E5]">.</span></span>
                </div>
                <p className="text-[#71717A] text-xs font-mono tracking-widest uppercase">
                  © {new Date().getFullYear()} // ALL_SYSTEM_RIGHTS_RESERVED
                </p>
                <div className="flex gap-8">
                  <Link to="/" className="text-[#71717A] hover:text-[#4F46E5] transition-colors font-mono text-[10px] tracking-widest uppercase">Root</Link>
                  <Link to="/projects" className="text-[#71717A] hover:text-[#4F46E5] transition-colors font-mono text-[10px] tracking-widest uppercase">Systems</Link>
                  <Link to="/connect" className="text-[#71717A] hover:text-[#4F46E5] transition-colors font-mono text-[10px] tracking-widest uppercase">Connect</Link>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

