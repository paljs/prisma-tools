# @paljs/create

A powerful project scaffolding package for creating full-stack applications with Prisma, GraphQL, and modern frontend frameworks. This package provides templates and automation for rapid project initialization with best practices built-in.

## Installation

```bash
npm install @paljs/create
# or
yarn add @paljs/create
# or  
pnpm add @paljs/create

# Global installation for CLI usage
npm install -g @paljs/create
```

## Dependencies

This package includes the following dependencies:
- `@paljs/display` - Styled console output
- `@paljs/types` - Type definitions
- `cross-spawn` - Cross-platform process spawning
- `fs-extra` - Enhanced file system utilities
- `got` - HTTP request library
- `chalk` - Terminal string styling

## Features

- 🚀 **Multiple Templates** - Pre-built project templates for different architectures
- 🎨 **Framework Integration** - Support for Material UI, Tailwind CSS, and Chakra UI
- 🏗️ **Multi-Schema Support** - Templates for multi-database architectures
- 📦 **Package Management** - Automatic dependency installation and management
- 🔧 **Git Integration** - Automatic git repository initialization
- 🎯 **TypeScript Support** - Full TypeScript templates with proper configuration
- ⚡ **Fast Setup** - Optimized template copying and dependency resolution

## Available Templates

### Core Templates

```typescript
type CliGeneratedExamples = 
  | 'apollo-nexus-schema'     // Apollo Server with Nexus schema-first
  | 'apollo-sdl-first'        // Apollo Server with SDL-first approach  
  | 'graphql-modules'         // GraphQL Modules architecture
  | 'full-stack-nextjs';      // Complete Next.js application
```

### Framework Options

```typescript
type Frameworks =
  | 'Material UI'                    // Material UI only
  | 'Material UI + PrismaAdmin UI'   // Material UI with admin interface
  | 'Tailwind CSS'                   // Tailwind CSS only
  | 'Tailwind CSS + PrismaAdmin UI'  // Tailwind CSS with admin interface
  | 'Chakra UI'                      // Chakra UI only
  | 'Chakra UI + PrismaAdmin UI';    // Chakra UI with admin interface
```

## Main Exports

### AppGenerator Class

The main class for generating applications from templates.

```typescript
import { AppGenerator } from '@paljs/create';

interface AppGeneratorOptions {
  example: CliGeneratedExamples;
  framework?: Frameworks;
  multi?: string | boolean;
  useGit?: string | boolean;
  destinationRoot: string;
  name: string;
  description: string;
  author: string;
  yarn: boolean;
  skipInstall: string | boolean;
  repository: string;
  manager: string;
}

// Create and run generator
const generator = new AppGenerator(options);
await generator.run();
```

## Usage Examples

### Basic Project Creation

```typescript
import { AppGenerator } from '@paljs/create';

const options = {
  example: 'full-stack-nextjs',
  framework: 'Tailwind CSS + PrismaAdmin UI',
  name: 'my-awesome-app',
  description: 'A full-stack application with Prisma and GraphQL',
  author: 'Your Name',
  repository: 'https://github.com/username/my-awesome-app',
  destinationRoot: './my-awesome-app',
  manager: 'yarn',
  yarn: true,
  skipInstall: false,
  useGit: true,
  multi: false
};

const generator = new AppGenerator(options);
await generator.run();
```

### CLI Integration

```typescript
import { AppGenerator } from '@paljs/create';
import { log } from '@paljs/display';

async function createProject(answers: any) {
  log.branded('Creating your PalJS project...');
  
  const options = {
    example: answers.example,
    framework: answers.framework,
    name: answers.name,
    description: answers.description,
    author: answers.author,
    repository: answers.repository,
    destinationRoot: answers.name,
    manager: answers.manager,
    yarn: answers.manager === 'yarn',
    skipInstall: answers.skipInstall === 'yes',
    useGit: answers.useGit === 'yes',
    multi: answers.multi === 'yes'
  };
  
  try {
    const generator = new AppGenerator(options);
    await generator.run();
    
    log.success('Project created successfully!');
    log.meta(`cd ${answers.name} && ${answers.manager} dev`);
    
  } catch (error) {
    log.error('Project creation failed');
    log.error(error.message);
    throw error;
  }
}
```

### Multi-Schema Project

```typescript
import { AppGenerator } from '@paljs/create';

// Create multi-schema project
const multiSchemaOptions = {
  example: 'full-stack-nextjs',
  framework: 'Material UI + PrismaAdmin UI', 
  name: 'multi-tenant-app',
  description: 'Multi-tenant application with separate schemas',
  author: 'Developer',
  repository: 'https://github.com/company/multi-tenant-app',
  destinationRoot: './multi-tenant-app',
  manager: 'pnpm',
  yarn: false,
  skipInstall: false,
  useGit: true,
  multi: true // Enable multi-schema template
};

const generator = new AppGenerator(multiSchemaOptions);
await generator.run();
```

### Custom Configuration

```typescript
import { AppGenerator } from '@paljs/create';

class CustomAppGenerator extends AppGenerator {
  constructor(options) {
    super(options);
  }
  
  // Override to add custom logic
  async postWrite() {
    await super.postWrite();
    
    // Add custom post-generation steps
    await this.setupCustomConfiguration();
    await this.generateAdditionalFiles();
  }
  
  async setupCustomConfiguration() {
    // Custom configuration logic
    console.log('Setting up custom configuration...');
  }
  
  async generateAdditionalFiles() {
    // Generate additional project files
    console.log('Generating additional files...');
  }
}

// Use custom generator
const customGenerator = new CustomAppGenerator(options);
await customGenerator.run();
```

## Template Details

### Apollo Nexus Schema Template

Creates a GraphQL API using Apollo Server with Nexus schema-first approach.

**Features:**
- Type-safe GraphQL schema with Nexus
- Prisma integration
- Auto-generated CRUD operations
- Custom scalar types
- Authentication middleware

**Generated Structure:**
```
src/
├── graphql/
│   ├── types/
│   ├── resolvers/
│   └── schema.ts
├── prisma/
│   └── schema.prisma
└── server.ts
```

### Apollo SDL First Template

Creates a GraphQL API using Apollo Server with SDL-first approach.

**Features:**
- SDL type definitions
- Resolver functions
- Schema stitching support
- Custom directives
- File upload support

**Generated Structure:**
```
src/
├── graphql/
│   ├── typeDefs/
│   ├── resolvers/
│   └── schema.ts
├── prisma/
│   └── schema.prisma
└── server.ts
```

### GraphQL Modules Template

Creates a modular GraphQL architecture using GraphQL Modules.

**Features:**
- Modular schema organization
- Dependency injection
- Testing utilities
- Performance monitoring
- Scalable architecture

**Generated Structure:**
```
src/
├── modules/
│   ├── user/
│   ├── post/
│   └── common/
├── app.ts
└── server.ts
```

### Full-Stack Next.js Template

Creates a complete full-stack application with Next.js frontend and GraphQL API.

**Features:**
- Next.js with TypeScript
- GraphQL API routes
- Admin dashboard
- Authentication system
- Responsive design
- Database management

**Generated Structure:**
```
src/
├── components/
├── pages/
│   ├── api/graphql/
│   ├── admin/
│   └── auth/
├── graphql/
├── prisma/
└── styles/
```

## Framework Integration

### Material UI Integration

```typescript
// Generates projects with Material UI components
const materialOptions = {
  example: 'full-stack-nextjs',
  framework: 'Material UI + PrismaAdmin UI',
  // ... other options
};

// Includes:
// - Material UI components
// - Theme configuration
// - Admin interface components
// - Responsive layouts
// - Icon system
```

### Tailwind CSS Integration

```typescript
// Generates projects with Tailwind CSS
const tailwindOptions = {
  example: 'full-stack-nextjs', 
  framework: 'Tailwind CSS + PrismaAdmin UI',
  // ... other options
};

// Includes:
// - Tailwind CSS configuration
// - Custom utility classes
// - Responsive design system
// - Dark mode support
// - Component library
```

### Chakra UI Integration

```typescript
// Generates projects with Chakra UI
const chakraOptions = {
  example: 'full-stack-nextjs',
  framework: 'Chakra UI + PrismaAdmin UI', 
  // ... other options
};

// Includes:
// - Chakra UI provider
// - Theme customization
// - Accessible components
// - Color mode support
// - Admin components
```

## Advanced Features

### Package Management

The generator automatically handles package management:

```typescript
// Supports multiple package managers
const options = {
  manager: 'yarn',   // 'yarn', 'npm', 'pnpm'
  skipInstall: false // Skip automatic installation
};

// Features:
// - Latest version resolution
// - Dependency conflict resolution  
// - Lockfile generation
// - Progress reporting
```

### Git Integration

Automatic git repository initialization:

```typescript
const options = {
  useGit: true // Initialize git repository
};

// Features:
// - Git repository initialization
// - Initial commit creation
// - .gitignore file generation
// - Branch setup
```

### Multi-Schema Support

Support for multi-database architectures:

```typescript
const options = {
  multi: true // Enable multi-schema template
};

// Generates:
// - Multiple Prisma schemas
// - Separate database configurations
// - Schema-specific resolvers
// - Cross-schema relationships
```

### Custom Templates

Extend templates with custom functionality:

```typescript
import { AppGenerator } from '@paljs/create';
import { copySync, writeJSONSync } from 'fs-extra';

class ExtendedGenerator extends AppGenerator {
  async run() {
    await super.run();
    
    // Add custom template files
    await this.addCustomFiles();
    
    // Modify generated files
    await this.modifyConfiguration();
  }
  
  async addCustomFiles() {
    copySync('./custom-templates', this.destinationPath());
  }
  
  async modifyConfiguration() {
    const packageJson = require(this.destinationPath('package.json'));
    packageJson.scripts.custom = 'echo "Custom script"';
    writeJSONSync(this.destinationPath('package.json'), packageJson, { spaces: 2 });
  }
}
```

## Error Handling

```typescript
import { AppGenerator } from '@paljs/create';
import { log } from '@paljs/display';

async function createProjectWithErrorHandling(options) {
  try {
    const generator = new AppGenerator(options);
    await generator.run();
    
    log.success('Project created successfully!');
    
  } catch (error) {
    if (error.message.includes('ENOENT')) {
      log.error('Template files not found');
      log.meta('Make sure all template files are available');
    } else if (error.message.includes('EACCES')) {
      log.error('Permission denied');
      log.meta('Check file permissions and try again');
    } else if (error.message.includes('network')) {
      log.error('Network error during dependency installation');
      log.meta('Check your internet connection and try again');
    } else {
      log.error(`Project creation failed: ${error.message}`);
    }
    
    throw error;
  }
}
```

## Performance Optimization

### Template Caching

```typescript
// Templates are cached for faster subsequent generations
const generator = new AppGenerator(options);

// First run: Downloads and caches templates
await generator.run();

// Subsequent runs: Uses cached templates
await generator.run();
```

### Parallel Processing

```typescript
// Dependencies are resolved in parallel
await Promise.all([
  generator.updatePackages(),
  generator.setupGit(),
  generator.formatCode()
]);
```

## Integration Examples

### With Inquirer.js

```typescript
import inquirer from 'inquirer';
import { AppGenerator } from '@paljs/create';

const questions = [
  {
    type: 'list',
    name: 'example',
    message: 'Select project template:',
    choices: [
      'apollo-nexus-schema',
      'apollo-sdl-first', 
      'graphql-modules',
      'full-stack-nextjs'
    ]
  },
  {
    type: 'list',
    name: 'framework',
    message: 'Select UI framework:',
    choices: [
      'Material UI',
      'Material UI + PrismaAdmin UI',
      'Tailwind CSS',
      'Tailwind CSS + PrismaAdmin UI'
    ]
  }
];

const answers = await inquirer.prompt(questions);
const generator = new AppGenerator({
  ...answers,
  name: 'my-project',
  // ... other options
});

await generator.run();
```

### With Commander.js

```typescript
import { Command } from 'commander';
import { AppGenerator } from '@paljs/create';

const program = new Command();

program
  .command('create <name>')
  .option('-e, --example <type>', 'project template')
  .option('-f, --framework <framework>', 'UI framework')
  .option('--multi', 'multi-schema project')
  .option('--skip-install', 'skip dependency installation')
  .action(async (name, options) => {
    const generator = new AppGenerator({
      name,
      example: options.example || 'full-stack-nextjs',
      framework: options.framework,
      multi: options.multi,
      skipInstall: options.skipInstall,
      // ... other options
    });
    
    await generator.run();
  });

program.parse();
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import type { AppGeneratorOptions, Frameworks, CliGeneratedExamples } from '@paljs/create';

const options: AppGeneratorOptions = {
  example: 'full-stack-nextjs',
  framework: 'Tailwind CSS + PrismaAdmin UI',
  name: 'typed-project',
  description: 'A type-safe project',
  author: 'Developer',
  repository: 'https://github.com/user/typed-project',
  destinationRoot: './typed-project',
  manager: 'yarn',
  yarn: true,
  skipInstall: false,
  useGit: true,
  multi: false
};
```

## Contributing

This package is part of the PalJS ecosystem. For contributing guidelines, please refer to the main repository.

## License

MIT License - see the LICENSE file for details.
