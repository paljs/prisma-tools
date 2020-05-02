import { extendType, objectType, stringArg } from '@nexus/schema'
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { APP_SECRET } from '../utils'

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: 'User' })
  },
})

export const AuthQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: async (_, __, { prisma, select, userId }) => {
        if (!userId) return null
        return prisma.user.findOne({
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
      type: 'AuthPayload',
      args: {
        name: stringArg(),
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
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
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })
    t.field('login', {
      type: 'AuthPayload',
      nullable: true,
      args: {
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { email, password }, ctx) => {
        const user = await ctx.prisma.user.findOne({
          where: {
            email,
          },
        })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })
    t.field('updatePassword', {
      type: 'Boolean',
      args: {
        currentPassword: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_, { currentPassword, password }, ctx) => {
        if (currentPassword && password) {
          // get current user and verify currentPassword before changing;
          const user = await ctx.prisma.user.findOne({
            where: { id: ctx.user.id },
            select: { password: true },
          })
          if (!user) {
            return false
          }
          const validPass = await compare(currentPassword, user.password)
          if (!validPass)
            throw new Error('Incorrect Current Password, Error: 1015')
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
