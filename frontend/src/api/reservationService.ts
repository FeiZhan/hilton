import axios from 'axios';
import {Reservation} from '../types/Reservation';

const API_BASE_URL = 'http://localhost:4000';

export const getReservations = async (): Promise<Reservation[]> => {
  const response = await axios.get(`${API_BASE_URL}/reservations`);
  return response.data;
};

export const createReservation = async (reservation: Reservation): Promise<Reservation> => {
  const response = await axios.post(`${API_BASE_URL}/reservations`, reservation);
  return response.data;
};

export const updateReservationStatus = async (id: string, status: string): Promise<void> => {
  await axios.patch(`${API_BASE_URL}/reservations/${id}/status`, {status});
};

export const deleteReservation = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/reservations/${id}`);
};

export const filterReservations = async (date: string, status: string): Promise<Reservation[]> => {
  const response = await axios.get(`${API_BASE_URL}/reservations/filter`, {
    params: {date, status},
  });
  return response.data;
};