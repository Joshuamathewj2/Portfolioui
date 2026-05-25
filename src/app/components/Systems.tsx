import { motion } from 'motion/react';
import { ExternalLink, Github, Database, Shield, Globe, Activity, Cpu, Search } from 'lucide-react';

const projects = [
  {
    id: 'pixeltrust',
    title: 'PixelTrust',
    description: 'AI-powered image authenticity verification. Detects manipulated and AI-generated images through layered frequency analysis and pixel-level feature extraction.',
    tags: ['React', 'FastAPI', 'Python', 'CV'],
    category: 'AI FORENSICS',
    visual: 'thermal',
    icon: Search,
    link: 'https://pixel-trust.vercel.app/',
    details: [
      'Decoupled React + FastAPI architecture with async request handling',
      'Pluggable trust-score pipeline with independent detection modules',
      'Three-stage decomposition: metadata, frequency domain, and neural features',
      'Sub-2s inference latency on production-grade imaging'
    ]
  },
  {
    id: 'thrillcircuit',
    title: 'ThrillCircuit',
    description: 'Production-grade prompt injection detection engine. Protects LLM applications from jailbreaks and adversarial attacks with sub-10ms latency.',
    tags: ['Python', 'Flask', 'Heuristics'],
    category: 'LLM SECURITY',
    visual: 'security',
    icon: Shield,
    link: 'https://github.com/Joshuamathewj2',
    details: [
      'Multi-layer analysis: regex pattern matching and entropy scoring',
      'Detects encoded attacks and obfuscated cross-lingual payloads',
      'Stateless microservice designed for middleware integration',
      'Optimized heuristic evaluation for high-throughput environments'
    ]
  },
  {
    id: 'gis',
    title: 'GIS Evacuation',
    description: 'Emergency evacuation platform. Real-time nearest-neighbor shelter identification using structured GeoJSON datasets optimized for degraded connectivity.',
    tags: ['JS', 'Leaflet.js', 'GeoJSON'],
    category: 'GEOSPATIAL',
    visual: 'map',
    icon: Globe,
    link: 'https://gis-smart-evacuation-system.vercel.app/',
    details: [
      'Client-side nearest-neighbor search for backend-independent operation',
      'Dynamic route rendering via Leaflet.js with live tracking',
      'Low-latency tile loading strategies for unreliable networks',
      'Structured GeoJSON optimization for massive spatial datasets'
    ]
  },
  {
    id: 'pillpulse',
    title: 'PillPulse',
    description: 'Medication adherence automation. Prescription OCR extraction coupled with asynchronous caregiver notification pipelines via Firebase.',
    tags: ['React', 'Flash', 'OCR', 'n8n'],
    category: 'HEALTHCARE AI',
    visual: 'medical',
    icon: Activity,
    link: 'https://pill-pulse-172010-rhl4.vercel.app/',
    details: [
      'End-to-end workflow: OCR parsing to automated scheduling',
      'n8n orchestration with Firebase Cloud Messaging notifications',
      'Asynchronous delivery pipelines for high-reliability updates',
      'Top 10 Finalist — CTRL+ALT+HACK 2.0 (50+ teams)'
    ]
  }
];

export default function Systems() {
  return (
    <section id="systems" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full" />
            <span className="text-[#4F46E5] font-mono text-xs tracking-widest uppercase">Deployed // Production Systems</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-syne font-bold tracking-tighter">Selected Work</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-[#0D0D12] border border-[#27272A]/50 rounded-lg overflow-hidden cinematic-shadow hover:border-[#4F46E5]/40 transition-all duration-500"
            >
              {/* Dynamic Visual Identity Backgrounds */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20 group-hover:opacity-40 transition-opacity">
                {project.visual === 'thermal' && (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.3),transparent_70%)] animate-pulse" />
                )}
                {project.visual === 'security' && (
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(239,68,68,0.05)_20px,rgba(239,68,68,0.05)_40px)]" />
                )}
                {project.visual === 'map' && (
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#38BDF8 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
                )}
                {project.visual === 'medical' && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#EC4899]/10 via-transparent to-transparent" />
                )}
              </div>

              {/* Project Card Content */}
              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-3 bg-[#16161D] rounded-lg border border-[#27272A]">
                    <project.icon className="w-5 h-5 text-[#4F46E5]" />
                  </div>
                  <div className="flex gap-2">
                    <a href={project.link} target="_blank" className="p-2 text-[#71717A] hover:text-white transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                    <a href={project.link} target="_blank" className="p-2 text-[#71717A] hover:text-white transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  <div className="font-mono text-[10px] text-[#4F46E5] tracking-[0.2em]">{project.category}</div>
                  <h3 className="text-2xl font-syne font-bold group-hover:text-white transition-colors">{project.title}</h3>
                  <p className="text-[#A1A1AA] text-sm leading-relaxed font-inter">{project.description}</p>
                </div>

                {/* Technical Architecture Preview (Hover) */}
                <div className="space-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0 h-0 group-hover:h-auto overflow-hidden">
                  <div className="font-mono text-[9px] text-[#71717A] mb-2 uppercase border-b border-[#27272A] pb-2">System Architecture // Specs</div>
                  {project.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-[#A1A1AA] font-mono">
                      <div className="w-1 h-1 bg-[#4F46E5] rounded-full" />
                      {detail}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mt-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono font-bold px-2 py-1 bg-[#16161D] text-[#71717A] rounded border border-[#27272A]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cinematic Scan Line Effect on Hover */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px bg-[#4F46E5]/40 opacity-0 group-hover:opacity-100 z-20 pointer-events-none"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

