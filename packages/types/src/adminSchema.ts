import { Enums, Field, Model } from './generatedSchema';

export interface AdminSchemaField extends Omit<Field, 'relation' | 'documentation' | 'map'> {
  id: string;
  title: string;
  read: boolean;
  create: boolean;
  update: boolean;
  filter: boolean;
  sort: boolean;
  order: number;
  editor: boolean;
  upload: boolean;
}

export interface AdminSchemaModel extends Omit<Model, 'documentation' | 'map'> {
  id: string;
  idField: string;
  displayFields: string[];
  update: boolean;
  delete: boolean;
  create: boolean;
  fields: AdminSchemaField[];
}

export interface AdminSchema {
  models: AdminSchemaModel[];
  enums: Enums[];
}
