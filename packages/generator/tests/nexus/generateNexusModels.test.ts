import { join } from 'path';
import { GenerateNexus } from '../../src/nexus';

describe('Generate nexus Models', () => {
  const schemaPath = join(__dirname, '../schemas/schema.prisma');
  it('Should back with all models queries, mutations and types', async () => {
    const generator = new GenerateNexus(schemaPath, { backAsText: true });
    await generator.createModels();
    expect(generator.generatedText.models).toMatchSnapshot();
  });

  it('Should back with User model queries, mutations and types with custom exclude', async () => {
    const generator = new GenerateNexus(schemaPath, {
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
