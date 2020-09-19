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
  | 'boolean'
  | 'number'
  | 'enum'
  | 'DateTime'
  | 'object'
  | 'string'
  | 'list'
  | 'json',
  Column & UseFiltersColumnOptions<any> & UseSortByColumnOptions<any>
>;

export interface InputProps {
  field: SchemaField;
  value: any;
  data: any;
  error: any;
  register: FormContextValues['register'];
  setValue: FormContextValues['setValue'];
  getValues: FormContextValues['getValues'];
  watch: FormContextValues['watch'];
  disabled: boolean;
}

export type GetColumns = (field: SchemaField, model?: SchemaModel) => Columns;
export type GetColumnsPartial = (
  field: SchemaField,
  model?: SchemaModel,
) => Partial<Columns>;
export type FormInputs = Record<
  'Default' | 'Editor' | 'Enum' | 'Object' | 'Date' | 'Boolean' | 'Upload',
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
  onSelect?: (values: any[]) => void;
  onCancelCreate?: (options: {
    model: string;
    setCreateModal: (state: boolean) => void;
  }) => void;
  onSaveCreate?: (options: {
    model: string;
    setCreateModal: (state: boolean) => void;
    refetchTable: (options?: any) => void;
  }) => void;
  onCancelUpdate?: (options: { model: string }) => void;
  onSaveUpdate?: (options: {
    model: string;
    refetchTable: (options?: any) => void;
  }) => void;
  valueHandler?: (value: string, field?: SchemaField, create?: boolean) => any;
}

export interface ModelTableProps
  extends Partial<RequireContextProps>,
    SameProps {
  model: string;
}
