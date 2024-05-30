import { join } from 'path';
import { GenerateSdl, replaceExports } from '../../src/sdl';

describe('Generate SDL Index', () => {
  const schemaPath = join(__dirname, '../schemas/schema.prisma');
  it('Should back with resolvers Index', async () => {
    const generator = new GenerateSdl(schemaPath, { backAsText: true });
    await generator.createModels();
    expect(
      await generator.formation(replaceExports(generator.resolversExport, generator.resolversIndex)),
    ).toMatchSnapshot();
  });

  it('Should back with typeDefs Index', async () => {
    const generator = new GenerateSdl(schemaPath, { backAsText: true });
    await generator.createModels();
    expect(
      await generator.formation(replaceExports(generator.typeDefsExport, generator.typeDefsIndex)),
    ).toMatchSnapshot();
  });
});
