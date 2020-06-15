import { readFileSync, writeFileSync } from 'fs';
import { lineArray } from './json';

export function camelCase(path: string) {
  const data = readFileSync(path, { encoding: 'utf-8' });
  const models = data.match(/model[\s\S]*?\}/g);
  let newData = data;
  if (models) {
    for (const model of models) {
      const lines = model.split(/\n/).filter((v) => v);
      let modelName = '';
      const fieldsList: {
        old: string;
        new: string;
      }[] = [];
      for (let i = 0; i + 1 < lines.length; i++) {
        const line = lineArray(lines[i]);
        if (i === 0) {
          modelName = line[1];
        }
        if (i === 0 && line[1].includes('_')) {
          lines.splice(1, 0, `@@map("${modelName}")`);
          line[1] = convertWord(line[1], true);
          lines[0] = line.join(' ');
        } else if (!lines[i].includes('@@') && !lines[i].includes('//')) {
          const line = lines[i].replace(/[\n\r]/g, '').split(' ');
          const cleanLine = lineArray(lines[i]);
          if (cleanLine[0].includes('_')) {
            const index = line.indexOf(cleanLine[0]);
            line.push(`@map("${cleanLine[0]}")`);
            line[index] = convertWord(cleanLine[0]);
            fieldsList.push({
              old: cleanLine[0],
              new: line[index],
            });
          }
          if (cleanLine[1].includes('_')) {
            const index = line.indexOf(cleanLine[1]);
            line[index] = convertWord(cleanLine[1], true);
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

    writeFileSync(path, newData);
  }
}

function convertWord(word: string, model = false) {
  return word
    .split('_')
    .map((item, index) =>
      !model && index === 0
        ? item
        : item.charAt(0).toUpperCase() + item.slice(1),
    )
    .join('');
}
