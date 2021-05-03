import { writeFileSync } from 'fs';
import { PrismaReader } from './PrismaReader';
import { formatSchema } from '@prisma/sdk';
import os from 'os';

export class CamelCase extends PrismaReader {
  constructor(path: string) {
    super(path);
  }
  async convert() {
    let newData = this.data;
    if (this.models) {
      for (const model of this.models) {
        const lines = this.blockLines(model);
        let modelName = '';
        const fieldsList: {
          old: string;
          new: string;
        }[] = [];
        for (let i = 0; i + 1 < lines.length; i++) {
          const line = this.lineArray(lines[i]);
          if (i === 0) {
            modelName = line[1];
          }
          if (i === 0 && line[1].includes('_')) {
            lines.splice(1, 0, `@@map("${modelName}")`);
            line[1] = this.convertWord(line[1]);
            lines[0] = line.join(' ');
          } else if (!lines[i].includes('@@') && !lines[i].includes('//')) {
            const line = lines[i].replace(/[\n\r]/g, '').split(' ');
            const cleanLine = this.lineArray(lines[i]);
            const kind = this.getKind(this.getType(cleanLine));
            if (cleanLine[0].includes('_') && kind !== 'object') {
              const index = line.indexOf(cleanLine[0]);
              line.push(`@map("${cleanLine[0]}")`);
              line[index] = this.convertWord(cleanLine[0]);
              fieldsList.push({
                old: cleanLine[0],
                new: line[index],
              });
            }
            if (cleanLine[1].includes('_') && kind !== 'enum') {
              const index = line.indexOf(cleanLine[1]);
              line[index] = this.convertWord(cleanLine[1]);
            }
            lines[i] = line.join(' ');
          }
        }
        for (const field of fieldsList) {
          const fieldPattern = new RegExp(field.old, 'g');
          lines.forEach((line, index) => {
            if (!line.endsWith(`@map("${field.old}")`)) {
              lines[index] = line.replace(fieldPattern, field.new);
            }
          });
        }
        let newModel = lines.join(`
`);

        const pattern = new RegExp(`model ${modelName}[\\s\\S]*?\\}`);
        newData = newData.replace(pattern, newModel);
      }

      let output = await formatSchema({
        schema: newData,
      });

      output = output.trimEnd() + os.EOL;

      writeFileSync(this.path, output);
    }
  }

  private convertWord(word: string) {
    return word
      .split('_')
      .map((item, index) => item.charAt(0).toUpperCase() + item.slice(1),
      )
      .join('');
  }
}
