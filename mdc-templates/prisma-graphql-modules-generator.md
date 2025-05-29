# Prisma GraphQL Modules Generator Instructions

Generate GraphQL Modules based schema and resolvers for Prisma models. Creates modular GraphQL applications using the GraphQL Modules framework with proper dependency injection and module separation.

## Configuration Options

- `prismaName`: Name of the Prisma client instance (default: "prisma")
- `output`: Output directory path (default: "./src/app")
- `excludeFields`: Array of field names to exclude from all models
- `excludeModels`: Array of model configurations with selective exclusions
- `excludeFieldsByModel`: Object mapping model names to arrays of fields to exclude
- `excludeQueriesAndMutations`: Array of operation names to exclude globally
- `excludeQueriesAndMutationsByModel`: Object mapping model names to arrays of operations to exclude
- `disableQueries`: Boolean to disable all query generation
- `disableMutations`: Boolean to disable all mutation generation

## File Structure Generation

```
src/app/
├── application.ts       # Main application module
├── inputs/
│   └── InputTypes.ts   # Input types and enums
└── {ModelName}/
    ├── {ModelName}.module.ts  # Module definition
    ├── typeDefs.ts           # Type definitions
    └── resolvers.ts          # Resolvers
```

## Module Generation

Generate GraphQL Modules for each Prisma model:

### Module Definition
```typescript
import { createModule } from 'graphql-modules';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

export const {ModelName}Module = createModule({
  id: '{ModelName}',
  typeDefs,
  resolvers,
});
```

### Type Definitions
```typescript
import { gql } from 'graphql-modules';

export default gql`
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

  {extend types for relations}
  extend type {RelatedModelName} {
    {relationFieldName}: [{ModelName}!]!
  }

  {queries and mutations - same as SDL generator}
  extend type Query {
    findUnique{ModelName}(where: {ModelName}WhereUniqueInput!): {ModelName}
    findMany{ModelName}(
      where: {ModelName}WhereInput
      orderBy: [{ModelName}OrderByWithRelationInput!]
      cursor: {ModelName}WhereUniqueInput
      take: Int
      skip: Int
    ): [{ModelName}!]!
  }

  extend type Mutation {
    createOne{ModelName}(data: {ModelName}CreateInput!): {ModelName}!
    updateOne{ModelName}(
      where: {ModelName}WhereUniqueInput!
      data: {ModelName}UpdateInput!
    ): {ModelName}!
  }
`;
```

### Resolvers
```typescript
import { PrismaProvider } from '../Prisma.provider';

export default {
  Query: {
    findUnique{ModelName}: (_parent: any, { where }: any, { injector }: any) => {
      return injector.get(PrismaProvider).{modelLower}.findUnique({ where });
    },
    
    findMany{ModelName}: (_parent: any, args: any, { injector }: any) => {
      return injector.get(PrismaProvider).{modelLower}.findMany(args);
    },
    
    findMany{ModelName}Count: (_parent: any, args: any, { injector }: any) => {
      return injector.get(PrismaProvider).{modelLower}.count(args);
    },
  },
  
  Mutation: {
    createOne{ModelName}: (_parent: any, { data }: any, { injector }: any) => {
      return injector.get(PrismaProvider).{modelLower}.create({ data });
    },
    
    updateOne{ModelName}: (_parent: any, { where, data }: any, { injector }: any) => {
      return injector.get(PrismaProvider).{modelLower}.update({ where, data });
    },
    
    deleteOne{ModelName}: (_parent: any, { where }: any, { injector }: any) => {
      return injector.get(PrismaProvider).{modelLower}.delete({ where });
    },
  },
};
```

## Type Definition Rules

### 1. **Model Types**
Generate main model types with all scalar and relation fields:
- Include field documentation from Prisma schema
- Apply field exclusion rules
- Handle field arguments properly
- Use proper nullability modifiers

### 2. **Relation Extensions**
For each relation field, generate extend type definitions in the related model:
```graphql
extend type {RelatedModel} {
  {relationField}: [{CurrentModel}!]!
}
```

### 3. **Query/Mutation Extensions**
Use `extend type` for Query and Mutation to support modular composition:
```graphql
extend type Query {
  # Model-specific queries
}

extend type Mutation {
  # Model-specific mutations
}
```

## Field Generation Rules

1. **Scalar Fields**: Direct mapping with proper nullability
2. **Relation Fields**: Only include in the owning model's type definition
3. **Computed Fields**: Include field arguments if present
4. **Documentation**: Preserve JSDoc comments from Prisma schema
5. **Field Exclusion**: Apply global and model-specific exclusions

## Application Module Generation

### Main Application File
```typescript
import { createApplication } from 'graphql-modules';
import { {Model1}Module } from './{Model1}/{Model1}.module';
import { {Model2}Module } from './{Model2}/{Model2}.module';

export const application = createApplication({
  modules: [
    {Model1}Module,
    {Model2}Module,
  ],
});

export const schema = application.createSchemaForApollo();
```

### Module Registration
- Automatically import and register all model modules
- Maintain proper module dependencies
- Update existing application file if it exists
- Preserve custom modules that aren't generated

## Prisma Provider Integration

### Provider Pattern
All resolvers use dependency injection through the GraphQL Modules injector:

```typescript
// In resolver functions
const prisma = injector.get(PrismaProvider);
return prisma.{modelLower}.{operation}(args);
```

### Expected Provider Structure
```typescript
import { Injectable } from 'graphql-modules';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaProvider extends PrismaClient {
  constructor() {
    super();
  }
}
```

## Input Types Generation

### Separate Input Module
Generate a dedicated inputs module:

```typescript
import { gql } from 'graphql-modules';

export default gql`
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
`;
```

## Operation Generation

Generate the same CRUD operations as other generators:

### Queries (if not disabled)
- `findUnique{ModelName}`
- `findMany{ModelName}`
- `findMany{ModelName}Count`
- `findFirst{ModelName}`
- `aggregate{ModelName}`

### Mutations (if not disabled)
- `createOne{ModelName}`
- `updateOne{ModelName}`
- `deleteOne{ModelName}`
- `upsertOne{ModelName}`
- `deleteMany{ModelName}`
- `updateMany{ModelName}`

## Module Dependencies

### GraphQL Modules Features
- Use `createModule` for module definition
- Import `gql` from 'graphql-modules'
- Support dependency injection through injector
- Enable module composition and reusability

### Application Composition
- Automatically compose all model modules
- Support for extending existing application
- Proper module dependency resolution
- Schema generation for Apollo Server

## Error Handling

- Validate module names and imports
- Handle missing model dependencies
- Ensure proper TypeScript imports
- Validate GraphQL syntax in type definitions

## Formatting Rules

Format all generated files with Prettier:
- Use `babel-ts` parser for TypeScript files
- Use `graphql` parser for GraphQL type definitions
- Maintain consistent indentation and style
- Preserve comment formatting

## Integration Requirements

This generator assumes:
- GraphQL Modules framework is installed
- PrismaProvider is available for dependency injection
- Apollo Server integration for schema execution
- Proper module registration in the application 