import React from 'react';
import {
  Column,
  UseFiltersColumnOptions,
  UseSortByColumnOptions,
} from 'react-table';
import { FormContextValues } from 'react-hook-form';
import { Schema, SchemaField, SchemaModel } from '@paljs/types';

export { Schema, SchemaField, SchemaModel };

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

export interface ContextProps extends RequireContextProps, SameProps {
  schema: Schema;
  children?: React.ReactNode;
}

interface RequireContextProps {
  pagesPath: string;
  pageSizeOptions: number[];
  paginationOptions: number;
}

interface SameProps {
  tableColumns?: GetColumnsPartial;
  formInputs?: Partial<FormInputs>;
  push: (url: string) => void;
  query: { [key: string]: any };
}

export interface ModelTableProps
  extends Partial<RequireContextProps>,
    SameProps {
  model: string;
}
