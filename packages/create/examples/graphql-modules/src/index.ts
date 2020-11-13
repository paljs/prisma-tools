import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { application } from './app/application';

const schema = application.createSchemaForApollo();

const server = new ApolloServer({
  schema,
  context: (session) => session,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
