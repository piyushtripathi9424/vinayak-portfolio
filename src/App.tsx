/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { UIProvider } from './contexts/UIContext';
import { LightboxProvider } from './contexts/LightboxContext';
import { MouseGlow } from './components/MouseGlow';
import { ContactModal } from './components/ContactModal';
import { LoadingScreen } from './components/LoadingScreen';
import { Lightbox } from './components/Lightbox';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { NotFound } from './pages/NotFound';
import { ScrollToTop } from './components/ScrollToTop';
import { SpeedInsights } from '@vercel/speed-insights/react';

const HAS_SEEN_INTRO = 'vp_intro_seen';

export default function App() {
  const [showLoader, setShowLoader] = useState<boolean>(
    () => !sessionStorage.getItem(HAS_SEEN_INTRO)
  );

  const handleLoaderComplete = useCallback(() => {
    sessionStorage.setItem(HAS_SEEN_INTRO, '1');
    setShowLoader(false);
  }, []);

  return (
    <UIProvider>
      <LightboxProvider>
        {showLoader && <LoadingScreen onComplete={handleLoaderComplete} />}
        <div className="min-h-screen bg-background text-text-main selection:bg-primary/30 selection:text-text-main relative">
          <div className="hidden md:block fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--hero-bloom)_0%,_transparent_50%),radial-gradient(circle_at_bottom_left,_var(--hero-bloom)_0%,_transparent_40%)] pointer-events-none z-0 will-change-transform" />
          <MouseGlow />
          <div className="relative z-10">
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/work" element={<WorkPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            <ContactModal />
            <Lightbox />

            {/* Global floating social actions */}
            <div className="fixed bottom-8 right-8 z-20 hidden md:block">
              <div className="flex flex-col gap-3">
                <a href="https://www.instagram.com/skullgfx/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 liquid-glass-standard rounded-full flex items-center justify-center hover:border-primary transition-all group">
                  <span className="text-[10px] group-hover:text-primary transition-colors text-glow">IG</span>
                </a>
                <a href="https://x.com/skullaep" target="_blank" rel="noopener noreferrer" className="w-10 h-10 liquid-glass-standard rounded-full flex items-center justify-center hover:border-primary transition-all group">
                  <span className="text-[10px] group-hover:text-primary transition-colors text-glow">X</span>
                </a>
              </div>
            </div>
          </div>
          <SpeedInsights />
        </div>
      </LightboxProvider>
    </UIProvider>
  );
}
