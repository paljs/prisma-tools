import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function seedData() {
  await prisma.connect()
  await prisma.user.create({
    data: {
      name: 'Ahmed',
      email: 'ahmed.elywa1@icloud.com',
      password: await hash('password', 10),
      posts: {
        create: [
          {
            title: 'Create your CURD system easy way',
            published: true,
            comments: {
              create: {
                contain: "it's fast way to make this",
              },
            },
          },
          {
            title: 'start your project with prisma',
            published: true,
            comments: {
              create: {
                contain: "it's fast way to make this",
              },
            },
          },
          {
            title: 'use nexus to create your graphql schema',
            published: true,
            comments: {
              create: {
                contain: "it's fast way to make this",
              },
            },
          },
        ],
      },
    },
  })
  await prisma.disconnect()
}

seedData()
