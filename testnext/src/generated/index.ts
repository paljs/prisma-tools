import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** BigInt custom scalar type */
  BigInt: any;
  /** Date custom scalar type */
  DateTime: any;
  /** Decimal custom scalar type */
  Decimal: any;
  /** Json custom scalar type */
  Json: any;
};

export type AggregateComment = {
  __typename?: 'AggregateComment';
  _avg?: Maybe<CommentAvgAggregateOutputType>;
  _count?: Maybe<CommentCountAggregateOutputType>;
  _max?: Maybe<CommentMaxAggregateOutputType>;
  _min?: Maybe<CommentMinAggregateOutputType>;
  _sum?: Maybe<CommentSumAggregateOutputType>;
};

export type AggregateGroup = {
  __typename?: 'AggregateGroup';
  _avg?: Maybe<GroupAvgAggregateOutputType>;
  _count?: Maybe<GroupCountAggregateOutputType>;
  _max?: Maybe<GroupMaxAggregateOutputType>;
  _min?: Maybe<GroupMinAggregateOutputType>;
  _sum?: Maybe<GroupSumAggregateOutputType>;
};

export type AggregatePost = {
  __typename?: 'AggregatePost';
  _avg?: Maybe<PostAvgAggregateOutputType>;
  _count?: Maybe<PostCountAggregateOutputType>;
  _max?: Maybe<PostMaxAggregateOutputType>;
  _min?: Maybe<PostMinAggregateOutputType>;
  _sum?: Maybe<PostSumAggregateOutputType>;
};

export type AggregateUser = {
  __typename?: 'AggregateUser';
  _avg?: Maybe<UserAvgAggregateOutputType>;
  _count?: Maybe<UserCountAggregateOutputType>;
  _max?: Maybe<UserMaxAggregateOutputType>;
  _min?: Maybe<UserMinAggregateOutputType>;
  _sum?: Maybe<UserSumAggregateOutputType>;
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  count: Scalars['Int'];
};

export type BoolFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Boolean']>;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type BoolWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedBoolFilter>;
  _min?: InputMaybe<NestedBoolFilter>;
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolWithAggregatesFilter>;
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

export type CommentAvgAggregateOutputType = {
  __typename?: 'CommentAvgAggregateOutputType';
  authorId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  postId?: Maybe<Scalars['Float']>;
};

export type CommentAvgOrderByAggregateInput = {
  authorId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
};

export type CommentCountAggregateOutputType = {
  __typename?: 'CommentCountAggregateOutputType';
  _all: Scalars['Int'];
  authorId: Scalars['Int'];
  contain: Scalars['Int'];
  createdAt: Scalars['Int'];
  id: Scalars['Int'];
  postId: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type CommentCountOrderByAggregateInput = {
  authorId?: InputMaybe<SortOrder>;
  contain?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CommentCreateInput = {
  author?: InputMaybe<UserCreateNestedOneWithoutCommentsInput>;
  contain: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  post: PostCreateNestedOneWithoutCommentsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CommentCreateNestedManyWithoutAuthorInput = {
  connect?: InputMaybe<Array<InputMaybe<CommentWhereUniqueInput>>>;
  connectOrCreate?: InputMaybe<Array<InputMaybe<CommentCreateOrConnectWithoutAuthorInput>>>;
  create?: InputMaybe<Array<InputMaybe<CommentCreateWithoutAuthorInput>>>;
};

export type CommentCreateNestedManyWithoutPostInput = {
  connect?: InputMaybe<Array<InputMaybe<CommentWhereUniqueInput>>>;
  connectOrCreate?: InputMaybe<Array<InputMaybe<CommentCreateOrConnectWithoutPostInput>>>;
  create?: InputMaybe<Array<InputMaybe<CommentCreateWithoutPostInput>>>;
};

export type CommentCreateOrConnectWithoutAuthorInput = {
  create: CommentUncheckedCreateWithoutAuthorInput;
  where: CommentWhereUniqueInput;
};

export type CommentCreateOrConnectWithoutPostInput = {
  create: CommentUncheckedCreateWithoutPostInput;
  where: CommentWhereUniqueInput;
};

export type CommentCreateWithoutAuthorInput = {
  contain: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  post: PostCreateNestedOneWithoutCommentsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CommentCreateWithoutPostInput = {
  author?: InputMaybe<UserCreateNestedOneWithoutCommentsInput>;
  contain: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CommentListRelationFilter = {
  every?: InputMaybe<CommentWhereInput>;
  none?: InputMaybe<CommentWhereInput>;
  some?: InputMaybe<CommentWhereInput>;
};

export type CommentMaxAggregateOutputType = {
  __typename?: 'CommentMaxAggregateOutputType';
  authorId?: Maybe<Scalars['Int']>;
  contain?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  postId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CommentMaxOrderByAggregateInput = {
  authorId?: InputMaybe<SortOrder>;
  contain?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CommentMinAggregateOutputType = {
  __typename?: 'CommentMinAggregateOutputType';
  authorId?: Maybe<Scalars['Int']>;
  contain?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  postId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CommentMinOrderByAggregateInput = {
  authorId?: InputMaybe<SortOrder>;
  contain?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CommentOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type CommentOrderByWithAggregationInput = {
  _avg?: InputMaybe<CommentAvgOrderByAggregateInput>;
  _count?: InputMaybe<CommentCountOrderByAggregateInput>;
  _max?: InputMaybe<CommentMaxOrderByAggregateInput>;
  _min?: InputMaybe<CommentMinOrderByAggregateInput>;
  _sum?: InputMaybe<CommentSumOrderByAggregateInput>;
  authorId?: InputMaybe<SortOrder>;
  contain?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CommentOrderByWithRelationInput = {
  author?: InputMaybe<UserOrderByWithRelationInput>;
  authorId?: InputMaybe<SortOrder>;
  contain?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  post?: InputMaybe<PostOrderByWithRelationInput>;
  postId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum CommentScalarFieldEnum {
  AuthorId = 'authorId',
  Contain = 'contain',
  CreatedAt = 'createdAt',
  Id = 'id',
  PostId = 'postId',
  UpdatedAt = 'updatedAt',
}

export type CommentScalarWhereInput = {
  AND?: InputMaybe<Array<InputMaybe<CommentScalarWhereInput>>>;
  NOT?: InputMaybe<Array<InputMaybe<CommentScalarWhereInput>>>;
  OR?: InputMaybe<Array<InputMaybe<CommentScalarWhereInput>>>;
  authorId?: InputMaybe<IntNullableFilter>;
  contain?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  postId?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CommentScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<InputMaybe<CommentScalarWhereWithAggregatesInput>>>;
  NOT?: InputMaybe<Array<InputMaybe<CommentScalarWhereWithAggregatesInput>>>;
  OR?: InputMaybe<Array<InputMaybe<CommentScalarWhereWithAggregatesInput>>>;
  authorId?: InputMaybe<IntNullableWithAggregatesFilter>;
  contain?: InputMaybe<StringWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  postId?: InputMaybe<IntWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type CommentSumAggregateOutputType = {
  __typename?: 'CommentSumAggregateOutputType';
  authorId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  postId?: Maybe<Scalars['Int']>;
};

export type CommentSumOrderByAggregateInput = {
  authorId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  postId?: InputMaybe<SortOrder>;
};

export type CommentUncheckedCreateInput = {
  authorId?: InputMaybe<Scalars['Int']>;
  contain: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  postId: Scalars['Int'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CommentUncheckedCreateNestedManyWithoutAuthorInput = {
  connect?: InputMaybe<Array<InputMaybe<CommentWhereUniqueInput>>>;
  connectOrCreate?: InputMaybe<Array<InputMaybe<CommentCreateOrConnectWithoutAuthorInput>>>;
  create?: InputMaybe<Array<InputMaybe<CommentCreateWithoutAuthorInput>>>;
};

export type CommentUncheckedCreateNestedManyWithoutPostInput = {
  connect?: InputMaybe<Array<InputMaybe<CommentWhereUniqueInput>>>;
  connectOrCreate?: InputMaybe<Array<InputMaybe<CommentCreateOrConnectWithoutPostInput>>>;
  create?: InputMaybe<Array<InputMaybe<CommentCreateWithoutPostInput>>>;
};

export type CommentUncheckedCreateWithoutAuthorInput = {
  contain: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  postId: Scalars['Int'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CommentUncheckedCreateWithoutPostInput = {
  authorId?: InputMaybe<Scalars['Int']>;
  contain: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CommentUncheckedUpdateInput = {
  authorId?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  contain?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<IntFieldUpdateOperationsInput>;
  postId?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CommentUncheckedUpdateManyInput = {
  authorId?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  contain?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<IntFieldUpdateOperationsInput>;
  postId?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CommentUncheckedUpdateManyWithoutAuthorInput = {
  connect?: InputMaybe<Array<InputMaybe<CommentWhereUniqueInput>>>;
  connectOrCreate?: InputMaybe<Array<InputMaybe<CommentCreateOrConnectWithoutAuthorInput>>>;
  create?: InputMaybe<Array<InputMaybe<CommentCreateWithoutAuthorInput>>>;
  delete?: InputMaybe<Array<InputMaybe<CommentWhereUniqueInput>>>;
  deleteMany?: InputMaybe<Array<InputMaybe<CommentScalarWhereInput>>>;
  disconnect?: InputMaybe<Array<InputMaybe<CommentWhereUniqueInput>>>;
  set?: InputMaybe<Array<InputMaybe<CommentWhereUniqueInput>>>;
  update?: InputMaybe<Array<InputMaybe<CommentUpdateWithWhereUniqueWithoutAuthorInput>>>;
  updateMany?: InputMaybe<Array<InputMaybe<CommentUpdateManyWithWhereWithoutAuthorInput>>>;
  upsert?: InputMaybe<Array<InputMaybe<CommentUpsertWithWhereUniqueWithoutAuthorInput>>>;
};

export type CommentUncheckedUpdateManyWithoutCommentsInput = {
  contain?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<IntFieldUpdateOperationsInput>;
  postId?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CommentUncheckedUpdateManyWithoutPostInput = {
  connect?: InputMaybe<Array<InputMaybe<CommentWhereUniqueInput>>>;
  connectOrCreate?: InputMaybe<Array<InputMaybe<CommentCreateOrConnectWithoutPostInput>>>;
  create?: InputMaybe<Array<InputMaybe<CommentCreateWithoutPostInput>>>;
  delete?: InputMaybe<Array<InputMaybe<CommentWhereUniqueInput>>>;
  deleteMany?: InputMaybe<Array<InputMaybe<CommentScalarWhereInput>>>;
  disconnect?: InputMaybe<Array<InputMaybe<CommentWhereUniqueInput>>>;
  set?: InputMaybe<Array<InputMaybe<CommentWhereUniqueInput>>>;
  update?: InputMaybe<Array<InputMaybe<CommentUpdateWithWhereUniqueWithoutPostInput>>>;
  updateMany?: InputMaybe<Array<InputMaybe<CommentUpdateManyWithWhereWithoutPostInput>>>;
  upsert?: InputMaybe<Array<InputMaybe<CommentUpsertWithWhereUniqueWithoutPostInput>>>;
};

export type CommentUncheckedUpdateWithoutAuthorInput = {
  contain?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<IntFieldUpdateOperationsInput>;
  postId?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CommentUncheckedUpdateWithoutPostInput = {
  authorId?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  contain?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CommentUpdateInput = {
  author?: InputMaybe<UserUpdateOneWithoutCommentsInput>;
  contain?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  post?: InputMaybe<PostUpdateOneRequiredWithoutCommentsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CommentUpdateManyMutationInput = {
  contain?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CommentUpdateManyWithWhereWithoutAuthorInput = {
  data: CommentUncheckedUpdateManyWithoutCommentsInput;
  where: CommentScalarWhereInput;
};

export type CommentUpdateManyWithWhereWithoutPostInput = {
  data: CommentUncheckedUpdateManyWithoutCommentsInput;
  where: CommentScalarWhereInput;
};

export type CommentUpdateManyWithoutAuthorInput = {
  connect?: InputMaybe<Array<InputMaybe<CommentWhereUniqueInput>>>;
  connectOrCreate?: InputMaybe<Array<InputMaybe<CommentCreateOrConnectWithoutAuthorInput>>>;
  create?: InputMaybe<Array<InputMaybe<CommentCreateWithoutAuthorInput>>>;
  delete?: InputMaybe<Array<InputMaybe<CommentWhereUniqueInput>>>;
  deleteMany?: InputMaybe<Array<InputMaybe<CommentScalarWhereInput>>>;
  disconnect?: InputMaybe<Array<InputMaybe<CommentWhereUniqueInput>>>;
  set?: InputMaybe<Array<InputMaybe<CommentWhereUniqueInput>>>;
  update?: InputMaybe<Array<InputMaybe<CommentUpdateWithWhereUniqueWithoutAuthorInput>>>;
  updateMany?: InputMaybe<Array<InputMaybe<CommentUpdateManyWithWhereWithoutAuthorInput>>>;
  upsert?: InputMaybe<Array<InputMaybe<CommentUpsertWithWhereUniqueWithoutAuthorInput>>>;
};

export type CommentUpdateManyWithoutPostInput = {
  connect?: InputMaybe<Array<InputMaybe<CommentWhereUniqueInput>>>;
  connectOrCreate?: InputMaybe<Array<InputMaybe<CommentCreateOrConnectWithoutPostInput>>>;
  create?: InputMaybe<Array<InputMaybe<CommentCreateWithoutPostInput>>>;
  delete?: InputMaybe<Array<InputMaybe<CommentWhereUniqueInput>>>;
  deleteMany?: InputMaybe<Array<InputMaybe<CommentScalarWhereInput>>>;
  disconnect?: InputMaybe<Array<InputMaybe<CommentWhereUniqueInput>>>;
  set?: InputMaybe<Array<InputMaybe<CommentWhereUniqueInput>>>;
  update?: InputMaybe<Array<InputMaybe<CommentUpdateWithWhereUniqueWithoutPostInput>>>;
  updateMany?: InputMaybe<Array<InputMaybe<CommentUpdateManyWithWhereWithoutPostInput>>>;
  upsert?: InputMaybe<Array<InputMaybe<CommentUpsertWithWhereUniqueWithoutPostInput>>>;
};

export type CommentUpdateWithWhereUniqueWithoutAuthorInput = {
  data: CommentUncheckedUpdateWithoutAuthorInput;
  where: CommentWhereUniqueInput;
};

export type CommentUpdateWithWhereUniqueWithoutPostInput = {
  data: CommentUncheckedUpdateWithoutPostInput;
  where: CommentWhereUniqueInput;
};

export type CommentUpdateWithoutAuthorInput = {
  contain?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  post?: InputMaybe<PostUpdateOneRequiredWithoutCommentsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CommentUpdateWithoutPostInput = {
  author?: InputMaybe<UserUpdateOneWithoutCommentsInput>;
  contain?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CommentUpsertWithWhereUniqueWithoutAuthorInput = {
  create: CommentUncheckedCreateWithoutAuthorInput;
  update: CommentUncheckedUpdateWithoutAuthorInput;
  where: CommentWhereUniqueInput;
};

export type CommentUpsertWithWhereUniqueWithoutPostInput = {
  create: CommentUncheckedCreateWithoutPostInput;
  update: CommentUncheckedUpdateWithoutPostInput;
  where: CommentWhereUniqueInput;
};

export type CommentWhereInput = {
  AND?: InputMaybe<Array<InputMaybe<CommentWhereInput>>>;
  NOT?: InputMaybe<Array<InputMaybe<CommentWhereInput>>>;
  OR?: InputMaybe<Array<InputMaybe<CommentWhereInput>>>;
  author?: InputMaybe<UserWhereInput>;
  authorId?: InputMaybe<IntNullableFilter>;
  contain?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  post?: InputMaybe<PostWhereInput>;
  postId?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CommentWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
};

export type DateTimeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedDateTimeFilter>;
  _min?: InputMaybe<NestedDateTimeFilter>;
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
};

export type Enum = {
  __typename?: 'Enum';
  fields: Array<Scalars['String']>;
  name: Scalars['String'];
};

export type Field = {
  __typename?: 'Field';
  create: Scalars['Boolean'];
  editor: Scalars['Boolean'];
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
  upload: Scalars['Boolean'];
};

export type Group = {
  __typename?: 'Group';
  _count: GroupCountOutputType;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  users: Array<User>;
};

export type GroupUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<UserScalarFieldEnum>;
  orderBy?: InputMaybe<UserOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

export type GroupAvgAggregateOutputType = {
  __typename?: 'GroupAvgAggregateOutputType';
  id?: Maybe<Scalars['Float']>;
};

export type GroupAvgOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type GroupCountAggregateOutputType = {
  __typename?: 'GroupCountAggregateOutputType';
  _all: Scalars['Int'];
  createdAt: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type GroupCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GroupCountOutputType = {
  __typename?: 'GroupCountOutputType';
  users: Scalars['Int'];
};

export type GroupCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  users?: InputMaybe<UserCreateNestedManyWithoutGroupInput>;
};

export type GroupCreateNestedOneWithoutUsersInput = {
  connect?: InputMaybe<GroupWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GroupCreateOrConnectWithoutUsersInput>;
  create?: InputMaybe<GroupUncheckedCreateWithoutUsersInput>;
};

export type GroupCreateOrConnectWithoutUsersInput = {
  create: GroupUncheckedCreateWithoutUsersInput;
  where: GroupWhereUniqueInput;
};

export type GroupCreateWithoutUsersInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type GroupMaxAggregateOutputType = {
  __typename?: 'GroupMaxAggregateOutputType';
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GroupMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GroupMinAggregateOutputType = {
  __typename?: 'GroupMinAggregateOutputType';
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type GroupMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GroupOrderByWithAggregationInput = {
  _avg?: InputMaybe<GroupAvgOrderByAggregateInput>;
  _count?: InputMaybe<GroupCountOrderByAggregateInput>;
  _max?: InputMaybe<GroupMaxOrderByAggregateInput>;
  _min?: InputMaybe<GroupMinOrderByAggregateInput>;
  _sum?: InputMaybe<GroupSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type GroupOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  users?: InputMaybe<UserOrderByRelationAggregateInput>;
};

export type GroupRelationFilter = {
  is?: InputMaybe<GroupWhereInput>;
  isNot?: InputMaybe<GroupWhereInput>;
};

export enum GroupScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt',
}

export type GroupScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<InputMaybe<GroupScalarWhereWithAggregatesInput>>>;
  NOT?: InputMaybe<Array<InputMaybe<GroupScalarWhereWithAggregatesInput>>>;
  OR?: InputMaybe<Array<InputMaybe<GroupScalarWhereWithAggregatesInput>>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  name?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type GroupSumAggregateOutputType = {
  __typename?: 'GroupSumAggregateOutputType';
  id?: Maybe<Scalars['Int']>;
};

export type GroupSumOrderByAggregateInput = {
  id?: InputMaybe<SortOrder>;
};

export type GroupUncheckedCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  users?: InputMaybe<UserUncheckedCreateNestedManyWithoutGroupInput>;
};

export type GroupUncheckedCreateWithoutUsersInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type GroupUncheckedUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<IntFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUncheckedUpdateManyWithoutGroupInput>;
};

export type GroupUncheckedUpdateManyInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<IntFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type GroupUncheckedUpdateWithoutUsersInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<IntFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type GroupUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutGroupInput>;
};

export type GroupUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type GroupUpdateOneWithoutUsersInput = {
  connect?: InputMaybe<GroupWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GroupCreateOrConnectWithoutUsersInput>;
  create?: InputMaybe<GroupUncheckedCreateWithoutUsersInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<GroupUncheckedUpdateWithoutUsersInput>;
  upsert?: InputMaybe<GroupUpsertWithoutUsersInput>;
};

export type GroupUpdateWithoutUsersInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type GroupUpsertWithoutUsersInput = {
  create: GroupUncheckedCreateWithoutUsersInput;
  update: GroupUncheckedUpdateWithoutUsersInput;
};

export type GroupWhereInput = {
  AND?: InputMaybe<Array<InputMaybe<GroupWhereInput>>>;
  NOT?: InputMaybe<Array<InputMaybe<GroupWhereInput>>>;
  OR?: InputMaybe<Array<InputMaybe<GroupWhereInput>>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  users?: InputMaybe<UserListRelationFilter>;
};

export type GroupWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type IntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']>;
  divide?: InputMaybe<Scalars['Int']>;
  increment?: InputMaybe<Scalars['Int']>;
  multiply?: InputMaybe<Scalars['Int']>;
  set?: InputMaybe<Scalars['Int']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type IntNullableWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatNullableFilter>;
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedIntNullableFilter>;
  _min?: InputMaybe<NestedIntNullableFilter>;
  _sum?: InputMaybe<NestedIntNullableFilter>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type IntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedIntFilter>;
  _sum?: InputMaybe<NestedIntFilter>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntWithAggregatesFilter>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
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
  deleteManyComment: BatchPayload;
  deleteManyGroup: BatchPayload;
  deleteManyPost: BatchPayload;
  deleteManyUser: BatchPayload;
  deleteOneComment?: Maybe<Comment>;
  deleteOneGroup?: Maybe<Group>;
  deleteOnePost?: Maybe<Post>;
  deleteOneUser?: Maybe<User>;
  login?: Maybe<User>;
  logout?: Maybe<Scalars['Boolean']>;
  signup?: Maybe<User>;
  updateField: Field;
  updateManyComment: BatchPayload;
  updateManyGroup: BatchPayload;
  updateManyPost: BatchPayload;
  updateManyUser: BatchPayload;
  updateModel: Model;
  updateOneComment: Comment;
  updateOneGroup: Group;
  updateOnePost: Post;
  updateOneUser: User;
  updatePassword?: Maybe<Scalars['Boolean']>;
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

export type MutationDeleteManyCommentArgs = {
  where?: InputMaybe<CommentWhereInput>;
};

export type MutationDeleteManyGroupArgs = {
  where?: InputMaybe<GroupWhereInput>;
};

export type MutationDeleteManyPostArgs = {
  where?: InputMaybe<PostWhereInput>;
};

export type MutationDeleteManyUserArgs = {
  where?: InputMaybe<UserWhereInput>;
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
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type MutationUpdateFieldArgs = {
  data: UpdateFieldInput;
  id: Scalars['String'];
  modelId: Scalars['String'];
};

export type MutationUpdateManyCommentArgs = {
  data: CommentUpdateManyMutationInput;
  where?: InputMaybe<CommentWhereInput>;
};

export type MutationUpdateManyGroupArgs = {
  data: GroupUpdateManyMutationInput;
  where?: InputMaybe<GroupWhereInput>;
};

export type MutationUpdateManyPostArgs = {
  data: PostUpdateManyMutationInput;
  where?: InputMaybe<PostWhereInput>;
};

export type MutationUpdateManyUserArgs = {
  data: UserUpdateManyMutationInput;
  where?: InputMaybe<UserWhereInput>;
};

export type MutationUpdateModelArgs = {
  data: UpdateModelInput;
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

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedBoolWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedBoolFilter>;
  _min?: InputMaybe<NestedBoolFilter>;
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolWithAggregatesFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
};

export type NestedDateTimeWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedDateTimeFilter>;
  _min?: InputMaybe<NestedDateTimeFilter>;
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeWithAggregatesFilter>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
};

export type NestedFloatFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

export type NestedFloatNullableFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatNullableFilter>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type NestedIntNullableWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatNullableFilter>;
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedIntNullableFilter>;
  _min?: InputMaybe<NestedIntNullableFilter>;
  _sum?: InputMaybe<NestedIntNullableFilter>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type NestedIntWithAggregatesFilter = {
  _avg?: InputMaybe<NestedFloatFilter>;
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedIntFilter>;
  _min?: InputMaybe<NestedIntFilter>;
  _sum?: InputMaybe<NestedIntFilter>;
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntWithAggregatesFilter>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedStringNullableFilter>;
  _min?: InputMaybe<NestedStringNullableFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NullableIntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']>;
  divide?: InputMaybe<Scalars['Int']>;
  increment?: InputMaybe<Scalars['Int']>;
  multiply?: InputMaybe<Scalars['Int']>;
  set?: InputMaybe<Scalars['Int']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  _count: PostCountOutputType;
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
  cursor?: InputMaybe<CommentWhereUniqueInput>;
  distinct?: InputMaybe<CommentScalarFieldEnum>;
  orderBy?: InputMaybe<CommentOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CommentWhereInput>;
};

export type PostAvgAggregateOutputType = {
  __typename?: 'PostAvgAggregateOutputType';
  authorId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

export type PostAvgOrderByAggregateInput = {
  authorId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type PostCountAggregateOutputType = {
  __typename?: 'PostCountAggregateOutputType';
  _all: Scalars['Int'];
  authorId: Scalars['Int'];
  createdAt: Scalars['Int'];
  id: Scalars['Int'];
  published: Scalars['Int'];
  title: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type PostCountOrderByAggregateInput = {
  authorId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  published?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PostCountOutputType = {
  __typename?: 'PostCountOutputType';
  comments: Scalars['Int'];
};

export type PostCreateInput = {
  author?: InputMaybe<UserCreateNestedOneWithoutPostsInput>;
  comments?: InputMaybe<CommentCreateNestedManyWithoutPostInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  published?: InputMaybe<Scalars['Boolean']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PostCreateNestedManyWithoutAuthorInput = {
  connect?: InputMaybe<Array<InputMaybe<PostWhereUniqueInput>>>;
  connectOrCreate?: InputMaybe<Array<InputMaybe<PostCreateOrConnectWithoutAuthorInput>>>;
  create?: InputMaybe<Array<InputMaybe<PostCreateWithoutAuthorInput>>>;
};

export type PostCreateNestedOneWithoutCommentsInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutCommentsInput>;
  create?: InputMaybe<PostUncheckedCreateWithoutCommentsInput>;
};

export type PostCreateOrConnectWithoutAuthorInput = {
  create: PostUncheckedCreateWithoutAuthorInput;
  where: PostWhereUniqueInput;
};

export type PostCreateOrConnectWithoutCommentsInput = {
  create: PostUncheckedCreateWithoutCommentsInput;
  where: PostWhereUniqueInput;
};

export type PostCreateWithoutAuthorInput = {
  comments?: InputMaybe<CommentCreateNestedManyWithoutPostInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  published?: InputMaybe<Scalars['Boolean']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PostCreateWithoutCommentsInput = {
  author?: InputMaybe<UserCreateNestedOneWithoutPostsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  published?: InputMaybe<Scalars['Boolean']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PostListRelationFilter = {
  every?: InputMaybe<PostWhereInput>;
  none?: InputMaybe<PostWhereInput>;
  some?: InputMaybe<PostWhereInput>;
};

export type PostMaxAggregateOutputType = {
  __typename?: 'PostMaxAggregateOutputType';
  authorId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  published?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PostMaxOrderByAggregateInput = {
  authorId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  published?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PostMinAggregateOutputType = {
  __typename?: 'PostMinAggregateOutputType';
  authorId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['Int']>;
  published?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PostMinOrderByAggregateInput = {
  authorId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  published?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PostOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type PostOrderByWithAggregationInput = {
  _avg?: InputMaybe<PostAvgOrderByAggregateInput>;
  _count?: InputMaybe<PostCountOrderByAggregateInput>;
  _max?: InputMaybe<PostMaxOrderByAggregateInput>;
  _min?: InputMaybe<PostMinOrderByAggregateInput>;
  _sum?: InputMaybe<PostSumOrderByAggregateInput>;
  authorId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  published?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PostOrderByWithRelationInput = {
  author?: InputMaybe<UserOrderByWithRelationInput>;
  authorId?: InputMaybe<SortOrder>;
  comments?: InputMaybe<CommentOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  published?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PostRelationFilter = {
  is?: InputMaybe<PostWhereInput>;
  isNot?: InputMaybe<PostWhereInput>;
};

export enum PostScalarFieldEnum {
  AuthorId = 'authorId',
  CreatedAt = 'createdAt',
  Id = 'id',
  Published = 'published',
  Title = 'title',
  UpdatedAt = 'updatedAt',
}

export type PostScalarWhereInput = {
  AND?: InputMaybe<Array<InputMaybe<PostScalarWhereInput>>>;
  NOT?: InputMaybe<Array<InputMaybe<PostScalarWhereInput>>>;
  OR?: InputMaybe<Array<InputMaybe<PostScalarWhereInput>>>;
  authorId?: InputMaybe<IntNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  published?: InputMaybe<BoolFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type PostScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<InputMaybe<PostScalarWhereWithAggregatesInput>>>;
  NOT?: InputMaybe<Array<InputMaybe<PostScalarWhereWithAggregatesInput>>>;
  OR?: InputMaybe<Array<InputMaybe<PostScalarWhereWithAggregatesInput>>>;
  authorId?: InputMaybe<IntNullableWithAggregatesFilter>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  published?: InputMaybe<BoolWithAggregatesFilter>;
  title?: InputMaybe<StringWithAggregatesFilter>;
  updatedAt?: InputMaybe<DateTimeWithAggregatesFilter>;
};

export type PostSumAggregateOutputType = {
  __typename?: 'PostSumAggregateOutputType';
  authorId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

export type PostSumOrderByAggregateInput = {
  authorId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type PostUncheckedCreateInput = {
  authorId?: InputMaybe<Scalars['Int']>;
  comments?: InputMaybe<CommentUncheckedCreateNestedManyWithoutPostInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  published?: InputMaybe<Scalars['Boolean']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PostUncheckedCreateNestedManyWithoutAuthorInput = {
  connect?: InputMaybe<Array<InputMaybe<PostWhereUniqueInput>>>;
  connectOrCreate?: InputMaybe<Array<InputMaybe<PostCreateOrConnectWithoutAuthorInput>>>;
  create?: InputMaybe<Array<InputMaybe<PostCreateWithoutAuthorInput>>>;
};

export type PostUncheckedCreateWithoutAuthorInput = {
  comments?: InputMaybe<CommentUncheckedCreateNestedManyWithoutPostInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  published?: InputMaybe<Scalars['Boolean']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PostUncheckedCreateWithoutCommentsInput = {
  authorId?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['Int']>;
  published?: InputMaybe<Scalars['Boolean']>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PostUncheckedUpdateInput = {
  authorId?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  comments?: InputMaybe<CommentUncheckedUpdateManyWithoutPostInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<IntFieldUpdateOperationsInput>;
  published?: InputMaybe<BoolFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PostUncheckedUpdateManyInput = {
  authorId?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<IntFieldUpdateOperationsInput>;
  published?: InputMaybe<BoolFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PostUncheckedUpdateManyWithoutAuthorInput = {
  connect?: InputMaybe<Array<InputMaybe<PostWhereUniqueInput>>>;
  connectOrCreate?: InputMaybe<Array<InputMaybe<PostCreateOrConnectWithoutAuthorInput>>>;
  create?: InputMaybe<Array<InputMaybe<PostCreateWithoutAuthorInput>>>;
  delete?: InputMaybe<Array<InputMaybe<PostWhereUniqueInput>>>;
  deleteMany?: InputMaybe<Array<InputMaybe<PostScalarWhereInput>>>;
  disconnect?: InputMaybe<Array<InputMaybe<PostWhereUniqueInput>>>;
  set?: InputMaybe<Array<InputMaybe<PostWhereUniqueInput>>>;
  update?: InputMaybe<Array<InputMaybe<PostUpdateWithWhereUniqueWithoutAuthorInput>>>;
  updateMany?: InputMaybe<Array<InputMaybe<PostUpdateManyWithWhereWithoutAuthorInput>>>;
  upsert?: InputMaybe<Array<InputMaybe<PostUpsertWithWhereUniqueWithoutAuthorInput>>>;
};

export type PostUncheckedUpdateManyWithoutPostsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<IntFieldUpdateOperationsInput>;
  published?: InputMaybe<BoolFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PostUncheckedUpdateWithoutAuthorInput = {
  comments?: InputMaybe<CommentUncheckedUpdateManyWithoutPostInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<IntFieldUpdateOperationsInput>;
  published?: InputMaybe<BoolFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PostUncheckedUpdateWithoutCommentsInput = {
  authorId?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<IntFieldUpdateOperationsInput>;
  published?: InputMaybe<BoolFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PostUpdateInput = {
  author?: InputMaybe<UserUpdateOneWithoutPostsInput>;
  comments?: InputMaybe<CommentUpdateManyWithoutPostInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  published?: InputMaybe<BoolFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PostUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  published?: InputMaybe<BoolFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PostUpdateManyWithWhereWithoutAuthorInput = {
  data: PostUncheckedUpdateManyWithoutPostsInput;
  where: PostScalarWhereInput;
};

export type PostUpdateManyWithoutAuthorInput = {
  connect?: InputMaybe<Array<InputMaybe<PostWhereUniqueInput>>>;
  connectOrCreate?: InputMaybe<Array<InputMaybe<PostCreateOrConnectWithoutAuthorInput>>>;
  create?: InputMaybe<Array<InputMaybe<PostCreateWithoutAuthorInput>>>;
  delete?: InputMaybe<Array<InputMaybe<PostWhereUniqueInput>>>;
  deleteMany?: InputMaybe<Array<InputMaybe<PostScalarWhereInput>>>;
  disconnect?: InputMaybe<Array<InputMaybe<PostWhereUniqueInput>>>;
  set?: InputMaybe<Array<InputMaybe<PostWhereUniqueInput>>>;
  update?: InputMaybe<Array<InputMaybe<PostUpdateWithWhereUniqueWithoutAuthorInput>>>;
  updateMany?: InputMaybe<Array<InputMaybe<PostUpdateManyWithWhereWithoutAuthorInput>>>;
  upsert?: InputMaybe<Array<InputMaybe<PostUpsertWithWhereUniqueWithoutAuthorInput>>>;
};

export type PostUpdateOneRequiredWithoutCommentsInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutCommentsInput>;
  create?: InputMaybe<PostUncheckedCreateWithoutCommentsInput>;
  update?: InputMaybe<PostUncheckedUpdateWithoutCommentsInput>;
  upsert?: InputMaybe<PostUpsertWithoutCommentsInput>;
};

export type PostUpdateWithWhereUniqueWithoutAuthorInput = {
  data: PostUncheckedUpdateWithoutAuthorInput;
  where: PostWhereUniqueInput;
};

export type PostUpdateWithoutAuthorInput = {
  comments?: InputMaybe<CommentUpdateManyWithoutPostInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  published?: InputMaybe<BoolFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PostUpdateWithoutCommentsInput = {
  author?: InputMaybe<UserUpdateOneWithoutPostsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  published?: InputMaybe<BoolFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PostUpsertWithWhereUniqueWithoutAuthorInput = {
  create: PostUncheckedCreateWithoutAuthorInput;
  update: PostUncheckedUpdateWithoutAuthorInput;
  where: PostWhereUniqueInput;
};

export type PostUpsertWithoutCommentsInput = {
  create: PostUncheckedCreateWithoutCommentsInput;
  update: PostUncheckedUpdateWithoutCommentsInput;
};

export type PostWhereInput = {
  AND?: InputMaybe<Array<InputMaybe<PostWhereInput>>>;
  NOT?: InputMaybe<Array<InputMaybe<PostWhereInput>>>;
  OR?: InputMaybe<Array<InputMaybe<PostWhereInput>>>;
  author?: InputMaybe<UserWhereInput>;
  authorId?: InputMaybe<IntNullableFilter>;
  comments?: InputMaybe<CommentListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  published?: InputMaybe<BoolFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type PostWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  aggregateComment?: Maybe<AggregateComment>;
  aggregateGroup?: Maybe<AggregateGroup>;
  aggregatePost?: Maybe<AggregatePost>;
  aggregateUser?: Maybe<AggregateUser>;
  findFirstComment?: Maybe<Comment>;
  findFirstGroup?: Maybe<Group>;
  findFirstPost?: Maybe<Post>;
  findFirstUser?: Maybe<User>;
  findManyComment: Array<Comment>;
  findManyCommentCount: Scalars['Int'];
  findManyGroup: Array<Group>;
  findManyGroupCount: Scalars['Int'];
  findManyPost: Array<Post>;
  findManyPostCount: Scalars['Int'];
  findManyUser: Array<User>;
  findManyUserCount: Scalars['Int'];
  findUniqueComment?: Maybe<Comment>;
  findUniqueGroup?: Maybe<Group>;
  findUniquePost?: Maybe<Post>;
  findUniqueUser?: Maybe<User>;
  getSchema: Schema;
  me?: Maybe<User>;
};

export type QueryAggregateCommentArgs = {
  cursor?: InputMaybe<CommentWhereUniqueInput>;
  orderBy?: InputMaybe<Array<InputMaybe<CommentOrderByWithRelationInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CommentWhereInput>;
};

export type QueryAggregateGroupArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>;
  orderBy?: InputMaybe<Array<InputMaybe<GroupOrderByWithRelationInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupWhereInput>;
};

export type QueryAggregatePostArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>;
  orderBy?: InputMaybe<Array<InputMaybe<PostOrderByWithRelationInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PostWhereInput>;
};

export type QueryAggregateUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: InputMaybe<Array<InputMaybe<UserOrderByWithRelationInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

export type QueryFindFirstCommentArgs = {
  cursor?: InputMaybe<CommentWhereUniqueInput>;
  distinct?: InputMaybe<Array<InputMaybe<CommentScalarFieldEnum>>>;
  orderBy?: InputMaybe<Array<InputMaybe<CommentOrderByWithRelationInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CommentWhereInput>;
};

export type QueryFindFirstGroupArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<InputMaybe<GroupScalarFieldEnum>>>;
  orderBy?: InputMaybe<Array<InputMaybe<GroupOrderByWithRelationInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupWhereInput>;
};

export type QueryFindFirstPostArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>;
  distinct?: InputMaybe<Array<InputMaybe<PostScalarFieldEnum>>>;
  orderBy?: InputMaybe<Array<InputMaybe<PostOrderByWithRelationInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PostWhereInput>;
};

export type QueryFindFirstUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<InputMaybe<UserScalarFieldEnum>>>;
  orderBy?: InputMaybe<Array<InputMaybe<UserOrderByWithRelationInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

export type QueryFindManyCommentArgs = {
  cursor?: InputMaybe<CommentWhereUniqueInput>;
  distinct?: InputMaybe<Array<InputMaybe<CommentScalarFieldEnum>>>;
  orderBy?: InputMaybe<Array<InputMaybe<CommentOrderByWithRelationInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CommentWhereInput>;
};

export type QueryFindManyCommentCountArgs = {
  cursor?: InputMaybe<CommentWhereUniqueInput>;
  distinct?: InputMaybe<Array<InputMaybe<CommentScalarFieldEnum>>>;
  orderBy?: InputMaybe<Array<InputMaybe<CommentOrderByWithRelationInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CommentWhereInput>;
};

export type QueryFindManyGroupArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<InputMaybe<GroupScalarFieldEnum>>>;
  orderBy?: InputMaybe<Array<InputMaybe<GroupOrderByWithRelationInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupWhereInput>;
};

export type QueryFindManyGroupCountArgs = {
  cursor?: InputMaybe<GroupWhereUniqueInput>;
  distinct?: InputMaybe<Array<InputMaybe<GroupScalarFieldEnum>>>;
  orderBy?: InputMaybe<Array<InputMaybe<GroupOrderByWithRelationInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupWhereInput>;
};

export type QueryFindManyPostArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>;
  distinct?: InputMaybe<Array<InputMaybe<PostScalarFieldEnum>>>;
  orderBy?: InputMaybe<Array<InputMaybe<PostOrderByWithRelationInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PostWhereInput>;
};

export type QueryFindManyPostCountArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>;
  distinct?: InputMaybe<Array<InputMaybe<PostScalarFieldEnum>>>;
  orderBy?: InputMaybe<Array<InputMaybe<PostOrderByWithRelationInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PostWhereInput>;
};

export type QueryFindManyUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<InputMaybe<UserScalarFieldEnum>>>;
  orderBy?: InputMaybe<Array<InputMaybe<UserOrderByWithRelationInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

export type QueryFindManyUserCountArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<InputMaybe<UserScalarFieldEnum>>>;
  orderBy?: InputMaybe<Array<InputMaybe<UserOrderByWithRelationInput>>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

export type QueryFindUniqueCommentArgs = {
  where: CommentWhereUniqueInput;
};

export type QueryFindUniqueGroupArgs = {
  where: GroupWhereUniqueInput;
};

export type QueryFindUniquePostArgs = {
  where: PostWhereUniqueInput;
};

export type QueryFindUniqueUserArgs = {
  where: UserWhereUniqueInput;
};

export type Schema = {
  __typename?: 'Schema';
  enums: Array<Enum>;
  models: Array<Model>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntNullableFilter>;
  _max?: InputMaybe<NestedStringNullableFilter>;
  _min?: InputMaybe<NestedStringNullableFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableWithAggregatesFilter>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringWithAggregatesFilter = {
  _count?: InputMaybe<NestedIntFilter>;
  _max?: InputMaybe<NestedStringFilter>;
  _min?: InputMaybe<NestedStringFilter>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringWithAggregatesFilter>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type UpdateFieldInput = {
  create?: InputMaybe<Scalars['Boolean']>;
  editor?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  isId?: InputMaybe<Scalars['Boolean']>;
  kind?: InputMaybe<KindEnum>;
  list?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  read?: InputMaybe<Scalars['Boolean']>;
  relationField?: InputMaybe<Scalars['Boolean']>;
  required?: InputMaybe<Scalars['Boolean']>;
  sort?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  unique?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<Scalars['Boolean']>;
  upload?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateModelInput = {
  create?: InputMaybe<Scalars['Boolean']>;
  delete?: InputMaybe<Scalars['Boolean']>;
  displayFields?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  fields?: InputMaybe<Array<InputMaybe<UpdateFieldInput>>>;
  idField?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  update?: InputMaybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  _count: UserCountOutputType;
  comments: Array<Comment>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  group?: Maybe<Group>;
  groupId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  posts: Array<Post>;
};

export type UserCommentsArgs = {
  cursor?: InputMaybe<CommentWhereUniqueInput>;
  distinct?: InputMaybe<CommentScalarFieldEnum>;
  orderBy?: InputMaybe<CommentOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CommentWhereInput>;
};

export type UserPostsArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>;
  distinct?: InputMaybe<PostScalarFieldEnum>;
  orderBy?: InputMaybe<PostOrderByWithRelationInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PostWhereInput>;
};

export type UserAvgAggregateOutputType = {
  __typename?: 'UserAvgAggregateOutputType';
  groupId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

export type UserAvgOrderByAggregateInput = {
  groupId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type UserCountAggregateOutputType = {
  __typename?: 'UserCountAggregateOutputType';
  _all: Scalars['Int'];
  createdAt: Scalars['Int'];
  email: Scalars['Int'];
  groupId: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['Int'];
  password: Scalars['Int'];
};

export type UserCountOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  groupId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
};

export type UserCountOutputType = {
  __typename?: 'UserCountOutputType';
  comments: Scalars['Int'];
  posts: Scalars['Int'];
};

export type UserCreateInput = {
  comments?: InputMaybe<CommentCreateNestedManyWithoutAuthorInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  group?: InputMaybe<GroupCreateNestedOneWithoutUsersInput>;
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  posts?: InputMaybe<PostCreateNestedManyWithoutAuthorInput>;
};

export type UserCreateNestedManyWithoutGroupInput = {
  connect?: InputMaybe<Array<InputMaybe<UserWhereUniqueInput>>>;
  connectOrCreate?: InputMaybe<Array<InputMaybe<UserCreateOrConnectWithoutGroupInput>>>;
  create?: InputMaybe<Array<InputMaybe<UserCreateWithoutGroupInput>>>;
};

export type UserCreateNestedOneWithoutCommentsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCommentsInput>;
  create?: InputMaybe<UserUncheckedCreateWithoutCommentsInput>;
};

export type UserCreateNestedOneWithoutPostsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutPostsInput>;
  create?: InputMaybe<UserUncheckedCreateWithoutPostsInput>;
};

export type UserCreateOrConnectWithoutCommentsInput = {
  create: UserUncheckedCreateWithoutCommentsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutGroupInput = {
  create: UserUncheckedCreateWithoutGroupInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutPostsInput = {
  create: UserUncheckedCreateWithoutPostsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutCommentsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  group?: InputMaybe<GroupCreateNestedOneWithoutUsersInput>;
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  posts?: InputMaybe<PostCreateNestedManyWithoutAuthorInput>;
};

export type UserCreateWithoutGroupInput = {
  comments?: InputMaybe<CommentCreateNestedManyWithoutAuthorInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  posts?: InputMaybe<PostCreateNestedManyWithoutAuthorInput>;
};

export type UserCreateWithoutPostsInput = {
  comments?: InputMaybe<CommentCreateNestedManyWithoutAuthorInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  group?: InputMaybe<GroupCreateNestedOneWithoutUsersInput>;
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type UserListRelationFilter = {
  every?: InputMaybe<UserWhereInput>;
  none?: InputMaybe<UserWhereInput>;
  some?: InputMaybe<UserWhereInput>;
};

export type UserMaxAggregateOutputType = {
  __typename?: 'UserMaxAggregateOutputType';
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  groupId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type UserMaxOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  groupId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
};

export type UserMinAggregateOutputType = {
  __typename?: 'UserMinAggregateOutputType';
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  groupId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type UserMinOrderByAggregateInput = {
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  groupId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
};

export type UserOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserOrderByWithAggregationInput = {
  _avg?: InputMaybe<UserAvgOrderByAggregateInput>;
  _count?: InputMaybe<UserCountOrderByAggregateInput>;
  _max?: InputMaybe<UserMaxOrderByAggregateInput>;
  _min?: InputMaybe<UserMinOrderByAggregateInput>;
  _sum?: InputMaybe<UserSumOrderByAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  groupId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
};

export type UserOrderByWithRelationInput = {
  comments?: InputMaybe<CommentOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  group?: InputMaybe<GroupOrderByWithRelationInput>;
  groupId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  posts?: InputMaybe<PostOrderByRelationAggregateInput>;
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export enum UserScalarFieldEnum {
  CreatedAt = 'createdAt',
  Email = 'email',
  GroupId = 'groupId',
  Id = 'id',
  Name = 'name',
  Password = 'password',
}

export type UserScalarWhereInput = {
  AND?: InputMaybe<Array<InputMaybe<UserScalarWhereInput>>>;
  NOT?: InputMaybe<Array<InputMaybe<UserScalarWhereInput>>>;
  OR?: InputMaybe<Array<InputMaybe<UserScalarWhereInput>>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  groupId?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringNullableFilter>;
  password?: InputMaybe<StringFilter>;
};

export type UserScalarWhereWithAggregatesInput = {
  AND?: InputMaybe<Array<InputMaybe<UserScalarWhereWithAggregatesInput>>>;
  NOT?: InputMaybe<Array<InputMaybe<UserScalarWhereWithAggregatesInput>>>;
  OR?: InputMaybe<Array<InputMaybe<UserScalarWhereWithAggregatesInput>>>;
  createdAt?: InputMaybe<DateTimeWithAggregatesFilter>;
  email?: InputMaybe<StringWithAggregatesFilter>;
  groupId?: InputMaybe<IntNullableWithAggregatesFilter>;
  id?: InputMaybe<IntWithAggregatesFilter>;
  name?: InputMaybe<StringNullableWithAggregatesFilter>;
  password?: InputMaybe<StringWithAggregatesFilter>;
};

export type UserSumAggregateOutputType = {
  __typename?: 'UserSumAggregateOutputType';
  groupId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

export type UserSumOrderByAggregateInput = {
  groupId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type UserUncheckedCreateInput = {
  comments?: InputMaybe<CommentUncheckedCreateNestedManyWithoutAuthorInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  groupId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  posts?: InputMaybe<PostUncheckedCreateNestedManyWithoutAuthorInput>;
};

export type UserUncheckedCreateNestedManyWithoutGroupInput = {
  connect?: InputMaybe<Array<InputMaybe<UserWhereUniqueInput>>>;
  connectOrCreate?: InputMaybe<Array<InputMaybe<UserCreateOrConnectWithoutGroupInput>>>;
  create?: InputMaybe<Array<InputMaybe<UserCreateWithoutGroupInput>>>;
};

export type UserUncheckedCreateWithoutCommentsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  groupId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  posts?: InputMaybe<PostUncheckedCreateNestedManyWithoutAuthorInput>;
};

export type UserUncheckedCreateWithoutGroupInput = {
  comments?: InputMaybe<CommentUncheckedCreateNestedManyWithoutAuthorInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  posts?: InputMaybe<PostUncheckedCreateNestedManyWithoutAuthorInput>;
};

export type UserUncheckedCreateWithoutPostsInput = {
  comments?: InputMaybe<CommentUncheckedCreateNestedManyWithoutAuthorInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  groupId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type UserUncheckedUpdateInput = {
  comments?: InputMaybe<CommentUncheckedUpdateManyWithoutAuthorInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  groupId?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  id?: InputMaybe<IntFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  posts?: InputMaybe<PostUncheckedUpdateManyWithoutAuthorInput>;
};

export type UserUncheckedUpdateManyInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  groupId?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  id?: InputMaybe<IntFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUncheckedUpdateManyWithoutGroupInput = {
  connect?: InputMaybe<Array<InputMaybe<UserWhereUniqueInput>>>;
  connectOrCreate?: InputMaybe<Array<InputMaybe<UserCreateOrConnectWithoutGroupInput>>>;
  create?: InputMaybe<Array<InputMaybe<UserCreateWithoutGroupInput>>>;
  delete?: InputMaybe<Array<InputMaybe<UserWhereUniqueInput>>>;
  deleteMany?: InputMaybe<Array<InputMaybe<UserScalarWhereInput>>>;
  disconnect?: InputMaybe<Array<InputMaybe<UserWhereUniqueInput>>>;
  set?: InputMaybe<Array<InputMaybe<UserWhereUniqueInput>>>;
  update?: InputMaybe<Array<InputMaybe<UserUpdateWithWhereUniqueWithoutGroupInput>>>;
  updateMany?: InputMaybe<Array<InputMaybe<UserUpdateManyWithWhereWithoutGroupInput>>>;
  upsert?: InputMaybe<Array<InputMaybe<UserUpsertWithWhereUniqueWithoutGroupInput>>>;
};

export type UserUncheckedUpdateManyWithoutUsersInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<IntFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUncheckedUpdateWithoutCommentsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  groupId?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  id?: InputMaybe<IntFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  posts?: InputMaybe<PostUncheckedUpdateManyWithoutAuthorInput>;
};

export type UserUncheckedUpdateWithoutGroupInput = {
  comments?: InputMaybe<CommentUncheckedUpdateManyWithoutAuthorInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<IntFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  posts?: InputMaybe<PostUncheckedUpdateManyWithoutAuthorInput>;
};

export type UserUncheckedUpdateWithoutPostsInput = {
  comments?: InputMaybe<CommentUncheckedUpdateManyWithoutAuthorInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  groupId?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  id?: InputMaybe<IntFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateInput = {
  comments?: InputMaybe<CommentUpdateManyWithoutAuthorInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  group?: InputMaybe<GroupUpdateOneWithoutUsersInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  posts?: InputMaybe<PostUpdateManyWithoutAuthorInput>;
};

export type UserUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateManyWithWhereWithoutGroupInput = {
  data: UserUncheckedUpdateManyWithoutUsersInput;
  where: UserScalarWhereInput;
};

export type UserUpdateManyWithoutGroupInput = {
  connect?: InputMaybe<Array<InputMaybe<UserWhereUniqueInput>>>;
  connectOrCreate?: InputMaybe<Array<InputMaybe<UserCreateOrConnectWithoutGroupInput>>>;
  create?: InputMaybe<Array<InputMaybe<UserCreateWithoutGroupInput>>>;
  delete?: InputMaybe<Array<InputMaybe<UserWhereUniqueInput>>>;
  deleteMany?: InputMaybe<Array<InputMaybe<UserScalarWhereInput>>>;
  disconnect?: InputMaybe<Array<InputMaybe<UserWhereUniqueInput>>>;
  set?: InputMaybe<Array<InputMaybe<UserWhereUniqueInput>>>;
  update?: InputMaybe<Array<InputMaybe<UserUpdateWithWhereUniqueWithoutGroupInput>>>;
  updateMany?: InputMaybe<Array<InputMaybe<UserUpdateManyWithWhereWithoutGroupInput>>>;
  upsert?: InputMaybe<Array<InputMaybe<UserUpsertWithWhereUniqueWithoutGroupInput>>>;
};

export type UserUpdateOneWithoutCommentsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCommentsInput>;
  create?: InputMaybe<UserUncheckedCreateWithoutCommentsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<UserUncheckedUpdateWithoutCommentsInput>;
  upsert?: InputMaybe<UserUpsertWithoutCommentsInput>;
};

export type UserUpdateOneWithoutPostsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutPostsInput>;
  create?: InputMaybe<UserUncheckedCreateWithoutPostsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<UserUncheckedUpdateWithoutPostsInput>;
  upsert?: InputMaybe<UserUpsertWithoutPostsInput>;
};

export type UserUpdateWithWhereUniqueWithoutGroupInput = {
  data: UserUncheckedUpdateWithoutGroupInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateWithoutCommentsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  group?: InputMaybe<GroupUpdateOneWithoutUsersInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  posts?: InputMaybe<PostUpdateManyWithoutAuthorInput>;
};

export type UserUpdateWithoutGroupInput = {
  comments?: InputMaybe<CommentUpdateManyWithoutAuthorInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  posts?: InputMaybe<PostUpdateManyWithoutAuthorInput>;
};

export type UserUpdateWithoutPostsInput = {
  comments?: InputMaybe<CommentUpdateManyWithoutAuthorInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  group?: InputMaybe<GroupUpdateOneWithoutUsersInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpsertWithWhereUniqueWithoutGroupInput = {
  create: UserUncheckedCreateWithoutGroupInput;
  update: UserUncheckedUpdateWithoutGroupInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertWithoutCommentsInput = {
  create: UserUncheckedCreateWithoutCommentsInput;
  update: UserUncheckedUpdateWithoutCommentsInput;
};

export type UserUpsertWithoutPostsInput = {
  create: UserUncheckedCreateWithoutPostsInput;
  update: UserUncheckedUpdateWithoutPostsInput;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<InputMaybe<UserWhereInput>>>;
  NOT?: InputMaybe<Array<InputMaybe<UserWhereInput>>>;
  OR?: InputMaybe<Array<InputMaybe<UserWhereInput>>>;
  comments?: InputMaybe<CommentListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  group?: InputMaybe<GroupWhereInput>;
  groupId?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringNullableFilter>;
  password?: InputMaybe<StringFilter>;
  posts?: InputMaybe<PostListRelationFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me?: { __typename?: 'User'; id: number; name?: string | undefined; email: string } | undefined;
};

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
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
