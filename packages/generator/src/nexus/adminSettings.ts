import {
  extendType,
  stringArg,
  objectType,
  enumType,
  inputObjectType,
} from '@nexus/schema';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

export function adminNexusSettings(path = 'prisma/schema.json') {
  const adapter = new FileSync<{
    [key: string]: { [key: string]: { [key: string]: any }[] }[];
  }>(path);
  const db = low(adapter);
  return {
    SchemaQueries: extendType({
      type: 'Query',
      definition(t) {
        t.field('getSchema', {
          type: 'Schema',
          resolve: async () => {
            return db.value();
          },
        });
      },
    }),
    SchemaMutations: extendType({
      type: 'Mutation',
      definition(t) {
        t.field('updateModel', {
          type: 'Model',
          args: {
            id: stringArg({ nullable: false }),
            data: 'UpdateModelInput',
          },
          resolve: async (_, { id, data }) => {
            return db.get('models').find({ id }).assign(data).write();
          },
        });
        t.field('updateField', {
          type: 'Field',
          args: {
            id: stringArg({ nullable: false }),
            modelId: stringArg({ nullable: false }),
            data: 'UpdateFieldInput',
          },
          resolve: async (_, { id, modelId, data }) => {
            return db
              .get('models')
              .find({ id: modelId })
              .get('fields')
              .find({ id })
              .assign(data)
              .write();
          },
        });
      },
    }),
    EnumObject: objectType({
      name: 'Enum',
      definition(t) {
        t.string('name');
        t.list.string('fields');
      },
    }),
    SchemaObject: objectType({
      name: 'Schema',
      definition(t) {
        t.list.field('models', { type: 'Model' });
        t.list.field('enums', { type: 'Enum' });
      },
    }),
    ModelObject: objectType({
      name: 'Model',
      definition(t) {
        t.string('id');
        t.string('name');
        t.string('idField');
        t.list.string('displayFields');
        t.boolean('create');
        t.boolean('update');
        t.boolean('delete');
        t.list.field('fields', {
          type: 'Field',
        });
      },
    }),
    FieldObject: objectType({
      name: 'Field',
      definition(t) {
        t.string('id');
        t.string('name');
        t.string('title');
        t.string('type');
        t.boolean('list');
        t.boolean('required');
        t.boolean('isId');
        t.boolean('unique');
        t.boolean('create');
        t.boolean('update');
        t.boolean('read');
        t.boolean('filter');
        t.boolean('sort');
        t.boolean('editor');
        t.boolean('relationField', { nullable: true });
        t.int('order');
        t.field('kind', { type: 'KindEnum' });
      },
    }),
    KindEnum: enumType({
      name: 'KindEnum',
      members: ['object', 'enum', 'scalar'],
    }),
    UpdateModelInput: inputObjectType({
      name: 'UpdateModelInput',
      definition(t) {
        t.string('name');
        t.string('idField');
        t.list.string('displayFields');
        t.boolean('create');
        t.boolean('update');
        t.boolean('delete');
        t.list.field('fields', {
          type: 'UpdateFieldInput',
        });
      },
    }),
    UpdateFieldInput: inputObjectType({
      name: 'UpdateFieldInput',
      definition(t) {
        t.string('id');
        t.string('name');
        t.string('title');
        t.string('type');
        t.boolean('list');
        t.boolean('required');
        t.boolean('isId');
        t.boolean('unique');
        t.boolean('create');
        t.boolean('update');
        t.boolean('read');
        t.boolean('filter');
        t.boolean('sort');
        t.boolean('editor');
        t.boolean('relationField', { nullable: true });
        t.int('order');
        t.field('kind', { type: 'KindEnum' });
      },
    }),
  };
}
