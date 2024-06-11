import { existsSync, readFileSync } from 'fs';
import { Field } from '@paljs/types';
import { log, chalk } from '@paljs/display';

export class PrismaReader {
  data: string;

  constructor(protected path: string) {
    this.checkIfSchemaExit();
    this.data = readFileSync(path, { encoding: 'utf-8' });
  }

  get models() {
    return this.data.match(/\n(model(\s)[\s\S]*?})\r?\n/g);
  }

  get enums() {
    return this.data.match(/\n(enum(\s)[\s\S]*?})\r?\n/g);
  }

  getModelDocumentation(modelName: string) {
    return this.data
      .split(/\n/)
      .reverse()
      .filter((_item, index, array) => array.indexOf(`model ${modelName} {`) < index)
      .filter((_item, index, array) => array.indexOf(`}`) > index)
      .filter(Boolean)
      .join('\n');
  }

  blockLines(block: string) {
    return block.split(/\n/).filter((v) => v);
  }

  checkIfSchemaExit() {
    if (!existsSync(this.path)) {
      log.error(`Error: ${chalk.blue('schema.prisma')} file not found in ${chalk.blue(this.path)}`);
      process.exit();
    }
  }

  getType(line: string[]) {
    return line[1].replace('?', '').replace('[]', '');
  }

  getKind(type: string) {
    return this.data.includes(`enum ${type} `) ? 'enum' : this.data.includes(`model ${type} `) ? 'object' : 'scalar';
  }

  getClassName(lines: string[]) {
    return this.lineArray(lines[0])[1];
  }

  lineArray(line: string) {
    return line
      .replace(/[\n\r]/g, '')
      .split(' ')
      .filter(Boolean);
  }

  getMap(line: string) {
    const value = line.match(/@map\((.*?)\)/);
    if (value) {
      return value[1].replace(/name/, '').replace(':', '').replace(' ', '').replace(/"/g, '');
    }
    return undefined;
  }

  getRelation(line: string) {
    const relationString = line.match(/@relation\((.*?)\)/);
    if (relationString) {
      const relation: Field['relation'] = {};
      const name = relationString[1].match(/"(\w+)"/);
      if (name) {
        relation.name = name[1];
      }
      ['fields', 'references'].forEach((item) => {
        const pattern = new RegExp(`${item}:[\\s\\S]\\[(.*?)\\]`);
        const values = relationString[1].match(pattern);
        if (values) {
          const asArray = values[1]
            .replace(/ /g, '')
            .split(',')
            .filter((v) => v);
          if (asArray.length > 0) {
            relation[item as 'fields' | 'references'] = asArray;
          }
        }
      });
      return relation;
    }
    return undefined;
  }
}
