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
  upload: boolean;
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

export type GeneratorsType =
  | 'nexus'
  | 'sdl'
  | 'graphql-modules'
  | 'nexus-plugin-prisma';

export interface Config {
  schema?: string;
  backend?: {
    generator: GeneratorsType;
    adminSettingsPath?: string;
  } & PartialOptions;
  frontend?: {
    admin?: AdminPagesOptions | boolean;
    graphql?: PartialOptions | boolean;
  };
}

export type PartialOptions = Omit<Partial<Options>, 'nexusSchema'>;

export interface Options {
  prismaName: string;
  models?: string[];
  output: string;
  javaScript?: boolean;
  excludeFields: string[];
  excludeModels: { name: string; queries?: boolean; mutations?: boolean }[];
  disableQueries?: boolean;
  disableMutations?: boolean;
  excludeFieldsByModel: { [modelName: string]: string[] };
  excludeQueriesAndMutationsByModel: {
    [modelName: string]: QueriesAndMutations[];
  };
  excludeQueriesAndMutations: QueriesAndMutations[];
  doNotUseFieldUpdateOperationsInput?: boolean;
}

export type Query =
  | 'findUnique'
  | 'findFirst'
  | 'findMany'
  | 'findCount'
  | 'aggregate';
export type Mutation =
  | 'createOne'
  | 'updateOne'
  | 'upsertOne'
  | 'deleteOne'
  | 'updateMany'
  | 'deleteMany';

export type QueriesAndMutations = Query | Mutation;

export interface AdminPagesOptions {
  models?: string[];
  pageContent?: string;
  outPut?: string;
}

export type Examples =
  | 'apollo-nexus-schema'
  | 'apollo-sdl-first'
  | 'graphql-modules'
  | 'full-stack-nextjs'
  | 'full-stack-gatsbyjs';
