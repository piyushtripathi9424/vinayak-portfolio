import { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
  isContactModalOpen: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  return (
    <UIContext.Provider value={{ isContactModalOpen, openContactModal, closeContactModal }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
