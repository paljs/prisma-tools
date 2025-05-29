# Prisma Resolver Types Generator Instructions

Generate TypeScript type definitions for GraphQL resolvers based on Prisma schema. Creates comprehensive type safety for resolver functions in SDL-based GraphQL APIs.

## Purpose

This generator creates TypeScript type definitions that provide:
- Type-safe resolver function signatures
- Proper mapping from GraphQL schema types to TypeScript types
- Input/output type definitions for all operations
- Enum type definitions
- Context and argument typing for resolvers

## Configuration Options

- `output`: Output file path (typically "resolversTypes.ts")
- Standard generator options for field/model exclusions

## Generated Type Structure

### Base Type Definitions
```typescript
import * as Client from '@prisma/client';
import { Context } from './context';
import { GraphQLResolveInfo } from 'graphql';
import { GetAggregateResult } from '@prisma/client/runtime/library';

type Resolver<T extends {}, A extends {}, R extends any> = (
  parent: T,
  args: A,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<R>;

type NoExpand<T> = T extends unknown ? T : never;

type AtLeast<O extends object, K extends string> = NoExpand<
  O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never
>;
```

## Type Mapping Rules

### Scalar Type Mapping
Map GraphQL scalars to TypeScript types:
```typescript
const scalarMapping = {
  Int: 'number',
  Float: 'number', 
  String: 'string',
  Boolean: 'boolean',
  DateTime: 'Date',
  Json: 'any',
};
```

### Parent Type Resolution
Determine parent types for resolver functions:

```typescript
function getParentType(typeName: string): string {
  // Root types
  if (['Query', 'Mutation'].includes(typeName)) {
    return '{}';
  }
  
  // Special types
  if (typeName === 'AffectedRowsOutput') {
    return 'Client.Prisma.BatchPayload';
  }
  
  // Model types
  if (isModelType(typeName)) {
    return `Client.${typeName}`;
  }
  
  // CreateMany return types
  if (typeName.startsWith('CreateMany') && typeName.endsWith('AndReturnOutputType')) {
    const innerType = typeName.replace(/^CreateMany|AndReturnOutputType$/g, '');
    return `ReturnType<Client.Prisma.${innerType}Delegate["createManyAndReturn"]>`;
  }
  
  // Default to Prisma types
  return `Client.Prisma.${typeName}`;
}
```

### Output Type Generation
Generate TypeScript types for GraphQL output types:

```typescript
function getOutputType(field: GraphQLField, isInput = false): string {
  switch (field.type.location) {
    case 'scalar':
      const baseType = scalarMapping[field.type.name] || field.type.name;
      return field.type.isList ? `${baseType}[]` : baseType;
      
    default:
      // Handle aggregate types
      if (field.type.name.startsWith('Aggregate')) {
        const modelName = field.type.name.replace('Aggregate', '');
        return `GetAggregateResult<Client.Prisma.$${modelName}Payload, ${field.type.name}Args>`;
      }
      
      // Handle CreateMany return types  
      if (field.type.name.startsWith('CreateMany') && field.type.name.endsWith('AndReturnOutputType')) {
        const innerType = field.type.name.replace(/^CreateMany|AndReturnOutputType$/g, '');
        return `ReturnType<Client.Prisma.${innerType}Delegate["createManyAndReturn"]>`;
      }
      
      // Standard types
      const prefix = isInput ? '' : 'Client.';
      const typeName = field.type.name === 'AffectedRowsOutput' 
        ? 'Prisma.BatchPayload' 
        : isModelType(field.type.name) && !isInput 
          ? field.type.name 
          : `Prisma.${field.type.name}`;
          
      return `${prefix}${typeName}${field.type.isList ? '[]' : ''}`;
  }
}
```

## Resolver Type Generation

### Main Resolvers Interface
```typescript
export type Resolvers = { 
  [key: string]: {[key: string]: Resolver<any, any, any>} 
} & {
  Query?: Query;
  Mutation?: Mutation;
  {ModelName}?: {ModelName};
  // ... other types
};
```

### Type-Specific Resolvers
For each GraphQL type, generate resolver interface:

```typescript
export type {TypeName} = { 
  [key: string]: Resolver<any, any, any> 
} & {
  {fieldName}?: Resolver<
    {ParentType}, 
    {ArgsType}, 
    {ReturnType}{nullabilityModifier}
  >;
  
  // For findMany operations, add count resolver
  {fieldName}Count?: Resolver<{ParentType}, {ArgsType}, number>;
};
```

### Args Type Generation
For operations with arguments, generate args interfaces:

```typescript
export type {TypeName}{FieldName}Args = {
  {argName}{isRequired ? '' : '?'}: {ArgType}{nullabilityModifier};
  // ... other args
};

// Special handling for aggregate operations
export type Aggregate{ModelName}Args = {
  // Standard args
  where?: {ModelName}WhereInput;
  orderBy?: {ModelName}OrderByWithRelationInput[];
  
  // Aggregate-specific args
  {aggregateField}?: Client.Prisma.{ModelName}{AggregateFieldName}AggregateInputType;
};
```

## Input Type Generation

### Standard Input Types
```typescript
export type {InputTypeName} = AtLeast<{
  {fieldName}{isRequired ? '' : '?'}: {FieldType}{nullabilityModifier};
}, {requiredFields}>;
```

### Constraint Handling
For input types with field constraints:

```typescript
// If input has required field constraints
export type {InputTypeName} = AtLeast<{
  {fieldName}?: {FieldType};
  // ... other fields
}, "{constraintField1}" | "{constraintField2}">;
```

### Empty Type Filtering
Skip input types that would be empty after processing:

```typescript
function hasEmptyTypeFields(typeName: string): boolean {
  const inputType = schema.inputObjectTypes.find(t => t.name === typeName);
  if (!inputType || inputType.fields.length === 0) return true;
  
  // Check for recursive empty types
  for (const field of inputType.fields) {
    if (field.type.location === 'inputObjectTypes' && 
        hasEmptyTypeFields(field.type.name)) {
      return true;
    }
  }
  return false;
}
```

## Enum Type Generation

Generate TypeScript enums for GraphQL enums:

```typescript
export enum {EnumName} {
  {VALUE1} = "{VALUE1}",
  {VALUE2} = "{VALUE2}",
  // ... other values
}
```

## Special Type Handling

### Count Resolvers
For `findMany` operations, automatically add count resolvers:

```typescript
// If field name starts with "findMany"
{fieldName}Count?: Resolver<{ParentType}, {ArgsType}, number>;
```

### Aggregate Operations
For aggregate queries, handle special return types:

```typescript
// For aggregate operations
{aggregateFieldName}?: Resolver<
  {ParentType},
  Aggregate{ModelName}Args,
  GetAggregateResult<Client.Prisma.$${ModelName}Payload, Aggregate{ModelName}Args>
>;
```

### Batch Operations
For batch operations, use proper batch return types:

```typescript
{deleteMany}?: Resolver<
  {ParentType},
  {DeleteManyArgs},
  Client.Prisma.BatchPayload
>;
```

## Context Integration

### Context Type Definition
Ensure proper context typing:

```typescript
import { Context } from './context';

// All resolvers expect this context structure
type Resolver<T, A, R> = (
  parent: T,
  args: A,
  context: Context,  // Your application context
  info: GraphQLResolveInfo
) => Promise<R>;
```

### Prisma Client Integration
Types should integrate with Prisma client:

```typescript
import * as Client from '@prisma/client';

// Use Prisma-generated types for consistency
type UserResolver = Resolver<Client.User, {}, Client.User>;
```

## Nullability Handling

### Optional Fields
Handle GraphQL nullability in TypeScript:

```typescript
// GraphQL: field: String
{fieldName}?: Resolver<Parent, Args, string>;

// GraphQL: field: String!  
{fieldName}?: Resolver<Parent, Args, string>;

// GraphQL: field: String (nullable)
{fieldName}?: Resolver<Parent, Args, string | null>;
```

### List Types
Handle GraphQL lists properly:

```typescript
// GraphQL: field: [String!]!
{fieldName}?: Resolver<Parent, Args, string[]>;

// GraphQL: field: [String]
{fieldName}?: Resolver<Parent, Args, (string | null)[] | null>;
```

## Output Format

Generate formatted TypeScript with Prettier:

```typescript
// Generated resolversTypes.ts
import * as Client from '@prisma/client';
import { Context } from './context';
import { GraphQLResolveInfo } from 'graphql';
import { GetAggregateResult } from '@prisma/client/runtime/library';

// Base types...
// Resolver interfaces...
// Input types...
// Enum types...
```

## Formatting Rules

Format with Prettier using these options:
- `singleQuote: true`
- `semi: false`
- `trailingComma: 'all'`
- `parser: 'babel-ts'`

## Integration with SDL Generator

This generator is typically used alongside the SDL generator:
1. SDL generator creates schema and resolvers
2. This generator creates TypeScript types for those resolvers
3. Import the generated types in your resolver files for type safety

## Usage

The generated types provide complete type safety for resolver implementations:

```typescript
import { Resolvers } from './resolversTypes';

const resolvers: Resolvers = {
  Query: {
    findUniqueUser: async (parent, { where }, { prisma }) => {
      return prisma.user.findUnique({ where });
    },
  },
};
``` 