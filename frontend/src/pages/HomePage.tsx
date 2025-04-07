import React, {useEffect, useState} from 'react';
import {useReservationContext} from '../context/ReservationContext';
import {getReservations} from '../api/reservationService';
import ReservationList from '../components/ReservationList';

const HomePage: React.FC = () => {
  const {reservations, setReservations} = useReservationContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      const data = await getReservations();
      setReservations(data);
      setLoading(false);
    };
    fetchReservations();
  }, [setReservations]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>All Reservations</h1>
      <ReservationList reservations={reservations} />
    </div>
  );
};

export default HomePage;