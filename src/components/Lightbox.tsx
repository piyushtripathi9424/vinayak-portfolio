import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useCallback } from 'react';
import { useLightbox } from '../contexts/LightboxContext';
import { useUI } from '../contexts/UIContext';
import { X, ChevronLeft, ChevronRight, ArrowRight, ExternalLink } from 'lucide-react';

const CATEGORY_META = {
  Thumbnail: {
    badge: 'YouTube Thumbnail',
    description: 'Precision-engineered thumbnail designed to maximize click-through rate. Every element — lighting, text hierarchy, and focal composition — is strategically placed to stop the scroll and drive clicks.',
    tags: ['CTR Optimized', 'YouTube Ready', '1280×720px'],
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
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            onClick={closeLightbox}
          />

          {/* Modal container */}
          <motion.div
            className="relative z-10 w-full max-w-6xl mx-4 md:mx-6 flex flex-col lg:flex-row gap-0 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(255,43,43,0.15)] max-h-[90vh]"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            {/* ── Image Panel ── */}
            <div className="relative flex-1 min-h-[300px] lg:min-h-[560px] bg-black flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={item.src}
                  src={item.src}
                  alt={`${item.category} artwork`}
                  className="w-full h-full object-contain max-h-[60vh] lg:max-h-[90vh]"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              </AnimatePresence>

              {/* Prev / Next arrows */}
              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full liquid-glass-standard flex items-center justify-center text-white hover:border-primary hover:text-primary transition-all duration-200 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full liquid-glass-standard flex items-center justify-center text-white hover:border-primary hover:text-primary transition-all duration-200 z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full liquid-glass-standard text-xs text-text-muted font-mono">
                {item.index + 1} / {item.allImages.length}
              </div>
            </div>

            {/* ── Detail Panel ── */}
            <div className="relative w-full lg:w-[320px] xl:w-[360px] flex-shrink-0 liquid-glass-strong flex flex-col p-7 gap-6 overflow-y-auto">
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-9 h-9 rounded-full liquid-glass-standard flex items-center justify-center text-text-muted hover:text-white hover:border-primary transition-all duration-200"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Category badge */}
              <div className="inline-block w-fit px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
                {meta.badge}
              </div>

              {/* Title */}
              <div>
                <h2 className="text-2xl font-display font-bold text-white mb-3 leading-tight">
                  Premium {item.category} Design
                </h2>
                <div className="w-10 h-[2px] bg-primary shadow-[0_0_8px_#FF2B2B]" />
              </div>

              {/* Description */}
              <p className="text-text-muted leading-relaxed text-sm">
                {meta.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {meta.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-text-muted font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-gradient-to-r from-primary/20 via-white/5 to-transparent" />

              {/* CTA */}
              <div className="mt-auto space-y-3">
                <p className="text-xs text-text-muted">
                  Like this style? Let's create something similar for your channel.
                </p>
                <button
                  onClick={() => { closeLightbox(); openContactModal(); }}
                  className="w-full group relative flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-white liquid-glass-btn overflow-hidden transition-all text-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative flex items-center gap-2">
                    Get This Style
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <a
                  href="https://drive.google.com/drive/u/1/folders/1UnSEcemhPRRpyLPDxHkAoLTnE5zf4-OV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-text-muted liquid-glass-standard hover:text-white transition-all text-sm"
                >
                  Full Archive
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Keyboard hint */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-4 text-xs text-white/30">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">←→</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">Esc</kbd> Close
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
