import gql from 'graphql-tag';

export default gql`
  type User {
    id: Int!
    email: String!
    name: String
    posts(
      where: PostWhereInput
      orderBy: PostOrderByInput
      cursor: PostWhereUniqueInput
      take: Int
      skip: Int
    ): [Post!]!
    group: Group
    groupId: Int
    comments(
      where: CommentWhereInput
      orderBy: CommentOrderByInput
      cursor: CommentWhereUniqueInput
      take: Int
      skip: Int
    ): [Comment!]!
  }

  type Query {
    findOneUser(where: UserWhereUniqueInput!): User
    findManyUser(
      where: UserWhereInput
      orderBy: UserOrderByInput
      cursor: UserWhereUniqueInput
      skip: Int
      take: Int
    ): [User!]
    findManyUserCount(
      where: UserWhereInput
      orderBy: UserOrderByInput
      cursor: UserWhereUniqueInput
      skip: Int
      take: Int
    ): Int!
  }
  type Mutation {
    createOneUser(data: UserCreateInput!): User!
    updateOneUser(where: UserWhereUniqueInput!, data: UserUpdateInput!): User!
    deleteOneUser(where: UserWhereUniqueInput!): User
    upsertOneUser(
      where: UserWhereUniqueInput!
      create: UserCreateInput!
      update: UserUpdateInput!
    ): User
    deleteManyUser(where: UserWhereInput): BatchPayload
    updateManyUser(
      where: UserWhereInput
      data: UserUpdateManyMutationInput
    ): BatchPayload
  }
`;
