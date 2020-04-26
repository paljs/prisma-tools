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
        idField:
          schemaItem.idField ??
          schemaItem.fields.find((field) => field.isId).name,
        displayFields: schemaItem.displayFields ?? [
          schemaItem.fields.find((field) => field.isId).name,
        ],
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
    name: getTitle(model.id),
    idField: model.fields.find((field) => field.isId).name,
    displayFields: [model.fields.find((field) => field.isId).name],
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
    title: getTitle(field.name),
    create: !defaultField.includes(field.name),
    update: !defaultField.includes(field.name),
    read: true,
    filter: true,
    sort: true,
    order: -1,
  };
}

function getTitle(id: string) {
  const split = id.split(/(?=[A-Z])/);
  split[0] = split[0].charAt(0).toUpperCase() + split[0].slice(1);
  return split.join(" ");
}
