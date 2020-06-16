import SEO from '../components/SEO';
import MdxCard from '../components/MdxCard';
import { Tabs, Tab } from 'oah-ui';

<SEO title="Convert schema" />
<MdxCard>

## Prisma schema CLI

- Convert your `schema.prisma` file into `JavaScript`, `TypeScript` and `Json` files.
- Convert your `schema.prisma` file from `Snake case` eg `first_name` to `Camel case` eg `firstName`.

## Schema function

Convert your current `schema.prisma` file in runtime with `convertSchemaToObject` function

**CONTENT**

- [Install](#install)
- [Convert to file](#convert-to-file)
- [Convert to Camel case](#convert-to-camel-case)
- [convertSchemaToObject](#convertschematoobject)
- [Schema Type](#schema-type)

</MdxCard>
<MdxCard>

## Install

```shell
npm i @prisma-tools/schema
or
yarn add @prisma-tools/schema
```

</MdxCard>
<MdxCard>

## Convert to file

Convert your `schema.prisma` file into `JavaScript`, `TypeScript` and `Json` files.

**options**

```
-h, --help                 show CLI help
-o, --output-path=output-path  [default: prisma/] folder path for converted file
-p, --path=path                [default: prisma/] Add your schema.prisma file folder
-t, --type=(js|ts|json)        [default: ts] type of output file type when you convert to json
-v, --version              show CLI version
```

**Run**

```shell
npx schema json
```

**Example**

<Tabs>
<Tab title="schema.prisma">

```prisma
model User {
  id        Int       @default(autoincrement()) @id
  createdAt DateTime  @default(now())
  email     String    @unique
  name      String?
  password  String
  // field comment
  posts     Post[]
  group     Group?    @relation(fields: [groupId], references: [id])
  groupId   Int?
  // field comment
  comments  Comment[]
  // some model comments
  // another model comments
}
```

</Tab>
<Tab title="schema.ts">

```ts
import { SchemaObject } from '@prisma-tools/schema';

export const schema: SchemaObject = {
  models: [
    {
      name: 'User',
      fields: [
        {
          name: 'id',
          type: 'Int',
          isId: true,
          unique: false,
          list: false,
          required: true,
          kind: 'scalar',
          documentation: '',
          relationField: false,
        },
        {
          name: 'createdAt',
          type: 'DateTime',
          isId: false,
          unique: false,
          list: false,
          required: true,
          kind: 'scalar',
          documentation: '',
          relationField: false,
        },
        {
          name: 'email',
          type: 'String',
          isId: false,
          unique: true,
          list: false,
          required: true,
          kind: 'scalar',
          documentation: '',
          relationField: false,
        },
        {
          name: 'name',
          type: 'String',
          isId: false,
          unique: false,
          list: false,
          required: false,
          kind: 'scalar',
          documentation: '',
          relationField: false,
        },
        {
          name: 'password',
          type: 'String',
          isId: false,
          unique: false,
          list: false,
          required: true,
          kind: 'scalar',
          documentation: '',
          relationField: false,
        },
        {
          name: 'posts',
          type: 'Post',
          isId: false,
          unique: false,
          list: true,
          required: false,
          kind: 'scalar',
          documentation: '// field comment',
          relationField: false,
        },
        {
          name: 'group',
          type: 'Group',
          isId: false,
          unique: false,
          list: false,
          required: false,
          kind: 'scalar',
          documentation: '',
          relationField: false,
        },
        {
          name: 'groupId',
          type: 'Int',
          isId: false,
          unique: false,
          list: false,
          required: false,
          kind: 'scalar',
          documentation: '',
          relationField: false,
        },
        {
          name: 'comments',
          type: 'Comment',
          isId: false,
          unique: false,
          list: true,
          required: false,
          kind: 'scalar',
          documentation: '// field comment',
          relationField: false,
        },
      ],
      documentation: '// some model comments\n// another model comments',
    },
  ],
  enums: [],
};
```

</Tab>
<Tab title="schema.js">

```js
export default {
  models: [
    {
      name: 'User',
      fields: [
        {
          name: 'id',
          type: 'Int',
          isId: true,
          unique: false,
          list: false,
          required: true,
          kind: 'scalar',
          documentation: '',
          relationField: false,
        },
        {
          name: 'createdAt',
          type: 'DateTime',
          isId: false,
          unique: false,
          list: false,
          required: true,
          kind: 'scalar',
          documentation: '',
          relationField: false,
        },
        {
          name: 'email',
          type: 'String',
          isId: false,
          unique: true,
          list: false,
          required: true,
          kind: 'scalar',
          documentation: '',
          relationField: false,
        },
        {
          name: 'name',
          type: 'String',
          isId: false,
          unique: false,
          list: false,
          required: false,
          kind: 'scalar',
          documentation: '',
          relationField: false,
        },
        {
          name: 'password',
          type: 'String',
          isId: false,
          unique: false,
          list: false,
          required: true,
          kind: 'scalar',
          documentation: '',
          relationField: false,
        },
        {
          name: 'posts',
          type: 'Post',
          isId: false,
          unique: false,
          list: true,
          required: false,
          kind: 'scalar',
          documentation: '// field comment',
          relationField: false,
        },
        {
          name: 'group',
          type: 'Group',
          isId: false,
          unique: false,
          list: false,
          required: false,
          kind: 'scalar',
          documentation: '',
          relationField: false,
        },
        {
          name: 'groupId',
          type: 'Int',
          isId: false,
          unique: false,
          list: false,
          required: false,
          kind: 'scalar',
          documentation: '',
          relationField: false,
        },
        {
          name: 'comments',
          type: 'Comment',
          isId: false,
          unique: false,
          list: true,
          required: false,
          kind: 'scalar',
          documentation: '// field comment',
          relationField: false,
        },
      ],
      documentation: '// some model comments\n// another model comments',
    },
  ],
  enums: [],
};
```

</Tab>
<Tab title="schema.json">

```json
{
  "models": [
    {
      "name": "User",
      "fields": [
        {
          "name": "id",
          "type": "Int",
          "isId": true,
          "unique": false,
          "list": false,
          "required": true,
          "kind": "scalar",
          "documentation": "",
          "relationField": false
        },
        {
          "name": "createdAt",
          "type": "DateTime",
          "isId": false,
          "unique": false,
          "list": false,
          "required": true,
          "kind": "scalar",
          "documentation": "",
          "relationField": false
        },
        {
          "name": "email",
          "type": "String",
          "isId": false,
          "unique": true,
          "list": false,
          "required": true,
          "kind": "scalar",
          "documentation": "",
          "relationField": false
        },
        {
          "name": "name",
          "type": "String",
          "isId": false,
          "unique": false,
          "list": false,
          "required": false,
          "kind": "scalar",
          "documentation": "",
          "relationField": false
        },
        {
          "name": "password",
          "type": "String",
          "isId": false,
          "unique": false,
          "list": false,
          "required": true,
          "kind": "scalar",
          "documentation": "",
          "relationField": false
        },
        {
          "name": "posts",
          "type": "Post",
          "isId": false,
          "unique": false,
          "list": true,
          "required": false,
          "kind": "scalar",
          "documentation": "// field comment",
          "relationField": false
        },
        {
          "name": "group",
          "type": "Group",
          "isId": false,
          "unique": false,
          "list": false,
          "required": false,
          "kind": "scalar",
          "documentation": "",
          "relationField": false
        },
        {
          "name": "groupId",
          "type": "Int",
          "isId": false,
          "unique": false,
          "list": false,
          "required": false,
          "kind": "scalar",
          "documentation": "",
          "relationField": false
        },
        {
          "name": "comments",
          "type": "Comment",
          "isId": false,
          "unique": false,
          "list": true,
          "required": false,
          "kind": "scalar",
          "documentation": "// field comment",
          "relationField": false
        }
      ],
      "documentation": "// some model comments\n// another model comments"
    }
  ],
  "enums": []
}
```

</Tab>
</Tabs>

</MdxCard>
<MdxCard>

## Convert to Camel case

Most of use after using `Prisma Introspection`.

Convert your `schema.prisma` file from `Snake case` to `Camel case`.

**options**

```
-h, --help                 show CLI help
-p, --path=path            [default: prisma/] Add your schema.prisma file folder
-v, --version              show CLI version
```

**Run**

```shell
npx schema camel-case
```

**Example**

<Tabs>
<Tab title="Snake case">

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id         Int            @default(autoincrement()) @id
  created_at DateTime       @default(now())
  email      String         @unique
  first_name String?
  password   String
  // @onDelete(CASCADE)
  posts      Post[]
  group      Group?         @relation(fields: [group_id], references: [id])
  group_id   Int?
  // @onDelete(SET_NULL)
  comments   post_comment[]
}

model Post {
  id         Int            @default(autoincrement()) @id
  published  Boolean        @default(false)
  title      String
  author     User?          @relation(fields: [author_id], references: [id])
  author_id  Int?
  // @onDelete(CASCADE)
  comments   post_comment[]
  created_at DateTime       @default(now())
  updated_at DateTime       @updatedAt
}

model post_comment {
  id         Int      @default(autoincrement()) @id
  contain    String
  post       Post     @relation(fields: [post_id], references: [id])
  post_id    Int
  author     User?    @relation(fields: [author_id], references: [id])
  author_id  Int?
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}

model Group {
  id         Int      @default(autoincrement()) @id
  name       String
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
  // @onDelete(SET_NULL)
  users      User[]
}
```

</Tab>
<Tab title="Camel case">

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int           @default(autoincrement()) @id
  createdAt DateTime      @default(now()) @map("created_at")
  email     String        @unique
  firstName String?       @map("first_name")
  password  String
  // @onDelete(CASCADE)
  posts     Post[]
  group     Group?        @relation(fields: [groupId], references: [id])
  groupId   Int?          @map("group_id")
  // @onDelete(SET_NULL)
  comments  PostComment[]
}

model Post {
  id        Int           @default(autoincrement()) @id
  published Boolean       @default(false)
  title     String
  author    User?         @relation(fields: [authorId], references: [id])
  authorId  Int?          @map("author_id")
  // @onDelete(CASCADE)
  comments  PostComment[]
  createdAt DateTime      @default(now()) @map("created_at")
  updatedAt DateTime      @updatedAt @map("updated_at")
}

model PostComment {
  @@map("post_comment")
  id        Int      @default(autoincrement()) @id
  contain   String
  post      Post     @relation(fields: [postId], references: [id])
  postId    Int      @map("post_id")
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?     @map("author_id")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
}

model Group {
  id        Int      @default(autoincrement()) @id
  name      String
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  // @onDelete(SET_NULL)
  users     User[]
}
```

</Tab>
</Tabs>

</MdxCard>
<MdxCard>

## convertSchemaToObject

Convert your current `schema.prisma` file in runtime

```ts
import { convertSchemaToObject } from '@prisma-tools/schema';

const schemaObject = convertSchemaToObject(path);
```

</MdxCard>
<MdxCard>

## Schema Type

You can import this types from our tool

```ts
import { SchemaObject, Model, Enums, Field } from '@prisma-tools/schema';
```

```ts
export interface Model {
  name: string;
  documentation?: string;
  map?: string;
  fields: Field[];
}

export interface Enums {
  name: string;
  fields: string[];
}

export interface Field {
  name: string;
  type: string;
  list: boolean;
  required: boolean;
  isId: boolean;
  unique: boolean;
  kind: 'object' | 'enum' | 'scalar';
  map?: string;
  relationField?: boolean;
  documentation?: string;
  relation?: { name?: string; fields?: string[]; references?: string[] };
}

export type SchemaObject = { models: Model[]; enums: Enums[] };
```

</MdxCard>
