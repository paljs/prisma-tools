import { stringArg, objectType, enumType, inputObjectType, extendType, nonNull } from 'nexus';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { NexusAcceptedTypeDef } from 'nexus/dist/builder';
import { AdminSchema } from '@paljs/types';
import { existsSync } from 'fs';
import { join } from 'path';

export function adminNexusSchemaSettings(path = 'adminSettings.json') {
  if (existsSync(join(process.cwd(), path))) {
    const adapter = new FileSync<AdminSchema>(path);
    const db = low(adapter);
    const nexusSchemaInputs: NexusAcceptedTypeDef[] = [
      extendType({
        type: 'Query',
        definition(t) {
          t.field('getSchema', {
            type: nonNull('Schema'),
            resolve() {
              return db.value();
            },
          });
        },
      }),
      extendType({
        type: 'Mutation',
        definition(t) {
          t.field('updateField', {
            type: nonNull('Field'),
            args: {
              id: nonNull(stringArg()),
              modelId: nonNull(stringArg()),
              data: nonNull('UpdateFieldInput'),
            },
            resolve(_, { id, modelId, data }) {
              return db.get('models').find({ id: modelId }).get('fields').find({ id }).assign(data).write();
            },
          });
          t.field('updateModel', {
            type: nonNull('Model'),
            args: {
              id: nonNull(stringArg()),
              data: nonNull('UpdateModelInput'),
            },
            resolve(_, { id, data }) {
              return db.get('models').find({ id }).assign(data).write();
            },
          });
        },
      }),
      objectType({
        nonNullDefaults: {
          output: true,
        },
        name: 'Enum',
        definition(t) {
          t.string('name');
          t.list.string('fields');
        },
      }),
      objectType({
        nonNullDefaults: {
          output: true,
        },
        name: 'Schema',
        definition(t) {
          t.list.field('models', { type: 'Model' });
          t.list.field('enums', { type: 'Enum' });
        },
      }),
      objectType({
        nonNullDefaults: {
          output: true,
        },
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
      objectType({
        nonNullDefaults: {
          output: true,
        },
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
          t.boolean('upload');
          t.nullable.boolean('relationField');
          t.int('order');
          t.field('kind', { type: 'KindEnum' });
        },
      }),
      enumType({
        name: 'KindEnum',
        members: ['object', 'enum', 'scalar'],
      }),
      inputObjectType({
        nonNullDefaults: {
          input: false,
        },
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
      inputObjectType({
        nonNullDefaults: {
          input: false,
        },
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
          t.boolean('upload');
          t.nullable.boolean('relationField');
          t.int('order');
          t.field('kind', { type: 'KindEnum' });
        },
      }),
    ];
    return nexusSchemaInputs;
  }
  return [];
}
