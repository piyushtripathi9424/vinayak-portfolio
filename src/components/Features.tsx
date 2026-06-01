import { motion } from 'motion/react';
import { Eye, MousePointerClick, Zap, Star, Trophy, Palette } from 'lucide-react';

const FEATURES = [
  { icon: <Eye />, title: "Eye-Catching Designs", desc: "Visuals crafted to stop the scroll and capture immediate attention." },
  { icon: <MousePointerClick />, title: "High CTR Focus", desc: "Every element is scientifically placed to drive clicks and conversions." },
  { icon: <Zap />, title: "Fast Turnaround", desc: "Speed matters. Get premium quality delivered consistently on time." },
  { icon: <Star />, title: "Premium Quality", desc: "Elite finishing touches, flawless lighting, and cinematic grading." },
  { icon: <Trophy />, title: "Sports Design Expertise", desc: "Specialized in aggressive, energetic athletic brand aesthetics." },
  { icon: <Palette />, title: "Creator-Focused", desc: "Deep understanding of YouTube meta, branding, and audience psychology." }
];

export function Features() {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 text-text-muted rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              Advantage
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
              Why Creators Work <br />
              With <span className="text-primary text-glow">My Studio</span>
            </h2>
          </div>
          <p className="text-text-muted max-w-sm">
            I don't just make things look good. I engineer artwork designed to perform, convert, and build your digital empire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="liquid-glass-standard p-8 rounded-2xl group transition-all box-glow"
            >
              <div className="w-14 h-14 rounded-xl liquid-glass-standard flex items-center justify-center text-text-muted group-hover:text-primary group-hover:shadow-[0_0_20px_rgba(255,43,43,0.3)] transition-all mb-6">
                {feat.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">
                {feat.title}
              </h3>
              <p className="text-text-muted leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
