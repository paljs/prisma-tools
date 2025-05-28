# @paljs/plugins

GraphQL plugins for Prisma that provide automatic field selection optimization and SDL input type generation. This package helps optimize GraphQL queries by automatically selecting only the fields requested in the GraphQL query.

## Installation

```bash
npm install @paljs/plugins
# or
yarn add @paljs/plugins
# or
pnpm add @paljs/plugins
```

## Peer Dependencies

This package requires the following peer dependencies:
- `@prisma/client` ^6
- `graphql` ^15 || ^16

## Features

- 🔍 **Automatic Field Selection** - Optimizes Prisma queries based on GraphQL selection
- 🎯 **Type Safety** - Full TypeScript support with proper type inference
- 📊 **Multi-Schema Support** - Works with multiple Prisma schemas
- 🚀 **Performance** - Reduces database load by selecting only needed fields
- 🔧 **Configurable** - Extensive customization options
- 📝 **SDL Support** - Generate input types for SDL-first GraphQL

## Main Exports

### PrismaSelect

The main class that analyzes GraphQL queries and generates optimized Prisma select objects.

```typescript
import { PrismaSelect } from '@paljs/plugins';

// In your GraphQL resolver
const select = new PrismaSelect(info, {
  defaultFields: {
    User: { id: true, email: true },
  },
  excludeFields: {
    User: ['password'],
  },
}).value;

// Use the optimized select in your Prisma query
const users = await prisma.user.findMany({
  ...args,
  ...select,
});
```

### sdlInputs

Function that generates SDL input types from Prisma DMMF.

```typescript
import { sdlInputs } from '@paljs/plugins';
import { Prisma } from '@prisma/client';

// Generate SDL input types
const inputTypes = sdlInputs(Prisma.dmmf);
console.log(inputTypes); // String containing all SDL input type definitions
```

## PrismaSelect Configuration

### PrismaSelectOptions Interface

```typescript
interface PrismaSelectOptions<
  ModelName extends string,
  ModelsObject extends Record<ModelName, Record<string, any>>
> {
  // Default fields to always include for each model
  defaultFields?: {
    [model in ModelName]?: 
      | { [field in keyof ModelsObject[model]]?: boolean }
      | ((select: any) => { [field in keyof ModelsObject[model]]?: boolean });
  };
  
  // Fields to always exclude for each model
  excludeFields?: {
    [model in ModelName]?: 
      | (keyof ModelsObject[model] | string)[]
      | ((select: any) => (keyof ModelsObject[model] | string)[]);
  };
  
  // Array of DMMF documents for multi-schema support
  dmmf?: Pick<DMMF.Document, 'datamodel'>[];
}
```

## Usage Examples

### Basic Field Selection

```typescript
import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql';

// In your GraphQL resolver
export const resolvers = {
  Query: {
    users: async (parent, args, context, info: GraphQLResolveInfo) => {
      const select = new PrismaSelect(info).value;
      
      return context.prisma.user.findMany({
        ...args,
        ...select, // Automatically optimized field selection
      });
    },
  },
};
```

### With Default Fields

```typescript
const select = new PrismaSelect(info, {
  defaultFields: {
    User: { id: true, email: true, createdAt: true },
    Post: { id: true, title: true, published: true },
  },
}).value;

// Even if the GraphQL query doesn't request id, email, createdAt for User,
// they will be included in the Prisma select
```

### With Field Exclusion

```typescript
const select = new PrismaSelect(info, {
  excludeFields: {
    User: ['password', 'hash', 'salt'],
    Post: ['internalNotes', 'adminComments'],
  },
}).value;

// These fields will never be selected, even if requested in GraphQL
```

### Function-Based Configuration

```typescript
const select = new PrismaSelect(info, {
  defaultFields: {
    User: { id: true, email: true },
    // Function-based default fields
    Profile: (select) => {
      const base = { id: true };
      if (select.user) {
        return { ...base, userId: true };
      }
      return base;
    },
  },
  
  excludeFields: {
    User: ['password'],
    // Function-based exclusion
    Session: (select) => {
      const excluded = ['token'];
      if (!select.user) {
        excluded.push('userId');
      }
      return excluded;
    },
  },
}).value;
```

### Multi-Schema Support

```typescript
import { Prisma as UserPrisma } from './generated/user-client';
import { Prisma as BlogPrisma } from './generated/blog-client';

const select = new PrismaSelect(info, {
  dmmf: [UserPrisma.dmmf, BlogPrisma.dmmf],
  defaultFields: {
    User: { id: true, email: true },
    Post: { id: true, title: true },
  },
}).value;
```

## SDL Input Types Generation

### Basic Usage

```typescript
import { sdlInputs } from '@paljs/plugins';
import { Prisma } from '@prisma/client';

// Generate all SDL input types
const inputTypeDefs = sdlInputs(Prisma.dmmf);

// Use in your SDL schema
const typeDefs = `
  ${inputTypeDefs}
  
  type Query {
    users(where: UserWhereInput, orderBy: UserOrderByInput): [User!]!
  }
  
  type Mutation {
    createUser(data: UserCreateInput!): User!
    updateUser(where: UserWhereUniqueInput!, data: UserUpdateInput!): User
  }
`;
```

### Integration with Apollo Server

```typescript
import { ApolloServer } from 'apollo-server-express';
import { sdlInputs } from '@paljs/plugins';
import { Prisma } from '@prisma/client';

const inputTypes = sdlInputs(Prisma.dmmf);

const typeDefs = `
  ${inputTypes}
  
  type User {
    id: Int!
    email: String!
    name: String
    posts: [Post!]!
  }
  
  type Post {
    id: Int!
    title: String!
    content: String
    author: User!
  }
  
  type Query {
    users(where: UserWhereInput, orderBy: UserOrderByInput): [User!]!
    posts(where: PostWhereInput): [Post!]!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
```

## Advanced Examples

### Complete Resolver with Optimization

```typescript
import { PrismaSelect } from '@paljs/plugins';

export const resolvers = {
  Query: {
    user: async (parent, args, { prisma }, info) => {
      const select = new PrismaSelect(info, {
        defaultFields: {
          User: { id: true },
        },
        excludeFields: {
          User: ['password'],
        },
      }).value;
      
      return prisma.user.findUnique({
        where: args.where,
        ...select,
      });
    },
    
    users: async (parent, args, { prisma }, info) => {
      const select = new PrismaSelect(info).value;
      
      return prisma.user.findMany({
        where: args.where,
        orderBy: args.orderBy,
        skip: args.skip,
        take: args.take,
        ...select,
      });
    },
  },
  
  User: {
    posts: async (parent, args, { prisma }, info) => {
      const select = new PrismaSelect(info).value;
      
      return prisma.user.findUnique({
        where: { id: parent.id },
      }).posts({
        where: args.where,
        ...select,
      });
    },
  },
  
  Post: {
    author: async (parent, args, { prisma }, info) => {
      const select = new PrismaSelect(info, {
        excludeFields: {
          User: ['password'],
        },
      }).value;
      
      return prisma.post.findUnique({
        where: { id: parent.id },
      }).author(select);
    },
  },
};
```

### Conditional Field Selection

```typescript
const select = new PrismaSelect(info, {
  defaultFields: {
    User: (select) => {
      // Always include id
      const fields = { id: true };
      
      // Include email if posts are being queried
      if (select.posts) {
        fields.email = true;
      }
      
      // Include profile data if profile is being queried
      if (select.profile) {
        fields.profileId = true;
      }
      
      return fields;
    },
  },
  
  excludeFields: {
    User: (select) => {
      const excluded = ['password', 'hash'];
      
      // Exclude sensitive data if not admin context
      if (!context.user?.isAdmin) {
        excluded.push('internalNotes', 'adminFlags');
      }
      
      return excluded;
    },
  },
}).value;
```

## Performance Benefits

### Query Optimization Example

```graphql
# GraphQL Query
query {
  users {
    id
    email
    posts {
      title
      comments {
        content
        author {
          name
        }
      }
    }
  }
}
```

```typescript
// Without PrismaSelect (inefficient)
const users = await prisma.user.findMany({
  include: {
    posts: {
      include: {
        comments: {
          include: {
            author: true, // Loads ALL author fields
          },
        },
      },
    },
  },
});

// With PrismaSelect (optimized)
const select = new PrismaSelect(info).value;
const users = await prisma.user.findMany(select);
// Generates:
// {
//   select: {
//     id: true,
//     email: true,
//     posts: {
//       select: {
//         title: true,
//         comments: {
//           select: {
//             content: true,
//             author: {
//               select: {
//                 name: true, // Only loads requested fields
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// }
```

## Error Handling

```typescript
import { PrismaSelect } from '@paljs/plugins';

try {
  const select = new PrismaSelect(info, {
    defaultFields: {
      User: { id: true, email: true },
    },
  }).value;
  
  const result = await prisma.user.findMany(select);
  return result;
} catch (error) {
  console.error('PrismaSelect error:', error.message);
  // Fallback to basic query
  return prisma.user.findMany();
}
```

## TypeScript Support

This package provides full TypeScript support with proper type inference:

```typescript
import type { PrismaSelectOptions } from '@paljs/plugins';

type UserModel = {
  id: number;
  email: string;
  name?: string;
  password: string;
};

type PostModel = {
  id: number;
  title: string;
  content?: string;
  authorId: number;
};

const options: PrismaSelectOptions<'User' | 'Post', {
  User: UserModel;
  Post: PostModel;
}> = {
  defaultFields: {
    User: { id: true, email: true }, // Type-safe field selection
    Post: { id: true, title: true },
  },
  excludeFields: {
    User: ['password'], // Type-safe field exclusion
  },
};
```

## Contributing

This package is part of the PalJS ecosystem. For contributing guidelines, please refer to the main repository.

## License

MIT License - see the LICENSE file for details.
