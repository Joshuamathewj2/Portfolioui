import { motion } from 'motion/react';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { gsap } from 'gsap';

interface NavItem {
  id: string;
  label: string;
  route: string;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { id: 'about', label: 'About', route: '/about' },
    { id: 'stack', label: 'Stack', route: '/stack' },
    { id: 'projects', label: 'Projects', route: '/projects' },
    { id: 'experience', label: 'Experience', route: '/experience' },
    { id: 'recognition', label: 'Recognition', route: '/recognition' },
    { id: 'contact', label: 'Connect', route: '/connect' },
  ];

  // Find active index based on route path
  const currentPath = location.pathname;
  let activeIndex = navItems.findIndex(item => item.route === currentPath);
  if (activeIndex === -1 && currentPath !== '/') {
    activeIndex = navItems.findIndex(item => currentPath.startsWith(item.route));
  }
  const effectiveActiveIndex = activeIndex === -1 ? 0 : activeIndex;

  // Refs for GSAP
  const navRef = useRef<HTMLDivElement>(null);
  const activeElementRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // color accent: glowing purple
  const color = "#a855f7";

  const createSVG = (element: HTMLDivElement) => {
    element.innerHTML = `
    <svg viewBox="0 0 116 5" preserveAspectRatio="none" class="beam">
      <path d="M0.5 2.5L113 0.534929C114.099 0.515738 115 1.40113 115 2.5C115 3.59887 114.099 4.48426 113 4.46507L0.5 2.5Z" fill="url(#gradient-beam)"/>
      <defs>
        <linearGradient id="gradient-beam" x1="2" y1="2.5" x2="115" y2="2.5" gradientUnits="userSpaceOnUse">
          <stop stop-color="${color}"/>
          <stop offset="1" stop-color="white"/>
        </linearGradient>
      </defs>
    </svg>
    <div class="strike">
      <svg viewBox="0 0 114 12" preserveAspectRatio="none">
        <g fill="none" stroke="white" stroke-width="0.75" stroke-linecap="round">
          <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
          <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
          <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
        </g>
      </svg>
    </div>
    `;
  };

  const getOffsetLeft = (element: HTMLButtonElement) => {
    if (!navRef.current || !activeElementRef.current) return 0;
    const elementRect = element.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    const activeElementWidth = activeElementRef.current.offsetWidth;
    return (
      elementRect.left -
      navRect.left +
      (elementRect.width - activeElementWidth) / 2
    );
  };

  // Synchronously position the active element on mount
  useLayoutEffect(() => {
    const activeButton = buttonRefs.current[effectiveActiveIndex];
    if (navRef.current && activeElementRef.current && activeButton) {
      gsap.set(activeElementRef.current, {
        x: getOffsetLeft(activeButton),
      });
      gsap.to(activeElementRef.current, {
        "--active-element-show": "1",
        duration: 0.2,
      });
    }
  }, [effectiveActiveIndex]);

  // Keep track of the previous active index to trigger transition
  const prevActiveIndex = useRef(effectiveActiveIndex);

  useEffect(() => {
    if (effectiveActiveIndex === prevActiveIndex.current) {
      return;
    }

    const fromIndex = prevActiveIndex.current;
    const toIndex = effectiveActiveIndex;
    prevActiveIndex.current = toIndex;

    const navElement = navRef.current;
    const activeElement = activeElementRef.current;
    const oldButton = buttonRefs.current[fromIndex];
    const newButton = buttonRefs.current[toIndex];

    if (!navElement || !activeElement || !oldButton || !newButton) {
      return;
    }

    const x = getOffsetLeft(newButton);
    const direction = toIndex > fromIndex ? "after" : "before";
    const spacing = Math.abs(x - getOffsetLeft(oldButton));

    navElement.classList.add(direction);

    gsap.set(activeElement, {
      rotateY: direction === "before" ? "180deg" : "0deg",
    });

    gsap.to(activeElement, {
      keyframes: [
        {
          "--active-element-width": `${spacing > navElement.offsetWidth - 60 ? navElement.offsetWidth - 60 : spacing}px`,
          duration: 0.3,
          ease: "none",
          onStart: () => {
            createSVG(activeElement);
            gsap.to(activeElement, {
              "--active-element-opacity": 1,
              duration: 0.1,
            });
          },
        },
        {
          "--active-element-scale-x": "0",
          "--active-element-scale-y": ".25",
          "--active-element-width": "0px",
          duration: 0.3,
          onStart: () => {
            gsap.to(activeElement, {
              "--active-element-mask-position": "40%",
              duration: 0.5,
            });
            gsap.to(activeElement, {
              "--active-element-opacity": 0,
              delay: 0.45,
              duration: 0.25,
            });
          },
          onComplete: () => {
            activeElement.innerHTML = "";
            navElement.classList.remove("before", "after");
            gsap.set(activeElement, {
              x: getOffsetLeft(newButton),
              "--active-element-show": "1",
            });
          },
        },
      ],
    });

    gsap.to(activeElement, {
      x,
      "--active-element-strike-x": "-50%",
      duration: 0.6,
      ease: "none",
    });
  }, [effectiveActiveIndex]);

  // Handle window resizing to keep the active line correctly positioned
  useEffect(() => {
    const handleResize = () => {
      const activeButton = buttonRefs.current[effectiveActiveIndex];
      if (activeElementRef.current && activeButton) {
        gsap.set(activeElementRef.current, {
          x: getOffsetLeft(activeButton),
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [effectiveActiveIndex]);

  const handleClick = (index: number) => {
    if (index === effectiveActiveIndex) return;
    navigate(navItems[index].route);
  };

  return (
    <>
      <style>{`
        .navigation-menu {
          position: relative;
          z-index: 1;
        }

        .navigation-menu ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          gap: 40px;
        }

        .navigation-menu ul li button {
          appearance: none;
          border: none;
          cursor: pointer;
          background-color: transparent;
          padding: 0;
          margin: 0;
          font-family: monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          transition: color 0.25s;
        }

        .navigation-menu ul li:not(.active):hover button {
          color: ${color};
          text-shadow: 0 0 10px ${color}, 0 0 20px ${color};
        }

        .navigation-menu .active-element {
          --active-element-scale-x: 1;
          --active-element-scale-y: 1;
          --active-element-show: 0;
          --active-element-opacity: 0;
          --active-element-width: 0px;
          --active-element-strike-x: 0%;
          --active-element-mask-position: 0%;
          position: absolute;
          left: 0;
          top: 24px;
          height: 3px;
          width: 36px;
          border-radius: 2px;
          background-color: ${color};
          opacity: var(--active-element-show);
        }

        .navigation-menu .active-element > svg,
        .navigation-menu .active-element .strike {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          opacity: var(--active-element-opacity);
          width: var(--active-element-width);
          mix-blend-mode: screen;
        }

        .navigation-menu .active-element > svg {
          display: block;
          overflow: visible;
          height: 5px;
          filter: blur(0.5px) drop-shadow(2px 0px 8px ${color}40) drop-shadow(1px 0px 2px ${color}80) drop-shadow(0px 0px 3px ${color}40) drop-shadow(2px 0px 8px ${color}45) drop-shadow(8px 0px 16px ${color}50);
        }

        .navigation-menu .active-element .strike {
          padding: 24px 0;
          -webkit-mask-image: linear-gradient(to right, transparent calc(0% + var(--active-element-mask-position)), black calc(15% + var(--active-element-mask-position)), black 80%, transparent);
          mask-image: linear-gradient(to right, transparent calc(0% + var(--active-element-mask-position)), black calc(15% + var(--active-element-mask-position)), black 80%, transparent);
        }

        .navigation-menu .active-element .strike svg {
          display: block;
          overflow: visible;
          height: 12px;
          width: calc(var(--active-element-width) * 2);
          transform: translate(var(--active-element-strike-x), 30%) scale(var(--active-element-scale-x), var(--active-element-scale-y));
        }

        .navigation-menu .active-element .strike svg:last-child {
          transform: translate(var(--active-element-strike-x), -30%) scale(-1);
        }

        .navigation-menu .active-element .strike svg g path:nth-child(2) {
          filter: blur(2px);
        }

        .navigation-menu .active-element .strike svg g path:nth-child(3) {
          filter: blur(4px);
        }

        .navigation-menu.before .active-element {
          transform: rotateY(180deg);
        }
      `}</style>

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
            <nav className="navigation-menu" ref={navRef}>
              <ul>
                {navItems.map((item, index) => (
                  <li key={item.id} className={index === effectiveActiveIndex ? "active" : ""}>
                    <button
                      ref={(el) => {
                        buttonRefs.current[index] = el;
                      }}
                      onClick={() => handleClick(index)}
                      className={index === effectiveActiveIndex ? "text-white" : "text-[#71717A]"}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="active-element" ref={activeElementRef} />
            </nav>
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
    </>
  );
}
