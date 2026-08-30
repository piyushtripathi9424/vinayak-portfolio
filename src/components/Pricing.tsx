import { motion, AnimatePresence } from 'motion/react';
import { useUI } from '../contexts/UIContext';
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

const PACKAGES = [
  {
    title: "Single Thumbnail",
    price: "$10–$30",
    features: [
      "1 custom thumbnail",
      "2 revisions included",
      "High-quality export",
      "Fast delivery",
      "YouTube optimized"
    ],
    popular: false
  },
  {
    title: "Thumbnail Package",
    price: "$150",
    subtitle: "30 Thumbnails",
    features: [
      "30 premium thumbnails",
      "consistent branding",
      "priority workflow",
      "multiple styles supported",
      "better value pricing"
    ],
    popular: true
  },
  {
    title: "Custom Unlimited",
    price: "Custom Pricing",
    features: [
      "unlimited creative requests",
      "dedicated workflow",
      "long-term collaboration",
      "flexible support",
      "personalized strategy"
    ],
    popular: false,
    desc: "Pricing decided after meeting based on project requirements."
  }
];

export function Pricing() {
  const { openContactModal } = useUI();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % PACKAGES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + PACKAGES.length) % PACKAGES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentTouch = e.targetTouches[0].clientX;
    const diff = touchStart - currentTouch;

    if (diff > 50) {
      nextSlide();
      setTouchStart(null);
    } else if (diff < -50) {
      prevSlide();
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  return (
    <section id="pricing" className="py-24 relative z-10 bg-charcoal/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="text-center mb-20 relative z-10">
          <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Investment
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-main mb-6">
            Choose Your <span className="text-primary text-glow">Creative Package</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Flexible premium design solutions built for creators, brands, and long-term growth.
          </p>
        </div>

        {/* Mobile / Tablet Carousel */}
        <div 
          className="lg:hidden relative w-full h-[650px] flex items-center justify-center perspective-[2000px] touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Background Effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[600px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none transition-all duration-700 opacity-50" />
          
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence initial={false}>
              {PACKAGES.map((pkg, idx) => {
                let offset = idx - currentIndex;
                if (offset < -1) offset += PACKAGES.length;
                if (offset > 1) offset -= PACKAGES.length;

                const isCenter = offset === 0;
                const isRight = offset === 1;
                const isLeft = offset === -1;

                return (
                  <motion.div
                    key={idx}
                    className={`absolute w-full max-w-sm md:max-w-md ${isCenter ? 'cursor-default pointer-events-auto' : 'cursor-pointer pointer-events-auto'}`}
                    initial={false}
                    animate={{
                      scale: isCenter ? 1.05 : 0.82,
                      x: isCenter ? '0%' : isLeft ? '-105%' : '105%',
                      z: isCenter ? 50 : 0,
                      opacity: isCenter ? 1 : 0.4,
                      filter: `blur(${isCenter ? '0px' : '4px'})`,
                    }}
                    transition={{
                      duration: 0.65,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    style={{
                      zIndex: isCenter ? 30 : 10,
                    }}
                    onClick={() => {
                      if (isLeft) prevSlide();
                      if (isRight) nextSlide();
                    }}
                  >
                    <div className={`relative rounded-3xl p-8 transition-colors duration-700 h-full flex flex-col ${
                      isCenter 
                        ? 'liquid-glass-strong' 
                        : 'liquid-glass-standard'
                    }`}>
                      {pkg.popular && isCenter && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 10,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              left: '-16px',
                              right: '-16px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              height: '3px',
                              background: 'var(--charcoal-color)',
                              zIndex: -1,
                            }}
                          />
                          <div
                            className="bg-primary text-text-main font-bold text-sm tracking-widest uppercase rounded-full shadow-[0_0_20px_var(--primary-glow-strong)] whitespace-nowrap"
                            style={{ padding: '6px 18px' }}
                          >
                            Most Popular
                          </div>
                        </div>
                      )}
                      
                      <div className="mb-6">
                        <h3 className="text-xl font-display font-semibold text-text-muted mb-2">{pkg.title}</h3>
                        <div className="flex items-end gap-2 mb-2">
                          <span className="text-4xl font-display font-bold text-text-main">{pkg.price}</span>
                        </div>
                        {pkg.subtitle && (
                          <p className="text-sm font-medium text-primary">{pkg.subtitle}</p>
                        )}
                        {pkg.desc && (
                          <p className="text-sm text-text-muted mt-4 italic">"{pkg.desc}"</p>
                        )}
                      </div>

                      <div className="space-y-4 mb-8 flex-1">
                        {pkg.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-3 text-left">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-text-main font-medium leading-relaxed">{feat}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isCenter) openContactModal();
                        }}
                        tabIndex={isCenter ? 0 : -1}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all mt-auto ${
                          isCenter 
                            ? 'liquid-glass-btn text-text-main' 
                            : 'liquid-glass-standard text-text-main disabled:opacity-50'
                        }`}
                      >
                        Contact Me
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full max-w-[1200px] flex justify-between px-2 pointer-events-none z-40">
            <button
              onClick={prevSlide}
              className="pointer-events-auto w-12 h-12 rounded-full liquid-glass-standard flex items-center justify-center text-text-main hover:scale-110 hover:border-primary transition-all duration-300 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="pointer-events-auto w-12 h-12 rounded-full liquid-glass-standard flex items-center justify-center text-text-main hover:scale-110 hover:border-primary transition-all duration-300 shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-6 xl:gap-8 max-w-6xl mx-auto relative z-10 items-stretch">
          {/* Background Effects for grid */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[600px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none transition-all duration-700 opacity-30" />

          {PACKAGES.map((pkg, idx) => {
            const isCenter = pkg.popular;
            
            return (
              <div 
                key={idx} 
                className={`relative flex flex-col rounded-3xl p-8 xl:p-10 transition-colors duration-700 ${
                  isCenter 
                    ? 'liquid-glass-strong border-2 border-primary scale-[1.03] shadow-[0_0_40px_rgba(112,0,255,0.15)] z-20' 
                    : 'liquid-glass-standard z-10'
                }`}
              >
                {isCenter && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                    <div
                      className="bg-primary text-text-main font-bold text-sm tracking-widest uppercase rounded-full shadow-[0_0_20px_var(--primary-glow-strong)] whitespace-nowrap"
                      style={{ padding: '6px 20px' }}
                    >
                      Best Deal
                    </div>
                  </div>
                )}
                
                <div className="mb-6 mt-2">
                  <h3 className="text-xl font-display font-semibold text-text-muted mb-2">{pkg.title}</h3>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-4xl xl:text-5xl font-display font-bold text-text-main">{pkg.price}</span>
                  </div>
                  {pkg.subtitle && (
                    <p className="text-sm font-medium text-primary">{pkg.subtitle}</p>
                  )}
                  {pkg.desc && (
                    <p className="text-sm text-text-muted mt-4 italic">"{pkg.desc}"</p>
                  )}
                </div>

                <div className="space-y-4 mb-8 flex-1">
                  {pkg.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3 text-left">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-text-main font-medium leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => openContactModal()}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all mt-auto ${
                    isCenter 
                      ? 'bg-primary text-text-main shadow-[0_0_20px_var(--primary-glow-strong)] hover:scale-105' 
                      : 'liquid-glass-standard text-text-main hover:border-primary/50'
                  }`}
                >
                  Contact Me
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
