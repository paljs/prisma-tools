import getPrismaSelect from "@prisma-tools/select";
import { ApolloServer } from "apollo-server";
import { applyMiddleware } from "graphql-middleware";
import { makeExecutableSchema } from "graphql-tools";
import { createContext, Context } from "./context";
import { typeDefs, resolvers } from "./graphql";

let schema = makeExecutableSchema({ typeDefs, resolvers });

const middleware = async (resolve, root, args, context: Context, info) => {
  await context.prisma.connect();
  context.select = getPrismaSelect(info);
  const result = await resolve(root, args, context, info);
  await context.prisma.disconnect();
  return result;
};

schema = applyMiddleware(schema, middleware);

const server = new ApolloServer({
  schema,
  context: createContext,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
