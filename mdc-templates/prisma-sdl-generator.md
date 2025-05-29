# Prisma SDL GraphQL Generator Instructions

Generate GraphQL Schema Definition Language (SDL) files and corresponding resolvers for Prisma models. Creates complete GraphQL schemas with type definitions and resolver implementations.

## Configuration Options

- `prismaName`: Name of the Prisma client instance (default: "prisma")
- `output`: Output directory path (default: "./src/graphql")
- `javaScript`: Generate JavaScript instead of TypeScript (default: false)
- `excludeFields`: Array of field names to exclude from all models
- `excludeModels`: Array of model configurations with selective exclusions
- `excludeFieldsByModel`: Object mapping model names to arrays of fields to exclude
- `excludeQueriesAndMutations`: Array of operation names to exclude globally
- `excludeQueriesAndMutationsByModel`: Object mapping model names to arrays of operations to exclude
- `excludeInputFields`: Array of input field names to exclude
- `disableQueries`: Boolean to disable all query generation
- `disableMutations`: Boolean to disable all mutation generation

## File Structure Generation

```
src/graphql/
├── resolvers.ts         # Main resolver exports
├── typeDefs.ts          # Main type definition exports
├── resolversTypes.ts    # Generated TypeScript types
├── InputTypes.ts        # Input types and enums SDL
└── {ModelName}/
    ├── resolvers.ts     # Model-specific resolvers
    └── typeDefs.ts      # Model-specific type definitions
```

## Type Definition Generation

Generate SDL type definitions for each Prisma model:

```graphql
"""
{Model documentation from Prisma schema}
"""
type {ModelName} {
  """
  {Field documentation from Prisma schema}
  """
  {fieldName}: {FieldType}{nullabilityModifier}
  
  """
  {Field with arguments documentation}
  """
  {fieldWithArgs}(
    {argName}: {ArgType}
  ): {ReturnType}{nullabilityModifier}
}
```

### Type Definition Rules

1. **Field Types**: Map Prisma types to GraphQL types
   - `String` → `String`
   - `Int` → `Int`
   - `Boolean` → `Boolean`
   - `Float` → `Float`
   - `DateTime` → `DateTime`
   - Relations → `{RelatedModelName}`

2. **Nullability Modifiers**:
   - Required: `!`
   - Optional: no modifier
   - Required list: `[{Type}!]!`
   - Optional list: `[{Type}]`

3. **Field Arguments**: Include field-level arguments with proper types

4. **Documentation**: Include triple-quoted descriptions from Prisma schema

5. **Field Exclusion**: Skip fields in `excludeFields` and `excludeFieldsByModel[modelName]`

## Query Type Generation

Generate query operations in SDL:

```graphql
type Query {
  findUnique{ModelName}(where: {ModelName}WhereUniqueInput!): {ModelName}
  
  findMany{ModelName}(
    where: {ModelName}WhereInput
    orderBy: [{ModelName}OrderByWithRelationInput!]
    cursor: {ModelName}WhereUniqueInput
    take: Int
    skip: Int
    distinct: [{ModelName}ScalarFieldEnum!]
  ): [{ModelName}!]!
  
  findMany{ModelName}Count(
    where: {ModelName}WhereInput
    orderBy: [{ModelName}OrderByWithRelationInput!]
    cursor: {ModelName}WhereUniqueInput
    take: Int
    skip: Int
    distinct: [{ModelName}ScalarFieldEnum!]
  ): Int!
  
  findFirst{ModelName}(
    where: {ModelName}WhereInput
    orderBy: [{ModelName}OrderByWithRelationInput!]
    cursor: {ModelName}WhereUniqueInput
    take: Int
    skip: Int
    distinct: [{ModelName}ScalarFieldEnum!]
  ): {ModelName}
  
  aggregate{ModelName}(
    where: {ModelName}WhereInput
    orderBy: [{ModelName}OrderByWithRelationInput!]
    cursor: {ModelName}WhereUniqueInput
    take: Int
    skip: Int
  ): Aggregate{ModelName}
}
```

## Mutation Type Generation

Generate mutation operations in SDL:

```graphql
type Mutation {
  createOne{ModelName}(data: {ModelName}CreateInput!): {ModelName}!
  
  updateOne{ModelName}(
    where: {ModelName}WhereUniqueInput!
    data: {ModelName}UpdateInput!
  ): {ModelName}!
  
  deleteOne{ModelName}(where: {ModelName}WhereUniqueInput!): {ModelName}
  
  upsertOne{ModelName}(
    where: {ModelName}WhereUniqueInput!
    create: {ModelName}CreateInput!
    update: {ModelName}UpdateInput!
  ): {ModelName}!
  
  deleteMany{ModelName}(where: {ModelName}WhereInput): BatchPayload!
  
  updateMany{ModelName}(
    where: {ModelName}WhereInput
    data: {ModelName}UpdateManyMutationInput!
  ): BatchPayload!
}
```

## Resolver Generation

### TypeScript Resolvers

```typescript
import { Resolvers } from '../../resolversTypes';

const resolvers: Resolvers = {
  Query: {
    findUnique{ModelName}: (_parent, { where }, { {prismaName} }) => {
      return {prismaName}.{modelLower}.findUnique({ where });
    },
    
    findMany{ModelName}: (_parent, args, { {prismaName} }) => {
      return {prismaName}.{modelLower}.findMany(args);
    },
    
    findMany{ModelName}Count: (_parent, args, { {prismaName} }) => {
      return {prismaName}.{modelLower}.count(args);
    },
  },
  
  Mutation: {
    createOne{ModelName}: (_parent, { data }, { {prismaName} }) => {
      return {prismaName}.{modelLower}.create({ data });
    },
    
    updateOne{ModelName}: (_parent, { where, data }, { {prismaName} }) => {
      return {prismaName}.{modelLower}.update({ where, data });
    },
    
    deleteOne{ModelName}: (_parent, { where }, { {prismaName} }) => {
      return {prismaName}.{modelLower}.delete({ where });
    },
  },
};

export default resolvers;
```

### JavaScript Resolvers

```javascript
const {ModelName} = {
  Query: {
    findUnique{ModelName}: (_parent, { where }, { {prismaName} }) => {
      return {prismaName}.{modelLower}.findUnique({ where });
    },
    
    findMany{ModelName}: (_parent, args, { {prismaName} }) => {
      return {prismaName}.{modelLower}.findMany(args);
    },
  },
  
  Mutation: {
    createOne{ModelName}: (_parent, { data }, { {prismaName} }) => {
      return {prismaName}.{modelLower}.create({ data });
    },
  },
};

module.exports = { {ModelName} };
```

## Input Types and Enums Generation

Generate comprehensive SDL input types:

```graphql
scalar DateTime

type BatchPayload {
  count: Int!
}

enum {EnumName} {
  {VALUE1}
  {VALUE2}
}

input {ModelName}WhereInput {
  AND: [{ModelName}WhereInput!]
  OR: [{ModelName}WhereInput!]
  NOT: [{ModelName}WhereInput!]
  {fieldName}: {FieldInputType}
}

input {ModelName}CreateInput {
  {fieldName}: {FieldInputType}
}

input {ModelName}UpdateInput {
  {fieldName}: {FieldUpdateInputType}
}

input {ModelName}WhereUniqueInput {
  {uniqueField}: {FieldType}
}

input {ModelName}OrderByWithRelationInput {
  {fieldName}: SortOrder
}
```

## TypeDefs File Structure

### TypeScript TypeDefs

```typescript
import gql from 'graphql-tag';

export default gql`
  # Generated SDL content
  ${sdlContent}
`;
```

### JavaScript TypeDefs

```javascript
const { default: gql } = require('graphql-tag');

const {ModelName} = gql`
  # Generated SDL content
  ${sdlContent}
`;

module.exports = { {ModelName} };
```

## Master Index Files

### Resolvers Index (TypeScript)

```typescript
import {Model1} from './{Model1}/resolvers';
import {Model2} from './{Model2}/resolvers';
import InputTypes from './InputTypes';

export default [
  {Model1},
  {Model2},
  InputTypes,
];
```

### TypeDefs Index (TypeScript)

```typescript
import {Model1} from './{Model1}/typeDefs';
import {Model2} from './{Model2}/typeDefs';
import InputTypes from './InputTypes';

export default [
  {Model1},
  {Model2},
  InputTypes,
];
```

## TypeScript Types Generation

Generate resolver types file:

```typescript
import { GraphQLResolveInfo } from 'graphql';

export type Resolvers = {
  Query?: {
    findUnique{ModelName}?: (
      parent: any,
      args: { where: {ModelName}WhereUniqueInput },
      context: any,
      info: GraphQLResolveInfo
    ) => {ModelName} | Promise<{ModelName}>;
  };
  
  Mutation?: {
    createOne{ModelName}?: (
      parent: any,
      args: { data: {ModelName}CreateInput },
      context: any,
      info: GraphQLResolveInfo
    ) => {ModelName} | Promise<{ModelName}>;
  };
};
```

## Operation Filtering

Apply the same filtering logic as other generators:

1. Check `excludeQueriesAndMutations` for global exclusions
2. Check `excludeQueriesAndMutationsByModel[modelName]` for model-specific exclusions
3. Respect `disableQueries` and `disableMutations` flags
4. Skip excluded operations from both SDL and resolvers

## Documentation Integration

- Include model documentation as type descriptions
- Include field documentation as field descriptions
- Support `@omit` directive to skip field generation
- Preserve JSDoc-style comments in generated resolvers

## Context Requirements

All resolvers expect this context structure:
- `{prismaName}`: Prisma client instance
- Additional context properties as needed by the application 