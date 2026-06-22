import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { useUI } from '../contexts/UIContext';

export function NotFound() {
  const { openContactModal } = useUI();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">

      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_var(--hero-bloom)_0%,_transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">

        {/* Giant 404 */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-4 select-none"
        >
          <span
            className="font-display font-extrabold text-[25vw] sm:text-[180px] leading-none text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(180deg, var(--primary-glow) 0%, var(--primary-glow) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            404
          </span>
          {/* Glowing overlay text */}
          <span
            className="absolute inset-0 flex items-center justify-center font-display font-extrabold text-[25vw] sm:text-[180px] leading-none text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 60px var(--primary-glow))',
            }}
          >
            404
          </span>
        </motion.div>

        {/* Red accent line */}
        <motion.div
          className="w-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8 shadow-[0_0_12px_#FF2B2B]"
          animate={{ width: '160px' }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
        />

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h1 className="text-2xl md:text-4xl font-display font-bold text-text-main mb-4">
            Lost in the <span className="text-primary text-glow">Feed?</span>
          </h1>
          <p className="text-text-muted text-base md:text-lg leading-relaxed mb-10 max-w-md mx-auto">
            This page doesn't exist — but great visuals do. Head back and let's create something worth clicking.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/"
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-text-main liquid-glass-btn overflow-hidden text-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <Home className="w-4 h-4 relative" />
            <span className="relative">Back to Home</span>
          </Link>

          <button
            onClick={openContactModal}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-text-muted liquid-glass-standard hover:text-text-main hover:border-primary/40 transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Start a Project
          </button>
        </motion.div>

        {/* Bottom watermark */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-16 text-text-muted/30 text-xs font-display tracking-widest uppercase"
        >
          Vinayak Pandey · Visual Studio
        </motion.p>

      </div>
    </div>
  );
}
