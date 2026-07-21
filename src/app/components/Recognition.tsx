'use client';
import { motion } from 'motion/react';
import { Award, CheckCircle2, Trophy } from 'lucide-react';

const certifications = [
  { title: 'Ethical Hacking', issuer: 'NPTEL · IIT Certified' },
  { title: 'Programming in Java — Gold Elite', issuer: 'NPTEL · IIT Madras' },
  { title: 'Problem Solving Through Programming in C — Elite', issuer: 'NPTEL · IIT Kanpur' },
  { title: 'Entrepreneurial Activity Bootcamp', issuer: 'Cambridge University Press' }
];

const achievements = [
  { rank: '01', title: 'Top 10 — CTRL+ALT+HACK 2.0', detail: '30+ Technical Events · LICET, Chennai' },
  { rank: '02', title: 'Vice President, Literary Club', detail: 'Coordinated inter-college events · 20+ member team' },
  { rank: '03', title: 'Startup Pitch Participant', detail: 'Cambridge Entrepreneurship Bootcamp' },
  { rank: '04', title: '1st Place — Spin a Yarn Competition', detail: 'Inter-college literary event' },
  { rank: '05', title: '3rd Place — Channel Surfing', detail: 'Inter-college creative competition' }
];

export default function Recognition() {
  return (
    <section id="recognition" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
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

        {/* Section Divider */}
        <div className="my-24 border-t border-[#27272A]/50 relative z-10">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-6 py-2 border border-[#27272A]/50 rounded-full font-mono text-[10px] text-[#71717A] tracking-[0.2em] uppercase">
            SEC_INTEL // ACADEMIC_HONORS
          </div>
        </div>

        {/* Certifications & General Achievements Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full" />
            <span className="text-[#4F46E5] font-mono text-xs tracking-widest uppercase">Recognition // Credentials & Honors</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-syne font-bold tracking-tighter">Certifications & Achievements</h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16">
          {/* Certifications Grid */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 border-b border-[#27272A] pb-4">
              <CheckCircle2 className="w-5 h-5 text-[#4F46E5]" />
              <h3 className="font-syne font-bold text-xl uppercase tracking-widest">Certifications</h3>
            </div>
            <div className="grid gap-4">
              {certifications.map((cert) => (
                <div key={cert.title} className="p-6 bg-[#0D0D12] border border-[#27272A]/50 rounded-lg group hover:border-[#4F46E5]/40 transition-colors">
                  <h4 className="text-white font-bold mb-2 group-hover:text-[#38BDF8] transition-colors">{cert.title}</h4>
                  <div className="text-[#71717A] text-[10px] font-mono tracking-widest uppercase">{cert.issuer}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements List */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 border-b border-[#27272A] pb-4">
              <Trophy className="w-5 h-5 text-[#4F46E5]" />
              <h3 className="font-syne font-bold text-xl uppercase tracking-widest">Achievements</h3>
            </div>
            <div className="space-y-3">
              {achievements.map((ach) => (
                <div key={ach.rank} className="flex items-start gap-6 p-6 bg-[#0D0D12] border border-[#27272A]/50 rounded-lg group hover:border-[#4F46E5]/40 transition-all duration-500">
                  <div className="font-syne font-bold text-2xl text-[#4F46E5]/40 group-hover:text-[#4F46E5] transition-colors">
                    {ach.rank}
                  </div>
                  <div>
                    <h4 className="text-white font-bold group-hover:text-white transition-colors">{ach.title}</h4>
                    <p className="text-[#71717A] text-sm mt-1">{ach.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
