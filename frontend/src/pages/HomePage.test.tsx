import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import HomePage from './HomePage';
import * as reservationService from '../api/reservationService';
import {Reservation} from '../types/Reservation';
import {ReservationProvider} from '../context/ReservationContext';

jest.mock('../api/reservationService');

const mockReservations: Reservation[] = [
  {
    id: '1',
    guestName: 'John Doe',
    guestContactInfo: 'john@example.com',
    expectedArrivalTime: '2025-04-06T12:00:00.000Z',
    reservedTableSize: 4,
    status: 'pending',
  },
];

test('fetches and displays reservations', async () => {
  (reservationService.getReservations as jest.Mock).mockResolvedValue(mockReservations);

  render(
    <ReservationProvider>
      <HomePage />
    </ReservationProvider>
  );

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
  expect(screen.getByText(/pending/i)).toBeInTheDocument();
});