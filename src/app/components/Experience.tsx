'use client';
import { motion, useScroll } from 'motion/react';
import { Briefcase } from 'lucide-react';
import { useRef } from 'react';

const experiences = [
  {
    org: 'TAMIL NADU ELECTRICITY BOARD (TNEB)',
    role: 'Intern — IT & GIS Infrastructure',
    period: 'HEAD OFFICE, CHENNAI',
    session: 'TAMIL_INTEL',
    images: ['/tnebi.png'],
    points: [
      'Industrial exposure to Data Center Operations, Network Architectures, and Enterprise Hardware systems supporting state-level utility infrastructure',
      'Studied Web Applications and LT Billing Systems architecture for large-scale public service management',
      'Deep dive into Geographical Information Systems (GIS) for power distribution network management and spatial asset tracking',
      'Analysis of Sub Station Monitoring Systems and real-time reliability engineering in critical infrastructure',
      'Observed large-scale network redundancy and redundancy design supporting critical utility services at state scale'
    ]
  },
  {
    org: 'Secure Network Solutions (SNS) India Pvt Ltd',
    role: 'Cyber Security & Cloud Infrastructure Intern',
    period: 'HYBRID PIPELINE // SECURE_INTEL',
    session: 'SECURE_INTEL',
    images: ['/snsi.png', '/snsi2.png'],
    points: [
      'Engineered an enterprise Next-Generation Firewall (NGFW) architecture on AWS from scratch, deploying a Check Point Security Management Server and CloudGuard Gateway.',
      'Troubleshot system initialization by dropping into Linux Expert Mode via CLI to bypass config wizard lockouts.',
      'Configured AWS Security Groups and network routing protocols to establish secure inter-appliance communications.',
      'Resolved Secure Internal Communication (SIC) trust mismatches to synchronize remote gateways inside Check Point SmartConsole.',
      'Provisioned Gateway network objects, deployed stateful Access Control policies, and enforced granular default-drop rulesets.',
      'Evaluated AWS Network Firewall domain-list constraints and local iptables rule targets to sandbox malicious endpoints.',
      'Analyzed corporate data loss prevention (DLP) mechanics, mapping out network-level blocks for LLMs (ChatGPT/Claude) to mitigate enterprise data leaks.'
    ]
  }
];

interface TerminalPointProps {
  text: string;
  delay: number;
}

function TerminalPoint({ text, delay }: TerminalPointProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex gap-4 group/point font-mono"
    >
      <span className="text-[#4F46E5] font-bold">▸</span>
      <p className="text-lg text-[#A1A1AA] leading-relaxed">
        <span className="text-[#38BDF8]">$</span> {text}
      </p>
    </motion.div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="experience" className="relative py-32 px-6 overflow-hidden bg-[#050505]">
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full" />
            <span className="text-[#4F46E5] font-mono text-xs tracking-widest uppercase">System // Execution Logs</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-syne font-bold tracking-tighter">Experience</h2>
        </motion.div>

        <div className="relative z-10 space-y-16">
          {/* Vertical Connecting Line */}
          <motion.div 
            className="absolute left-8 md:left-[3.75rem] top-4 bottom-4 w-px bg-gradient-to-b from-[#4F46E5] via-[#4F46E5]/20 to-transparent z-0 hidden md:block" 
            style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.org}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-12 md:pl-32 group"
            >
              {/* Timeline Connector Dot / Glowing Node */}
              <div className="absolute left-6 md:left-[3.5rem] top-12 flex items-center justify-center z-10">
                <div className="w-4 h-4 bg-[#050505] border-2 border-[#38BDF8] rounded-full group-hover:scale-125 transition-transform duration-500 shadow-[0_0_12px_#38BDF8] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full" />
                </div>
                <div className="absolute w-6 h-6 rounded-full border border-[#4F46E5]/40 animate-ping opacity-70 pointer-events-none" />
              </div>

              <div className="p-1 bg-gradient-to-b from-[#27272A]/50 to-transparent rounded-lg overflow-hidden relative z-10">
                <div className="bg-[#0A0A0E] p-10 rounded-[7px]">
                  {/* Terminal Header */}
                  <div className="flex items-center gap-2 mb-8 border-b border-[#27272A]/50 pb-4">
                    <div className="w-2 h-2 rounded-full bg-[#EF4444]/40" />
                    <div className="w-2 h-2 rounded-full bg-[#F59E0B]/40" />
                    <div className="w-2 h-2 rounded-full bg-[#10B981]/40" />
                    <div className="ml-4 font-mono text-[10px] text-[#71717A] tracking-widest uppercase">
                      SESSION: {exp.session}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-[1fr_1.8fr] gap-12">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="inline-flex py-1 px-3 bg-[#4F46E5]/10 border border-[#4F46E5]/20 rounded-sm text-[#38BDF8] font-mono text-[10px] tracking-widest uppercase">
                          {exp.period}
                        </div>
                        <h3 className="text-3xl font-syne font-bold text-white leading-tight">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-[#4F46E5] font-mono font-bold text-sm uppercase tracking-wider">
                          <span className="text-[#71717A]">@</span> {exp.org}
                        </div>
                      </div>

                      {/* Image container on the left column under the text layout */}
                      {exp.images && exp.images.length > 0 && (
                        <div className="flex flex-col gap-4 mt-6">
                          {exp.images.map((imgSrc, imgIdx) => (
                            <div key={imgIdx} className="rounded-md overflow-hidden border border-[#4F46E5]/20 bg-[#16161D]/50 shadow-sm max-w-full">
                              <img
                                src={imgSrc}
                                alt={`${exp.org} Screenshot ${imgIdx + 1}`}
                                className="w-full h-auto max-w-full block object-cover"
                                draggable={false}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {exp.points.map((point, pi) => (
                        <TerminalPoint key={pi} text={point} delay={0.2 + (pi * 0.1)} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Background Accent */}
                <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                  <Briefcase className="w-48 h-48 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

