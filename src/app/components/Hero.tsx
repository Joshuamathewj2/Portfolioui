/**
 * CUSTOMIZATION GUIDE:
 *
 * To personalize this portfolio for Joshua:
 *
 * 1. PHOTO: Line ~99 - Replace the Unsplash URL with Joshua's actual photo
 *    - Upload photo to /src/imports/
 *    - Import it: import joshuaPhoto from '../../imports/your-photo.jpg'
 *    - Use it: <ImageWithFallback src={joshuaPhoto} ... />
 *
 * 2. NAME & BIO: Lines ~67-89 - Update the text content
 *
 * 3. CONTACT INFO: Update Contact.tsx with real email, GitHub, LinkedIn
 *
 * 4. PROJECTS: Update Systems.tsx with actual project details
 */

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';
import { ArrowRight, Code, Database, Brain, Globe, Shield, Github, Linkedin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const rotateX = useTransform(springY, [-400, 400], [5, -5]);
  const rotateY = useTransform(springX, [-400, 400], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX - innerWidth / 2);
      mouseY.set(clientY - innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="relative min-h-[110vh] flex items-center pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[1.2fr_1fr] gap-16 items-center">
        
        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 space-y-10"
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-[#4F46E5]/10 border border-[#4F46E5]/20 rounded-full text-[#38BDF8] font-mono text-xs tracking-widest uppercase"
            >
              <span className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full animate-[pulse_2s_infinite]" />
              Engineering Status // Open to internships
            </motion.div>

            <h1 className="text-7xl md:text-8xl font-syne font-bold leading-[0.9] tracking-tight">
              <span className="hero-name-glow">
                <span className="hero-name-gradient">Joshua A</span>
              </span>
              <span className="text-[#4F46E5]">.</span>
            </h1>

            <p className="text-2xl md:text-3xl text-[#F5F5F5] font-syne font-medium max-w-xl leading-tight">
              Computer Science Engineering Student <span className="text-white underline decoration-[#4F46E5]/40 underline-offset-8">architecting systems</span> for the next generation of AI and security.
            </p>

            <p className="text-[#A1A1AA] text-lg max-w-2xl font-inter leading-relaxed">
              Third-year student at <span className="text-white font-medium">LICET</span>, building production-grade applications across AI forensics, adversarial security, and scalable infrastructure.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 bg-white text-black rounded-sm font-inter text-sm font-bold flex items-center gap-3 hover:bg-[#4F46E5] hover:text-white transition-all duration-300"
            >
              VIEW PROJECTS
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Joshuamathewj2"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-[#0D0D12] border border-[#27272A] text-white rounded-sm hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all duration-300 group relative"
              >
                <Github className="w-5 h-5" />
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#4F46E5] text-white text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">GITHUB_PROFILE</div>
              </a>
              <a
                href="https://www.linkedin.com/in/joshua-learns"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-[#0D0D12] border border-[#27272A] text-white rounded-sm hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all duration-300 group relative"
              >
                <Linkedin className="w-5 h-5" />
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#4F46E5] text-white text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">LINKEDIN_CONNECT</div>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pt-6 border-t border-[#27272A]/50">
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
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="space-y-1"
              >
                <div className="text-[9px] text-[#4F46E5] font-mono tracking-tighter uppercase">{stat.label}</div>
                <div className="text-[10px] text-white font-bold tracking-widest uppercase">
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Portrait & Visuals */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-square md:h-[700px] flex items-center justify-center"
          style={{ perspective: 1200 }}
        >
          {/* Asymmetrical Portrait Composition */}
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative w-full h-full max-w-[480px] group"
          >
            {/* Cinematic Frame */}
            <div className="absolute inset-0 z-10 border border-white/5 rounded-2xl overflow-hidden bg-[#0A0A0E] cinematic-shadow">
              <ImageWithFallback
                src="/profilepic.png"
                alt="Joshua A Portrait"
                className="w-full h-full object-cover opacity-80 grayscale-[0.2] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              
              {/* Edge Fade Blending */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent opacity-40" />
              
              {/* Holographic Rim Lighting */}
              <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(79,70,229,0.3)] pointer-events-none" />
              
              {/* Spatial UI Overlays */}
              <div className="absolute bottom-6 left-6 flex gap-1 items-end pointer-events-none opacity-20 group-hover:opacity-60 transition-opacity">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [4, 12, 4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1 bg-[#4F46E5]/40"
                  />
                ))}
              </div>
            </div>

            {/* Architecture Lines (Geometric Context) */}
            <div className="absolute -inset-10 z-0 pointer-events-none border border-white/5 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
            <div className="absolute -inset-20 z-0 pointer-events-none border border-white/5 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-1000" />
            
            {/* Holographic Orbit Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-6 z-20 pointer-events-none"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#38BDF8] rounded-full shadow-[0_0_15px_#38BDF8]" />
            </motion.div>
            
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-12 z-20 pointer-events-none"
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#4F46E5] rounded-full shadow-[0_0_10px_#4F46E5]" />
            </motion.div>
          </motion.div>

          {/* Environmental Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-[#4F46E5]/10 via-transparent to-transparent blur-3xl pointer-events-none" />
        </motion.div>

      </div>

      {/* Background Architectural Connectors */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#27272A] to-transparent" />
      <div className="absolute top-0 right-[20%] w-px h-full bg-gradient-to-b from-transparent via-[#27272A]/30 to-transparent" />
    </section>
  );
}


