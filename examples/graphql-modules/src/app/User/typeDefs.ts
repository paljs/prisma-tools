import gql from "graphql-tag";

export default gql`
  type User {
    id: Int!
    createdAt: DateTime!
    email: String!
    name: String
    password: String!
    group: Group
    groupId: Int
  }

  extend type Group {
    users(
      where: UserWhereInput
      orderBy: UserOrderByInput
      skip: Int
      after: UserWhereUniqueInput
      before: UserWhereUniqueInput
      first: Int
      last: Int
    ): [User!]!
  }

  type Query {
    findOneUser(where: UserWhereUniqueInput!): User
    findManyUser(
      where: UserWhereInput
      orderBy: UserOrderByInput
      after: UserWhereUniqueInput
      before: UserWhereUniqueInput
      skip: Int
      first: Int
      last: Int
    ): [User!]
    findManyUserCount(
      where: UserWhereInput
      orderBy: UserOrderByInput
      after: UserWhereUniqueInput
      before: UserWhereUniqueInput
      skip: Int
      first: Int
      last: Int
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
