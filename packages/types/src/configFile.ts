import { GeneratorOptions } from './generator';

export interface AdminPagesOptions {
  models?: string[];
  pageContent?: string;
  outPut?: string;
  backAsText?: boolean;
}

export type PartialOptions = Omit<Partial<GeneratorOptions>, 'backAsText'>;

export type GeneratorsType = 'nexus' | 'sdl' | 'graphql-modules';

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

export type MultiSchemaConfig = Record<string, Config>;
