import React from 'react';
import { Column, UseSortByColumnOptions } from 'react-table';
import { AdminSchema, AdminSchemaField, AdminSchemaModel } from '@paljs/types';
import Language from './PrismaTable/language';
import { DynamicTableProps } from './PrismaTable/dynamicTable';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

export type { AdminSchema, AdminSchemaField, AdminSchemaModel };

export type Columns = Record<
  'boolean' | 'number' | 'enum' | 'DateTime' | 'object' | 'string' | 'list' | 'json',
  Column<Record<string, any>> & UseSortByColumnOptions<any>
>;

export interface InputProps {
  field: AdminSchemaField;
  value: any;
  data: any;
  disabled: boolean;
}

export type GetColumns = (field: AdminSchemaField, model?: AdminSchemaModel) => Columns;
export type GetColumnsPartial = (field: AdminSchemaField, model?: AdminSchemaModel) => Partial<Columns>;
export type FormInputs = Record<
  'Default' | 'Editor' | 'Enum' | 'Object' | 'Date' | 'Boolean' | 'Upload',
  React.FC<InputProps>
>;

export interface ContextProps extends RequireContextProps, SameProps {
  schema: AdminSchema;
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
  inputValidation?: Record<string, Record<string, RegisterOptions>>;
  push: (url: string) => void;
  query: Record<string, any>;
  onSelect?: (values: any[]) => void;
  onCancelCreate?: (options: { model: string; setCreateModal: (state: boolean) => void }) => void;
  onSaveCreate?: (options: {
    model: string;
    setCreateModal: (state: boolean) => void;
    refetchTable: (options?: any) => void;
  }) => void;
  onCancelUpdate?: (options: { model: string }) => void;
  onSaveUpdate?: (options: { model: string; refetchTable: (options?: any) => void }) => void;
  valueHandler?: (value: string, field?: AdminSchemaField, create?: boolean) => any;
  actionButtons?: {
    Add?: React.FC;
    Update?: React.FC<{ id: any }>;
    Delete?: React.FC<{ id: any }>;
  };
  defaultOrderBy?: Record<string, Record<string, 'asc' | 'desc' | { sort: 'asc' | 'desc'; nulls: 'last' | 'first' }>[]>;
}

export interface ModelTableProps extends Partial<Omit<RequireContextProps, 'lang'>>, SameProps {
  model: string;
  language?: Partial<typeof Language>;
  children?: DynamicTableProps['children'];
}

export interface TableParentRecord {
  name: string;
  value: any;
  field: string;
  updateRecord?: () => Promise<any>;
}
