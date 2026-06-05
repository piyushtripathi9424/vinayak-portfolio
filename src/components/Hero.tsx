import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { useUI } from '../contexts/UIContext';
import { ArrowRight } from 'lucide-react';
import React, { useRef, useEffect } from 'react';
import profilePic from '../logo/web pfp.jpg';

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

  return (
    <section ref={containerRef} id="home" className="relative min-h-[100svh] flex items-center justify-center pt-24 overflow-hidden">

      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[800px] h-[500px] bg-primary/20 blur-[150px] rounded-[100%] pointer-events-none mix-blend-screen" />
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-primary/10 to-transparent blur-[80px] pointer-events-none mix-blend-screen opacity-50" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_70%,transparent_100%)]" />


      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 text-center">

        {/* God-Level Avatar Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mb-10 mt-12 group w-32 h-32 md:w-44 md:h-44"
        >
          {/* Animated rings */}
          <div className="absolute inset-0 -m-6 rounded-full border border-primary/30 animate-[spin_10s_linear_infinite]" style={{ borderStyle: 'dashed' }} />
          <div className="absolute inset-0 -m-3 rounded-full border border-white/10 animate-[spin_15s_linear_infinite_reverse]" />

          {/* Intense Core Glow */}
          <div className="absolute inset-0 rounded-full bg-primary/40 blur-[40px] mix-blend-screen opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative w-full h-full rounded-full overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(255,43,43,0.3)] bg-white/[0.02] backdrop-blur-md p-1">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <img
                src={profilePic}
                alt="Vinayak"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              {/* Inner glass reflection */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-black/20 to-black/80 pointer-events-none opacity-40 mix-blend-overlay" />
            </div>
          </div>
        </motion.div>

        {/* Visual Strategy Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
            Visual Strategy & Creative Direction
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center font-display font-extrabold tracking-tight leading-[0.9] mb-10"
        >
          <span className="text-6xl sm:text-7xl md:text-[110px] lg:text-[130px] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-lg">
            CRAFTING
          </span>
          <span className="text-6xl sm:text-7xl md:text-[110px] lg:text-[130px] text-transparent bg-clip-text bg-gradient-to-r from-[#FF2B2B] via-[#FF8A8A] to-[#FF2B2B] drop-shadow-[0_0_40px_rgba(255,43,43,0.4)] animate-gradient-x bg-[length:200%_auto]">
            ELITE VISUALS
          </span>
          <span className="text-6xl sm:text-7xl md:text-[110px] lg:text-[130px] text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-white/30 drop-shadow-lg">
            FOR CREATORS
          </span>
        </motion.div>

        {/* Overpowered Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="relative max-w-4xl mx-auto mb-16 px-4"
        >
          {/* Subtle glowing accent line on top */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <p className="text-lg md:text-2xl lg:text-3xl text-white/40 leading-[1.6] font-medium text-center">
            Helping <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all hover:text-white/80 cursor-default">top creators</span>, <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all hover:text-white/80 cursor-default">football pages</span>, and <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all hover:text-white/80 cursor-default">brands</span>
            <br className="hidden md:block" />
            <span className="relative inline-block mx-2 my-2 md:my-1 group cursor-default">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ff8a8a] to-primary font-bold tracking-wide animate-gradient-x bg-[length:200%_auto]">
                dominate the feed
              </span>
              <span className="absolute inset-x-0 bottom-1 h-3 bg-primary/20 -z-10 blur-[6px] group-hover:bg-primary/40 transition-all duration-500"></span>
            </span>
            with premium, click-driven aesthetics.
          </p>

          {/* Subtle glowing accent line on bottom */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </motion.div>

        {/* Infinite Auto-Scrolling Carousel */}
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
          <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused]">
            {[...CAROUSEL_ICONS, ...CAROUSEL_ICONS, ...CAROUSEL_ICONS, ...CAROUSEL_ICONS].map((icon, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center w-16 h-16 md:w-[88px] md:h-[88px] mx-3 md:mx-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl backdrop-blur-md transition-all hover:-translate-y-2 hover:bg-white/[0.05] hover:border-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] shrink-0 group"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <img
                  src={icon.src}
                  alt={icon.name}
                  className="relative z-10 w-8 h-8 md:w-11 md:h-11 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all"
                />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          <button
            onClick={openContactModal}
            className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white rounded-xl overflow-hidden hover:scale-105 active:scale-[0.98] transition-all duration-500 shadow-[0_0_20px_rgba(255,43,43,0.15)] hover:shadow-[0_0_50px_rgba(255,43,43,0.4)] bg-primary/10 border border-primary/30 backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            <span className="relative flex items-center gap-3">
              Start a Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-rotate-12 transition-transform duration-300" />
            </span>
          </button>
        </motion.div>

      </div>



      <style>{`
        .floating-app-responsive {
          top: var(--top-sm);
          left: var(--left-sm);
        }
        @media (min-width: 768px) {
          .floating-app-responsive {
            top: var(--top-md);
            left: var(--left-md);
          }
        }
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 6s ease infinite;
        }
      `}</style>

    </section>
  );
}
