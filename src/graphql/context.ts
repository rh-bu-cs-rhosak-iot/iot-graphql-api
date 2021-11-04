import { Knex } from 'knex';
import { connectDB } from '../db/db';
import { KnexDBDataProvider } from '../db/knex-data-provider';
import { GraphQLDataProvider } from '../graphql-api/graphql-data-provider';
import { Context, ModelTableMap } from '../graphql-api/interfaces';

const meterModel: ModelTableMap = {
  tableName: `meter`,
  fields: [`id`, `address`, `longitude`, `latitude`]
};

const streetsModel: ModelTableMap = {
  tableName: `streets`,
  fields: [`name`]
}

function createMeterKnexDbProvider(db: Knex) {
  return new KnexDBDataProvider(meterModel, db);
}

function createStreetsKnexDbProvider(db: Knex) {
  return new KnexDBDataProvider(streetsModel, db);
}

const meterDataProvider: GraphQLDataProvider<any> = createMeterKnexDbProvider(
  connectDB()
);

const streetsDataProvider: GraphQLDataProvider<any> = createStreetsKnexDbProvider(
  connectDB()
);

export const context: Context = {
  dataProviders: {
    meter: meterDataProvider,
    streets: streetsDataProvider
  },
  tableMaps: {
    meter: meterModel,
    streets: streetsModel
  }
};
