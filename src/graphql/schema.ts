import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Meter {
    id: ID!
    address: String!
    latitude: Float!
    longitude: Float!
    status: String
  }

  type MeterResultList {
    items: [Meter]!
    offset: Int
    limit: Int
    count: Int
  }

  input StringInput {
    ne: String
    eq: String
    le: String
    lt: String
    ge: String
    gt: String
    in: [String!]
    contains: String
    startsWith: String
    endsWith: String
  }

  input MeterFilter {
    id: StringInput
    address: StringInput
    latitude: StringInput
    longitude: StringInput
    and: [MeterFilter!]
    or: [MeterFilter!]
    not: MeterFilter
  }

  input PageRequest {
    limit: Int
    offset: Int
  }

  input OrderByInput {
    field: String!
    order: SortDirectionEnum = ASC
  }

  enum SortDirectionEnum {
    DESC
    ASC
  }

  type Query {
    meters(
      filter: MeterFilter
      page: PageRequest
      orderBy: OrderByInput
    ): MeterResultList!
    meter(id: ID!): Meter
    countMeters: Int
  }
`;

export default typeDefs;
