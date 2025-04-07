import React from 'react';
import {render, screen} from '@testing-library/react';
import ReservationList from './ReservationList';
import {Reservation} from '../types/Reservation';

const mockReservations: Reservation[] = [
  {
    id: '1',
    guestName: 'John Doe',
    guestContactInfo: 'john@example.com',
    expectedArrivalTime: '2025-04-06T20:00:00.000Z',
    reservedTableSize: 4,
    status: 'pending',
  },
  {
    id: '2',
    guestName: 'Jane Smith',
    guestContactInfo: 'jane@example.com',
    expectedArrivalTime: '2025-04-08T02:00:00.000Z',
    reservedTableSize: 2,
    status: 'completed',
  },
];

test('renders a list of reservations', () => {
  render(<ReservationList reservations={mockReservations} />);

  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Jane Smith')).toBeInTheDocument();

  expect(screen.getByText(/pending/i)).toBeInTheDocument();
  expect(screen.getByText(/completed/i)).toBeInTheDocument();
});