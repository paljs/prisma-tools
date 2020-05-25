import SEO from '../components/SEO';
import MdxCard from '../components/MdxCard';
import { CardBody } from 'oah-ui';

<SEO title="Convert schema" />
<MdxCard>
<CardBody>

## Prisma schema

It's tool to convert your `schema.prisma` file into `JavaScript` object.

## Install

```shell
npm i @prisma-tools/schema
or
yarn add @prisma-tools/schema
```

## Use

```ts
import convertSchema from '@prisma-tools/schema';

const schemaObject = convertSchema(path);
```

## schema Type

```ts
type SchemaObject = {
  models: Model[];
  enums: Enums[];
};

interface Model {
  name: string;
  fields: Field[];
}

interface Enums {
  name: string;
  fields: string[];
}

interface Field {
  name: string;
  type: string;
  list: boolean;
  required: boolean;
  isId: boolean;
  unique: boolean;
  kind: 'object' | 'enum' | 'scalar';
  relationField?: boolean;
  relation?: { name?: string; fields?: string[]; references?: [] };
}
```

You can import this types from our tool

```ts
import convertSchema, { SchemaObject, Model, Enums, Field } from '@prisma-tools/schema';
```

</CardBody>
</MdxCard>
