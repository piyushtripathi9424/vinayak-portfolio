import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface LightboxItem {
  src: string;
  category: 'Thumbnail' | 'Poster';
  index: number;
  allImages: string[];
}

interface LightboxContextType {
  item: LightboxItem | null;
  openLightbox: (src: string, category: 'Thumbnail' | 'Poster', index: number, allImages: string[]) => void;
  closeLightbox: () => void;
  goNext: () => void;
  goPrev: () => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<LightboxItem | null>(null);

  const openLightbox = useCallback(
    (src: string, category: 'Thumbnail' | 'Poster', index: number, allImages: string[]) => {
      setItem({ src, category, index, allImages });
    },
    []
  );

  const closeLightbox = useCallback(() => setItem(null), []);

  const goNext = useCallback(() => {
    setItem(prev => {
      if (!prev) return prev;
      const nextIdx = (prev.index + 1) % prev.allImages.length;
      return { ...prev, index: nextIdx, src: prev.allImages[nextIdx] };
    });
  }, []);

  const goPrev = useCallback(() => {
    setItem(prev => {
      if (!prev) return prev;
      const prevIdx = (prev.index - 1 + prev.allImages.length) % prev.allImages.length;
      return { ...prev, index: prevIdx, src: prev.allImages[prevIdx] };
    });
  }, []);

  return (
    <LightboxContext.Provider value={{ item, openLightbox, closeLightbox, goNext, goPrev }}>
      {children}
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error('useLightbox must be used within LightboxProvider');
  return ctx;
}
