import { objectType } from '@nexus/schema'

export const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.int('id', { nullable: false })
    t.string('contain', { nullable: false })
    t.field('post', { nullable: false, type: 'Post' })
    t.int('postId', { nullable: false })
    t.field('author', { nullable: true, type: 'User' })
    t.int('authorId', { nullable: true })
  },
})
