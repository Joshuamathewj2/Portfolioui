import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { GalleryItem, shortTitle, subTitle } from '../data/projects';

/**
 * Editorial, scannable list of every project. On pointer devices a preview of the
 * hovered project's thumbnail trails the cursor.
 */
export default function ProjectIndex({
  items,
  onSelect,
}: {
  items: GalleryItem[];
  onSelect: (item: GalleryItem) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const px = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const py = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  return (
    <div
      className="relative"
      onMouseMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onMouseLeave={() => setHovered(null)}
    >
      <div className="hidden md:grid grid-cols-[80px_1fr_220px_48px] gap-6 px-4 pb-4 font-mono text-[10px] tracking-[0.25em] uppercase text-[#52525B] border-b border-[#27272A]">
        <span>No.</span>
        <span>System</span>
        <span>Domain</span>
        <span />
      </div>

      <ul>
        {items.map((item, i) => {
          const active = hovered === i;
          const dimmed = hovered !== null && !active;
          return (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: (i % 5) * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                onClick={() => onSelect(item)}
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                className="group relative w-full text-left grid grid-cols-[48px_1fr_32px] md:grid-cols-[80px_1fr_220px_48px] gap-4 md:gap-6 items-center px-4 py-6 md:py-8 border-b border-[#27272A] overflow-hidden transition-opacity duration-500"
                style={{ opacity: dimmed ? 0.35 : 1 }}
              >
                {/* Hover fill sweeping in from the left */}
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ background: `linear-gradient(90deg, ${item.glow ?? 'rgba(79,70,229,0.3)'}, transparent 70%)`, opacity: 0.18 }}
                />

                <span className="relative font-mono text-xs text-[#71717A] group-hover:text-white transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="relative min-w-0">
                  <span className="flex items-center gap-4">
                    <img
                      src={item.url}
                      alt=""
                      className="md:hidden w-14 h-10 rounded object-cover border border-[#27272A] shrink-0"
                      loading="lazy"
                    />
                    <span className="min-w-0">
                      <span className="block font-syne font-bold text-2xl sm:text-3xl md:text-5xl tracking-tighter text-white leading-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                        {shortTitle(item)}
                      </span>
                      <span className="block mt-2 text-sm text-[#A1A1AA] font-inter truncate transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                        {subTitle(item) || item.category}
                      </span>
                    </span>
                  </span>
                  {item.tags && (
                    <span className="hidden lg:flex flex-wrap gap-2 mt-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                      {item.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-2 py-1 rounded-full border border-white/10 text-[#A1A1AA] bg-white/[0.02]"
                        >
                          {tag}
                        </span>
                      ))}
                    </span>
                  )}
                </span>

                <span className="relative hidden md:block font-mono text-[10px] tracking-[0.2em] uppercase text-[#38BDF8]">
                  {item.category}
                </span>

                <span className="relative w-8 h-8 md:w-12 md:h-12 rounded-full border border-[#27272A] flex items-center justify-center text-[#A1A1AA] group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </button>
            </motion.li>
          );
        })}
      </ul>

      {/* Cursor-following preview (pointer devices only), portaled above the navbar layer */}
      {createPortal(<motion.div
        aria-hidden
        className="hidden md:block fixed top-0 left-0 z-[80] pointer-events-none w-[340px] aspect-[16/10] -translate-x-1/2 -translate-y-1/2"
        style={{ x: px, y: py }}
      >
        <AnimatePresence>
          {hovered !== null && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 6 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 rounded-xl overflow-hidden border border-white/15"
              style={{ boxShadow: `0 30px 80px -10px ${items[hovered].glow ?? 'rgba(79,70,229,0.4)'}` }}
            >
              {items.map((item, i) => (
                <img
                  key={item.url}
                  src={item.url}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                  style={{ opacity: hovered === i ? 1 : 0 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>, document.body)}
    </div>
  );
}
