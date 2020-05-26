import SEO from '../components/SEO';

import MdxCard from '../components/MdxCard';

<SEO title="nexus-plugin-prisma-select" />

<MdxCard>

# nexus-schema-plugin-prisma-select

- [Installation](#installation)
- [Example Usage](#example-usage)
  - [Use](#use)
  - [Example query](#example-query)

## Installation

```shell
npm install nexus-schema-plugin-prisma-select
```

## Example Usage

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

### Use

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

### Example query

```graphql
query {
  findOneUser(where: { id: 1 }) {
    id
    email
    name
    posts(where: { title: { contains: "a" } }, orderBy: { createdAt: asc }, first: 10, skip: 5) {
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
const result = {
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
          where: { contain: { contains: 'a' } },
        },
      },
      where: { title: { contains: 'a' } },
      orderBy: { createdAt: 'asc' },
      first: 10,
      skip: 5,
    },
  },
};
```

</MdxCard>
