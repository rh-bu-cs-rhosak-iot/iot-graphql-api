const meters = [
  {
    id: 'ggDOTAdDY_ngKoQnkktO8',
    address: '1301 N LA BREA AVE',
    latitude: 34.095452,
    longitude: -118.344219
  },
  {
    id: 'zXs425XAfaEFHnFDH0_G5',
    address: '1301 N LA BREA AVE',
    latitude: 34.095795,
    longitude: -118.34422
  }
];

const resolvers = {
  Query: {
    meters: () => meters,
    meter: (_parent: any, { id }: any, _context: any) => {
      if (id == 'ggDOTAdDY_ngKoQnkktO8') {
        return {
          id: 'ggDOTAdDY_ngKoQnkktO8',
          address: '1301 N LA BREA AVE',
          latitude: 34.095452,
          longitude: -118.344219,
          status: 'out of order'
        };
      } else if (id == 'zXs425XAfaEFHnFDH0_G5') {
        return {
          id: 'zXs425XAfaEFHnFDH0_G5',
          address: '1301 N LA BREA AVE',
          latitude: 34.095795,
          longitude: -118.34422,
          status: 'free'
        };
      } else {
        return {};
      }
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
