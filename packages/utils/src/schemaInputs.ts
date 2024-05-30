import { DMMF } from '@paljs/types';

export const getInputType = (
  field: DMMF.SchemaArg,
  options?: { doNotUseFieldUpdateOperationsInput?: boolean },
): DMMF.InputTypeRef => {
  let index = 0;
  if (
    options?.doNotUseFieldUpdateOperationsInput &&
    field.inputTypes.length > 1 &&
    field.inputTypes[1].type.endsWith('FieldUpdateOperationsInput')
  ) {
    return field.inputTypes[index];
  }
  if (field.inputTypes.length > 1) {
    if (field.inputTypes.some((item) => item.isList && item.location === 'inputObjectTypes')) {
      index = field.inputTypes.findIndex((item) => item.isList && item.location === 'inputObjectTypes');
    } else if (field.inputTypes.some((item) => item.isList)) {
      index = field.inputTypes.findIndex((item) => item.isList);
    } else if (field.inputTypes.some((item) => item.location === 'inputObjectTypes')) {
      index = field.inputTypes.findIndex((item) => item.location === 'inputObjectTypes');
    } else if (field.inputTypes.some((item) => item.type === 'Json')) {
      index = field.inputTypes.findIndex((item) => item.type === 'Json');
    }
  }
  return field.inputTypes[index];
};

// comment this code while we don't need it anymore for now

/*const testedTypes: string[] = [];

interface OptionsWithRequireDMMF extends GenerateInputsOptions {
  dmmf: DMMF.Document;
}
export const hasEmptyTypeFields = (type: string, options: OptionsWithRequireDMMF) => {
  const schema = options.dmmf.schema;
  testedTypes.push(type);
  const inputObjectTypes = schema ? [...schema.inputObjectTypes.prisma] : [];
  if (schema?.inputObjectTypes.model) inputObjectTypes.push(...schema.inputObjectTypes.model);

  const inputType = inputObjectTypes.find((item) => item.name === type);
  if (inputType) {
    if (inputType.fields.length === 0) return true;
    for (const field of inputType.fields) {
      const fieldType = getInputType(field, options);
      if (
        fieldType.type !== type &&
        fieldType.location === 'inputObjectTypes' &&
        !testedTypes.includes(fieldType.type as string)
      ) {
        const state = hasEmptyTypeFields(fieldType.type as string, options);
        if (state) return true;
      }
    }
  }
  return false;
};*/
