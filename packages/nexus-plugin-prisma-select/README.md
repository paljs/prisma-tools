# nexus-plugin-prisma-select <!-- omit in toc -->

[Docs Site](https://prisma-tools.ahmedelywa.com/)

**Contents**

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Example Usage](#example-usage)
  - [Use](#use)
  - [Example query](#example-query)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<br>

## Installation

```
npm install nexus-plugin-prisma-select
```

<br>

## Example Usage

It's a small tool to convert `info: GraphQLResolveInfo` to select object accepted by `prisma client` this will give you the best performance because you will just query exactly what you want

`server.ts`

```ts
import { use } from 'nexus'
import { prismaSelect } from 'nexus-plugin-prisma-select'

use(prismaSelect())
```

This plugin is take `info` and convert it to Prisma select object and add to resolve context

### Use

```ts
import { schema } from 'nexus'

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
        })
      },
    })
  },
})
```

### Example query

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

<br>
