export interface Model {
  id: string;
  fields: Field[];
}

export interface Enums {
  name: string;
  fields: string[];
}

export interface Field {
  id: string;
  name: string;
  type: string;
  list: boolean;
  required: boolean;
  isId: boolean;
  unique: boolean;
  kind: "object" | "enum" | "scalar";
}

export type SchemaObject = { models: Model[]; enums: Enums[] };

export interface SchemaField extends Field {
  title: string;
  read: boolean;
  create: boolean;
  update: boolean;
  filter: boolean;
  sort: boolean;
  order: number;
}

export interface SchemaModel extends Model {
  name: string;
  idField: string;
  displayFields: string[];
  update: boolean;
  delete: boolean;
  create: boolean;
  fields: SchemaField[];
}

export type Schema = { models: SchemaModel[]; enums: Enums[] };

type QueriesAndMutations =
  | "findOne"
  | "findMany"
  | "findCount"
  | "createOne"
  | "updateOne"
  | "deleteOne"
  | "updateMany"
  | "deleteMany";

export interface Options {
  schemaOutput: string;
  graphqlOutput: string;
  pagesOutput: string;
  fieldsExclude: string[];
  modelsExclude: (
    | string
    | { name: string; queries?: boolean; mutations?: boolean }
  )[];
  excludeQueriesAndMutationsByModel: {
    [modelName: string]: QueriesAndMutations[];
  };
  excludeQueriesAndMutations: QueriesAndMutations[];
  disableQueries?: boolean;
  disableMutations?: boolean;
  disableCreatePages?: boolean;
  disableCreateGraphql?: boolean;
  excludeFieldsByModel: { [modelName: string]: string[] };
}
