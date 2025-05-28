# @paljs/nexus

A Nexus plugin that provides Prisma integration with automatic field selection, admin schema generation, and GraphQL scalar types. This package bridges Prisma and Nexus GraphQL to create type-safe, efficient GraphQL APIs.

## Installation

```bash
npm install @paljs/nexus
# or
yarn add @paljs/nexus
# or
pnpm add @paljs/nexus
```

## Peer Dependencies

This package requires the following peer dependencies:

- `@prisma/client` ^6
- `graphql` ^15 || ^16
- `nexus` ^1

## Features

- 🔍 **Automatic Field Selection** - Optimizes Prisma queries based on GraphQL selection
- 🛡️ **Type Safety** - Full TypeScript support with Nexus integration
- 📊 **Admin Schema** - Auto-generated admin queries and mutations
- 🎯 **Custom Scalars** - Built-in GraphQL scalar types for Prisma
- ⚡ **Performance** - Efficient query optimization and caching
- 🔧 **Configurable** - Extensive customization options

## Main Exports

### paljs Plugin

The main Nexus plugin that provides Prisma integration and field selection.

```typescript
import { makeSchema } from 'nexus';
import { paljs } from '@paljs/nexus';

const schema = makeSchema({
  types: [
    // Your types here
  ],
  plugins: [
    paljs({
      // Plugin configuration
      includeAdmin: true,
      adminSchemaPath: './prisma/schema.prisma',
      excludeScalar: ['Upload'],
      prismaSelectOptions: {
        defaultFields: {
          User: { id: true, email: true },
        },
        excludeFields: {
          User: ['password'],
        },
      },
    }),
  ],
});
```

### Settings Interface

Configuration interface for the paljs plugin.

```typescript
interface Settings<
  ModelName extends string = '',
  ModelsObject extends Record<ModelName, Record<string, any>> = Record<ModelName, Record<string, any>>,
> {
  // Include admin queries and mutations
  includeAdmin?: boolean;

  // Path to Prisma schema file for admin generation
  adminSchemaPath?: string;

  // Scalar types to exclude from generation
  excludeScalar?: string[];

  // PrismaSelect configuration options
  prismaSelectOptions?: PrismaSelectOptions<ModelName, ModelsObject>;
}
```

## Core Functionality

### Automatic Field Selection

The plugin automatically adds a `select` object to your GraphQL context based on the fields requested in the query.

```typescript
import { queryType } from 'nexus';

export const Query = queryType({
  definition(t) {
    t.list.field('users', {
      type: 'User',
      resolve: async (_, args, { prisma, select }) => {
        // select is automatically generated based on GraphQL query
        return prisma.user.findMany({
          ...args,
          ...select, // Optimized field selection
        });
      },
    });
  },
});
```

### Admin Schema Generation

When `includeAdmin` is enabled, the plugin automatically generates admin queries and mutations:

```typescript
// Auto-generated admin queries
query {
  findFirstUser(where: { ... }, orderBy: { ... })
  findManyUser(where: { ... }, orderBy: { ... }, skip: 10, take: 20)
  findUniqueUser(where: { id: 1 })
  aggregateUser(_count: true, _avg: { age: true })
}

// Auto-generated admin mutations
mutation {
  createOneUser(data: { ... })
  updateOneUser(where: { id: 1 }, data: { ... })
  deleteOneUser(where: { id: 1 })
  upsertOneUser(where: { id: 1 }, create: { ... }, update: { ... })
}
```

### Built-in Scalar Types

The plugin includes common GraphQL scalar types for Prisma:

```typescript
// Available scalar types:
-DateTime - Json - Decimal - BigInt - Bytes;
```

## Configuration Options

### Basic Configuration

```typescript
import { paljs } from '@paljs/nexus';

const plugin = paljs({
  includeAdmin: true,
  adminSchemaPath: './prisma/schema.prisma',
});
```

### Advanced Configuration

```typescript
import { paljs } from '@paljs/nexus';

const plugin = paljs({
  includeAdmin: true,
  adminSchemaPath: './prisma/schema.prisma',
  excludeScalar: ['Upload', 'File'],
  prismaSelectOptions: {
    // Default fields to always include
    defaultFields: {
      User: { id: true, email: true, createdAt: true },
      Post: { id: true, title: true, published: true },
      // Function-based default fields
      Comment: (select) => (select.author ? { authorId: true } : {}),
    },

    // Fields to always exclude
    excludeFields: {
      User: ['password', 'hash', 'salt'],
      Post: ['internalNotes'],
      // Function-based exclusion
      Session: (select) => (select.user ? ['token'] : []),
    },

    // Multiple DMMF documents for multi-schema support
    dmmf: [Prisma.dmmf, Prisma2.dmmf],
  },
});
```

## Usage Examples

### Basic Setup

```typescript
import { makeSchema, objectType, queryType } from 'nexus';
import { paljs } from '@paljs/nexus';

// Define your types
const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('email');
    t.string('name');
    t.list.field('posts', {
      type: 'Post',
      resolve: (parent, _, { prisma, select }) => prisma.user.findUnique({ where: { id: parent.id } }).posts(select),
    });
  },
});

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('title');
    t.string('content');
    t.field('author', {
      type: 'User',
      resolve: (parent, _, { prisma, select }) => prisma.post.findUnique({ where: { id: parent.id } }).author(select),
    });
  },
});

// Define queries
const Query = queryType({
  definition(t) {
    t.list.field('users', {
      type: 'User',
      resolve: (_, __, { prisma, select }) => prisma.user.findMany(select),
    });

    t.field('user', {
      type: 'User',
      args: { id: nonNull(intArg()) },
      resolve: (_, { id }, { prisma, select }) => prisma.user.findUnique({ where: { id }, ...select }),
    });
  },
});

// Create schema with paljs plugin
const schema = makeSchema({
  types: [User, Post, Query],
  plugins: [
    paljs({
      includeAdmin: true,
      adminSchemaPath: './prisma/schema.prisma',
    }),
  ],
});
```

### Custom Scalar Usage

```typescript
import { objectType } from 'nexus';

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('email');
    t.field('createdAt', { type: 'DateTime' }); // Built-in DateTime scalar
    t.field('metadata', { type: 'Json' }); // Built-in Json scalar
    t.field('balance', { type: 'Decimal' }); // Built-in Decimal scalar
  },
});
```

### Multi-Schema Support

```typescript
import { Prisma as UserPrisma } from './generated/user-client';
import { Prisma as BlogPrisma } from './generated/blog-client';

const plugin = paljs({
  includeAdmin: true,
  prismaSelectOptions: {
    dmmf: [UserPrisma.dmmf, BlogPrisma.dmmf],
    defaultFields: {
      User: { id: true, email: true },
      Post: { id: true, title: true },
    },
  },
});
```

### Conditional Field Selection

```typescript
const plugin = paljs({
  prismaSelectOptions: {
    defaultFields: {
      // Always include these fields
      User: { id: true, email: true },

      // Conditional fields based on selection
      Profile: (select) => {
        const base = { id: true };
        if (select.user) {
          return { ...base, userId: true };
        }
        return base;
      },
    },

    excludeFields: {
      // Always exclude sensitive fields
      User: ['password', 'hash'],

      // Conditional exclusion
      Session: (select) => {
        const excluded = ['token'];
        if (!select.user) {
          excluded.push('userId');
        }
        return excluded;
      },
    },
  },
});
```

## Integration with Apollo Server

```typescript
import { ApolloServer } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    prisma,
    // select will be automatically added by paljs plugin
  }),
});
```

## Performance Benefits

### Query Optimization

The plugin automatically optimizes Prisma queries by selecting only the fields requested in the GraphQL query:

```graphql
# GraphQL Query
query {
  users {
    id
    email
    posts {
      title
    }
  }
}
```

```typescript
// Generated Prisma query
prisma.user.findMany({
  select: {
    id: true,
    email: true,
    posts: {
      select: {
        title: true,
      },
    },
  },
});
```

### Relation Loading

Efficiently loads related data based on GraphQL selection:

```typescript
// Only loads user data if requested in GraphQL query
const posts = await prisma.post.findMany({
  select: {
    id: true,
    title: true,
    author: select.author
      ? {
          select: {
            id: true,
            name: true,
          },
        }
      : false,
  },
});
```

## Error Handling

```typescript
import { paljs } from '@paljs/nexus';

try {
  const plugin = paljs({
    includeAdmin: true,
    adminSchemaPath: './prisma/schema.prisma',
  });
} catch (error) {
  console.error('Failed to initialize paljs plugin:', error.message);
}
```

## TypeScript Support

This package provides full TypeScript support with proper type inference:

```typescript
import type { Settings } from '@paljs/nexus';

const settings: Settings<
  'User' | 'Post',
  {
    User: { id: number; email: string; name?: string };
    Post: { id: number; title: string; content?: string };
  }
> = {
  includeAdmin: true,
  prismaSelectOptions: {
    defaultFields: {
      User: { id: true, email: true }, // Type-safe field selection
      Post: { id: true, title: true },
    },
  },
};
```

## Contributing

This package is part of the PalJS ecosystem. For contributing guidelines, please refer to the main repository.

## License

MIT License - see the LICENSE file for details.
