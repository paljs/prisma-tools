import { Schema, SchemaModel, SchemaField } from '../../../../admin/src/types';
import { SchemaObject, Model, Field } from '@prisma-tools/schema';
import { existsSync, readFileSync } from 'fs';

export function parseSchema(path: string): Schema {
  return existsSync(path)
    ? JSON.parse(readFileSync(path, { encoding: 'utf-8' }))
    : {
        models: [],
        enums: [],
      };
}

export function mergeSchema(object: SchemaObject, schemaPath: string): Schema {
  const schema = parseSchema(schemaPath);
  const newSchema: Schema = {
    models: [],
    enums: object.enums,
  };
  object.models.forEach((item) => {
    const schemaItem = schema.models.find((model) => model.id === item.name);
    if (!schemaItem) {
      if (checkIdFieldExist(item)) {
        newSchema.models.push(handleNewModel(item));
      }
    } else {
      const newItem: SchemaModel = {
        ...schemaItem,
        fields: [],
      };
      item.fields.forEach((field) => {
        const schemaField = schemaItem.fields.find(
          (item) => item.name === field.name,
        );
        if (!schemaField) {
          newItem.fields.push(handleNewField(field, schemaItem.name));
        } else {
          newItem.fields.push({
            ...schemaField,
            ...getOriginalField(field, schemaItem.name),
          });
        }
      });
      newItem.fields.sort((a, b) => a.order - b.order);
      newSchema.models.push(newItem);
    }
  });
  return newSchema;
}

function checkIdFieldExist(model: Model) {
  return !!model.fields.find((field) => field.isId);
}

function handleNewModel(model: Model) {
  const newItem: SchemaModel = {
    id: model.name,
    name: getTitle(model.name),
    idField: model.fields.find((field) => field.isId)!.name,
    displayFields: [model.fields.find((field) => field.isId)!.name],
    create: true,
    update: true,
    delete: true,
    fields: [],
  };
  model.fields.forEach((field) => {
    newItem.fields.push(handleNewField(field, model.name));
  });
  return newItem;
}

const defaultField = ['id', 'createdAt', 'updatedAt'];

function handleNewField(field: Field, modelName: string): SchemaField {
  return {
    ...getOriginalField(field, modelName),
    title: getTitle(field.name),
    create: !defaultField.includes(field.name) && !field.relationField,
    update: !defaultField.includes(field.name) && !field.relationField,
    editor: false,
    read: true,
    filter: true,
    sort: true,
    order: -1,
  };
}

function getTitle(id: string) {
  const split = id.split(/(?=[A-Z])/);
  split[0] = split[0].charAt(0).toUpperCase() + split[0].slice(1);
  return split.join(' ');
}

function getOriginalField(
  field: Field,
  modelName: string,
): Omit<Field, 'relation' | 'documentation' | 'map'> & { id: string } {
  delete field.relation;
  delete field.documentation;
  return {
    id: modelName + '.' + field.name,
    ...field,
  };
}
