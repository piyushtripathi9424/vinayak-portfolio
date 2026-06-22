import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export function CustomCursor() {
  // Raw motion values — updated directly from mousemove, zero re-renders
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Dot: very tight spring — feels almost instant but avoids micro-jitter
  const dotX = useSpring(mouseX, { stiffness: 2000, damping: 80, mass: 0.05 });
  const dotY = useSpring(mouseY, { stiffness: 2000, damping: 80, mass: 0.05 });

  // Ring: loose, well-overdamped spring — smooth lag, no oscillation
  const ringX = useSpring(mouseX, { stiffness: 90, damping: 22, mass: 0.8 });
  const ringY = useSpring(mouseY, { stiffness: 90, damping: 22, mass: 0.8 });

  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only on desktop (pointer: fine = mouse)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let rafId: number;

    const onMove = (e: MouseEvent) => {
      // Update motion values directly — no state, no re-render
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    // Use mouseover (fires on element change) instead of checking elementFromPoint
    // on every mousemove — much cheaper
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive = !!el.closest(
        'a, button, [role="button"], input, textarea, select, label, .cursor-pointer, [data-cursor-hover]'
      );
      setIsPointer(interactive);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY, isVisible]);

  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  return (
    <>
      {/* Outer ring — lags smoothly behind */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9995] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isPointer ? 42 : 30,
          height: isPointer ? 42 : 30,
          borderColor: isPointer ? 'var(--primary-glow-strong)' : 'var(--cursor-ring)',
          backgroundColor: isPointer ? 'var(--primary-glow)' : 'transparent',
          boxShadow: isPointer ? '0 0 14px var(--primary-glow)' : 'none',
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { duration: 0.25, ease: 'easeOut' },
          height: { duration: 0.25, ease: 'easeOut' },
          borderColor: { duration: 0.2 },
          backgroundColor: { duration: 0.2 },
          boxShadow: { duration: 0.2 },
          opacity: { duration: 0.3 },
        }}
      />

      {/* Inner dot — near-instant tracking */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9996] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isPointer ? 5 : 4,
          height: isPointer ? 5 : 4,
          backgroundColor: isPointer ? '#FF2B2B' : 'var(--cursor-dot)',
          boxShadow: isPointer ? '0 0 6px #FF2B2B' : 'none',
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { duration: 0.2, ease: 'easeOut' },
          height: { duration: 0.2, ease: 'easeOut' },
          backgroundColor: { duration: 0.15 },
          opacity: { duration: 0.3 },
        }}
      />
    </>
  );
}
