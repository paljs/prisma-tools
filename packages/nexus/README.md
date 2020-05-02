# Introduction

**This tool built on [Prisma](https://prisma.io) and [nexus](https://www.nexusjs.org)** Create nexus types and CURD system from Prisma Client

> NOTE: You must be familiar with `Prisma` and `nexusJs` before use this tools.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Nexus Framework](#nexus-framework)
  - [Download nexus starter project](#download-nexus-starter-project)
    - [Unix (Mac OS, Linux)](#unix-mac-os-linux)
    - [Windows](#windows)
  - [Install dependencies](#install-dependencies)
    - [npm](#npm)
    - [yarn](#yarn)
  - [Example Usage](#example-usage)
    - [`User/type.ts`](#usertypets)
    - [`User/queries.ts`](#userqueriests)
    - [`User/mutations.ts`](#usermutationsts)
  - [Add select plugin](#add-select-plugin)
    - [Use](#use)
- [@nexus/schema](#nexusschema)
  - [Download starter project](#download-starter-project)
    - [Unix (Mac OS, Linux)](#unix-mac-os-linux-1)
    - [Windows](#windows-1)
  - [Install dependencies](#install-dependencies-1)
    - [npm](#npm-1)
    - [yarn](#yarn-1)
  - [Example Usage](#example-usage-1)
    - [`User/type.ts`](#usertypets-1)
    - [`User/queries.ts`](#userqueriests-1)
    - [`User/mutations.ts`](#usermutationsts-1)
  - [Add prismaSelect plugin](#add-prismaselect-plugin)
    - [Use](#use-1)
- [Tool settings](#tool-settings)
  - [Type definition](#type-definition)
  - [Example](#example)
- [Have questions?](#have-questions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Nexus Framework

## Download nexus starter project

This guide uses a small starter project that has Prisma configured against a SQLite database file.

Open your terminal and download the starter project with the following command:

### Unix (Mac OS, Linux)

```shell script
curl https://codeload.github.com/AhmedElywa/prisma-tools/tar.gz/master | tar -xz --strip=2 prisma-tools-master/examples/nexus
```

### Windows

```shell script
curl https://codeload.github.com/AhmedElywa/prisma-tools/tar.gz/master -o master.tar.gz && tar -zxvf master.tar.gz prisma-tools-master/examples/nexus && move prisma-tools-master/examples/nexus nexus && rmdir /S /Q prisma-tools-master && del /Q master.tar.gz
```

## Install dependencies

The project has downloaded to directory called nexus

### npm
Run this three commands

```shell script
cd nexus
npm i
npm run dev
```

### yarn
Run this three commands

```shell script
cd nexus
yarn
yarn dev
```

## Example Usage

For more information about Prisma look at they [Docs](https://www.prisma.io/docs)

**Every model in `schema.prisma` will have 3 files**

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

**Example**

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

To understand this code structure please look to [Nexus Docs](https://www.nexusjs.org/#/guides/schema?id=schema)

### `User/type.ts`

```ts
import { schema } from 'nexus';

schema.objectType({
  name: 'User',
  definition(t) {
    t.int('id', { nullable: false });
    t.string('email', { nullable: false });
    t.string('name', { nullable: true });
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

### `User/queries.ts`

<details>
<summary>Click here to show ...</summary>
<p>

```ts
import { schema } from 'nexus';

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('findOneUser', {
      type: 'User',
      nullable: true,
      args: {
        where: schema.arg({
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

### `User/mutations.ts`

<details>
<summary>Click here to show ...</summary>
<p>

```ts
import { schema } from 'nexus';

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createOneUser', {
      type: 'User',
      nullable: false,
      args: {
        data: schema.arg({
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
        where: schema.arg({
          type: 'UserWhereUniqueInput',
          nullable: false,
        }),
        data: schema.arg({
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
        where: schema.arg({
          type: 'UserWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve: async (_, { where }, { prisma, select }) => {
        return prisma.user.delete({
          where,
          ...select,
        });
      },
    });

    t.field('deleteManyUser', {
      type: 'BatchPayload',
      args: {
        where: schema.arg({
          type: 'UserWhereInput',
          nullable: true,
        }),
      },
      resolve: async (_, { where }, { prisma, select }) => {
        return prisma.user.deleteMany({
          where,
          ...select,
        });
      },
    });

    t.field('updateManyUser', {
      type: 'BatchPayload',
      args: {
        where: schema.arg({
          type: 'UserWhereInput',
          nullable: true,
        }),
        data: schema.arg({
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

## Add select plugin

It's a small tool to convert `info: GraphQLResolveInfo` to select object accepted by `prisma client` this will give you the best performance because you will just query exactly what you want

`server.ts`

```ts
import { use } from 'nexus';
import { prismaSelect } from 'nexus-plugin-prisma-select';

use(prismaSelect());
```

This plugin is take `info` and convert it to Prisma select object and add to resolve context

### Use

```ts
import { schema } from 'nexus';

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('findOneUser', {
      type: 'User',
      nullable: true,
      args: {
        where: schema.arg({
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
  },
});
```

# @nexus/schema

## Download starter project

This guide uses a small starter project that has Prisma configured against a SQLite database file and @nexus/schema package to build graphql schema.

Open your terminal and download the starter project with the following command:

### Unix (Mac OS, Linux)

```shell script
curl https://codeload.github.com/AhmedElywa/prisma-tools/tar.gz/master | tar -xz --strip=2 prisma-tools-master/examples/apollo-nexus-schema
```

### Windows

```shell script
curl https://codeload.github.com/AhmedElywa/prisma-tools/tar.gz/master -o master.tar.gz && tar -zxvf master.tar.gz prisma-tools-master/examples/apollo-nexus-schema && move prisma-tools-master/examples/apollo-nexus-schema apollo-nexus-schema && rmdir /S /Q prisma-tools-master && del /Q master.tar.gz
```

## Install dependencies

The project has downloaded to directory called apollo-nexus-schema

### npm
Run this three commands

```shell script
cd apollo-nexus-schema
npm i
npm run dev
```

### yarn
Run this three commands

```shell script
cd apollo-nexus-schema
yarn
yarn dev
```

## Example Usage

For more information about Prisma look at they [Docs](https://www.prisma.io/docs)

**Every model in `schema.prisma` will have 3 files**

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

**Example**

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

To understand this code structure please look to [Nexus schema Docs](https://www.nexusjs.org/#/components/schema/api/index)

### `User/type.ts`

```ts
import { objectType } from '@nexus/schema'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id', { nullable: false })
    t.string('email', { nullable: false })
    t.string('name', { nullable: true })
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

### `User/queries.ts`

<details>
<summary>Click here to show ...</summary>
<p>

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

</p>
</details>

### `User/mutations.ts`

<details>
<summary>Click here to show ...</summary>
<p>

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
      resolve: async (_, { where }, { prisma, select }) => {
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
      resolve: async (_, { where }, { prisma, select }) => {
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

</p>
</details>

## Add prismaSelect plugin

It's a small tool to convert `info: GraphQLResolveInfo` to select object accepted by `prisma client` this will give you the best performance because you will just query exactly what you want

`schema.ts`

```ts
import { makeSchema } from '@nexus/schema';
import * as types from './graphql';
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

This plugin is take `info` and convert it to Prisma select object and add to resolve context

### Use

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
        });
      },
    });
  },
});
```

# Tool settings

You can optionally pass some settings to the plugin.

## Type definition

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
  | 'deleteOne'
  | 'updateMany'
  | 'deleteMany';
```

## Example

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

# Have questions?

Didn't find something here? Look through the [issues](https://github.com/AhmedElywa/prisma-tools/issues) or simply drop us a line at <ahmed.elywa@icloud.com>.

**Like my tool give me star**
