import { GeneratorOptions } from './generator';

export interface AdminPagesOptions<ModelName extends string = string> {
  models?: ModelName[];
  pageContent?: string;
  outPut?: string;
  backAsText?: boolean;
}

export type PartialOptions<
  ModelName extends string = string,
  ModelsObject extends Record<ModelName, Record<string, any>> = Record<ModelName, Record<string, any>>,
> = Omit<Partial<GeneratorOptions<ModelName, ModelsObject>>, 'backAsText'>;

export type GeneratorsType = 'nexus' | 'sdl' | 'graphql-modules';

export interface Config<
  ModelName extends string = string,
  ModelsObject extends Record<ModelName, Record<string, any>> = Record<ModelName, Record<string, any>>,
> {
  schema?: string;
  backend?: {
    generator: GeneratorsType;
    adminSettingsPath?: string;
  } & PartialOptions<ModelName, ModelsObject>;
  frontend?: {
    admin?: AdminPagesOptions<ModelName> | boolean;
    graphql?: PartialOptions<ModelName, ModelsObject> | boolean;
  };
}

export type MultiSchemaConfig<
  ModelName extends string = string,
  ModelsObject extends Record<ModelName, Record<string, any>> = Record<ModelName, Record<string, any>>,
> = Record<string, Config<ModelName, ModelsObject>>;
