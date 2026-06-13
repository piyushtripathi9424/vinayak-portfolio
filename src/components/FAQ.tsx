import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { FAQ_ITEMS } from '../data';
import { FadeInSection } from './FadeInSection';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-24 relative z-10 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 md:px-6">

        {/* Heading */}
        <FadeInSection className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Common <span className="text-primary text-glow">Questions</span>
          </h2>
          <p className="text-lg text-text-muted max-w-xl mx-auto">
            Everything you need to know before we start working together.
          </p>
        </FadeInSection>

        {/* Accordion items */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx}>
              <FadeInSection delay={idx * 0.07}>
                <div
                  className={`relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group
                    ${isOpen
                      ? 'liquid-glass-strong border-l-2 border-primary shadow-[0_0_30px_rgba(255,43,43,0.12)]'
                      : 'liquid-glass-standard hover:shadow-[0_0_20px_rgba(255,43,43,0.08)]'
                    }`}
                  onClick={() => toggle(idx)}
                  role="button"
                  aria-expanded={isOpen}
                  id={`faq-item-${idx}`}
                >
                  {/* Question row */}
                  <div className="flex items-center justify-between px-6 py-5 gap-4">
                    <h3
                      className={`font-display font-semibold text-base md:text-lg transition-colors duration-200 ${
                        isOpen ? 'text-white' : 'text-text-main group-hover:text-white'
                      }`}
                    >
                      {item.question}
                    </h3>

                    {/* Toggle icon */}
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-colors duration-200 ${
                        isOpen
                          ? 'border-primary bg-primary/20 text-primary'
                          : 'border-white/10 bg-white/5 text-text-muted group-hover:border-primary/50 group-hover:text-primary'
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Answer (animated expand) */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1">
                          <div className="w-full h-[1px] bg-gradient-to-r from-primary/30 via-primary/10 to-transparent mb-4" />
                          <p className="text-text-muted leading-relaxed text-sm md:text-base">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeInSection>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA hint */}
        <FadeInSection delay={0.5} className="text-center mt-14">
          <p className="text-text-muted text-sm">
            Still have questions?{' '}
            <a
              href="mailto:vinayakpandey266@gmail.com"
              className="text-primary hover:underline font-semibold transition-colors"
            >
              Drop me an email
            </a>
            {' '}or hit the contact button below.
          </p>
        </FadeInSection>

      </div>
    </section>
  );
}
