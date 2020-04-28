### Prisma Tools

What is in Prisma tools

Tools

- [**@prisma-tools/nexus**](#nexus) Build CRUD system from prisma
- [**@prisma-tools/select**](https://github.com/AhmedElywa/prisma-tools/tree/master/packages/select) convert `info: GraphQLResolveInfo` to be available prisma select object
- [**@prisma-tools/delete**](https://github.com/AhmedElywa/prisma-tools/tree/master/packages/delete) Prisma Migrate cli not supported Cascading deletes so this tool is workaround this option
- [**@prisma-tools/admin**](https://github.com/AhmedElywa/prisma-tools/tree/master/packages/admin) generate pages, Queries and mutations in our Admin project [prisma-admin](https://github.com/AhmedElywa/prisma-admin)

Examples

- [**apollo with nexus schema**](https://github.com/AhmedElywa/prisma-tools/tree/master/examples/apollo-nexus-schema)
- [**Prisma Admin**](https://github.com/AhmedElywa/prisma-tools/tree/master/examples/admin-gatsbyjs)

## nexus

- [Install](#Install)
- [Example](#Example)
- [prismaselectobject plugin](#add-prismaselectobject-plugin-to-nexus)
- [scripts](#add-scripts-to-packagejson)
- [Api](#createtypests-to-build-our-curd-system)
- [Input types](#inputtypests-file)
- [delete cascade](#deletecascade-class)

**This tool is built on [Prisma](https://prisma.io) and [nexus](https://www.nexusjs.org/#/components/schema/about)** Create nexus types and CURD system from prisma

NOTE: you don't need to use `nexus-prisma` plugin our tool replace it.

## Install

```
npm i @prisma-tools/nexus
```

**Every model in schema will have 3 files**

- `type.ts` contain `objectType` for this model
- `queries.ts` contain 3 queries `'findOne' | 'findMany' | 'findCount'`
- `mutations.ts` contain 5 mutations `'createOne' | 'updateOne' | 'deleteOne' | 'updateMany' | 'deleteMany'`
- add to `inputTypes.ts` file list of inputs

```
UserWhereInput
UserWhereUniqueInput
UserOrderByInput
UserCreateInput
UserUpdateInput
UserUpdateManyMutationInput
```

## Example

Use full example here [`apollo-nexus-schema`](https://github.com/AhmedElywa/prisma-tools/tree/master/examples/apollo-nexus-schema) to fast start (prisma , nexus/schema , nexus-schema-prisma , typescript and Auth)

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
import { objectType } from '@nexus/schema';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id', { nullable: false });
    t.string('email', { nullable: false });
    t.string('name', { nullable: true });
    t.field('role', { nullable: false, type: 'Role' });
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
    });
  },
});
```

`User/queries.ts`

<details>
<summary>Click here to show ...</summary>
<p>

```ts
import { extendType, arg } from '@nexus/schema';

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
        });
      },
    });

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
        });
      },
    });

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
        return prisma.user.count({ ...args });
      },
    });
  },
});
```

</p>
</details>

`User/mutations.ts`

<details>
<summary>Click here to show ...</summary>
<p>

```ts
import { extendType, arg } from '@nexus/schema';

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
        });
      },
    });

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
        });
      },
    });

    t.field('deleteOneUser', {
      type: 'User',
      nullable: true,
      args: {
        where: arg({
          type: 'UserWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve(_, { where }, { prisma, select, onDelete }) {
        await onDelete.cascade('User', where, false);
        return prisma.user.delete({
          where,
          ...select,
        });
      },
    });

    t.field('deleteManyUser', {
      type: 'BatchPayload',
      args: {
        where: arg({
          type: 'UserWhereInput',
          nullable: true,
        }),
      },
      resolve(_, { where }, { prisma, select, onDelete }) {
        await onDelete.cascade('User', where, false);
        return prisma.user.deleteMany({
          where,
          ...select,
        });
      },
    });

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
        });
      },
    });
  },
});
```

</p>
</details>

## Add `prismaSelectObject` plugin to `nexus`

As we work with `graphql` we send select fields from frontend to get this data from `prisma client` we need to convert `info: GraphQLResolveInfo` to be available select Object to pass in prisma client

```
NOTE: you don't need to use `nexus-prisma` plugin
```

`schema.ts`

```ts
import { makeSchema } from '@nexus/schema';
import * as types from './types';
import { prismaSelectObject } from '@prisma-tools/nexus';

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
});
```

This plugin add `select` object to `context`

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
    });
  },
});
```

**Example query**

```graphql
query {
  findOneUser(where: { id: 1 }) {
    id
    email
    name
    posts(
      where: { title: { contains: "a" } }
      orderBy: { createdAt: asc }
      first: 10
      skip: 5
    ) {
      id
      title
      comments(where: { contain: { contains: "a" } }) {
        id
        contain
      }
    }
  }
}
```

convert to

```js
{
  select: {
    id: true,
    email: true,
    name: true,
    posts: {
      select: {
        id: true,
        title: true,
        comments: {
          select: { id: true, contain: true },
          where: { contain: { contains: 'a' } }
        }
      },
      where: { title: { contains: 'a' } },
      orderBy: { createdAt: 'asc' },
      first: 10,
      skip: 5
    }
  }
}
```

### Add scripts to `package.json`

```json
"scripts": {
    "generate": "npm -s run generate:prisma && npm -s run generate:crud && npm -s run generate:nexus",
    "generate:prisma": "prisma generate",
    "generate:crud": "ts-node --transpile-only src/createTypes",
    "generate:nexus": "ts-node --transpile-only src/schema",
    "postinstall": "npm -s run generate"
  }
```

### `createTypes.ts` to build our CURD system

`src/createTypes.ts`

```ts
import { createTypes } from '@prisma-tools/nexus';

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
});

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

## `inputTypes.ts` file

Generate all `enums` , `InputTypes` from `@prisma/client` package

Every model in your schema will have 6 input types in `inputTypes.ts`

For `User` model:-

```
UserWhereInput
UserWhereUniqueInput
UserOrderByInput
UserCreateInput
UserUpdateInput
UserUpdateManyMutationInput
```

## `DeleteCascade` class

Prisma Migrate cli not supported `Cascading deletes` so this tool is workaround this option

We use [Prisma delete tool](https://github.com/AhmedElywa/prisma-tools/tree/master/packages/delete) you can see his docs here

### Have questions?

Didn't find something here? Look through the [issues](https://github.com/AhmedElywa/prisma-tools/issues) or simply drop us a line at <ahmed.elywa@icloud.com>.

## Like my tool give me star
