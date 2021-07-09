import { addResolveFunctionsToSchema, addSchemaLevelResolveFunction, ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';
import { HTTP_PORT } from './config';
import log from './log';
import schema from './graphql/load-schema';
import resolvers from './graphql/resolvers';
import { createTerminus } from '@godaddy/terminus';
import options from './health/health';
import { context } from './graphql/context';
import { graphql, GraphQLSchema } from 'graphql';

const app = express();

addResolveFunctionsToSchema({ schema, resolvers });

const apolloServer = new ApolloServer({ schema, context});

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
