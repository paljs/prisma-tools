import { CamelCase } from '../src';
import { join } from 'path';

test('convert prisma schema from lower case to camel case', async () => {
  const generate = new CamelCase(join(__dirname, './schemas/lowerCaseSchema.prisma')).convert(true);
  expect(await generate).toMatchInlineSnapshot(`
    "datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }

    generator client {
      provider = "prisma-client-js"
    }

    model User {
      id          Int      @id @default(autoincrement())
      createdAt   DateTime @default(now()) @map("created_at")
      email       String   @unique
      name        String?
      password    String
      permissions Json     @default("{}")
      posts       Post[]
    }

    model Post {
      id               Int           @id @default(autoincrement())
      published        Boolean       @default(false)
      title            String
      author           User?         @relation(fields: [authorId], references: [id])
      authorId         Int?          @map("author_id")
      postComments     PostComment[]
      currentLoanValue Decimal       @map("current_loan_value")
      currentLoan      Boolean       @map("current_loan")
      createdAt        DateTime      @default(now()) @map("created_at")
      updatedAt        DateTime      @updatedAt @map("updated_at")

      @@map("post")
    }

    model PostComment {
      id     Int  @id @default(autoincrement())
      postId Int  @map("post_id")
      post   Post @relation(fields: [postId], references: [id])

      @@map("post_comment")
    }

    enum Role {
      ADMIN
      USER
    }
    "
  `);
});
