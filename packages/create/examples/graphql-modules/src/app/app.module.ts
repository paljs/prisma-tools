import { GraphQLModule } from '@graphql-modules/core';
import { CommonModule } from './common/common.module';

export const AppModule = new GraphQLModule({
  imports: [CommonModule],
});
