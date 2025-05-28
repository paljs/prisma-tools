# @paljs/types

A comprehensive TypeScript type definitions package for the PalJS ecosystem. This package provides shared type definitions, interfaces, and utilities used across all PalJS packages for type safety and consistency.

## Installation

```bash
npm install @paljs/types
# or
yarn add @paljs/types
# or
pnpm add @paljs/types
```

## Features

- 🎯 **Type Safety** - Comprehensive TypeScript definitions for all PalJS packages
- 🔧 **Generator Types** - Type definitions for code generation options and configurations
- 📊 **CLI Types** - Type definitions for CLI commands and examples
- 🏗️ **Schema Types** - Type definitions for Prisma schema manipulation
- 📝 **Admin Types** - Type definitions for admin interface generation
- 🔍 **DMMF Types** - Extended Prisma DMMF type definitions

## Main Exports

### CLI Types

Types for CLI commands and project templates.

```typescript
import { CliGeneratedExamples } from '@paljs/types';

// Available project examples
type CliGeneratedExamples = 'apollo-nexus-schema' | 'apollo-sdl-first' | 'graphql-modules' | 'full-stack-nextjs';

// Usage
const example: CliGeneratedExamples = 'full-stack-nextjs';
```

### Generator Types

Core types for code generation functionality.

```typescript
import { GeneratorOptions, QueriesAndMutations, Query, Mutation } from '@paljs/types';

// Available query types
type Query = 'findUnique' | 'findFirst' | 'findMany' | 'findCount' | 'aggregate';

// Available mutation types
type Mutation = 'createOne' | 'updateOne' | 'upsertOne' | 'deleteOne' | 'updateMany' | 'deleteMany';

// Combined queries and mutations
type QueriesAndMutations = Query | Mutation;

// Generator configuration interface
interface GeneratorOptions<
  ModelName extends string = string,
  ModelsObject extends Record<ModelName, Record<string, any>> = Record<ModelName, Record<string, any>>,
> {
  // Return generated code as text instead of writing files
  backAsText?: boolean;

  // Prisma client instance name
  prismaName: string;

  // Models to include in generation
  models?: ModelName[];

  // Output directory
  output: string;

  // Generate JavaScript instead of TypeScript
  javaScript?: boolean;

  // Fields to exclude globally
  excludeFields: string[];

  // Models to exclude with specific operations
  excludeModels: {
    name: ModelName;
    queries?: boolean;
    mutations?: boolean;
  }[];

  // Disable all queries or mutations
  disableQueries?: boolean;
  disableMutations?: boolean;

  // Fields to exclude per model
  excludeFieldsByModel: {
    [modelName in ModelName]: (keyof ModelsObject[modelName])[];
  };

  // Queries/mutations to exclude per model
  excludeQueriesAndMutationsByModel: {
    [modelName in ModelName]: QueriesAndMutations[];
  };

  // Queries/mutations to exclude globally
  excludeQueriesAndMutations: QueriesAndMutations[];

  // Input fields to exclude
  excludeInputFields?: string[];

  // Custom input filter function
  filterInputs?: (input: DMMF.InputType) => DMMF.SchemaArg[];

  // Disable field update operations input
  doNotUseFieldUpdateOperationsInput?: boolean;
}
```

### Configuration File Types

Types for PalJS configuration files.

```typescript
import { ConfigFile } from '@paljs/types';

interface ConfigFile {
  // Schema file path
  schema?: string;

  // Multi-schema configuration
  multiSchema?: boolean;
  schemas?: Record<string, SchemaConfig>;

  // Backend generation settings
  backend?: {
    generator: 'nexus' | 'sdl' | 'graphql-modules';
    output: string;
    excludeFields?: string[];
    excludeModels?: Array<{
      name: string;
      queries?: boolean;
      mutations?: boolean;
    }>;
    // ... other backend options
  };

  // Frontend generation settings
  frontend?: {
    admin?: {
      models: string[];
      output: string;
      pageContent?: string;
    };
    graphql?: {
      output: string;
      models?: string[];
    };
  };
}

interface SchemaConfig {
  schema: string;
  backend?: BackendConfig;
  frontend?: FrontendConfig;
}
```

### Admin Schema Types

Types for admin interface generation.

```typescript
import { AdminSchemaOptions } from '@paljs/types';

interface AdminSchemaOptions {
  // Models to include in admin interface
  models: string[];

  // Output directory for admin pages
  output: string;

  // Custom page template
  pageContent?: string;

  // Exclude specific fields from admin
  excludeFields?: Record<string, string[]>;

  // Custom field configurations
  fieldConfigs?: Record<string, FieldConfig[]>;
}

interface FieldConfig {
  name: string;
  type: 'text' | 'email' | 'number' | 'select' | 'textarea' | 'checkbox';
  label: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  validation?: ValidationConfig;
}

interface ValidationConfig {
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
}
```

### Generated Schema Types

Types for generated schema output.

```typescript
import { GeneratedSchema } from '@paljs/types';

interface GeneratedSchema {
  // Generated file content
  content: string;

  // File path
  path: string;

  // Generation timestamp
  timestamp: Date;

  // Generator type used
  generator: 'nexus' | 'sdl' | 'graphql-modules';

  // Models included
  models: string[];

  // Configuration used
  options: GeneratorOptions;
}
```

### DMMF Types

Extended Prisma DMMF types with additional functionality.

```typescript
import { DMMF } from '@paljs/types';

// Re-exports Prisma DMMF types with extensions
namespace DMMF {
  export interface Document {
    datamodel: Datamodel;
    schema: Schema;
    mappings: Mappings;
  }

  export interface Model {
    name: string;
    dbName?: string;
    fields: Field[];
    primaryKey?: PrimaryKey;
    uniqueFields: string[][];
    uniqueIndexes: UniqueIndex[];
    documentation?: string;
    isGenerated?: boolean;
  }

  export interface Field {
    name: string;
    kind: FieldKind;
    isList: boolean;
    isRequired: boolean;
    isUnique: boolean;
    isId: boolean;
    isReadOnly: boolean;
    hasDefaultValue: boolean;
    type: string;
    relationName?: string;
    relationFromFields?: string[];
    relationToFields?: string[];
    relationOnDelete?: string;
    default?: FieldDefault;
    documentation?: string;
    isGenerated?: boolean;
    isUpdatedAt?: boolean;
  }

  export interface InputType {
    name: string;
    constraints: {
      maxNumFields?: number;
      minNumFields?: number;
    };
    fields: SchemaArg[];
  }

  export interface SchemaArg {
    name: string;
    comment?: string;
    isNullable: boolean;
    isOptional: boolean;
    inputTypes: SchemaArgInputType[];
    deprecation?: Deprecation;
  }
}
```

## Usage Examples

### Generator Configuration

```typescript
import type { GeneratorOptions, QueriesAndMutations } from '@paljs/types';

const generatorConfig: GeneratorOptions<'User' | 'Post'> = {
  prismaName: 'prisma',
  output: './src/generated',
  models: ['User', 'Post'],
  excludeFields: ['password', 'hash'],
  excludeModels: [
    { name: 'User', mutations: false },
    { name: 'Post', queries: false },
  ],
  excludeQueriesAndMutations: ['deleteMany', 'updateMany'],
  excludeFieldsByModel: {
    User: ['internalNotes'],
    Post: ['adminComments'],
  },
  excludeQueriesAndMutationsByModel: {
    User: ['deleteMany'],
    Post: ['updateMany'],
  },
};
```

### CLI Example Types

```typescript
import type { CliGeneratedExamples } from '@paljs/types';

function validateExample(example: string): example is CliGeneratedExamples {
  const validExamples: CliGeneratedExamples[] = [
    'apollo-nexus-schema',
    'apollo-sdl-first',
    'graphql-modules',
    'full-stack-nextjs',
  ];

  return validExamples.includes(example as CliGeneratedExamples);
}

// Usage
const userInput = 'full-stack-nextjs';
if (validateExample(userInput)) {
  console.log(`Valid example: ${userInput}`);
}
```

### Configuration File Usage

```typescript
import type { ConfigFile } from '@paljs/types';

const config: ConfigFile = {
  schema: './prisma/schema.prisma',
  backend: {
    generator: 'nexus',
    output: './src/graphql',
    excludeFields: ['password'],
    excludeModels: [{ name: 'Log', queries: true, mutations: false }],
  },
  frontend: {
    admin: {
      models: ['User', 'Post', 'Category'],
      output: './src/admin/pages',
    },
    graphql: {
      output: './src/graphql/generated',
      models: ['User', 'Post'],
    },
  },
};
```

### Multi-Schema Configuration

```typescript
import type { ConfigFile } from '@paljs/types';

const multiSchemaConfig: ConfigFile = {
  multiSchema: true,
  schemas: {
    user: {
      schema: './prisma/user.prisma',
      backend: {
        generator: 'nexus',
        output: './src/graphql/user',
      },
    },
    blog: {
      schema: './prisma/blog.prisma',
      backend: {
        generator: 'sdl',
        output: './src/graphql/blog',
      },
    },
  },
};
```

### Admin Schema Configuration

```typescript
import type { AdminSchemaOptions, FieldConfig } from '@paljs/types';

const adminConfig: AdminSchemaOptions = {
  models: ['User', 'Post', 'Category'],
  output: './src/admin',
  excludeFields: {
    User: ['password', 'hash'],
    Post: ['internalNotes'],
  },
  fieldConfigs: {
    User: [
      {
        name: 'email',
        type: 'email',
        label: 'Email Address',
        required: true,
        validation: {
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
      },
      {
        name: 'role',
        type: 'select',
        label: 'User Role',
        options: [
          { value: 'USER', label: 'User' },
          { value: 'ADMIN', label: 'Administrator' },
        ],
      },
    ],
  },
};
```

### Type Guards and Utilities

```typescript
import type { Query, Mutation, QueriesAndMutations } from '@paljs/types';

function isQuery(operation: QueriesAndMutations): operation is Query {
  const queries: Query[] = ['findUnique', 'findFirst', 'findMany', 'findCount', 'aggregate'];
  return queries.includes(operation as Query);
}

function isMutation(operation: QueriesAndMutations): operation is Mutation {
  const mutations: Mutation[] = ['createOne', 'updateOne', 'upsertOne', 'deleteOne', 'updateMany', 'deleteMany'];
  return mutations.includes(operation as Mutation);
}

// Usage
const operation: QueriesAndMutations = 'findMany';
if (isQuery(operation)) {
  console.log(`${operation} is a query operation`);
} else if (isMutation(operation)) {
  console.log(`${operation} is a mutation operation`);
}
```

### Generic Type Usage

```typescript
import type { GeneratorOptions } from '@paljs/types';

// Define your model types
interface UserModel {
  id: number;
  email: string;
  name?: string;
  password: string;
}

interface PostModel {
  id: number;
  title: string;
  content?: string;
  authorId: number;
}

// Use with generic types
type MyModels = {
  User: UserModel;
  Post: PostModel;
};

const config: GeneratorOptions<keyof MyModels, MyModels> = {
  prismaName: 'prisma',
  output: './src/generated',
  models: ['User', 'Post'], // Type-safe model names
  excludeFields: ['password'],
  excludeFieldsByModel: {
    User: ['password'], // Type-safe field names
    Post: ['content'],
  },
};
```

## Integration with Other Packages

This package provides types used throughout the PalJS ecosystem:

- **@paljs/generator** - Uses `GeneratorOptions`, `QueriesAndMutations`
- **@paljs/cli** - Uses `CliGeneratedExamples`, `ConfigFile`
- **@paljs/create** - Uses CLI types for project scaffolding
- **@paljs/admin** - Uses admin schema types for UI generation
- **@paljs/schema** - Uses DMMF types for schema manipulation

## TypeScript Configuration

For optimal type checking, configure your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*", "node_modules/@paljs/types/**/*"]
}
```

## Contributing

This package is part of the PalJS ecosystem. For contributing guidelines, please refer to the main repository.

## License

MIT License - see the LICENSE file for details.
