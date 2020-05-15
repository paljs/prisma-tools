## Prisma Tools

**This tools built on [Prisma](https://prisma.io) and `GraphQL` Auto generate nexus types and CURD system from Prisma Client**

> NOTE: You must be familiar with `Prisma` and `nexus` before using this tools.

### Tools

- [**@prisma-tools/nexus**](./packages/nexus) Auto generate CRUD system from prisma using nexus framework.
- [**@prisma-tools/graphql-modules**](./packages/graphql-modules) Auto generate CRUD system from prisma using graphql-modules framework.
- [**@prisma-tools/sdl**](./packages/sdl) Auto generate CRUD system from prisma for graphql sdl first servers.
- [**@prisma-tools/select**](./packages/select) convert `info: GraphQLResolveInfo` to be available prisma select object.
- [**@prisma-tools/delete**](./packages/delete) Prisma Migrate cli not supported Cascading deletes so this tool is workaround this option.
- [**@prisma-tools/schema**](./packages/schema) convert your `schema.prisma` file into `JavaScript` object.
- [**@prisma-tools/admin**](./packages/admin) Auto generate pages, Queries and mutations in our Admin project [prisma-admin](./examples/admin-gatsby)

### Examples

- [**nexus framework**](./examples/nexus) Using nexus framework to build graphql server and `@prisma-tools/nexus` to create CRUD system
- [**apollo with nexus schema**](./examples/apollo-nexus-schema) Using Apollo as graphql server, @nexus/schema for build graphql schema and `@prisma-tools/nexus` to create CRUD system
- [**apollo with graphql modules**](./examples/graphql-modules) Using Apollo as graphql server, graphql-modules for build graphql schema and `@prisma-tools/graphql-modules` to create CRUD system
- [**apollo with sdl first**](./examples/apollo-sdl-first) Using Apollo as graphql server with sdl first for build graphql and `@prisma-tools/sdl` to create CRUD system
- [**Prisma Admin**](./examples/admin-gatsby) Build project with typescript nexus framework backend gatsbyJs
- [**Online demo has all tools** ](http://prisma-admin.ahmedelywa.com/) You need to SignUp first then login

### Have questions?

Didn't find something here? Look through the [issues](https://github.com/AhmedElywa/prisma-tools/issues) or simply drop us a line at <ahmed.elywa@icloud.com>.

## Like my tools give me star
