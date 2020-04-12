### nexus-schema-prisma

Create nexus types and CURD system from prisma

**Every model in schema will have 3 files**

- `type.ts` contain `objectType` for this model

- `queries.ts` contain 3 queries `'findOne' | 'findMany' | 'findCount'`

- `mutations.ts` contain 5 mutations `'createOne' | 'updateOne' | 'deleteOne' | 'updateMany' | 'deleteMany'`

  

**Example**

```prisma
datasource postgresql {
  url      = env("DATABASE_URL")
  provider = "postgresql"
}
generator client {
  provider = "prisma-client-js"
}
model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
}
model Post {
  id         Int        @id @default(autoincrement())
  createdAt  DateTime   @default(now())
  updatedAt  DateTime   @updatedAt
  published  Boolean    @default(false)
  title      String
  author     User?      @relation(fields:  [authorId], references: [id])
  authorId   Int?
}
enum Role {
  USER
  ADMIN
}
```



