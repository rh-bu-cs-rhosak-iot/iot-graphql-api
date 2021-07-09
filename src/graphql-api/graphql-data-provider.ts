import { FindByArgs } from './interfaces';
import { QueryFilter } from './queryfilter';

export interface GraphQLDataProvider<Type = any> {
  /**
   * Implementation for finding a single unique object
   *
   * @param args filter by unique attriburtes
   * @param context context object passed from graphql or rest layer
   */
  findOne(args: Partial<Type>, selectedFields?: string[]): Promise<Type>;
  /**
   * Implementation for reading objects with filtering capabilities
   *
   * @param filter filter by specific type
   * @param context context object passed from graphql or rest layer
   * @param page paging context
   * @param orderBy gives the ability to order the results based on a field in ascending or descending order
   */
  findBy(args?: FindByArgs, selectedFields?: string[]): Promise<Type[]>;

  /**
   * Implementation for counting number of objects with filtering capabilities
   *
   * @param filter filter by specific type
   */
  count(filter?: QueryFilter): Promise<number>;
}
