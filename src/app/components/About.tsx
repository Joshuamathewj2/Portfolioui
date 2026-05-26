'use client';
import { motion } from 'motion/react';
import { HangingIdCard } from './HangingIdCard';

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full" />
            <span className="text-[#4F46E5] font-mono text-xs tracking-widest uppercase">Overview // Profile Summary</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-syne font-bold tracking-tighter">About</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-xl text-[#A1A1AA] leading-relaxed font-inter"
          >
            <p>
              Third-year Computer Science Engineering student at <strong className="text-white">Loyola ICAM College of Engineering and Technology</strong>, operating at the intersection of AI systems, cybersecurity, and production infrastructure.
            </p>
            <p>
              Specialized in end-to-end system design: building pixel-level image forensics pipelines with adversarial robustness, engineering sub-10ms prompt injection detection engines, and designing geospatial evacuation platforms optimized for degraded connectivity environments.
            </p>
            <p>
              My internship at <strong className="text-white">TNEB Head Office</strong> provided deep exposure to enterprise GIS infrastructure, critical utility network architecture, and large-scale operational systems. That experience shapes my approach to reliability, correctness, and systems thinking.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-start justify-center pt-8"
          >
            <HangingIdCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
