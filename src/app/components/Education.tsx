import { motion, useScroll } from 'motion/react';
import { GraduationCap, Award } from 'lucide-react';
import { useRef } from 'react';

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
    stats: { value: '94%', label: '/ CBSE Board' }
  },
  {
    degree: 'Secondary School Examination (Class X)',
    school: 'DAV Boys Senior Secondary School, Gopalapuram',
    detail: 'CBSE · Academic Excellence',
    stats: { value: '96%', label: '/ CBSE Board' }
  }
];

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="education" className="relative py-32 px-6 overflow-hidden bg-[#050505]">
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        
        {/* Academic Timeline Section Header */}
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

        {/* Academic Timeline */}
        <div className="relative z-10 space-y-16">
          <motion.div 
            className="absolute left-8 md:left-[3.75rem] top-4 bottom-4 w-px bg-gradient-to-b from-[#4F46E5] via-[#4F46E5]/20 to-transparent z-0 hidden md:block" 
            style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
          />

          {education.map((edu, i) => (
            <motion.div
              key={edu.school + '-' + edu.degree}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-12 md:pl-32 group"
            >
              {/* Connector Dot */}
              <div className="absolute left-6 md:left-[3.5rem] top-1/2 -translate-y-1/2 flex items-center justify-center z-10">
                <div className="w-4 h-4 bg-[#050505] border-2 border-[#38BDF8] rounded-full group-hover:scale-125 transition-transform duration-500 shadow-[0_0_12px_#38BDF8] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full" />
                </div>
                <div className="absolute w-6 h-6 rounded-full border border-[#4F46E5]/40 animate-ping opacity-70 pointer-events-none" />
              </div>

              {/* Card */}
              <div className="p-8 bg-[#0D0D12] border border-[#27272A]/50 rounded-lg hover:border-[#4F46E5]/40 transition-all duration-500 overflow-hidden relative cinematic-shadow">
                <div className="relative z-10 grid md:grid-cols-[1fr_220px] gap-8 items-center">
                  <div className="flex gap-6 items-start">
                    <div className="p-3 bg-[#16161D] rounded border border-[#27272A] group-hover:border-[#4F46E5]/50 transition-colors shrink-0">
                      <GraduationCap className="w-6 h-6 text-[#4F46E5]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-syne font-bold text-white mb-2 group-hover:text-[#4F46E5] transition-colors">{edu.degree}</h3>
                      <div className="text-[#A1A1AA] font-mono text-xs tracking-widest mb-2 font-bold">{edu.school}</div>
                      <div className="text-[#71717A] text-xs font-mono">{edu.detail}</div>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end text-left md:text-right border-t md:border-t-0 md:border-l border-[#27272A] pt-6 md:pt-0 md:pl-8">
                    <div className="text-5xl font-syne font-bold text-white tracking-tighter glow-text">
                      {edu.stats.value}
                      <span className="text-xl text-[#71717A] ml-2">{edu.stats.label}</span>
                    </div>
                    <div className="text-[10px] text-[#4F46E5] font-mono tracking-[0.2em] uppercase mt-2 font-bold">
                      ACADEMIC_ACHIEVEMENT
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-32 h-full opacity-[0.03] pointer-events-none overflow-hidden">
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,white_10px,white_11px)]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Divider */}
        <div className="my-24 border-t border-[#27272A]/50 relative z-10">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-6 py-2 border border-[#27272A]/50 rounded-full font-mono text-[10px] text-[#71717A] tracking-[0.2em] uppercase">
            SEC_INTEL // EXTRA_CURRICULAR
          </div>
        </div>

        {/* Extra-Curricular Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 space-y-4 relative z-10"
        >
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full" />
            <span className="text-[#4F46E5] font-mono text-xs tracking-widest uppercase">Cultural Achievements // Extracurricular Logs</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-syne font-bold tracking-tighter">My Cultural Recognition</h2>
        </motion.div>

        {/* Vertically Stacked Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          
          {/* Card 1: Year II Achievement (Channel Surfing) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col bg-[#0D0D12] border border-[#27272A]/50 rounded-lg hover:border-[#4F46E5]/40 transition-all duration-500 overflow-hidden relative cinematic-shadow group"
          >
            {/* Top Area (Picture) */}
            <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-[#27272A]/50 bg-[#0A0A0E] group-hover:border-[#4F46E5]/30 transition-colors duration-500">
              <img
                src="/culturals2.png"
                alt="ENGINIEA 2025 // Channel Surfing"
                className="w-full h-full object-cover object-center block group-hover:scale-105 transition-transform duration-700 ease-out"
                draggable={false}
              />
              <div className="absolute inset-0 bg-[#050505]/20 group-hover:bg-transparent transition-all duration-500" />
            </div>

            {/* Bottom Area (Description) */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex py-1 px-3 bg-[#4F46E5]/10 border border-[#4F46E5]/20 rounded-sm text-[#38BDF8] font-mono text-[9px] tracking-widest uppercase">
                  Second Year // Cultural Collective
                </div>
                <h3 className="text-2xl font-syne font-bold text-white group-hover:text-[#4F46E5] transition-colors leading-snug">
                  ENGINIEA 2025 // Channel Surfing
                </h3>
                <div className="text-[#38BDF8] font-mono text-[10px] tracking-widest font-bold uppercase">
                  3rd Place — Lead Performer (Bear Grylls Simulation)
                </div>
                <div className="text-[#A1A1AA] font-mono text-[10px] tracking-wider uppercase font-semibold">
                  Improvisational Stage Satire & Performance
                </div>
                <p className="text-xs text-[#71717A] font-mono leading-relaxed">
                  Commanded the stage as the lead actor, delivering a high-energy, real-time satirical performance mimicking survivalist protocols under rapid, unpredictable multi-channel shifts.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Year I Achievement (Spin a Yarn) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col bg-[#0D0D12] border border-[#27272A]/50 rounded-lg hover:border-[#4F46E5]/40 transition-all duration-500 overflow-hidden relative cinematic-shadow group"
          >
            {/* Top Area (Picture) */}
            <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-[#27272A]/50 bg-[#0A0A0E] group-hover:border-[#4F46E5]/30 transition-colors duration-500">
              <img
                src="/culturals1.png"
                alt="ENGINIEA 2024 // Spin a Yarn"
                className="w-full h-full object-cover object-center block group-hover:scale-105 transition-transform duration-700 ease-out"
                draggable={false}
              />
              <div className="absolute inset-0 bg-[#050505]/20 group-hover:bg-transparent transition-all duration-500" />
            </div>

            {/* Bottom Area (Description) */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex py-1 px-3 bg-[#4F46E5]/10 border border-[#4F46E5]/20 rounded-sm text-[#38BDF8] font-mono text-[9px] tracking-widest uppercase">
                  First Year // Cultural Collective
                </div>
                <h3 className="text-2xl font-syne font-bold text-white group-hover:text-[#4F46E5] transition-colors leading-snug">
                  ENGINIEA 2024 // Spin a Yarn
                </h3>
                <div className="text-[#38BDF8] font-mono text-[10px] tracking-widest font-bold uppercase">
                  1st Place — Inter-Departmental Championship
                </div>
                <div className="text-[#A1A1AA] font-mono text-[10px] tracking-wider uppercase font-semibold">
                  English Composition & Storytelling
                </div>
                <p className="text-xs text-[#71717A] font-mono leading-relaxed">
                  Secured the top position out of all competing college departments by engineering a cohesive, high-speed narrative framework under strict algorithmic improvisation rules.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Academic & Skills Milestone (Graphics Topper) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col bg-[#0D0D12] border border-[#27272A]/50 rounded-lg hover:border-[#4F46E5]/40 transition-all duration-500 overflow-hidden relative cinematic-shadow group"
          >
            {/* Top Area (Picture) */}
            <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-[#27272A]/50 bg-[#0A0A0E] group-hover:border-[#4F46E5]/30 transition-colors duration-500">
              <img
                src="/culturals3.png"
                alt="Engineering Graphics Topper // 100/100"
                className="w-full h-full object-cover object-center block group-hover:scale-105 transition-transform duration-700 ease-out"
                draggable={false}
              />
              <div className="absolute inset-0 bg-[#050505]/20 group-hover:bg-transparent transition-all duration-500" />
            </div>

            {/* Bottom Area (Description) */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="inline-flex py-1 px-3 bg-[#4F46E5]/10 border border-[#4F46E5]/20 rounded-sm text-[#38BDF8] font-mono text-[9px] tracking-widest uppercase">
                  Academic Milestone // Graphics Topper
                </div>
                <h3 className="text-2xl font-syne font-bold text-white group-hover:text-[#4F46E5] transition-colors leading-snug">
                  Engineering Graphics Topper // 100/100
                </h3>
                <div className="text-[#38BDF8] font-mono text-[10px] tracking-widest font-bold uppercase">
                  DAV Boys Senior Secondary School, Gopalapuram
                </div>
                <div className="text-[#A1A1AA] font-mono text-[10px] tracking-wider uppercase font-semibold">
                  Perfect Score Achievement
                </div>
                <p className="text-xs text-[#71717A] font-mono leading-relaxed">
                  Achieved a perfect score of 100/100 in Engineering Drawing/Graphics, securing the school topper designation within a highly competitive cohort.
                </p>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
