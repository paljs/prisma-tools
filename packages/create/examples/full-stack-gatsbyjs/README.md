## DB

We added `sqlite` as db provider in `schema.prisma` you can change it to your custom db provider

after an update your `schema.prisma` run

```shell
> cd packages/server
> yarn create-migration
> yarn migrate-database
```

- create new migration
- push this migration to your db
- build prisma client

now run

```shell
> cd ../../
> pal g
> yarn generate
> yarn dev
```

- back to root
- build crud system
- build client graphql hooks
- start dev server

frontend in http://localhost:8000/
backend api http://localhost:4000/

`Good work`
