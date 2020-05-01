import { schema } from 'nexus'

schema.scalarType({
  name: 'DateTime',
  description: 'Date custom scalar type',
  parseValue(value) {
    return value ? new Date(value) : null
  },
  serialize(value) {
    return value ? new Date(value) : null
  },
  parseLiteral(ast: any) {
    return ast.value ? new Date(ast.value) : null
  },
})

schema.objectType({
  name: 'BatchPayload',
  definition(t) {
    t.int('count', { nullable: false })
  },
})

schema.enumType({
  name: 'OrderByArg',
  members: ['asc', 'desc'],
})

schema.inputObjectType({
  name: 'CommentWhereInput',
  definition(t) {
    t.field('id', { type: 'IntFilter' })
    t.field('createdAt', { type: 'DateTimeFilter' })
    t.field('updatedAt', { type: 'DateTimeFilter' })
    t.field('contain', { type: 'StringFilter' })
    t.field('postId', { type: 'IntFilter' })
    t.field('authorId', { type: 'NullableIntFilter' })
    t.field('AND', { type: 'CommentWhereInput', list: true })
    t.field('OR', { type: 'CommentWhereInput', list: true })
    t.field('NOT', { type: 'CommentWhereInput', list: true })
    t.field('post', { type: 'PostWhereInput' })
    t.field('author', { type: 'UserWhereInput' })
  },
})

schema.inputObjectType({
  name: 'PostWhereInput',
  definition(t) {
    t.field('id', { type: 'IntFilter' })
    t.field('createdAt', { type: 'DateTimeFilter' })
    t.field('updatedAt', { type: 'DateTimeFilter' })
    t.field('published', { type: 'BooleanFilter' })
    t.field('title', { type: 'StringFilter' })
    t.field('authorId', { type: 'NullableIntFilter' })
    t.field('comments', { type: 'CommentFilter' })
    t.field('AND', { type: 'PostWhereInput', list: true })
    t.field('OR', { type: 'PostWhereInput', list: true })
    t.field('NOT', { type: 'PostWhereInput', list: true })
    t.field('author', { type: 'UserWhereInput' })
  },
})

schema.inputObjectType({
  name: 'GroupWhereInput',
  definition(t) {
    t.field('id', { type: 'IntFilter' })
    t.field('createdAt', { type: 'DateTimeFilter' })
    t.field('updatedAt', { type: 'DateTimeFilter' })
    t.field('users', { type: 'UserFilter' })
    t.field('AND', { type: 'GroupWhereInput', list: true })
    t.field('OR', { type: 'GroupWhereInput', list: true })
    t.field('NOT', { type: 'GroupWhereInput', list: true })
  },
})

schema.inputObjectType({
  name: 'UserWhereInput',
  definition(t) {
    t.field('id', { type: 'IntFilter' })
    t.field('createdAt', { type: 'DateTimeFilter' })
    t.field('email', { type: 'StringFilter' })
    t.field('name', { type: 'NullableStringFilter' })
    t.field('password', { type: 'StringFilter' })
    t.field('posts', { type: 'PostFilter' })
    t.field('groupId', { type: 'NullableIntFilter' })
    t.field('Comment', { type: 'CommentFilter' })
    t.field('AND', { type: 'UserWhereInput', list: true })
    t.field('OR', { type: 'UserWhereInput', list: true })
    t.field('NOT', { type: 'UserWhereInput', list: true })
    t.field('group', { type: 'GroupWhereInput' })
  },
})

schema.inputObjectType({
  name: 'UserWhereUniqueInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('email', { type: 'String' })
  },
})

schema.inputObjectType({
  name: 'PostWhereUniqueInput',
  definition(t) {
    t.field('id', { type: 'Int' })
  },
})

schema.inputObjectType({
  name: 'CommentWhereUniqueInput',
  definition(t) {
    t.field('id', { type: 'Int' })
  },
})

schema.inputObjectType({
  name: 'GroupWhereUniqueInput',
  definition(t) {
    t.field('id', { type: 'Int' })
  },
})

schema.inputObjectType({
  name: 'GroupCreateWithoutUsersInput',
  definition(t) {
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})

schema.inputObjectType({
  name: 'GroupCreateOneWithoutUsersInput',
  definition(t) {
    t.field('create', { type: 'GroupCreateWithoutUsersInput' })
    t.field('connect', { type: 'GroupWhereUniqueInput' })
  },
})

schema.inputObjectType({
  name: 'UserCreateWithoutCommentInput',
  definition(t) {
    t.field('createdAt', { type: 'DateTime' })
    t.field('email', { type: 'String', nullable: false })
    t.field('name', { type: 'String' })
    t.field('password', { type: 'String', nullable: false })
    t.field('posts', { type: 'PostCreateManyWithoutAuthorInput' })
    t.field('group', { type: 'GroupCreateOneWithoutUsersInput' })
  },
})

schema.inputObjectType({
  name: 'UserCreateOneWithoutCommentInput',
  definition(t) {
    t.field('create', { type: 'UserCreateWithoutCommentInput' })
    t.field('connect', { type: 'UserWhereUniqueInput' })
  },
})

schema.inputObjectType({
  name: 'CommentCreateWithoutPostInput',
  definition(t) {
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('contain', { type: 'String', nullable: false })
    t.field('author', { type: 'UserCreateOneWithoutCommentInput' })
  },
})

schema.inputObjectType({
  name: 'CommentCreateManyWithoutPostInput',
  definition(t) {
    t.field('create', { type: 'CommentCreateWithoutPostInput', list: true })
    t.field('connect', { type: 'CommentWhereUniqueInput', list: true })
  },
})

schema.inputObjectType({
  name: 'PostCreateWithoutAuthorInput',
  definition(t) {
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('published', { type: 'Boolean' })
    t.field('title', { type: 'String', nullable: false })
    t.field('comments', { type: 'CommentCreateManyWithoutPostInput' })
  },
})

schema.inputObjectType({
  name: 'PostCreateManyWithoutAuthorInput',
  definition(t) {
    t.field('create', { type: 'PostCreateWithoutAuthorInput', list: true })
    t.field('connect', { type: 'PostWhereUniqueInput', list: true })
  },
})

schema.inputObjectType({
  name: 'UserCreateWithoutPostsInput',
  definition(t) {
    t.field('createdAt', { type: 'DateTime' })
    t.field('email', { type: 'String', nullable: false })
    t.field('name', { type: 'String' })
    t.field('password', { type: 'String', nullable: false })
    t.field('group', { type: 'GroupCreateOneWithoutUsersInput' })
    t.field('Comment', { type: 'CommentCreateManyWithoutAuthorInput' })
  },
})

schema.inputObjectType({
  name: 'UserCreateOneWithoutPostsInput',
  definition(t) {
    t.field('create', { type: 'UserCreateWithoutPostsInput' })
    t.field('connect', { type: 'UserWhereUniqueInput' })
  },
})

schema.inputObjectType({
  name: 'PostCreateWithoutCommentsInput',
  definition(t) {
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('published', { type: 'Boolean' })
    t.field('title', { type: 'String', nullable: false })
    t.field('author', { type: 'UserCreateOneWithoutPostsInput' })
  },
})

schema.inputObjectType({
  name: 'PostCreateOneWithoutCommentsInput',
  definition(t) {
    t.field('create', { type: 'PostCreateWithoutCommentsInput' })
    t.field('connect', { type: 'PostWhereUniqueInput' })
  },
})

schema.inputObjectType({
  name: 'CommentCreateWithoutAuthorInput',
  definition(t) {
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('contain', { type: 'String', nullable: false })
    t.field('post', {
      type: 'PostCreateOneWithoutCommentsInput',
      nullable: false,
    })
  },
})

schema.inputObjectType({
  name: 'CommentCreateManyWithoutAuthorInput',
  definition(t) {
    t.field('create', { type: 'CommentCreateWithoutAuthorInput', list: true })
    t.field('connect', { type: 'CommentWhereUniqueInput', list: true })
  },
})

schema.inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.field('createdAt', { type: 'DateTime' })
    t.field('email', { type: 'String', nullable: false })
    t.field('name', { type: 'String' })
    t.field('password', { type: 'String', nullable: false })
    t.field('posts', { type: 'PostCreateManyWithoutAuthorInput' })
    t.field('group', { type: 'GroupCreateOneWithoutUsersInput' })
    t.field('Comment', { type: 'CommentCreateManyWithoutAuthorInput' })
  },
})

schema.inputObjectType({
  name: 'GroupUpdateWithoutUsersDataInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})

schema.inputObjectType({
  name: 'GroupUpsertWithoutUsersInput',
  definition(t) {
    t.field('update', {
      type: 'GroupUpdateWithoutUsersDataInput',
      nullable: false,
    })
    t.field('create', { type: 'GroupCreateWithoutUsersInput', nullable: false })
  },
})

schema.inputObjectType({
  name: 'GroupUpdateOneWithoutUsersInput',
  definition(t) {
    t.field('create', { type: 'GroupCreateWithoutUsersInput' })
    t.field('connect', { type: 'GroupWhereUniqueInput' })
    t.field('disconnect', { type: 'Boolean' })
    t.field('delete', { type: 'Boolean' })
    t.field('update', { type: 'GroupUpdateWithoutUsersDataInput' })
    t.field('upsert', { type: 'GroupUpsertWithoutUsersInput' })
  },
})

schema.inputObjectType({
  name: 'UserUpdateWithoutCommentDataInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('email', { type: 'String' })
    t.field('name', { type: 'String' })
    t.field('password', { type: 'String' })
    t.field('posts', { type: 'PostUpdateManyWithoutAuthorInput' })
    t.field('group', { type: 'GroupUpdateOneWithoutUsersInput' })
  },
})

schema.inputObjectType({
  name: 'UserUpsertWithoutCommentInput',
  definition(t) {
    t.field('update', {
      type: 'UserUpdateWithoutCommentDataInput',
      nullable: false,
    })
    t.field('create', {
      type: 'UserCreateWithoutCommentInput',
      nullable: false,
    })
  },
})

schema.inputObjectType({
  name: 'UserUpdateOneWithoutCommentInput',
  definition(t) {
    t.field('create', { type: 'UserCreateWithoutCommentInput' })
    t.field('connect', { type: 'UserWhereUniqueInput' })
    t.field('disconnect', { type: 'Boolean' })
    t.field('delete', { type: 'Boolean' })
    t.field('update', { type: 'UserUpdateWithoutCommentDataInput' })
    t.field('upsert', { type: 'UserUpsertWithoutCommentInput' })
  },
})

schema.inputObjectType({
  name: 'CommentUpdateWithoutPostDataInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('contain', { type: 'String' })
    t.field('author', { type: 'UserUpdateOneWithoutCommentInput' })
  },
})

schema.inputObjectType({
  name: 'CommentUpdateWithWhereUniqueWithoutPostInput',
  definition(t) {
    t.field('where', { type: 'CommentWhereUniqueInput', nullable: false })
    t.field('data', {
      type: 'CommentUpdateWithoutPostDataInput',
      nullable: false,
    })
  },
})

schema.inputObjectType({
  name: 'CommentScalarWhereInput',
  definition(t) {
    t.field('id', { type: 'IntFilter' })
    t.field('createdAt', { type: 'DateTimeFilter' })
    t.field('updatedAt', { type: 'DateTimeFilter' })
    t.field('contain', { type: 'StringFilter' })
    t.field('postId', { type: 'IntFilter' })
    t.field('authorId', { type: 'NullableIntFilter' })
    t.field('AND', { type: 'CommentScalarWhereInput', list: true })
    t.field('OR', { type: 'CommentScalarWhereInput', list: true })
    t.field('NOT', { type: 'CommentScalarWhereInput', list: true })
  },
})

schema.inputObjectType({
  name: 'CommentUpdateManyDataInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('contain', { type: 'String' })
  },
})

schema.inputObjectType({
  name: 'CommentUpdateManyWithWhereNestedInput',
  definition(t) {
    t.field('where', { type: 'CommentScalarWhereInput', nullable: false })
    t.field('data', { type: 'CommentUpdateManyDataInput', nullable: false })
  },
})

schema.inputObjectType({
  name: 'CommentUpsertWithWhereUniqueWithoutPostInput',
  definition(t) {
    t.field('where', { type: 'CommentWhereUniqueInput', nullable: false })
    t.field('update', {
      type: 'CommentUpdateWithoutPostDataInput',
      nullable: false,
    })
    t.field('create', {
      type: 'CommentCreateWithoutPostInput',
      nullable: false,
    })
  },
})

schema.inputObjectType({
  name: 'CommentUpdateManyWithoutPostInput',
  definition(t) {
    t.field('create', { type: 'CommentCreateWithoutPostInput', list: true })
    t.field('connect', { type: 'CommentWhereUniqueInput', list: true })
    t.field('set', { type: 'CommentWhereUniqueInput', list: true })
    t.field('disconnect', { type: 'CommentWhereUniqueInput', list: true })
    t.field('delete', { type: 'CommentWhereUniqueInput', list: true })
    t.field('update', {
      type: 'CommentUpdateWithWhereUniqueWithoutPostInput',
      list: true,
    })
    t.field('updateMany', {
      type: 'CommentUpdateManyWithWhereNestedInput',
      list: true,
    })
    t.field('deleteMany', { type: 'CommentScalarWhereInput', list: true })
    t.field('upsert', {
      type: 'CommentUpsertWithWhereUniqueWithoutPostInput',
      list: true,
    })
  },
})

schema.inputObjectType({
  name: 'PostUpdateWithoutAuthorDataInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('published', { type: 'Boolean' })
    t.field('title', { type: 'String' })
    t.field('comments', { type: 'CommentUpdateManyWithoutPostInput' })
  },
})

schema.inputObjectType({
  name: 'PostUpdateWithWhereUniqueWithoutAuthorInput',
  definition(t) {
    t.field('where', { type: 'PostWhereUniqueInput', nullable: false })
    t.field('data', {
      type: 'PostUpdateWithoutAuthorDataInput',
      nullable: false,
    })
  },
})

schema.inputObjectType({
  name: 'PostScalarWhereInput',
  definition(t) {
    t.field('id', { type: 'IntFilter' })
    t.field('createdAt', { type: 'DateTimeFilter' })
    t.field('updatedAt', { type: 'DateTimeFilter' })
    t.field('published', { type: 'BooleanFilter' })
    t.field('title', { type: 'StringFilter' })
    t.field('authorId', { type: 'NullableIntFilter' })
    t.field('comments', { type: 'CommentFilter' })
    t.field('AND', { type: 'PostScalarWhereInput', list: true })
    t.field('OR', { type: 'PostScalarWhereInput', list: true })
    t.field('NOT', { type: 'PostScalarWhereInput', list: true })
  },
})

schema.inputObjectType({
  name: 'PostUpdateManyDataInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('published', { type: 'Boolean' })
    t.field('title', { type: 'String' })
  },
})

schema.inputObjectType({
  name: 'PostUpdateManyWithWhereNestedInput',
  definition(t) {
    t.field('where', { type: 'PostScalarWhereInput', nullable: false })
    t.field('data', { type: 'PostUpdateManyDataInput', nullable: false })
  },
})

schema.inputObjectType({
  name: 'PostUpsertWithWhereUniqueWithoutAuthorInput',
  definition(t) {
    t.field('where', { type: 'PostWhereUniqueInput', nullable: false })
    t.field('update', {
      type: 'PostUpdateWithoutAuthorDataInput',
      nullable: false,
    })
    t.field('create', { type: 'PostCreateWithoutAuthorInput', nullable: false })
  },
})

schema.inputObjectType({
  name: 'PostUpdateManyWithoutAuthorInput',
  definition(t) {
    t.field('create', { type: 'PostCreateWithoutAuthorInput', list: true })
    t.field('connect', { type: 'PostWhereUniqueInput', list: true })
    t.field('set', { type: 'PostWhereUniqueInput', list: true })
    t.field('disconnect', { type: 'PostWhereUniqueInput', list: true })
    t.field('delete', { type: 'PostWhereUniqueInput', list: true })
    t.field('update', {
      type: 'PostUpdateWithWhereUniqueWithoutAuthorInput',
      list: true,
    })
    t.field('updateMany', {
      type: 'PostUpdateManyWithWhereNestedInput',
      list: true,
    })
    t.field('deleteMany', { type: 'PostScalarWhereInput', list: true })
    t.field('upsert', {
      type: 'PostUpsertWithWhereUniqueWithoutAuthorInput',
      list: true,
    })
  },
})

schema.inputObjectType({
  name: 'UserUpdateWithoutPostsDataInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('email', { type: 'String' })
    t.field('name', { type: 'String' })
    t.field('password', { type: 'String' })
    t.field('group', { type: 'GroupUpdateOneWithoutUsersInput' })
    t.field('Comment', { type: 'CommentUpdateManyWithoutAuthorInput' })
  },
})

schema.inputObjectType({
  name: 'UserUpsertWithoutPostsInput',
  definition(t) {
    t.field('update', {
      type: 'UserUpdateWithoutPostsDataInput',
      nullable: false,
    })
    t.field('create', { type: 'UserCreateWithoutPostsInput', nullable: false })
  },
})

schema.inputObjectType({
  name: 'UserUpdateOneWithoutPostsInput',
  definition(t) {
    t.field('create', { type: 'UserCreateWithoutPostsInput' })
    t.field('connect', { type: 'UserWhereUniqueInput' })
    t.field('disconnect', { type: 'Boolean' })
    t.field('delete', { type: 'Boolean' })
    t.field('update', { type: 'UserUpdateWithoutPostsDataInput' })
    t.field('upsert', { type: 'UserUpsertWithoutPostsInput' })
  },
})

schema.inputObjectType({
  name: 'PostUpdateWithoutCommentsDataInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('published', { type: 'Boolean' })
    t.field('title', { type: 'String' })
    t.field('author', { type: 'UserUpdateOneWithoutPostsInput' })
  },
})

schema.inputObjectType({
  name: 'PostUpsertWithoutCommentsInput',
  definition(t) {
    t.field('update', {
      type: 'PostUpdateWithoutCommentsDataInput',
      nullable: false,
    })
    t.field('create', {
      type: 'PostCreateWithoutCommentsInput',
      nullable: false,
    })
  },
})

schema.inputObjectType({
  name: 'PostUpdateOneRequiredWithoutCommentsInput',
  definition(t) {
    t.field('create', { type: 'PostCreateWithoutCommentsInput' })
    t.field('connect', { type: 'PostWhereUniqueInput' })
    t.field('update', { type: 'PostUpdateWithoutCommentsDataInput' })
    t.field('upsert', { type: 'PostUpsertWithoutCommentsInput' })
  },
})

schema.inputObjectType({
  name: 'CommentUpdateWithoutAuthorDataInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('contain', { type: 'String' })
    t.field('post', { type: 'PostUpdateOneRequiredWithoutCommentsInput' })
  },
})

schema.inputObjectType({
  name: 'CommentUpdateWithWhereUniqueWithoutAuthorInput',
  definition(t) {
    t.field('where', { type: 'CommentWhereUniqueInput', nullable: false })
    t.field('data', {
      type: 'CommentUpdateWithoutAuthorDataInput',
      nullable: false,
    })
  },
})

schema.inputObjectType({
  name: 'CommentUpsertWithWhereUniqueWithoutAuthorInput',
  definition(t) {
    t.field('where', { type: 'CommentWhereUniqueInput', nullable: false })
    t.field('update', {
      type: 'CommentUpdateWithoutAuthorDataInput',
      nullable: false,
    })
    t.field('create', {
      type: 'CommentCreateWithoutAuthorInput',
      nullable: false,
    })
  },
})

schema.inputObjectType({
  name: 'CommentUpdateManyWithoutAuthorInput',
  definition(t) {
    t.field('create', { type: 'CommentCreateWithoutAuthorInput', list: true })
    t.field('connect', { type: 'CommentWhereUniqueInput', list: true })
    t.field('set', { type: 'CommentWhereUniqueInput', list: true })
    t.field('disconnect', { type: 'CommentWhereUniqueInput', list: true })
    t.field('delete', { type: 'CommentWhereUniqueInput', list: true })
    t.field('update', {
      type: 'CommentUpdateWithWhereUniqueWithoutAuthorInput',
      list: true,
    })
    t.field('updateMany', {
      type: 'CommentUpdateManyWithWhereNestedInput',
      list: true,
    })
    t.field('deleteMany', { type: 'CommentScalarWhereInput', list: true })
    t.field('upsert', {
      type: 'CommentUpsertWithWhereUniqueWithoutAuthorInput',
      list: true,
    })
  },
})

schema.inputObjectType({
  name: 'UserUpdateInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('email', { type: 'String' })
    t.field('name', { type: 'String' })
    t.field('password', { type: 'String' })
    t.field('posts', { type: 'PostUpdateManyWithoutAuthorInput' })
    t.field('group', { type: 'GroupUpdateOneWithoutUsersInput' })
    t.field('Comment', { type: 'CommentUpdateManyWithoutAuthorInput' })
  },
})

schema.inputObjectType({
  name: 'UserUpdateManyMutationInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('email', { type: 'String' })
    t.field('name', { type: 'String' })
    t.field('password', { type: 'String' })
  },
})

schema.inputObjectType({
  name: 'PostCreateInput',
  definition(t) {
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('published', { type: 'Boolean' })
    t.field('title', { type: 'String', nullable: false })
    t.field('author', { type: 'UserCreateOneWithoutPostsInput' })
    t.field('comments', { type: 'CommentCreateManyWithoutPostInput' })
  },
})

schema.inputObjectType({
  name: 'PostUpdateInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('published', { type: 'Boolean' })
    t.field('title', { type: 'String' })
    t.field('author', { type: 'UserUpdateOneWithoutPostsInput' })
    t.field('comments', { type: 'CommentUpdateManyWithoutPostInput' })
  },
})

schema.inputObjectType({
  name: 'PostUpdateManyMutationInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('published', { type: 'Boolean' })
    t.field('title', { type: 'String' })
  },
})

schema.inputObjectType({
  name: 'CommentCreateInput',
  definition(t) {
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('contain', { type: 'String', nullable: false })
    t.field('post', {
      type: 'PostCreateOneWithoutCommentsInput',
      nullable: false,
    })
    t.field('author', { type: 'UserCreateOneWithoutCommentInput' })
  },
})

schema.inputObjectType({
  name: 'CommentUpdateInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('contain', { type: 'String' })
    t.field('post', { type: 'PostUpdateOneRequiredWithoutCommentsInput' })
    t.field('author', { type: 'UserUpdateOneWithoutCommentInput' })
  },
})

schema.inputObjectType({
  name: 'CommentUpdateManyMutationInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('contain', { type: 'String' })
  },
})

schema.inputObjectType({
  name: 'UserCreateWithoutGroupInput',
  definition(t) {
    t.field('createdAt', { type: 'DateTime' })
    t.field('email', { type: 'String', nullable: false })
    t.field('name', { type: 'String' })
    t.field('password', { type: 'String', nullable: false })
    t.field('posts', { type: 'PostCreateManyWithoutAuthorInput' })
    t.field('Comment', { type: 'CommentCreateManyWithoutAuthorInput' })
  },
})

schema.inputObjectType({
  name: 'UserCreateManyWithoutGroupInput',
  definition(t) {
    t.field('create', { type: 'UserCreateWithoutGroupInput', list: true })
    t.field('connect', { type: 'UserWhereUniqueInput', list: true })
  },
})

schema.inputObjectType({
  name: 'GroupCreateInput',
  definition(t) {
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('users', { type: 'UserCreateManyWithoutGroupInput' })
  },
})

schema.inputObjectType({
  name: 'UserUpdateWithoutGroupDataInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('email', { type: 'String' })
    t.field('name', { type: 'String' })
    t.field('password', { type: 'String' })
    t.field('posts', { type: 'PostUpdateManyWithoutAuthorInput' })
    t.field('Comment', { type: 'CommentUpdateManyWithoutAuthorInput' })
  },
})

schema.inputObjectType({
  name: 'UserUpdateWithWhereUniqueWithoutGroupInput',
  definition(t) {
    t.field('where', { type: 'UserWhereUniqueInput', nullable: false })
    t.field('data', {
      type: 'UserUpdateWithoutGroupDataInput',
      nullable: false,
    })
  },
})

schema.inputObjectType({
  name: 'UserScalarWhereInput',
  definition(t) {
    t.field('id', { type: 'IntFilter' })
    t.field('createdAt', { type: 'DateTimeFilter' })
    t.field('email', { type: 'StringFilter' })
    t.field('name', { type: 'NullableStringFilter' })
    t.field('password', { type: 'StringFilter' })
    t.field('posts', { type: 'PostFilter' })
    t.field('groupId', { type: 'NullableIntFilter' })
    t.field('Comment', { type: 'CommentFilter' })
    t.field('AND', { type: 'UserScalarWhereInput', list: true })
    t.field('OR', { type: 'UserScalarWhereInput', list: true })
    t.field('NOT', { type: 'UserScalarWhereInput', list: true })
  },
})

schema.inputObjectType({
  name: 'UserUpdateManyDataInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('email', { type: 'String' })
    t.field('name', { type: 'String' })
    t.field('password', { type: 'String' })
  },
})

schema.inputObjectType({
  name: 'UserUpdateManyWithWhereNestedInput',
  definition(t) {
    t.field('where', { type: 'UserScalarWhereInput', nullable: false })
    t.field('data', { type: 'UserUpdateManyDataInput', nullable: false })
  },
})

schema.inputObjectType({
  name: 'UserUpsertWithWhereUniqueWithoutGroupInput',
  definition(t) {
    t.field('where', { type: 'UserWhereUniqueInput', nullable: false })
    t.field('update', {
      type: 'UserUpdateWithoutGroupDataInput',
      nullable: false,
    })
    t.field('create', { type: 'UserCreateWithoutGroupInput', nullable: false })
  },
})

schema.inputObjectType({
  name: 'UserUpdateManyWithoutGroupInput',
  definition(t) {
    t.field('create', { type: 'UserCreateWithoutGroupInput', list: true })
    t.field('connect', { type: 'UserWhereUniqueInput', list: true })
    t.field('set', { type: 'UserWhereUniqueInput', list: true })
    t.field('disconnect', { type: 'UserWhereUniqueInput', list: true })
    t.field('delete', { type: 'UserWhereUniqueInput', list: true })
    t.field('update', {
      type: 'UserUpdateWithWhereUniqueWithoutGroupInput',
      list: true,
    })
    t.field('updateMany', {
      type: 'UserUpdateManyWithWhereNestedInput',
      list: true,
    })
    t.field('deleteMany', { type: 'UserScalarWhereInput', list: true })
    t.field('upsert', {
      type: 'UserUpsertWithWhereUniqueWithoutGroupInput',
      list: true,
    })
  },
})

schema.inputObjectType({
  name: 'GroupUpdateInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('users', { type: 'UserUpdateManyWithoutGroupInput' })
  },
})

schema.inputObjectType({
  name: 'GroupUpdateManyMutationInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})

schema.inputObjectType({
  name: 'IntFilter',
  definition(t) {
    t.field('equals', { type: 'Int' })
    t.field('not', { type: 'Int' })
    t.field('in', { type: 'Int', list: true })
    t.field('notIn', { type: 'Int', list: true })
    t.field('lt', { type: 'Int' })
    t.field('lte', { type: 'Int' })
    t.field('gt', { type: 'Int' })
    t.field('gte', { type: 'Int' })
  },
})

schema.inputObjectType({
  name: 'DateTimeFilter',
  definition(t) {
    t.field('equals', { type: 'DateTime' })
    t.field('not', { type: 'DateTime' })
    t.field('in', { type: 'DateTime', list: true })
    t.field('notIn', { type: 'DateTime', list: true })
    t.field('lt', { type: 'DateTime' })
    t.field('lte', { type: 'DateTime' })
    t.field('gt', { type: 'DateTime' })
    t.field('gte', { type: 'DateTime' })
  },
})

schema.inputObjectType({
  name: 'StringFilter',
  definition(t) {
    t.field('equals', { type: 'String' })
    t.field('not', { type: 'String' })
    t.field('in', { type: 'String', list: true })
    t.field('notIn', { type: 'String', list: true })
    t.field('lt', { type: 'String' })
    t.field('lte', { type: 'String' })
    t.field('gt', { type: 'String' })
    t.field('gte', { type: 'String' })
    t.field('contains', { type: 'String' })
    t.field('startsWith', { type: 'String' })
    t.field('endsWith', { type: 'String' })
  },
})

schema.inputObjectType({
  name: 'NullableIntFilter',
  definition(t) {
    t.field('equals', { type: 'Int' })
    t.field('not', { type: 'Int' })
    t.field('in', { type: 'Int', list: true })
    t.field('notIn', { type: 'Int', list: true })
    t.field('lt', { type: 'Int' })
    t.field('lte', { type: 'Int' })
    t.field('gt', { type: 'Int' })
    t.field('gte', { type: 'Int' })
  },
})

schema.inputObjectType({
  name: 'BooleanFilter',
  definition(t) {
    t.field('equals', { type: 'Boolean' })
    t.field('not', { type: 'Boolean' })
  },
})

schema.inputObjectType({
  name: 'CommentFilter',
  definition(t) {
    t.field('every', { type: 'CommentWhereInput' })
    t.field('some', { type: 'CommentWhereInput' })
    t.field('none', { type: 'CommentWhereInput' })
  },
})

schema.inputObjectType({
  name: 'UserFilter',
  definition(t) {
    t.field('every', { type: 'UserWhereInput' })
    t.field('some', { type: 'UserWhereInput' })
    t.field('none', { type: 'UserWhereInput' })
  },
})

schema.inputObjectType({
  name: 'NullableStringFilter',
  definition(t) {
    t.field('equals', { type: 'String' })
    t.field('not', { type: 'String' })
    t.field('in', { type: 'String', list: true })
    t.field('notIn', { type: 'String', list: true })
    t.field('lt', { type: 'String' })
    t.field('lte', { type: 'String' })
    t.field('gt', { type: 'String' })
    t.field('gte', { type: 'String' })
    t.field('contains', { type: 'String' })
    t.field('startsWith', { type: 'String' })
    t.field('endsWith', { type: 'String' })
  },
})

schema.inputObjectType({
  name: 'PostFilter',
  definition(t) {
    t.field('every', { type: 'PostWhereInput' })
    t.field('some', { type: 'PostWhereInput' })
    t.field('none', { type: 'PostWhereInput' })
  },
})

schema.inputObjectType({
  name: 'UserOrderByInput',
  definition(t) {
    t.field('id', { type: 'OrderByArg' })
    t.field('createdAt', { type: 'OrderByArg' })
    t.field('email', { type: 'OrderByArg' })
    t.field('name', { type: 'OrderByArg' })
    t.field('password', { type: 'OrderByArg' })
    t.field('groupId', { type: 'OrderByArg' })
  },
})

schema.inputObjectType({
  name: 'PostOrderByInput',
  definition(t) {
    t.field('id', { type: 'OrderByArg' })
    t.field('createdAt', { type: 'OrderByArg' })
    t.field('updatedAt', { type: 'OrderByArg' })
    t.field('published', { type: 'OrderByArg' })
    t.field('title', { type: 'OrderByArg' })
    t.field('authorId', { type: 'OrderByArg' })
  },
})

schema.inputObjectType({
  name: 'CommentOrderByInput',
  definition(t) {
    t.field('id', { type: 'OrderByArg' })
    t.field('createdAt', { type: 'OrderByArg' })
    t.field('updatedAt', { type: 'OrderByArg' })
    t.field('contain', { type: 'OrderByArg' })
    t.field('postId', { type: 'OrderByArg' })
    t.field('authorId', { type: 'OrderByArg' })
  },
})

schema.inputObjectType({
  name: 'GroupOrderByInput',
  definition(t) {
    t.field('id', { type: 'OrderByArg' })
    t.field('createdAt', { type: 'OrderByArg' })
    t.field('updatedAt', { type: 'OrderByArg' })
  },
})
