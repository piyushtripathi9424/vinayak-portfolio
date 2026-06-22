import { motion } from 'motion/react';
import { MessageSquare, Cpu, Search, CheckCircle, Send } from 'lucide-react';

const STEPS = [
  {
    title: "Share Your Idea",
    desc: "Reach out with your vision, assets, and channel goals.",
    icon: <MessageSquare size={28} />,
    step: "01",
  },
  {
    title: "Strategy",
    desc: "We analyze the meta and plan the optimal layout for CTR.",
    icon: <Search size={28} />,
    step: "02",
  },
  {
    title: "Creation",
    desc: "I engineer the visual combining art, lighting, and layout.",
    icon: <Cpu size={28} />,
    step: "03",
  },
  {
    title: "Revisions",
    desc: "We refine elements until it completely slaps.",
    icon: <CheckCircle size={28} />,
    step: "04",
  },
  {
    title: "Delivery",
    desc: "High-resolution final export ready to dominate.",
    icon: <Send size={28} />,
    step: "05",
  },
];

export function Process() {
  return (
    <section id="process" className="py-28 relative z-10 overflow-hidden">
      {/* Background ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, var(--hero-bloom) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Heading */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-main mb-4">
            The <span className="text-primary text-glow" style={{ textShadow: '0 0 30px var(--text-glow)' }}>Workflow</span>
          </h2>
          <p className="text-base md:text-lg text-text-muted max-w-xl mx-auto leading-relaxed">
            A streamlined, premium process built for efficiency and elite results.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="relative">



          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
            {STEPS.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: idx * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center group"
              >
                {/* Step number pill — above icon */}
                <div
                  style={{
                    marginBottom: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '22px',
                    borderRadius: '999px',
                    background: 'rgba(255, 43, 43, 0.12)',
                    border: '1px solid rgba(255, 43, 43, 0.35)',
                    zIndex: 2,
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: '700',
                      letterSpacing: '0.08em',
                      color: '#FF2B2B',
                      fontFamily: 'Space Grotesk, sans-serif',
                    }}
                  >
                    {step.step}
                  </span>
                </div>

                {/* Icon card */}
                <motion.div
                  className="liquid-glass-strong"
                  whileHover={{
                    scale: 1.06,
                    boxShadow: '0 0 40px rgba(255, 43, 43, 0.45)',
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: '76px',
                    height: '76px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FF2B2B',
                    position: 'relative',
                    zIndex: 2,
                    cursor: 'default',
                    marginBottom: '20px',
                  }}
                >
                  {step.icon}
                </motion.div>

                {/* Title */}
                <h3
                  className="font-display font-bold text-text-main mb-2"
                  style={{ fontSize: '16px', letterSpacing: '-0.01em' }}
                >
                  {step.title}
                </h3>

                {/* Desc */}
                <p className="text-text-muted" style={{ fontSize: '13px', lineHeight: '1.65' }}>
                  {step.desc}
                </p>

                {/* Mobile connector (vertical) */}
                {idx < STEPS.length - 1 && (
                  <div
                    className="md:hidden mt-6"
                    style={{
                      width: '1px',
                      height: '32px',
                      background: 'linear-gradient(180deg, var(--primary-glow-strong) 0%, var(--primary-glow) 100%)',
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
