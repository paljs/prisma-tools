import { join } from 'path';
import { UIGenerator } from '../../src';

describe('Generate Json Object For Admin Tables', () => {
  const schemaPath = join(__dirname, '../schemas/schema.prisma');
  it('Should back with Json Settings', async () => {
    const generator = new UIGenerator(schemaPath);
    expect(await generator.buildSettingsSchema('adminSettings.json', true)).toMatchSnapshot();
  });
});
