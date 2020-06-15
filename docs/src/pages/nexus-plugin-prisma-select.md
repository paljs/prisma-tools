import SEO from '../components/SEO';
import MdxCard from '../components/MdxCard';
import SelectExample from '../components/SelectExample';

<SEO title="nexus-plugin-prisma-select" />

<MdxCard>

# nexus-plugin-prisma-select

- [Installation](#installation)
- [Example Usage](#example-usage)
  - [Use](#use)
  - [Example query](#example-query)

## Installation

```shell
npm install nexus-plugin-prisma-select
```

## Example Usage

It's a small tool to convert `info: GraphQLResolveInfo` to select object accepted by `prisma client` this will give you the best performance because you will just query exactly what you want

`server.ts`

```ts
import { use } from 'nexus';
import { prismaSelect } from 'nexus-plugin-prisma-select';

use(prismaSelect());
```

This plugin is take `info` and convert it to Prisma select object and add to resolve context

### Use

```ts
import { schema } from 'nexus';

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('findOneUser', {
      type: 'User',
      nullable: true,
      args: {
        where: schema.arg({
          type: 'UserWhereUniqueInput',
          nullable: false,
        }),
      },
      resolve(_, { where }, { prisma, select }) {
        return prisma.user.findOne({
          where,
          ...select,
        });
      },
    });
  },
});
```

</MdxCard>

<SelectExample/>
