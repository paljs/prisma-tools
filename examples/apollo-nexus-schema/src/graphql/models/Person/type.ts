import { objectType } from '@nexus/schema'

export const Person = objectType({
  name: 'Person',
  definition(t) {
    t.int('id', { nullable: false })
    t.string('firstName', { nullable: false })
    t.field('user', {
      nullable: true,
      type: 'User',
      resolve(parent) {
        return parent['user']
      },
    })
    t.int('userId', { nullable: true })
  },
})
