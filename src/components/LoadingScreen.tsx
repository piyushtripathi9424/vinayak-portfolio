import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

const LETTERS_NAME = 'VINAYAK PANDEY'.split('');
const LETTERS_SUB = 'VISUAL STUDIO'.split('');

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');

  useEffect(() => {
    // after letters animate in (~1.2s) + hold (0.6s) → exit
    const holdTimer = setTimeout(() => setPhase('hold'), 1200);
    const exitTimer = setTimeout(() => setPhase('exit'), 1800);
    const doneTimer = setTimeout(() => onComplete(), 2700);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ambient glow orb */}
          <motion.div
            className="absolute w-[600px] h-[300px] rounded-full bg-primary/20 blur-[120px] pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)]" />

          <div className="relative z-10 text-center select-none">
            {/* Sweeping red line */}
            <motion.div
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_#FF2B2B]"
              style={{ top: '50%' }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Main Name */}
            <div className="flex items-center justify-center overflow-hidden mb-3">
              {LETTERS_NAME.map((char, i) => (
                <motion.span
                  key={i}
                  className={`font-display font-extrabold tracking-[0.15em] text-4xl md:text-6xl ${char === ' ' ? 'w-4 md:w-8' : 'text-text-main'
                    }`}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.05 + i * 0.045,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Divider line */}
            <motion.div
              className="w-0 h-[1px] bg-gradient-to-r from-transparent via-primary/70 to-transparent mx-auto mb-3"
              animate={{ width: phase === 'hold' || phase === 'exit' ? '80%' : '0%' }}
              transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
            />

            {/* Subtitle */}
            <div className="flex items-center justify-center gap-1 overflow-hidden">
              {LETTERS_SUB.map((char, i) => (
                <motion.span
                  key={i}
                  className={`font-sans font-semibold tracking-[0.35em] text-xs md:text-sm text-primary/80 uppercase ${char === ' ' ? 'w-2 md:w-3' : ''
                    }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.6 + i * 0.04,
                    ease: 'easeOut',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Loading progress bar */}
            <motion.div
              className="mt-12 mx-auto h-[2px] bg-text-main/5 rounded-full overflow-hidden"
              style={{ width: '120px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary/60 via-primary to-primary/60 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.6, delay: 0.2, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>

          {/* Split-wipe exit panels */}
          <AnimatePresence>
            {phase === 'exit' && (
              <>
                <motion.div
                  key="left"
                  className="absolute inset-y-0 left-0 w-1/2 bg-background origin-right z-20"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
                />
                <motion.div
                  key="right"
                  className="absolute inset-y-0 right-0 w-1/2 bg-background origin-left z-20"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
