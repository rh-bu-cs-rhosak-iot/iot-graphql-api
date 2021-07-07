import { Knex } from 'knex';
import { connectDB } from '../db/db';
import { KnexDBDataProvider } from '../db/knex-data-provider';
import { GraphQLDataProvider } from './graphql-data-provider';
import { ModelTableMap } from './interfaces';

const meterModel: ModelTableMap = {
  typeName: `Meter`,
  tableName: `meter`,
  idField: `id`,
  fieldMap: {}
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
