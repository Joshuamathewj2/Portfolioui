import { motion, useScroll, useSpring } from 'motion/react';

/** Film grain, lens vignette and a scroll-progress hairline layered over the whole site. */
export default function CinematicOverlay() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <>
      <div className="fixed inset-0 z-[60] pointer-events-none vignette" aria-hidden />
      <div className="fixed -inset-[10%] z-[61] pointer-events-none opacity-[0.045] mix-blend-overlay film-grain" aria-hidden />
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 right-0 h-[2px] z-[70] origin-left pointer-events-none bg-gradient-to-r from-[#4F46E5] via-[#a855f7] to-[#38BDF8] shadow-[0_0_12px_rgba(168,85,247,0.7)]"
        style={{ scaleX: progress }}
      />
    </>
  );
}
