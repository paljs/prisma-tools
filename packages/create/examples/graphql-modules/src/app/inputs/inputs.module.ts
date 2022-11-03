import { createModule, gql } from 'graphql-modules';
import typeDefs from './InputTypes';

export const InputsModule = createModule({
  id: 'Inputs',
  typeDefs,
});
