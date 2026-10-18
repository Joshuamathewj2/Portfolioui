import { motion } from 'motion/react';

const EASE = [0.76, 0, 0.24, 1] as const;

const LABELS: Record<string, string> = {
  '/': 'Home',
  '/about': 'About',
  '/stack': 'Stack',
  '/projects': 'Projects',
  '/experience': 'Experience',
  '/recognition': 'Recognition',
  '/connect': 'Connect',
};

/**
 * Two-panel wipe rendered inside each keyed page: the "in" panel lifts away when a
 * page mounts, the "out" panel rises to cover the screen when it exits.
 */
export default function RouteCurtain({ pathname }: { pathname: string }) {
  const label = LABELS[pathname] ?? 'Loading';

  const panel =
    'fixed inset-0 z-[90] pointer-events-none flex items-center justify-center bg-[#07070B]';
  const content = (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(79,70,229,0.35),transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px hairline-gradient" />
      <span className="relative font-syne font-bold text-5xl md:text-7xl tracking-tighter text-white">
        {label}
        <span className="text-[#4F46E5]">.</span>
      </span>
    </>
  );

  return (
    <>
      <motion.div
        aria-hidden
        className={panel}
        style={{ transformOrigin: 'top' }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.75, ease: EASE, delay: 0.15 } }}
        exit={{ scaleY: 0 }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, transition: { duration: 0.3, delay: 0.1 } }}
        >
          {content}
        </motion.div>
      </motion.div>
      <motion.div
        aria-hidden
        className={panel}
        style={{ transformOrigin: 'bottom' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.55, ease: EASE } }}
      />
    </>
  );
}
