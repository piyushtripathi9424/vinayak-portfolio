import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FadeInSection } from '../components/FadeInSection';
import { THUMBNAILS, POSTERS } from '../data';
import { useLightbox } from '../contexts/LightboxContext';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type Tab = 'all' | 'thumbnails' | 'posters';

const TABS: { id: Tab; label: string; count: number }[] = [
  { id: 'all',        label: 'All Work',    count: THUMBNAILS.length + POSTERS.length },
  { id: 'thumbnails', label: 'Thumbnails',  count: THUMBNAILS.length },
  { id: 'posters',    label: 'Posters',     count: POSTERS.length },
];

export function WorkPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = (searchParams.get('tab') as Tab) || 'all';
  const [activeTab, setActiveTab] = useState<Tab>(tabParam);
  const { openLightbox } = useLightbox();

  const setTab = (tab: Tab) => {
    setActiveTab(tab);
    setSearchParams(tab === 'all' ? {} : { tab });
  };

  const showThumbnails = activeTab === 'all' || activeTab === 'thumbnails';
  const showPosters    = activeTab === 'all' || activeTab === 'posters';

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
            className="liquid-glass-strong rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden border border-primary/30 mb-16"
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

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-2 md:gap-3 mb-14 flex-wrap"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => setTab(tab.id)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 overflow-hidden
                    ${isActive
                      ? 'text-white shadow-[0_0_20px_rgba(255,43,43,0.3)]'
                      : 'text-text-muted hover:text-white liquid-glass-standard'
                    }`}
                >
                  {/* Active pill background */}
                  {isActive && (
                    <motion.div
                      layoutId="active-tab-bg"
                      className="absolute inset-0 bg-primary/20 border border-primary/50 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                  <span className={`relative z-10 text-xs px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-primary/30 text-primary' : 'bg-white/5 text-text-muted'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </motion.div>

          {/* Gallery Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >

              {/* Thumbnails Gallery */}
              <AnimatePresence>
                {showThumbnails && (
                  <motion.div
                    key="thumbnails-section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mb-24"
                  >
                    <FadeInSection>
                      <h2 className="text-3xl font-display font-bold text-white mb-10 flex items-center gap-4">
                        <span className="w-12 h-[2px] bg-primary shadow-[0_0_10px_#FF2B2B]"></span>
                        Thumbnails
                        <span className="text-base text-text-muted font-normal font-sans">({THUMBNAILS.length})</span>
                      </h2>
                    </FadeInSection>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {THUMBNAILS.map((src, idx) => (
                        <motion.div
                          key={`thumb-${idx}`}
                          layout
                          initial={{ opacity: 0, y: 20, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: (idx % 9) * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          whileHover={{ scale: 1.02, y: -5 }}
                          onClick={() => openLightbox(src, 'Thumbnail', idx, THUMBNAILS)}
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
                          {/* Zoom hint */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Posters Gallery */}
              <AnimatePresence>
                {showPosters && (
                  <motion.div
                    key="posters-section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <FadeInSection>
                      <h2 className="text-3xl font-display font-bold text-white mb-10 flex items-center gap-4">
                        <span className="w-12 h-[2px] bg-primary shadow-[0_0_10px_#FF2B2B]"></span>
                        Posters
                        <span className="text-base text-text-muted font-normal font-sans">({POSTERS.length})</span>
                      </h2>
                    </FadeInSection>
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                      {POSTERS.map((src, idx) => (
                        <motion.div
                          key={`poster-${idx}`}
                          layout
                          initial={{ opacity: 0, y: 20, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: (idx % 9) * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          whileHover={{ scale: 1.02, y: -5 }}
                          onClick={() => openLightbox(src, 'Poster', idx, POSTERS)}
                          className="relative rounded-2xl overflow-hidden liquid-glass-standard group cursor-pointer break-inside-avoid mb-6"
                        >
                          <img
                            src={src}
                            alt={`Poster ${idx + 1}`}
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 mix-blend-overlay transition-colors duration-500 pointer-events-none" />
                          <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/40 rounded-2xl transition-colors duration-300 pointer-events-none" />
                          {/* Zoom hint */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </AnimatePresence>

        </div>
      </motion.main>
      <Footer />
    </>
  );
}
