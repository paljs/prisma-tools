import { join } from 'path';
import { getDMMFBySchemaPath } from 'dmmf';
import { getInputType } from 'schemaInputs';

describe('test schema inputs', () => {
  const schemaPath = join(__dirname, './schemas/schema.prisma');
  const getInputField = async (inputName: string, fieldName: string) => {
    const dmmf = await getDMMFBySchemaPath(schemaPath);
    const input = dmmf.schema.inputObjectTypes.prisma.find((item) => item.name === inputName);
    return input?.fields.find((item) => item.name === fieldName);
  };

  it('check update input', async () => {
    const nameField = await getInputField('UserUpdateInput', 'name');
    expect(!nameField || getInputType(nameField)).toMatchSnapshot();
    expect(!nameField || getInputType(nameField, { doNotUseFieldUpdateOperationsInput: true })).toMatchSnapshot();
  });

  it('check Json field', async () => {
    const nameField = await getInputField('UserUpdateInput', 'permissions');
    expect(!nameField || getInputType(nameField)).toMatchSnapshot();
  });

  it('should back a list field if we have more than type and one of them is list', async () => {
    const nameField = await getInputField('UserWhereInput', 'AND');
    expect(!nameField || getInputType(nameField)).toMatchSnapshot();
  });

  it('should back a object field if we have more than type and one of them is object', async () => {
    const nameField = await getInputField('UserWhereInput', 'id');
    expect(!nameField || getInputType(nameField)).toMatchSnapshot();
  });
});
