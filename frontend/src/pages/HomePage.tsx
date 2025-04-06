import React, {useEffect} from 'react';
import {getReservations} from '../api/reservationService';
import {useReservationContext} from '../context/ReservationContext';
import ReservationList from '../components/ReservationList';

const HomePage: React.FC = () => {
  const {reservations, setReservations} = useReservationContext();

  useEffect(() => {
    const fetchReservations = async () => {
      const data = await getReservations();
      setReservations(data);
    };
    fetchReservations();
  }, [setReservations]);

  return (
    <div>
      <h1>All Reservations</h1>
      <ReservationList reservations={reservations} />
    </div>
  );
};

export default HomePage;