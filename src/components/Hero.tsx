import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { useUI } from '../contexts/UIContext';
import { ArrowRight } from 'lucide-react';
import React, { useRef, useEffect } from 'react';

const APPS = [
  { name: 'Ae', color: '#9999FF', baseLeft: '15%', baseTop: '20%', size: 52, delay: 0, depth: 'foreground', blur: 0, opacity: 0.8 },
  { name: 'Ps', color: '#31A8FF', baseLeft: '85%', baseTop: '15%', size: 56, delay: 0.2, depth: 'foreground', blur: 0, opacity: 0.85 },
  { name: 'Pr', color: '#EA77FF', baseLeft: '88%', baseTop: '55%', size: 44, delay: 0.4, depth: 'midground', blur: 1.5, opacity: 0.5 },
  { name: 'Ai', color: '#FF9A00', baseLeft: '10%', baseTop: '60%', size: 48, delay: 0.1, depth: 'midground', blur: 1.5, opacity: 0.5 },
  { name: 'Bl', color: '#EA7600', baseLeft: '75%', baseTop: '80%', size: 38, delay: 0.3, depth: 'background', blur: 3, opacity: 0.3 }, 
];

type FloatingAppProps = {
  app: typeof APPS[0], 
  mouseX: any, 
  mouseY: any,
  key?: React.Key
};

function FloatingApp({ 
  app, 
  mouseX, 
  mouseY 
}: FloatingAppProps) {
  const yFloating = useSpring(
    useTransform(useMotionValue(0), [0, 1], [0, 8]), 
    { stiffness: 30, damping: 25 }
  );
  
  // Create a continuous slow floating effect
  useEffect(() => {
    let animationFrame: number;
    let time = 0;
    const animate = () => {
      time += 0.005;
      const yOffset = Math.sin(time + app.delay * 10) * 8;
      yFloating.set(yOffset);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Parallax from mouse movement
  // Calculate relative to center screen
  const parallaxMultiplier = app.depth === 'foreground' ? 15 : app.depth === 'midground' ? 8 : 4;
  const xMovement = useTransform(mouseX, [-1000, 1000], [-parallaxMultiplier, parallaxMultiplier]);
  const yMovement = useTransform(mouseY, [-1000, 1000], [-parallaxMultiplier, parallaxMultiplier]);
  
  const springX = useSpring(xMovement, { stiffness: 30, damping: 40, mass: 2 });
  const springY = useSpring(yMovement, { stiffness: 30, damping: 40, mass: 2 });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: app.opacity, scale: 1 }}
      transition={{ 
        delay: 0.6 + app.delay, 
        type: 'spring', 
        stiffness: 80, 
        damping: 25 
      }}
      className={`absolute z-0 flex items-center justify-center cursor-pointer group ${app.depth === 'foreground' ? 'flex' : app.depth === 'midground' ? 'hidden sm:flex' : 'hidden md:flex'}`}
      style={{
        width: app.size,
        height: app.size,
        top: app.baseTop,
        left: app.baseLeft,
        marginLeft: -app.size / 2,
        marginTop: -app.size / 2,
        x: springX,
        y: springY,
        filter: `blur(${app.blur}px)`
      }}
      whileHover={{ 
        opacity: 1, 
        filter: 'blur(0px)', 
        scale: 1.1, 
        rotate: 2,
        transition: { duration: 0.3 } 
      }}
    >
      <motion.div
        style={{ y: yFloating }}
        className="relative w-full h-full rounded-2xl liquid-glass-standard border border-white/10 flex items-center justify-center shadow-lg backdrop-blur-md transition-shadow duration-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:border-white/20 group-hover:bg-black/40"
      >
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none blur-md"
          style={{ backgroundColor: app.color }}
        />
        <span 
          className="font-bold drop-shadow-md z-10"
          style={{ color: app.color, fontSize: app.size * 0.4 }}
        >
          {app.name}
        </span>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const { openContactModal } = useUI();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get mouse position relative to center of screen
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} id="home" className="relative min-h-[100svh] flex items-center justify-center pt-24 overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Floating Apps Background Layer */}
      {APPS.map((app, idx) => (
        <FloatingApp 
          key={app.name} 
          app={app} 
          mouseX={mouseX} 
          mouseY={mouseY} 
        />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="inline-block px-3 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md"
        >
          Visual Strategy & Creative Direction
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-display font-extrabold tracking-tighter leading-[0.9] mb-6 drop-shadow-2xl text-white"
        >
          CRAFTING <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-primary">ELITE VISUALS</span><br className="md:hidden" />
           FOR CREATORS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Helping creators, football pages, and brands stand out with premium visuals designed for clicks, engagement, and audience growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        >
          <button
            onClick={openContactModal}
            className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white liquid-glass-btn rounded-xl overflow-hidden hover:scale-105 active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(255,43,43,0.15)] hover:shadow-[0_0_40px_rgba(255,43,43,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none" />
            <span className="relative flex items-center gap-3">
              Contact Me
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-rotate-12 transition-transform duration-300" />
            </span>
          </button>
        </motion.div>

      </div>

      {/* Floating software icons aesthetic (pseudo-elements or small images can go here) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-[bounce_2s_infinite] opacity-50">
        <div className="w-6 h-10 border-2 border-text-muted rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-text-muted rounded-full"></div>
        </div>
      </div>

    </section>
  );
}
