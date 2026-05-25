'use client';
import { motion } from 'motion/react';

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
              Second-year Computer Science Engineering student at <strong className="text-white">Loyola ICAM College of Engineering and Technology</strong>, operating at the intersection of AI systems, cybersecurity, and production infrastructure.
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
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[
              { label: 'Institution', value: 'Loyola ICAM', sub: 'CSE · Expected 2028' },
              { label: 'Academic Standing', value: '8.9 / 10.0 CGPA', sub: 'Consistent excellence' },
              { label: 'Focus Areas', value: 'AI · Security', sub: 'Backend · GIS' },
              { label: 'Location', value: 'Chennai', sub: 'Remote & relocation' }
            ].map((meta) => (
              <div key={meta.label} className="p-8 bg-[#0D0D12] border border-[#27272A]/50 rounded-lg group hover:border-[#4F46E5]/40 transition-all duration-500">
                <div className="text-[10px] text-[#4F46E5] font-mono tracking-widest uppercase mb-4">{meta.label}</div>
                <div className="text-xl font-syne font-bold text-white mb-1">{meta.value}</div>
                <div className="text-sm text-[#71717A] font-inter">{meta.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
