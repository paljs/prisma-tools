import { join } from 'path';
import { GenerateSdl } from '../../src/sdl';

describe('Generate SDL Inputs', () => {
  const schemaPath = join(__dirname, '../schemas/schema.prisma');
  it('Should back with all inputs types', async () => {
    const generator = new GenerateSdl(schemaPath, { backAsText: true });
    await generator.createInputs();
    expect(generator.generatedText.inputs).toMatchSnapshot();
  });
});
