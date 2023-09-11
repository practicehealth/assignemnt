import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EventData {
  id: string;
  year: string;
  month: string;
  date: string;
  day: string;
  eventType: string;
  provider: string;
  eventHeader: string;
  status?: string;
  facility: string,
  references: Array<number>,
  reference: number,
  serviceDate: string,
  resourceType: string,
  cost: string,
}

interface EventDataContextType {
  eventData: EventData[];
  updateEventData: (data: EventData[]) => void;
}

const EventDataContext = createContext<EventDataContextType | undefined>(undefined);

export const useEventData = () => {
  const context = useContext(EventDataContext);
  if (!context) {
    throw new Error('useEventData must be used within an EventDataProvider');
  }
  return context;
};

interface EventDataProviderProps {
  children: ReactNode;
}

export const EventDataProvider: React.FC<EventDataProviderProps> = ({ children }) => {
  const [eventData, setEventData] = useState<EventData[]>([]);

  const updateEventData = (data: EventData[]) => {
    setEventData(data);
  };

  return (
    <EventDataContext.Provider value={{ eventData, updateEventData }}>
      {children}
    </EventDataContext.Provider>
  );
};
