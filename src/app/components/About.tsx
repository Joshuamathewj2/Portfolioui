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
            <ul className="space-y-6">
              {[
                {
                  label: "Systems Core",
                  text: "Developing high-integrity architectures at LICET, focusing on the intersection of AI forensics and adversarial security."
                },
                {
                  label: "Industrial Edge",
                  text: "Hardened by TNEB Head Office internship, applying enterprise GIS and network reliability principles to modern software stacks."
                },
                {
                  label: "Optimization",
                  text: "Architecting sub-10ms security engines and geospatial systems optimized for high-throughput and degraded environments."
                }
              ].map((item, i) => (
                <li key={i} className="flex gap-4 group/item">
                  <div className="mt-1.5 w-1.5 h-1.5 bg-[#4F46E5] rounded-full flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300" />
                  <div>
                    <span className="text-[#4F46E5] font-mono text-[10px] tracking-widest uppercase block mb-1">{item.label}</span>
                    <p className="text-xl text-[#A1A1AA] leading-relaxed">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
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
