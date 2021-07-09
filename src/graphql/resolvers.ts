import { GraphQLResolveInfo } from 'graphql';
import { Context } from './context';
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
          context.meterModel,
          'items'
        );
        requestedCount = getResolverInfoFieldsList(info).some(
          (field: string) => field === 'count'
        );
      }
      const items = await context.meterDataProvider.findBy(
        args,
        selectedFields
      );
      const resultPageInfo = {
        offset: 0,
        ...args.page
      };
      let count: number = 0;
      if (requestedCount) {
        count = await context.meterDataProvider.count(args.filter);
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
          context.meterModel
        );
      }
      return context.meterDataProvider.findOne({ id: id }, selectedFields);
    },
    countMeters: async (parent, args, context: Context) => {
      return context.meterDataProvider.count();
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
