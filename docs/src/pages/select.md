import SEO from '../components/SEO';
import SelectExample from '../components/SelectExample';
import MdxCard from '../components/MdxCard';

<SEO title="Select Convert" />

<MdxCard>

## Prisma select

Convert `info: GraphQLResolveInfo` to select object accepted by `prisma client` this will give you the best performance because you will just query exactly what you want in RootQuery this mean one resolver so no more `N + 1` issue.

**CONTENT**

- [Install](#install)
- [Normal Use](#normal-use)
- [Example query](#example-query)
- [Api](#api)
  - [constructor](#constructor)
  - [value](#value)
  - [valueOf](#valueof)
  - [mergeDeep](#mergedeep)
  - [filter](#filter)
- [Performance Example](#performance-example)
- [nexus-plugin-prisma-select](/nexus-plugin-prisma-select)
- [nexus-schema-plugin-prisma-select](/nexus-schema-plugin-prisma-select)

</MdxCard>

<MdxCard>

## Install

```shell
npm i @prisma-tools/select
```

## Normal Use

```ts
import { PrismaSelect } from '@prisma-tools/select';

// normal resolver
const resolvers = {
  Query: {
    user(_parent, { where }, { prisma }, info) {
      const select = new PrismaSelect(info).value;
      return prisma.user.findOne({
        where,
        ...select,
      });
    },
  },
};
```

</MdxCard>
<SelectExample/>

<MdxCard>

## API

### constructor

Take two args:

- `info` : `GraphQLResolveInfo`
- `mergeObject` : any object to merge with client requested fields good to always returned fixed data like `id`.

### Methods

#### value

Return your converted object.

#### valueOf

function take 3 args:

- `field`: path to field you want inside type. You can deeb inside nested relation with this `user.posts.comments`
- `filterBy`: take schema Model name to filter returned object by his schema type
- `mergeObject` : like constructor you can pass here any object to merge with returned data.

**Example of use**

We have mutation call login and return non schema model type `AuthPayload` and it's contain schema model type.

I need to return User type with filter.

```graphql
type AuthPayload {
  token: String
  user: User
}
type Mutation {
  login(email: String!, password: String!): AuthPayload
}
```

Here how to go in nested type, filter and merge custom object.

```ts
const resolver = {
  Mutation: {
    login: (_parent, { email, password }, { prisma }: Context, info) => {
      const select = new PrismaSelect(info).valueOf('user', 'User', { select: { id: true } });
      return {
        token: 'token',
        user: prisma.user.findOne({
          where: { email },
          ...select,
        }),
      };
    },
  },
};
```

### mergeDeep

Static method you can use to merge our converted object with your custom object.

Also you can use it to merge any object with another object.

You can use if you pass select object inside context.

```js{4}
const resolvers = {
  Query: {
    user(_parent, { where }, { prisma, select }, info) {
      const mergedObject = PrismaSelect.mergeDeep(select, { select: { id: true } });
      return prisma.user.findOne({
        where,
        ...mergedObject,
      });
    },
  },
};
```

### filter

We have private method to filter your client requested fields if not inside your prisma schema Model. This give you ability to customize your type and add more fields not in schema model

**_Example_**

```prisma
// prisma.schema
model User {
  id        Int      @default(autoincrement()) @id
  firstName      String
  lastName      String
}
```

```graphql
# graphql type
type User {
  id: Int
  firstName: String
  lastName: String
  fullName: String
}
```

AS you see here we must return `firstName` and `lastName` even if client not request them to use in `fullName`.

```ts{6,17}
import { PrismaSelect } from '@prisma-tools/select';

const resolvers = {
  Query: {
    user(_parent, { where }, { prisma }, info) {
      const select = new PrismaSelect(info, { select: { firstName: true, lastName: true } }).value;
      return prisma.user.findOne({
        where,
        // this object must not have `fullName` because will throw error it's not in our db
        // So we have built in filter to remove any field not in our schema model
        ...select,
      });
    },
  },
  User: {
    fullName: (parent, args, { prisma }: Context) => {
      return parent.firstName + parent.lastName;
    },
  },
};
```

</MdxCard>

<MdxCard>

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
const resolvers = {
  Query: {
    findOneUser: (_parent, args, { prisma }) => {
      return prisma.user.findOne(args);
    },
  },
  User: {
    posts: (parent, args, { prisma }) => {
      return prisma.user.findOne({ where: { id: parent.id } }).posts(args);
    },
  },
  Post: {
    comments: (parent, args, { prisma }) => {
      return prisma.post.findOne({ where: { id: parent.id } }).comments(args);
    },
  },
};
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

</MdxCard>
