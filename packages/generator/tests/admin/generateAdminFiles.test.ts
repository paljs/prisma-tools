import { join } from 'path';
import { UIGenerator } from '../../src';

describe('Generate Admin Files', () => {
  const schemaPath = join(__dirname, '../schemas/schema.prisma');
  it('Should back with models pages', () => {
    const generator = new UIGenerator(schemaPath);
    expect(generator.generateAdminPages({ backAsText: true })).toMatchSnapshot();
  });
});
