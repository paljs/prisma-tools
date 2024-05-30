import { join } from 'path';
import { GenerateNexus } from '../../src/nexus';

describe('Generate Nexus Index', () => {
  const schemaPath = join(__dirname, '../schemas/schema.prisma');
  it('Should back with all models Index', async () => {
    const generator = new GenerateNexus(schemaPath, { backAsText: true });
    await generator.createModels();
    const index = await generator.createIndex();
    expect(index).toMatchSnapshot();
  });
});
