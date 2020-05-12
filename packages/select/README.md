<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Prisma select](#prisma-select)
- [Use](#use)
- [Example query](#example-query)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Prisma select

It's a small tool to convert `info: GraphQLResolveInfo` to select object accepted by `prisma client` this will give you the best performance because you will just query exactly what you want

```
npm i @prisma-tools/select
```

## Use

```ts
import { PrismaSelect } from '@prisma-tools/select';

// nexus
t.field('findOneUser', {
  type: 'User',
  nullable: true,
  args: {
    where: arg({
      type: 'UserWhereUniqueInput',
      nullable: false,
    }),
  },
  resolve(_parent, { where }, { prisma }, info) {
    const select = new PrismaSelect(info);
    return prisma.user.findOne({
      where,
      ...select.value,
    });
  },
});
// normal resolver
const resolvers = {
  Query: {
    user(_parent, { where }, { prisma }, info) {
      const select = new PrismaSelect(info);
      return prisma.user.findOne({
        where,
        ...select.value,
      });
    },
  },
};
```

## Example query

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
