import { join } from 'path';
import { GenerateSdl } from '../../src/sdl';

describe('Generate SDL Models', () => {
  const schemaPath = join(__dirname, '../schemas/schema.prisma');
  it('Should back with all models resolvers and types', async () => {
    const generator = new GenerateSdl(schemaPath, { backAsText: true });
    await generator.createModels();
    expect(generator.generatedText.models).toMatchSnapshot();
  });

  it('Should back with User model resolvers and types with custom exclude', async () => {
    const generator = new GenerateSdl(schemaPath, {
      backAsText: true,
      models: ['User'],
      excludeFields: ['password'],
      excludeQueriesAndMutations: ['findCount', 'createOne'],
      excludeQueriesAndMutationsByModel: { User: ['updateMany'] },
    });
    await generator.createModels();
    expect(generator.generatedText.models).toMatchSnapshot();
  });
});
