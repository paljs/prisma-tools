import React from 'react';
import { Column, UseSortByColumnOptions } from 'react-table';
import { UseFormReturn, FieldError } from 'react-hook-form';
import { Schema, SchemaField, SchemaModel } from '@paljs/types';
import Language from './PrismaTable/language';
import { DynamicTableProps } from './PrismaTable/dynamicTable';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

export type { Schema, SchemaField, SchemaModel };

export type Columns = Record<
  'boolean' | 'number' | 'enum' | 'DateTime' | 'object' | 'string' | 'list' | 'json',
  Column<{ [key: string]: any }> & UseSortByColumnOptions<any>
>;

export interface InputProps {
  field: SchemaField;
  value: any;
  data: any;
  error: FieldError;
  register: UseFormReturn['register'];
  setValue: UseFormReturn['setValue'];
  getValues: UseFormReturn['getValues'];
  watch: UseFormReturn['watch'];
  disabled: boolean;
}

export type GetColumns = (field: SchemaField, model?: SchemaModel) => Columns;
export type GetColumnsPartial = (field: SchemaField, model?: SchemaModel) => Partial<Columns>;
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
  pageSize: number;
  pageSizeOptions: number[];
  paginationOptions: number;
  lang: typeof Language;
  dir: 'rtl' | 'ltr';
}

interface SameProps {
  actions?: ('create' | 'update' | 'delete')[];
  useSet?: boolean;
  tableColumns?: GetColumnsPartial;
  formInputs?: Partial<FormInputs>;
  inputValidation?: { [model: string]: { [field: string]: RegisterOptions } };
  push: (url: string) => void;
  query: { [key: string]: any };
  onSelect?: (values: any[]) => void;
  onCancelCreate?: (options: { model: string; setCreateModal: (state: boolean) => void }) => void;
  onSaveCreate?: (options: {
    model: string;
    setCreateModal: (state: boolean) => void;
    refetchTable: (options?: any) => void;
  }) => void;
  onCancelUpdate?: (options: { model: string }) => void;
  onSaveUpdate?: (options: { model: string; refetchTable: (options?: any) => void }) => void;
  valueHandler?: (value: string, field?: SchemaField, create?: boolean) => any;
  actionButtons?: {
    Add?: React.FC;
    Update?: React.FC<{ id: any }>;
    Delete?: React.FC<{ id: any }>;
  };
  defaultOrderBy?: Record<string, Record<string, 'asc' | 'desc'>[]>;
}

export interface ModelTableProps extends Partial<Omit<RequireContextProps, 'lang'>>, SameProps {
  model: string;
  language?: Partial<typeof Language>;
  children?: DynamicTableProps['children'];
}

export type TableParentRecord = {
  name: string;
  value: any;
  field: string;
  updateRecord?: () => void;
};
