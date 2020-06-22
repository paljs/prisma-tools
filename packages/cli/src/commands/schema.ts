import { Command, flags } from '@oclif/command';
import { ConvertSchemaToObject, CamelCase } from '@paljs/schema';
import { join } from 'path';
import { SchemaObject } from '@paljs/types';
import { format, Options } from 'prettier';
import { writeFileSync } from 'fs';
import { getConfig } from '../util/getGonfig';
import { log } from '@paljs/display';

export default class Schema extends Command {
  static description =
    'Prisma schema file converter to json object or change Snack case to Camel case';

  static flags = {
    help: flags.help({ char: 'h' }),
    'output-path': flags.string({
      char: 'o',
      default: 'src/',
      description: 'folder path for converted file',
    }),
    type: flags.enum({
      char: 't',
      description: 'type of output file type when you convert to json',
      options: ['js', 'ts', 'json'],
      default: 'ts',
    }),
    config: flags.string({
      char: 'c',
      default: 'pal',
      description: 'You can pass custom config file name',
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
  static aliases = ['s'];
  async run() {
    const { args, flags } = this.parse(Schema);
    const config = await getConfig(flags, false);

    if (args.converter === 'json') {
      const spinner = log
        .spinner(log.withBrand('Generating your file'))
        .start();
      const schemaObject = new ConvertSchemaToObject(
        join(config?.schemaFolder || 'prisma/', 'schema.prisma'),
      ).run();
      schemaFile(flags['output-path'], schemaObject, flags.type as Output);
      spinner.succeed();
    } else if (args.converter === 'camel-case') {
      const spinner = log
        .spinner(log.withBrand('Converting your schema'))
        .start();
      new CamelCase(
        join(config?.schemaFolder || 'prisma/', 'schema.prisma'),
      ).convert();
      spinner.succeed();
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
