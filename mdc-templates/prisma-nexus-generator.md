# Prisma Nexus GraphQL Generator Instructions

Generate complete Nexus GraphQL schema including object types, input types, queries, and mutations for Prisma models. Creates type-safe GraphQL resolvers using the Nexus framework.

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
- `filterInputs`: Function to filter input type fields
- `disableQueries`: Boolean to disable all query generation
- `disableMutations`: Boolean to disable all mutation generation
- `doNotUseFieldUpdateOperationsInput`: Boolean to avoid field update operations

## File Structure Generation

```
src/graphql/
├── index.ts              # Main exports
├── InputTypes.ts         # Input types and enums
└── {ModelName}/
    ├── type.ts          # Object type definition
    ├── queries/
    │   ├── index.ts     # Query exports
    │   ├── findUnique.ts
    │   ├── findMany.ts
    │   ├── findFirst.ts
    │   ├── findCount.ts
    │   └── aggregate.ts
    └── mutations/
        ├── index.ts     # Mutation exports
        ├── createOne.ts
        ├── updateOne.ts
        ├── upsertOne.ts
        ├── deleteOne.ts
        ├── updateMany.ts
        └── deleteMany.ts
```

## Object Type Generation

Generate Nexus object types for each Prisma model:

```typescript
import { objectType, list } from 'nexus';

export const {ModelName} = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: '{ModelName}',
  description: `{model documentation from Prisma schema}`,
  definition(t) {
    // For scalar fields (except DateTime)
    t.{nullOrList}.{fieldType}('{fieldName}', { description: `{field documentation}` });
    
    // For DateTime and object relations
    t.{nullOrList}.field('{fieldName}', {
      type: '{FieldType}',
      description: `{field documentation}`,
    });
  },
});
```

### Field Generation Rules

1. **Scalar Fields (non-DateTime)**: Use direct type methods
   - `t.string('fieldName')` for String
   - `t.int('fieldName')` for Int
   - `t.boolean('fieldName')` for Boolean
   - `t.float('fieldName')` for Float

2. **DateTime and Object Relations**: Use `t.field()` method
   - `type: 'DateTime'` for DateTime fields
   - `type: '{RelatedModelName}'` for relations

3. **Nullable/List Modifiers**:
   - Non-nullable: `t.nonNull`
   - List: `t.list`
   - Non-nullable list: `t.list.nonNull`
   - Default: no modifier

4. **Field Exclusion**: Skip fields in `excludeFields` and `excludeFieldsByModel[modelName]`

5. **Documentation**: Include field descriptions from Prisma schema if available

## Query Generation

Generate these query operations (if not excluded):

### findUnique Query
```typescript
import { queryField, nonNull } from 'nexus';

export const {Model}FindUniqueQuery = queryField('findUnique{Model}', {
  type: nonNull('{ModelName}'),
  args: {
    where: nonNull('{ModelName}WhereUniqueInput'),
  },
  resolve(_parent, args, { {prismaName}, select }) {
    return {prismaName}.{modelLower}.findUnique({
      ...args,
      ...select,
    });
  },
});
```

### findMany Query
```typescript
import { queryField, nonNull, list } from 'nexus';

export const {Model}FindManyQuery = queryField('findMany{Model}', {
  type: nonNull(list(nonNull('{ModelName}'))),
  args: {
    where: '{ModelName}WhereInput',
    orderBy: list('{ModelName}OrderByWithRelationInput'),
    cursor: '{ModelName}WhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('{ModelName}ScalarFieldEnum'),
  },
  resolve(_parent, args, { {prismaName}, select }) {
    return {prismaName}.{modelLower}.findMany({
      ...args,
      ...select,
    });
  },
});
```

### findCount Query
```typescript
export const {Model}FindCountQuery = queryField('findMany{Model}Count', {
  type: nonNull('Int'),
  args: {
    where: '{ModelName}WhereInput',
    orderBy: list('{ModelName}OrderByWithRelationInput'),
    cursor: '{ModelName}WhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('{ModelName}ScalarFieldEnum'),
  },
  resolve(_parent, args, { {prismaName} }) {
    return {prismaName}.{modelLower}.count({
      ...args,
    });
  },
});
```

## Mutation Generation

Generate these mutation operations (if not excluded):

### createOne Mutation
```typescript
import { mutationField, nonNull } from 'nexus';

export const {Model}CreateOneMutation = mutationField('createOne{Model}', {
  type: nonNull('{ModelName}'),
  args: {
    data: nonNull('{ModelName}CreateInput'),
  },
  resolve(_parent, { data }, { {prismaName}, select }) {
    return {prismaName}.{modelLower}.create({
      data,
      ...select,
    });
  },
});
```

### updateOne Mutation
```typescript
export const {Model}UpdateOneMutation = mutationField('updateOne{Model}', {
  type: nonNull('{ModelName}'),
  args: {
    data: nonNull('{ModelName}UpdateInput'),
    where: nonNull('{ModelName}WhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { {prismaName}, select }) {
    return {prismaName}.{modelLower}.update({
      where,
      data,
      ...select,
    });
  },
});
```

### deleteOne Mutation
```typescript
export const {Model}DeleteOneMutation = mutationField('deleteOne{Model}', {
  type: '{ModelName}',
  args: {
    where: nonNull('{ModelName}WhereUniqueInput'),
  },
  resolve(_parent, { where }, { {prismaName}, select }) {
    return {prismaName}.{modelLower}.delete({
      where,
      ...select,
    });
  },
});
```

## Input Types Generation

Generate Prisma input types and enums:

```typescript
import { enumType, inputObjectType } from 'nexus';

// Generate enums
export const {EnumName} = enumType({
  name: "{EnumName}",
  members: ["{value1}", "{value2}", ...],
});

// Generate input object types
export const {InputTypeName} = inputObjectType({
  nonNullDefaults: {
    input: false,
  },
  name: "{InputTypeName}",
  definition(t) {
    t.field("{fieldName}", { type: "{FieldType}" });
    t.nonNull.field("{requiredField}", { type: "{FieldType}" });
    t.list.field("{listField}", { type: "{FieldType}" });
  },
});
```

## Index File Generation

Generate proper exports in index files:

### TypeScript
```typescript
export * from './{ModelName}';
export * from './InputTypes';
```

### JavaScript
```javascript
module.exports = {
  ...require('./{ModelName}'),
  ...require('./InputTypes'),
};
```

## Formatting Rules

Format all generated files with Prettier using project defaults.

## Context Integration

All resolvers expect this context structure:
- `{prismaName}`: Prisma client instance
- `select`: Selection set for optimized queries

## Documentation Integration

- Include model documentation from Prisma schema as type descriptions
- Include field documentation from Prisma schema as field descriptions
- Support `@omit` directive to skip field generation 