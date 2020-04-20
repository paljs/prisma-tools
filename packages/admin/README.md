### Generate pages, Queries and Mutations

It's a small tool to generate pages and .graphql files for every model in your prisma schema

## Project

you can't use this tool outside our example [admin-gatsbyjs](https://github.com/AhmedElywa/prisma-tools/tree/master/examples/admin-gatsbyjs)

## Api

```typescript
import { generateAdmin, Schema } from '@prisma-tools/admin'
import defaultSchema from './server/src/types/schema/schema.json'

// accept three args 
// first one path to your schema.prisma file 
// second import generated schema.json to merge changes you must create this file form first and add 
// {models: [], enums: []}
// third arg is options look to the interface to know options

generateAdmin('./server/prisma/schema.prisma', defaultSchema as Schema, {
  excludeFieldsByModel: {
    User: ['password'],
  },
  excludeQueriesAndMutations: ['updateMany', 'deleteMany'],
})

interface Options {
// schema.json file output path default './server/src/types/schema/schema.json'
  schemaOutput: string;
// .graphql files output for queries and mutations default './admin/src/graphql'
  graphqlOutput: string;
// pages output for generate page for every model default './admin/src/pages/models'
  pagesOutput: string;
  // exclude fields from all models
  fieldsExclude: string[];
  // exclude fields from one or more models will merge it with general fieldsExclude
  excludeFieldsByModel: { [modelName: string]: string[] };
  // exclude queries or mutations for one or more models
  modelsExclude: { name: string; queries?: boolean; mutations?: boolean }[];
  // disable all queries for all models
  disableQueries?: boolean;
  // disable all mutations for all models
  disableMutations?: boolean;
  disableCreatePages?: boolean;
  disableCreateGraphql?: boolean;
  // exclude queries and mutations for one or more model it's object with key : model name value array of QueriesAndMutations type
  excludeQueriesAndMutationsByModel: {
    [modelName: string]: QueriesAndMutations[];
  };
  // exclude queries and mutations for all models array of QueriesAndMutations type
  excludeQueriesAndMutations: QueriesAndMutations[];
}

type QueriesAndMutations =
  | 'findOne'
  | 'findMany'
  | 'findCount'
  | 'createOne'
  | 'updateOne'
  | 'deleteOne'
  | 'updateMany'
  | 'deleteMany';
```
