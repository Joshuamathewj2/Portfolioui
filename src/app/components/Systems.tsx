import { motion } from 'motion/react';
import { ExternalLink, Github, Database, Shield, Globe, Activity, Cpu, Search } from 'lucide-react';

const projects = [
  {
    id: 'pixeltrust',
    title: 'PixelTrust',
    description: 'AI-powered image forensics pipeline. Detects manipulations through frequency domain decomposition and neural feature extraction.',
    tags: ['FastAPI', 'PyTorch', 'Computer Vision'],
    category: 'AI_FORENSICS',
    visual: 'thermal', // Custom visual style
    icon: Search,
    link: 'https://pixel-trust.vercel.app/',
    details: [
      'Metadata forgery detection engine',
      'Pixel-level error level analysis (ELA)',
      'Neural manipulation detection',
      'Explainable trust-score HUD'
    ]
  },
  {
    id: 'thrillcircuit',
    title: 'ThrillCircuit',
    description: 'Production-grade prompt injection detection engine for LLM protection. Neutralizes adversarial jailbreaks in sub-10ms.',
    tags: ['Python', 'Security', 'LLM Defense'],
    category: 'CYBER_SEC',
    visual: 'security',
    icon: Shield,
    link: 'https://github.com/Joshuamathewj2',
    details: [
      'Adversarial payload neutralization',
      'Multilingual obfuscation detection',
      'Stateless REST microservice',
      'High-entropy pattern matching'
    ]
  },
  {
    id: 'gis',
    title: 'GIS Evacuation System',
    description: 'Next-gen disaster intelligence platform for real-time shelter routing in degraded connectivity environments.',
    tags: ['Leaflet.js', 'GeoJSON', 'Spatial'],
    category: 'GEOSPATIAL',
    visual: 'map',
    icon: Globe,
    link: 'https://gis-smart-evacuation-system.vercel.app/',
    details: [
      'Nearest-neighbor spatial queries',
      'Offline-capable GeoJSON engine',
      'Dynamic pathfinding visualization',
      'Localized disaster node network'
    ]
  },
  {
    id: 'pillpulse',
    title: 'PillPulse',
    description: 'Autonomous medication adherence system. Prescription OCR extraction coupled with automated healthcare notification pipelines.',
    tags: ['Firebase', 'OCR', 'n8n'],
    category: 'HEALTHCARE_AI',
    visual: 'medical',
    icon: Activity,
    link: 'https://pill-pulse-172010-rhl4.vercel.app/',
    details: [
      'Computer vision prescription extraction',
      'Automated scheduling orchestration',
      'Multi-channel FCM delivery',
      'Caregiver oversight dashboard'
    ]
  },
  {
    id: 'mirage',
    title: 'MIRAGE',
    description: 'Adaptive reality platform using behavioral trust scoring and digital deception for threat intelligence.',
    tags: ['React Native', 'Supabase', 'AI'],
    category: 'BEHAVIORAL_SEC',
    visual: 'deception',
    icon: Cpu,
    link: 'https://github.com/Joshuamathewj2',
    details: [
      'Honeypot channel orchestration',
      'Dynamic UI trust-state mutation',
      'Real-time behavioral scoring',
      'Reality engine synchronization'
    ]
  },
  {
    id: 'debatrix',
    title: 'Debatrix',
    description: 'AI-powered debate and critical thinking platform. RAG pipelines for evidence-backed reasoning chains.',
    tags: ['Claude API', 'FastAPI', 'RAG'],
    category: 'SYSTEMS_AI',
    visual: 'logic',
    icon: Database,
    link: 'https://github.com/Joshuamathewj2',
    details: [
      'Structured reasoning orchestration',
      'Evidence-backed RAG integration',
      'Streaming argument evaluation',
      'Citation verification engine'
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
            <span className="text-[#4F46E5] font-mono text-xs tracking-widest uppercase">Registry // Production Systems</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-syne font-bold tracking-tighter">Engineering Modules</h2>
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

