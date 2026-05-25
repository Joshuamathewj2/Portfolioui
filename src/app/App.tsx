import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stack from './components/Stack';
import Systems from './components/Systems';
import Experience from './components/Experience';
import Education from './components/Education';
import Recognition from './components/Recognition';
import Contact from './components/Contact';
import AnimatedBackground from './components/AnimatedBackground';
import CursorGlow from './components/CursorGlow';
import Loader from './components/Loader';

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

            <main className="relative z-10">
              <Hero />
              <About />
              <Stack />
              <Systems />
              <Experience />
              <Education />
              <Recognition />
              <Contact />
            </main>

            <footer className="relative z-10 border-t border-[#27272A] bg-[#0B0B0F]/80 backdrop-blur-xl">
              <div className="max-w-7xl mx-auto px-6 py-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center space-y-8"
                >
                  <h2 className="text-4xl md:text-5xl font-clash glow-text">
                    Building systems that think, react, and scale.
                  </h2>

                  <div className="flex flex-wrap justify-center gap-8 text-[#A1A1AA]">
                    <a href="mailto:joshuamathewj2@gmail.com" className="hover:text-[#4F46E5] transition-colors">
                      joshuamathewj2@gmail.com
                    </a>
                    <a href="https://github.com/Joshuamathewj2" target="_blank" rel="noopener noreferrer" className="hover:text-[#4F46E5] transition-colors">
                      GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/joshua-learns" target="_blank" rel="noopener noreferrer" className="hover:text-[#4F46E5] transition-colors">
                      LinkedIn
                    </a>
                    <span>Chennai, India</span>
                  </div>

                  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#4F46E5] to-transparent animate-[pulse-glow_3s_ease-in-out_infinite]" />

                  <p className="text-sm text-[#71717A]">
                    © 2025 Joshua A. Architect of intelligent systems.
                  </p>
                </motion.div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
