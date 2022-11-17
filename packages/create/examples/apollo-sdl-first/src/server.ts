import { PrismaSelect, generateGraphQlSDLFile } from '@paljs/plugins';
import { ApolloServer } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createContext, Context } from './context';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { GraphQLResolveInfo } from 'graphql';

let schema = makeExecutableSchema({ typeDefs, resolvers });

// Build one sdl file have all types you can delete if you not need
generateGraphQlSDLFile(schema);

const middleware = async (resolve, root, args, context: Context, info: GraphQLResolveInfo) => {
  const result = new PrismaSelect(info).value;
  if (!result.select || Object.keys(result.select).length > 0) {
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
