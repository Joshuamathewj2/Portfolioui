'use client';
import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    org: 'Tamil Nadu Electricity Board (TNEB)',
    role: 'Intern — IT & GIS Infrastructure',
    period: 'Head Office, Chennai',
    points: [
      'Worked with enterprise GIS infrastructure for power distribution network management and spatial asset tracking across Tamil Nadu',
      'Observed large-scale network architecture and data center operations supporting critical utility services at state scale',
      'Studied IT systems management for public utilities — reliability engineering, redundancy design, operational monitoring'
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full" />
            <span className="text-[#4F46E5] font-mono text-xs tracking-widest uppercase">Career // Industry Experience</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-syne font-bold tracking-tighter">Work Experience</h2>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.org}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-10 bg-[#0A0A0E] border border-[#27272A]/50 rounded-lg group hover:border-[#4F46E5]/40 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Briefcase className="w-24 h-24 text-white" />
              </div>

              <div className="relative z-10 grid md:grid-cols-[240px_1fr] gap-12">
                <div>
                  <div className="inline-flex py-1 px-3 bg-[#4F46E5]/10 border border-[#4F46E5]/20 rounded-full text-[#38BDF8] font-mono text-[10px] tracking-widest uppercase mb-6">
                    {exp.period}
                  </div>
                  <h3 className="text-2xl font-syne font-bold text-white mb-2">{exp.role}</h3>
                  <div className="text-[#4F46E5] font-mono font-bold text-sm uppercase tracking-wider">{exp.org}</div>
                </div>

                <div className="space-y-6">
                  {exp.points.map((point, pi) => (
                    <div key={pi} className="flex gap-4 group/point">
                      <div className="mt-1.5 w-1.5 h-1.5 bg-[#4F46E5] rounded-full flex-shrink-0 group-hover/point:scale-125 transition-transform" />
                      <p className="text-lg text-[#A1A1AA] font-inter leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
