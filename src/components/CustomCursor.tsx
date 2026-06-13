import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export function CustomCursor() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);

  // Dot follows exactly (very stiff)
  const dotX = useSpring(cursorX, { stiffness: 800, damping: 40, mass: 0.2 });
  const dotY = useSpring(cursorY, { stiffness: 800, damping: 40, mass: 0.2 });

  // Ring follows with lag (loose spring)
  const ringX = useSpring(cursorX, { stiffness: 120, damping: 18, mass: 0.6 });
  const ringY = useSpring(cursorY, { stiffness: 120, damping: 18, mass: 0.6 });

  const [isPointer, setIsPointer]   = useState(false);
  const [isVisible, setIsVisible]   = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Only activate on desktop (pointer: fine = mouse)
    const mq = window.matchMedia('(pointer: fine)');
    if (!mq.matches) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      // Detect if hovered element is interactive
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (el) {
        const interactive = el.closest(
          'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover], .cursor-pointer'
        );
        setIsPointer(!!interactive);
      }
    };

    const onLeave  = () => setIsVisible(false);
    const onEnter  = () => setIsVisible(true);
    const onDown   = () => setIsClicking(true);
    const onUp     = () => setIsClicking(false);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
    };
  }, [cursorX, cursorY]);

  // SSR / mobile guard
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  return (
    <>
      {/* Outer ring — lags behind */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9995] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
          width:  isPointer ? 44 : isClicking ? 22 : 32,
          height: isPointer ? 44 : isClicking ? 22 : 32,
          borderColor: isPointer ? 'rgba(255,43,43,0.9)' : 'rgba(255,255,255,0.4)',
          backgroundColor: isPointer ? 'rgba(255,43,43,0.08)' : 'transparent',
          boxShadow: isPointer ? '0 0 16px rgba(255,43,43,0.3)' : 'none',
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease, opacity 0.3s ease',
        }}
      />

      {/* Inner dot — follows exactly */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9996] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
          width:  isPointer ? 6 : isClicking ? 3 : 4,
          height: isPointer ? 6 : isClicking ? 3 : 4,
          backgroundColor: isPointer ? '#FF2B2B' : '#ffffff',
          boxShadow: isPointer ? '0 0 8px #FF2B2B' : 'none',
          transition: 'width 0.15s ease, height 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease, opacity 0.3s ease',
        }}
      />
    </>
  );
}
