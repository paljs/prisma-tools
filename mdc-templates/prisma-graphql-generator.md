# Prisma GraphQL Generator Instructions

Generate GraphQL fragments, queries, and mutations for Prisma models based on the schema. This generator creates complete GraphQL operations for CRUD operations on Prisma models.

## Configuration Options

The generator accepts these configuration options:

- `prismaName`: Name of the Prisma client instance (default: "prisma")
- `excludeFields`: Array of field names to exclude from all models
- `excludeModels`: Array of model configurations with selective exclusions
- `excludeFieldsByModel`: Object mapping model names to arrays of fields to exclude for that specific model
- `excludeQueriesAndMutations`: Array of operation names to exclude globally
- `excludeQueriesAndMutationsByModel`: Object mapping model names to arrays of operations to exclude for that model
- `disableQueries`: Boolean to disable all query generation
- `disableMutations`: Boolean to disable all mutation generation

## Generation Pattern

For each Prisma model, generate the following structure:

### 1. Field Fragment
```graphql
fragment {ModelName}Fields on {ModelName} {
  {list all scalar fields, excluding configured excluded fields}
}
```

### 2. Complete Fragment with Relations
```graphql
fragment {ModelName} on {ModelName} {
  ...{ModelName}Fields
  {for each object relation field (not list), include:}
  {relationFieldName} {
    ...{RelatedModelName}Fields
  }
}
```

### 3. Query Operations (if not disabled)

#### Find Unique Query
```graphql
query findUnique{ModelName}($where: {ModelName}WhereUniqueInput!) {
  findUnique{ModelName}(where: $where) {
    ...{ModelName}
  }
}
```

#### Find Many Query
```graphql
query findMany{ModelName}(
  $where: {ModelName}WhereInput
  $orderBy: [{ModelName}OrderByWithRelationInput!]
  $cursor: {ModelName}WhereUniqueInput
  $skip: Int
  $take: Int
) {
  findMany{ModelName}(
    where: $where
    orderBy: $orderBy
    cursor: $cursor
    skip: $skip
    take: $take
  ) {
    ...{ModelName}
  }
}
```

#### Count Query
```graphql
query findMany{ModelName}Count(
  $where: {ModelName}WhereInput
  $orderBy: [{ModelName}OrderByWithRelationInput!]
  $cursor: {ModelName}WhereUniqueInput
  $skip: Int
  $take: Int
) {
  findMany{ModelName}Count(
    where: $where
    orderBy: $orderBy
    cursor: $cursor
    skip: $skip
    take: $take
  )
}
```

### 4. Mutation Operations (if not disabled)

#### Create Mutation
```graphql
mutation createOne{ModelName}($data: {ModelName}CreateInput!) {
  createOne{ModelName}(data: $data) {
    ...{ModelName}
  }
}
```

#### Update Mutation
```graphql
mutation updateOne{ModelName}($where: {ModelName}WhereUniqueInput!, $data: {ModelName}UpdateInput!) {
  updateOne{ModelName}(where: $where, data: $data) {
    ...{ModelName}
  }
}
```

#### Delete Mutation
```graphql
mutation deleteOne{ModelName}($where: {ModelName}WhereUniqueInput!) {
  deleteOne{ModelName}(where: $where) {
    ...{ModelName}
  }
}
```

#### Delete Many Mutation
```graphql
mutation deleteMany{ModelName}($where: {ModelName}WhereInput) {
  deleteMany{ModelName}(where: $where) {
    count
  }
}
```

#### Update Many Mutation
```graphql
mutation updateMany{ModelName}($where: {ModelName}WhereInput, $data: {ModelName}UpdateManyMutationInput!) {
  updateMany{ModelName}(where: $where, data: $data) {
    count
  }
}
```

## Field Exclusion Logic

1. Check global `excludeFields` array
2. Check model-specific `excludeFieldsByModel[modelName]` array
3. Exclude object fields from the Fields fragment (they go in the main fragment)
4. Include only scalar fields in the Fields fragment

## Operation Exclusion Logic

1. Check global `excludeQueriesAndMutations` array
2. Check model-specific `excludeQueriesAndMutationsByModel[modelName]` array
3. Check if queries/mutations are globally disabled for the model in `excludeModels`
4. Skip generating operations that are configured to be excluded

## Output

- Create one `.graphql` file per model
- Format the output using Prettier with GraphQL parser
- Use these Prettier options:
  - `trailingComma: 'all'`
  - `singleQuote: true`
  - `printWidth: 120`
  - `tabWidth: 2`
  - `parser: 'graphql'`

## Usage Example

When generating for a `User` model with fields `id`, `email`, `name`, `posts` (relation), and configuration excluding the `email` field:

```graphql
fragment UserFields on User {
  id
  name
}

fragment User on User {
  ...UserFields
  posts {
    ...PostFields
  }
}

query findUniqueUser($where: UserWhereUniqueInput!) {
  findUniqueUser(where: $where) {
    ...User
  }
}

# ... additional queries and mutations
``` 