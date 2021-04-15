## DB

We added `sqlite` as db provider in `schema.prisma` you can change it to your custom db provider

after an update your `schema.prisma` run

```shell
> yarn db-dev
```

this command will save your schema into db

now run

```shell
> yarn generate
> yarn dev
```

- build prisma client
- build crud system
- build client graphql hooks
- start dev server

`Good work`
