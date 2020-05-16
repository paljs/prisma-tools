import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { addSelect } from '../common/addSelect';
import { CommonModule } from '../common/common.module';
import { GroupModule } from '../Group/Group.module';

export const UserModule = new GraphQLModule({
  name: 'User',
  typeDefs,
  resolvers,
  imports: [CommonModule, GroupModule],
  resolversComposition: {
    Query: [addSelect],
    Mutation: [addSelect],
  },
});
