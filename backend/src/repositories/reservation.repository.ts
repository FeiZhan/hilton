import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Reservation, ReservationRelations} from '../models';
import {MongodbDataSource} from '../datasources';

export class ReservationRepository extends DefaultCrudRepository<
  Reservation,
  typeof Reservation.prototype.id,
  ReservationRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Reservation, dataSource);
  }

  async findByDateAndStatus(
    date: string,
    status: string,
  ): Promise<Reservation[]> {
    const filter = {
      where: {
        expectedArrivalTime: date,
        status: status,
      },
    };
    return this.find(filter);
  }

  // Custom method to update the status of a reservation
  async updateStatus(
    id: string,
    status: string,
  ): Promise<boolean> {
    try {
      await this.updateById(id, {status}); // Perform the update
      return true; // Return true if no errors are thrown
    } catch (error) {
      return false; // Return false if an error occurs
    }
  }
}
