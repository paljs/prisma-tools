import { GraphQLModule } from '@graphql-modules/core';
import { PrismaProvider } from './Prisma.provider';
import typeDefs from './inputTypes';

export const CommonModule = new GraphQLModule({
  typeDefs,
  providers: [PrismaProvider],
});
