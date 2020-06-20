import { mergeTypes } from 'merge-graphql-schemas';
import { sdlInputs } from '@paljs/plugins';

export default mergeTypes([sdlInputs]);
