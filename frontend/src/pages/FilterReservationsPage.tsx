import React, {useState} from 'react';
import {filterReservations} from '../api/reservationService';
import {Reservation} from '../types/Reservation';
import ReservationList from '../components/ReservationList';

const FilterReservationsPage: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');

  const handleFilter = async () => {
    const data = await filterReservations(date, status);
    setReservations(data);
  };

  return (
    <div>
      <h1>Filter Reservations</h1>
      <div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </select>
        <button onClick={handleFilter}>Filter</button>
      </div>
      <ReservationList reservations={reservations} />
    </div>
  );
};

export default FilterReservationsPage;