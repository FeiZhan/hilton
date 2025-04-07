import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import CreateReservationForm from './CreateReservationForm';

test('submits the form with correct data', () => {
  const mockOnSubmit = jest.fn();

  render(<CreateReservationForm onSubmit={mockOnSubmit} />);

  fireEvent.change(screen.getByPlaceholderText('Guest Name'), {target: {value: 'John Doe'}});
  fireEvent.change(screen.getByPlaceholderText('Contact Info'), {target: {value: 'john@example.com'}});
  fireEvent.change(screen.getByLabelText('Expected Arrival Time'), {target: {value: '2025-04-06T12:00'}});
  fireEvent.change(screen.getByPlaceholderText('reservedTableSize'), {target: {value: '4'}});
  fireEvent.change(screen.getByLabelText('Status'), {target: {value: 'completed'}});

  fireEvent.click(screen.getByText('Create Reservation'));

  expect(mockOnSubmit).toHaveBeenCalledWith({
    guestName: 'John Doe',
    guestContactInfo: 'john@example.com',
    expectedArrivalTime: '2025-04-06T12:00',
    reservedTableSize: 4,
    status: 'completed',
  });
});