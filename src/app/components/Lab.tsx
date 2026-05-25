import { motion } from 'motion/react';
import { Terminal, Activity, Award, GitBranch, Share2, Binary, Fingerprint, Telescope } from 'lucide-react';

const experiments = [
  {
    title: 'Procedural Shaders',
    tag: 'VISUALS',
    description: 'Exploration of GPU-accelerated procedural textures and fragment shader compositions for immersive interfaces.',
    status: 'ACTIVE'
  },
  {
    title: 'AI Visualization',
    tag: 'AI',
    description: 'Design concepts for real-time visualization of LLM inference streams and reasoning chain structures.',
    status: 'ONGOING'
  },
  {
    title: 'GIS Spatial Network',
    tag: 'SPATIAL',
    description: 'Experimental network analysis for routing algorithms in high-density GeoJSON environments.',
    status: 'PROTOTYPE'
  },
  {
    title: 'Architecture Motifs',
    tag: 'SYSTEMS',
    description: 'Study of modular interaction patterns and state orchestration in complex frontend ecosystems.',
    status: 'RESEARCH'
  }
];

export default function Lab() {
  return (
    <section id="lab" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full" />
            <span className="text-[#4F46E5] font-mono text-xs tracking-widest uppercase">Registry // Prototypes & Research</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-syne font-bold tracking-tighter">The Laboratory</h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
          
          {/* Main Feed: Experiments */}
          <div className="grid md:grid-cols-2 gap-4">
            {experiments.map((res, i) => (
              <motion.div
                key={res.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-8 bg-[#0D0D12] border border-[#27272A]/50 rounded group hover:border-[#4F46E5]/40 transition-all duration-500"
              >
                <div className="flex items-center gap-2 mb-6 text-[#4F46E5]">
                  <Fingerprint className="w-4 h-4 opacity-50" />
                  <span className="font-mono text-[10px] tracking-widest">{res.tag}</span>
                </div>
                <h3 className="text-xl font-syne font-bold mb-3 group-hover:text-white transition-colors">{res.title}</h3>
                <p className="text-[#71717A] text-sm leading-relaxed mb-6">{res.description}</p>
                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <div className={`w-1 h-1 rounded-full ${res.status === 'ACTIVE' || res.status === 'ONGOING' ? 'bg-[#38BDF8] animate-pulse' : 'bg-[#71717A]'}`} />
                  <span className={res.status === 'ACTIVE' || res.status === 'ONGOING' ? 'text-white' : 'text-[#71717A]'}>{res.status}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Side Panel: Focus & Objectives */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-[#0D1117] border border-[#27272A]/50 rounded space-y-8"
            >
              <div className="flex items-center gap-2 text-[#4F46E5]">
                <Telescope className="w-4 h-4" />
                <span className="font-mono text-xs tracking-widest uppercase">Exploration Focus</span>
              </div>

              <div className="space-y-6">
                {[
                  { label: 'AI_SYSTEMS', value: 'Adversarial Security', detail: 'LLM Robustness Research' },
                  { label: 'GIS_CORE', value: 'Evacuation Systems', detail: 'Spatial Network Optimization' },
                  { label: 'INFRA', value: 'Distributed Pipelines', detail: 'Reliability Engineering' }
                ].map((stat) => (
                  <div key={stat.label} className="space-y-2 border-b border-[#27272A] pb-4 last:border-0">
                    <div className="text-[9px] text-[#4F46E5] font-mono tracking-widest">{stat.label}</div>
                    <div className="text-lg font-syne font-bold text-white uppercase">{stat.value}</div>
                    <div className="text-[10px] text-[#71717A] font-mono">{stat.detail}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recognition Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-[#0D0D12] border border-[#27272A]/50 rounded space-y-4"
            >
              <div className="flex items-center gap-2 text-[#4F46E5]">
                <Award className="w-4 h-4" />
                <span className="font-mono text-xs tracking-widest uppercase">Recognition</span>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-bold text-white">Top 10 — CTRL+ALT+HACK 2.0</div>
                <div className="text-[10px] text-[#71717A] leading-relaxed">50+ competing teams at Loyola ICAM College of Engineering.</div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}


