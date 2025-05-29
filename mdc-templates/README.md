# PalJS MDC Generator Templates

This collection of MDC (Model Data Context) files contains comprehensive instructions for AI models to generate the same code patterns that the PalJS generators create. These templates replace the original code generators with AI-readable instructions.

## Overview

PalJS was a toolkit for building NodeJS, Prisma, GraphQL, and React applications. These MDC templates preserve the generator patterns and allow AI models to create the same high-quality, consistent code without needing the original generator packages.

## Available Templates

### 1. [Prisma GraphQL Generator](./prisma-graphql-generator.md)
**Purpose**: Generate GraphQL fragments, queries, and mutations for client-side operations

**What it generates**:
- GraphQL fragments for each Prisma model
- Complete CRUD queries (findUnique, findMany, findCount)
- Complete CRUD mutations (create, update, delete, updateMany, deleteMany)
- Properly formatted .graphql files

**Use case**: Frontend applications that need GraphQL operations for Prisma models

### 2. [Prisma Admin Pages Generator](./prisma-admin-pages-generator.md) 
**Purpose**: Generate React admin interface pages for database management

**What it generates**:
- React components for each Prisma model
- Support for both Next.js Pages Router and App Router
- Admin layout components
- PrismaTable component integration

**Use case**: Building admin dashboards and CRUD interfaces

### 3. [Prisma Nexus Generator](./prisma-nexus-generator.md)
**Purpose**: Generate Nexus GraphQL schema with type-safe resolvers

**What it generates**:
- Nexus object type definitions
- Type-safe GraphQL resolvers
- Complete query and mutation implementations
- Input types and enums
- Proper TypeScript/JavaScript module structure

**Use case**: Backend GraphQL APIs using the Nexus framework

### 4. [Prisma SDL Generator](./prisma-sdl-generator.md)
**Purpose**: Generate GraphQL Schema Definition Language and resolvers

**What it generates**:
- SDL type definitions
- Resolver implementations
- Input types and enums in SDL format
- TypeScript type definitions for resolvers
- Proper module structure for schema composition

**Use case**: Backend GraphQL APIs using SDL-first approach

### 5. [Prisma Resolver Types Generator](./prisma-resolver-types-generator.md)
**Purpose**: Generate TypeScript type definitions for GraphQL resolvers

**What it generates**:
- Type-safe resolver function signatures
- Complete TypeScript interfaces for all resolvers
- Input/output type definitions
- Enum type definitions
- Context and argument typing

**Use case**: Adding type safety to SDL-based GraphQL resolvers

### 6. [Prisma GraphQL Modules Generator](./prisma-graphql-modules-generator.md)
**Purpose**: Generate modular GraphQL schema using GraphQL Modules framework

**What it generates**:
- GraphQL Modules with dependency injection
- Modular type definitions and resolvers
- Application composition files
- Provider integration patterns
- Module-based architecture

**Use case**: Large-scale GraphQL APIs requiring modularity and dependency injection

### 7. [Prisma Admin Settings Generator](./prisma-admin-settings-generator.md)
**Purpose**: Generate admin interface configuration files

**What it generates**:
- JSON configuration files for admin UIs
- Field-level permissions and display settings
- Model operation permissions
- UI customization options
- Smart merging with existing settings

**Use case**: Configuring admin dashboards and management interfaces

## How to Use These Templates

### Step 1: Choose the Right Template
Select the template that matches your needs:
- **Client-side GraphQL operations** → Prisma GraphQL Generator
- **Admin interfaces** → Prisma Admin Pages Generator  
- **Nexus GraphQL backend** → Prisma Nexus Generator
- **SDL GraphQL backend** → Prisma SDL Generator
- **TypeScript resolver types** → Prisma Resolver Types Generator
- **Modular GraphQL backend** → Prisma GraphQL Modules Generator
- **Admin configuration** → Prisma Admin Settings Generator

### Step 2: Provide Context to AI
When working with an AI model, provide:

1. **The relevant MDC template** (copy the entire content)
2. **Your Prisma schema** (the schema.prisma file)
3. **Configuration options** (specify any custom settings)
4. **Output preferences** (file structure, naming conventions)

### Step 3: Configuration Options
All generators support these common configuration options:

```typescript
interface GeneratorOptions {
  // Basic settings
  prismaName?: string;              // Prisma client name (default: "prisma")
  output?: string;                  // Output directory
  models?: string[];                // Specific models to generate for
  javaScript?: boolean;             // Generate JS instead of TS
  
  // Exclusion settings
  excludeFields?: string[];         // Fields to exclude globally
  excludeModels?: Array<{           // Models to exclude with options
    name: string;
    queries?: boolean;
    mutations?: boolean;
  }>;
  excludeFieldsByModel?: Record<string, string[]>;
  excludeQueriesAndMutations?: string[];
  excludeQueriesAndMutationsByModel?: Record<string, string[]>;
  
  // Feature flags
  disableQueries?: boolean;         // Disable all queries
  disableMutations?: boolean;       // Disable all mutations
  backAsText?: boolean;             // Return as text instead of files
}
```

### Step 4: Example AI Prompt

```
I need you to generate [GraphQL operations/admin pages/Nexus schema/SDL schema] for my Prisma models using the PalJS patterns.

Here's the MDC template to follow:
[paste the relevant template]

Here's my Prisma schema:
[paste your schema.prisma content]

Configuration:
- Output directory: src/graphql
- Exclude fields: ["createdAt", "updatedAt"] 
- Models to generate: ["User", "Post", "Comment"]
- Generate TypeScript (not JavaScript)

Please generate the files following the exact patterns described in the template.
```

## Template Features

### Consistency
All templates follow the same patterns that the original PalJS generators used, ensuring consistent code output.

### Configurability  
Full support for the original configuration options including field exclusions, operation filtering, and custom output paths.

### Documentation Integration
Templates include instructions for preserving Prisma schema documentation in generated code.

### Type Safety
TypeScript-first approach with proper type generation and imports.

### Modern Patterns
Support for modern frameworks like Next.js App Router alongside legacy patterns.

## Migration from Original Generators

If you're migrating from the original PalJS generators:

1. **Identify which generators you were using** (check your code for imports from `@paljs/generator`)
2. **Find the corresponding MDC template** from the list above
3. **Extract your existing configuration** (look for GeneratorOptions in your code)
4. **Use the template with an AI model** instead of the original generator package

## Benefits of MDC Approach

### Maintainability
- No package dependencies to maintain
- AI models can understand and modify patterns
- Instructions are human-readable and editable

### Flexibility
- Easy to customize patterns for specific needs
- Can combine multiple templates for complex scenarios
- AI can adapt patterns to new frameworks or requirements

### Future-Proof
- Works with any AI model that can read instructions
- Not tied to specific package versions or Node.js versions
- Easy to extend or modify as needs change

## Contributing

To improve these templates:

1. Test the templates with various AI models
2. Identify missing patterns or edge cases
3. Update templates to include new use cases
4. Ensure consistency across all templates
5. Document any changes or improvements

## Support

These templates are designed to be self-contained and comprehensive. The patterns match the original PalJS generators, so any existing PalJS documentation or examples should be compatible with the generated code. 