import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Meter {
    id: ID!
    address: String!
    latitude: Float!
    longitude: Float!
    status: String
  }

  type Query {
    meters: [Meter]!
    meter(id: ID!): Meter
  }
`;

export default typeDefs;
