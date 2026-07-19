import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CursorGlow() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  // Soft delayed movement for cinematic feel
  const springConfig = { damping: 40, stiffness: 450, mass: 0.5 };
  const followerConfig = { damping: 25, stiffness: 150, mass: 0.8 };
  
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  const followerX = useSpring(mouseX, followerConfig);
  const followerY = useSpring(mouseY, followerConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, [role="button"], .project-card, .interactive-element');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {/* Primary Dot */}
      <motion.div
        className="fixed w-3 h-3 bg-white rounded-full z-50 mix-blend-difference"
        style={{
          left: cursorX,
          top: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />

      {/* Trailing Follower Dot */}
      <motion.div
        className="fixed w-1.5 h-1.5 bg-white/30 rounded-full z-40"
        style={{
          left: followerX,
          top: followerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 4 : 1,
          opacity: isHovering ? 0.1 : 0.4,
        }}
      />

      {/* Subtle Ambient Aura (Reduced and White/Neutral) */}
      <motion.div
        className="fixed w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.03] bg-white mix-blend-plus-lighter"
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


