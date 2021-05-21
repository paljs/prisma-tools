import { DMMF } from '@prisma/client/runtime';

export interface Settings {
  prismaSelectOptions?: {
    defaultFields?: { [key: string]: { [key: string]: boolean } };
    dmmf?: DMMF.Document[];
  };
  adminSchemaPath?: string;
  includeAdmin?: boolean;
  dmmf?: DMMF.Document[];
  excludeFields?: string[];
  filterInputs?: (input: DMMF.InputType) => DMMF.SchemaArg[];
  doNotUseFieldUpdateOperationsInput?: boolean;
}
