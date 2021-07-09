import { Knex } from 'knex';
import { connectDB } from '../db/db';
import { KnexDBDataProvider } from '../db/knex-data-provider';
import { GraphQLDataProvider } from '../graphql-api/graphql-data-provider';
import { ModelTableMap } from '../graphql-api/interfaces';

const meterModel: ModelTableMap = {
  tableName: `meter`,
  idField: `id`,
  fieldMap: {
    id: `id`,
    address: `address`,
    longitude: `longitude`,
    latitude: `latitude`
  }
};

function createMeterKnexDbProvider(db: Knex) {
  return new KnexDBDataProvider(meterModel, db);
}

const meterDataProvider: GraphQLDataProvider<any> = createMeterKnexDbProvider(
  connectDB()
);

export interface Context {
  meterDataProvider: GraphQLDataProvider<any>;
  meterModel: ModelTableMap;
}

export const context: Context = {
  meterModel: meterModel,
  meterDataProvider: meterDataProvider
};
