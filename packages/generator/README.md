# @paljs/generator

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Configuration](#configuration)
- [License](#license)

# Introduction

A powerful code generation package that creates GraphQL schemas, resolvers, and admin interfaces from Prisma schema definitions. Supports multiple GraphQL architectures including Nexus, SDL-first, and GraphQL Modules.

# Installation

```bash
npm install @paljs/generator
# or
yarn add @paljs/generator
# or
pnpm add @paljs/generator
```

# Usage

## Main Classes

### Generator

The main class that orchestrates code generation based on the specified generator type.

```typescript
import { Generator } from '@paljs/generator';

const generator = new Generator(
  {
    name: 'nexus', // 'nexus' | 'sdl' | 'graphql-modules'
    schemaPath: './prisma/schema.prisma',
  },
  {
    output: './src/graphql',
    excludeFields: ['password'],
    // ... other options
  },
);

await generator.run();
```

**Constructor Parameters:**

- `generator` - Configuration object with generator name and schema path
- `options` - Optional generator options for customization

**Methods:**

- `run()` - Execute the code generation process

### GenerateNexus

Generates Nexus GraphQL schema with type-safe resolvers and input types.

```typescript
import { GenerateNexus } from '@paljs/generator';

const nexusGenerator = new GenerateNexus('./prisma/schema.prisma', {
  output: './src/graphql',
  prismaName: 'prisma',
  excludeFields: ['password', 'hash'],
});

await nexusGenerator.run();
```

**Generated Files:**

- `types.ts` - Nexus object type definitions
- `inputs.ts` - Input type definitions
- `queries.ts` - Query field definitions
- `mutations.ts` - Mutation field definitions
- `index.ts` - Combined exports

**Key Methods:**

- `run()` - Generate all Nexus files
- `createTypes()` - Generate object types
- `createInputs()` - Generate input types
- `createQueries()` - Generate query fields
- `createMutations()` - Generate mutation fields

### GenerateSdl

Generates Schema Definition Language (SDL) files with resolver functions.

```typescript
import { GenerateSdl } from '@paljs/generator';

const sdlGenerator = new GenerateSdl('./prisma/schema.prisma', {
  output: './src/graphql',
  javaScript: false,
});

await sdlGenerator.run();
```

**Generated Files:**

- `typeDefs.ts` - GraphQL type definitions
- `resolvers.ts` - Resolver implementations
- `index.ts` - Combined exports

**Key Methods:**

- `run()` - Generate all SDL files
- `createTypes()` - Generate type definitions
- `createResolvers()` - Generate resolver functions
- `createMaster()` - Create index files

### GenerateModules

Generates GraphQL Modules architecture with modular schema organization.

```typescript
import { GenerateModules } from '@paljs/generator';

const modulesGenerator = new GenerateModules('./prisma/schema.prisma', {
  output: './src/graphql',
});

await modulesGenerator.run();
```

**Generated Files:**

- `modules/` - Individual model modules
- `inputs/` - Shared input types
- `app.ts` - Application module configuration

**Key Methods:**

- `run()` - Generate all module files
- `createModules()` - Generate individual modules
- `createInputs()` - Generate input types
- `createApp()` - Generate application module

### UIGenerator

Generates admin UI components and pages for Prisma models.

```typescript
import { UIGenerator } from '@paljs/generator';

const uiGenerator = new UIGenerator('./prisma/schema.prisma');

await uiGenerator.generateAdminPages({
  models: ['User', 'Post', 'Category'],
  output: './src/admin/pages',
});
```

**Key Methods:**

- `generateAdminPages()` - Generate admin interface pages
- `mergeSchemas()` - Merge multiple schemas for multi-database support

## Basic Nexus Generation

```typescript
import { Generator } from '@paljs/generator';

const generator = new Generator(
  { name: 'nexus', schemaPath: './prisma/schema.prisma' },
  {
    output: './src/graphql',
    prismaName: 'prisma',
    excludeFields: ['password', 'hash'],
    excludeModels: [{ name: 'Log', queries: true, mutations: true }],
  },
);

await generator.run();
```

## SDL Generation with Custom Configuration

```typescript
import { GenerateSdl } from '@paljs/generator';

const generator = new GenerateSdl('./prisma/schema.prisma', {
  output: './src/graphql',
  javaScript: false,
  excludeQueriesAndMutations: ['deleteMany', 'updateMany'],
  excludeFieldsByModel: {
    User: ['password', 'hash'],
    Post: ['internalNotes'],
  },
});

await generator.run();
```

## GraphQL Modules Generation

```typescript
import { GenerateModules } from '@paljs/generator';

const generator = new GenerateModules('./prisma/schema.prisma', {
  output: './src/graphql',
  models: ['User', 'Post', 'Comment'],
  disableQueries: false,
  disableMutations: false,
});

await generator.run();
```

## Admin UI Generation

```typescript
import { UIGenerator } from '@paljs/generator';

const uiGenerator = new UIGenerator('./prisma/schema.prisma');

// Generate admin pages
await uiGenerator.generateAdminPages({
  models: ['User', 'Post', 'Category'],
  output: './src/admin/pages',
  pageContent: './templates/admin-page.tsx',
});

// Generate GraphQL queries for frontend
await uiGenerator.generateGraphqlQueries({
  output: './src/graphql/queries',
  models: ['User', 'Post'],
});
```

## Multi-Schema Support

```typescript
import { UIGenerator } from '@paljs/generator';

const schemas = ['./prisma/user.prisma', './prisma/blog.prisma', './prisma/ecommerce.prisma'];

const uiGenerator = new UIGenerator(schemas);

await uiGenerator.generateAdminPages({
  models: ['User', 'Post', 'Product'],
  output: './src/admin/pages',
});
```

## Custom Templates

You can provide custom templates for generated code:

```typescript
const generator = new GenerateNexus('./prisma/schema.prisma', {
  output: './src/graphql',
  templates: {
    query: './templates/custom-query.template',
    mutation: './templates/custom-mutation.template',
  },
});
```

## Conditional Field Exclusion

```typescript
const generator = new Generator(
  { name: 'nexus', schemaPath: './prisma/schema.prisma' },
  {
    output: './src/graphql',
    filterInputs: (input) => {
      // Custom logic to filter input fields
      return input.args.filter((arg) => !arg.name.includes('internal'));
    },
  },
);
```

## JavaScript Output

```typescript
const generator = new GenerateSdl('./prisma/schema.prisma', {
  output: './src/graphql',
  javaScript: true, // Generate .js files instead of .ts
});
```

## Return as Text

```typescript
const generator = new GenerateNexus('./prisma/schema.prisma', {
  backAsText: true, // Return generated code as string instead of writing files
});

const generatedCode = await generator.run();
console.log(generatedCode);
```

## Integration with Build Tools

### Webpack Plugin

```javascript
const { Generator } = require('@paljs/generator');

class PalJSGeneratorPlugin {
  apply(compiler) {
    compiler.hooks.beforeCompile.tapAsync('PalJSGenerator', async (params, callback) => {
      const generator = new Generator(
        { name: 'nexus', schemaPath: './prisma/schema.prisma' },
        { output: './src/graphql' },
      );
      await generator.run();
      callback();
    });
  }
}

module.exports = PalJSGeneratorPlugin;
```

### Rollup Plugin

```javascript
import { Generator } from '@paljs/generator';

export function paljs(options = {}) {
  return {
    name: 'paljs-generator',
    buildStart: async () => {
      const generator = new Generator({ name: 'nexus', schemaPath: './prisma/schema.prisma' }, options);
      await generator.run();
    },
  };
}
```

## Error Handling

```typescript
import { Generator } from '@paljs/generator';

try {
  const generator = new Generator({ name: 'nexus', schemaPath: './prisma/schema.prisma' }, { output: './src/graphql' });

  await generator.run();
  console.log('Generation completed successfully');
} catch (error) {
  console.error('Generation failed:', error.message);

  if (error.code === 'SCHEMA_NOT_FOUND') {
    console.error('Prisma schema file not found');
  } else if (error.code === 'INVALID_MODEL') {
    console.error('Invalid model configuration');
  }
}
```

## Performance Optimization

### Incremental Generation

```typescript
const generator = new Generator(
  { name: 'nexus', schemaPath: './prisma/schema.prisma' },
  {
    output: './src/graphql',
    models: ['User'], // Generate only specific models
    incremental: true, // Only update changed files
  },
);
```

### Parallel Generation

```typescript
import { GenerateNexus, GenerateSdl } from '@paljs/generator';

const [nexusResult, sdlResult] = await Promise.all([
  new GenerateNexus('./prisma/schema.prisma', { output: './src/nexus' }).run(),
  new GenerateSdl('./prisma/schema.prisma', { output: './src/sdl' }).run(),
]);
```

# Features

## Multiple Generators

- 🏗️ **Multiple Generators** - Support for Nexus, SDL, and GraphQL Modules
- 🎯 **Type Safety** - Full TypeScript support with generated types
- 🔧 **Customizable** - Extensive configuration options
- 📝 **Admin UI** - Generate admin interfaces automatically
- 🚀 **Performance** - Optimized code generation
- 🔄 **Incremental** - Smart updates without overwriting custom code

## Available Queries and Mutations

```typescript
type QueriesAndMutations =
  | 'findUnique'
  | 'findFirst'
  | 'findMany'
  | 'findCount'
  | 'aggregate'
  | 'createOne'
  | 'createMany'
  | 'updateOne'
  | 'updateMany'
  | 'deleteOne'
  | 'deleteMany'
  | 'upsertOne';
```

## TypeScript Support

This package is written in TypeScript and provides comprehensive type definitions:

```typescript
import type { GeneratorOptions, QueriesAndMutations, AdminPagesOptions } from '@paljs/generator';

const options: GeneratorOptions = {
  output: './src/graphql',
  prismaName: 'prisma',
  excludeFields: ['password'],
  excludeModels: [],
  excludeFieldsByModel: {},
  excludeQueriesAndMutations: [],
  excludeQueriesAndMutationsByModel: {},
};
```

# Configuration

## GeneratorOptions Interface

```typescript
interface GeneratorOptions {
  // Output directory for generated files
  output: string;

  // Prisma client instance name
  prismaName: string;

  // Models to include (default: all models)
  models?: string[];

  // Generate JavaScript instead of TypeScript
  javaScript?: boolean;

  // Fields to exclude globally
  excludeFields: string[];

  // Models to exclude with specific operations
  excludeModels: Array<{
    name: string;
    queries?: boolean;
    mutations?: boolean;
  }>;

  // Disable all queries or mutations
  disableQueries?: boolean;
  disableMutations?: boolean;

  // Fields to exclude per model
  excludeFieldsByModel: {
    [modelName: string]: string[];
  };

  // Queries/mutations to exclude globally
  excludeQueriesAndMutations: QueriesAndMutations[];

  // Queries/mutations to exclude per model
  excludeQueriesAndMutationsByModel: {
    [modelName: string]: QueriesAndMutations[];
  };

  // Exclude input fields
  excludeInputFields?: string[];

  // Custom input filter function
  filterInputs?: (input: DMMF.InputType) => DMMF.SchemaArg[];

  // Disable field update operations input
  doNotUseFieldUpdateOperationsInput?: boolean;

  // Return generated code as text instead of writing files
  backAsText?: boolean;
}
```

# License

MIT License - see the LICENSE file for details.
