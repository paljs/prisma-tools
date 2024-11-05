import { writeFileSync } from 'fs';
import { PrismaReader } from './PrismaReader';
import { formatSchema } from '@paljs/utils';
import os from 'os';

export class CamelCase extends PrismaReader {
  async convert(returnString = false): Promise<string | void> {
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
          // check if we are in the first line that has the model name
          // check if we need to change this model name
          if (i === 0 && CamelCase.checkIfModelNameNeedToConvert(line[1])) {
            // add a map with the old model name
            lines.splice(1, 0, `@@map("${modelName}")`);
            // get the new model name converted to the camel case
            line[1] = this.convertWord(line[1], true);
            // update the model name in the original string
            lines[0] = line.join(' ');
          }
          // check if this line is a field not an attributes or a comment
          else if (!lines[i].includes('@@') && !lines[i].includes('//')) {
            const kind = this.getKind(this.getType(line));
            const fieldName = line[0];
            const type = line[1];
            if (fieldName.includes('_')) {
              if (kind !== 'object') line.push(`@map("${fieldName}")`); // keep the original field name for @map
              line[0] = this.convertWord(fieldName);
              fieldsList.push({
                old: fieldName,
                new: line[0],
              });
            }
            if (CamelCase.checkIfModelNameNeedToConvert(type) && kind === 'object') {
              line[1] = this.convertWord(type, true);
            }
            lines[i] = line.join(' ');
          }
        }
        for (const field of fieldsList) {
          const fieldPattern = new RegExp(`\\b${field.old}\\b`, 'g'); // use word boundaries to match whole words only
          lines.forEach((line, index) => {
            if (!line.endsWith(`@map("${field.old}")`)) {
              lines[index] = line.replace(fieldPattern, field.new);
            }
          });
        }
        const newModel = lines.join(`
`);

        const pattern = new RegExp(`model ${modelName}[\\s\\S]*?}\n`);
        newData = newData.replace(pattern, newModel);
      }

      let [[, output]] = await formatSchema({
        schemas: [['schema.prisma', newData]],
      });

      output = output.trimEnd() + os.EOL;

      if (returnString) {
        return output;
      }

      writeFileSync(this.path, output);
    }
  }

  // convert word to camel case
  private convertWord(word: string, model = false) {
    return word
      .split('_')
      .map((item, index) =>
        !model && index === 0 ? item.toLowerCase() : item.charAt(0).toUpperCase() + item.slice(1).toLowerCase(),
      )
      .join('');
  }

  // check is the word start with a lower case letter
  private static checkFirstLetterLowerCase(word: string) {
    return word[0] === word[0].toLowerCase();
  }

  /*
   * check if the model name starts with a lower case or has an underscore
   */
  private static checkIfModelNameNeedToConvert(modelName: string) {
    return modelName.includes('_') || CamelCase.checkFirstLetterLowerCase(modelName);
  }
}
