import React, {useEffect, useState} from 'react';
import {getReservations} from '../api/reservationService';
import {Reservation} from '../types/Reservation';
import ReservationList from '../components/ReservationList';

const HomePage: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const data = await getReservations();
      setReservations(data);
    };
    fetchReservations();
  }, []);

  return (
    <div>
      <h1>All Reservations</h1>
      <ReservationList reservations={reservations} />
    </div>
  );
};

export default HomePage;