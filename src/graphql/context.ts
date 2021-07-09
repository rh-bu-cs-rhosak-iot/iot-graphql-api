import { Knex } from 'knex';
import { connectDB } from '../db/db';
import { KnexDBDataProvider } from '../db/knex-data-provider';
import { GraphQLDataProvider } from '../graphql-api/graphql-data-provider';
import { Context, ModelTableMap } from '../graphql-api/interfaces';

const meterModel: ModelTableMap = {
  tableName: `meter`,
  fields: [`id`, `address`, `longitude`, `latitude`]
};

function createMeterKnexDbProvider(db: Knex) {
  return new KnexDBDataProvider(meterModel, db);
}

const meterDataProvider: GraphQLDataProvider<any> = createMeterKnexDbProvider(
  connectDB()
);

export const context: Context = {
  dataProviders: {
    meter: meterDataProvider
  },
  tableMaps: {
    meter: meterModel
  }
};
