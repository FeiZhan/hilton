export interface Reservation {
  id?: string;
  guestName: string;
  guestContactInfo: string;
  expectedArrivalTime: string;
  reservedTableSize: number;
  status: 'pending' | 'completed' | 'canceled';
}