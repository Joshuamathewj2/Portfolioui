import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Systems from './components/Systems';
import Stack from './components/Stack';
import Lab from './components/Lab';
import Contact from './components/Contact';
import AnimatedBackground from './components/AnimatedBackground';
import CursorGlow from './components/CursorGlow';

export default function App() {
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-[#F5F5F5] font-satoshi overflow-x-hidden">
      <AnimatedBackground opacity={backgroundOpacity} />
      <CursorGlow />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <Systems />
        <Stack />
        <Lab />
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
              <a href="mailto:joshua@example.com" className="hover:text-[#4F46E5] transition-colors">
                joshua@example.com
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#4F46E5] transition-colors">
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#4F46E5] transition-colors">
                LinkedIn
              </a>
              <span>San Francisco, CA</span>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#4F46E5] to-transparent animate-[pulse-glow_3s_ease-in-out_infinite]" />

            <p className="text-sm text-[#71717A]">
              © 2026 Joshua. Elite Engineering Systems.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
