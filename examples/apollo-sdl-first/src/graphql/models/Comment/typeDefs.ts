import gql from 'graphql-tag';

export default gql`
  type Comment {
    id: Int!
    contain: String!
    post: Post!
    postId: Int!
    author: User
    authorId: Int
  }

  type Query {
    findOneComment(where: CommentWhereUniqueInput!): Comment
    findManyComment(
      where: CommentWhereInput
      orderBy: CommentOrderByInput
      cursor: CommentWhereUniqueInput
      skip: Int
      take: Int
    ): [Comment!]
    findManyCommentCount(
      where: CommentWhereInput
      orderBy: CommentOrderByInput
      cursor: CommentWhereUniqueInput
      skip: Int
      take: Int
    ): Int!
  }
  type Mutation {
    createOneComment(data: CommentCreateInput!): Comment!
    updateOneComment(
      where: CommentWhereUniqueInput!
      data: CommentUpdateInput!
    ): Comment!
    deleteOneComment(where: CommentWhereUniqueInput!): Comment
    upsertOneComment(
      where: CommentWhereUniqueInput!
      create: CommentCreateInput!
      update: CommentUpdateInput!
    ): Comment
    deleteManyComment(where: CommentWhereInput): BatchPayload
    updateManyComment(
      where: CommentWhereInput
      data: CommentUpdateManyMutationInput
    ): BatchPayload
  }
`;
