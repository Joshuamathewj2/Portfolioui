import { motion } from 'motion/react';
import { Code2, Server, Layout, Brain, Cpu, Terminal, Database, Shield, Globe } from 'lucide-react';

const subsystems = [
  {
    title: 'Languages',
    icon: Terminal,
    skills: ['C', 'Java', 'Python', 'JavaScript', 'TypeScript', 'SQL'],
    description: 'Core computation & logic'
  },
  {
    title: 'Frontend',
    icon: Layout,
    skills: ['React', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3'],
    description: 'User interface systems'
  },
  {
    title: 'Backend & APIs',
    icon: Server,
    skills: ['FastAPI', 'Flask', 'REST', 'n8n'],
    description: 'Server-side architecture'
  },
  {
    title: 'AI / ML',
    icon: Brain,
    skills: ['Computer Vision', 'OCR', 'RAG Systems', 'Prompt Analysis', 'LLM Integration'],
    description: 'Intelligent processing'
  },
  {
    title: 'Platforms & Tools',
    icon: Cpu,
    skills: ['Git', 'GitHub', 'Docker', 'Firebase', 'Vercel'],
    description: 'Development environment'
  },
  {
    title: 'Core CS',
    icon: Database,
    skills: ['DSA', 'OOP', 'DBMS', 'OS'],
    description: 'Computer Science foundations'
  }
];

export default function Stack() {
  return (
    <section id="stack" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full" />
            <span className="text-[#4F46E5] font-mono text-xs tracking-widest uppercase">Subsystem // Control Panel</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-syne font-bold tracking-tighter">Engineering Toolkit</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#27272A]/30 border border-[#27272A]/50 rounded-lg overflow-hidden">
          {subsystems.map((sub, index) => (
            <motion.div
              key={sub.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="relative p-10 bg-[#0A0A0E] group hover:bg-[#0D0D12] transition-colors"
            >
              {/* Background Glow Effect */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#4F46E5]/0 to-[#4F46E5]/0 group-hover:from-[#4F46E5]/5 group-hover:to-transparent transition-all duration-500" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-[#16161D] rounded border border-[#27272A] group-hover:border-[#4F46E5]/50 transition-colors">
                    <sub.icon className="w-4 h-4 text-[#4F46E5]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-syne font-bold group-hover:text-white transition-colors">{sub.title}</h3>
                  <p className="text-[#71717A] text-xs font-mono uppercase tracking-tighter">{sub.description}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {sub.skills.map(skill => (
                    <span 
                      key={skill}
                      className="px-2 py-1 bg-[#16161D] text-[#A1A1AA] text-[10px] font-mono border border-[#27272A] rounded group-hover:border-[#4F46E5]/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Fractional Corner Lighting */}
              <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
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

