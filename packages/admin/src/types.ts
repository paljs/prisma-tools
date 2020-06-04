import React from 'react';
import { Field, Model, Enums } from '@prisma-tools/schema';
import {
  Column,
  UseFiltersColumnOptions,
  UseSortByColumnOptions,
} from 'react-table';
import { FormContextValues } from 'react-hook-form';

export type Columns = Record<
  'boolean' | 'number' | 'enum' | 'DateTime' | 'object' | 'string' | 'list',
  Column & UseFiltersColumnOptions<any> & UseSortByColumnOptions<any>
>;

export interface InputProps {
  field: SchemaField;
  value: any;
  error: any;
  register: FormContextValues['register'];
  setValue: FormContextValues['setValue'];
  disabled: boolean;
}

export type GetColumns = (field: SchemaField, model?: SchemaModel) => Columns;
export type GetColumnsPartial = (
  field: SchemaField,
  model?: SchemaModel,
) => Partial<Columns>;
export type FormInputs = Record<
  'Default' | 'Editor' | 'Enum' | 'Object' | 'Date' | 'Boolean',
  React.FC<InputProps>
>;

export interface SchemaField extends Omit<Field, 'relation'> {
  id: string;
  title: string;
  read: boolean;
  create: boolean;
  update: boolean;
  filter: boolean;
  sort: boolean;
  order: number;
  editor: boolean;
}

export interface SchemaModel extends Model {
  id: string;
  idField: string;
  displayFields: string[];
  update: boolean;
  delete: boolean;
  create: boolean;
  fields: SchemaField[];
}

export type Schema = { models: SchemaModel[]; enums: Enums[] };

type QueriesAndMutations =
  | 'findOne'
  | 'findMany'
  | 'findCount'
  | 'createOne'
  | 'updateOne'
  | 'deleteOne'
  | 'updateMany'
  | 'deleteMany';

export interface GenerateGraphqlOptions {
  schema?: Schema;
  graphqlOutput: string;
  excludeFields: string[];
  excludeFieldsByModel: { [modelName: string]: string[] };
  excludeModels: (
    | string
    | { name: string; queries?: boolean; mutations?: boolean }
  )[];
  excludeQueriesAndMutationsByModel: {
    [modelName: string]: QueriesAndMutations[];
  };
  excludeQueriesAndMutations: QueriesAndMutations[];
  disableQueries?: boolean;
  disableMutations?: boolean;
}

export interface GeneratePagesOptions {
  schema?: Schema;
  pageContent?: string;
  outPut?: string;
}
