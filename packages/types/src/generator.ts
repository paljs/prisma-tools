import { DMMF } from './dmmf';

export type Query = 'findUnique' | 'findFirst' | 'findMany' | 'findCount' | 'aggregate';
export type Mutation = 'createOne' | 'updateOne' | 'upsertOne' | 'deleteOne' | 'updateMany' | 'deleteMany';

export type QueriesAndMutations = Query | Mutation;

export interface GeneratorOptions {
  backAsText?: boolean;
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
  excludeInputFields?: string[];
  filterInputs?: (input: DMMF.InputType) => DMMF.SchemaArg[];
  doNotUseFieldUpdateOperationsInput?: boolean;
}
