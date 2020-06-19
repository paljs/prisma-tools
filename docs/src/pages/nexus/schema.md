import SEO from '../../components/SEO';
import { Tabs, Tab } from 'oah-ui';
import MdxCard from '../../components/MdxCard';

<SEO title="Nexus Schema" />

<MdxCard>

## @nexus/schema

This guide uses a small starter project that has Prisma configured against a SQLite database file and `@nexus/schema` package to build graphql schema.

**Content**

- [Download nexus starter project](#download-nexus-starter-project)
- [Install dependencies](#install-dependencies)
- [Example Usage](#example-usage)
- [Add select plugin](#add-select-plugin)

</MdxCard>

<MdxCard>

### Download nexus starter project

Open your terminal and download the starter project with the following command:

<Tabs>
<Tab title="Unix (Mac OS, Linux)">

```shell
curl https://codeload.github.com/paljs/prisma/tar.gz/master | tar -xz --strip=2 prisma-master/examples/apollo-nexus-schema
```

</Tab>
<Tab title="Windows">

```shell
curl https://codeload.github.com/paljs/prisma/tar.gz/master -o master.tar.gz && tar -zxvf master.tar.gz prisma-master/examples/apollo-nexus-schema && move prisma-master/examples/apollo-nexus-schema apollo-nexus-schema && rmdir /S /Q prisma-master && del /Q master.tar.gz
```

</Tab>
</Tabs>

</MdxCard>

<MdxCard>

### Install dependencies

The project has downloaded to directory called apollo-nexus-schema

<Tabs>
<Tab title="npm">

Run this three commands

```shell
cd apollo-nexus-schema
npm i
npm run dev
```

</Tab>
<Tab title="yarn">

Run this three commands

```shell
cd apollo-nexus-schema
yarn
yarn dev
```

</Tab>
</Tabs>

</MdxCard>

<MdxCard>

### Example Usage

For more information about Prisma look at they [Docs](https://www.prisma.io/docs)

`package.json`

```json
{
  "scripts": {
    "start": "node dist/server",
    "clean": "rm -rf dist",
    "build": "npm -s run clean && npm -s run generate && tsc",
    "generate": "npm -s run generate:prisma && npm -s run generate:crud && npm -s run generate:nexus",
    "generate:prisma": "prisma generate",
    "generate:crud": "ts-node --transpile-only src/createTypes",
    "generate:nexus": "ts-node --transpile-only src/schema",
    "seed": "ts-node --transpile-only prisma/seed",
    "create-migration": "prisma migrate save --experimental",
    "migrate-database": "prisma migrate up --experimental --auto-approve --create-db",
    "dev": "ts-node-dev --no-notify --respawn --transpileOnly src/server"
  }
}
```

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

After build your `schema.prisma` file all you need to run

```shell
yarn generate
```

This command will run three commands

```json
{
  "generate:prisma": "prisma generate",
  "generate:crud": "ts-node --transpile-only src/createTypes",
  "generate:nexus": "ts-node --transpile-only src/schema"
}
```

- build prisma client
- use our tool to auto generate your crud system
- build nexus type gen and schema.graphql file

#### Output For User Model

To understand this code structure please look to [Nexus schema Docs](https://www.nexusjs.org/#/components/schema/api/index)

<Tabs>
<Tab title="type.ts">

```ts
import { objectType } from '@nexus/schema';

export const User = objectType({
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
        cursor: 'PostWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
      },
      resolve(parent: any) {
        return parent['posts'];
      },
    });
  },
});
```

</Tab>
<Tab title="queries.ts">

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
        cursor: 'UserWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
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
        cursor: 'UserWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      resolve: async (_root, args, { prisma }) => {
        return prisma.user.count({ ...args });
      },
    });
  },
});
```

</Tab>
<Tab title="mutations.ts">

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
        where: arg({
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

</Tab>
</Tabs>

</MdxCard>

<MdxCard>

### Add select plugin

It's a small tool to convert `info: GraphQLResolveInfo` to select object accepted by `prisma client` this will give you the best performance because you will just query exactly what you want

`schema.ts`

```ts
import { makeSchema } from '@nexus/schema';
import * as types from './graphql';
import { prismaSelectObject } from 'nexus-schema-plugin-prisma-select';

export const schema = makeSchema({
  types,
  plugins: [prismaSelectObject()],
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

#### Use

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
  },
});
```

</MdxCard>
