'use client';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

const bootSequence = [
  'INITIALIZING_NEURAL_ENGINE',
  'SYNCING_SPATIAL_GRIDS',
  'CALIBRATING_OPTICAL_SENSORS',
  'ESTABLISHING_SECURE_LINK',
  'BOOT_COMPLETE'
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [sequenceIndex, setSequenceIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    const sequenceInterval = setInterval(() => {
      setSequenceIndex((prev) => (prev < bootSequence.length - 1 ? prev + 1 : prev));
    }, 400);

    return () => {
      clearInterval(interval);
      clearInterval(sequenceInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#4F46E533_0%,transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4F46E511] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-10 space-y-12">
        {/* Logo/Name Area */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.2em' }}
            className="text-4xl font-syne font-bold text-white"
          >
            JOSHUA<span className="text-[#4F46E5]">.</span>A
          </motion.div>
          <motion.div 
            className="text-[10px] font-mono text-[#4F46E5] uppercase tracking-[0.4em]"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Engineering Systems OS v2.0
          </motion.div>
        </div>

        {/* Progress System */}
        <div className="space-y-4">
          <div className="flex justify-between items-end font-mono text-[9px] uppercase tracking-widest text-[#71717A]">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full animate-pulse" />
              {bootSequence[sequenceIndex]}
            </div>
            <div className="text-[#F5F5F5] font-bold">{progress}%</div>
          </div>

          <div className="relative h-[2px] w-full bg-[#27272A] rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-[#4F46E5] shadow-[0_0_15px_rgba(79,70,229,0.8)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          {/* Hex Detail Decorative */}
          <div className="flex justify-center gap-1">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className={`h-0.5 w-1.5 rounded-full transition-colors duration-300 ${
                  i < (progress / 5) ? 'bg-[#4F46E5]/40' : 'bg-[#27272A]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Corner Scanning lines */}
      <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-transparent via-[#4F46E5] to-transparent animate-[scan_3s_linear_infinite]" />
      <div className="absolute bottom-0 right-0 w-32 h-px bg-gradient-to-r from-transparent via-[#4F46E5] to-transparent animate-[scan_3s_linear_infinite_reverse]" />

      <style>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(1000%); }
        }
      `}</style>
    </motion.div>
  );
}
