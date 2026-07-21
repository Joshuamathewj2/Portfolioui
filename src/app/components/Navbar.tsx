import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'projects', label: 'PROJECTS', route: '/projects' },
    { id: 'experience', label: 'EXPERIENCE', route: '/experience' },
    { id: 'system-map', label: 'SYSTEM MAP', route: '/' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-[#050505]/80 backdrop-blur-xl border-white/5 py-4' 
          : 'bg-transparent border-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="no-underline text-inherit">
          <motion.div
            className="text-xl font-syne font-bold tracking-tighter cursor-pointer flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-2 h-2 bg-[#4F46E5] rounded-full group-hover:scale-150 transition-transform" />
            JOSHUA A<span className="text-[#4F46E5]">.</span>
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item, index) => (
            <Link
              key={item.id}
              to={item.route}
              className="text-[10px] font-mono tracking-[0.2em] text-[#71717A] hover:text-[#4F46E5] transition-colors relative group uppercase no-underline"
            >
              <motion.span
                className="inline-flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-[#4f46e5] opacity-0 group-hover:opacity-100 transition-opacity mr-1 font-bold">[</span>
                {item.label}
                <span className="text-[#4f46e5] opacity-0 group-hover:opacity-100 transition-opacity ml-1 font-bold">]</span>
              </motion.span>
            </Link>
          ))}
        </div>

        <Link to="/connect" className="no-underline">
          <motion.button
            className="font-mono text-[10px] tracking-widest px-5 py-2 border border-[#4F46E5]/30 text-[#F5F5F5] uppercase hover:bg-[#4F46E5] hover:border-[#4F46E5] transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Initialize Sync
          </motion.button>
        </Link>
      </div>
    </motion.nav>
  );
}


