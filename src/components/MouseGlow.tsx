import { useEffect, useState } from 'react';

export function MouseGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div 
        className="absolute w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out will-change-transform mix-blend-screen"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
    </div>
  );
}
