## GraphQL nexus Server CURD system

This example shows how to implement a **GraphQL server with TypeScript** based on [Prisma Client](https://www.prisma.io/docs/), [GraphQL Nexus](https://www.nexusjs.org/) and [@prisma-tools/nexus](../../packages/nexus) to create CURD system. It is based on a SQLite database, you can find the database file with some dummy data at [`./prisma/dev.db`](./prisma/dev.db).

## How to use

## Download nexus starter project

This guide uses a small starter project that has Prisma configured against a SQLite database file.

Open your terminal and download the starter project with the following command:

### Unix (Mac OS, Linux)

```shell script
curl https://codeload.github.com/AhmedElywa/prisma-tools/tar.gz/master | tar -xz --strip=2 prisma-tools-master/examples/nexus
```

### Windows

```shell script
curl https://codeload.github.com/AhmedElywa/prisma-tools/tar.gz/master -o master.tar.gz && tar -zxvf master.tar.gz prisma-tools-master/examples/nexus && move prisma-tools-master/examples/nexus nexus && rmdir /S /Q prisma-tools-master && del /Q master.tar.gz
```

## Install dependencies

The project has downloaded to directory called nexus

### npm

Run this three commands

```shell script
cd nexus
npm i
npm run dev
```

### yarn

Run this three commands

```shell script
cd nexus
yarn
yarn dev
```

Navigate to [http://localhost:4000](http://localhost:4000/) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).

## Using the GraphQL API

The schema that specifies the API operations of your GraphQL server has defined in [`src/generated/schema.graphql`](./src/generated/schema.graphql). Below are a number of operations that you can send to the API using the GraphQL Playground.

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
