import { Knex } from 'knex';
import { GraphQLDataProvider } from '../graphql-api/graphql-data-provider';
import { FindByArgs, ModelTableMap, Page } from '../graphql-api/interfaces';
import { QueryFilter } from '../graphql-api/queryfilter';
import { buildQuery } from './knex-query-mapper';
import { NoDataError } from './errors';

export class KnexDBDataProvider<Type = any>
  implements GraphQLDataProvider<Type>
{
  protected db: Knex;
  protected tableName: string;
  protected tableMap: ModelTableMap;

  public constructor(tableMap: ModelTableMap, db: Knex) {
    this.db = db;
    this.tableMap = tableMap;
    this.tableName = this.tableMap.tableName;
  }

  public async findOne(
    args: Partial<Type>,
    selectedFields?: string[]
  ): Promise<Type> {
    let result: Type;
    try {
      result = await this.db
        .select(this.getSelectedFields(selectedFields))
        .from(this.tableName)
        .where(args)
        .first();
    } catch (err) {
      throw new NoDataError(
        `Cannot find a result for ${
          this.tableName
        } with filter: ${JSON.stringify(args)}`
      );
    }
    return result;
  }

  public async findBy(
    args?: FindByArgs,
    selectedFields?: string[]
  ): Promise<Type[]> {
    let query = buildQuery(this.db, args?.filter)
      .select(this.getSelectedFields(selectedFields))
      .from(this.tableName);

    if (args?.orderBy) {
      query = query.orderBy(args.orderBy.field, args.orderBy.order);
    }

    const dbResult = await this.usePage(query, args?.page);

    if (dbResult) {
      return dbResult;
    }
    throw new NoDataError(
      `No results for ${this.tableName} query and filter: ${JSON.stringify(
        args?.filter
      )}`
    );
  }

  public async count(filter?: QueryFilter): Promise<number> {
    const dbResult = await buildQuery(this.db, filter)
      .from(this.tableName)
      .count();
    const count: any = Object.values(dbResult[0])[0];

    return parseInt(count, 10);
  }

  protected getSelectedFields(selectedFields?: string[]) {
    return selectedFields?.length ? selectedFields : '*';
  }

  private usePage(query: Knex.QueryBuilder, page?: Page) {
    if (!page) {
      return query;
    }

    const { offset, limit } = page;

    if (offset && offset < 0) {
      throw new Error(
        'Invalid offset value. Please use an offset of greater than or equal to 0 in queries'
      );
    }

    if (limit && limit < 1) {
      throw new Error(
        'Invalid limit value. Please use a limit of greater than 1 in queries'
      );
    }

    if (limit) {
      query = query.limit(limit);
    }
    if (offset) {
      query = query.offset(offset);
    }

    return query;
  }
}
