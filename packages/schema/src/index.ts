import { readFileSync } from 'fs';
import { SchemaObject, Model, Enums, Field } from './types';
export * from './types';

export default function convertSchemaToObject(path: string) {
  const data = readFileSync(path, { encoding: 'utf-8' });
  return getSchemaInObject(data);
}

function getSchemaInObject(data: string) {
  const modelsObject: SchemaObject = {
    models: [],
    enums: [],
  };
  const models = data.match(/model[\s\S]*?\}/g);
  const enums = data.match(/enum[\s\S]*?\}/g);
  if (models) {
    for (const model of models) {
      const lines = model.split(/\n/).filter((v) => v);
      const modelObject: Model = {
        name: getClassName(lines),
        fields: [],
      };
      let documentation = '';
      for (let i = 1; i + 1 < lines.length; i++) {
        const line = lineArray(lines[i]);
        if (line[0].includes('//')) {
          documentation = documentation
            ? documentation + '\n' + line.join(' ')
            : line.join(' ');
        } else if (!line[0].includes('@@')) {
          const type = line[1].replace('?', '').replace('[]', '');
          const field: Field = {
            name: line[0],
            type,
            isId: line.includes('@id'),
            unique: line.includes('@unique'),
            list: line[1].includes('[]'),
            required: !line[1].includes('[]') && !line[1].includes('?'),
            kind: data.includes(`enum ${type} `)
              ? 'enum'
              : data.includes(`model ${type} `)
              ? 'object'
              : 'scalar',
            documentation,
          };
          if (field.kind === 'object') {
            field.relation = getRelation(line);
          }
          modelObject.fields.push(field);
          documentation = '';
        }
      }
      modelObject.documentation = documentation;
      modelObject.fields
        .filter((item) => item.kind !== 'object')
        .forEach((item) => {
          let relationField = false;
          modelObject.fields
            .filter((field) => field.kind === 'object')
            .forEach((field) => {
              if (!relationField) {
                relationField = !!field.relation?.fields?.includes(item.name);
              }
            });
          item.relationField = relationField;
        });
      modelsObject.models.push({ ...modelObject });
    }
  }

  if (enums) {
    for (const item of enums) {
      const lines = item.split(/\n/).filter((v) => v);
      const itemObject: Enums = {
        name: getClassName(lines),
        fields: [],
      };
      for (let i = 1; i + 1 < lines.length; i++) {
        const line = lineArray(lines[i]);
        !line[0].includes('//') && itemObject.fields.push(line[0]);
      }
      modelsObject.enums.push({ ...itemObject });
    }
  }
  return modelsObject;
}

function getRelation(line: string[]) {
  line.splice(0, 2);
  let str = line
    .join(' ')
    .split('@')
    .find((item) => item.includes('relation('))
    ?.replace('relation(', '')
    .replace(')', '');
  if (str) {
    if (str.includes('"') && !str.includes('name')) {
      str = 'name: ' + str;
    }
    str
      .replace(/\]/g, ' ')
      .replace(/\[/g, ' ')
      .replace(/,/g, ' ')
      .replace(/:/g, ' ')
      .split(' ')
      .filter((item) => item && !item.includes('"'))
      .forEach((item) => {
        str = str?.replace(item, `"${item}"`);
      });
    return JSON.parse(`{${str}}`);
  }
  return null;
}

function getClassName(lines: string[]) {
  return lineArray(lines[0])[1];
}

function lineArray(line: string) {
  return line
    .replace(/[\n\r]/g, '')
    .split(' ')
    .filter((v) => v);
}
