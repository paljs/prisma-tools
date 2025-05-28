# @paljs/utils

A comprehensive utility package for the PalJS ecosystem providing common helper functions, DMMF utilities, schema input generation, and Prisma integration helpers. This package serves as the foundation for other PalJS packages.

## Installation

```bash
npm install @paljs/utils
# or
yarn add @paljs/utils
# or
pnpm add @paljs/utils
```

## Dependencies

This package includes the following dependencies:
- `@paljs/types` - Type definitions
- `@paljs/display` - Logging utilities  
- `@prisma/internals` - Prisma internal utilities

## Features

- 🔍 **DMMF Utilities** - Helper functions for working with Prisma DMMF
- 📄 **Schema Processing** - Utilities for schema path resolution and parsing
- 🎯 **Input Generation** - Functions for generating GraphQL input types
- 🏗️ **Prisma Integration** - Seamless integration with Prisma internals
- 🔧 **Common Helpers** - Shared utility functions across PalJS packages
- 📊 **Type Safety** - Full TypeScript support with proper type inference

## Main Exports

### DMMF Utilities

Functions for working with Prisma Data Model Meta Format (DMMF).

```typescript
import { getDMMFBySchemaPath, getSchemaPath } from '@paljs/utils';

// Get schema path with validation
const schemaPath = await getSchemaPath('./custom/schema.prisma');

// Get DMMF from schema path
const dmmf = await getDMMFBySchemaPath('./prisma/schema.prisma');
```

### Schema Input Generation

Functions for generating GraphQL input types from Prisma schema.

```typescript
import { sdlInputs } from '@paljs/utils';
import { Prisma } from '@prisma/client';

// Generate SDL input types
const inputTypes = sdlInputs(Prisma.dmmf);
console.log(inputTypes); // Generated SDL input type definitions
```

### Prisma Internals Re-exports

Direct access to useful Prisma internal functions.

```typescript
import { getDMMF, formatSchema } from '@paljs/utils';

// Get DMMF from schema string
const dmmf = await getDMMF({
  datamodel: schemaString
});

// Format schema string
const formattedSchema = formatSchema({
  schema: schemaString
});
```

## API Reference

### getSchemaPath(path?: string)

Resolves and validates the Prisma schema file path.

```typescript
async function getSchemaPath(path?: string): Promise<string>
```

**Parameters:**
- `path` (optional) - Custom schema file path

**Returns:**
- Promise resolving to validated schema file path

**Example:**
```typescript
import { getSchemaPath } from '@paljs/utils';

// Use default schema location
const defaultPath = await getSchemaPath();
// Returns: './prisma/schema.prisma'

// Use custom path
const customPath = await getSchemaPath('./custom/schema.prisma');
// Returns: './custom/schema.prisma'

// Error handling
try {
  const path = await getSchemaPath('./nonexistent/schema.prisma');
} catch (error) {
  console.error('Schema not found:', error.message);
}
```

### getDMMFBySchemaPath(schemaPath?: string)

Loads and parses a Prisma schema file to return the DMMF document.

```typescript
async function getDMMFBySchemaPath(schemaPath?: string): Promise<DMMF.Document>
```

**Parameters:**
- `schemaPath` (optional) - Path to the Prisma schema file

**Returns:**
- Promise resolving to Prisma DMMF document

**Example:**
```typescript
import { getDMMFBySchemaPath } from '@paljs/utils';

// Load DMMF from default schema
const dmmf = await getDMMFBySchemaPath();

// Load DMMF from custom path
const customDMMF = await getDMMFBySchemaPath('./custom/schema.prisma');

// Access DMMF data
console.log('Models:', dmmf.datamodel.models);
console.log('Enums:', dmmf.datamodel.enums);
console.log('Types:', dmmf.datamodel.types);
```

### sdlInputs(dmmf: DMMF.Document)

Generates GraphQL SDL input type definitions from Prisma DMMF.

```typescript
function sdlInputs(dmmf: DMMF.Document): string
```

**Parameters:**
- `dmmf` - Prisma DMMF document

**Returns:**
- String containing SDL input type definitions

**Example:**
```typescript
import { sdlInputs } from '@paljs/utils';
import { Prisma } from '@prisma/client';

const inputTypeDefs = sdlInputs(Prisma.dmmf);

// Generated output includes:
// - UserCreateInput
// - UserUpdateInput  
// - UserWhereInput
// - UserOrderByInput
// - And many more...
```

## Usage Examples

### Basic Schema Processing

```typescript
import { getSchemaPath, getDMMFBySchemaPath } from '@paljs/utils';

async function processSchema() {
  try {
    // Find and validate schema
    const schemaPath = await getSchemaPath();
    console.log(`Found schema at: ${schemaPath}`);
    
    // Load DMMF
    const dmmf = await getDMMFBySchemaPath(schemaPath);
    
    // Process models
    dmmf.datamodel.models.forEach(model => {
      console.log(`Model: ${model.name}`);
      console.log(`Fields: ${model.fields.length}`);
    });
    
  } catch (error) {
    console.error('Schema processing failed:', error.message);
  }
}

await processSchema();
```

### Generate GraphQL Types

```typescript
import { getDMMFBySchemaPath, sdlInputs } from '@paljs/utils';
import { writeFileSync } from 'fs';

async function generateGraphQLTypes() {
  // Load schema
  const dmmf = await getDMMFBySchemaPath('./prisma/schema.prisma');
  
  // Generate input types
  const inputTypes = sdlInputs(dmmf);
  
  // Create complete type definitions
  const typeDefs = `
    # Generated input types
    ${inputTypes}
    
    # Your custom types
    type Query {
      users(where: UserWhereInput): [User!]!
      posts(where: PostWhereInput): [Post!]!
    }
    
    type Mutation {
      createUser(data: UserCreateInput!): User!
      updateUser(where: UserWhereUniqueInput!, data: UserUpdateInput!): User
    }
  `;
  
  // Save to file
  writeFileSync('./src/schema.graphql', typeDefs);
  console.log('GraphQL schema generated successfully!');
}

await generateGraphQLTypes();
```

### Multi-Schema Processing

```typescript
import { getDMMFBySchemaPath } from '@paljs/utils';

async function procesMultipleSchemas() {
  const schemaPaths = [
    './prisma/user.prisma',
    './prisma/blog.prisma', 
    './prisma/ecommerce.prisma'
  ];
  
  const dmmfs = await Promise.all(
    schemaPaths.map(path => getDMMFBySchemaPath(path))
  );
  
  // Combine models from all schemas
  const allModels = dmmfs.flatMap(dmmf => dmmf.datamodel.models);
  
  console.log(`Total models across all schemas: ${allModels.length}`);
  
  // Process each schema separately
  dmmfs.forEach((dmmf, index) => {
    console.log(`\nSchema ${index + 1} (${schemaPaths[index]}):`);
    console.log(`Models: ${dmmf.datamodel.models.map(m => m.name).join(', ')}`);
  });
}

await procesMultipleSchemas();
```

### Schema Analysis

```typescript
import { getDMMFBySchemaPath } from '@paljs/utils';

async function analyzeSchema() {
  const dmmf = await getDMMFBySchemaPath();
  
  // Count different elements
  const stats = {
    models: dmmf.datamodel.models.length,
    enums: dmmf.datamodel.enums.length,
    types: dmmf.datamodel.types.length
  };
  
  console.log('Schema Statistics:', stats);
  
  // Find relations
  const relations = dmmf.datamodel.models.flatMap(model =>
    model.fields.filter(field => field.relationName)
  );
  
  console.log(`Total relations: ${relations.length}`);
  
  // Find models with specific field types
  const modelsWithDateTime = dmmf.datamodel.models.filter(model =>
    model.fields.some(field => field.type === 'DateTime')
  );
  
  console.log('Models with DateTime fields:', modelsWithDateTime.map(m => m.name));
  
  // Find optional fields
  const optionalFields = dmmf.datamodel.models.flatMap(model =>
    model.fields.filter(field => !field.isRequired && !field.isList)
  );
  
  console.log(`Total optional fields: ${optionalFields.length}`);
}

await analyzeSchema();
```

### Integration with Code Generation

```typescript
import { getDMMFBySchemaPath, sdlInputs } from '@paljs/utils';
import { log } from '@paljs/display';

async function generateWithProgress() {
  const spinner = log.spinner('Loading Prisma schema...').start();
  
  try {
    // Load schema
    const dmmf = await getDMMFBySchemaPath();
    spinner.succeed('Schema loaded successfully');
    
    // Generate types
    log.progress('Generating GraphQL input types...');
    const inputTypes = sdlInputs(dmmf);
    
    // Save generated types
    log.progress('Writing generated files...');
    // ... save logic here
    
    log.success('Code generation completed!');
    log.meta(`Generated types for ${dmmf.datamodel.models.length} models`);
    
  } catch (error) {
    spinner.fail('Generation failed');
    log.error(error.message);
    throw error;
  }
}

await generateWithProgress();
```

### Error Handling and Validation

```typescript
import { getSchemaPath, getDMMFBySchemaPath } from '@paljs/utils';
import { log } from '@paljs/display';

async function validateAndProcess(customPath?: string) {
  try {
    // Validate schema path
    const schemaPath = await getSchemaPath(customPath);
    
    // Load and validate DMMF
    const dmmf = await getDMMFBySchemaPath(schemaPath);
    
    // Validate schema content
    if (dmmf.datamodel.models.length === 0) {
      log.warning('No models found in schema');
      return;
    }
    
    // Check for required models
    const requiredModels = ['User', 'Post'];
    const missingModels = requiredModels.filter(
      required => !dmmf.datamodel.models.some(model => model.name === required)
    );
    
    if (missingModels.length > 0) {
      log.warning(`Missing required models: ${missingModels.join(', ')}`);
    }
    
    log.success('Schema validation passed');
    return dmmf;
    
  } catch (error) {
    if (error.message.includes('schema.prisma')) {
      log.error('Schema file not found');
      log.meta('Make sure your schema file exists and is accessible');
    } else if (error.message.includes('Parse error')) {
      log.error('Schema syntax error');
      log.meta('Check your Prisma schema for syntax errors');
    } else {
      log.error(`Unexpected error: ${error.message}`);
    }
    
    throw error;
  }
}

// Usage
try {
  const dmmf = await validateAndProcess('./prisma/schema.prisma');
  if (dmmf) {
    console.log('Schema processed successfully');
  }
} catch (error) {
  console.error('Processing failed');
}
```

## Integration with Build Tools

### Webpack Plugin

```javascript
const { getDMMFBySchemaPath } = require('@paljs/utils');

class PrismaUtilsPlugin {
  apply(compiler) {
    compiler.hooks.beforeCompile.tapAsync('PrismaUtils', async (params, callback) => {
      try {
        const dmmf = await getDMMFBySchemaPath();
        console.log(`Loaded schema with ${dmmf.datamodel.models.length} models`);
        callback();
      } catch (error) {
        callback(error);
      }
    });
  }
}

module.exports = PrismaUtilsPlugin;
```

### Rollup Plugin

```javascript
import { getDMMFBySchemaPath } from '@paljs/utils';

export function prismaUtils() {
  return {
    name: 'prisma-utils',
    buildStart: async () => {
      const dmmf = await getDMMFBySchemaPath();
      console.log(`Processing ${dmmf.datamodel.models.length} models`);
    }
  };
}
```

## Debug Mode

Enable debug output by setting the `DEBUG` environment variable:

```bash
DEBUG=paljs* node your-script.js
```

This will show detailed logging from schema path resolution and DMMF loading.

## TypeScript Support

This package is written in TypeScript and provides comprehensive type definitions:

```typescript
import type { DMMF } from '@paljs/utils';

function processModels(dmmf: DMMF.Document): void {
  dmmf.datamodel.models.forEach((model: DMMF.Model) => {
    model.fields.forEach((field: DMMF.Field) => {
      console.log(`${model.name}.${field.name}: ${field.type}`);
    });
  });
}
```

## Contributing

This package is part of the PalJS ecosystem. For contributing guidelines, please refer to the main repository.

## License

MIT License - see the LICENSE file for details.
