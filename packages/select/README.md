## Prisma select

[![Version](https://img.shields.io/npm/v/@prisma-tools/select.svg)](https://npmjs.org/package/@prisma-tools/select)
[![Downloads/week](https://img.shields.io/npm/dw/@prisma-tools/select.svg)](https://npmjs.org/package/@prisma-tools/select)
[![License](https://img.shields.io/npm/l/@prisma-tools/select.svg)](https://prisma-tools.ahmedelywa.com/)

It's a small tool to convert `info: GraphQLResolveInfo` to select object accepted by `prisma client` this will give you the best performance because you will just query exactly what you want

[Docs Site](https://prisma-tools.ahmedelywa.com/select)

I wrote a post [Improve Your GraphQL performance with Prisma](https://dev.to/ahmedelywa/improve-your-graphql-performance-with-prisma-2jia)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [install](#install)
- [Use](#use)
- [Example query](#example-query)
- [Performance Example](#performance-example)
- [In the End](#in-the-end)
- [Conclusion](#conclusion)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## install

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

## Performance Example

We have `Prisma Schema` with three models.

```prisma
model User {
  id        Int       @default(autoincrement()) @id
  email     String    @unique
  password  String
  posts     Post[]
}

model Post {
  id        Int       @default(autoincrement()) @id
  published Boolean   @default(false)
  title     String
  author    User?     @relation(fields: [authorId], references: [id])
  authorId  Int?
  comments  Comment[]
}

model Comment {
  id        Int      @default(autoincrement()) @id
  contain   String
  post      Post     @relation(fields: [postId], references: [id])
  postId    Int
}
```

So the normal `GraphQL Resolvers` to get one User will be like this:

```js
{
  Query: {
    findOneUser: (_parent, args, { prisma }) => {
      return prisma.user.findOne(args);
    },
  },
  User: {
    posts: (parent, args, { prisma }) => {
      return prisma.user.findOne({where: {id: parent.id}}).posts(args);
    },
  },
  Post: {
    comments: (parent, args, { prisma }) => {
      return prisma.post.findOne({where: {id: parent.id}}).comments(args);
    },
  },
}
```

Let me do GraphQL query to get one user with his posts and comments inside posts and see what is the result:

```graphql
{
  findOneUser(where: { id: 1 }) {
    id
    posts {
      id
      comments {
        id
      }
    }
  }
}
```

In the GraphQL query we just need id form every record and what is happen we select all tables fields from db like you see in log of queries we have 5 queries to do our request.

```
prisma:query SELECT `dev`.`User`.`id`, `dev`.`User`.`createdAt`, `dev`.`User`.`email`, `dev`.`User`.`name`, `dev`.`User`.`password`, `dev`.`User`.`groupId` FROM `dev`.`User` WHERE `dev`.`User`.`id` = ? LIMIT ? OFFSET ?
prisma:query SELECT `dev`.`User`.`id` FROM `dev`.`User` WHERE `dev`.`User`.`id` = ? LIMIT ? OFFSET ?
prisma:query SELECT `dev`.`Post`.`id`, `dev`.`Post`.`published`, `dev`.`Post`.`title`, `dev`.`Post`.`authorId`, `dev`.`Post`.`createdAt`, `dev`.`Post`.`updatedAt`, `dev`.`Post`.`authorId` FROM `dev`.`Post` WHERE `dev`.`Post`.`authorId` IN (?) LIMIT ? OFFSET ?
prisma:query SELECT `dev`.`Post`.`id` FROM `dev`.`Post` WHERE `dev`.`Post`.`id` IN (?,?,?) LIMIT ? OFFSET ?
prisma:query SELECT `dev`.`Comment`.`id`, `dev`.`Comment`.`contain`, `dev`.`Comment`.`postId`, `dev`.`Comment`.`authorId`, `dev`.`Comment`.`createdAt`, `dev`.`Comment`.`updatedAt`, `dev`.`Comment`.`postId` FROM `dev`.`Comment` WHERE `dev`.`Comment`.`postId` IN (?,?,?) LIMIT ? OFFSET ?
```

Ok with my way `GraphQL Resolvers`:

```js
import { PrismaSelect } from '@prisma-tools/select';

{
  Query: {
    findOneUser: (_parent, args, { prisma }, info) => {
      const select = new PrismaSelect(info).value;
      return prisma.user.findOne({
        ...args,
        ...select,
      });
    },
  },
}
```

Will do same GraphQL query :

```graphql
{
  findOneUser(where: { id: 1 }) {
    id
    posts {
      id
      comments {
        id
      }
    }
  }
}
```

And here our db queries log for our request.
First we have just 3 queries so we saved one query for every relation in our request.
second we just select `id` from db that we asked in GraphQl query:

```
prisma:query SELECT `dev`.`User`.`id` FROM `dev`.`User` WHERE `dev`.`User`.`id` = ? LIMIT ? OFFSET ?
prisma:query SELECT `dev`.`Post`.`id`, `dev`.`Post`.`authorId` FROM `dev`.`Post` WHERE `dev`.`Post`.`authorId` IN (?) LIMIT ? OFFSET ?
prisma:query SELECT `dev`.`Comment`.`id`, `dev`.`Comment`.`postId` FROM `dev`.`Comment` WHERE `dev`.`Comment`.`postId` IN (?,?,?) LIMIT ? OFFSET ?
```

## In the End

We have perfect GraphQL server with [Prisma](https://prisma.io) And [PrismaSelect](https://github.com/AhmedElywa/prisma-tools) tool.

You can try my tool with my ready examples:

- [**nexus framework**](https://github.com/AhmedElywa/prisma-tools/tree/master/examples/nexus) Using nexus framework to build graphql server and `@prisma-tools/nexus` to create CRUD system
- [**apollo with nexus schema**](https://github.com/AhmedElywa/prisma-tools/tree/master/examples/apollo-nexus-schema) Using Apollo as graphql server, @nexus/schema for build graphql schema and `@prisma-tools/nexus` to create CRUD system
- [**apollo with graphql modules**](https://github.com/AhmedElywa/prisma-tools/tree/master/examples/graphql-modules) Using Apollo as graphql server, graphql-modules for build graphql schema and `@prisma-tools/graphql-modules` to create CRUD system
- [**apollo with sdl first**](https://github.com/AhmedElywa/prisma-tools/tree/master/examples/apollo-sdl-first) Using Apollo as graphql server with sdl first for build graphql and `@prisma-tools/sdl` to create CRUD system

## Conclusion

GraphQL is quite powerful, not only does it optimise performance for client apps, but can also be used to optimise backend performance, after all we get the specifically requested fields in our resolver for free.
