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

convertSchema(path, (schema) => {
  // your use here
});
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
import convertSchema, {
  SchemaObject,
  Model,
  Enums,
  Field,
} from '@prisma-tools/schema';
```

### Have questions?

Didn't find something here? Look through the [issues](https://github.com/AhmedElywa/prisma-tools/issues) or simply drop us a line at <ahmed.elywa@icloud.com>.

## Like my tool give me star
