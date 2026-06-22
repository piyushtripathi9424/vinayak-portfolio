import { CONTACT } from '../data';
import { Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 border-t border-text-main/5 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-display font-bold text-text-main tracking-tighter mb-1 relative inline-block">
              Vinayak Pandey
              <span className="absolute -top-1 -right-3 w-1.5 h-1.5 rounded-full bg-primary box-glow"></span>
            </h3>
            <p className="text-sm text-text-muted">Premium Cinematic Visual Studio</p>
          </div>

          <div className="flex items-center gap-6 text-text-muted">
            <a href={`mailto:${CONTACT.email}`} className="text-sm hover:text-text-main transition-colors">
              {CONTACT.email}
            </a>
            <div className="w-px h-4 bg-text-main/10" />
            <div className="flex gap-4">
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={CONTACT.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>
        
        <div className="mt-12 pt-6 border-t border-text-main/5 flex flex-col md:flex-row justify-between items-center text-sm text-text-muted/50">
          <p>© {new Date().getFullYear()} Vinayak Pandey. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Engineered for Impact.</p>
        </div>
      </div>
    </footer>
  );
}
