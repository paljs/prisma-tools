import { mergeTypeDefs } from '@graphql-tools/merge';
import { sdlInputs } from '@paljs/plugins';

export default mergeTypeDefs([sdlInputs]);
