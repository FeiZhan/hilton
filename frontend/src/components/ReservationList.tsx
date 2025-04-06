import React from 'react';
import {Reservation} from '../types/Reservation';

interface ReservationListProps {
  reservations: Reservation[];
}

const ReservationList: React.FC<ReservationListProps> = ({reservations}) => {
  return (
    <div>
      <h2>Reservations</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            <strong>{reservation.guestName}</strong> - {reservation.status} -{' '}
            {new Date(reservation.expectedArrivalTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;