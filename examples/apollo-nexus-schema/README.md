## GraphQL Apollo Server with Authentication & CURD system

This example shows how to implement a **GraphQL server with TypeScript** based on [Prisma Client](https://github.com/prisma/prisma2/blob/master/docs/prisma-client-js/api.md), [apollo-server](https://www.apollographql.com/docs/apollo-server/),  [GraphQL Nexus](https://nexus.js.org/) and [nexus-schema-prisma to create CURD system](https://github.com/AhmedElywa/nexus-schema-prisma). It is based on a SQLite database, you can find the database file with some dummy data at [`./prisma/dev.db`](https://github.com/prisma/prisma-examples/blob/master/typescript/graphql-apollo-server/prisma/dev.db).

## How to use

### 1. Download example & install dependencies

Clone this repository:

```pash
git clone https://github.com/AhmedElywa/prisma-apollo.git
```

Install npm dependencies:

```
yarn install
or
npm install
```

Note that this also generates Prisma Client JS into `node_modules/@prisma/client` and create your CURD system into `src/types/`  via a `postinstall` hook of the `@prisma/client` package from your `package.json`.

### 2. Start the GraphQL server

Launch your GraphQL server with this command:

```
yarn dev
or
npm run dev
```

Navigate to [http://localhost:4000](http://localhost:4000/) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).

## Using the GraphQL API

The schema that specifies the API operations of your GraphQL server is defined in [`src/generated/schema.graphql`](https://github.com/AhmedElywa/prisma-apollo/blob/master/src/generated/schema.graphql). Below are a number of operations that you can send to the API using the GraphQL Playground.

Feel free to adjust any operation by adding or removing fields. The GraphQL Playground helps you with its auto-completion and query validation features.

### Retrieve all users and their posts

```graphql
{
  findManyUser{
    id
    email
    name
    posts{
      id
      title
      published
      comments{
        id
        contain
      }
    }
  }
}
```

