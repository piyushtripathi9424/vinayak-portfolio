import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { THUMBNAILS, POSTERS } from '../data';

export function WorkPage() {
  return (
    <>
      <Navbar />
      <motion.main 
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-background"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          
          {/* Top Glass Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="liquid-glass-strong rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden border border-primary/30 mb-20"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Full Archive
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                Full Work <span className="text-primary text-glow">Archive</span>
              </h1>
              <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
                Explore all thumbnails, posters, sports edits, and cinematic visual projects.
              </p>
              
              <a 
                href="https://drive.google.com/drive/u/1/folders/1UnSEcemhPRRpyLPDxHkAoLTnE5zf4-OV"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white liquid-glass-btn rounded-full overflow-hidden active:scale-95 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                <span className="relative flex items-center gap-3">
                  Open Google Drive
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </a>
            </div>
          </motion.div>
          
          {/* Thumbnails Gallery */}
          <div className="mb-24">
            <h2 className="text-3xl font-display font-bold text-white mb-10 flex items-center gap-4">
              <span className="w-12 h-[2px] bg-primary shadow-[0_0_10px_#FF2B2B]"></span>
              Thumbnails
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {THUMBNAILS.map((src, idx) => (
                <motion.div
                  key={`thumb-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: (idx % 3) * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="relative rounded-2xl overflow-hidden liquid-glass-standard group cursor-pointer aspect-video"
                >
                  <img
                    src={src}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 mix-blend-overlay transition-colors duration-500 pointer-events-none" />
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/40 rounded-2xl transition-colors duration-300 pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Posters Gallery */}
          <div>
            <h2 className="text-3xl font-display font-bold text-white mb-10 flex items-center gap-4">
              <span className="w-12 h-[2px] bg-primary shadow-[0_0_10px_#FF2B2B]"></span>
              Posters
            </h2>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {POSTERS.map((src, idx) => (
                <motion.div
                  key={`poster-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: (idx % 3) * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="relative rounded-2xl overflow-hidden liquid-glass-standard group cursor-pointer break-inside-avoid"
                >
                  <img
                    src={src}
                    alt={`Poster ${idx + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 mix-blend-overlay transition-colors duration-500 pointer-events-none" />
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/40 rounded-2xl transition-colors duration-300 pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </motion.main>
      <Footer />
    </>
  );
}
