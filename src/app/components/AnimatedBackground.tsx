import { motion, MotionValue } from 'motion/react';

interface AnimatedBackgroundProps {
  opacity: MotionValue<number>;
}

export default function AnimatedBackground({ opacity }: AnimatedBackgroundProps) {
  return (
    <div className="fixed inset-0 z-0 bg-[#020204] overflow-hidden">
      {/* Prime Base Layer */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-b from-[#0a0a14] via-[#050505] to-[#020204]" 
      />

      {/* Striped Spatial Background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(90deg, #4F46E5 1px, transparent 1px), linear-gradient(0deg, #4F46E5 1px, transparent 1px)`,
          backgroundSize: 'clamp(40px, 4vw, 80px) clamp(40px, 4vw, 80px)',
          maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
        }}
      />

      {/* Cinematic Light Sweeps */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: ['-100%', '200%'],
            opacity: [0, 0.4, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
          className="absolute top-0 bottom-0 w-[40vw] bg-gradient-to-r from-transparent via-[#4F46E5]/10 to-transparent -skew-x-12 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            x: ['200%', '-100%'],
            opacity: [0, 0.3, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            delay: 5
          }}
          className="absolute top-0 bottom-0 w-[30vw] bg-gradient-to-l from-transparent via-[#7C3AED]/10 to-transparent skew-x-12 blur-3xl pointer-events-none"
        />
      </div>

      {/* Volumetric Glow Diffusion */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-[#4F46E5]/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-[#7C3AED]/5 to-transparent blur-[120px] pointer-events-none" />

      {/* Ambient Lighting Shifts */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 100, 0],
          y: [0, -50, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-[60vw] h-[60vh] bg-[#4F46E5]/20 rounded-full blur-[160px] pointer-events-none"
      />

      {/* Interactive Scanlines Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(rgba(18,16,35,0)_50%,rgba(0,0,0,0.5)_100%),linear-gradient(rgba(18,16,35,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />
    </div>
  );
}


