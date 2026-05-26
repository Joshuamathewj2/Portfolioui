'use client';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Terminal, Check, Copy } from 'lucide-react';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [copied, setCopied] = useState(false);
  const command = "npm run joshua";

  // Typing animation logic
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (index < command.length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + command.charAt(index));
        setIndex((prev) => prev + 1);
      }, 70); // Smooth, realistic typing speed
    } else {
      timeout = setTimeout(() => {
        setIsComplete(true);
        // Wait briefly after showing completion, then trigger app load
        setTimeout(() => {
          onComplete();
        }, 1200);
      }, 400); // Pause before outputting the success state
    }
    return () => clearTimeout(timeout);
  }, [index, command, onComplete]);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
    >
      {/* Cinematic Background Ambience */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,#4F46E522_0%,transparent_60%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#4F46E50A] rounded-full blur-[140px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      {/* Terminal Card Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg px-6"
      >
        {/* Subtle bloom/shadow under the terminal */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#4F46E5]/0 via-[#4F46E5]/20 to-[#4F46E5]/0 rounded-xl blur-xl opacity-50" />
        
        <div className="relative border rounded-lg backdrop-blur-xl w-full text-white overflow-hidden cinematic-shadow bg-[#0D0D12]/80 border-[#27272A]/80 shadow-[0_0_40px_-10px_rgba(79,70,229,0.15)]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#16161D]/90 border-b border-[#27272A]/50">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#A1A1AA]">
              <Terminal className="w-4 h-4 text-[#4F46E5]" />
              SYSTEM_BOOT_SEQUENCE
            </div>
            <button 
              className="p-1.5 border border-transparent rounded transition-all hover:bg-[#27272A] text-[#71717A] hover:text-white"
              onClick={handleCopy}
              aria-label="Copy to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 text-sm font-mono min-h-[140px] flex flex-col justify-center">
            <div className="flex items-start gap-3">
              <span className="text-[#4F46E5] mt-0.5">❯</span>
              <div className="flex-1">
                {/* The Typed Command */}
                <motion.div className="flex items-center text-gray-200 text-base">
                  {displayedText}
                  {!isComplete && (
                    <motion.span 
                      className="inline-block w-2h h-5 w-2 bg-[#4F46E5] ml-1 shadow-[0_0_8px_#4F46E5]"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </motion.div>

                {/* The Output Frame */}
                {isComplete && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-[#27272A]/40 flex items-center gap-3"
                  >
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400/90 tracking-widest text-xs font-semibold">
                      [✓] PORTFOLIO INITIALIZED
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Subtle reflection at bottom of terminal */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4F46E5]/40 to-transparent" />
        </div>
        
        {/* Terminal ground reflection */}
        <div className="absolute -bottom-12 left-10 right-10 h-6 bg-[#4F46E5]/10 blur-xl rounded-[100%]" />
      </motion.div>
    </motion.div>
  );
}
