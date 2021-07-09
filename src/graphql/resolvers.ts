import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../graphql-api/interfaces';
import { FindByArgs } from '../graphql-api/interfaces';
import {
  getResolverInfoFieldsList,
  getSelectedFieldsFromResolverInfo
} from '../graphql-api/utils';

const resolvers = {
  Query: {
    meters: async (
      parent,
      args: FindByArgs,
      context: Context,
      info: GraphQLResolveInfo
    ) => {
      let selectedFields: string[] = [];
      let requestedCount: boolean = false;
      if (info) {
        selectedFields = getSelectedFieldsFromResolverInfo(
          info,
          context.tableMaps['meter'],
          'items'
        );
        requestedCount = getResolverInfoFieldsList(info).some(
          (field: string) => field === 'count'
        );
      }
      const items = await context.dataProviders['meter'].findBy(
        args,
        selectedFields
      );
      const resultPageInfo = {
        offset: 0,
        ...args.page
      };
      let count: number = 0;
      if (requestedCount) {
        count = await context.dataProviders['meter'].count(args.filter);
      }
      return {
        items,
        count,
        ...resultPageInfo
      };
    },
    meter: async (
      parent,
      { id }: any,
      context: Context,
      info: GraphQLResolveInfo
    ) => {
      let selectedFields: string[] = [];
      if (info) {
        selectedFields = getSelectedFieldsFromResolverInfo(
          info,
          context.tableMaps['meter']
        );
      }
      return context.dataProviders['meter'].findOne({ id: id }, selectedFields);
    },
    countMeters: async (parent, args, context: Context) => {
      return context.dataProviders['meter'].count();
    }
  },
  Meter: {
    id: (parent: any) => parent.id,
    address: (parent: any) => parent.address,
    latitude: (parent: any) => parent.latitude,
    longitude: (parent: any) => parent.longitude
  }
};

export default resolvers;
