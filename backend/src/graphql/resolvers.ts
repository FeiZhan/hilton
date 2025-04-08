import {Resolver, Query, Mutation, Arg} from 'type-graphql';
import {Reservation} from '../models/reservation.model';
import {ReservationRepository} from '../repositories';
import {inject} from '@loopback/core';

@Resolver(() => Reservation)
export class ReservationResolver {
  constructor(
    @inject('repositories.ReservationRepository')
    private reservationRepo: ReservationRepository,
  ) {}

  @Query(() => [Reservation])
  async reservations(): Promise<Reservation[]> {
    return this.reservationRepo.find();
  }

  @Mutation(() => Reservation)
  async createReservation(
    @Arg('guestName') guestName: string,
    @Arg('guestContactInfo') guestContactInfo: string,
    @Arg('expectedArrivalTime') expectedArrivalTime: string,
    @Arg('reservedTableSize') reservedTableSize: number,
    @Arg('status') status: string,
  ): Promise<Reservation> {
    return this.reservationRepo.create({
      guestName,
      guestContactInfo,
      expectedArrivalTime,
      reservedTableSize,
      status,
    });
  }
}