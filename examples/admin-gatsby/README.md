### Admin pages for Prisma project

Admin pages for prisma project db with [`@prisma-tools/admin`](https://github.com/AhmedElywa/prisma-tools/tree/master/packages/admin) tool to generate pages and apollo (queries and mutations) hooks and `schema.json` to custom your models

### Online demo

[http://prisma-admin.ahmedelywa.com/](http://prisma-admin.ahmedelywa.com/)

For online version you need to signup new account then login

## How to use

### 1. Download example & install dependencies

### Unix (Mac OS, Linux)

```shell script
curl https://codeload.github.com/AhmedElywa/prisma-tools/tar.gz/master | tar -xz --strip=2 prisma-tools-master/examples/admin-gatsby
```

### Windows

```shell script
curl https://codeload.github.com/AhmedElywa/prisma-tools/tar.gz/master -o master.tar.gz && tar -zxvf master.tar.gz prisma-tools-master/examples/admin-gatsby && move prisma-tools-master/examples/admin-gatsby admin-gatsby && rmdir /S /Q prisma-tools-master && del /Q master.tar.gz
```

Install npm dependencies:

```shell script
yarn
```

Start service

```shell script
yarn dev
```

After change your `schema.prisma`

```shell script
yarn generate
yarn dev
```

Navigate to [http://localhost:8000](http://localhost:8000/) in your browser to explore admin pages

This admin ui template built on [oah-ui](https://oah-ui.oahtech.io/getting-started)

### Have questions?

Didn't find something here? Look through the [issues](https://github.com/AhmedElywa/prisma-tools/issues) or simply drop us a line at <ahmed.elywa@icloud.com>.

## Like my tool give me star
