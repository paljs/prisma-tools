import { Command, flags } from '@oclif/command';
import { convertSchemaToObject } from './json';
import { join } from 'path';
import { SchemaObject } from './types';
import { format, Options } from 'prettier';
import { writeFileSync } from 'fs';
import { camelCase } from './camelCase';

class PrismaToolsSchema extends Command {
  static description =
    'Prisma schema file converter to json object or change underscore to camel case';

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    path: flags.string({
      char: 'p',
      default: 'prisma/',
      description: 'Add your schema.prisma file folder',
    }),
    output: flags.enum({
      char: 'o',
      description: 'Output file type when you convert to json',
      options: ['js', 'ts', 'json'],
      default: 'ts',
    }),
  };

  static args = [
    {
      name: 'converter',
      required: true,
      options: ['json', 'camel-case'],
      description: 'specify what is the function you need',
    },
  ];

  async run() {
    // can get args as an object
    const { args, flags } = this.parse(PrismaToolsSchema);
    if (args.converter === 'json') {
      const schemaObject = convertSchemaToObject(
        join(flags.path, 'schema.prisma'),
      );
      schemaFile(flags.path, schemaObject, flags.output as Output);
    } else if (args.converter === 'camel-case') {
      camelCase(join(flags.path, 'schema.prisma'));
    }
  }
}
type Output = 'js' | 'ts' | 'json';

const schemaFile = (path: string, schema: SchemaObject, output: Output) => {
  const content: {
    [key in Output]: {
      text: string;
      parser: Options['parser'];
    };
  } = {
    json: {
      text: JSON.stringify(schema),
      parser: 'json',
    },
    js: {
      text: `export default ${JSON.stringify(schema)}`,
      parser: 'babel',
    },
    ts: {
      text: `import { SchemaObject } from '@prisma-tools/schema';

export const schema: SchemaObject = ${JSON.stringify(schema)}`,
      parser: 'babel-ts',
    },
  };

  const fileContent = format(content[output].text, {
    singleQuote: true,
    semi: false,
    trailingComma: 'all',
    parser: content[output].parser,
  });

  writeFileSync(join(path, `schema.${output}`), fileContent);
};

export = PrismaToolsSchema;
