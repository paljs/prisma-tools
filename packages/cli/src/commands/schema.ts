import { Command, Flags } from '@oclif/core';
import { ConvertSchemaToObject, CamelCase, GenerateTypeScript } from '@paljs/schema';
import { join } from 'path';
import { SchemaObject } from '@paljs/types';
import { format, Options } from 'prettier';
import { writeFileSync, mkdirSync } from 'fs';
import { log } from '@paljs/display';
import { getSchemaPath } from '@paljs/utils';

type Output = 'js' | 'ts' | 'json';

const schemaFile = async (path: string, schema: SchemaObject, output: Output) => {
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

  const fileContent = await format(content[output].text, {
    singleQuote: true,
    semi: false,
    trailingComma: 'all',
    parser: content[output].parser,
  });

  writeFileSync(join(path, `schema.${output}`), fileContent);
};

export default class Schema extends Command {
  static description = `Prisma schema file converter to: 1- json object. 2- change Snack case to Camel case. 3- TypeScript type definitions. `;

  static flags = {
    help: Flags.help({ char: 'h' }),
    'output-path': Flags.string({
      char: 'o',
      default: 'src/',
      description: 'folder path for converted file',
    }),
    type: Flags.enum({
      char: 't',
      description: 'type of output file type when you convert to json',
      options: ['js', 'ts', 'json'],
      default: 'ts',
    }),
    schema: Flags.string({
      char: 's',
      description: 'You can pass custom schema file path',
    }),
  };

  static args = [
    {
      name: 'converter',
      required: true,
      options: ['json', 'camel-case', 'typescript'],
      description: 'specify what is the function you need',
    },
  ];

  static aliases = ['s'];

  async run() {
    // eslint-disable-next-line no-useless-catch
    try {
      const { args, flags } = await this.parse(Schema);

      const schemaPath = await getSchemaPath(flags.schema);
      // json convertor
      if (args.converter === 'json') {
        const spinner = log.spinner(log.withBrand('Generating your file')).start();
        const schemaObject = new ConvertSchemaToObject(schemaPath).run();
        await schemaFile(flags['output-path'], schemaObject, flags.type as Output);
        spinner.succeed('Your file generated successfully');
      }
      // camel case convertor
      else if (args.converter === 'camel-case') {
        const spinner = log.spinner(log.withBrand('Converting your schema')).start();
        const camelCase = new CamelCase(schemaPath);
        await camelCase.convert();
        spinner.succeed('Your schema converted successfully');
      }
      // TypeScript convertor
      else if (args.converter === 'typescript') {
        const spinner = log.spinner(log.withBrand('Converting your schema')).start();
        const code = new GenerateTypeScript(schemaPath).run();
        mkdirSync(flags['output-path'], { recursive: true });
        writeFileSync(
          join(flags['output-path'], `schema.ts`),
          await format(code, {
            singleQuote: true,
            trailingComma: 'all',
            parser: 'babel-ts',
          }),
        );
        spinner.succeed('Your schema converted successfully');
      }
    } catch (error: any) {
      throw error;
    }
  }
}
