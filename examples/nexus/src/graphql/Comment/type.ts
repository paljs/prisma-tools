import { schema } from 'nexus'

schema.objectType({
  name: 'Comment',
  definition(t) {
    t.int('id', { nullable: false })
    t.string('contain', { nullable: false })
    t.field('post', {
      nullable: false,
      type: 'Post',
      resolve(parent: any) {
        return parent['post']
      },
    })
    t.int('postId', { nullable: false })
    t.field('author', {
      nullable: true,
      type: 'User',
      resolve(parent: any) {
        return parent['author']
      },
    })
    t.int('authorId', { nullable: true })
  },
})
