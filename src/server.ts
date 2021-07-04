import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';
import { HTTP_PORT } from './config';
import log from './log';

const app = express();

const typeDefs = `
  type Query {
    info: String!
  }
`;

const resolvers = {
  Query: {
    info: () => `This is the API of the meters IoT data`
  }
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

const start = async () => {
  apolloServer
    .start()
    .then(() => {
      apolloServer.applyMiddleware({ app });
      http.createServer(app).listen({ port: HTTP_PORT }, () => {
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