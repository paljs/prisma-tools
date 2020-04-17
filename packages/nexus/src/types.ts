type QueriesAndMutations =
  | 'findOne'
  | 'findMany'
  | 'findCount'
  | 'createOne'
  | 'updateOne'
  | 'deleteOne'
  | 'updateMany'
  | 'deleteMany';

export interface Options extends QueriesAndMutationsOptions {
  onlyInputType?: boolean;
  modelsOutput: string;
  inputTypesOutput: string;
  fieldsExclude: string[];
  modelsExclude: { name: string; queries?: boolean; mutations?: boolean }[];
  disableQueries?: boolean;
  disableMutations?: boolean;
  excludeFieldsByModel: { [modelName: string]: string[] };
}

export interface QueriesAndMutationsOptions {
  excludeQueriesAndMutationsByModel: {
    [modelName: string]: QueriesAndMutations[];
  };
  excludeQueriesAndMutations: QueriesAndMutations[];
}
