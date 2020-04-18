### prisma-delete

This tool is built for [Prisma](https://prisma.io)

Prisma Migrate cli not supported `Cascading deletes` so this tool is workaround this option

install

```
npm i @prisma-tools/delete
```

**Example**

Use full example here [`prisma-apollo`](https://github.com/AhmedElywa/prisma-apollo) to fast start (prisma , nexus/schema , nexus-schema-prisma , typescript and Auth)

`schema.prisma`

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id         Int      @default(autoincrement()) @id
  createdAt  DateTime @default(now())
  email      String   @unique
  name       String?
  password   String
  role       Role     @default(USER)
  posts      Post[]
  activities Activity[]
  group      Group?   @relation(fields: [groupId], references: [id])
  groupId    Int?
}

model Post {
  id        Int       @default(autoincrement()) @id
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  published Boolean   @default(false)
  title     String
  author    User?     @relation(fields: [authorId], references: [id])
  authorId  Int?
  comments  Comment[]
}

model Comment {
  id        Int      @default(autoincrement()) @id
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  contain   String
  post      Post     @relation(fields: [postId], references: [id])
  postId    Int
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}

model Group {
  id        Int      @default(autoincrement()) @id
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  users     User[]
}

model Activity {
  id        Int      @default(autoincrement()) @id
  day       DateTime
  title     String   @default("")
  user      User      @relation(fields: [userId], references: [id])
  userId    Int
  updatedAt DateTime
  createdAt DateTime
}

enum Role {
  USER
  ADMIN
}
```

```ts
const schema: { [key: string]: string[] } = {
  User: ['posts', 'activities'],
  Post: ['comments'],
  Group: ['users'],
};
export default schema;
```

Here when we delete `user` will go thought schema and look to model name array

```ts
import DeleteCascade from '@prisma-tools/delete';

const schema: { [Model: string]: string[] } = {
  User: ['posts', 'activities'],
  Post: ['comments'],
  Group: ['users'],
};

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
    const onDelete = new DeleteCascade(prisma, schema);
    await onDelete.cascade('User', where, false);
    return prisma.user.delete({
      where,
      ...select,
    });
  },
});

// normal resolver
const resolvers = {
  Query: {
    user(_parent, { where }, { prisma }) {
      const onDelete = new DeleteCascade(prisma, schema);
      await onDelete.cascade('CourseTaking', where, false);
      return prisma.user.delete({
        where,
        ...select,
      });
    },
  },
};
```

final result will be

```ts
prisma.comment.deleteMany({
  where: {
    post: {
      user: {
        id: 1,
      },
    },
  },
});
prisma.post.deleteMany({
  where: {
    user: {
      id: 1,
    },
  },
});
prisma.activity.deleteMany({
  where: {
    user: {
      id: 1,
    },
  },
});
// if delete parent true
prisma.user.deleteMany({
  where: {
    id: 1,
  },
});
```

## `DeleteCascade` class

accept require two args

- `prisma` prisma client class
- `schema` it's our delete relation object like we add in example `{ [Model: string]: string[] }`

```ts
const onDelete = new DeleteCascade(prisma, schema);
```

`onDelete.cascade` accept three args

- `model name` like you define in `schema.prisma`
- `where` object to to find delete result same `{ id: 1}`
- `delete parent` delete result from this model you pass `default: true` you can send it `false` to delete row and return delete row data

```ts
await onDelete.cascade('User', where, false);
```

## Add to Context

```ts
import { PrismaClient } from '@prisma/client';
import DeleteCascade from '@prisma-tools/delete';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  onDelete: DeleteCascade;
}

export function createContext({ req, res }): Context {
  return {
    prisma,
    onDelete: new DeleteCascade(prisma, onDelete),
  };
}
```

And you can use from context in resolves

```ts
resolve(_, { where }, { prisma, onDelete }) {
  await onDelete.cascade('User', where);
}
```

### Have questions?

Didn't find something here? Look through the [issues](https://github.com/AhmedElywa/prisma-tools/issues) or simply drop us a line at <ahmed.elywa@icloud.com>.

## Like my tool give me star
