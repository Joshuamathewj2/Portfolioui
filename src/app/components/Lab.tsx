import { motion } from 'motion/react';
import { Terminal, Activity, Award, GitBranch, Share2, Binary, Fingerprint, Telescope } from 'lucide-react';

const researchHighlights = [
  {
    title: 'Adversarial Defense Research',
    id: 'ADV_DEF_01',
    description: 'Investigating high-entropy pattern recognition for prompt injection mitigation in large language models.',
    tag: 'SECURITY',
    status: 'ONGOING'
  },
  {
    title: 'Spatial Compute Engines',
    id: 'SPAT_COMP_02',
    description: 'Optimization of nearest-neighbor spatial queries for high-density GeoJSON environments.',
    tag: 'GIS',
    status: 'DORMANT'
  },
  {
    title: 'Neural Vision Pipelines',
    id: 'NEUR_VIS_03',
    description: 'Real-time fragment decomposition for image manipulation detection in forensic workflows.',
    tag: 'AI',
    status: 'ACTIVE'
  },
  {
    title: 'Distributed Orchestration',
    id: 'DIST_ORCH_04',
    description: 'Event-driven medication adherence pipelines using low-code orchestration engines (n8n).',
    tag: 'ARCH',
    status: 'COMPLETED'
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
            <span className="text-[#4F46E5] font-mono text-xs tracking-widest uppercase">Research // Intelligence Hub</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-syne font-bold tracking-tighter">The Laboratory</h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_0.4fr] gap-6">
          
          {/* Main Feed: Research Highlights */}
          <div className="grid md:grid-cols-2 gap-4">
            {researchHighlights.map((res, i) => (
              <motion.div
                key={res.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-8 bg-[#0D0D12] border border-[#27272A]/50 rounded group hover:border-[#4F46E5]/40 transition-all duration-500"
              >
                <div className="absolute top-4 right-4 font-mono text-[9px] text-[#71717A] tracking-widest">{res.id}</div>
                <div className="flex items-center gap-2 mb-6 text-[#4F46E5]">
                  <Fingerprint className="w-4 h-4 opacity-50" />
                  <span className="font-mono text-[10px] tracking-widest">{res.tag}</span>
                </div>
                <h3 className="text-xl font-syne font-bold mb-3 group-hover:text-white transition-colors">{res.title}</h3>
                <p className="text-[#71717A] text-sm leading-relaxed mb-6">{res.description}</p>
                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <div className={`w-1 h-1 rounded-full ${res.status === 'ACTIVE' || res.status === 'ONGOING' ? 'bg-green-500 animate-pulse' : 'bg-[#71717A]'}`} />
                  <span className={res.status === 'ACTIVE' || res.status === 'ONGOING' ? 'text-white' : 'text-[#71717A]'}>{res.status}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Side Panel: Intelligence Metrics */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-[#0D1117] border border-[#27272A]/50 rounded space-y-8"
            >
              <div className="flex items-center gap-2 text-[#4F46E5]">
                <Activity className="w-4 h-4" />
                <span className="font-mono text-xs tracking-widest uppercase">Systems Analytics</span>
              </div>

              <div className="space-y-6">
                {[
                  { label: 'GITHUB_NODES', value: '450+', icon: Binary },
                  { label: 'DEP_BRANCHES', value: '25+', icon: GitBranch },
                  { label: 'ARCH_AWARDS', value: '08', icon: Award }
                ].map((stat, i) => (
                  <div key={stat.label} className="flex justify-between items-end border-b border-[#27272A] pb-4">
                    <div className="space-y-1">
                      <div className="text-[9px] text-[#71717A] font-mono">{stat.label}</div>
                      <div className="text-2xl font-syne font-bold text-white tracking-widest">{stat.value}</div>
                    </div>
                    <stat.icon className="w-5 h-5 text-[#4F46E5] opacity-30" />
                  </div>
                ))}
              </div>

              {/* Terminal Intelligence Log */}
              <div className="bg-[#050505] p-4 rounded font-mono text-[10px] text-green-500/70 space-y-2 overflow-hidden border border-[#27272A]/50">
                <div className="flex gap-2">
                  <span className="text-[#4F46E5]">sys_log:</span>
                  <span>Scanning local repositories...</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[#4F46E5]">sys_log:</span>
                  <span>Neural weights loaded [NEUR_VIS_03]</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[#4F46E5]">sys_log:</span>
                  <span>Trust score: 98.4% (Integrity verified)</span>
                </div>
                <motion.div 
                  animate={{ opacity: [1, 0, 1] }} 
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-1 h-3 bg-green-500/70" 
                />
              </div>
            </motion.div>

            {/* Quick Actions Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-[#0D0D12] border border-[#27272A]/50 rounded flex justify-around group"
            >
              <button className="p-3 hover:text-[#4F46E5] transition-colors"><Telescope className="w-5 h-5" /></button>
              <button className="p-3 hover:text-[#4F46E5] transition-colors"><Binary className="w-5 h-5" /></button>
              <button className="p-3 hover:text-[#4F46E5] transition-colors"><Terminal className="w-5 h-5" /></button>
              <button className="p-3 hover:text-[#4F46E5] transition-colors"><Share2 className="w-5 h-5" /></button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

