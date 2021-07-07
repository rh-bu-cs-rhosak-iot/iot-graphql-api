import { Context } from './context';
import { FindByArgs } from './interfaces';

const resolvers = {
  Query: {
    meters: async (parent, args: FindByArgs, context: Context) => {
      const items = await context.meterDataProvider.findBy(args);
      const resultPageInfo = {
        offset: 0,
        ...args.page
      };
      const count: number = await context.meterDataProvider.count(args.filter);
      return {
        items,
        count,
        ...resultPageInfo
      };
    },
    meter: async (parent, { id }: any, context: Context) => {
      return context.meterDataProvider.findOne({ id: id });
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
