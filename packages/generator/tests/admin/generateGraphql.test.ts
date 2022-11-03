import { join } from 'path';
import { UIGenerator } from '../../src';

describe('Generate Graphql queries And mutations for Frontend', () => {
  const schemaPath = join(__dirname, '../schemas/schema.prisma');
  it('Should back with all models', () => {
    const generator = new UIGenerator(schemaPath);
    expect(generator.generateGraphql({ backAsText: true })).toMatchSnapshot();
  });

  it('Should back User model graphql with custom exclude', () => {
    const generator = new UIGenerator(schemaPath);
    expect(
      generator.generateGraphql({
        models: ['User'],
        backAsText: true,
        excludeFields: ['password'],
        excludeQueriesAndMutations: ['findCount', 'createOne'],
        excludeQueriesAndMutationsByModel: { User: ['updateMany'] },
      }),
    ).toMatchSnapshot();
  });
});
