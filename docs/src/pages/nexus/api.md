import SEO from '../../components/SEO';
import MdxCard from '../../components/MdxCard';
import { CardBody } from 'oah-ui';

<SEO title="Nexus Api" />

<MdxCard>
<CardBody>

## Tool settings

You can optionally pass some settings to the plugin.

**content**

- [Type definition](#type-definition)
- [Example](#example)

</CardBody>
</MdxCard>

<MdxCard>
<CardBody>

### Type definition

```ts
interface Options {
  // add onDelete.cascade() function on deleteOne and deleteMany mutations
  onDelete?: boolean;
  // build CRUD system for @nexus/schema package
  nexusSchema?: boolean;
  // rebuild only Input types
  onlyInputType?: boolean;
  // output path for models folders default 'src/graphql/models' you must create this folder
  modelsOutput?: string;
  // output path for inputTypes.ts file default 'src/graphql' you must create this folder
  inputTypesOutput?: string;
  // exclude fields from all models
  fieldsExclude?: string[];
  // exclude fields from one or more models will merge it with general fieldsExclude
  excludeFieldsByModel?: { [modelName: string]: string[] };
  // exclude queries or mutations for one or more models
  modelsExclude?: { name: string; queries?: boolean; mutations?: boolean }[];
  // disable all queries for all models
  disableQueries?: boolean;
  // disable all mutations for all models
  disableMutations?: boolean;
  // exclude queries and mutations for one or more model it's object with key : model name value array of QueriesAndMutations type
  excludeQueriesAndMutationsByModel?: {
    [modelName: string]: QueriesAndMutations[];
  };
  // exclude queries and mutations for all models array of QueriesAndMutations type
  excludeQueriesAndMutations?: QueriesAndMutations[];
}

type QueriesAndMutations =
  | 'findOne'
  | 'findMany'
  | 'findCount'
  | 'createOne'
  | 'updateOne'
  | 'upsertOne'
  | 'deleteOne'
  | 'updateMany'
  | 'deleteMany';
```

</CardBody>
</MdxCard>

<MdxCard>
<CardBody>

### Example

`src/createTypes.ts`

```ts
import { createTypes } from '@prisma-tools/nexus';

// for include every thing just createTypes() without any args

createTypes({
  // don't include 'createdAt', 'updatedAt' from any model
  fieldsExclude: ['createdAt', 'updatedAt'],
  // don't include 'password' field form 'User' model
  excludeFieldsByModel: {
    User: ['password'],
  },
  // don't include mutations file from 'Group' model
  modelsExclude: [{ name: 'Group', mutations: true }],
  // don't include 'deleteMany' mutation in 'Post' model mutations file
  excludeQueriesAndMutationsByModel: {
    Post: ['deleteMany'],
  },
});
```

</CardBody>
</MdxCard>
