import { join } from 'path';
import { GenerateTypes } from '../../src/sdl/GenerateTypes';
import { getDMMFBySchemaPath } from '@paljs/utils';

describe('Generate SDL Typescript', () => {
  const schemaPath = join(__dirname, '../schemas/schema.prisma');
  it('Should back with resolvers types', async () => {
    const dmmf = await getDMMFBySchemaPath(schemaPath);
    const generator = new GenerateTypes(dmmf, { backAsText: true });
    expect(generator.run()).toMatchSnapshot();
  });
});
