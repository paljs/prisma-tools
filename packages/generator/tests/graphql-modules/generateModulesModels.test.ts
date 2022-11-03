import { join } from 'path';
import { GenerateModules } from '../../src/graphql-modules';

describe('Generate Modules Models', () => {
  const schemaPath = join(__dirname, '../schemas/schema.prisma');
  it('Should back with all models resolvers and types', async () => {
    const generator = new GenerateModules(schemaPath, { backAsText: true });
    await generator.createModules();
    expect(generator.generatedText.models).toMatchSnapshot();
  });

  it('Should back model resolvers and types with custom exclude', async () => {
    const generator = new GenerateModules(schemaPath, {
      backAsText: true,
      excludeFields: ['password'],
      excludeQueriesAndMutations: ['findCount', 'createOne'],
      excludeQueriesAndMutationsByModel: { User: ['updateMany'] },
    });
    await generator.createModules();
    expect(generator.generatedText.models).toMatchSnapshot();
  });
});
