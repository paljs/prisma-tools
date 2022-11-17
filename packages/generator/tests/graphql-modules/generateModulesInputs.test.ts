import { join } from 'path';
import { GenerateModules } from '../../src/graphql-modules';

describe('Generate Modules Inputs', () => {
  const schemaPath = join(__dirname, '../schemas/schema.prisma');
  it('Should back with all inputs types', async () => {
    const generator = new GenerateModules(schemaPath, { backAsText: true });
    await generator.createInputs();
    expect(generator.generatedText.inputs).toMatchSnapshot();
  });
});
