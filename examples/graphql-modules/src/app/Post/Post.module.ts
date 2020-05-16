import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { addSelect } from '../common/addSelect';
import { CommonModule } from '../common/common.module';
import { UserModule } from '../User/User.module';

export const PostModule = new GraphQLModule({
  name: 'Post',
  typeDefs,
  resolvers,
  imports: [CommonModule, UserModule],
  resolversComposition: {
    Query: [addSelect],
    Mutation: [addSelect],
  },
});
