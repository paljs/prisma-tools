import gql from 'graphql-tag';
import { PrismaSelect } from '../../src';
import { parseResolveInfo } from 'graphql-parse-resolve-info';
import { getDMMFBySchemaPath } from '@paljs/utils';
import { join } from 'path';
import { ApolloServer } from 'apollo-server';
import { Generators } from '@paljs/generator/src/Generators';

const typeDefs = gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String!
    fullName: String
    email: String!
    password: String!
    posts(
      where: PostWhereInput
      orderBy: PostOrderByWithRelationInput
      cursor: PostWhereUniqueInput
      take: Int
      skip: Int
      distinct: PostScalarFieldEnum
    ): [Post!]!
    _count: UserCountOutputType!
  }

  type Post {
    id: Int!
    published: Boolean!
    title: String!
    author: User
    authorId: Int
    comments(
      where: CommentWhereInput
      orderBy: CommentOrderByWithRelationInput
      cursor: CommentWhereUniqueInput
      take: Int
      skip: Int
      distinct: CommentScalarFieldEnum
    ): [Comment!]!
    _count: PostCountOutputType!
  }

  type Comment {
    id: Int!
    contain: String!
    post: Post!
    postId: Int!
  }

  type Account {
    id: Int!
    firstName: String!
    lastName: String!
    newFieldNotInSchema: String
  }

  type Query {
    user(where: UserWhereUniqueInput): User
    account: Account
    aggregateUser: AggregateUser
    getNestedValue(value: String!, type: String!): User
    userWithDefaultValues: User
  }
`;

const resolvers = {
  Query: {
    user: (_, __, ctx, info) => {
      const parsedResolveInfoFragment = parseResolveInfo(info);
      const select = new PrismaSelect(info, { dmmf: [ctx.dmmf] }).value;
      ctx.log({ parsedResolveInfoFragment, select });
      return null;
    },
    getNestedValue: (_, { value, type }, ctx, info) => {
      const select = new PrismaSelect(info, { dmmf: [ctx.dmmf] }).valueOf(value, type);
      ctx.log({ select });
      return null;
    },
    account: (_, __, ctx, info) => {
      const select = new PrismaSelect(info, { dmmf: [ctx.dmmf] }).value;
      ctx.log({ select });
      return null;
    },
    aggregateUser: (_, __, ctx, info) => {
      const select = new PrismaSelect(info, { dmmf: [ctx.dmmf] }).value;
      ctx.log({ select });
      return null;
    },
    userWithDefaultValues: (_, __, ctx, info) => {
      const select = new PrismaSelect(info, {
        dmmf: [ctx.dmmf],
        defaultFields: { User: { firstName: true, lastName: true } },
      }).value;
      ctx.log({ select });
      return null;
    },
  },
};

export const server = async (log: (object: any) => void) => {
  const schemaPath = join(__dirname, '../schemas/prismaSelect.prisma');
  const dmmf = await getDMMFBySchemaPath(schemaPath);
  const generator = new Generators(schemaPath);
  const inputs = gql`
    ${await generator.generateSDLInputsString()}
  `;
  return new ApolloServer({
    typeDefs: [typeDefs, inputs],
    resolvers,
    context: {
      dmmf,
      log,
    },
  });
};
