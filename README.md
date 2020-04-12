### nexus-schema-prisma

Create nexus types and CURD system from prisma 

**This tool is bulit on [Prisma](https://prisma.io) and [nexus](https://www.nexusjs.org/#/components/schema/about)**

**Every model in schema will have 3 files**

- `type.ts` contain `objectType` for this model

- `queries.ts` contain 3 queries `'findOne' | 'findMany' | 'findCount'`

- `mutations.ts` contain 5 mutations `'createOne' | 'updateOne' | 'deleteOne' | 'updateMany' | 'deleteMany'`

  

**Example**

Use full example here [`prisma-apollo`](https://github.com/AhmedElywa/prisma-apollo) to fast start (prisma , nexus/schema , nexus-schema-prisma , typescript and Auth)

**Simple code**

`schema.prisma`

```prisma
datasource postgresql {
  url      = env("DATABASE_URL")
  provider = "postgresql"
}
generator client {
  provider = "prisma-client-js"
}
model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
}
model Post {
  id         Int        @id @default(autoincrement())
  createdAt  DateTime   @default(now())
  updatedAt  DateTime   @updatedAt
  published  Boolean    @default(false)
  title      String
  author     User?      @relation(fields:  [authorId], references: [id])
  authorId   Int?
}
enum Role {
  USER
  ADMIN
}
```



`User/type.ts`

```ts
import { objectType } from '@nexus/schema'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id', { nullable: false })
    t.string('email', { nullable: false })
    t.string('name', { nullable: true })
    t.field('role', { nullable: false, type: 'Role' })
    t.field('posts', {
      nullable: false,
      list: [true],
      type: 'Post',
      args: {
        where: 'PostWhereInput',
        orderBy: 'PostOrderByInput',
        skip: 'Int',
        after: 'PostWhereUniqueInput',
        before: 'PostWhereUniqueInput',
        first: 'Int',
        last: 'Int',
      },
    })
  },
})

```



`User/queries.ts`

```ts
import { extendType, arg } from '@nexus/schema'

export const UserQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('findOneUser', {
      type: 'User',
      nullable: true,
      args: {
        where: arg({
          type: 'UserWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve(_, { where }, { prisma, select }) {
        return prisma.user.findOne({
          where,
          ...select,
        })
      },
    })

    t.field('findManyUser', {
      type: 'User',
      nullable: true,
      list: true,
      args: {
        where: 'UserWhereInput',
        orderBy: 'UserOrderByInput',
        after: 'UserWhereUniqueInput',
        before: 'UserWhereUniqueInput',
        skip: 'Int',
        first: 'Int',
        last: 'Int',
      },
      resolve: async (_root, args, { prisma, select }) => {
        return prisma.user.findMany({
          ...args,
          ...select,
        })
      },
    })

    t.field('findManyUserCount', {
      type: 'Int',
      args: {
        where: 'UserWhereInput',
        orderBy: 'UserOrderByInput',
        after: 'UserWhereUniqueInput',
        before: 'UserWhereUniqueInput',
        skip: 'Int',
        first: 'Int',
        last: 'Int',
      },
      resolve: async (_root, args, { prisma }) => {
        return prisma.user.count({ ...args })
      },
    })
  },
})

```



`User/mutations.ts`

```ts
import { extendType, arg } from '@nexus/schema'

export const UserMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createOneUser', {
      type: 'User',
      nullable: false,
      args: {
        data: arg({
          type: 'UserCreateInput',
          nullable: false,
        }),
      },
      resolve(_, { data }, { prisma, select }) {
        return prisma.user.create({
          data,
          ...select,
        })
      },
    })

    t.field('updateOneUser', {
      type: 'User',
      nullable: false,
      args: {
        where: arg({
          type: 'UserWhereUniqueInput',
          nullable: false,
        }),
        data: arg({
          type: 'UserUpdateInput',
          nullable: false,
        }),
      },
      resolve(_, { data, where }, { prisma, select }) {
        return prisma.user.update({
          data,
          where,
          ...select,
        })
      },
    })

    t.field('deleteOneUser', {
      type: 'User',
      nullable: true,
      args: {
        where: arg({
          type: 'UserWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve(_, { where }, { prisma, select }) {
        return prisma.user.delete({
          where,
          ...select,
        })
      },
    })

    t.field('deleteManyUser', {
      type: 'BatchPayload',
      args: {
        where: arg({
          type: 'UserWhereInput',
          nullable: true,
        }),
      },
      resolve(_, { where }, { prisma, select }) {
        return prisma.user.deleteMany({
          where,
          ...select,
        })
      },
    })

    t.field('updateManyUser', {
      type: 'BatchPayload',
      args: {
        where: arg({
          type: 'UserWhereInput',
          nullable: true,
        }),
        data: arg({
          type: 'UserUpdateManyMutationInput',
          nullable: false,
        }),
      },
      resolve(_, { where, data }, { prisma, select }) {
        return prisma.user.updateMany({
          where,
          data,
          ...select,
        })
      },
    })
  },
})
```



## Add `prismaSelectObject` plugin to `nexus`

As we work with `graphql` we send select fields from frontend to get this data from `prisma client ` we need to convert `info: GraphQLResolveInfo` to be available select Object to pass in prisma client

`schema.ts`

```ts
import { makeSchema } from '@nexus/schema'
import * as types from './types'
import { prismaSelectObject } from 'nexus-schema-prisma'

export const schema = makeSchema({
  types,
  plugins: [prismaSelectObject],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
    contextType: 'Context.Context',
  },
})

```

This plugin add `select ` object to `context` 



```ts
t.field('findOneUser', {
      type: 'User',
      nullable: true,
      args: {
        where: arg({
          type: 'UserWhereUniqueInput',
          nullable: false,
        }),
      },
  // we have select in context
      resolve(_, { where }, { prisma, select }) {
        return prisma.user.findOne({
          where,
          // add here to select requested data
          ...select,
        })
      },
    })
```



### Add scripts to `package.json`

```json
"scripts": {
    "generate": "yarn generate-prisma && yarn create-types && yarn generate-nexus",
    "generate-prisma": "prisma generate",
    "generate-nexus": "ts-node --transpile-only src/schema",
    "create-types": "ts-node --transpile-only src/createTypes"
  }
```



### `createTypes.ts` to build our CURD system

`src/createTypes.ts`

```ts
import { createTypes } from 'nexus-schema-prisma'

// for include every thing just createTypes() without any args

createTypes({
  fieldsExclude: ['createdAt', 'updatedAt'],
  excludeFieldsByModel: {
    User: ['password'],
  },
  modelsExclude: [{ name: 'Group', mutations: true }],
  excludeQueriesAndMutationsByModel: {
    Post: ['deleteMany'],
  },
})

interface Options {
  // rebuild only Input types
  onlyInputType?: boolean;
  // output path for models folders default 'src/types/models' you must create this folder
  modelsOutput: string;
  // output path for inputTypes.ts file default 'src/types' you must create this folder
  inputTypesOutput: string;
  // exclude fields from all models
  fieldsExclude: string[];
  // exclude fields from one or more models will merge it with general fieldsExclude
  excludeFieldsByModel: { [modelName: string]: string[] };
  // exclude queries or mutations for one or more models
  modelsExclude: { name: string; queries?: boolean; mutations?: boolean }[];
  // disable all queries for all models
  disableQueries?: boolean;
  // disable all muations for all models
  disableMutations?: boolean;
  // exclude queries and mutations for one or more model it's object with key : model name value array of QueriesAndMutations type
  excludeQueriesAndMutationsByModel: {[modelName: string]: QueriesAndMutations[]};
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



### Have questions?



Didn't find something here? Look through the [issues](https://github.com/AhmedElywa/nexus-schema-prisma/issues) or simply drop us a line at <ahmed.elywa@icloud.com>.



## Like my tool give me star