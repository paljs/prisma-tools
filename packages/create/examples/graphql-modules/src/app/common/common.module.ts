import { GraphQLModule } from '@graphql-modules/core';
import { PrismaProvider } from './Prisma.provider';
import { sdlInputs } from '@paljs/plugins';

export const CommonModule = new GraphQLModule({
  typeDefs: sdlInputs({}),
  providers: [PrismaProvider],
});
