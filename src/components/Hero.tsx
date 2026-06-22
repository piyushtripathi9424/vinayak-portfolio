import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useUI } from '../contexts/UIContext';
import { ArrowRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import profilePic from '../logo/JAKE.png';

const CAROUSEL_ICONS = [
  { name: 'Illustrator', src: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg' },
  { name: 'Photoshop', src: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg' },
  { name: 'Premiere Pro', src: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Adobe_Premiere_Pro_Logo.svg' },
  { name: 'After Effects', src: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg' },
  { name: 'InDesign', src: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg' },
  { name: 'Figma', src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg' },
];

export function Hero() {
  const { openContactModal } = useUI();
  const containerRef = useRef<HTMLElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax: track scroll progress within this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.5 });

  // Background glow drifts DOWN (parallax depth — slower than scroll)
  const glowY = useTransform(smoothProgress, [0, 1], ['0%', '40%']);

  // Grid rises slightly
  const gridY = useTransform(smoothProgress, [0, 1], ['0%', '-15%']);

  // Content rises (foreground, slightly faster)
  const contentY = useTransform(smoothProgress, [0, 1], ['0%', '-20%']);

  return (
    <section ref={containerRef} id="home" className="relative min-h-[100svh] flex items-center justify-center pt-24 pb-0 overflow-hidden">

      {/* Background glow — drifts down on scroll */}
      <motion.div
        style={{ y: glowY }}
        className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[800px] h-[500px] bg-[var(--hero-bloom)] blur-[150px] rounded-[100%] pointer-events-none mix-blend-screen"
      />
      <div className="hidden md:block absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[var(--hero-bloom-subtle)] to-transparent blur-[80px] pointer-events-none mix-blend-screen opacity-50" />
      <div className="hidden md:block absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

      {/* Grid overlay — rises on scroll */}
      <motion.div
        style={isMobile ? {} : { y: gridY }}
        className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_100%)] will-change-transform"
      />

      {/* Content — foreground parallax */}
      <motion.div
        style={isMobile ? {} : { y: contentY }}
        className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 text-center pb-16"
      >

        {/* Avatar Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mb-10 mt-12 group w-32 h-32 md:w-44 md:h-44"
        >
          <div className="absolute inset-0 -m-6 rounded-full border border-primary/30 animate-[spin_10s_linear_infinite] will-change-transform" style={{ borderStyle: 'dashed' }} />
          <div className="absolute inset-0 -m-3 rounded-full border border-text-main/10 animate-[spin_15s_linear_infinite_reverse] will-change-transform" />
          <div className="hidden md:block absolute inset-0 rounded-full bg-[var(--hero-bloom-solid)] blur-[40px] mix-blend-screen opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative w-full h-full rounded-full overflow-hidden border border-text-main/20 shadow-[0_0_50px_var(--primary-glow)] bg-text-main/[0.02] backdrop-blur-md p-1">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <img
                src={profilePic}
                alt="Vinayak"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-background/20 to-background/80 pointer-events-none opacity-40 mix-blend-overlay" />
            </div>
          </div>
        </motion.div>

        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-text-main/10 bg-text-main/5 backdrop-blur-md shadow-xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-text-main/90">
            Visual Strategy &amp; Creative Direction
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center font-display font-extrabold tracking-tight leading-[0.9] mb-10 w-full"
        >
          <span className="text-[12vw] sm:text-7xl md:text-[110px] lg:text-[130px] text-gradient whitespace-nowrap">
            CRAFTING
          </span>
          <span className="text-[12vw] sm:text-7xl md:text-[110px] lg:text-[130px] text-transparent bg-clip-text bg-gradient-to-r from-[#FF2B2B] via-[#FF8A8A] to-[#FF2B2B] md:animate-gradient-x bg-[length:200%_auto] whitespace-nowrap">
            ELITE VISUALS
          </span>
          <span className="text-[12vw] sm:text-7xl md:text-[110px] lg:text-[130px] text-gradient whitespace-nowrap">
            FOR CREATORS
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="relative max-w-4xl mx-auto mb-16 px-4"
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="text-sm sm:text-base md:text-2xl lg:text-3xl text-text-main/40 leading-relaxed font-medium text-center w-full max-w-[90vw] mx-auto overflow-hidden">
            Helping <span className="text-text-main drop-shadow-md">top creators</span>, and <span className="text-text-main drop-shadow-md">brands</span>
            <br className="md:hidden" />
            {' '}
            to{' '}
            <span className="inline md:inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ff8a8a] to-primary font-bold tracking-wide md:animate-gradient-x bg-[length:200%_auto]">
              dominate the feed
            </span>
            <br className="md:hidden" />
            {' '}
            <span>with premium, click-driven aesthetics.</span>
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </motion.div>

        {/* Tool Icons Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="w-full overflow-hidden mb-16 relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
          }}
        >
          <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused] will-change-transform">
            {[...CAROUSEL_ICONS, ...CAROUSEL_ICONS, ...CAROUSEL_ICONS, ...CAROUSEL_ICONS].map((icon, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center w-16 h-16 md:w-[88px] md:h-[88px] mx-3 md:mx-4 bg-text-main/[0.02] border border-text-main/[0.05] rounded-2xl backdrop-blur-md transition-all hover:-translate-y-2 hover:bg-text-main/[0.05] hover:border-text-main/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] shrink-0 group"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-text-main/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <img
                  src={icon.src}
                  alt={icon.name}
                  className="relative z-10 w-8 h-8 md:w-11 md:h-11 object-contain drop-shadow-[0_0_10px_var(--glass-shadow)] group-hover:drop-shadow-[0_0_15px_var(--glass-border-subtle)] transition-all"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          <button
            onClick={openContactModal}
            className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-text-main rounded-xl overflow-hidden hover:scale-105 active:scale-[0.98] transition-all duration-500 shadow-[0_0_20px_var(--primary-glow)] hover:shadow-[0_0_50px_var(--primary-glow-strong)] bg-primary/10 border border-primary/30 backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            <span className="relative flex items-center gap-3">
              Start a Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-rotate-12 transition-transform duration-300" />
            </span>
          </button>
        </motion.div>

      </motion.div>

      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 6s ease infinite;
        }
      `}</style>

    </section>
  );
}
