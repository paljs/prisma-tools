## GraphQL apollo Server with graphql-modules and CURD system

This example shows how to implement a **GraphQL server with TypeScript** based on [Prisma Client](https://www.prisma.io/docs/) and [@prisma-tools/graphql-modules to create CURD system](../../packages/graphql-modules). It is based on a SQLite database, you can find the database file with some dummy data at [`./prisma/dev.db`](./prisma/dev.db).

## How to use

## Download graphql-modules starter project

This guide uses a small starter project that has Prisma configured against a SQLite database file.

Open your terminal and download the starter project with the following command:

### Unix (Mac OS, Linux)

```shell script
curl https://codeload.github.com/AhmedElywa/prisma-tools/tar.gz/master | tar -xz --strip=2 prisma-tools-master/examples/graphql-modules
```

### Windows

```shell script
curl https://codeload.github.com/AhmedElywa/prisma-tools/tar.gz/master -o master.tar.gz && tar -zxvf master.tar.gz prisma-tools-master/examples/graphql-modules && move prisma-tools-master/examples/graphql-modules graphql-modules && rmdir /S /Q prisma-tools-master && del /Q master.tar.gz
```

## Install dependencies

The project has downloaded to directory called graphql-modules

### npm

Run this three commands

```shell script
cd graphql-modules
npm i
npm run dev
```

### yarn

Run this three commands

```shell script
cd graphql-modules
yarn
yarn dev
```

Navigate to [http://localhost:4000](http://localhost:4000/) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).

## Using the GraphQL API

Below are a number of operations that you can send to the API using the GraphQL Playground.

Feel free to adjust any operation by adding or removing fields. The GraphQL Playground helps you with its auto-completion and query validation features.

### Retrieve all users and their posts

```graphql
{
  findManyUser {
    id
    email
    name
    posts {
      id
      title
      published
      comments {
        id
        contain
      }
    }
  }
}
```

### Have questions?

Didn't find something here? Look through the [issues](https://github.com/AhmedElywa/prisma-tools/issues) or simply drop us a line at <ahmed.elywa@icloud.com>.

**_Like my tool give me star_**
