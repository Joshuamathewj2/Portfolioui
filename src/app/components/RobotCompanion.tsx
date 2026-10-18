import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useLocation } from 'react-router';
import { scrollToTop } from './SmoothScroll';

type Mood = 'idle' | 'happy' | 'sleepy' | 'surprised';

const PAGE_LINES: Record<string, string> = {
  '/': "Hi! I'm Bit, Joshua's lab assistant.",
  '/about': 'Meet the engineer behind the systems.',
  '/stack': 'The tools in active rotation.',
  '/projects': '10 systems in orbit. Click one!',
  '/experience': 'Field notes from two internships.',
  '/recognition': 'Welcome to the trophy room!',
  '/connect': 'Say hi! Joshua replies fast.',
};

const CLICK_LINES = [
  'Beep boop! Hover a project to preview it.',
  'Analyser Agent ranked #11 of 1,773.',
  'MIRAGE was tested across 45 scenario runs.',
  'Psst… he is open to internships.',
];

const SLEEP_AFTER_MS = 15000;
const SURPRISE_MS = 700;

/** Small purple robot pinned to the bottom-right corner that watches the cursor and chats. */
export default function RobotCompanion() {
  const { pathname } = useLocation();
  const [mood, setMood] = useState<Mood>('idle');
  const [blink, setBlink] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [waving, setWaving] = useState(false);
  const clickCount = useRef(0);
  const surprisedUntil = useRef(0);
  const robotRef = useRef<HTMLButtonElement>(null);
  const sleepTimer = useRef<ReturnType<typeof setTimeout>>();
  const bubbleTimer = useRef<ReturnType<typeof setTimeout>>();

  // Normalised cursor offset from the robot, -1..1 on each axis
  const lookX = useMotionValue(0);
  const lookY = useMotionValue(0);
  const sx = useSpring(lookX, { stiffness: 120, damping: 14 });
  const sy = useSpring(lookY, { stiffness: 120, damping: 14 });
  const eyeX = useTransform(sx, (v) => v * 4.5);
  const eyeY = useTransform(sy, (v) => v * 3);
  const tiltY = useTransform(sx, (v) => v * 22);
  const tiltX = useTransform(sy, (v) => v * -16);

  const talking = message !== null;

  const say = (text: string, ms = 4200) => {
    setMessage(text);
    clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => setMessage(null), ms);
  };

  // Greet on every page change
  useEffect(() => {
    const t = setTimeout(() => {
      say(PAGE_LINES[pathname] ?? 'Exploring, are we?');
      setWaving(true);
      setTimeout(() => setWaving(false), 1600);
    }, 1100);
    return () => clearTimeout(t);
  }, [pathname]);

  // Cursor tracking, hover reactions and falling asleep when idle
  useEffect(() => {
    const wake = () => {
      setMood((m) => (m === 'sleepy' ? 'idle' : m));
      clearTimeout(sleepTimer.current);
      sleepTimer.current = setTimeout(() => setMood('sleepy'), SLEEP_AFTER_MS);
    };

    const onMove = (e: MouseEvent) => {
      const el = robotRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        lookX.set(Math.max(-1, Math.min(1, dx / (window.innerWidth / 2))));
        lookY.set(Math.max(-1, Math.min(1, dy / (window.innerHeight / 2))));
      }
      // Let the click "surprise" face finish before hover moods take over again
      if (Date.now() >= surprisedUntil.current) {
        const overInteractive =
          e.target instanceof Element && !!e.target.closest('a, button, [role="button"]');
        setMood(overInteractive ? 'happy' : 'idle');
      }
      wake();
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', wake, { passive: true });
    wake();
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', wake);
      clearTimeout(sleepTimer.current);
    };
  }, [lookX, lookY]);

  // Blink every few seconds
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 140);
        loop();
      }, 2500 + Math.random() * 3000);
    };
    loop();
    return () => clearTimeout(t);
  }, []);

  useEffect(() => () => clearTimeout(bubbleTimer.current), []);

  const handleClick = () => {
    const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200;
    if (nearBottom) {
      say('Whee! Back to the top.');
      scrollToTop(false);
    } else {
      say(CLICK_LINES[clickCount.current % CLICK_LINES.length]);
      clickCount.current += 1;
    }
    surprisedUntil.current = Date.now() + SURPRISE_MS;
    setMood('surprised');
    setTimeout(() => setMood((m) => (m === 'surprised' ? 'happy' : m)), SURPRISE_MS);
    setWaving(true);
    setTimeout(() => setWaving(false), 1600);
  };

  const eyeColor = mood === 'sleepy' ? '#818CF8' : '#67E8F9';
  const blushing = mood === 'happy' || mood === 'surprised';

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-[75] flex flex-col items-end pointer-events-none">
      {/* Speech bubble */}
      <AnimatePresence>
        {message && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
            className="relative mb-1 mr-3 max-w-[220px] px-4 py-2.5 rounded-2xl rounded-br-sm bg-[#16121F]/95 backdrop-blur-md border border-[#a855f7]/40 shadow-[0_8px_30px_rgba(168,85,247,0.25)] text-[12px] leading-snug text-white font-inter origin-bottom-right"
            role="status"
            aria-live="polite"
          >
            <span className="block font-mono text-[9px] tracking-[0.25em] uppercase text-[#C084FC] mb-0.5">Bit</span>
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={robotRef}
        type="button"
        onClick={handleClick}
        aria-label="Bit, the robot assistant. Click for a tip."
        className="pointer-events-auto relative w-[84px] h-[108px] sm:w-[100px] sm:h-[128px] cursor-pointer"
        style={{ perspective: 420 }}
        initial={{ opacity: 0, y: 40, scale: 0.6 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 200, damping: 16 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        {/* Holographic base ring */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[78%] h-4" aria-hidden>
          <motion.span
            className="absolute inset-0 rounded-[100%] border border-[#67E8F9]/60 shadow-[0_0_12px_rgba(103,232,249,0.6)]"
            animate={{ scale: [1, 1.18, 1], opacity: [0.8, 0.3, 0.8] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="absolute inset-[22%] rounded-[100%] bg-[#a855f7]/50 blur-[6px]" />
        </div>

        {/* Hovering body, tilted toward the cursor */}
        <motion.div
          className="absolute inset-0"
          animate={{ y: mood === 'sleepy' ? [0, 2, 0] : [0, -6, 0] }}
          transition={{ duration: mood === 'sleepy' ? 4 : 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.svg
            viewBox="0 0 120 154"
            className="w-full h-full overflow-visible drop-shadow-[0_8px_16px_rgba(124,58,237,0.5)]"
            style={{ rotateX: tiltX, rotateY: tiltY }}
          >
            <defs>
              <linearGradient id="bit-shell" x1="0.15" y1="0" x2="0.75" y2="1">
                <stop offset="0%" stopColor="#E9D5FF" />
                <stop offset="22%" stopColor="#C084FC" />
                <stop offset="60%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#4C1D95" />
              </linearGradient>
              <linearGradient id="bit-shell-dark" x1="0" y1="0" x2="0.4" y2="1">
                <stop offset="0%" stopColor="#A78BFA" />
                <stop offset="100%" stopColor="#3B0764" />
              </linearGradient>
              <linearGradient id="bit-rim" x1="0" y1="0" x2="0" y2="1">
                <stop offset="55%" stopColor="#67E8F9" stopOpacity="0" />
                <stop offset="100%" stopColor="#67E8F9" stopOpacity="0.9" />
              </linearGradient>
              <radialGradient id="bit-visor" cx="0.3" cy="0.25" r="1">
                <stop offset="0%" stopColor="#241B47" />
                <stop offset="70%" stopColor="#0A0716" />
                <stop offset="100%" stopColor="#05030C" />
              </radialGradient>
              <linearGradient id="bit-sheen" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fff" stopOpacity="0" />
                <stop offset="50%" stopColor="#fff" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="bit-flame" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E0F2FE" />
                <stop offset="35%" stopColor="#67E8F9" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </linearGradient>
              <filter id="bit-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="1.8" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <clipPath id="bit-visor-clip">
                <rect x="27" y="35" width="66" height="40" rx="17" />
              </clipPath>
            </defs>

            {/* Antenna + signal waves while talking */}
            <rect x="57.5" y="13" width="5" height="12" rx="2.5" fill="url(#bit-shell-dark)" />
            <rect x="54" y="22" width="12" height="5" rx="2.5" fill="#6D28D9" />
            <motion.circle
              cx="60" cy="10" r="5"
              fill={mood === 'happy' || talking ? '#F0ABFC' : '#E9D5FF'}
              filter="url(#bit-glow)"
              animate={{ opacity: [1, 0.45, 1] }}
              transition={{ duration: talking ? 0.5 : 1.8, repeat: Infinity }}
            />
            <AnimatePresence>
              {talking &&
                [0, 1].map((i) => (
                  <motion.path
                    key={i}
                    d={`M${48 - i * 6} ${8 - i * 3} Q60 ${-2 - i * 5} ${72 + i * 6} ${8 - i * 3}`}
                    fill="none" stroke="#F0ABFC" strokeWidth="1.5" strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.9, 0] }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
            </AnimatePresence>

            {/* Ear pods with alternating status lights */}
            {[
              { cx: 13, delay: 0 },
              { cx: 107, delay: 0.8 },
            ].map(({ cx, delay }) => (
              <g key={cx}>
                <rect x={cx - 7} y="42" width="14" height="26" rx="7" fill="url(#bit-shell-dark)" />
                <motion.circle
                  cx={cx} cy="55" r="3"
                  fill="#67E8F9" filter="url(#bit-glow)"
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay }}
                />
              </g>
            ))}

            {/* Head shell */}
            <rect x="18" y="25" width="84" height="62" rx="27" fill="url(#bit-shell)" />
            <rect x="18" y="25" width="84" height="62" rx="27" fill="url(#bit-rim)" opacity="0.35" />
            <path d="M33 31 Q46 27 62 28" stroke="#fff" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="28" cy="38" r="2" fill="#fff" opacity="0.6" />

            {/* Visor glass */}
            <rect x="27" y="35" width="66" height="40" rx="17" fill="url(#bit-visor)" />
            <rect x="27" y="35" width="66" height="40" rx="17" fill="none" stroke="#C4B5FD" strokeOpacity="0.35" strokeWidth="1" />
            <g clipPath="url(#bit-visor-clip)">
              {/* Reflection that sweeps across now and then */}
              <motion.path
                d="M14 30 L32 30 L18 80 L0 80 Z" fill="url(#bit-sheen)"
                initial={{ x: -10 }}
                animate={{ x: [-10, 120] }}
                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
              />
              <path d="M33 41 Q40 37 50 37" stroke="#fff" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>

            {/* Eyes */}
            <motion.g style={{ x: eyeX, y: eyeY }} filter="url(#bit-glow)">
              {mood === 'happy' ? (
                <>
                  <path d="M40 55 Q46 47 52 55" stroke={eyeColor} strokeWidth="3.5" fill="none" strokeLinecap="round" />
                  <path d="M68 55 Q74 47 80 55" stroke={eyeColor} strokeWidth="3.5" fill="none" strokeLinecap="round" />
                </>
              ) : mood === 'sleepy' ? (
                <>
                  <path d="M40 53 Q46 57 52 53" stroke={eyeColor} strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M68 53 Q74 57 80 53" stroke={eyeColor} strokeWidth="3" fill="none" strokeLinecap="round" />
                </>
              ) : mood === 'surprised' ? (
                <>
                  <circle cx="46" cy="52" r="6.5" fill="none" stroke={eyeColor} strokeWidth="3" />
                  <circle cx="74" cy="52" r="6.5" fill="none" stroke={eyeColor} strokeWidth="3" />
                  <circle cx="46" cy="52" r="2" fill={eyeColor} />
                  <circle cx="74" cy="52" r="2" fill={eyeColor} />
                </>
              ) : (
                <>
                  <rect x="41.5" y={blink ? 52 : 45} width="9" height={blink ? 2 : 14} rx="4.5" fill={eyeColor} />
                  <rect x="69.5" y={blink ? 52 : 45} width="9" height={blink ? 2 : 14} rx="4.5" fill={eyeColor} />
                  {!blink && (
                    <>
                      <circle cx="48" cy="48.5" r="1.6" fill="#fff" />
                      <circle cx="76" cy="48.5" r="1.6" fill="#fff" />
                    </>
                  )}
                </>
              )}
            </motion.g>

            {/* LED mouth: equalizer while talking, otherwise mood-dependent */}
            <g filter="url(#bit-glow)">
              {talking && mood !== 'surprised' ? (
                [0, 1, 2, 3, 4].map((i) => (
                  <motion.rect
                    key={i}
                    x={52 + i * 3.6} width="2.2" rx="1.1"
                    fill="#F0ABFC"
                    animate={{ height: [1.5, 6, 2.5, 5, 1.5], y: [67.25, 65, 66.75, 65.5, 67.25] }}
                    transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.07, ease: 'easeInOut' }}
                  />
                ))
              ) : mood === 'surprised' ? (
                <ellipse cx="60" cy="67" rx="3" ry="3.5" fill="none" stroke="#F0ABFC" strokeWidth="1.8" />
              ) : mood === 'happy' ? (
                <path d="M53 65 Q60 71 67 65" stroke="#F0ABFC" strokeWidth="2" fill="none" strokeLinecap="round" />
              ) : (
                <rect x="55" y="66" width="10" height="2" rx="1" fill="#A78BFA" opacity={mood === 'sleepy' ? 0.4 : 0.8} />
              )}
            </g>

            {/* Cheeks */}
            <circle cx="33" cy="70" r="4" fill="#F472B6" opacity={blushing ? 0.8 : 0.3} />
            <circle cx="87" cy="70" r="4" fill="#F472B6" opacity={blushing ? 0.8 : 0.3} />

            {/* Neck */}
            <rect x="50" y="86" width="20" height="5" rx="2.5" fill="#5B21B6" />
            <rect x="53" y="90" width="14" height="4" rx="2" fill="#4C1D95" />

            {/* Arms (shoulder joint, upper arm, hand) */}
            <g>
              <circle cx="30" cy="102" r="5" fill="url(#bit-shell-dark)" />
              <rect x="22" y="101" width="9" height="22" rx="4.5" fill="url(#bit-shell)" transform="rotate(14 27 103)" />
              <circle cx="21.5" cy="124" r="5" fill="#7C3AED" stroke="#C4B5FD" strokeOpacity="0.4" />
            </g>
            <motion.g
              style={{ transformOrigin: '90px 102px' }}
              animate={waving ? { rotate: [0, -150, -115, -150, -115, 0] } : { rotate: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            >
              <circle cx="90" cy="102" r="5" fill="url(#bit-shell-dark)" />
              <rect x="89" y="101" width="9" height="22" rx="4.5" fill="url(#bit-shell)" transform="rotate(-14 93 103)" />
              <circle cx="98.5" cy="124" r="5" fill="#7C3AED" stroke="#C4B5FD" strokeOpacity="0.4" />
            </motion.g>

            {/* Torso */}
            <rect x="34" y="93" width="52" height="38" rx="16" fill="url(#bit-shell-dark)" />
            <rect x="34" y="93" width="52" height="38" rx="16" fill="url(#bit-rim)" opacity="0.3" />
            <path d="M42 97 Q52 94 64 95" stroke="#fff" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Chest screen with heartbeat */}
            <rect x="46" y="102" width="28" height="16" rx="5" fill="#07050F" stroke="#67E8F9" strokeOpacity="0.4" />
            <motion.path
              d="M48 110 H54 L56.5 105 L59.5 115 L62 108 L64 110 H72"
              fill="none" stroke="#67E8F9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
              filter="url(#bit-glow)"
              strokeDasharray="34"
              animate={{ strokeDashoffset: [34, 0, -34] }}
              transition={{ duration: mood === 'sleepy' ? 3 : 1.4, repeat: Infinity, ease: 'linear' }}
            />

            {/* Belt light */}
            <motion.rect
              x="44" y="123" width="32" height="2.5" rx="1.25" fill="#C084FC"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Hover thrusters */}
            {[47, 73].map((cx, i) => (
              <g key={cx}>
                <rect x={cx - 5} y="129" width="10" height="6" rx="2" fill="#3B0764" />
                <motion.ellipse
                  cx={cx} cy="141" rx="3.6" ry="7"
                  fill="url(#bit-flame)"
                  style={{ transformOrigin: `${cx}px 135px` }}
                  animate={{ scaleY: mood === 'sleepy' ? [0.5, 0.6, 0.5] : [0.85, 1.2, 0.9, 1.15, 0.85], opacity: [0.85, 1, 0.8, 1, 0.85] }}
                  transition={{ duration: 0.35, repeat: Infinity, delay: i * 0.12 }}
                />
              </g>
            ))}
          </motion.svg>

          {/* Snoring z's */}
          <AnimatePresence>
            {mood === 'sleepy' && (
              <motion.span
                className="absolute -top-2 right-0 font-mono text-[11px] font-bold text-[#C4B5FD]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0], y: [0, -14], x: [0, 6] }}
                // Exit needs its own finite transition, or it inherits the infinite repeat and never unmounts
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 2.2, repeat: Infinity }}
              >
                z z
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.button>
    </div>
  );
}
