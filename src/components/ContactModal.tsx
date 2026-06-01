import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { Mail, Copy, Check, Instagram, Twitter, X } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { CONTACT } from '../data';
import { useUI } from '../contexts/UIContext';

function MagneticCloseButton({ onClick }: { onClick: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const hX = e.clientX - rect.left - rect.width / 2;
      const hY = e.clientY - rect.top - rect.height / 2;
      x.set(hX * 0.4); // Magnetic pull factor
      y.set(hY * 0.4);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="absolute top-6 right-6 p-2 rounded-full liquid-glass-standard border border-white/10 hover:border-primary/50 text-white/50 hover:text-white transition-colors duration-300 z-50 group hover:shadow-[0_0_15px_rgba(255,43,43,0.3)] bg-black/40 backdrop-blur-md"
    >
      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
      <X className="w-5 h-5 relative z-10" />
    </motion.button>
  );
}

export function ContactModal() {
  const { isContactModalOpen, closeContactModal } = useUI();
  const [copied, setCopied] = useState(false);

  // Esc to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeContactModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeContactModal]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <AnimatePresence>
      {isContactModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop with cinematic blur dissolve */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={closeContactModal}
            className="absolute inset-0 bg-[#050505]/70"
          >
            {/* Ambient Radial Lighting on Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,43,43,0.15)_0%,_transparent_60%)] pointer-events-none" 
            />
          </motion.div>

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.3, ease: 'easeIn' } }}
            transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 0.8 }}
            className="relative w-full max-w-lg liquid-glass-strong rounded-3xl p-8 overflow-hidden border border-white/10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8),_0_0_30px_rgba(255,43,43,0.2)] bg-black/60"
          >
            {/* Inner Glow Effects */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/25 blur-[60px] rounded-full pointer-events-none mix-blend-screen" 
            />

            <MagneticCloseButton onClick={closeContactModal} />

            <div className="text-center relative z-10 pt-4 pb-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', delay: 0.1, stiffness: 200, damping: 20 }}
                className="w-16 h-16 bg-gradient-to-br from-[#220000] to-primary/40 rounded-2xl mx-auto flex items-center justify-center mb-6 box-glow-strong border border-primary/50 relative group"
              >
                <div className="absolute inset-0 bg-primary/20 blur-md rounded-2xl pointer-events-none group-hover:bg-primary/40 transition-colors duration-500" />
                <Mail className="w-8 h-8 text-primary drop-shadow-[0_0_8px_rgba(255,43,43,0.8)] relative z-10" />
              </motion.div>
              <h2 className="text-3xl font-display font-bold text-white mb-3 tracking-tight">Let's Work Together</h2>
              <p className="text-white/60 text-lg">Ready to drop jaws and build audiences?</p>
            </div>

            <div className="space-y-4 relative z-10">
              <div className="p-4 rounded-xl bg-black/80 border border-white/20 flex items-center justify-between shadow-inner shadow-black/50">
                <span className="text-lg font-bold text-white truncate mr-4">
                  {CONTACT.email}
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-primary/50 text-white transition-all duration-300 group hover:shadow-[0_0_15px_rgba(255,43,43,0.2)] active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]" />
                      <span className="text-sm font-bold text-green-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
                      <span className="text-sm font-bold text-white">Copy</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={`mailto:${CONTACT.email}`}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(255,43,43,0.4)] active:scale-[0.98] transition-all duration-300 overflow-hidden relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none" />
                <Mail className="w-5 h-5 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
                <span className="drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">Send Email</span>
              </a>

              <div className="pt-6 flex justify-center gap-4">
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-full bg-white/10 border border-white/20 text-white hover:border-primary/50 hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,43,43,0.3)] hover:scale-110 active:scale-95 group"
                >
                  <Instagram className="w-5 h-5 group-hover:rotate-6 transition-transform duration-300" />
                </a>
                <a
                  href={CONTACT.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-full bg-white/10 border border-white/20 text-white hover:border-primary/50 hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,43,43,0.3)] hover:scale-110 active:scale-95 group"
                >
                  <Twitter className="w-5 h-5 group-hover:rotate-6 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
