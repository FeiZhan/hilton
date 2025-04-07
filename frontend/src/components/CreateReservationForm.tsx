import React, {useState} from 'react';
import {Reservation} from '../types/Reservation';

interface CreateReservationFormProps {
  onSubmit: (reservation: Reservation) => void;
}

const CreateReservationForm: React.FC<CreateReservationFormProps> = ({onSubmit}) => {
  const [formData, setFormData] = useState<Reservation>({
    guestName: '',
    guestContactInfo: '',
    expectedArrivalTime: '',
    reservedTableSize: 1,
    status: 'pending',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      reservedTableSize: Number(formData.reservedTableSize),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="guestName"
        placeholder="Guest Name"
        value={formData.guestName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="guestContactInfo"
        placeholder="Contact Info"
        value={formData.guestContactInfo}
        onChange={handleChange}
        required
      />
      <label htmlFor="expectedArrivalTime">Expected Arrival Time</label>
      <input
        type="datetime-local"
        id="expectedArrivalTime"
        name="expectedArrivalTime"
        value={formData.expectedArrivalTime}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="reservedTableSize"
        placeholder="reservedTableSize"
        value={formData.reservedTableSize}
        onChange={handleChange}
        required
      />
      <label htmlFor="status">Status</label>
      <select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="canceled">Canceled</option>
      </select>
      <button type="submit">Create Reservation</button>
    </form>
  );
};

export default CreateReservationForm;