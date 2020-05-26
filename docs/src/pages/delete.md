import SEO from '../components/SEO';
import MdxCard from '../components/MdxCard';

<SEO title="On Delete" />

<MdxCard>

## Introduction

This tool is built for [Prisma](https://prisma.io)

Prisma Migrate cli not supported `Relation onDelete` so this tool is workaround this option

**CONTENT**

- [Introduction](#introduction)
- [Install](#install)
- [Example](#example)
  - [`schema.prisma`](#schemaprisma)
  - [Use](#use)
- [`PrismaDelete` class](#prismadelete-class)
- [Add to Context](#add-to-context)
- [Have questions?](#have-questions)

</MdxCard>

<MdxCard>

## Install

```shell
npm i @prisma-tools/delete
```

</MdxCard>

<MdxCard>

## Example

Use full example here [`Nexus Framework`](/nexus/framework) to fast start (prisma , nexus , typescript)

Specifies the deletion behavior and enables cascading deletes. In case a node with related nodes gets deleted, the deletion behavior determines what should happen to the related nodes. The input values for this argument are defined as an enum with the following possible values:

- `SET_NULL`: Set the related node(s) to `null`.
- `CASCADE`: Delete the related node(s). Note that is not possible to set both ends of a bidirectional relation to `CASCADE`.

To add onDelete Relation to any field just add comment before filed
`// @onDelete(CASCADE)` or `// @onDelete(SET_NULL)`

### `schema.prisma`

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int       @default(autoincrement()) @id
  createdAt DateTime  @default(now())
  email     String    @unique
  name      String?
  password  String
  // @onDelete(CASCADE)
  posts     Post[]
  group     Group?    @relation(fields: [groupId], references: [id])
  groupId   Int?
  // @onDelete(SET_NULL)
  comments  Comment[]
}

model Post {
  id        Int       @default(autoincrement()) @id
  published Boolean   @default(false)
  title     String
  author    User?     @relation(fields: [authorId], references: [id])
  authorId  Int?
  // @onDelete(CASCADE)
  comments  Comment[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Comment {
  id        Int      @default(autoincrement()) @id
  contain   String
  post      Post     @relation(fields: [postId], references: [id])
  postId    Int
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Group {
  id        Int      @default(autoincrement()) @id
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  // @onDelete(SET_NULL)
  users     User[]
}
```

- When a `User` record gets deleted, all its related `posts` records will be deleted as well and all its related `comments` records will be `author` `null`.
- When a `Post` record gets deleted, it will simply be removed from the `posts` list on the related `User` record and all its related `comments` records will be deleted.

### Use

Here when we delete `user` will go thought schema and look to model

```ts
import PrismaDelete from '@prisma-tools/delete';

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
    const prismaDelete = new PrismaDelete();
    await prismaDelete.onDelete({ model: 'User', where });
    return prisma.user.delete({
      where,
      ...select,
    });
  },
});

// normal resolver
const resolvers = {
  Query: {
    deleteOneUser(_parent, { where }, { prisma }) {
      const prismaDelete = new PrismaDelete();
      await prismaDelete.onDelete({ model: 'User', where });
      return prisma.user.delete({
        where,
        ...select,
      });
    },
  },
};
```

</MdxCard>

<MdxCard>

## `PrismaDelete` class

- @args `prisma` prisma client class

```ts
const prismaDelete = new PrismaDelete(prisma);
```

`prismaDelete.onDelete` accept object

- `model` model name like you define in `schema.prisma`
- `where` object to to find delete result same `{ id: 1}`
- `deleteParent` delete result from this model you pass `default: false` you can send it `true` to delete row and return delete row data

```ts
await prismaDelete.onDelete({ model: 'User', where, deleteParent: true });
```

## Add to Context

```ts
import { PrismaClient, PrismaClientOptions } from '@prisma/client';
import PrismaDelete, { onDeleteArgs } from '@prisma-tools/delete';

class Prisma extends PrismaClient {
  constructor(options?: PrismaClientOptions) {
    super(options);
  }

  async onDelete(args: onDeleteArgs) {
    const prismaDelete = new PrismaDelete(this);
    await prismaDelete.onDelete(args);
  }
}

const prisma = new Prisma();

export interface Context {
  prisma: Prisma;
}

export function createContext(): Context {
  return {
    prisma,
  };
}
```

And you can use from context in resolves

```ts
resolve(_, { where }, { prisma }) {
  await prisma.onDelete({ model: 'User', where, deleteParent: true });
}
```

</MdxCard>
