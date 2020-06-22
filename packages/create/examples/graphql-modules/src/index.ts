import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { AppModule } from './app/app.module';

const server = new ApolloServer({
  modules: [AppModule],
  context: (session) => session,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
