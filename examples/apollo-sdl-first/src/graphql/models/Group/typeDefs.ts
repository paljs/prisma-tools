import gql from 'graphql-tag';

export default gql`
  type Group {
    id: Int!
    name: String!
    users(
      where: UserWhereInput
      orderBy: UserOrderByInput
      cursor: UserWhereUniqueInput
      take: Int
      skip: Int
    ): [User!]!
  }

  type Query {
    findOneGroup(where: GroupWhereUniqueInput!): Group
    findManyGroup(
      where: GroupWhereInput
      orderBy: GroupOrderByInput
      cursor: GroupWhereUniqueInput
      skip: Int
      take: Int
    ): [Group!]
    findManyGroupCount(
      where: GroupWhereInput
      orderBy: GroupOrderByInput
      cursor: GroupWhereUniqueInput
      skip: Int
      take: Int
    ): Int!
  }
`;
