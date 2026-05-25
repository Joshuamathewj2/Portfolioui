'use client';
import { motion } from 'motion/react';
import { GraduationCap } from 'lucide-react';

const education = [
  {
    degree: 'B.E. Computer Science & Engineering',
    school: 'Loyola ICAM College of Engineering and Technology',
    detail: 'Anna University · Expected 2028',
    stats: { value: '8.9', label: '/ 10.0 CGPA' }
  },
  {
    degree: 'AISSCE (Class XII)',
    school: 'DAV Boys Senior Secondary School, Gopalapuram',
    detail: 'CBSE · Science Stream',
    stats: { value: '92', label: '% Percentage' }
  },
  {
    degree: 'Secondary School Examination (Class X)',
    school: 'DAV Boys Senior Secondary School, Gopalapuram',
    detail: 'CBSE · Academic Excellence',
    stats: { value: '96', label: '% Percentage' }
  }
];

export default function Education() {
  return (
    <section id="education" className="relative py-32 px-6 overflow-hidden bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full" />
            <span className="text-[#4F46E5] font-mono text-xs tracking-widest uppercase">Academic // Educational History</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-syne font-bold tracking-tighter">Education</h2>
        </motion.div>

        <div className="grid gap-12">
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-10 bg-[#0D0D12] border border-[#27272A]/50 rounded-lg hover:border-[#4F46E5]/40 transition-all duration-500 overflow-hidden"
            >
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
                <div className="flex gap-8 items-start">
                  <div className="mt-1 p-3 bg-[#16161D] rounded border border-[#27272A] group-hover:border-[#4F46E5]/50 transition-colors">
                    <GraduationCap className="w-6 h-6 text-[#4F46E5]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-syne font-bold text-white mb-2">{edu.degree}</h3>
                    <div className="text-[#4F46E5] font-mono text-sm uppercase tracking-wider mb-2">{edu.school}</div>
                    <div className="text-[#71717A] text-sm font-mono">{edu.detail}</div>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <div className="text-5xl font-syne font-bold text-white tracking-tighter">
                    {edu.stats.value}
                    <span className="text-xl text-[#71717A] ml-2">{edu.stats.label}</span>
                  </div>
                  <div className="text-[10px] text-[#4F46E5] font-mono tracking-[0.2em] uppercase mt-2">Academic Standing</div>
                </div>
              </div>

              {/* Cinematic Corner Accents */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-10 transition-opacity">
                <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-[#4F46E5] to-transparent" />
                <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-[#4F46E5] to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
