import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';
import { HTTP_PORT } from './config';
import log from './log';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import { createTerminus } from '@godaddy/terminus';
import options from './health/health';
import { context } from './graphql/context';
import { graphql } from 'graphql';

const app = express();

const apolloServer = new ApolloServer({ typeDefs, resolvers, context});

const start = async () => {
  apolloServer
    .start()
    .then(() => {
      apolloServer.applyMiddleware({ app });
      const server = http.createServer(app);
      createTerminus(server, options);
      server.listen({ port: HTTP_PORT }, () => {
        log.info(
          `🚀 GraphQL Server ready at http://localhost:${HTTP_PORT}${apolloServer.graphqlPath}`
        );
      });
    })
    .catch((error) => {
      log.error(error);
      process.exit(1);
    });
};

start();
