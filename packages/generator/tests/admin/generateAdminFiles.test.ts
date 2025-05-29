import { join } from 'path';
import { UIGenerator } from '../../src/admin';

describe('Generate Admin Files', () => {
  const schemaPath = join(__dirname, '../schemas/schema.prisma');
  it('Should back with models pages', async () => {
    const generator = new UIGenerator(schemaPath);
    const text = await generator.generateAdminPages({ backAsText: true });
    expect(text).toMatchSnapshot();
  });

  test('Generate admin files for App Router', async () => {
    const uiGenerator = new UIGenerator('./packages/generator/tests/schemas/schema.prisma');
    const result = await uiGenerator.generateAdminPages({
      models: ['User'],
      backAsText: true,
      routerType: 'app',
    });
    expect(result).toMatchSnapshot();
  });

  test('Generate admin files for Pages Router explicitly', async () => {
    const uiGenerator = new UIGenerator('./packages/generator/tests/schemas/schema.prisma');
    const result = await uiGenerator.generateAdminPages({
      models: ['User'],
      backAsText: true,
      routerType: 'pages',
    });
    expect(result).toMatchSnapshot();
  });
});
