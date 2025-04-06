import React, {createContext, useContext, useState, ReactNode} from 'react';
import {Reservation} from '../types/Reservation';

interface ReservationContextProps {
  reservations: Reservation[];
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
}

const ReservationContext = createContext<ReservationContextProps | undefined>(undefined);

interface ReservationProviderProps {
  children: ReactNode;
}

export const ReservationProvider: React.FC<ReservationProviderProps> = ({children}) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  return (
    <ReservationContext.Provider value={{reservations, setReservations}}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservationContext = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservationContext must be used within a ReservationProvider');
  }
  return context;
};