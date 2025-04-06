import React from 'react';
import {createReservation} from '../api/reservationService';
import {Reservation} from '../types/Reservation';
import CreateReservationForm from '../components/CreateReservationForm';

const CreateReservationPage: React.FC = () => {
  const handleCreateReservation = async (reservation: Reservation) => {
    await createReservation(reservation);
    alert('Reservation created successfully!');
  };

  return (
    <div>
      <h1>Create a Reservation</h1>
      <CreateReservationForm onSubmit={handleCreateReservation} />
    </div>
  );
};

export default CreateReservationPage;