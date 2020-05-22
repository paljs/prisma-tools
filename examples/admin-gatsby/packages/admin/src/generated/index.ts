import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  DateTime: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  count: Scalars['Int'];
};

export type BooleanFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<Scalars['Boolean']>;
};

export type Comment = {
  __typename?: 'Comment';
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['Int']>;
  contain: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  post: Post;
  postId: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type CommentCreateInput = {
  author?: Maybe<UserCreateOneWithoutCommentsInput>;
  contain: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  post: PostCreateOneWithoutCommentsInput;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CommentCreateManyWithoutAuthorInput = {
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
  create?: Maybe<Array<CommentCreateWithoutAuthorInput>>;
};

export type CommentCreateManyWithoutPostInput = {
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
  create?: Maybe<Array<CommentCreateWithoutPostInput>>;
};

export type CommentCreateWithoutAuthorInput = {
  contain: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  post: PostCreateOneWithoutCommentsInput;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CommentCreateWithoutPostInput = {
  author?: Maybe<UserCreateOneWithoutCommentsInput>;
  contain: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CommentFilter = {
  every?: Maybe<CommentWhereInput>;
  none?: Maybe<CommentWhereInput>;
  some?: Maybe<CommentWhereInput>;
};

export type CommentOrderByInput = {
  authorId?: Maybe<OrderByArg>;
  contain?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  id?: Maybe<OrderByArg>;
  postId?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
};

export type CommentScalarWhereInput = {
  AND?: Maybe<Array<CommentScalarWhereInput>>;
  authorId?: Maybe<NullableIntFilter>;
  contain?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<IntFilter>;
  NOT?: Maybe<Array<CommentScalarWhereInput>>;
  OR?: Maybe<Array<CommentScalarWhereInput>>;
  postId?: Maybe<IntFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type CommentUpdateInput = {
  author?: Maybe<UserUpdateOneWithoutCommentsInput>;
  contain?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  post?: Maybe<PostUpdateOneRequiredWithoutCommentsInput>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CommentUpdateManyDataInput = {
  contain?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CommentUpdateManyMutationInput = {
  contain?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CommentUpdateManyWithoutAuthorInput = {
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
  create?: Maybe<Array<CommentCreateWithoutAuthorInput>>;
  delete?: Maybe<Array<CommentWhereUniqueInput>>;
  deleteMany?: Maybe<Array<CommentScalarWhereInput>>;
  disconnect?: Maybe<Array<CommentWhereUniqueInput>>;
  set?: Maybe<Array<CommentWhereUniqueInput>>;
  update?: Maybe<Array<CommentUpdateWithWhereUniqueWithoutAuthorInput>>;
  updateMany?: Maybe<Array<CommentUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<CommentUpsertWithWhereUniqueWithoutAuthorInput>>;
};

export type CommentUpdateManyWithoutPostInput = {
  connect?: Maybe<Array<CommentWhereUniqueInput>>;
  create?: Maybe<Array<CommentCreateWithoutPostInput>>;
  delete?: Maybe<Array<CommentWhereUniqueInput>>;
  deleteMany?: Maybe<Array<CommentScalarWhereInput>>;
  disconnect?: Maybe<Array<CommentWhereUniqueInput>>;
  set?: Maybe<Array<CommentWhereUniqueInput>>;
  update?: Maybe<Array<CommentUpdateWithWhereUniqueWithoutPostInput>>;
  updateMany?: Maybe<Array<CommentUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<CommentUpsertWithWhereUniqueWithoutPostInput>>;
};

export type CommentUpdateManyWithWhereNestedInput = {
  data: CommentUpdateManyDataInput;
  where: CommentScalarWhereInput;
};

export type CommentUpdateWithoutAuthorDataInput = {
  contain?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  post?: Maybe<PostUpdateOneRequiredWithoutCommentsInput>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CommentUpdateWithoutPostDataInput = {
  author?: Maybe<UserUpdateOneWithoutCommentsInput>;
  contain?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CommentUpdateWithWhereUniqueWithoutAuthorInput = {
  data: CommentUpdateWithoutAuthorDataInput;
  where: CommentWhereUniqueInput;
};

export type CommentUpdateWithWhereUniqueWithoutPostInput = {
  data: CommentUpdateWithoutPostDataInput;
  where: CommentWhereUniqueInput;
};

export type CommentUpsertWithWhereUniqueWithoutAuthorInput = {
  create: CommentCreateWithoutAuthorInput;
  update: CommentUpdateWithoutAuthorDataInput;
  where: CommentWhereUniqueInput;
};

export type CommentUpsertWithWhereUniqueWithoutPostInput = {
  create: CommentCreateWithoutPostInput;
  update: CommentUpdateWithoutPostDataInput;
  where: CommentWhereUniqueInput;
};

export type CommentWhereInput = {
  AND?: Maybe<Array<CommentWhereInput>>;
  author?: Maybe<UserWhereInput>;
  authorId?: Maybe<NullableIntFilter>;
  contain?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<IntFilter>;
  NOT?: Maybe<Array<CommentWhereInput>>;
  OR?: Maybe<Array<CommentWhereInput>>;
  post?: Maybe<PostWhereInput>;
  postId?: Maybe<IntFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type CommentWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<Scalars['DateTime']>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
};

export type Enum = {
  __typename?: 'Enum';
  fields: Array<Scalars['String']>;
  name: Scalars['String'];
};

export type Field = {
  __typename?: 'Field';
  create: Scalars['Boolean'];
  editor?: Maybe<Scalars['Boolean']>;
  filter: Scalars['Boolean'];
  id: Scalars['String'];
  isId: Scalars['Boolean'];
  kind: KindEnum;
  list: Scalars['Boolean'];
  name: Scalars['String'];
  order: Scalars['Int'];
  read: Scalars['Boolean'];
  relationField?: Maybe<Scalars['Boolean']>;
  required: Scalars['Boolean'];
  sort: Scalars['Boolean'];
  title: Scalars['String'];
  type: Scalars['String'];
  unique: Scalars['Boolean'];
  update: Scalars['Boolean'];
};

export type Group = {
  __typename?: 'Group';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  users: Array<User>;
};

export type GroupUsersArgs = {
  after?: Maybe<UserWhereUniqueInput>;
  before?: Maybe<UserWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UserOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<UserWhereInput>;
};

export type GroupCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UserCreateManyWithoutGroupInput>;
};

export type GroupCreateOneWithoutUsersInput = {
  connect?: Maybe<GroupWhereUniqueInput>;
  create?: Maybe<GroupCreateWithoutUsersInput>;
};

export type GroupCreateWithoutUsersInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GroupOrderByInput = {
  createdAt?: Maybe<OrderByArg>;
  id?: Maybe<OrderByArg>;
  name?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
};

export type GroupUpdateInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UserUpdateManyWithoutGroupInput>;
};

export type GroupUpdateManyMutationInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GroupUpdateOneWithoutUsersInput = {
  connect?: Maybe<GroupWhereUniqueInput>;
  create?: Maybe<GroupCreateWithoutUsersInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<GroupUpdateWithoutUsersDataInput>;
  upsert?: Maybe<GroupUpsertWithoutUsersInput>;
};

export type GroupUpdateWithoutUsersDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GroupUpsertWithoutUsersInput = {
  create: GroupCreateWithoutUsersInput;
  update: GroupUpdateWithoutUsersDataInput;
};

export type GroupWhereInput = {
  AND?: Maybe<Array<GroupWhereInput>>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<IntFilter>;
  name?: Maybe<StringFilter>;
  NOT?: Maybe<Array<GroupWhereInput>>;
  OR?: Maybe<Array<GroupWhereInput>>;
  updatedAt?: Maybe<DateTimeFilter>;
  users?: Maybe<UserFilter>;
};

export type GroupWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type IntFilter = {
  equals?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  not?: Maybe<Scalars['Int']>;
  notIn?: Maybe<Array<Scalars['Int']>>;
};

export enum KindEnum {
  Enum = 'enum',
  Object = 'object',
  Scalar = 'scalar',
}

export type Model = {
  __typename?: 'Model';
  create: Scalars['Boolean'];
  delete: Scalars['Boolean'];
  displayFields: Array<Scalars['String']>;
  fields: Array<Field>;
  id: Scalars['String'];
  idField: Scalars['String'];
  name: Scalars['String'];
  update: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createOneComment: Comment;
  createOneGroup: Group;
  createOnePost: Post;
  createOneUser: User;
  deleteOneComment?: Maybe<Comment>;
  deleteOneGroup?: Maybe<Group>;
  deleteOnePost?: Maybe<Post>;
  deleteOneUser?: Maybe<User>;
  login?: Maybe<AuthPayload>;
  signup: AuthPayload;
  updateField: Field;
  updateModel: Model;
  updateOneComment: Comment;
  updateOneGroup: Group;
  updateOnePost: Post;
  updateOneUser: User;
  updatePassword: Scalars['Boolean'];
  upsertOneComment: Comment;
  upsertOneGroup: Group;
  upsertOnePost: Post;
  upsertOneUser: User;
};

export type MutationCreateOneCommentArgs = {
  data: CommentCreateInput;
};

export type MutationCreateOneGroupArgs = {
  data: GroupCreateInput;
};

export type MutationCreateOnePostArgs = {
  data: PostCreateInput;
};

export type MutationCreateOneUserArgs = {
  data: UserCreateInput;
};

export type MutationDeleteOneCommentArgs = {
  where: CommentWhereUniqueInput;
};

export type MutationDeleteOneGroupArgs = {
  where: GroupWhereUniqueInput;
};

export type MutationDeleteOnePostArgs = {
  where: PostWhereUniqueInput;
};

export type MutationDeleteOneUserArgs = {
  where: UserWhereUniqueInput;
};

export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationSignupArgs = {
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};

export type MutationUpdateFieldArgs = {
  data?: Maybe<UpdateFieldInput>;
  id: Scalars['String'];
  modelId: Scalars['String'];
};

export type MutationUpdateModelArgs = {
  data?: Maybe<UpdateModelInput>;
  id: Scalars['String'];
};

export type MutationUpdateOneCommentArgs = {
  data: CommentUpdateInput;
  where: CommentWhereUniqueInput;
};

export type MutationUpdateOneGroupArgs = {
  data: GroupUpdateInput;
  where: GroupWhereUniqueInput;
};

export type MutationUpdateOnePostArgs = {
  data: PostUpdateInput;
  where: PostWhereUniqueInput;
};

export type MutationUpdateOneUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type MutationUpdatePasswordArgs = {
  currentPassword: Scalars['String'];
  password: Scalars['String'];
};

export type MutationUpsertOneCommentArgs = {
  create: CommentCreateInput;
  update: CommentUpdateInput;
  where: CommentWhereUniqueInput;
};

export type MutationUpsertOneGroupArgs = {
  create: GroupCreateInput;
  update: GroupUpdateInput;
  where: GroupWhereUniqueInput;
};

export type MutationUpsertOnePostArgs = {
  create: PostCreateInput;
  update: PostUpdateInput;
  where: PostWhereUniqueInput;
};

export type MutationUpsertOneUserArgs = {
  create: UserCreateInput;
  update: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type NullableIntFilter = {
  equals?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  not?: Maybe<Scalars['Int']>;
  notIn?: Maybe<Array<Scalars['Int']>>;
};

export type NullableStringFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  not?: Maybe<Scalars['String']>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export enum OrderByArg {
  Asc = 'asc',
  Desc = 'desc',
}

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['Int']>;
  comments: Array<Comment>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  published: Scalars['Boolean'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type PostCommentsArgs = {
  after?: Maybe<CommentWhereUniqueInput>;
  before?: Maybe<CommentWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<CommentOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<CommentWhereInput>;
};

export type PostCreateInput = {
  author?: Maybe<UserCreateOneWithoutPostsInput>;
  comments?: Maybe<CommentCreateManyWithoutPostInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  published?: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PostCreateManyWithoutAuthorInput = {
  connect?: Maybe<Array<PostWhereUniqueInput>>;
  create?: Maybe<Array<PostCreateWithoutAuthorInput>>;
};

export type PostCreateOneWithoutCommentsInput = {
  connect?: Maybe<PostWhereUniqueInput>;
  create?: Maybe<PostCreateWithoutCommentsInput>;
};

export type PostCreateWithoutAuthorInput = {
  comments?: Maybe<CommentCreateManyWithoutPostInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  published?: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PostCreateWithoutCommentsInput = {
  author?: Maybe<UserCreateOneWithoutPostsInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  published?: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PostFilter = {
  every?: Maybe<PostWhereInput>;
  none?: Maybe<PostWhereInput>;
  some?: Maybe<PostWhereInput>;
};

export type PostOrderByInput = {
  authorId?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  id?: Maybe<OrderByArg>;
  published?: Maybe<OrderByArg>;
  title?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
};

export type PostScalarWhereInput = {
  AND?: Maybe<Array<PostScalarWhereInput>>;
  authorId?: Maybe<NullableIntFilter>;
  comments?: Maybe<CommentFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<IntFilter>;
  NOT?: Maybe<Array<PostScalarWhereInput>>;
  OR?: Maybe<Array<PostScalarWhereInput>>;
  published?: Maybe<BooleanFilter>;
  title?: Maybe<StringFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type PostUpdateInput = {
  author?: Maybe<UserUpdateOneWithoutPostsInput>;
  comments?: Maybe<CommentUpdateManyWithoutPostInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  published?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PostUpdateManyDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  published?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PostUpdateManyMutationInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  published?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PostUpdateManyWithoutAuthorInput = {
  connect?: Maybe<Array<PostWhereUniqueInput>>;
  create?: Maybe<Array<PostCreateWithoutAuthorInput>>;
  delete?: Maybe<Array<PostWhereUniqueInput>>;
  deleteMany?: Maybe<Array<PostScalarWhereInput>>;
  disconnect?: Maybe<Array<PostWhereUniqueInput>>;
  set?: Maybe<Array<PostWhereUniqueInput>>;
  update?: Maybe<Array<PostUpdateWithWhereUniqueWithoutAuthorInput>>;
  updateMany?: Maybe<Array<PostUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<PostUpsertWithWhereUniqueWithoutAuthorInput>>;
};

export type PostUpdateManyWithWhereNestedInput = {
  data: PostUpdateManyDataInput;
  where: PostScalarWhereInput;
};

export type PostUpdateOneRequiredWithoutCommentsInput = {
  connect?: Maybe<PostWhereUniqueInput>;
  create?: Maybe<PostCreateWithoutCommentsInput>;
  update?: Maybe<PostUpdateWithoutCommentsDataInput>;
  upsert?: Maybe<PostUpsertWithoutCommentsInput>;
};

export type PostUpdateWithoutAuthorDataInput = {
  comments?: Maybe<CommentUpdateManyWithoutPostInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  published?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PostUpdateWithoutCommentsDataInput = {
  author?: Maybe<UserUpdateOneWithoutPostsInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  published?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PostUpdateWithWhereUniqueWithoutAuthorInput = {
  data: PostUpdateWithoutAuthorDataInput;
  where: PostWhereUniqueInput;
};

export type PostUpsertWithoutCommentsInput = {
  create: PostCreateWithoutCommentsInput;
  update: PostUpdateWithoutCommentsDataInput;
};

export type PostUpsertWithWhereUniqueWithoutAuthorInput = {
  create: PostCreateWithoutAuthorInput;
  update: PostUpdateWithoutAuthorDataInput;
  where: PostWhereUniqueInput;
};

export type PostWhereInput = {
  AND?: Maybe<Array<PostWhereInput>>;
  author?: Maybe<UserWhereInput>;
  authorId?: Maybe<NullableIntFilter>;
  comments?: Maybe<CommentFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<IntFilter>;
  NOT?: Maybe<Array<PostWhereInput>>;
  OR?: Maybe<Array<PostWhereInput>>;
  published?: Maybe<BooleanFilter>;
  title?: Maybe<StringFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type PostWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  findManyComment?: Maybe<Array<Comment>>;
  findManyCommentCount: Scalars['Int'];
  findManyGroup?: Maybe<Array<Group>>;
  findManyGroupCount: Scalars['Int'];
  findManyPost?: Maybe<Array<Post>>;
  findManyPostCount: Scalars['Int'];
  findManyUser?: Maybe<Array<User>>;
  findManyUserCount: Scalars['Int'];
  findOneComment?: Maybe<Comment>;
  findOneGroup?: Maybe<Group>;
  findOnePost?: Maybe<Post>;
  findOneUser?: Maybe<User>;
  getSchema: Schema;
  me?: Maybe<User>;
};

export type QueryFindManyCommentArgs = {
  after?: Maybe<CommentWhereUniqueInput>;
  before?: Maybe<CommentWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<CommentOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<CommentWhereInput>;
};

export type QueryFindManyCommentCountArgs = {
  after?: Maybe<CommentWhereUniqueInput>;
  before?: Maybe<CommentWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<CommentOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<CommentWhereInput>;
};

export type QueryFindManyGroupArgs = {
  after?: Maybe<GroupWhereUniqueInput>;
  before?: Maybe<GroupWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<GroupOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<GroupWhereInput>;
};

export type QueryFindManyGroupCountArgs = {
  after?: Maybe<GroupWhereUniqueInput>;
  before?: Maybe<GroupWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<GroupOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<GroupWhereInput>;
};

export type QueryFindManyPostArgs = {
  after?: Maybe<PostWhereUniqueInput>;
  before?: Maybe<PostWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PostOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PostWhereInput>;
};

export type QueryFindManyPostCountArgs = {
  after?: Maybe<PostWhereUniqueInput>;
  before?: Maybe<PostWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PostOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PostWhereInput>;
};

export type QueryFindManyUserArgs = {
  after?: Maybe<UserWhereUniqueInput>;
  before?: Maybe<UserWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UserOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<UserWhereInput>;
};

export type QueryFindManyUserCountArgs = {
  after?: Maybe<UserWhereUniqueInput>;
  before?: Maybe<UserWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<UserOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<UserWhereInput>;
};

export type QueryFindOneCommentArgs = {
  where: CommentWhereUniqueInput;
};

export type QueryFindOneGroupArgs = {
  where: GroupWhereUniqueInput;
};

export type QueryFindOnePostArgs = {
  where: PostWhereUniqueInput;
};

export type QueryFindOneUserArgs = {
  where: UserWhereUniqueInput;
};

export type Schema = {
  __typename?: 'Schema';
  enums: Array<Enum>;
  models: Array<Model>;
};

export type StringFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  not?: Maybe<Scalars['String']>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type UpdateFieldInput = {
  create?: Maybe<Scalars['Boolean']>;
  editor?: Maybe<Scalars['Boolean']>;
  filter?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  isId?: Maybe<Scalars['Boolean']>;
  kind?: Maybe<KindEnum>;
  list?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
  read?: Maybe<Scalars['Boolean']>;
  relationField?: Maybe<Scalars['Boolean']>;
  required?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  unique?: Maybe<Scalars['Boolean']>;
  update?: Maybe<Scalars['Boolean']>;
};

export type UpdateModelInput = {
  create?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
  displayFields?: Maybe<Array<Scalars['String']>>;
  fields?: Maybe<Array<UpdateFieldInput>>;
  idField?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  update?: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  comments: Array<Comment>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  group?: Maybe<Group>;
  groupId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  posts: Array<Post>;
};

export type UserCommentsArgs = {
  after?: Maybe<CommentWhereUniqueInput>;
  before?: Maybe<CommentWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<CommentOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<CommentWhereInput>;
};

export type UserPostsArgs = {
  after?: Maybe<PostWhereUniqueInput>;
  before?: Maybe<PostWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PostOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PostWhereInput>;
};

export type UserCreateInput = {
  comments?: Maybe<CommentCreateManyWithoutAuthorInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  group?: Maybe<GroupCreateOneWithoutUsersInput>;
  name?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  posts?: Maybe<PostCreateManyWithoutAuthorInput>;
};

export type UserCreateManyWithoutGroupInput = {
  connect?: Maybe<Array<UserWhereUniqueInput>>;
  create?: Maybe<Array<UserCreateWithoutGroupInput>>;
};

export type UserCreateOneWithoutCommentsInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutCommentsInput>;
};

export type UserCreateOneWithoutPostsInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutPostsInput>;
};

export type UserCreateWithoutCommentsInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  group?: Maybe<GroupCreateOneWithoutUsersInput>;
  name?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  posts?: Maybe<PostCreateManyWithoutAuthorInput>;
};

export type UserCreateWithoutGroupInput = {
  comments?: Maybe<CommentCreateManyWithoutAuthorInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  posts?: Maybe<PostCreateManyWithoutAuthorInput>;
};

export type UserCreateWithoutPostsInput = {
  comments?: Maybe<CommentCreateManyWithoutAuthorInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  group?: Maybe<GroupCreateOneWithoutUsersInput>;
  name?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};

export type UserFilter = {
  every?: Maybe<UserWhereInput>;
  none?: Maybe<UserWhereInput>;
  some?: Maybe<UserWhereInput>;
};

export type UserOrderByInput = {
  createdAt?: Maybe<OrderByArg>;
  email?: Maybe<OrderByArg>;
  groupId?: Maybe<OrderByArg>;
  id?: Maybe<OrderByArg>;
  name?: Maybe<OrderByArg>;
  password?: Maybe<OrderByArg>;
};

export type UserScalarWhereInput = {
  AND?: Maybe<Array<UserScalarWhereInput>>;
  comments?: Maybe<CommentFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  email?: Maybe<StringFilter>;
  groupId?: Maybe<NullableIntFilter>;
  id?: Maybe<IntFilter>;
  name?: Maybe<NullableStringFilter>;
  NOT?: Maybe<Array<UserScalarWhereInput>>;
  OR?: Maybe<Array<UserScalarWhereInput>>;
  password?: Maybe<StringFilter>;
  posts?: Maybe<PostFilter>;
};

export type UserUpdateInput = {
  comments?: Maybe<CommentUpdateManyWithoutAuthorInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  group?: Maybe<GroupUpdateOneWithoutUsersInput>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  posts?: Maybe<PostUpdateManyWithoutAuthorInput>;
};

export type UserUpdateManyDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type UserUpdateManyMutationInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type UserUpdateManyWithoutGroupInput = {
  connect?: Maybe<Array<UserWhereUniqueInput>>;
  create?: Maybe<Array<UserCreateWithoutGroupInput>>;
  delete?: Maybe<Array<UserWhereUniqueInput>>;
  deleteMany?: Maybe<Array<UserScalarWhereInput>>;
  disconnect?: Maybe<Array<UserWhereUniqueInput>>;
  set?: Maybe<Array<UserWhereUniqueInput>>;
  update?: Maybe<Array<UserUpdateWithWhereUniqueWithoutGroupInput>>;
  updateMany?: Maybe<Array<UserUpdateManyWithWhereNestedInput>>;
  upsert?: Maybe<Array<UserUpsertWithWhereUniqueWithoutGroupInput>>;
};

export type UserUpdateManyWithWhereNestedInput = {
  data: UserUpdateManyDataInput;
  where: UserScalarWhereInput;
};

export type UserUpdateOneWithoutCommentsInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutCommentsInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<UserUpdateWithoutCommentsDataInput>;
  upsert?: Maybe<UserUpsertWithoutCommentsInput>;
};

export type UserUpdateOneWithoutPostsInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  create?: Maybe<UserCreateWithoutPostsInput>;
  delete?: Maybe<Scalars['Boolean']>;
  disconnect?: Maybe<Scalars['Boolean']>;
  update?: Maybe<UserUpdateWithoutPostsDataInput>;
  upsert?: Maybe<UserUpsertWithoutPostsInput>;
};

export type UserUpdateWithoutCommentsDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  group?: Maybe<GroupUpdateOneWithoutUsersInput>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  posts?: Maybe<PostUpdateManyWithoutAuthorInput>;
};

export type UserUpdateWithoutGroupDataInput = {
  comments?: Maybe<CommentUpdateManyWithoutAuthorInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  posts?: Maybe<PostUpdateManyWithoutAuthorInput>;
};

export type UserUpdateWithoutPostsDataInput = {
  comments?: Maybe<CommentUpdateManyWithoutAuthorInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  group?: Maybe<GroupUpdateOneWithoutUsersInput>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type UserUpdateWithWhereUniqueWithoutGroupInput = {
  data: UserUpdateWithoutGroupDataInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertWithoutCommentsInput = {
  create: UserCreateWithoutCommentsInput;
  update: UserUpdateWithoutCommentsDataInput;
};

export type UserUpsertWithoutPostsInput = {
  create: UserCreateWithoutPostsInput;
  update: UserUpdateWithoutPostsDataInput;
};

export type UserUpsertWithWhereUniqueWithoutGroupInput = {
  create: UserCreateWithoutGroupInput;
  update: UserUpdateWithoutGroupDataInput;
  where: UserWhereUniqueInput;
};

export type UserWhereInput = {
  AND?: Maybe<Array<UserWhereInput>>;
  comments?: Maybe<CommentFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  email?: Maybe<StringFilter>;
  group?: Maybe<GroupWhereInput>;
  groupId?: Maybe<NullableIntFilter>;
  id?: Maybe<IntFilter>;
  name?: Maybe<NullableStringFilter>;
  NOT?: Maybe<Array<UserWhereInput>>;
  OR?: Maybe<Array<UserWhereInput>>;
  password?: Maybe<StringFilter>;
  posts?: Maybe<PostFilter>;
};

export type UserWhereUniqueInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
};

export type MeQueryVariables = {};

export type MeQuery = { __typename?: 'Query' } & {
  me?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'name' | 'email'>>;
};

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginMutation = { __typename?: 'Mutation' } & {
  login?: Maybe<
    { __typename?: 'AuthPayload' } & Pick<AuthPayload, 'token'> & { user: { __typename?: 'User' } & UserFieldsFragment }
  >;
};

export type SignupMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type SignupMutation = { __typename?: 'Mutation' } & {
  signup: { __typename?: 'AuthPayload' } & Pick<AuthPayload, 'token'> & {
      user: { __typename?: 'User' } & UserFieldsFragment;
    };
};

export type CommentFieldsFragment = { __typename?: 'Comment' } & Pick<
  Comment,
  'id' | 'contain' | 'postId' | 'authorId' | 'createdAt' | 'updatedAt'
>;

export type CommentFragment = { __typename?: 'Comment' } & {
  post: { __typename?: 'Post' } & PostFieldsFragment;
  author?: Maybe<{ __typename?: 'User' } & UserFieldsFragment>;
} & CommentFieldsFragment;

export type FindOneCommentQueryVariables = {
  where: CommentWhereUniqueInput;
};

export type FindOneCommentQuery = { __typename?: 'Query' } & {
  findOneComment?: Maybe<{ __typename?: 'Comment' } & CommentFragment>;
};

export type FindManyCommentQueryVariables = {
  where?: Maybe<CommentWhereInput>;
  orderBy?: Maybe<CommentOrderByInput>;
  after?: Maybe<CommentWhereUniqueInput>;
  before?: Maybe<CommentWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type FindManyCommentQuery = { __typename?: 'Query' } & Pick<Query, 'findManyCommentCount'> & {
    findManyComment?: Maybe<Array<{ __typename?: 'Comment' } & CommentFragment>>;
  };

export type CreateOneCommentMutationVariables = {
  data: CommentCreateInput;
};

export type CreateOneCommentMutation = { __typename?: 'Mutation' } & {
  createOneComment: { __typename?: 'Comment' } & CommentFragment;
};

export type UpdateOneCommentMutationVariables = {
  where: CommentWhereUniqueInput;
  data: CommentUpdateInput;
};

export type UpdateOneCommentMutation = { __typename?: 'Mutation' } & {
  updateOneComment: { __typename?: 'Comment' } & CommentFragment;
};

export type DeleteOneCommentMutationVariables = {
  where: CommentWhereUniqueInput;
};

export type DeleteOneCommentMutation = { __typename?: 'Mutation' } & {
  deleteOneComment?: Maybe<{ __typename?: 'Comment' } & Pick<Comment, 'id'>>;
};

export type GroupFieldsFragment = { __typename?: 'Group' } & Pick<Group, 'name' | 'id' | 'createdAt' | 'updatedAt'>;

export type GroupFragment = { __typename?: 'Group' } & GroupFieldsFragment;

export type FindOneGroupQueryVariables = {
  where: GroupWhereUniqueInput;
};

export type FindOneGroupQuery = { __typename?: 'Query' } & {
  findOneGroup?: Maybe<{ __typename?: 'Group' } & GroupFragment>;
};

export type FindManyGroupQueryVariables = {
  where?: Maybe<GroupWhereInput>;
  orderBy?: Maybe<GroupOrderByInput>;
  after?: Maybe<GroupWhereUniqueInput>;
  before?: Maybe<GroupWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type FindManyGroupQuery = { __typename?: 'Query' } & Pick<Query, 'findManyGroupCount'> & {
    findManyGroup?: Maybe<Array<{ __typename?: 'Group' } & GroupFragment>>;
  };

export type CreateOneGroupMutationVariables = {
  data: GroupCreateInput;
};

export type CreateOneGroupMutation = { __typename?: 'Mutation' } & {
  createOneGroup: { __typename?: 'Group' } & GroupFragment;
};

export type UpdateOneGroupMutationVariables = {
  where: GroupWhereUniqueInput;
  data: GroupUpdateInput;
};

export type UpdateOneGroupMutation = { __typename?: 'Mutation' } & {
  updateOneGroup: { __typename?: 'Group' } & GroupFragment;
};

export type DeleteOneGroupMutationVariables = {
  where: GroupWhereUniqueInput;
};

export type DeleteOneGroupMutation = { __typename?: 'Mutation' } & {
  deleteOneGroup?: Maybe<{ __typename?: 'Group' } & Pick<Group, 'id'>>;
};

export type PostFieldsFragment = { __typename?: 'Post' } & Pick<
  Post,
  'id' | 'published' | 'title' | 'authorId' | 'createdAt' | 'updatedAt'
>;

export type PostFragment = { __typename?: 'Post' } & {
  author?: Maybe<{ __typename?: 'User' } & UserFieldsFragment>;
} & PostFieldsFragment;

export type FindOnePostQueryVariables = {
  where: PostWhereUniqueInput;
};

export type FindOnePostQuery = { __typename?: 'Query' } & {
  findOnePost?: Maybe<{ __typename?: 'Post' } & PostFragment>;
};

export type FindManyPostQueryVariables = {
  where?: Maybe<PostWhereInput>;
  orderBy?: Maybe<PostOrderByInput>;
  after?: Maybe<PostWhereUniqueInput>;
  before?: Maybe<PostWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type FindManyPostQuery = { __typename?: 'Query' } & Pick<Query, 'findManyPostCount'> & {
    findManyPost?: Maybe<Array<{ __typename?: 'Post' } & PostFragment>>;
  };

export type CreateOnePostMutationVariables = {
  data: PostCreateInput;
};

export type CreateOnePostMutation = { __typename?: 'Mutation' } & {
  createOnePost: { __typename?: 'Post' } & PostFragment;
};

export type UpdateOnePostMutationVariables = {
  where: PostWhereUniqueInput;
  data: PostUpdateInput;
};

export type UpdateOnePostMutation = { __typename?: 'Mutation' } & {
  updateOnePost: { __typename?: 'Post' } & PostFragment;
};

export type DeleteOnePostMutationVariables = {
  where: PostWhereUniqueInput;
};

export type DeleteOnePostMutation = { __typename?: 'Mutation' } & {
  deleteOnePost?: Maybe<{ __typename?: 'Post' } & Pick<Post, 'id'>>;
};

export type ModelFragment = { __typename?: 'Model' } & Pick<
  Model,
  'id' | 'name' | 'create' | 'delete' | 'update' | 'idField' | 'displayFields'
> & { fields: Array<{ __typename?: 'Field' } & FieldFragment> };

export type FieldFragment = { __typename?: 'Field' } & Pick<
  Field,
  | 'id'
  | 'name'
  | 'title'
  | 'type'
  | 'list'
  | 'kind'
  | 'read'
  | 'required'
  | 'isId'
  | 'unique'
  | 'create'
  | 'order'
  | 'update'
  | 'sort'
  | 'filter'
  | 'editor'
  | 'relationField'
>;

export type EnumFragment = { __typename?: 'Enum' } & Pick<Enum, 'name' | 'fields'>;

export type GetSchemaQueryVariables = {};

export type GetSchemaQuery = { __typename?: 'Query' } & {
  getSchema: { __typename?: 'Schema' } & {
    models: Array<{ __typename?: 'Model' } & ModelFragment>;
    enums: Array<{ __typename?: 'Enum' } & EnumFragment>;
  };
};

export type UpdateModelMutationVariables = {
  id: Scalars['String'];
  data: UpdateModelInput;
};

export type UpdateModelMutation = { __typename?: 'Mutation' } & {
  updateModel: { __typename?: 'Model' } & ModelFragment;
};

export type UpdateFieldMutationVariables = {
  id: Scalars['String'];
  modelId: Scalars['String'];
  data: UpdateFieldInput;
};

export type UpdateFieldMutation = { __typename?: 'Mutation' } & {
  updateField: { __typename?: 'Field' } & FieldFragment;
};

export type UserFieldsFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'email' | 'name' | 'groupId' | 'createdAt'
>;

export type UserFragment = { __typename?: 'User' } & {
  group?: Maybe<{ __typename?: 'Group' } & GroupFieldsFragment>;
} & UserFieldsFragment;

export type FindOneUserQueryVariables = {
  where: UserWhereUniqueInput;
};

export type FindOneUserQuery = { __typename?: 'Query' } & {
  findOneUser?: Maybe<{ __typename?: 'User' } & UserFragment>;
};

export type FindManyUserQueryVariables = {
  where?: Maybe<UserWhereInput>;
  orderBy?: Maybe<UserOrderByInput>;
  after?: Maybe<UserWhereUniqueInput>;
  before?: Maybe<UserWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type FindManyUserQuery = { __typename?: 'Query' } & Pick<Query, 'findManyUserCount'> & {
    findManyUser?: Maybe<Array<{ __typename?: 'User' } & UserFragment>>;
  };

export type CreateOneUserMutationVariables = {
  data: UserCreateInput;
};

export type CreateOneUserMutation = { __typename?: 'Mutation' } & {
  createOneUser: { __typename?: 'User' } & UserFragment;
};

export type UpdateOneUserMutationVariables = {
  where: UserWhereUniqueInput;
  data: UserUpdateInput;
};

export type UpdateOneUserMutation = { __typename?: 'Mutation' } & {
  updateOneUser: { __typename?: 'User' } & UserFragment;
};

export type DeleteOneUserMutationVariables = {
  where: UserWhereUniqueInput;
};

export type DeleteOneUserMutation = { __typename?: 'Mutation' } & {
  deleteOneUser?: Maybe<{ __typename?: 'User' } & Pick<User, 'id'>>;
};

export const CommentFieldsFragmentDoc = gql`
  fragment CommentFields on Comment {
    id
    contain
    postId
    authorId
    createdAt
    updatedAt
  }
`;
export const PostFieldsFragmentDoc = gql`
  fragment PostFields on Post {
    id
    published
    title
    authorId
    createdAt
    updatedAt
  }
`;
export const UserFieldsFragmentDoc = gql`
  fragment UserFields on User {
    id
    email
    name
    groupId
    createdAt
  }
`;
export const CommentFragmentDoc = gql`
  fragment Comment on Comment {
    ...CommentFields
    post {
      ...PostFields
    }
    author {
      ...UserFields
    }
  }
  ${CommentFieldsFragmentDoc}
  ${PostFieldsFragmentDoc}
  ${UserFieldsFragmentDoc}
`;
export const GroupFieldsFragmentDoc = gql`
  fragment GroupFields on Group {
    name
    id
    createdAt
    updatedAt
  }
`;
export const GroupFragmentDoc = gql`
  fragment Group on Group {
    ...GroupFields
  }
  ${GroupFieldsFragmentDoc}
`;
export const PostFragmentDoc = gql`
  fragment Post on Post {
    ...PostFields
    author {
      ...UserFields
    }
  }
  ${PostFieldsFragmentDoc}
  ${UserFieldsFragmentDoc}
`;
export const FieldFragmentDoc = gql`
  fragment Field on Field {
    id
    name
    title
    type
    list
    kind
    read
    required
    isId
    unique
    create
    order
    update
    sort
    filter
    editor
    relationField
  }
`;
export const ModelFragmentDoc = gql`
  fragment Model on Model {
    id
    name
    create
    delete
    update
    idField
    displayFields
    fields {
      ...Field
    }
  }
  ${FieldFragmentDoc}
`;
export const EnumFragmentDoc = gql`
  fragment Enum on Enum {
    name
    fields
  }
`;
export const UserFragmentDoc = gql`
  fragment User on User {
    ...UserFields
    group {
      ...GroupFields
    }
  }
  ${UserFieldsFragmentDoc}
  ${GroupFieldsFragmentDoc}
`;
export const MeDocument = gql`
  query me {
    me {
      id
      name
      email
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
  return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const LoginDocument = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        ...UserFields
      }
    }
  }
  ${UserFieldsFragmentDoc}
`;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>,
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignupDocument = gql`
  mutation signup($email: String!, $password: String!, $name: String) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        ...UserFields
      }
    }
  }
  ${UserFieldsFragmentDoc}
`;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSignupMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<SignupMutation, SignupMutationVariables>,
) {
  return ApolloReactHooks.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, baseOptions);
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = ApolloReactCommon.MutationResult<SignupMutation>;
export type SignupMutationOptions = ApolloReactCommon.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const FindOneCommentDocument = gql`
  query findOneComment($where: CommentWhereUniqueInput!) {
    findOneComment(where: $where) {
      ...Comment
    }
  }
  ${CommentFragmentDoc}
`;

/**
 * __useFindOneCommentQuery__
 *
 * To run a query within a React component, call `useFindOneCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneCommentQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useFindOneCommentQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<FindOneCommentQuery, FindOneCommentQueryVariables>,
) {
  return ApolloReactHooks.useQuery<FindOneCommentQuery, FindOneCommentQueryVariables>(
    FindOneCommentDocument,
    baseOptions,
  );
}
export function useFindOneCommentLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindOneCommentQuery, FindOneCommentQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<FindOneCommentQuery, FindOneCommentQueryVariables>(
    FindOneCommentDocument,
    baseOptions,
  );
}
export type FindOneCommentQueryHookResult = ReturnType<typeof useFindOneCommentQuery>;
export type FindOneCommentLazyQueryHookResult = ReturnType<typeof useFindOneCommentLazyQuery>;
export type FindOneCommentQueryResult = ApolloReactCommon.QueryResult<
  FindOneCommentQuery,
  FindOneCommentQueryVariables
>;
export const FindManyCommentDocument = gql`
  query findManyComment(
    $where: CommentWhereInput
    $orderBy: CommentOrderByInput
    $after: CommentWhereUniqueInput
    $before: CommentWhereUniqueInput
    $skip: Int
    $first: Int
    $last: Int
  ) {
    findManyComment(
      where: $where
      orderBy: $orderBy
      after: $after
      before: $before
      skip: $skip
      first: $first
      last: $last
    ) {
      ...Comment
    }
    findManyCommentCount(where: $where)
  }
  ${CommentFragmentDoc}
`;

/**
 * __useFindManyCommentQuery__
 *
 * To run a query within a React component, call `useFindManyCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindManyCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindManyCommentQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      skip: // value for 'skip'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useFindManyCommentQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<FindManyCommentQuery, FindManyCommentQueryVariables>,
) {
  return ApolloReactHooks.useQuery<FindManyCommentQuery, FindManyCommentQueryVariables>(
    FindManyCommentDocument,
    baseOptions,
  );
}
export function useFindManyCommentLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindManyCommentQuery, FindManyCommentQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<FindManyCommentQuery, FindManyCommentQueryVariables>(
    FindManyCommentDocument,
    baseOptions,
  );
}
export type FindManyCommentQueryHookResult = ReturnType<typeof useFindManyCommentQuery>;
export type FindManyCommentLazyQueryHookResult = ReturnType<typeof useFindManyCommentLazyQuery>;
export type FindManyCommentQueryResult = ApolloReactCommon.QueryResult<
  FindManyCommentQuery,
  FindManyCommentQueryVariables
>;
export const CreateOneCommentDocument = gql`
  mutation createOneComment($data: CommentCreateInput!) {
    createOneComment(data: $data) {
      ...Comment
    }
  }
  ${CommentFragmentDoc}
`;

/**
 * __useCreateOneCommentMutation__
 *
 * To run a mutation, you first call `useCreateOneCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOneCommentMutation, { data, loading, error }] = useCreateOneCommentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOneCommentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateOneCommentMutation, CreateOneCommentMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateOneCommentMutation, CreateOneCommentMutationVariables>(
    CreateOneCommentDocument,
    baseOptions,
  );
}
export type CreateOneCommentMutationHookResult = ReturnType<typeof useCreateOneCommentMutation>;
export type CreateOneCommentMutationResult = ApolloReactCommon.MutationResult<CreateOneCommentMutation>;
export type CreateOneCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateOneCommentMutation,
  CreateOneCommentMutationVariables
>;
export const UpdateOneCommentDocument = gql`
  mutation updateOneComment($where: CommentWhereUniqueInput!, $data: CommentUpdateInput!) {
    updateOneComment(where: $where, data: $data) {
      ...Comment
    }
  }
  ${CommentFragmentDoc}
`;

/**
 * __useUpdateOneCommentMutation__
 *
 * To run a mutation, you first call `useUpdateOneCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneCommentMutation, { data, loading, error }] = useUpdateOneCommentMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateOneCommentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateOneCommentMutation, UpdateOneCommentMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateOneCommentMutation, UpdateOneCommentMutationVariables>(
    UpdateOneCommentDocument,
    baseOptions,
  );
}
export type UpdateOneCommentMutationHookResult = ReturnType<typeof useUpdateOneCommentMutation>;
export type UpdateOneCommentMutationResult = ApolloReactCommon.MutationResult<UpdateOneCommentMutation>;
export type UpdateOneCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateOneCommentMutation,
  UpdateOneCommentMutationVariables
>;
export const DeleteOneCommentDocument = gql`
  mutation deleteOneComment($where: CommentWhereUniqueInput!) {
    deleteOneComment(where: $where) {
      id
    }
  }
`;

/**
 * __useDeleteOneCommentMutation__
 *
 * To run a mutation, you first call `useDeleteOneCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOneCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOneCommentMutation, { data, loading, error }] = useDeleteOneCommentMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteOneCommentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteOneCommentMutation, DeleteOneCommentMutationVariables>,
) {
  return ApolloReactHooks.useMutation<DeleteOneCommentMutation, DeleteOneCommentMutationVariables>(
    DeleteOneCommentDocument,
    baseOptions,
  );
}
export type DeleteOneCommentMutationHookResult = ReturnType<typeof useDeleteOneCommentMutation>;
export type DeleteOneCommentMutationResult = ApolloReactCommon.MutationResult<DeleteOneCommentMutation>;
export type DeleteOneCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteOneCommentMutation,
  DeleteOneCommentMutationVariables
>;
export const FindOneGroupDocument = gql`
  query findOneGroup($where: GroupWhereUniqueInput!) {
    findOneGroup(where: $where) {
      ...Group
    }
  }
  ${GroupFragmentDoc}
`;

/**
 * __useFindOneGroupQuery__
 *
 * To run a query within a React component, call `useFindOneGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneGroupQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useFindOneGroupQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<FindOneGroupQuery, FindOneGroupQueryVariables>,
) {
  return ApolloReactHooks.useQuery<FindOneGroupQuery, FindOneGroupQueryVariables>(FindOneGroupDocument, baseOptions);
}
export function useFindOneGroupLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindOneGroupQuery, FindOneGroupQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<FindOneGroupQuery, FindOneGroupQueryVariables>(
    FindOneGroupDocument,
    baseOptions,
  );
}
export type FindOneGroupQueryHookResult = ReturnType<typeof useFindOneGroupQuery>;
export type FindOneGroupLazyQueryHookResult = ReturnType<typeof useFindOneGroupLazyQuery>;
export type FindOneGroupQueryResult = ApolloReactCommon.QueryResult<FindOneGroupQuery, FindOneGroupQueryVariables>;
export const FindManyGroupDocument = gql`
  query findManyGroup(
    $where: GroupWhereInput
    $orderBy: GroupOrderByInput
    $after: GroupWhereUniqueInput
    $before: GroupWhereUniqueInput
    $skip: Int
    $first: Int
    $last: Int
  ) {
    findManyGroup(
      where: $where
      orderBy: $orderBy
      after: $after
      before: $before
      skip: $skip
      first: $first
      last: $last
    ) {
      ...Group
    }
    findManyGroupCount(where: $where)
  }
  ${GroupFragmentDoc}
`;

/**
 * __useFindManyGroupQuery__
 *
 * To run a query within a React component, call `useFindManyGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindManyGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindManyGroupQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      skip: // value for 'skip'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useFindManyGroupQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<FindManyGroupQuery, FindManyGroupQueryVariables>,
) {
  return ApolloReactHooks.useQuery<FindManyGroupQuery, FindManyGroupQueryVariables>(FindManyGroupDocument, baseOptions);
}
export function useFindManyGroupLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindManyGroupQuery, FindManyGroupQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<FindManyGroupQuery, FindManyGroupQueryVariables>(
    FindManyGroupDocument,
    baseOptions,
  );
}
export type FindManyGroupQueryHookResult = ReturnType<typeof useFindManyGroupQuery>;
export type FindManyGroupLazyQueryHookResult = ReturnType<typeof useFindManyGroupLazyQuery>;
export type FindManyGroupQueryResult = ApolloReactCommon.QueryResult<FindManyGroupQuery, FindManyGroupQueryVariables>;
export const CreateOneGroupDocument = gql`
  mutation createOneGroup($data: GroupCreateInput!) {
    createOneGroup(data: $data) {
      ...Group
    }
  }
  ${GroupFragmentDoc}
`;

/**
 * __useCreateOneGroupMutation__
 *
 * To run a mutation, you first call `useCreateOneGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOneGroupMutation, { data, loading, error }] = useCreateOneGroupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOneGroupMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateOneGroupMutation, CreateOneGroupMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateOneGroupMutation, CreateOneGroupMutationVariables>(
    CreateOneGroupDocument,
    baseOptions,
  );
}
export type CreateOneGroupMutationHookResult = ReturnType<typeof useCreateOneGroupMutation>;
export type CreateOneGroupMutationResult = ApolloReactCommon.MutationResult<CreateOneGroupMutation>;
export type CreateOneGroupMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateOneGroupMutation,
  CreateOneGroupMutationVariables
>;
export const UpdateOneGroupDocument = gql`
  mutation updateOneGroup($where: GroupWhereUniqueInput!, $data: GroupUpdateInput!) {
    updateOneGroup(where: $where, data: $data) {
      ...Group
    }
  }
  ${GroupFragmentDoc}
`;

/**
 * __useUpdateOneGroupMutation__
 *
 * To run a mutation, you first call `useUpdateOneGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneGroupMutation, { data, loading, error }] = useUpdateOneGroupMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateOneGroupMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateOneGroupMutation, UpdateOneGroupMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateOneGroupMutation, UpdateOneGroupMutationVariables>(
    UpdateOneGroupDocument,
    baseOptions,
  );
}
export type UpdateOneGroupMutationHookResult = ReturnType<typeof useUpdateOneGroupMutation>;
export type UpdateOneGroupMutationResult = ApolloReactCommon.MutationResult<UpdateOneGroupMutation>;
export type UpdateOneGroupMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateOneGroupMutation,
  UpdateOneGroupMutationVariables
>;
export const DeleteOneGroupDocument = gql`
  mutation deleteOneGroup($where: GroupWhereUniqueInput!) {
    deleteOneGroup(where: $where) {
      id
    }
  }
`;

/**
 * __useDeleteOneGroupMutation__
 *
 * To run a mutation, you first call `useDeleteOneGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOneGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOneGroupMutation, { data, loading, error }] = useDeleteOneGroupMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteOneGroupMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteOneGroupMutation, DeleteOneGroupMutationVariables>,
) {
  return ApolloReactHooks.useMutation<DeleteOneGroupMutation, DeleteOneGroupMutationVariables>(
    DeleteOneGroupDocument,
    baseOptions,
  );
}
export type DeleteOneGroupMutationHookResult = ReturnType<typeof useDeleteOneGroupMutation>;
export type DeleteOneGroupMutationResult = ApolloReactCommon.MutationResult<DeleteOneGroupMutation>;
export type DeleteOneGroupMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteOneGroupMutation,
  DeleteOneGroupMutationVariables
>;
export const FindOnePostDocument = gql`
  query findOnePost($where: PostWhereUniqueInput!) {
    findOnePost(where: $where) {
      ...Post
    }
  }
  ${PostFragmentDoc}
`;

/**
 * __useFindOnePostQuery__
 *
 * To run a query within a React component, call `useFindOnePostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOnePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOnePostQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useFindOnePostQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<FindOnePostQuery, FindOnePostQueryVariables>,
) {
  return ApolloReactHooks.useQuery<FindOnePostQuery, FindOnePostQueryVariables>(FindOnePostDocument, baseOptions);
}
export function useFindOnePostLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindOnePostQuery, FindOnePostQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<FindOnePostQuery, FindOnePostQueryVariables>(FindOnePostDocument, baseOptions);
}
export type FindOnePostQueryHookResult = ReturnType<typeof useFindOnePostQuery>;
export type FindOnePostLazyQueryHookResult = ReturnType<typeof useFindOnePostLazyQuery>;
export type FindOnePostQueryResult = ApolloReactCommon.QueryResult<FindOnePostQuery, FindOnePostQueryVariables>;
export const FindManyPostDocument = gql`
  query findManyPost(
    $where: PostWhereInput
    $orderBy: PostOrderByInput
    $after: PostWhereUniqueInput
    $before: PostWhereUniqueInput
    $skip: Int
    $first: Int
    $last: Int
  ) {
    findManyPost(
      where: $where
      orderBy: $orderBy
      after: $after
      before: $before
      skip: $skip
      first: $first
      last: $last
    ) {
      ...Post
    }
    findManyPostCount(where: $where)
  }
  ${PostFragmentDoc}
`;

/**
 * __useFindManyPostQuery__
 *
 * To run a query within a React component, call `useFindManyPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindManyPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindManyPostQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      skip: // value for 'skip'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useFindManyPostQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<FindManyPostQuery, FindManyPostQueryVariables>,
) {
  return ApolloReactHooks.useQuery<FindManyPostQuery, FindManyPostQueryVariables>(FindManyPostDocument, baseOptions);
}
export function useFindManyPostLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindManyPostQuery, FindManyPostQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<FindManyPostQuery, FindManyPostQueryVariables>(
    FindManyPostDocument,
    baseOptions,
  );
}
export type FindManyPostQueryHookResult = ReturnType<typeof useFindManyPostQuery>;
export type FindManyPostLazyQueryHookResult = ReturnType<typeof useFindManyPostLazyQuery>;
export type FindManyPostQueryResult = ApolloReactCommon.QueryResult<FindManyPostQuery, FindManyPostQueryVariables>;
export const CreateOnePostDocument = gql`
  mutation createOnePost($data: PostCreateInput!) {
    createOnePost(data: $data) {
      ...Post
    }
  }
  ${PostFragmentDoc}
`;

/**
 * __useCreateOnePostMutation__
 *
 * To run a mutation, you first call `useCreateOnePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOnePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOnePostMutation, { data, loading, error }] = useCreateOnePostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOnePostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateOnePostMutation, CreateOnePostMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateOnePostMutation, CreateOnePostMutationVariables>(
    CreateOnePostDocument,
    baseOptions,
  );
}
export type CreateOnePostMutationHookResult = ReturnType<typeof useCreateOnePostMutation>;
export type CreateOnePostMutationResult = ApolloReactCommon.MutationResult<CreateOnePostMutation>;
export type CreateOnePostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateOnePostMutation,
  CreateOnePostMutationVariables
>;
export const UpdateOnePostDocument = gql`
  mutation updateOnePost($where: PostWhereUniqueInput!, $data: PostUpdateInput!) {
    updateOnePost(where: $where, data: $data) {
      ...Post
    }
  }
  ${PostFragmentDoc}
`;

/**
 * __useUpdateOnePostMutation__
 *
 * To run a mutation, you first call `useUpdateOnePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOnePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOnePostMutation, { data, loading, error }] = useUpdateOnePostMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateOnePostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateOnePostMutation, UpdateOnePostMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateOnePostMutation, UpdateOnePostMutationVariables>(
    UpdateOnePostDocument,
    baseOptions,
  );
}
export type UpdateOnePostMutationHookResult = ReturnType<typeof useUpdateOnePostMutation>;
export type UpdateOnePostMutationResult = ApolloReactCommon.MutationResult<UpdateOnePostMutation>;
export type UpdateOnePostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateOnePostMutation,
  UpdateOnePostMutationVariables
>;
export const DeleteOnePostDocument = gql`
  mutation deleteOnePost($where: PostWhereUniqueInput!) {
    deleteOnePost(where: $where) {
      id
    }
  }
`;

/**
 * __useDeleteOnePostMutation__
 *
 * To run a mutation, you first call `useDeleteOnePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOnePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOnePostMutation, { data, loading, error }] = useDeleteOnePostMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteOnePostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteOnePostMutation, DeleteOnePostMutationVariables>,
) {
  return ApolloReactHooks.useMutation<DeleteOnePostMutation, DeleteOnePostMutationVariables>(
    DeleteOnePostDocument,
    baseOptions,
  );
}
export type DeleteOnePostMutationHookResult = ReturnType<typeof useDeleteOnePostMutation>;
export type DeleteOnePostMutationResult = ApolloReactCommon.MutationResult<DeleteOnePostMutation>;
export type DeleteOnePostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteOnePostMutation,
  DeleteOnePostMutationVariables
>;
export const GetSchemaDocument = gql`
  query getSchema {
    getSchema {
      models {
        ...Model
      }
      enums {
        ...Enum
      }
    }
  }
  ${ModelFragmentDoc}
  ${EnumFragmentDoc}
`;

/**
 * __useGetSchemaQuery__
 *
 * To run a query within a React component, call `useGetSchemaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSchemaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSchemaQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSchemaQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetSchemaQuery, GetSchemaQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetSchemaQuery, GetSchemaQueryVariables>(GetSchemaDocument, baseOptions);
}
export function useGetSchemaLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSchemaQuery, GetSchemaQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GetSchemaQuery, GetSchemaQueryVariables>(GetSchemaDocument, baseOptions);
}
export type GetSchemaQueryHookResult = ReturnType<typeof useGetSchemaQuery>;
export type GetSchemaLazyQueryHookResult = ReturnType<typeof useGetSchemaLazyQuery>;
export type GetSchemaQueryResult = ApolloReactCommon.QueryResult<GetSchemaQuery, GetSchemaQueryVariables>;
export const UpdateModelDocument = gql`
  mutation updateModel($id: String!, $data: UpdateModelInput!) {
    updateModel(id: $id, data: $data) {
      ...Model
    }
  }
  ${ModelFragmentDoc}
`;

/**
 * __useUpdateModelMutation__
 *
 * To run a mutation, you first call `useUpdateModelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateModelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateModelMutation, { data, loading, error }] = useUpdateModelMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateModelMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateModelMutation, UpdateModelMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateModelMutation, UpdateModelMutationVariables>(
    UpdateModelDocument,
    baseOptions,
  );
}
export type UpdateModelMutationHookResult = ReturnType<typeof useUpdateModelMutation>;
export type UpdateModelMutationResult = ApolloReactCommon.MutationResult<UpdateModelMutation>;
export type UpdateModelMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateModelMutation,
  UpdateModelMutationVariables
>;
export const UpdateFieldDocument = gql`
  mutation updateField($id: String!, $modelId: String!, $data: UpdateFieldInput!) {
    updateField(id: $id, modelId: $modelId, data: $data) {
      ...Field
    }
  }
  ${FieldFragmentDoc}
`;

/**
 * __useUpdateFieldMutation__
 *
 * To run a mutation, you first call `useUpdateFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFieldMutation, { data, loading, error }] = useUpdateFieldMutation({
 *   variables: {
 *      id: // value for 'id'
 *      modelId: // value for 'modelId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateFieldMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateFieldMutation, UpdateFieldMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateFieldMutation, UpdateFieldMutationVariables>(
    UpdateFieldDocument,
    baseOptions,
  );
}
export type UpdateFieldMutationHookResult = ReturnType<typeof useUpdateFieldMutation>;
export type UpdateFieldMutationResult = ApolloReactCommon.MutationResult<UpdateFieldMutation>;
export type UpdateFieldMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateFieldMutation,
  UpdateFieldMutationVariables
>;
export const FindOneUserDocument = gql`
  query findOneUser($where: UserWhereUniqueInput!) {
    findOneUser(where: $where) {
      ...User
    }
  }
  ${UserFragmentDoc}
`;

/**
 * __useFindOneUserQuery__
 *
 * To run a query within a React component, call `useFindOneUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneUserQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useFindOneUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<FindOneUserQuery, FindOneUserQueryVariables>,
) {
  return ApolloReactHooks.useQuery<FindOneUserQuery, FindOneUserQueryVariables>(FindOneUserDocument, baseOptions);
}
export function useFindOneUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindOneUserQuery, FindOneUserQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<FindOneUserQuery, FindOneUserQueryVariables>(FindOneUserDocument, baseOptions);
}
export type FindOneUserQueryHookResult = ReturnType<typeof useFindOneUserQuery>;
export type FindOneUserLazyQueryHookResult = ReturnType<typeof useFindOneUserLazyQuery>;
export type FindOneUserQueryResult = ApolloReactCommon.QueryResult<FindOneUserQuery, FindOneUserQueryVariables>;
export const FindManyUserDocument = gql`
  query findManyUser(
    $where: UserWhereInput
    $orderBy: UserOrderByInput
    $after: UserWhereUniqueInput
    $before: UserWhereUniqueInput
    $skip: Int
    $first: Int
    $last: Int
  ) {
    findManyUser(
      where: $where
      orderBy: $orderBy
      after: $after
      before: $before
      skip: $skip
      first: $first
      last: $last
    ) {
      ...User
    }
    findManyUserCount(where: $where)
  }
  ${UserFragmentDoc}
`;

/**
 * __useFindManyUserQuery__
 *
 * To run a query within a React component, call `useFindManyUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindManyUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindManyUserQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      skip: // value for 'skip'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useFindManyUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<FindManyUserQuery, FindManyUserQueryVariables>,
) {
  return ApolloReactHooks.useQuery<FindManyUserQuery, FindManyUserQueryVariables>(FindManyUserDocument, baseOptions);
}
export function useFindManyUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FindManyUserQuery, FindManyUserQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<FindManyUserQuery, FindManyUserQueryVariables>(
    FindManyUserDocument,
    baseOptions,
  );
}
export type FindManyUserQueryHookResult = ReturnType<typeof useFindManyUserQuery>;
export type FindManyUserLazyQueryHookResult = ReturnType<typeof useFindManyUserLazyQuery>;
export type FindManyUserQueryResult = ApolloReactCommon.QueryResult<FindManyUserQuery, FindManyUserQueryVariables>;
export const CreateOneUserDocument = gql`
  mutation createOneUser($data: UserCreateInput!) {
    createOneUser(data: $data) {
      ...User
    }
  }
  ${UserFragmentDoc}
`;

/**
 * __useCreateOneUserMutation__
 *
 * To run a mutation, you first call `useCreateOneUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOneUserMutation, { data, loading, error }] = useCreateOneUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOneUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateOneUserMutation, CreateOneUserMutationVariables>,
) {
  return ApolloReactHooks.useMutation<CreateOneUserMutation, CreateOneUserMutationVariables>(
    CreateOneUserDocument,
    baseOptions,
  );
}
export type CreateOneUserMutationHookResult = ReturnType<typeof useCreateOneUserMutation>;
export type CreateOneUserMutationResult = ApolloReactCommon.MutationResult<CreateOneUserMutation>;
export type CreateOneUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateOneUserMutation,
  CreateOneUserMutationVariables
>;
export const UpdateOneUserDocument = gql`
  mutation updateOneUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateOneUser(where: $where, data: $data) {
      ...User
    }
  }
  ${UserFragmentDoc}
`;

/**
 * __useUpdateOneUserMutation__
 *
 * To run a mutation, you first call `useUpdateOneUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneUserMutation, { data, loading, error }] = useUpdateOneUserMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateOneUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateOneUserMutation, UpdateOneUserMutationVariables>,
) {
  return ApolloReactHooks.useMutation<UpdateOneUserMutation, UpdateOneUserMutationVariables>(
    UpdateOneUserDocument,
    baseOptions,
  );
}
export type UpdateOneUserMutationHookResult = ReturnType<typeof useUpdateOneUserMutation>;
export type UpdateOneUserMutationResult = ApolloReactCommon.MutationResult<UpdateOneUserMutation>;
export type UpdateOneUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateOneUserMutation,
  UpdateOneUserMutationVariables
>;
export const DeleteOneUserDocument = gql`
  mutation deleteOneUser($where: UserWhereUniqueInput!) {
    deleteOneUser(where: $where) {
      id
    }
  }
`;

/**
 * __useDeleteOneUserMutation__
 *
 * To run a mutation, you first call `useDeleteOneUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOneUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOneUserMutation, { data, loading, error }] = useDeleteOneUserMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteOneUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteOneUserMutation, DeleteOneUserMutationVariables>,
) {
  return ApolloReactHooks.useMutation<DeleteOneUserMutation, DeleteOneUserMutationVariables>(
    DeleteOneUserDocument,
    baseOptions,
  );
}
export type DeleteOneUserMutationHookResult = ReturnType<typeof useDeleteOneUserMutation>;
export type DeleteOneUserMutationResult = ApolloReactCommon.MutationResult<DeleteOneUserMutation>;
export type DeleteOneUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteOneUserMutation,
  DeleteOneUserMutationVariables
>;
