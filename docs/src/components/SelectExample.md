import MdxCard from './MdxCard';

<MdxCard>

### Example query

```graphql
query {
  findOneUser(where: { id: 1 }) {
    id
    email
    name
    posts(where: { title: { contains: "a" } }, orderBy: { createdAt: asc }, first: 10, skip: 5) {
      id
      title
      comments(where: { contain: { contains: "a" } }) {
        id
        contain
      }
    }
  }
}
```

convert to

```ts
const result = {
  select: {
    id: true,
    email: true,
    name: true,
    posts: {
      select: {
        id: true,
        title: true,
        comments: {
          select: { id: true, contain: true },
          where: { contain: { contains: 'a' } },
        },
      },
      where: { title: { contains: 'a' } },
      orderBy: { createdAt: 'asc' },
      first: 10,
      skip: 5,
    },
  },
};
```

</MdxCard>
