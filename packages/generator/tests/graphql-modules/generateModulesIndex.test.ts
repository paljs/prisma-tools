import { join } from 'path';
import { GenerateModules } from '../../src/graphql-modules';

describe('Generate Modules App', () => {
  const schemaPath = join(__dirname, '../schemas/schema.prisma');
  it('Should back with App File', async () => {
    const generator = new GenerateModules(schemaPath, { backAsText: true });
    await generator.createModules();
    expect(await generator.createApp()).toMatchSnapshot();
  });
});
