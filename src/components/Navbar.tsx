import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { useUI } from '../contexts/UIContext';
import { NAV_LINKS, CONTACT } from '../data';
import { Instagram, Twitter } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function MagneticItem({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: (e: React.MouseEvent) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const hX = e.clientX - rect.left - rect.width / 2;
      const hY = e.clientY - rect.top - rect.height / 2;
      x.set(hX * 0.35); // Slight magnetic pull factor
      y.set(hY * 0.35);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

export function Navbar() {
  const { openContactModal } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [navHovered, setNavHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.substring(2);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
        scrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        
        {/* Cursor Proximity Glow Background */}
        <div 
          className={`absolute inset-0 bg-primary/10 blur-[40px] rounded-full transition-opacity duration-700 pointer-events-none z-0 ${
            navHovered ? 'opacity-100' : 'opacity-0'
          }`} 
        />

        <div 
          className={`relative z-10 transition-all duration-700 ease-in-out rounded-full px-3 sm:px-6 md:px-8 flex items-center justify-between shadow-2xl shadow-black/80 ${
            scrolled 
              ? 'h-14 bg-[rgba(5,5,5,0.7)] backdrop-blur-[30px] border border-white/5' 
              : 'h-16 liquid-glass-standard'
          }`}
          onMouseEnter={() => setNavHovered(true)}
          onMouseLeave={() => setNavHovered(false)}
        >
          
          {/* Logo */}
          <MagneticItem>
            <Link to="/" onClick={() => window.scrollTo(0,0)} className="text-lg sm:text-xl md:text-2xl font-display font-bold tracking-tighter flex items-center gap-1 hover:scale-105 transition-transform duration-500">
              <span className="text-white">VINAYAK</span> <span className="text-primary drop-shadow-[0_0_10px_rgba(255,43,43,0.5)]">PANDEY</span>
            </Link>
          </MagneticItem>

          {/* Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-2" onMouseLeave={() => setHoveredIndex(null)}>
            {NAV_LINKS.map((link, index) => {
              const isActive = hoveredIndex === index;
              return (
                <div 
                  key={link.label}
                  className="relative z-10"
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  <MagneticItem>
                    <Link
                      to={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`relative px-5 py-2.5 block text-sm font-medium transition-all duration-500 z-10 ${
                        isActive 
                          ? 'text-primary drop-shadow-[0_0_12px_rgba(255,43,43,0.8)] scale-105' 
                          : 'text-white/70 hover:text-white/90'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </MagneticItem>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="nav-hover-pill"
                        className="absolute inset-0 bg-primary/20 border border-primary/30 backdrop-blur-md rounded-full -z-10 shadow-[0_0_20px_rgba(255,43,43,0.3)] pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        transition={{ 
                          type: 'spring', 
                          stiffness: 400, 
                          damping: 30,
                          mass: 0.8
                        }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-1 mr-2">
              <MagneticItem>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full text-white/60 hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,43,43,0.3)] flex items-center justify-center group">
                  <Instagram className="w-4 h-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                </a>
              </MagneticItem>
              <MagneticItem>
                <a href={CONTACT.twitter} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full text-white/60 hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,43,43,0.3)] flex items-center justify-center group">
                  <Twitter className="w-4 h-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                </a>
              </MagneticItem>
            </div>
            <div className={`hidden md:block w-px transition-all duration-500 bg-gradient-to-b from-transparent via-white/20 to-transparent ${scrolled ? 'h-5' : 'h-8'}`} />
            
            <MagneticItem>
              <button
                onClick={openContactModal}
                className="relative group overflow-hidden px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold text-white tracking-widest transition-all duration-500 hover:scale-105 active:scale-95 bg-primary/20 border border-primary/30 hover:border-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),_0_0_15px_rgba(255,43,43,0.2)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),_0_0_30px_rgba(255,43,43,0.5)] flex items-center justify-center backdrop-blur-md"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none" />
                <span className="relative z-10 uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                  Contact Me
                </span>
                <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full" />
              </button>
            </MagneticItem>
          </div>

        </div>
      </div>
    </motion.header>
  );
}
