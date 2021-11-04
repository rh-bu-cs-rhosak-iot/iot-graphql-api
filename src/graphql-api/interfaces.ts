import { GraphQLDataProvider } from './graphql-data-provider';
import { QueryFilter } from './queryfilter';

export interface Page {
  limit?: number;
  offset?: number;
}

export type SortDirection = 'asc' | 'desc';

export interface OrderBy {
  order?: SortDirection;
  field: string;
}

export interface FindByArgs {
  filter?: QueryFilter;
  page?: Page;
  orderBy?: OrderBy;
}

export interface ModelTableMap {
  tableName: string;
  fields?: string[];
}

export interface Context {
  dataProviders: {
    [key: string]: GraphQLDataProvider;
  };
  tableMaps: {
    [key: string]: ModelTableMap;
  };
}

export interface LooseObject {
  [key: string]: any
}
