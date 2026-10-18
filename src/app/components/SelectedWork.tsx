import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { galleryProjects, GalleryItem, projectSlug, shortTitle, subTitle } from '../data/projects';

const FEATURED = ['mirage', 'analyser-agent', 'resq', 'pixeltrust'];

const chapters = [
  { no: '01', label: 'About', to: '/about', blurb: 'Profile, focus areas and the person behind the systems.' },
  { no: '02', label: 'Stack', to: '/stack', blurb: 'Languages, frameworks and tooling in active rotation.' },
  { no: '03', label: 'Experience', to: '/experience', blurb: 'Industry internships and academic track record.' },
  { no: '04', label: 'Recognition', to: '/recognition', blurb: 'Certifications, hackathon finishes and cultural achievements.' },
];

function FeatureCard({ item, index }: { item: GalleryItem; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.12 }}
      className={index % 2 === 1 ? 'md:mt-32' : ''}
    >
      <Link
        ref={ref}
        to={`/projects?project=${projectSlug(item)}`}
        className="group block no-underline text-inherit"
      >
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[#0D0D12]">
          <motion.img
            src={item.url}
            alt={shortTitle(item)}
            loading="lazy"
            style={{ y: imageY }}
            className="absolute inset-0 w-full h-[124%] -top-[12%] object-cover scale-100 group-hover:scale-[1.06] transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-screen"
            style={{ background: `radial-gradient(ellipse at 50% 120%, ${item.glow ?? 'rgba(79,70,229,0.4)'}, transparent 65%)` }}
          />

          <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
            <span className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 font-mono text-[10px] tracking-[0.2em] uppercase text-white/80">
              {item.category}
            </span>
            <span className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="font-mono text-xs text-white/50 mb-2">{String(index + 1).padStart(2, '0')}</div>
            <h3 className="font-syne font-bold text-3xl md:text-5xl tracking-tighter text-white leading-none">
              {shortTitle(item)}
            </h3>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-[1fr_auto] gap-6 items-start">
          <p className="text-[#A1A1AA] font-inter leading-relaxed">{subTitle(item)}</p>
          <div className="flex flex-wrap justify-end gap-1.5 max-w-[180px]">
            {item.tags?.slice(0, 3).map((t) => (
              <span key={t} className="font-mono text-[10px] px-2 py-1 rounded-full border border-white/10 text-[#71717A]">
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function SelectedWork() {
  const featured = FEATURED.map((slug) => galleryProjects.find((p) => projectSlug(p) === slug)).filter(
    (p): p is GalleryItem => Boolean(p)
  );

  return (
    <>
      {/* Marquee band */}
      <div className="relative z-10 py-10 border-y border-[#27272A]/60 overflow-hidden bg-[#050505]/40 backdrop-blur-sm" aria-hidden>
        <div className="flex w-max animate-[marquee_40s_linear_infinite]">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center shrink-0">
              {['AI Agents', 'Cybersecurity', 'Computer Vision', 'Digital Twins', 'Healthcare AI', 'Spatial Interfaces', 'Blockchain'].map((w) => (
                <span key={w} className="flex items-center font-syne font-bold text-4xl md:text-6xl tracking-tighter text-outline px-8">
                  {w}
                  <span className="ml-16 w-2.5 h-2.5 rounded-full bg-[#4F46E5] shadow-[0_0_14px_#4F46E5]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Featured projects */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full" />
                <span className="text-[#4F46E5] font-mono text-xs tracking-widest uppercase">Featured // Selected Work</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-syne font-bold tracking-tighter leading-[0.9]">
                Built to
                <br />
                <span className="text-outline">hold under load</span>
                <span className="text-[#4F46E5]">.</span>
              </h2>
            </div>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-3 self-start md:self-auto font-mono text-xs tracking-widest uppercase text-white no-underline border-b border-white/30 hover:border-[#4F46E5] pb-2 transition-colors"
            >
              All {galleryProjects.length} systems
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-10 gap-y-16">
            {featured.map((item, i) => (
              <FeatureCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Chapter directory */}
      <section className="relative pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full" />
            <span className="text-[#38BDF8] font-mono text-xs tracking-widest uppercase">Continue // Chapters</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#27272A]">
            {chapters.map((c, i) => (
              <motion.div
                key={c.to}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="border-r border-b border-[#27272A]"
              >
                <Link
                  to={c.to}
                  className="group relative flex flex-col justify-between h-full min-h-[220px] p-8 no-underline text-inherit overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-[#4F46E5]/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <div className="relative flex justify-between items-start">
                    <span className="font-mono text-xs text-[#71717A]">{c.no}</span>
                    <ArrowUpRight className="w-5 h-5 text-[#71717A] group-hover:text-white group-hover:rotate-45 transition-all duration-300" />
                  </div>
                  <div className="relative">
                    <h3 className="font-syne font-bold text-3xl tracking-tighter text-white mb-2">{c.label}</h3>
                    <p className="text-sm text-[#71717A] group-hover:text-[#A1A1AA] transition-colors leading-relaxed">{c.blurb}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
