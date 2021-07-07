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
  typeName: string;
  tableName: string;
  idField: string;
  fieldMap?: {
    [key: string]: string;
  };
}
