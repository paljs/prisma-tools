# Example Usage: Converting PalJS Generators to MDC Templates

This example demonstrates how to use the MDC templates to generate code for a sample blog application with User, Post, and Comment models.

## Sample Prisma Schema

```prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

/// User model for blog authors and commenters
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  /// Profile image URL
  avatar    String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  posts     Post[]
  comments  Comment[]
  
  @@map("users")
}

/// Blog post model
model Post {
  id          String   @id @default(uuid())
  title       String
  content     String?
  /// Whether the post is published
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  authorId    String
  author      User      @relation(fields: [authorId], references: [id])
  comments    Comment[]
  
  @@map("posts")
}

/// Comment on blog posts
model Comment {
  id        String   @id @default(uuid())
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  postId    String
  post      Post     @relation(fields: [postId], references: [id])
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  
  @@map("comments")
}

enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

## Example 1: Generating GraphQL Operations

**Scenario**: You need client-side GraphQL operations for your blog frontend.

**AI Prompt**:
```
I need to generate GraphQL fragments, queries, and mutations for my blog application using the PalJS patterns.

Please follow the Prisma GraphQL Generator template with this configuration:
- Output directory: src/graphql/operations
- Exclude fields: ["createdAt", "updatedAt"]
- Models to generate: ["User", "Post", "Comment"]
- Exclude mutations: ["deleteMany", "updateMany"] for all models

Here's my Prisma schema:
[paste the schema above]

Generate the .graphql files following the template patterns.
```

**Expected Output Structure**:
```
src/graphql/operations/
├── User.graphql
├── Post.graphql
└── Comment.graphql
```

**Sample Generated File (User.graphql)**:
```graphql
fragment UserFields on User {
  id
  email
  name
  avatar
}

fragment User on User {
  ...UserFields
}

query findUniqueUser($where: UserWhereUniqueInput!) {
  findUniqueUser(where: $where) {
    ...User
  }
}

query findManyUser(
  $where: UserWhereInput
  $orderBy: [UserOrderByWithRelationInput!]
  $cursor: UserWhereUniqueInput
  $skip: Int
  $take: Int
) {
  findManyUser(
    where: $where
    orderBy: $orderBy
    cursor: $cursor
    skip: $skip
    take: $take
  ) {
    ...User
  }
}

mutation createOneUser($data: UserCreateInput!) {
  createOneUser(data: $data) {
    ...User
  }
}

mutation updateOneUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
  updateOneUser(where: $where, data: $data) {
    ...User
  }
}

mutation deleteOneUser($where: UserWhereUniqueInput!) {
  deleteOneUser(where: $where) {
    ...User
  }
}
```

## Example 2: Generating Admin Pages

**Scenario**: You need admin interfaces for managing your blog content.

**AI Prompt**:
```
I need to generate React admin pages for my blog models using the PalJS patterns.

Please follow the Prisma Admin Pages Generator template with this configuration:
- Router type: app (Next.js App Router)
- Output directory: src/app/admin/models
- Models to generate: ["User", "Post", "Comment"]

Here's my Prisma schema:
[paste the schema above]

Generate the React components and layout files following the template patterns.
```

**Expected Output Structure**:
```
src/app/admin/
├── layout.tsx
└── models/
    ├── layout.tsx
    ├── User/
    │   └── page.tsx
    ├── Post/
    │   └── page.tsx
    └── Comment/
        └── page.tsx
```

**Sample Generated File (User/page.tsx)**:
```tsx
import React from 'react';
import PrismaTable from 'components/PrismaTable';

export default function UserPage() {
  return <PrismaTable model="User" />;
}
```

## Example 3: Generating Nexus Schema

**Scenario**: You're building a GraphQL API using Nexus.

**AI Prompt**:
```
I need to generate a complete Nexus GraphQL schema for my blog API using the PalJS patterns.

Please follow the Prisma Nexus Generator template with this configuration:
- Output directory: src/graphql
- Prisma client name: prisma
- Exclude fields: ["updatedAt"] globally
- Disable mutations: ["deleteMany"] for Post model only
- Generate TypeScript

Here's my Prisma schema:
[paste the schema above]

Generate the complete Nexus schema structure following the template patterns.
```

**Expected Output Structure**:
```
src/graphql/
├── index.ts
├── InputTypes.ts
├── User/
│   ├── type.ts
│   ├── queries/
│   │   ├── index.ts
│   │   ├── findUnique.ts
│   │   ├── findMany.ts
│   │   └── findCount.ts
│   └── mutations/
│       ├── index.ts
│       ├── createOne.ts
│       ├── updateOne.ts
│       └── deleteOne.ts
├── Post/
│   └── ... (similar structure)
└── Comment/
    └── ... (similar structure)
```

## Example 4: Generating SDL Schema

**Scenario**: You prefer SDL-first GraphQL development.

**AI Prompt**:
```
I need to generate GraphQL SDL type definitions and resolvers for my blog API using the PalJS patterns.

Please follow the Prisma SDL Generator template with this configuration:
- Output directory: src/graphql
- Prisma client name: db
- Exclude queries: ["aggregate"] globally
- Generate TypeScript with resolver types

Here's my Prisma schema:
[paste the schema above]

Generate the complete SDL schema and resolvers following the template patterns.
```

**Expected Output Structure**:
```
src/graphql/
├── resolvers.ts
├── typeDefs.ts
├── resolversTypes.ts
├── InputTypes.ts
├── User/
│   ├── resolvers.ts
│   └── typeDefs.ts
├── Post/
│   ├── resolvers.ts
│   └── typeDefs.ts
└── Comment/
    ├── resolvers.ts
    └── typeDefs.ts
```

## Advanced Configuration Example

**Scenario**: Complex configuration with multiple exclusions and customizations.

**AI Prompt**:
```
I need to generate GraphQL operations with advanced configuration using the PalJS patterns.

Configuration:
- Output directory: src/generated/graphql
- Exclude fields globally: ["createdAt", "updatedAt"]
- Exclude fields for User model only: ["email"] (for privacy)
- Exclude queries for Comment model: ["findMany", "findCount"] (comments are only accessed via posts)
- Exclude mutations globally: ["deleteMany", "updateMany"]
- Disable all mutations for User model (read-only in this context)

Here's my Prisma schema:
[paste the schema above]

Generate following the Prisma GraphQL Generator template.
```

This would generate GraphQL files with:
- No `createdAt` or `updatedAt` fields anywhere
- No `email` field in User fragments
- No `findMany`/`findCount` queries for Comment
- No `deleteMany`/`updateMany` mutations for any model
- No mutations at all for User model

## Benefits Demonstrated

### 1. **Consistency**
All generated code follows the exact same patterns as the original PalJS generators.

### 2. **Flexibility** 
Easy to customize generation for specific use cases without modifying generator code.

### 3. **Maintainability**
Instructions are human-readable and can be modified by developers or AI models.

### 4. **Migration Path**
Existing PalJS users can continue using the same patterns with AI assistance.

### 5. **Documentation Preservation**
Comments and documentation from Prisma schema are preserved in generated code.

## Next Steps

1. **Test with your schema**: Try these templates with your own Prisma models
2. **Customize patterns**: Modify the templates for your specific needs
3. **Combine generators**: Use multiple templates for different parts of your application
4. **Share improvements**: Contribute back any enhancements or patterns you discover 