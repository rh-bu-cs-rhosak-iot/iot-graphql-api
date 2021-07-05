import log from '../log';

const options = {
  healthChecks: {
    '/health': () => Promise.resolve()
  },
  logger: (msg: String, error: any) => log.error(error, msg)
};

export default options;
