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
  { rank: '01', title: 'Top 10 — CTRL+ALT+HACK 2.0', detail: '50+ competing teams · LICET, Chennai' },
  { rank: '02', title: 'Vice President, Literary Club', detail: 'Coordinated inter-college events · 20+ member team' },
  { rank: '03', title: 'Startup Pitch Participant', detail: 'Cambridge Entrepreneurship Bootcamp' },
  { rank: '04', title: 'Winner — Spin a Yarn Competition', detail: 'Inter-college literary event' },
  { rank: '05', title: '3rd Place — Channel Surfing', detail: 'Inter-college creative competition' }
];

export default function Recognition() {
  return (
    <section id="recognition" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
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
