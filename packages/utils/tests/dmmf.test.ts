import { join, relative, normalize, resolve } from 'path';
import { getDMMFBySchemaPath, getSchemaPath } from 'dmmf';

describe('test read schema and convert to dmmf', () => {
  const schemaPath = join(__dirname, './schemas/schema.prisma');
  test('failing load schema path', async () => {
    await expect(getSchemaPath()).rejects.toThrowErrorMatchingSnapshot();
  });

  test('success load schema path', async () => {
    expect(relative(process.cwd(), await getSchemaPath(schemaPath))).toContain(
      normalize('packages/utils/tests/schemas/schema.prisma'),
    );
  });

  test('build DMMF from schema', async () => {
    expect(await getDMMFBySchemaPath(schemaPath)).toMatchSnapshot();
  });
});
