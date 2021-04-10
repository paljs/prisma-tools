import { extendType, nonNull, stringArg } from 'nexus'
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { JWT_SECRET } from '../utils'
import cookie from 'cookie'
import { UserInputError } from 'apollo-server-micro'

export const AuthQueries = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('me', {
      type: 'User',
      resolve: async (_, __, { prisma, select, userId }) => {
        if (!userId) return null
        return prisma.user.findUnique({
          where: {
            id: userId,
          },
          ...select,
        })
      },
    })
  },
})

export const AuthMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'User',
      args: {
        name: stringArg(),
        email: nonNull('String'),
        password: nonNull('String'),
      },
      resolve: async (_parent, { name, email, password }, ctx) => {
        const hashedPassword = await hash(password, 10)
        const user = await ctx.prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        })
        ctx.res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', sign({ userId: user.id }, JWT_SECRET), {
            httpOnly: true,
            maxAge: 6 * 60 * 60,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
          }),
        )
        return user
      },
    })
    t.nullable.field('login', {
      type: 'User',
      args: {
        email: nonNull('String'),
        password: nonNull('String'),
      },
      resolve: async (_parent, { email, password }, ctx) => {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email,
          },
        })
        if (!user) {
          throw new UserInputError(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new UserInputError('Invalid password')
        }
        ctx.res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', sign({ userId: user.id }, JWT_SECRET), {
            httpOnly: true,
            maxAge: 6 * 60 * 60,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
          }),
        )
        return user
      },
    })
    t.field('logout', {
      type: 'Boolean',
      resolve(_parent, _args, ctx) {
        ctx.res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', '', {
            httpOnly: true,
            maxAge: -1,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
          }),
        )
        return true
      },
    })
    t.field('updatePassword', {
      type: 'Boolean',
      args: {
        currentPassword: nonNull('String'),
        password: nonNull('String'),
      },
      resolve: async (_, { currentPassword, password }, ctx) => {
        if (currentPassword && password) {
          // get current user and verify currentPassword before changing;
          const user = await ctx.prisma.user.findUnique({
            where: { id: ctx.userId },
            select: { password: true },
          })
          if (!user) {
            return false
          }
          const validPass = await compare(currentPassword, user.password)
          if (!validPass) throw new UserInputError('Incorrect Current Password, Error: 1015')
          const hashPassword = await hash(password, 10)

          await ctx.prisma.user.update({
            data: { password: hashPassword },
            where: { id: ctx.userId },
          })
          return true
        }
        return false
      },
    })
  },
})
