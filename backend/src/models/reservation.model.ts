import {Entity, model, property} from '@loopback/repository';
import {Field, ObjectType} from 'type-graphql';

@model()
export class Reservation extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  guestName: string;

  @property({
    type: 'string',
    required: true,
  })
  guestContactInfo: string;

  @property({
    type: 'date',
    required: true,
  })
  expectedArrivalTime: string;

  @property({
    type: 'number',
    required: true,
  })
  reservedTableSize: number;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  constructor(data?: Partial<Reservation>) {
    super(data);
  }
}

@ObjectType()
export class ReservationGraphQL {
  @Field()
  id: string;

  @Field()
  guestName: string;

  @Field()
  guestContactInfo: string;

  @Field()
  expectedArrivalTime: string;

  @Field()
  reservedTableSize: number;

  @Field()
  status: string;
}

export interface ReservationRelations {
}

export type ReservationWithRelations = Reservation & ReservationRelations;
