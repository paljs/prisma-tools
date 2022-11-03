import { join } from 'path';
import { GenerateNexus } from '../../src/nexus';

describe('Generate Nexus Inputs', () => {
  const schemaPath = join(__dirname, '../schemas/schema.prisma');
  it('Should back with all inputs types', async () => {
    const generator = new GenerateNexus(schemaPath, { backAsText: true });
    await generator.createInputs();
    expect(generator.generatedText.inputs).toMatchSnapshot();
  });
});
