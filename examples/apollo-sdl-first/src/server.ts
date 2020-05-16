import { PrismaSelect } from '@prisma-tools/select';
import { ApolloServer } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from 'graphql-tools';
import { createContext, Context } from './context';
import typeDefs from './graphql/models/typeDefs';
import resolvers from './graphql/models/resolvers';
import { GraphQLResolveInfo } from 'graphql';
import { generateGraphQlSDLFile } from '@prisma-tools/sdl';

let schema = makeExecutableSchema({ typeDefs, resolvers });

// Build one sdl file have all types you can delete if you not need
generateGraphQlSDLFile(schema);

const middleware = async (
  resolve,
  root,
  args,
  context: Context,
  info: GraphQLResolveInfo,
) => {
  const result = new PrismaSelect(info).value;
  if (Object.keys(result.select).length > 0) {
    args = {
      ...args,
      ...result,
    };
  }
  return resolve(root, args, context, info);
};

schema = applyMiddleware(schema, middleware);

const server = new ApolloServer({
  schema,
  context: createContext,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
