import { Command, flags } from '@oclif/command';
import { convertSchemaToObject, camelCase } from '@paljs/schema';
import { join } from 'path';
import { SchemaObject } from '@paljs/types';
import { format, Options } from 'prettier';
import { writeFileSync } from 'fs';
import { Config } from '@paljs/types';


export default class Schema extends Command {
  static description =
    'Prisma schema file converter to json object or change Snack case to Camel case';

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    'output-path': flags.string({
      char: 'o',
      default: 'prisma/',
      description: 'folder path for converted file',
    }),
    type: flags.enum({
      char: 't',
      description: 'type of output file type when you convert to json',
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
    console.log('userConfig')
    const userConfig = await import(join(this.config.root, 'pal'))
    const config: Config = userConfig.default ?? userConfig
    const { args, flags } = this.parse(Schema);
    if (args.converter === 'json') {
      const schemaObject = convertSchemaToObject(
        join(config.schemaFolder || 'prisma/', 'schema.prisma'),
      );
      schemaFile( config.schemaFolder || flags['output-path'], schemaObject, flags.type as Output);
    } else if (args.converter === 'camel-case') {
      camelCase(join(config.schemaFolder || 'prisma/', 'schema.prisma'));
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
      text: `import { SchemaObject } from '@paljs/types';

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
