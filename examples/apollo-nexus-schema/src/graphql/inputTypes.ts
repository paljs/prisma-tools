import {
  enumType,
  scalarType,
  inputObjectType,
  objectType,
} from '@nexus/schema'

export const DateTime = scalarType({
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

export const BatchPayload = objectType({
  name: 'BatchPayload',
  definition(t) {
    t.int('count', { nullable: false })
  },
})

export const OrderByArg = enumType({
  name: 'OrderByArg',
  members: ['asc', 'desc'],
})

export const CommentWhereInput = inputObjectType({
  name: 'CommentWhereInput',
  definition(t) {
    t.field('id', { type: 'IntFilter' })
    t.field('contain', { type: 'StringFilter' })
    t.field('postId', { type: 'IntFilter' })
    t.field('authorId', { type: 'NullableIntFilter' })
    t.field('createdAt', { type: 'DateTimeFilter' })
    t.field('updatedAt', { type: 'DateTimeFilter' })
    t.field('AND', { type: 'CommentWhereInput', list: true })
    t.field('OR', { type: 'CommentWhereInput', list: true })
    t.field('NOT', { type: 'CommentWhereInput', list: true })
    t.field('post', { type: 'PostWhereInput' })
    t.field('author', { type: 'UserWhereInput' })
  },
})

export const PostWhereInput = inputObjectType({
  name: 'PostWhereInput',
  definition(t) {
    t.field('id', { type: 'IntFilter' })
    t.field('published', { type: 'BooleanFilter' })
    t.field('title', { type: 'StringFilter' })
    t.field('authorId', { type: 'NullableIntFilter' })
    t.field('comments', { type: 'CommentFilter' })
    t.field('createdAt', { type: 'DateTimeFilter' })
    t.field('updatedAt', { type: 'DateTimeFilter' })
    t.field('AND', { type: 'PostWhereInput', list: true })
    t.field('OR', { type: 'PostWhereInput', list: true })
    t.field('NOT', { type: 'PostWhereInput', list: true })
    t.field('author', { type: 'UserWhereInput' })
  },
})

export const GroupWhereInput = inputObjectType({
  name: 'GroupWhereInput',
  definition(t) {
    t.field('id', { type: 'IntFilter' })
    t.field('name', { type: 'StringFilter' })
    t.field('createdAt', { type: 'DateTimeFilter' })
    t.field('updatedAt', { type: 'DateTimeFilter' })
    t.field('users', { type: 'UserFilter' })
    t.field('AND', { type: 'GroupWhereInput', list: true })
    t.field('OR', { type: 'GroupWhereInput', list: true })
    t.field('NOT', { type: 'GroupWhereInput', list: true })
  },
})

export const UserWhereInput = inputObjectType({
  name: 'UserWhereInput',
  definition(t) {
    t.field('id', { type: 'IntFilter' })
    t.field('createdAt', { type: 'DateTimeFilter' })
    t.field('email', { type: 'StringFilter' })
    t.field('name', { type: 'NullableStringFilter' })
    t.field('password', { type: 'StringFilter' })
    t.field('posts', { type: 'PostFilter' })
    t.field('groupId', { type: 'NullableIntFilter' })
    t.field('comments', { type: 'CommentFilter' })
    t.field('AND', { type: 'UserWhereInput', list: true })
    t.field('OR', { type: 'UserWhereInput', list: true })
    t.field('NOT', { type: 'UserWhereInput', list: true })
    t.field('group', { type: 'GroupWhereInput' })
  },
})

export const UserWhereUniqueInput = inputObjectType({
  name: 'UserWhereUniqueInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('email', { type: 'String' })
  },
})

export const PostWhereUniqueInput = inputObjectType({
  name: 'PostWhereUniqueInput',
  definition(t) {
    t.field('id', { type: 'Int' })
  },
})

export const CommentWhereUniqueInput = inputObjectType({
  name: 'CommentWhereUniqueInput',
  definition(t) {
    t.field('id', { type: 'Int' })
  },
})

export const GroupWhereUniqueInput = inputObjectType({
  name: 'GroupWhereUniqueInput',
  definition(t) {
    t.field('id', { type: 'Int' })
  },
})

export const GroupCreateWithoutUsersInput = inputObjectType({
  name: 'GroupCreateWithoutUsersInput',
  definition(t) {
    t.field('name', { type: 'String', nullable: false })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})

export const GroupCreateOneWithoutUsersInput = inputObjectType({
  name: 'GroupCreateOneWithoutUsersInput',
  definition(t) {
    t.field('create', { type: 'GroupCreateWithoutUsersInput' })
    t.field('connect', { type: 'GroupWhereUniqueInput' })
  },
})

export const UserCreateWithoutCommentsInput = inputObjectType({
  name: 'UserCreateWithoutCommentsInput',
  definition(t) {
    t.field('createdAt', { type: 'DateTime' })
    t.field('email', { type: 'String', nullable: false })
    t.field('name', { type: 'String' })
    t.field('password', { type: 'String', nullable: false })
    t.field('posts', { type: 'PostCreateManyWithoutAuthorInput' })
    t.field('group', { type: 'GroupCreateOneWithoutUsersInput' })
  },
})

export const UserCreateOneWithoutCommentsInput = inputObjectType({
  name: 'UserCreateOneWithoutCommentsInput',
  definition(t) {
    t.field('create', { type: 'UserCreateWithoutCommentsInput' })
    t.field('connect', { type: 'UserWhereUniqueInput' })
  },
})

export const CommentCreateWithoutPostInput = inputObjectType({
  name: 'CommentCreateWithoutPostInput',
  definition(t) {
    t.field('contain', { type: 'String', nullable: false })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('author', { type: 'UserCreateOneWithoutCommentsInput' })
  },
})

export const CommentCreateManyWithoutPostInput = inputObjectType({
  name: 'CommentCreateManyWithoutPostInput',
  definition(t) {
    t.field('create', { type: 'CommentCreateWithoutPostInput', list: true })
    t.field('connect', { type: 'CommentWhereUniqueInput', list: true })
  },
})

export const PostCreateWithoutAuthorInput = inputObjectType({
  name: 'PostCreateWithoutAuthorInput',
  definition(t) {
    t.field('published', { type: 'Boolean' })
    t.field('title', { type: 'String', nullable: false })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('comments', { type: 'CommentCreateManyWithoutPostInput' })
  },
})

export const PostCreateManyWithoutAuthorInput = inputObjectType({
  name: 'PostCreateManyWithoutAuthorInput',
  definition(t) {
    t.field('create', { type: 'PostCreateWithoutAuthorInput', list: true })
    t.field('connect', { type: 'PostWhereUniqueInput', list: true })
  },
})

export const UserCreateWithoutPostsInput = inputObjectType({
  name: 'UserCreateWithoutPostsInput',
  definition(t) {
    t.field('createdAt', { type: 'DateTime' })
    t.field('email', { type: 'String', nullable: false })
    t.field('name', { type: 'String' })
    t.field('password', { type: 'String', nullable: false })
    t.field('group', { type: 'GroupCreateOneWithoutUsersInput' })
    t.field('comments', { type: 'CommentCreateManyWithoutAuthorInput' })
  },
})

export const UserCreateOneWithoutPostsInput = inputObjectType({
  name: 'UserCreateOneWithoutPostsInput',
  definition(t) {
    t.field('create', { type: 'UserCreateWithoutPostsInput' })
    t.field('connect', { type: 'UserWhereUniqueInput' })
  },
})

export const PostCreateWithoutCommentsInput = inputObjectType({
  name: 'PostCreateWithoutCommentsInput',
  definition(t) {
    t.field('published', { type: 'Boolean' })
    t.field('title', { type: 'String', nullable: false })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('author', { type: 'UserCreateOneWithoutPostsInput' })
  },
})

export const PostCreateOneWithoutCommentsInput = inputObjectType({
  name: 'PostCreateOneWithoutCommentsInput',
  definition(t) {
    t.field('create', { type: 'PostCreateWithoutCommentsInput' })
    t.field('connect', { type: 'PostWhereUniqueInput' })
  },
})

export const CommentCreateWithoutAuthorInput = inputObjectType({
  name: 'CommentCreateWithoutAuthorInput',
  definition(t) {
    t.field('contain', { type: 'String', nullable: false })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('post', {
      type: 'PostCreateOneWithoutCommentsInput',
      nullable: false,
    })
  },
})

export const CommentCreateManyWithoutAuthorInput = inputObjectType({
  name: 'CommentCreateManyWithoutAuthorInput',
  definition(t) {
    t.field('create', { type: 'CommentCreateWithoutAuthorInput', list: true })
    t.field('connect', { type: 'CommentWhereUniqueInput', list: true })
  },
})

export const UserCreateInput = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.field('createdAt', { type: 'DateTime' })
    t.field('email', { type: 'String', nullable: false })
    t.field('name', { type: 'String' })
    t.field('password', { type: 'String', nullable: false })
    t.field('posts', { type: 'PostCreateManyWithoutAuthorInput' })
    t.field('group', { type: 'GroupCreateOneWithoutUsersInput' })
    t.field('comments', { type: 'CommentCreateManyWithoutAuthorInput' })
  },
})

export const GroupUpdateWithoutUsersDataInput = inputObjectType({
  name: 'GroupUpdateWithoutUsersDataInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('name', { type: 'String' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})

export const GroupUpsertWithoutUsersInput = inputObjectType({
  name: 'GroupUpsertWithoutUsersInput',
  definition(t) {
    t.field('update', {
      type: 'GroupUpdateWithoutUsersDataInput',
      nullable: false,
    })
    t.field('create', { type: 'GroupCreateWithoutUsersInput', nullable: false })
  },
})

export const GroupUpdateOneWithoutUsersInput = inputObjectType({
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

export const UserUpdateWithoutCommentsDataInput = inputObjectType({
  name: 'UserUpdateWithoutCommentsDataInput',
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

export const UserUpsertWithoutCommentsInput = inputObjectType({
  name: 'UserUpsertWithoutCommentsInput',
  definition(t) {
    t.field('update', {
      type: 'UserUpdateWithoutCommentsDataInput',
      nullable: false,
    })
    t.field('create', {
      type: 'UserCreateWithoutCommentsInput',
      nullable: false,
    })
  },
})

export const UserUpdateOneWithoutCommentsInput = inputObjectType({
  name: 'UserUpdateOneWithoutCommentsInput',
  definition(t) {
    t.field('create', { type: 'UserCreateWithoutCommentsInput' })
    t.field('connect', { type: 'UserWhereUniqueInput' })
    t.field('disconnect', { type: 'Boolean' })
    t.field('delete', { type: 'Boolean' })
    t.field('update', { type: 'UserUpdateWithoutCommentsDataInput' })
    t.field('upsert', { type: 'UserUpsertWithoutCommentsInput' })
  },
})

export const CommentUpdateWithoutPostDataInput = inputObjectType({
  name: 'CommentUpdateWithoutPostDataInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('contain', { type: 'String' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('author', { type: 'UserUpdateOneWithoutCommentsInput' })
  },
})

export const CommentUpdateWithWhereUniqueWithoutPostInput = inputObjectType({
  name: 'CommentUpdateWithWhereUniqueWithoutPostInput',
  definition(t) {
    t.field('where', { type: 'CommentWhereUniqueInput', nullable: false })
    t.field('data', {
      type: 'CommentUpdateWithoutPostDataInput',
      nullable: false,
    })
  },
})

export const CommentScalarWhereInput = inputObjectType({
  name: 'CommentScalarWhereInput',
  definition(t) {
    t.field('id', { type: 'IntFilter' })
    t.field('contain', { type: 'StringFilter' })
    t.field('postId', { type: 'IntFilter' })
    t.field('authorId', { type: 'NullableIntFilter' })
    t.field('createdAt', { type: 'DateTimeFilter' })
    t.field('updatedAt', { type: 'DateTimeFilter' })
    t.field('AND', { type: 'CommentScalarWhereInput', list: true })
    t.field('OR', { type: 'CommentScalarWhereInput', list: true })
    t.field('NOT', { type: 'CommentScalarWhereInput', list: true })
  },
})

export const CommentUpdateManyDataInput = inputObjectType({
  name: 'CommentUpdateManyDataInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('contain', { type: 'String' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})

export const CommentUpdateManyWithWhereNestedInput = inputObjectType({
  name: 'CommentUpdateManyWithWhereNestedInput',
  definition(t) {
    t.field('where', { type: 'CommentScalarWhereInput', nullable: false })
    t.field('data', { type: 'CommentUpdateManyDataInput', nullable: false })
  },
})

export const CommentUpsertWithWhereUniqueWithoutPostInput = inputObjectType({
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

export const CommentUpdateManyWithoutPostInput = inputObjectType({
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

export const PostUpdateWithoutAuthorDataInput = inputObjectType({
  name: 'PostUpdateWithoutAuthorDataInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('published', { type: 'Boolean' })
    t.field('title', { type: 'String' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('comments', { type: 'CommentUpdateManyWithoutPostInput' })
  },
})

export const PostUpdateWithWhereUniqueWithoutAuthorInput = inputObjectType({
  name: 'PostUpdateWithWhereUniqueWithoutAuthorInput',
  definition(t) {
    t.field('where', { type: 'PostWhereUniqueInput', nullable: false })
    t.field('data', {
      type: 'PostUpdateWithoutAuthorDataInput',
      nullable: false,
    })
  },
})

export const PostScalarWhereInput = inputObjectType({
  name: 'PostScalarWhereInput',
  definition(t) {
    t.field('id', { type: 'IntFilter' })
    t.field('published', { type: 'BooleanFilter' })
    t.field('title', { type: 'StringFilter' })
    t.field('authorId', { type: 'NullableIntFilter' })
    t.field('comments', { type: 'CommentFilter' })
    t.field('createdAt', { type: 'DateTimeFilter' })
    t.field('updatedAt', { type: 'DateTimeFilter' })
    t.field('AND', { type: 'PostScalarWhereInput', list: true })
    t.field('OR', { type: 'PostScalarWhereInput', list: true })
    t.field('NOT', { type: 'PostScalarWhereInput', list: true })
  },
})

export const PostUpdateManyDataInput = inputObjectType({
  name: 'PostUpdateManyDataInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('published', { type: 'Boolean' })
    t.field('title', { type: 'String' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})

export const PostUpdateManyWithWhereNestedInput = inputObjectType({
  name: 'PostUpdateManyWithWhereNestedInput',
  definition(t) {
    t.field('where', { type: 'PostScalarWhereInput', nullable: false })
    t.field('data', { type: 'PostUpdateManyDataInput', nullable: false })
  },
})

export const PostUpsertWithWhereUniqueWithoutAuthorInput = inputObjectType({
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

export const PostUpdateManyWithoutAuthorInput = inputObjectType({
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

export const UserUpdateWithoutPostsDataInput = inputObjectType({
  name: 'UserUpdateWithoutPostsDataInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('email', { type: 'String' })
    t.field('name', { type: 'String' })
    t.field('password', { type: 'String' })
    t.field('group', { type: 'GroupUpdateOneWithoutUsersInput' })
    t.field('comments', { type: 'CommentUpdateManyWithoutAuthorInput' })
  },
})

export const UserUpsertWithoutPostsInput = inputObjectType({
  name: 'UserUpsertWithoutPostsInput',
  definition(t) {
    t.field('update', {
      type: 'UserUpdateWithoutPostsDataInput',
      nullable: false,
    })
    t.field('create', { type: 'UserCreateWithoutPostsInput', nullable: false })
  },
})

export const UserUpdateOneWithoutPostsInput = inputObjectType({
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

export const PostUpdateWithoutCommentsDataInput = inputObjectType({
  name: 'PostUpdateWithoutCommentsDataInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('published', { type: 'Boolean' })
    t.field('title', { type: 'String' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('author', { type: 'UserUpdateOneWithoutPostsInput' })
  },
})

export const PostUpsertWithoutCommentsInput = inputObjectType({
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

export const PostUpdateOneRequiredWithoutCommentsInput = inputObjectType({
  name: 'PostUpdateOneRequiredWithoutCommentsInput',
  definition(t) {
    t.field('create', { type: 'PostCreateWithoutCommentsInput' })
    t.field('connect', { type: 'PostWhereUniqueInput' })
    t.field('update', { type: 'PostUpdateWithoutCommentsDataInput' })
    t.field('upsert', { type: 'PostUpsertWithoutCommentsInput' })
  },
})

export const CommentUpdateWithoutAuthorDataInput = inputObjectType({
  name: 'CommentUpdateWithoutAuthorDataInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('contain', { type: 'String' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('post', { type: 'PostUpdateOneRequiredWithoutCommentsInput' })
  },
})

export const CommentUpdateWithWhereUniqueWithoutAuthorInput = inputObjectType({
  name: 'CommentUpdateWithWhereUniqueWithoutAuthorInput',
  definition(t) {
    t.field('where', { type: 'CommentWhereUniqueInput', nullable: false })
    t.field('data', {
      type: 'CommentUpdateWithoutAuthorDataInput',
      nullable: false,
    })
  },
})

export const CommentUpsertWithWhereUniqueWithoutAuthorInput = inputObjectType({
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

export const CommentUpdateManyWithoutAuthorInput = inputObjectType({
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

export const UserUpdateInput = inputObjectType({
  name: 'UserUpdateInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('email', { type: 'String' })
    t.field('name', { type: 'String' })
    t.field('password', { type: 'String' })
    t.field('posts', { type: 'PostUpdateManyWithoutAuthorInput' })
    t.field('group', { type: 'GroupUpdateOneWithoutUsersInput' })
    t.field('comments', { type: 'CommentUpdateManyWithoutAuthorInput' })
  },
})

export const UserUpdateManyMutationInput = inputObjectType({
  name: 'UserUpdateManyMutationInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('email', { type: 'String' })
    t.field('name', { type: 'String' })
    t.field('password', { type: 'String' })
  },
})

export const PostCreateInput = inputObjectType({
  name: 'PostCreateInput',
  definition(t) {
    t.field('published', { type: 'Boolean' })
    t.field('title', { type: 'String', nullable: false })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('author', { type: 'UserCreateOneWithoutPostsInput' })
    t.field('comments', { type: 'CommentCreateManyWithoutPostInput' })
  },
})

export const PostUpdateInput = inputObjectType({
  name: 'PostUpdateInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('published', { type: 'Boolean' })
    t.field('title', { type: 'String' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('author', { type: 'UserUpdateOneWithoutPostsInput' })
    t.field('comments', { type: 'CommentUpdateManyWithoutPostInput' })
  },
})

export const PostUpdateManyMutationInput = inputObjectType({
  name: 'PostUpdateManyMutationInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('published', { type: 'Boolean' })
    t.field('title', { type: 'String' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})

export const CommentCreateInput = inputObjectType({
  name: 'CommentCreateInput',
  definition(t) {
    t.field('contain', { type: 'String', nullable: false })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('post', {
      type: 'PostCreateOneWithoutCommentsInput',
      nullable: false,
    })
    t.field('author', { type: 'UserCreateOneWithoutCommentsInput' })
  },
})

export const CommentUpdateInput = inputObjectType({
  name: 'CommentUpdateInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('contain', { type: 'String' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('post', { type: 'PostUpdateOneRequiredWithoutCommentsInput' })
    t.field('author', { type: 'UserUpdateOneWithoutCommentsInput' })
  },
})

export const CommentUpdateManyMutationInput = inputObjectType({
  name: 'CommentUpdateManyMutationInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('contain', { type: 'String' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})

export const UserCreateWithoutGroupInput = inputObjectType({
  name: 'UserCreateWithoutGroupInput',
  definition(t) {
    t.field('createdAt', { type: 'DateTime' })
    t.field('email', { type: 'String', nullable: false })
    t.field('name', { type: 'String' })
    t.field('password', { type: 'String', nullable: false })
    t.field('posts', { type: 'PostCreateManyWithoutAuthorInput' })
    t.field('comments', { type: 'CommentCreateManyWithoutAuthorInput' })
  },
})

export const UserCreateManyWithoutGroupInput = inputObjectType({
  name: 'UserCreateManyWithoutGroupInput',
  definition(t) {
    t.field('create', { type: 'UserCreateWithoutGroupInput', list: true })
    t.field('connect', { type: 'UserWhereUniqueInput', list: true })
  },
})

export const GroupCreateInput = inputObjectType({
  name: 'GroupCreateInput',
  definition(t) {
    t.field('name', { type: 'String', nullable: false })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('users', { type: 'UserCreateManyWithoutGroupInput' })
  },
})

export const UserUpdateWithoutGroupDataInput = inputObjectType({
  name: 'UserUpdateWithoutGroupDataInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('email', { type: 'String' })
    t.field('name', { type: 'String' })
    t.field('password', { type: 'String' })
    t.field('posts', { type: 'PostUpdateManyWithoutAuthorInput' })
    t.field('comments', { type: 'CommentUpdateManyWithoutAuthorInput' })
  },
})

export const UserUpdateWithWhereUniqueWithoutGroupInput = inputObjectType({
  name: 'UserUpdateWithWhereUniqueWithoutGroupInput',
  definition(t) {
    t.field('where', { type: 'UserWhereUniqueInput', nullable: false })
    t.field('data', {
      type: 'UserUpdateWithoutGroupDataInput',
      nullable: false,
    })
  },
})

export const UserScalarWhereInput = inputObjectType({
  name: 'UserScalarWhereInput',
  definition(t) {
    t.field('id', { type: 'IntFilter' })
    t.field('createdAt', { type: 'DateTimeFilter' })
    t.field('email', { type: 'StringFilter' })
    t.field('name', { type: 'NullableStringFilter' })
    t.field('password', { type: 'StringFilter' })
    t.field('posts', { type: 'PostFilter' })
    t.field('groupId', { type: 'NullableIntFilter' })
    t.field('comments', { type: 'CommentFilter' })
    t.field('AND', { type: 'UserScalarWhereInput', list: true })
    t.field('OR', { type: 'UserScalarWhereInput', list: true })
    t.field('NOT', { type: 'UserScalarWhereInput', list: true })
  },
})

export const UserUpdateManyDataInput = inputObjectType({
  name: 'UserUpdateManyDataInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('email', { type: 'String' })
    t.field('name', { type: 'String' })
    t.field('password', { type: 'String' })
  },
})

export const UserUpdateManyWithWhereNestedInput = inputObjectType({
  name: 'UserUpdateManyWithWhereNestedInput',
  definition(t) {
    t.field('where', { type: 'UserScalarWhereInput', nullable: false })
    t.field('data', { type: 'UserUpdateManyDataInput', nullable: false })
  },
})

export const UserUpsertWithWhereUniqueWithoutGroupInput = inputObjectType({
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

export const UserUpdateManyWithoutGroupInput = inputObjectType({
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

export const GroupUpdateInput = inputObjectType({
  name: 'GroupUpdateInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('name', { type: 'String' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
    t.field('users', { type: 'UserUpdateManyWithoutGroupInput' })
  },
})

export const GroupUpdateManyMutationInput = inputObjectType({
  name: 'GroupUpdateManyMutationInput',
  definition(t) {
    t.field('id', { type: 'Int' })
    t.field('name', { type: 'String' })
    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})

export const IntFilter = inputObjectType({
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

export const StringFilter = inputObjectType({
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

export const NullableIntFilter = inputObjectType({
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

export const DateTimeFilter = inputObjectType({
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

export const BooleanFilter = inputObjectType({
  name: 'BooleanFilter',
  definition(t) {
    t.field('equals', { type: 'Boolean' })
    t.field('not', { type: 'Boolean' })
  },
})

export const CommentFilter = inputObjectType({
  name: 'CommentFilter',
  definition(t) {
    t.field('every', { type: 'CommentWhereInput' })
    t.field('some', { type: 'CommentWhereInput' })
    t.field('none', { type: 'CommentWhereInput' })
  },
})

export const UserFilter = inputObjectType({
  name: 'UserFilter',
  definition(t) {
    t.field('every', { type: 'UserWhereInput' })
    t.field('some', { type: 'UserWhereInput' })
    t.field('none', { type: 'UserWhereInput' })
  },
})

export const NullableStringFilter = inputObjectType({
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

export const PostFilter = inputObjectType({
  name: 'PostFilter',
  definition(t) {
    t.field('every', { type: 'PostWhereInput' })
    t.field('some', { type: 'PostWhereInput' })
    t.field('none', { type: 'PostWhereInput' })
  },
})

export const UserOrderByInput = inputObjectType({
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

export const PostOrderByInput = inputObjectType({
  name: 'PostOrderByInput',
  definition(t) {
    t.field('id', { type: 'OrderByArg' })
    t.field('published', { type: 'OrderByArg' })
    t.field('title', { type: 'OrderByArg' })
    t.field('authorId', { type: 'OrderByArg' })
    t.field('createdAt', { type: 'OrderByArg' })
    t.field('updatedAt', { type: 'OrderByArg' })
  },
})

export const CommentOrderByInput = inputObjectType({
  name: 'CommentOrderByInput',
  definition(t) {
    t.field('id', { type: 'OrderByArg' })
    t.field('contain', { type: 'OrderByArg' })
    t.field('postId', { type: 'OrderByArg' })
    t.field('authorId', { type: 'OrderByArg' })
    t.field('createdAt', { type: 'OrderByArg' })
    t.field('updatedAt', { type: 'OrderByArg' })
  },
})

export const GroupOrderByInput = inputObjectType({
  name: 'GroupOrderByInput',
  definition(t) {
    t.field('id', { type: 'OrderByArg' })
    t.field('name', { type: 'OrderByArg' })
    t.field('createdAt', { type: 'OrderByArg' })
    t.field('updatedAt', { type: 'OrderByArg' })
  },
})
