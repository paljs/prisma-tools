# @paljs/cli

A powerful command-line interface for generating full-stack applications with Prisma, GraphQL, and modern frontend frameworks. The PalJS CLI automates the creation of CRUD operations, admin interfaces, and GraphQL schemas.

## Installation

```bash
npm install -g @paljs/cli
# or
yarn global add @paljs/cli
# or
pnpm add -g @paljs/cli
```

## Quick Start

```bash
# Create a new project
pal create my-app

# Generate CRUD operations
pal generate

# Convert Prisma schema
pal schema json
```

## Commands

### `pal create <name>`

Create a new full-stack application with Prisma and GraphQL.

```bash
pal create my-awesome-app
```

**Options:**

- `--example <type>` - Choose project template (default: `full-stack-nextjs`)
- `--framework <framework>` - UI framework selection
- `--multi` - Enable multi-schema support
- `--git` - Initialize git repository
- `--manager <manager>` - Package manager (npm, yarn, pnpm)
- `--skip-install` - Skip dependency installation

**Available Examples:**

- `full-stack-nextjs` - Complete Next.js application with Prisma
- `apollo-nexus-schema` - Apollo Server with Nexus schema-first approach
- `apollo-sdl-first` - Apollo Server with SDL-first approach
- `graphql-modules` - GraphQL Modules architecture

**Available Frameworks:**

- Material UI
- Material UI + PrismaAdmin UI
- Tailwind CSS
- Tailwind CSS + PrismaAdmin UI
- Chakra UI
- Chakra UI + PrismaAdmin UI

**Example:**

```bash
pal create my-app --example full-stack-nextjs --framework "Tailwind CSS + PrismaAdmin UI" --git
```

### `pal generate [models] [type]`

Generate CRUD operations, admin pages, and GraphQL queries/mutations.

```bash
# Generate everything for all models
pal generate

# Generate for specific models
pal generate User,Post

# Generate specific types
pal generate User queries,mutations

# Generate admin pages only
pal generate User admin
```

**Arguments:**

- `models` - Comma-separated list of model names (optional)
- `type` - Type of files to generate: `crud`, `queries`, `mutations`, `admin`, `graphql`

**Options:**

- `-c, --config <file>` - Custom config file name (default: `pal.config`)
- `-s, --schema <name>` - Schema name from config file
- `-m, --multi` - Work with multi-schema configuration
- `-a, --autoComplete <path>` - Generate CLI auto-completion for oh-my-zsh

**Examples:**

```bash
# Generate CRUD for User and Post models
pal generate User,Post crud

# Generate admin interface for all models
pal generate admin

# Use custom config file
pal generate --config my-pal.config

# Multi-schema mode
pal generate --multi --schema userSchema
```

### `pal schema <converter>`

Convert and manipulate Prisma schema files.

```bash
# Convert schema to JSON
pal schema json

# Convert to TypeScript types
pal schema typescript

# Convert snake_case to camelCase
pal schema camel-case
```

**Arguments:**

- `converter` - Conversion type: `json`, `typescript`, `camel-case`

**Options:**

- `-o, --output-path <path>` - Output folder path (default: `src/`)
- `-t, --type <type>` - Output file type for JSON conversion: `js`, `ts`, `json` (default: `ts`)
- `-s, --schema <path>` - Custom schema file path

**Examples:**

```bash
# Convert to TypeScript with custom output
pal schema typescript --output-path ./types

# Convert to JSON as JavaScript file
pal schema json --type js --output-path ./generated

# Convert specific schema file
pal schema json --schema ./custom/schema.prisma
```

## Configuration

### Basic Configuration (`pal.config.js`)

```javascript
module.exports = {
  schema: './prisma/schema.prisma',
  backend: {
    generator: 'nexus', // 'nexus' | 'sdl' | 'graphql-modules'
    output: './src/graphql',
    excludeFields: ['password', 'hash'],
    excludeModels: [{ name: 'Log', queries: true, mutations: false }],
  },
  frontend: {
    admin: {
      models: ['User', 'Post', 'Category'],
      output: './src/admin',
    },
    graphql: {
      output: './src/graphql/generated',
    },
  },
};
```

### Multi-Schema Configuration

```javascript
module.exports = {
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

### Advanced Configuration Options

```javascript
module.exports = {
  schema: './prisma/schema.prisma',
  backend: {
    generator: 'nexus',
    output: './src/graphql',

    // Exclude specific fields globally
    excludeFields: ['password', 'hash', 'salt'],

    // Exclude specific models or operations
    excludeModels: [
      { name: 'InternalLog', queries: true, mutations: true },
      { name: 'Session', mutations: true },
    ],

    // Exclude fields per model
    excludeFieldsByModel: {
      User: ['password', 'hash'],
      Post: ['internalNotes'],
    },

    // Exclude specific queries/mutations
    excludeQueriesAndMutations: ['deleteMany', 'updateMany'],

    // Exclude queries/mutations per model
    excludeQueriesAndMutationsByModel: {
      User: ['deleteMany'],
      Post: ['updateMany'],
    },

    // Disable all queries or mutations
    disableQueries: false,
    disableMutations: false,

    // Custom Prisma client name
    prismaName: 'prisma',

    // JavaScript output instead of TypeScript
    javaScript: false,
  },

  frontend: {
    admin: {
      models: ['User', 'Post', 'Category'],
      output: './src/admin/pages',
      pageContent: 'custom-template.tsx',
    },

    graphql: {
      output: './src/graphql/generated',
      models: ['User', 'Post'],
    },
  },
};
```

## Generator Types

### Nexus Generator

Generates Nexus GraphQL schema with type-safe resolvers.

```javascript
{
  backend: {
    generator: 'nexus',
    output: './src/graphql',
  }
}
```

**Generated Files:**

- `types.ts` - Nexus type definitions
- `queries.ts` - Query resolvers
- `mutations.ts` - Mutation resolvers
- `index.ts` - Combined exports

### SDL Generator

Generates Schema Definition Language files with resolvers.

```javascript
{
  backend: {
    generator: 'sdl',
    output: './src/graphql',
  }
}
```

**Generated Files:**

- `typeDefs.ts` - GraphQL type definitions
- `resolvers.ts` - Resolver functions
- `index.ts` - Combined exports

### GraphQL Modules Generator

Generates modular GraphQL architecture using GraphQL Modules.

```javascript
{
  backend: {
    generator: 'graphql-modules',
    output: './src/graphql',
  }
}
```

**Generated Files:**

- `modules/` - Individual model modules
- `inputs/` - Input type definitions
- `app.ts` - Application module

## Auto-Completion

Enable CLI auto-completion for oh-my-zsh:

```bash
pal generate --autoComplete ~/.oh-my-zsh/custom/plugins/
```

Then add `paljs` to your plugins in `~/.zshrc`:

```bash
plugins=(... paljs)
```

## Examples

### Complete Project Setup

```bash
# 1. Create new project
pal create my-blog --framework "Tailwind CSS + PrismaAdmin UI"

# 2. Navigate to project
cd my-blog

# 3. Update your Prisma schema
# Edit prisma/schema.prisma

# 4. Generate database migration
npx prisma migrate dev

# 5. Generate GraphQL CRUD operations
pal generate

# 6. Generate admin interface
pal generate admin

# 7. Start development server
npm run dev
```

### Working with Specific Models

```bash
# Generate only for User model
pal generate User

# Generate queries only for Post model
pal generate Post queries

# Generate admin interface for specific models
pal generate User,Post,Category admin
```

### Schema Conversion Workflow

```bash
# Convert schema to TypeScript types
pal schema typescript --output-path ./src/types

# Convert to JSON for external tools
pal schema json --type json --output-path ./tools

# Convert snake_case to camelCase
pal schema camel-case
```

## Integration with Development Workflow

### Package.json Scripts

```json
{
  "scripts": {
    "generate": "pal generate",
    "generate:admin": "pal generate admin",
    "schema:types": "pal schema typescript",
    "db:generate": "prisma generate && pal generate"
  }
}
```

### CI/CD Integration

```yaml
# .github/workflows/generate.yml
name: Generate Code
on:
  push:
    paths:
      - 'prisma/schema.prisma'

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: pal generate
      - run: git add .
      - run: git commit -m "Auto-generate code" || exit 0
      - run: git push
```

## Troubleshooting

### Common Issues

1. **Schema file not found**

   ```bash
   # Specify custom schema path
   pal generate --schema ./custom/path/schema.prisma
   ```

2. **Config file not found**

   ```bash
   # Use custom config file
   pal generate --config custom.config.js
   ```

3. **Permission errors**
   ```bash
   # Install globally with proper permissions
   sudo npm install -g @paljs/cli
   ```

### Debug Mode

Enable debug output:

```bash
DEBUG=paljs* pal generate
```

## Contributing

This package is part of the PalJS ecosystem. For contributing guidelines, please refer to the main repository.

## License

MIT License - see the LICENSE file for details.
