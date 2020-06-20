// Test content you can delete them
import { objectType } from '@nexus/schema'

export const testType = objectType({
  name: 'Test',
  definition(t) {
    t.int('id')
  },
})
