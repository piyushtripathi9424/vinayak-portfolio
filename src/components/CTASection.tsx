import { motion } from 'motion/react';
import { useUI } from '../contexts/UIContext';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  const { openContactModal } = useUI();

  return (
    <section className="py-32 relative z-10">
      <div className="max-w-5xl mx-auto px-4 md:px-6 relative">

        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-[var(--hero-bloom-solid)] blur-[100px] rounded-[100px] pointer-events-none" />

        <div className="liquid-glass-strong rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-bold text-text-main mb-6 leading-tight"
            >
              Ready To Make Your Visuals <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ff8a8a] to-primary animate-gradient-x bg-[length:200%_auto]">
                Impossible To Ignore?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-text-main/90 max-w-2xl mx-auto mb-10 font-medium"
            >
              Let’s create bold aesthetics that help your channel, page, or brand stand out and grow faster.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onClick={openContactModal}
              className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-text-main liquid-glass-btn rounded-full overflow-hidden active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              <span className="relative flex items-center gap-3">
                Contact Me
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </div>
        </div>

      </div>
    </section>
  );
}
