import { DMMF } from './dmmf';

export type Query = 'findUnique' | 'findFirst' | 'findMany' | 'findCount' | 'aggregate';
export type Mutation = 'createOne' | 'updateOne' | 'upsertOne' | 'deleteOne' | 'updateMany' | 'deleteMany';

export type QueriesAndMutations = Query | Mutation;

export interface GeneratorOptions<
  ModelName extends string = string,
  ModelsObject extends Record<ModelName, Record<string, any>> = Record<ModelName, Record<string, any>>,
> {
  backAsText?: boolean;
  prismaName: string;
  models?: ModelName[];
  output: string;
  javaScript?: boolean;
  excludeFields: string[];
  excludeModels: { name: ModelName; queries?: boolean; mutations?: boolean }[];
  disableQueries?: boolean;
  disableMutations?: boolean;
  excludeFieldsByModel: { [modelName in ModelName]: (keyof ModelsObject[modelName])[] };
  excludeQueriesAndMutationsByModel: Record<ModelName, QueriesAndMutations[]>;
  excludeQueriesAndMutations: QueriesAndMutations[];
  excludeInputFields?: string[];
  filterInputs?: (input: DMMF.InputType) => DMMF.SchemaArg[];
  doNotUseFieldUpdateOperationsInput?: boolean;
}
