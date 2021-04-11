
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 2.20.1
 * Query Engine version: 60ba6551f29b17d7d6ce479e5733c70d9c00860e
 */
Prisma.prismaVersion = {
  client: "2.20.1",
  engine: "60ba6551f29b17d7d6ce479e5733c70d9c00860e"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */

Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.UserScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  email: 'email',
  name: 'name',
  password: 'password',
  groupId: 'groupId'
});

exports.Prisma.PostScalarFieldEnum = makeEnum({
  id: 'id',
  published: 'published',
  title: 'title',
  authorId: 'authorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.CommentScalarFieldEnum = makeEnum({
  id: 'id',
  contain: 'contain',
  postId: 'postId',
  authorId: 'authorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.GroupScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.ListScalarFieldEnum = makeEnum({
  id: 'id',
  intger: 'intger',
  flout: 'flout',
  string: 'string',
  enums: 'enums',
  boolean: 'boolean'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});
exports.Rols = makeEnum({
  USER: 'USER',
  ADMIN: 'ADMIN'
});

exports.Prisma.ModelName = makeEnum({
  User: 'User',
  Post: 'Post',
  Comment: 'Comment',
  Group: 'Group',
  List: 'List'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
