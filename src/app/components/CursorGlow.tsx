import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CursorGlow() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Soft delayed movement for cinematic feel
  const springConfig = { damping: 40, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      {/* Ambient Cursor Aura */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.12] bg-[#4F46E5] mix-blend-plus-lighter"
        style={{
          left: cursorX,
          top: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Primary Spotlight */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full blur-[60px] opacity-[0.08] bg-white mix-blend-soft-light"
        style={{
          left: cursorX,
          top: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Reactive Illumination Point */}
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-[#4F46E5] blur-md opacity-40 shadow-[0_0_20px_#4F46E5]"
        style={{
          left: cursorX,
          top: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </div>
  );
}


