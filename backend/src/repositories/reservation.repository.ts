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

  async updateStatus(
    id: string,
    status: string,
  ): Promise<boolean> {
    try {
      await this.updateById(id, {status});
      return true;
    } catch (error) {
      return false;
    }
  }
}
