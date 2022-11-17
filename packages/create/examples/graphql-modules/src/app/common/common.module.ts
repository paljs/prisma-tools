import { createModule, gql } from 'graphql-modules';

export const CommonModule = createModule({
  id: 'Common',
  typeDefs: gql`
    type Query {
      hello: String
    }
    type Mutation {
      hello: String
    }
  `,
});
