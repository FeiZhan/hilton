import {gql} from 'apollo-server-express';

export const typeDefs = gql`
  type Reservation {
    id: ID!
    guestName: String!
    guestContactInfo: String!
    expectedArrivalTime: String!
    reservedTableSize: Int!
    status: String!
  }

  type Query {
    reservations: [Reservation!]!
    reservation(id: ID!): Reservation
  }

  type Mutation {
    createReservation(
      guestName: String!
      guestContactInfo: String!
      expectedArrivalTime: String!
      reservedTableSize: Int!
      status: String!
    ): Reservation!
    updateReservationStatus(id: ID!, status: String!): Reservation!
    deleteReservation(id: ID!): Boolean!
  }
`;