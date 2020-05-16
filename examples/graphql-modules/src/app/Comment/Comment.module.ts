import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { addSelect } from '../common/addSelect';
import { CommonModule } from '../common/common.module';
import { PostModule } from '../Post/Post.module';
import { UserModule } from '../User/User.module';

export const CommentModule = new GraphQLModule({
  name: 'Comment',
  typeDefs,
  resolvers,
  imports: [CommonModule, PostModule, UserModule],
  resolversComposition: {
    Query: [addSelect],
    Mutation: [addSelect],
  },
});
