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

export type SchemaObject = { models: Model[]; enums: Enums[] };

export interface SchemaField
  extends Omit<Field, 'relation' | 'documentation' | 'map'> {
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

export interface SchemaModel extends Omit<Model, 'documentation' | 'map'> {
  id: string;
  idField: string;
  displayFields: string[];
  update: boolean;
  delete: boolean;
  create: boolean;
  fields: SchemaField[];
}

export type Schema = { models: SchemaModel[]; enums: Enums[] };

export interface Config {
  schemaFolder?: string;
  backend?: {
    generator: 'nexus' | 'nexus-schema' | 'sdl' | 'graphql-modules';
  } & Omit<Partial<Options>, 'nexusSchema'>;
  frontEnd?: {
    pages?:
      | {
          content?: string;
          output?: string;
        }
      | boolean;
    graphql?: ConfigGraphql | boolean;
  };
}

export type ConfigGraphql = Omit<Partial<Options>, 'nexusSchema'> & {
  schema?: Schema;
};

export interface Options {
  models?: string[];
  output: string;
  excludeFields: string[];
  excludeModels: { name: string; queries?: boolean; mutations?: boolean }[];
  disableQueries?: boolean;
  disableMutations?: boolean;
  excludeFieldsByModel: { [modelName: string]: string[] };
  onDelete?: boolean;
  nexusSchema?: boolean;
  excludeQueriesAndMutationsByModel: {
    [modelName: string]: QueriesAndMutations[];
  };
  excludeQueriesAndMutations: QueriesAndMutations[];
}

export interface GenerateGraphqlOptions extends Options {
  schema?: Schema;
}

export type Query = 'findOne' | 'findMany' | 'findCount';
export type Mutation =
  | 'createOne'
  | 'updateOne'
  | 'upsertOne'
  | 'deleteOne'
  | 'updateMany'
  | 'deleteMany';

export type QueriesAndMutations = Query | Mutation;

export interface GeneratePagesOptions {
  schema?: Schema;
  pageContent?: string;
  outPut?: string;
}
