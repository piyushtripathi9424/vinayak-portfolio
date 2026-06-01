/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UIProvider } from './contexts/UIContext';
import { MouseGlow } from './components/MouseGlow';
import { ContactModal } from './components/ContactModal';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <UIProvider>
      <div className="min-h-screen bg-background text-text-main selection:bg-primary/30 selection:text-white relative">
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,43,43,0.05)_0%,_transparent_50%),radial-gradient(circle_at_bottom_left,_rgba(255,43,43,0.08)_0%,_transparent_40%)] pointer-events-none z-0" />
        <MouseGlow />
        <div className="relative z-10">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/work" element={<WorkPage />} />
            </Routes>
          </BrowserRouter>
          <ContactModal />

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
        <Analytics />
      </div>
    </UIProvider>
  );
}
