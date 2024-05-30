import { join } from 'path';
import { UIGenerator } from '../../src';

describe('Generate Admin Files', () => {
  const schemaPath = join(__dirname, '../schemas/schema.prisma');
  it('Should back with models pages', async () => {
    const generator = new UIGenerator(schemaPath);
    const text = await generator.generateAdminPages({ backAsText: true });
    expect(text).toMatchSnapshot();
  });
});
