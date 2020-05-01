import { extendType, stringArg } from '@nexus/schema'
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { code } from '../context'

export const AuthQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: async (_, __, { prisma, select, user }) => {
        return prisma.user.findOne({
          where: {
            id: user.id,
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
    t.field('login', {
      type: 'Boolean',
      nullable: true,
      args: {
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_, { email, password }, ctx) => {
        const user = await ctx.prisma.user.findOne({
          where: {
            email,
          },
          select: {
            id: true,
            password: true,
          },
        })

        if (!user) {
          throw new Error('Incorrect Username/Password')
        }
        const valid = await compare(password, user.password)
        if (!valid) {
          throw new Error('Incorrect Username/Password')
        }

        const token = sign({ id: user.id, email }, code, {
          expiresIn: '1y',
        })
        ctx.res.cookie('token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365,
        })
        return true
      },
    })
    t.field('logout', {
      type: 'Boolean',
      resolve: async (_, __, ctx) => {
        ctx.res.clearCookie('token')
        return true
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
            where: { id: ctx.user.id },
          })
          return true
        }
        return false
      },
    })
  },
})
