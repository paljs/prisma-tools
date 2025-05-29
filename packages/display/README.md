# @paljs/display

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Configuration](#configuration)
- [License](#license)

# Introduction

A comprehensive logging and display utility package for the PalJS CLI and related tools. This package provides styled console output, spinners, and debugging utilities with a consistent brand experience.

# Installation

```bash
npm install @paljs/display
# or
yarn add @paljs/display
# or
pnpm add @paljs/display
```

## Dependencies

This package includes the following dependencies:

- `chalk` ^4.1.2 - Terminal string styling
- `debug` ^4.3.4 - Debug utility
- `ora` ^5.4.1 - Elegant terminal spinners
- `readline` ^1.3.0 - Terminal interface utilities

# Usage

## Main Exports

### log Object

The main export containing all logging utilities:

```typescript
import { log } from '@paljs/display';

// Basic usage
log.success('Operation completed successfully!');
log.error('Something went wrong');
log.warning('This is a warning message');
log.info('Information message');
log.progress('Processing...');
log.meta('Subtle metadata');
```

### chalk

Re-exported chalk instance for custom styling:

```typescript
import { chalk } from '@paljs/display';

console.log(chalk.blue.bold('Custom styled text'));
```

## API Reference

### Message Types

#### `log.success(msg: string)`

Displays a green success message with checkmark icon.

```typescript
log.success('Project created successfully!');
// Output: ✔ Project created successfully!
```

#### `log.error(msg: string)`

Displays a red error message with X icon to stderr.

```typescript
log.error('Failed to generate files');
// Output: ✕ Failed to generate files
```

#### `log.warning(msg: string)`

Displays a yellow warning message with warning icon.

```typescript
log.warning('Deprecated feature detected');
// Output: ⚠️  Deprecated feature detected
```

#### `log.info(msg: string)`

Displays a bold informational message.

```typescript
log.info('Starting code generation...');
// Output: Starting code generation...
```

#### `log.progress(msg: string)`

Displays a bold progress message with caret.

```typescript
log.progress('Analyzing schema...');
// Output: > Analyzing schema...
```

#### `log.meta(msg: string)`

Displays a subtle gray metadata message with caret.

```typescript
log.meta('Using Prisma schema from ./prisma/schema.prisma');
// Output: > Using Prisma schema from ./prisma/schema.prisma
```

### Brand Styling

#### `log.branded(msg: string)`

Displays a message in the PalJS brand color (purple).

```typescript
log.branded('PalJS CLI v8.2.0');
// Output: PalJS CLI v8.2.0 (in purple)
```

#### `log.withBrand(str: string)`

Returns a string styled with brand color.

```typescript
const brandedText = log.withBrand('PalJS');
console.log(`Welcome to ${brandedText}!`);
```

### Utility Functions

#### `log.variable(val: string)`

Styles a variable name for display.

```typescript
log.info(`Generated ${log.variable('User')} model`);
// Output: Generated User model (User in cyan)
```

#### `log.newline()`

Prints a blank line.

```typescript
log.newline();
```

#### `log.clearLine(msg?: string)`

Clears the current line and optionally writes a message.

```typescript
log.clearLine('Updated status');
```

### Spinners

#### `log.spinner(str: string)`

Creates an ora spinner instance with custom styling.

```typescript
const spinner = log.spinner('Generating files...');
spinner.start();

// Simulate async work
setTimeout(() => {
  spinner.succeed('Files generated successfully!');
}, 2000);
```

### Advanced Styling

#### `log.withCaret(str: string)`

Adds a gray caret prefix to a string.

```typescript
console.log(log.withCaret('Processing item 1 of 10'));
// Output: > Processing item 1 of 10
```

#### `log.withCheck(str: string)`

Adds a green checkmark prefix to a string.

```typescript
console.log(log.withCheck('Validation passed'));
// Output: ✔ Validation passed
```

#### `log.withX(str: string)`

Adds a red X prefix to a string.

```typescript
console.log(log.withX('Validation failed'));
// Output: ✕ Validation failed
```

#### `log.withWarning(str: string)`

Adds a warning emoji prefix to a string.

```typescript
console.log(log.withWarning('Deprecated API usage'));
// Output: ⚠️  Deprecated API usage
```

### Debug Utilities

#### `log.d(msg: string)`

Debug logger using the 'paljs' namespace.

```typescript
// Enable debug output with DEBUG=paljs
log.d('Debug information');
```

#### `log.throwError(str: string)`

Throws an error with styled message (colors removed in test environment).

```typescript
log.throwError('Critical error occurred');
// Throws: Error: ✕ Critical error occurred
```

#### `log.removeColorInTest(str: string)`

Removes ANSI color codes when NODE_ENV is 'test'.

```typescript
const cleanText = log.removeColorInTest(coloredText);
```

## Usage Examples

### CLI Command Output

```typescript
import { log } from '@paljs/display';

export async function generateCommand() {
  log.branded('PalJS Generator');
  log.newline();

  const spinner = log.spinner('Analyzing Prisma schema...');
  spinner.start();

  try {
    // Simulate schema analysis
    await analyzeSchema();
    spinner.succeed('Schema analysis complete');

    log.progress('Generating GraphQL types...');
    await generateTypes();
    log.success('GraphQL types generated');

    log.progress('Generating resolvers...');
    await generateResolvers();
    log.success('Resolvers generated');

    log.newline();
    log.success('Code generation completed successfully!');
    log.meta(`Generated files in ${log.variable('./src/generated')}`);
  } catch (error) {
    spinner.fail('Generation failed');
    log.error(error.message);
    process.exit(1);
  }
}
```

### Error Handling

```typescript
import { log } from '@paljs/display';

function validateConfig(config: any) {
  if (!config.schema) {
    log.error('Missing required schema configuration');
    log.meta('Add schema path to your paljs.config.js file');
    return false;
  }

  if (config.deprecated) {
    log.warning('Using deprecated configuration options');
    log.meta('Please update your configuration file');
  }

  log.success('Configuration is valid');
  return true;
}
```

### Progress Reporting

```typescript
import { log } from '@paljs/display';

async function processModels(models: string[]) {
  log.info(`Processing ${log.variable(models.length.toString())} models...`);
  log.newline();

  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    log.progress(`Processing ${log.variable(model)} (${i + 1}/${models.length})`);

    try {
      await processModel(model);
      log.success(`${model} processed successfully`);
    } catch (error) {
      log.error(`Failed to process ${model}: ${error.message}`);
    }
  }

  log.newline();
  log.success('All models processed');
}
```

### Debug Mode

```typescript
import { log } from '@paljs/display';

// Enable with DEBUG=paljs environment variable
function debugExample() {
  log.d('Starting debug session');
  log.d('Configuration loaded');
  log.d('Schema parsed successfully');

  // Regular output
  log.info('Debug mode is enabled');
  log.meta('Set DEBUG=paljs to see debug output');
}
```

## Environment Variables

- `DEBUG=paljs` - Enable debug output
- `NODE_ENV=test` - Remove colors from output (useful for testing)

## Integration with Other Packages

This package is primarily used by:

- `@paljs/cli` - Command-line interface
- `@paljs/generator` - Code generation
- `@paljs/create` - Project scaffolding

## TypeScript Support

Full TypeScript support with type definitions included.

```typescript
import { log, chalk } from '@paljs/display';

// All methods are fully typed
log.success('Typed success message');
log.error('Typed error message');

// Chalk is also typed
const styledText: string = chalk.blue.bold('Styled text');
```

# Features

- 🎨 **Styled Console Output** - Consistent branding with colors and icons
- ⏳ **Loading Spinners** - Elegant progress indicators
- 🐛 **Debug Utilities** - Built-in debugging support
- 🎯 **Message Types** - Success, error, warning, info, and progress messages
- 🔧 **Terminal Control** - Line clearing and cursor positioning
- 🧪 **Test-Friendly** - Color removal for test environments

# Configuration

This package uses environment variables for configuration:

- `DEBUG=paljs` - Enable debug output
- `NODE_ENV=test` - Remove colors from output (useful for testing)

# License

MIT License - see LICENSE file for details.
