import { enumType, inputObjectType, objectType } from '@nexus/schema'

export const EnumObject = objectType({
  name: 'Enum',
  definition(t) {
    t.string('name')
    t.list.string('fields')
  },
})

export const SchemaObject = objectType({
  name: 'Schema',
  definition(t) {
    t.list.field('models', { type: 'Model' })
    t.list.field('enums', { type: 'Enum' })
  },
})

const FieldDefinition = {
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('title')
    t.string('type')
    t.boolean('list')
    t.boolean('required')
    t.boolean('isId')
    t.boolean('unique')
    t.boolean('create')
    t.boolean('update')
    t.boolean('read')
    t.boolean('filter')
    t.boolean('sort')
    t.boolean('editor', { nullable: true })
    t.boolean('relationField', { nullable: true })
    t.int('order')
    t.field('kind', { type: 'KindEnum' })
  },
}

export const ModelObject = objectType({
  name: 'Model',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('idField')
    t.list.string('displayFields')
    t.boolean('create')
    t.boolean('update')
    t.boolean('delete')
    t.list.field('fields', {
      type: 'Field',
    })
  },
})

export const FieldObject = objectType({
  name: 'Field',
  ...FieldDefinition,
})

export const KindEnum = enumType({
  name: 'KindEnum',
  members: ['object', 'enum', 'scalar'],
})

export const UpdateModelInput = inputObjectType({
  name: 'UpdateModelInput',
  definition(t) {
    t.string('name')
    t.string('idField')
    t.list.string('displayFields')
    t.boolean('create')
    t.boolean('update')
    t.boolean('delete')
    t.list.field('fields', {
      type: 'UpdateFieldInput',
    })
  },
})

export const UpdateFieldInput = inputObjectType({
  name: 'UpdateFieldInput',
  ...FieldDefinition,
})
