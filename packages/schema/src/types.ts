export interface Model {
  name: string;
  documentation?: string;
  fields: Field[];
}

export interface Enums {
  name: string;
  fields: string[];
}

export interface Field {
  name: string;
  type: string;
  list: boolean;
  required: boolean;
  isId: boolean;
  unique: boolean;
  kind: 'object' | 'enum' | 'scalar';
  relationField?: boolean;
  documentation?: string;
  relation?: { name?: string; fields?: string[]; references?: [] };
}

export type SchemaObject = { models: Model[]; enums: Enums[] };
