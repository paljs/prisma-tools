import { SchemaObject, Schema, SchemaModel, Model, Field } from "./types";

export function mergeSchema(object: SchemaObject, schema: Schema): Schema {
  const newSchema: Schema = {
    models: [],
    enums: object.enums,
  };
  object.models.forEach((item) => {
    const schemaItem = schema.models.find((model) => model.id === item.id);
    if (!schemaItem) {
      newSchema.models.push(handleNewModel(item));
    } else {
      const newItem: SchemaModel = {
        ...schemaItem,
        fields: [],
      };
      item.fields.forEach((field) => {
        const schemaField = schemaItem.fields.find(
          (item) => item.id === field.id
        );
        if (!schemaField) {
          newItem.fields.push(handleNewField(field));
        } else {
          newItem.fields.push({
            ...schemaField,
            ...field,
          });
        }
      });
      newSchema.models.push(newItem);
    }
  });
  return newSchema;
}

function handleNewModel(model: Model) {
  const newItem: SchemaModel = {
    id: model.id,
    name: model.id,
    create: true,
    update: true,
    delete: true,
    fields: [],
  };
  model.fields.forEach((field) => {
    newItem.fields.push(handleNewField(field));
  });
  return newItem;
}

const defaultField = ["id", "createdAt", "updatedAt"];

function handleNewField(field: Field) {
  return {
    ...field,
    title: field.name,
    create: !defaultField.includes(field.name),
    update: !defaultField.includes(field.name),
    read: true,
    filter: true,
    sort: true,
    order: -1,
  };
}
