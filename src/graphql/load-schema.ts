import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import path from 'path';

const schema = loadSchemaSync(path.join(__dirname, './schema/schema.graphql'), {
  loaders: [new GraphQLFileLoader()]
});

export default schema;
