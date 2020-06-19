import { readFileSync } from 'fs';
import { SchemaObject, Model, Enums, Field } from './types';

export function convertSchemaToObject(path: string) {
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
        } else if (line[0].includes('@@')) {
          modelObject.map = getMap(lines[i]);
        } else {
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
            map: getMap(lines[i]),
          };

          if (field.kind === 'object') {
            field.relation = getRelation(lines[i]);
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

function getRelation(line: string) {
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

function getClassName(lines: string[]) {
  return lineArray(lines[0])[1];
}

export function lineArray(line: string) {
  return line
    .replace(/[\n\r]/g, '')
    .split(' ')
    .filter((v) => v);
}

function getMap(line: string) {
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
