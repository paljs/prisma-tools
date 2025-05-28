# @paljs/schema

A comprehensive Prisma schema manipulation package that provides tools for converting, transforming, and analyzing Prisma schema files. This package includes utilities for JSON conversion, camelCase transformation, TypeScript generation, and schema reading.

## Installation

```bash
npm install @paljs/schema
# or
yarn add @paljs/schema
# or
pnpm add @paljs/schema
```

## Features

- 📄 **Schema to JSON** - Convert Prisma schema to structured JSON objects
- 🐪 **CamelCase Conversion** - Transform snake_case to camelCase in schemas
- 📝 **TypeScript Generation** - Generate TypeScript types from Prisma schema
- 🔍 **Schema Reading** - Parse and analyze Prisma schema files
- 🎯 **Type Safety** - Full TypeScript support with proper type definitions
- 🔧 **Configurable** - Extensive customization options

## Main Exports

### ConvertSchemaToObject

Converts a Prisma schema file to a structured JSON object.

```typescript
import { ConvertSchemaToObject } from '@paljs/schema';

const converter = new ConvertSchemaToObject('./prisma/schema.prisma');
const schemaObject = converter.run();

console.log(schemaObject);
// {
//   models: [...],
//   enums: [...],
//   generators: [...],
//   datasources: [...]
// }
```

### CamelCase

Converts snake_case field names to camelCase in Prisma schema files.

```typescript
import { CamelCase } from '@paljs/schema';

const camelCase = new CamelCase('./prisma/schema.prisma');
await camelCase.convert();

// Transforms:
// model User {
//   user_name String
//   created_at DateTime
// }
//
// To:
// model User {
//   userName String
//   createdAt DateTime
// }
```

### GenerateTypeScript

Generates TypeScript type definitions from Prisma schema.

```typescript
import { GenerateTypeScript } from '@paljs/schema';

const generator = new GenerateTypeScript('./prisma/schema.prisma');
const typeDefinitions = generator.run();

console.log(typeDefinitions);
// export interface User {
//   id: number;
//   email: string;
//   name: string | null;
// }
```

### PrismaReader

Reads and parses Prisma schema files with advanced analysis capabilities.

```typescript
import { PrismaReader } from '@paljs/schema';

const reader = new PrismaReader('./prisma/schema.prisma');
const schema = reader.read();

// Access parsed schema data
console.log(schema.models);
console.log(schema.enums);
console.log(schema.datasources);
```

## Schema Object Structure

### SchemaObject Interface

```typescript
interface SchemaObject {
  models: Model[];
  enums: Enums[];
  generators: Generator[];
  datasources: Datasource[];
}

interface Model {
  name: string;
  documentation?: string;
  map?: string;
  fields: Field[];
}

interface Field {
  name: string;
  type: string;
  kind: 'scalar' | 'object' | 'enum';
  list: boolean;
  required: boolean;
  unique: boolean;
  id: boolean;
  default?: any;
  relation?: {
    name?: string;
    fields?: string[];
    references?: string[];
    onDelete?: string;
    onUpdate?: string;
  };
  documentation?: string;
  map?: string;
}

interface Enums {
  name: string;
  fields: string[];
}
```

## Usage Examples

### Convert Schema to JSON

```typescript
import { ConvertSchemaToObject } from '@paljs/schema';

// Basic conversion
const converter = new ConvertSchemaToObject('./prisma/schema.prisma');
const schema = converter.run();

// Access models
schema.models.forEach((model) => {
  console.log(`Model: ${model.name}`);
  model.fields.forEach((field) => {
    console.log(`  Field: ${field.name} (${field.type})`);
  });
});

// Access enums
schema.enums.forEach((enumType) => {
  console.log(`Enum: ${enumType.name}`);
  console.log(`Values: ${enumType.fields.join(', ')}`);
});
```

### CamelCase Conversion

```typescript
import { CamelCase } from '@paljs/schema';

// Convert snake_case to camelCase
const camelCase = new CamelCase('./prisma/schema.prisma');
await camelCase.convert();

// The schema file will be updated in place
// Original:
// model user_profile {
//   user_id    Int
//   first_name String
//   last_name  String
//   created_at DateTime @default(now())
// }
//
// After conversion:
// model UserProfile {
//   userId    Int
//   firstName String
//   lastName  String
//   createdAt DateTime @default(now())
// }
```

### Generate TypeScript Types

```typescript
import { GenerateTypeScript } from '@paljs/schema';
import { writeFileSync } from 'fs';

const generator = new GenerateTypeScript('./prisma/schema.prisma');
const types = generator.run();

// Save to file
writeFileSync('./src/types/prisma.ts', types);

// Generated output example:
// export interface User {
//   id: number;
//   email: string;
//   name: string | null;
//   createdAt: Date;
//   posts: Post[];
// }
//
// export interface Post {
//   id: number;
//   title: string;
//   content: string | null;
//   published: boolean;
//   authorId: number;
//   author: User;
// }
//
// export enum Role {
//   USER = "USER",
//   ADMIN = "ADMIN",
// }
```

### Schema Analysis

```typescript
import { PrismaReader } from '@paljs/schema';

const reader = new PrismaReader('./prisma/schema.prisma');
const schema = reader.read();

// Find all models with specific field
const modelsWithEmail = schema.models.filter((model) => model.fields.some((field) => field.name === 'email'));

// Find all relations
const relations = schema.models.flatMap((model) => model.fields.filter((field) => field.relation));

// Find all unique fields
const uniqueFields = schema.models.flatMap((model) => model.fields.filter((field) => field.unique));

console.log(
  'Models with email:',
  modelsWithEmail.map((m) => m.name),
);
console.log('Relations found:', relations.length);
console.log('Unique fields:', uniqueFields.length);
```

## Advanced Features

### Custom Field Type Mapping

```typescript
import { GenerateTypeScript } from '@paljs/schema';

class CustomTypeScriptGenerator extends GenerateTypeScript {
  private customScalarMapping = {
    Int: 'number',
    Float: 'number',
    Decimal: 'Decimal', // Custom type
    BigInt: 'bigint',
    String: 'string',
    Boolean: 'boolean',
    DateTime: 'Date',
    Json: 'JsonValue', // Custom type
  };

  protected getType(field: Field): string {
    if (field.kind === 'scalar') {
      const baseType = this.customScalarMapping[field.type] || field.type;
      return `${baseType}${field.list ? '[]' : ''}`;
    }
    return super.getType(field);
  }
}

const generator = new CustomTypeScriptGenerator('./prisma/schema.prisma');
const types = generator.run();
```

### Schema Validation

```typescript
import { ConvertSchemaToObject } from '@paljs/schema';

function validateSchema(schemaPath: string) {
  try {
    const converter = new ConvertSchemaToObject(schemaPath);
    const schema = converter.run();

    const errors: string[] = [];

    // Check for models without id fields
    schema.models.forEach((model) => {
      const hasId = model.fields.some((field) => field.id);
      if (!hasId) {
        errors.push(`Model ${model.name} has no id field`);
      }
    });

    // Check for missing relations
    schema.models.forEach((model) => {
      model.fields.forEach((field) => {
        if (field.relation && field.kind === 'object') {
          const relatedModel = schema.models.find((m) => m.name === field.type);
          if (!relatedModel) {
            errors.push(`Model ${model.name} references non-existent model ${field.type}`);
          }
        }
      });
    });

    return { valid: errors.length === 0, errors };
  } catch (error) {
    return { valid: false, errors: [error.message] };
  }
}

const validation = validateSchema('./prisma/schema.prisma');
if (!validation.valid) {
  console.error('Schema validation errors:', validation.errors);
}
```

### Multi-Schema Processing

```typescript
import { ConvertSchemaToObject } from '@paljs/schema';

function mergeSchemas(schemaPaths: string[]) {
  const schemas = schemaPaths.map((path) => {
    const converter = new ConvertSchemaToObject(path);
    return converter.run();
  });

  const merged = {
    models: [],
    enums: [],
    generators: [],
    datasources: [],
  };

  schemas.forEach((schema) => {
    merged.models.push(...schema.models);
    merged.enums.push(...schema.enums);
    merged.generators.push(...schema.generators);
    merged.datasources.push(...schema.datasources);
  });

  return merged;
}

const mergedSchema = mergeSchemas(['./prisma/user.prisma', './prisma/blog.prisma', './prisma/ecommerce.prisma']);
```

### Schema Transformation Pipeline

```typescript
import { ConvertSchemaToObject, CamelCase, GenerateTypeScript } from '@paljs/schema';
import { writeFileSync } from 'fs';

async function processSchema(inputPath: string, outputDir: string) {
  // Step 1: Convert to camelCase
  const camelCase = new CamelCase(inputPath);
  await camelCase.convert();

  // Step 2: Convert to JSON
  const converter = new ConvertSchemaToObject(inputPath);
  const schemaObject = converter.run();
  writeFileSync(`${outputDir}/schema.json`, JSON.stringify(schemaObject, null, 2));

  // Step 3: Generate TypeScript types
  const typeGenerator = new GenerateTypeScript(inputPath);
  const types = typeGenerator.run();
  writeFileSync(`${outputDir}/types.ts`, types);

  console.log('Schema processing complete!');
  return schemaObject;
}

await processSchema('./prisma/schema.prisma', './generated');
```

## Integration Examples

### With Build Tools

```typescript
// webpack.config.js
const { ConvertSchemaToObject } = require('@paljs/schema');

module.exports = {
  // ... other config
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.beforeCompile.tap('PrismaSchemaPlugin', () => {
          const converter = new ConvertSchemaToObject('./prisma/schema.prisma');
          const schema = converter.run();

          // Use schema data for build-time optimizations
          console.log(`Processing ${schema.models.length} models`);
        });
      },
    },
  ],
};
```

### With Code Generation

```typescript
import { ConvertSchemaToObject } from '@paljs/schema';
import { writeFileSync } from 'fs';

function generateApiRoutes(schemaPath: string) {
  const converter = new ConvertSchemaToObject(schemaPath);
  const schema = converter.run();

  const routes = schema.models
    .map((model) => {
      const modelName = model.name.toLowerCase();
      return `
// ${model.name} routes
app.get('/${modelName}', async (req, res) => {
  const ${modelName}s = await prisma.${modelName}.findMany();
  res.json(${modelName}s);
});

app.post('/${modelName}', async (req, res) => {
  const ${modelName} = await prisma.${modelName}.create({
    data: req.body
  });
  res.json(${modelName});
});
    `;
    })
    .join('\n');

  writeFileSync('./src/routes/generated.ts', routes);
}

generateApiRoutes('./prisma/schema.prisma');
```

## Error Handling

```typescript
import { ConvertSchemaToObject, CamelCase } from '@paljs/schema';

try {
  const converter = new ConvertSchemaToObject('./prisma/schema.prisma');
  const schema = converter.run();
  console.log('Schema converted successfully');
} catch (error) {
  if (error.code === 'ENOENT') {
    console.error('Schema file not found');
  } else if (error.message.includes('Parse error')) {
    console.error('Invalid schema syntax');
  } else {
    console.error('Conversion failed:', error.message);
  }
}

try {
  const camelCase = new CamelCase('./prisma/schema.prisma');
  await camelCase.convert();
  console.log('CamelCase conversion completed');
} catch (error) {
  console.error('CamelCase conversion failed:', error.message);
}
```

## TypeScript Support

This package is written in TypeScript and provides comprehensive type definitions:

```typescript
import type { SchemaObject, Model, Field, Enums } from '@paljs/schema';

function analyzeSchema(schema: SchemaObject): void {
  schema.models.forEach((model: Model) => {
    model.fields.forEach((field: Field) => {
      if (field.relation) {
        console.log(`Relation: ${model.name}.${field.name} -> ${field.type}`);
      }
    });
  });
}
```

## Contributing

This package is part of the PalJS ecosystem. For contributing guidelines, please refer to the main repository.

## License

MIT License - see the LICENSE file for details.
