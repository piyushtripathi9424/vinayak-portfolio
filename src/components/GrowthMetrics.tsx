import { motion } from 'motion/react';
import { Target, TrendingUp, Zap, Users } from 'lucide-react';

const METRICS = [
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    value: "10M+",
    label: "Views Generated",
    subtitle: "Across all client channels"
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-primary" />,
    value: "Massive",
    label: "Subscriber Growth",
    subtitle: "Through retention-focused art"
  },
  {
    icon: <Target className="w-6 h-6 text-primary" />,
    value: "High",
    label: "CTR Optimized",
    subtitle: "Precision-engineered layouts"
  },
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    value: "100%",
    label: "Engagement-Focused",
    subtitle: "Visual strategy that hooks"
  }
];

export function GrowthMetrics() {
  return (
    <section id="growth" className="py-24 relative z-10 bg-charcoal/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          >
            Performance
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-6"
          >
            Built for <span className="text-glow text-primary">Growth</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-muted max-w-2xl mx-auto"
          >
            Visuals designed to attract clicks, retain viewers, and help creators grow faster in a competitive algorithm.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx, duration: 0.5 }}
              className="liquid-glass-standard p-8 rounded-2xl relative overflow-hidden group transition-colors hover:shadow-[0_0_40px_rgba(255,43,43,0.2)]"
            >
              {/* Top ambient glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 blur-[40px] rounded-full group-hover:bg-primary/20 transition-colors" />
              
              <div className="mb-6 w-12 h-12 rounded-xl liquid-glass-standard flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform">
                {metric.icon}
              </div>
              
              <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-2 tracking-tight">
                  {metric.value}
                </h3>
                <p className="text-lg font-medium text-white mb-1">{metric.label}</p>
                <p className="text-sm text-text-muted">{metric.subtitle}</p>
              </div>
              
              {/* Decorative mini chart line */}
              <div className="absolute bottom-0 left-0 w-full h-12 opacity-20 pointer-events-none hidden group-hover:block transition-all">
                <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full stroke-primary fill-none text-primary" strokeWidth="2" strokeLinecap="round">
                  <path d="M0 20 L20 15 L40 18 L60 8 L80 12 L100 2" className="animate-pulse" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
