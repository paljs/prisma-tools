import { Field, Model, Enums } from "@prisma-tools/schema";

export interface SchemaField extends Omit<Field, "relation"> {
  id: string;
  title: string;
  read: boolean;
  create: boolean;
  update: boolean;
  filter: boolean;
  sort: boolean;
  order: number;
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
