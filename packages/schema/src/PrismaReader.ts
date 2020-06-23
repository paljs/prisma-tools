import { existsSync, readFileSync } from 'fs';
import { Field } from '@paljs/types';
import { log } from '@paljs/display';
import chalk from 'chalk';

export class PrismaReader {
  protected data: string;

  constructor(protected path: string) {
    this.checkIfSchemaExit();
    this.data = readFileSync(path, { encoding: 'utf-8' });
  }

  protected get models() {
    return this.data.match(/\n(model(\s)[\s\S]*?})/g);
  }

  protected get enums() {
    return this.data.match(/\n(enum(\s)[\s\S]*?})/g);
  }

  protected blockLines(block: string) {
    return block.split(/\n/).filter((v) => v);
  }

  protected checkIfSchemaExit() {
    if (!existsSync(this.path)) {
      log.error(
        `Error: ${chalk.blue('schema.prisma')} file not found in ${chalk.blue(
          this.path,
        )}`,
      );
      process.exit();
    }
  }

  protected getClassName(lines: string[]) {
    return this.lineArray(lines[0])[1];
  }

  protected lineArray(line: string) {
    return line
      .replace(/[\n\r]/g, '')
      .split(' ')
      .filter((v) => v);
  }

  protected getMap(line: string) {
    const value = line.match(/@map\((.*?)\)/);
    if (value) {
      return value[1]
        .replace(/name/, '')
        .replace(':', '')
        .replace(' ', '')
        .replace(/"/g, '');
    }
    return undefined;
  }

  protected getRelation(line: string) {
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
