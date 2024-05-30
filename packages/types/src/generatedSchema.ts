/*
 * This is the type of generated json py @paljs/schema
 */

export interface Field {
  name: string;
  type: string;
  list: boolean;
  required: boolean;
  isId: boolean;
  unique: boolean;
  kind: 'object' | 'enum' | 'scalar';
  map?: string;
  relationField?: boolean;
  documentation?: string;
  relation?: { name?: string; fields?: string[]; references?: string[] };
}

export interface Model {
  name: string;
  documentation?: string;
  map?: string;
  fields: Field[];
}

export interface Enums {
  name: string;
  fields: string[];
}

export interface SchemaObject {
  models: Model[];
  enums: Enums[];
}
