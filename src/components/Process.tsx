import { motion } from 'motion/react';
import { MessageSquare, Cpu, Search, CheckCircle, Send } from 'lucide-react';

const STEPS = [
  { title: "Share Your Idea", desc: "Reach out with your vision, assets, and channel goals.", icon: <MessageSquare /> },
  { title: "Strategy", desc: "We analyze the meta and plan the optimal layout for CTR.", icon: <Search /> },
  { title: "Creation", desc: "I engineer the visual combining art, lighting, and layout.", icon: <Cpu /> },
  { title: "Revisions", desc: "We refine elements until it completely slaps.", icon: <CheckCircle /> },
  { title: "Delivery", desc: "High-resolution final export ready to dominate.", icon: <Send /> }
];

export function Process() {
  return (
    <section id="process" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            The <span className="text-primary text-glow">Workflow</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            A streamlined, premium process built for efficiency and elite results.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 hidden md:block" />
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent -translate-y-1/2 hidden md:block origin-left scale-x-0" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {STEPS.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl liquid-glass-strong flex flex-col items-center justify-center text-primary relative z-10 mb-6 group hover:shadow-[0_0_30px_rgba(255,43,43,0.5)] transition-all">
                  {step.icon}
                  <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full liquid-glass-standard text-white text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-display font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
