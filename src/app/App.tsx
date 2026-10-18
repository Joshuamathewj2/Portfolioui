import { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig, useScroll, useTransform } from 'motion/react';
import { Routes, Route, useLocation } from 'react-router';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RolesShowcase from './components/RolesShowcase';
import SelectedWork from './components/SelectedWork';
import About from './components/About';
import Stack from './components/Stack';
import Experience from './components/Experience';
import Systems from './components/Systems';
import Recognition from './components/Recognition';
import Contact from './components/Contact';
import AnimatedBackground from './components/AnimatedBackground';
import CursorGlow from './components/CursorGlow';
import Loader from './components/Loader';
import SmoothScroll, { scrollToTop } from './components/SmoothScroll';
import CinematicOverlay from './components/CinematicOverlay';
import RouteCurtain from './components/RouteCurtain';
import Footer from './components/Footer';
import RobotCompanion from './components/RobotCompanion';

function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  // Disable scrolling during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen w-full bg-[#050505] text-[#F5F5F5] font-satoshi overflow-x-clip">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <Loader key="loader" onComplete={() => setIsLoading(false)} />
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <SmoothScroll />
              <AnimatedBackground opacity={backgroundOpacity} />
              <CinematicOverlay />
              <CursorGlow />
              <RobotCompanion />

              <Navbar />

              {/* Pages swap behind a curtain wipe; scroll resets while the screen is covered. */}
              <AnimatePresence mode="wait" onExitComplete={() => scrollToTop()}>
                <motion.div
                  key={location.pathname}
                  // Opacity stays at 1: the curtain does the visual work, this only holds the exit open.
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1, transition: { duration: 0.55 } }}
                >
                  <RouteCurtain pathname={location.pathname} />

                  <main className="relative z-10">
                    <Routes location={location}>
                      <Route path="/" element={
                        <>
                          <Reveal><Hero /></Reveal>
                          <RolesShowcase />
                          <SelectedWork />
                        </>
                      } />
                      <Route path="/about" element={<Reveal><About /></Reveal>} />
                      <Route path="/stack" element={<Reveal><Stack /></Reveal>} />
                      <Route path="/projects" element={<Reveal><Systems /></Reveal>} />
                      <Route path="/experience" element={<Reveal><Experience /></Reveal>} />
                      <Route path="/recognition" element={<Reveal><Recognition /></Reveal>} />
                      <Route path="/connect" element={<Reveal><Contact /></Reveal>} />
                    </Routes>
                  </main>

                  <Footer />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
