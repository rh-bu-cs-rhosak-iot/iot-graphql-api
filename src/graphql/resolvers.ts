import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../graphql-api/interfaces';
import { FindByArgs } from '../graphql-api/interfaces';
import {
  getFieldsFromResolver,
  getResolverInfoFieldsList,
  getSelectedFields,
  getSelectedFieldsFromResolverInfo
} from '../graphql-api/utils';
import { MeterStatusService } from '../iot-streams-service/iot-streams-service';

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
      let resolverFields: string[] = [];
      let selectedFields: string[] = [];

      if (info) {
        resolverFields = getFieldsFromResolver(info);
        selectedFields = getSelectedFields(
          resolverFields,
          context.tableMaps['meter']
        );
      }
      let result = await context.dataProviders['meter'].findOne(
        { id: id },
        selectedFields
      );
      if (
        resolverFields.includes('status') ||
        resolverFields.includes('updated')
      ) {
        let meterStatus = await MeterStatusService.getStatus(id);
        if (meterStatus) {
          result.status = meterStatus.status;
          result.updated = meterStatus.timestamp;
        }
      }
      return result;
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
