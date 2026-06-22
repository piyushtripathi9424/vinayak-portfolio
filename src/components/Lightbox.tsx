import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useCallback } from 'react';
import { useLightbox } from '../contexts/LightboxContext';
import { useUI } from '../contexts/UIContext';
import { X, ChevronLeft, ChevronRight, ArrowRight, ExternalLink } from 'lucide-react';

const CATEGORY_META = {
  Thumbnail: {
    badge: 'YouTube Thumbnail',
    description: 'Precision-engineered thumbnail designed to maximize click-through rate. Every element — lighting, text hierarchy, and focal composition — is strategically placed to stop the scroll and drive clicks.',
    tags: ['CTR Optimized', 'YouTube Ready', '4K Resolution'],
  },
  Poster: {
    badge: 'Cinematic Poster',
    description: 'High-impact cinematic artwork crafted for social media presence and brand identity. Combines dramatic lighting, typography, and visual storytelling for maximum aesthetic impact.',
    tags: ['Cinematic Art', 'Brand Identity', 'Social Media'],
  },
};

export function Lightbox() {
  const { item, closeLightbox, goNext, goPrev } = useLightbox();
  const { openContactModal } = useUI();
  const isOpen = !!item;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    },
    [isOpen, closeLightbox, goNext, goPrev]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const meta = item ? CATEGORY_META[item.category] : null;

  return (
    <AnimatePresence>
      {isOpen && item && meta && (
        <motion.div
          key="lightbox-overlay"
          className="fixed inset-0 z-[9990] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/90 backdrop-blur-xl"
            onClick={closeLightbox}
          />

          {/* Modal container */}
          <motion.div
            className="relative z-10 w-full max-w-6xl mx-4 md:mx-6 flex flex-col lg:flex-row gap-0 rounded-3xl overflow-hidden shadow-[0_0_80px_var(--primary-glow)] max-h-[90vh] lg:max-h-[85vh] liquid-glass-strong border border-white/10"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close button (Absolute to entire modal) */}
            <button
              onClick={closeLightbox}
              className="absolute top-3 right-3 lg:top-5 lg:right-5 z-50 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-text-main hover:text-primary hover:border-primary/50 transition-all duration-300 shadow-xl"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            {/* ── Image Panel ── */}
            <div className="relative w-full lg:w-auto lg:flex-1 h-[45vh] lg:h-auto lg:min-h-[600px] flex items-center justify-center p-2 md:p-8 lg:p-12 overflow-hidden bg-black/5 md:bg-black/40 flex-none">
              <AnimatePresence mode="wait">
                <motion.img
                  key={item.src}
                  src={item.src}
                  alt={`${item.category} artwork`}
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-md"
                  initial={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.97, filter: 'blur(10px)' }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>

              {/* Prev / Next arrows */}
              <button
                onClick={goPrev}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-text-main hover:border-primary hover:text-primary hover:scale-110 active:scale-95 transition-all duration-300 z-20 shadow-xl"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 -ml-0.5" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-text-main hover:border-primary hover:text-primary hover:scale-110 active:scale-95 transition-all duration-300 z-20 shadow-xl"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 -mr-0.5" />
              </button>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-text-main/80 font-mono tracking-widest shadow-lg z-20">
                {item.index + 1} / {item.allImages.length}
              </div>
            </div>

            {/* ── Detail Panel ── */}
            <div className="relative w-full lg:w-[360px] xl:w-[420px] flex-1 lg:flex-none flex flex-col p-6 md:p-8 lg:p-10 gap-6 lg:gap-8 overflow-y-auto border-t lg:border-t-0 lg:border-l border-white/10 bg-background/40">
              
              {/* Category badge */}
              <div className="inline-block w-fit px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-widest mt-2 lg:mt-0">
                {meta.badge}
              </div>

              {/* Title */}
              <div>
                <h2 className="text-3xl font-display font-bold text-text-main mb-4 leading-tight">
                  Premium {item.category} Design
                </h2>
                <div className="w-12 h-[3px] bg-gradient-to-r from-primary to-transparent rounded-full shadow-[0_0_12px_#FF2B2B]" />
              </div>

              {/* Description */}
              <p className="text-text-muted leading-relaxed text-sm md:text-base">
                {meta.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2.5">
                {meta.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-text-main/80 font-medium tracking-wide shadow-inner"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent my-2" />

              {/* CTA */}
              <div className="mt-auto space-y-4 pb-4 lg:pb-0">
                <p className="text-xs md:text-sm text-text-muted/80 font-medium">
                  Like this style? Let's create something similar for your brand.
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => { closeLightbox(); openContactModal(); }}
                    className="w-full group relative flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-text-main bg-primary/20 border border-primary/40 hover:bg-primary/30 hover:border-primary/60 hover:shadow-[0_0_30px_rgba(255,43,43,0.3)] overflow-hidden transition-all duration-300 text-sm md:text-base"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <span className="relative flex items-center gap-2">
                      Get This Style
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                  </button>
                  <a
                    href="https://drive.google.com/drive/u/1/folders/1UnSEcemhPRRpyLPDxHkAoLTnE5zf4-OV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-text-muted bg-white/5 border border-white/10 hover:bg-white/10 hover:text-text-main transition-all duration-300 text-sm md:text-base"
                  >
                    Full Archive
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Keyboard hint */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-4 text-xs text-text-main/30">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-text-main/10 font-mono">←→</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-text-main/10 font-mono">Esc</kbd> Close
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
