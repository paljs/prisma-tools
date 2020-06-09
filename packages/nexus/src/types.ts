export type Query = 'findOne' | 'findMany' | 'findCount';
export type Mutation =
  | 'createOne'
  | 'updateOne'
  | 'upsertOne'
  | 'deleteOne'
  | 'updateMany'
  | 'deleteMany';

export type QueriesAndMutations = Query | Mutation;

export interface Options {
  models?: string[];
  onlyInputType?: boolean;
  modelsOutput: string;
  fieldsExclude: string[];
  modelsExclude: { name: string; queries?: boolean; mutations?: boolean }[];
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
