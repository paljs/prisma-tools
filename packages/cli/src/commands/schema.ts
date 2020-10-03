import { Command, flags } from '@oclif/command';
import { ConvertSchemaToObject, CamelCase } from '@paljs/schema';
import { join } from 'path';
import { SchemaObject } from '@paljs/types';
import { format, Options } from 'prettier';
import { writeFileSync } from 'fs';
import { log } from '@paljs/display';
import { getSchemaPath } from '../util/getSchemaPath';

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
    schema: flags.string({
      char: 's',
      description: 'You can pass custom schema file path',
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

    const schemaPath = await getSchemaPath(flags.schema);

    if (args.converter === 'json') {
      const spinner = log
        .spinner(log.withBrand('Generating your file'))
        .start();
      const schemaObject = new ConvertSchemaToObject(schemaPath).run();
      schemaFile(flags['output-path'], schemaObject, flags.type as Output);
      spinner.succeed('Your file generated successfully');
    } else if (args.converter === 'camel-case') {
      const spinner = log
        .spinner(log.withBrand('Converting your schema'))
        .start();
      const camelCase = new CamelCase(schemaPath);
      await camelCase.convert();
      spinner.succeed('Your schema converted successfully');
    }
  }
}
