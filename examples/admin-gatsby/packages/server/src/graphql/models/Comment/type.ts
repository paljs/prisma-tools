import { objectType } from '@nexus/schema'

export const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.int('id', { nullable: false })
    t.string('contain', { nullable: false })
    t.field('post', {
      nullable: false,
      type: 'Post',
      resolve(parent) {
        return parent['post']
      },
    })
    t.int('postId', { nullable: false })
    t.field('author', {
      nullable: true,
      type: 'User',
      resolve(parent) {
        return parent['author']
      },
    })
    t.int('authorId', { nullable: true })
    t.field('createdAt', { nullable: false, type: 'DateTime' })
    t.field('updatedAt', { nullable: false, type: 'DateTime' })
  },
})
