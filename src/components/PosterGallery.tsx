import { motion } from 'motion/react';
import { POSTERS } from '../data';
import { Link } from 'react-router-dom';

export function PosterGallery() {
  // Distribute posters across 3 cinematic layers
  const r1 = [POSTERS[0], POSTERS[1], POSTERS[2]];
  const r2 = [POSTERS[3], POSTERS[4], POSTERS[5]];
  const r3 = [POSTERS[6], POSTERS[7], POSTERS[8]];

  // Duplicate to ensure seamless continuous looping
  const row1Count = [...r1, ...r1, ...r1, ...r1];
  const row2Count = [...r2, ...r2, ...r2, ...r2];
  const row3Count = [...r3, ...r3, ...r3, ...r3];

  return (
    <section id="posters" className="py-24 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none z-10" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center md:items-end justify-between select-none mb-16">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Cinematic Art
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Poster Work <span className="text-glow text-primary">Gallery</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto md:mx-0">
            Cinematic storytelling elements composed for high-impact presence and artistic branding.
          </p>
        </div>
        
        <Link 
          to="/work"
          className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white liquid-glass-strong rounded-full overflow-hidden hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,43,43,0.15)] hover:shadow-[0_0_30px_rgba(255,43,43,0.4)] border border-primary/30 hover:border-primary z-20"
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

      <div className="relative w-full overflow-hidden flex flex-col gap-8 md:gap-12 select-none">
        {/* Side gradient limit filters */}
        <div className="absolute top-0 left-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-black via-black/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-black via-black/70 to-transparent z-10 pointer-events-none" />



        {/* ==================== ROW 2: ARTISTIC MIDGROUND LAYER ==================== */}
        <div className="w-full overflow-hidden">
          <div className="flex gap-10 md:gap-12 w-max animate-[scroll-left_85s_linear_infinite] hover:[animation-play-state:paused] will-change-transform">
            {row2Count.map((src, idx) => (
              <motion.div
                key={`p2-${idx}`}
                whileHover={{ scale: 1.03, y: -4 }}
                className="relative w-[150px] h-[212px] md:w-[250px] md:h-[353px] rounded-2xl overflow-hidden shadow-xl liquid-glass-standard group flex-shrink-0 cursor-pointer"
              >
                <img
                  src={src}
                  alt="Midground Poster artwork"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 border border-transparent group-hover:border-primary/20 rounded-2xl transition-colors duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ==================== ROW 1: ARTISTIC FOREGROUND LAYER ==================== */}
        <div className="w-full overflow-hidden z-20">
          <div className="flex gap-8 md:gap-10 w-max animate-[scroll-right_55s_linear_infinite] hover:[animation-play-state:paused] will-change-transform">
            {row1Count.map((src, idx) => (
              <motion.div
                key={`p1-${idx}`}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="relative w-[200px] h-[282px] md:w-[320px] md:h-[451px] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,43,43,0.15)] liquid-glass-strong group flex-shrink-0 cursor-pointer"
              >
                <img
                  src={src}
                  alt="Foreground Poster artwork"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 animate-[pulse-slow_8s_ease-in-out_infinite]"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 z-10 pointer-events-none">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <div className="w-8 h-[2px] bg-primary mb-2 shadow-[0_0_10px_#FF2B2B]" />
                    <p className="text-white font-semibold uppercase tracking-widest text-xs">Cinematic Design</p>
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/40 rounded-2xl transition-colors duration-300 pointer-events-none z-20" />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
