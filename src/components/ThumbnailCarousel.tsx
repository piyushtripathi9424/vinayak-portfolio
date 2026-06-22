import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { THUMBNAILS } from '../data';
import { Link } from 'react-router-dom';
import { useLightbox } from '../contexts/LightboxContext';

export function ThumbnailCarousel() {
  const { openLightbox } = useLightbox();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Continuous scrolling effect using a duplicated array
  const duplicatedThumbnails = [...THUMBNAILS, ...THUMBNAILS];

  // Motion values to keep tracking smooth and avoid re-renders
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Cinematic liquid-smooth tracking
  const springX = useSpring(mouseX, { stiffness: 80, damping: 25, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25, mass: 0.6 });

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [mouseX, mouseY]);

  return (
    <motion.section
      id="work"
      ref={sectionRef}
      initial={{ opacity: 0, filter: 'blur(20px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="py-24 relative overflow-hidden bg-background"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Crimson Bloom Mouse Tracker */}
      <motion.div
        className="pointer-events-none absolute rounded-full bg-primary/20 blur-[120px] -translate-x-1/2 -translate-y-1/2 z-0 mix-blend-screen"
        style={{
          left: springX,
          top: springY,
          width: '500px',
          height: '500px',
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.5 } }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-16 relative z-10 flex flex-col md:flex-row items-center md:items-end justify-between select-none">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Visual Strategy
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-main mb-6">
            Thumbnail <span className="text-glow text-primary">Showcase</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto md:mx-0">
            A living multi-layered database of premium thumbnail designs built to optimize real-time audience retention.
          </p>
        </div>

        <Link
          to="/work"
          className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-text-main liquid-glass-strong rounded-full overflow-hidden hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_var(--primary-glow)] hover:shadow-[0_0_30px_var(--primary-glow-strong)] border border-primary/30 hover:border-primary"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none" />
          <span className="relative flex items-center gap-2">
            All My Work
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </Link>
      </div>

      <div 
        className="relative w-full overflow-hidden flex flex-col gap-6 md:gap-10 select-none"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
        }}
      >



        {/* ==================== ROW 2: MIDGROUND LAYER ==================== */}
        <div className="w-full overflow-hidden">
          <div className="flex gap-8 md:gap-10 w-max animate-[scroll-left_75s_linear_infinite] hover:[animation-play-state:paused] will-change-transform">
            {[...THUMBNAILS.slice(5, 10), ...THUMBNAILS.slice(5, 10), ...THUMBNAILS.slice(5, 10)].map((src, idx) => (
              <motion.div
                key={`r2-${idx}`}
                whileHover={{ scale: 1.03, y: -4 }}
                onClick={() => openLightbox(src, 'Thumbnail', (idx % 5) + 5, THUMBNAILS)}
                className="relative w-[240px] h-[135px] md:w-[380px] md:h-[214px] rounded-xl overflow-hidden shadow-xl liquid-glass-standard group flex-shrink-0 cursor-pointer"
              >
                <img
                  src={src}
                  alt="Midground Thumbnail layer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  draggable={false}
                />
                <div className="absolute inset-0 border border-transparent group-hover:border-primary/20 rounded-xl transition-colors duration-300 pointer-events-none" />
                {/* Click hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-background/60 backdrop-blur-md border border-text-main/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-text-main" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ==================== ROW 1: FOREGROUND LAYER ==================== */}
        <div className="w-full overflow-hidden z-10">
          <div className="flex gap-6 md:gap-8 w-max animate-[scroll-right_50s_linear_infinite] hover:[animation-play-state:paused] will-change-transform opacity-100">
            {[...THUMBNAILS.slice(0, 5), ...THUMBNAILS.slice(0, 5), ...THUMBNAILS.slice(0, 5)].map((src, idx) => (
              <motion.div
                key={`r1-${idx}`}
                whileHover={{ scale: 1.06, y: -8, rotate: idx % 2 === 0 ? 0.5 : -0.5 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                onClick={() => openLightbox(src, 'Thumbnail', idx % 5, THUMBNAILS)}
                className="relative w-[320px] h-[180px] md:w-[500px] md:h-[281px] rounded-2xl overflow-hidden shadow-[0_0_35px_var(--primary-glow)] liquid-glass-strong group flex-shrink-0 cursor-pointer"
              >
                <img
                  src={src}
                  alt="Foreground Design showcase"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-108"
                  loading="lazy"
                  draggable={false}
                />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/40 rounded-2xl transition-colors duration-300 pointer-events-none z-20" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 z-10 pointer-events-none">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <div className="w-8 h-[2px] bg-primary mb-2 shadow-[0_0_10px_#FF2B2B]" />
                    <p className="text-text-main font-semibold uppercase tracking-widest text-xs">Click to View</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.3333%, 0, 0); }
        }
        @keyframes scroll-right {
          0% { transform: translate3d(-33.3333%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .will-change-transform {
          will-change: transform;
        }
      `}</style>
    </motion.section>
  );
}
