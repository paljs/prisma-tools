import { createModule, gql } from "graphql-modules";
import { sdlInputs } from '@paljs/plugins';

export const InputsModule = createModule({
  id: 'Inputs',
  typeDefs: sdlInputs()
});
