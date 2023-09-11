import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CardDataContextType {
  cardData: Record<string, any>;
  updateCardData: (data: Record<string, any>) => void;
}

const CardDataContext = createContext<CardDataContextType | undefined>(undefined);

export const useCardData = () => {
  const context = useContext(CardDataContext);
  if (!context) {
    throw new Error('useCardData must be used within a CardDataProvider');
  }
  return context;
};

interface CardDataProviderProps {
  children: ReactNode;
}

export const CardDataProvider: React.FC<CardDataProviderProps> = ({ children }) => {
  const [cardData, setCardData] = useState<Record<string, any>>({});

  const updateCardData = (data: Record<string, any>) => {
    setCardData(data);
  };

  return (
    <CardDataContext.Provider value={{ cardData, updateCardData }}>
      {children}
    </CardDataContext.Provider>
  );
};
