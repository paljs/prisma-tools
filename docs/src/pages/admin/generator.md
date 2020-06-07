import SEO from '../../components/SEO';
import MdxCard from '../../components/MdxCard';

<SEO title="Admin Generator" />

<MdxCard>

## Introduction

We try to build Prisma db CRUD tables with ability to customize this tables with beautiful UI.

> NOTE: We have already Full stack projects [With NextJS and GatsbyJS](/admin/examples)

**Install**

```shell
yarn add @prisma-tools/admin
or
npm i @prisma-tools/admin
```

**CONTENT**

- [Settings](#settings)
  - [Generate settings schema](#generate-settings-schema)
    - [schema object type](#schema-object-type)
  - [Add graphql queries and mutation](#add-graphql-queries-and-mutation)
  - [Add Settings React Component](#add-settings-react-component)
    - [Models card](#models-card)
    - [Fields Accordions](#fields-accordions)
- [Prisma table](#prisma-table)
  - [Using with NextJS](#using-with-nextjs)
  - [Using with GatsbyJS](#using-with-gatsbyjs)
  - [Props](#props)
  - [Generate pages](#generate-pages)
  - [Add pages to menu](#add-pages-to-menu)
- [GraphQL CRUD system](#graphql-crud-system)
  - [Api](#api)

</MdxCard>

<MdxCard>

## Settings

To be able to custom your tables you need to generate `schema.json` file and use it as DB to get table settings from it.

### Generate settings schema

We have generator function convert `schema.prisma` to `schema.json` to use it as DB.
Also, will merge your schema when you add more staff to `schema.prisma` without losing your customize sittings.

create new file `scripts/generateAdmin.ts`

```ts
import { buildSettingsSchema } from '@prisma-tools/admin/dist/generateAdmin';
// you can pass string with schema folder path default `/prisma/`
buildSettingsSchema();
```

Add to `scripts` settings in `package.json` file.

```
"generate:admin": "ts-node --transpile-only scripts/generateAdmin",
```

To build or merge your schema after any change in `schema.prisma` file run this command.

```shell
yarn generate:admin
```

#### schema object type

```ts
export interface SchemaField {
  id: string;
  name: string;
  type: string;
  list: boolean;
  required: boolean;
  isId: boolean;
  unique: boolean;
  kind: 'object' | 'enum' | 'scalar';
  relationField?: boolean;
  title: string;
  read: boolean;
  create: boolean;
  update: boolean;
  filter: boolean;
  sort: boolean;
  order: number;
  editor: boolean;
}

export interface SchemaModel {
  id: string;
  name: string;
  idField: string;
  displayFields: string[];
  update: boolean;
  delete: boolean;
  create: boolean;
  fields: SchemaField[];
}

export interface Enums {
  name: string;
  fields: string[];
}

export type Schema = { models: SchemaModel[]; enums: Enums[] };
```

### Add graphql queries and mutation

To be able to update `schema.json` file with your custom setting in a beautiful UI you have to add 1 query to pull schema in frontend and 2 mutations one for an update model settings and other for update field.

In your backend nexus schema builder will add types from [@prisma-tools/nexus](/nexus/schema) package.

```ts{4,7,10}
import { makeSchema } from '@nexus/schema';
import { prismaSelectObject } from 'nexus-schema-plugin-prisma-select';
import { join } from 'path';
import { adminNexusSettings } from '@prisma-tools/nexus/dist/adminSettings';

// you can send schema.json file path as string in this function default is `/prisma/schema.json`
export const adminSettings = adminNexusSettings();

export const schema = makeSchema({
  types: [adminSettings],
  plugins: [prismaSelectObject()],
  outputs: {
    schema: join(process.cwd(), 'src', 'generated', 'schema.graphql'),
    typegen: join(process.cwd(), 'src', 'generated', 'nexus-typegen.ts'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
    contextType: 'Context.Context',
  },
});
```

### Add Settings React Component

You have `Settings` react component to change your tables settings.

> NOTE: You must add this component under [oah-ui Layout Component](https://github.com/AhmedElywa/prisma-admin/blob/master/src/Layouts/Admin/index.tsx) like we use in our examples.
> Because we use themes and components from oah-ui package to render our settings component

> NOTE: You must add this component under `ApolloProvider` component because we use `@apollo/client` to query and update settings.

Now you can add our component to any page like this.

```jsx{2,6}
import React from 'react';
import { Settings } from '@prisma-tools/admin/dist/Settings';

export default function SettingsPage() {
  // Settings component not have any props
  return <Settings />;
}
```

When you open this in your browser will get it like this image.

<img src="/settings.png" alt="settings" />

#### Models card

- **Models select menu:** to change between your schema models.
- **Database Name:** your original Model name like your schema.prisma.
- **Display Name:** Model name to display in model table page.
- **Id field:** field that have `@id` attribute in your model.
- **Display Fields** you can select one or more to display in relation tables.
- **Actions** add actions to your table create, update and delete.

#### Fields Accordions

**order** you can sort this fields in table view, update form and create form by Drag and Drop.

Every field has Accordion with this content:

- **Database Name:** your original Field name like your schema.prisma.
- **Display Name:** it will display into table page, update form and create form.
- **Actions**
  - **read** show this field in table view.
  - **create** show this field in create record form.
  - **update** show this field in update record form.
  - **filter** add filter option to this field in table if read checked.
  - **sort** add sortBy option to this field in table if read checked.
  - **editor** convert update and create input type to use quill editor or any custom editor you will add.

</MdxCard>

<MdxCard>

## Prisma table

React component to list, create, update and delete your model data.

> NOTE: You must add this component under [oah-ui Layout Component](https://github.com/AhmedElywa/prisma-admin/blob/master/src/Layouts/Admin/index.tsx) like we use in our examples.
> Because we use themes and components from oah-ui package to render our settings component

> NOTE: This component use 3 queries (findOne, findMany, findManyCount) and 3 mutations (createOne, updateOne, deleteOne) be sure to add them in your backend by our tool [@prisma-tools/nexus](/nexus/schema)

<img src="/table.png" alt="table" />

### Using with NextJS

Adding style to `_app.tsx` file.

`src/pages/_app.tsx`

```js
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';
```

`src/Components/PrismaTable.tsx`

```tsx{3,7}
import React from 'react';
import { useRouter } from 'next/router';
import { PrismaTable } from '@prisma-tools/admin';

const Table: React.FC<{ model: string }> = ({ model }) => {
  const router = useRouter();
  return <PrismaTable model={model} push={router.push} query={router.query} />;
};

export default Table;
```

### Using with GatsbyJS

`src/components/PrismaTable.tsx`

```tsx{2,14}
import React from 'react';
import { PrismaTable } from '@prisma-tools/admin';
import { navigate } from 'gatsby';
import { useLocation } from '@reach/router';
import * as queryString from 'query-string';

// Adding this to import to style editor and date picker in forms
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';

const Table: React.FC<{ model: string }> = ({ model }) => {
  const location = useLocation();
  const query = queryString.parse(location.search);
  return <PrismaTable model={model} push={navigate} query={query} />;
};

export default Table;
```

### Props

Prisma Table has many props to can custom it like you want.

To customize [`tableColumns`](https://github.com/AhmedElywa/prisma-tools/blob/master/admin/src/PrismaTable/Table/Columns.tsx) and [`formInputs`](https://github.com/AhmedElywa/prisma-tools/blob/master/admin/src/PrismaTable/Form/Inputs.tsx) components you need to look to default components and have good react skills.

```ts{3,5,7,10,13,16,19,22}
interface ModelTableProps {
  // model name like in `schema.prisma` file
  model: string;
  // push function to move between tables and change link
  push: (url: string) => void;
  // link query object used in filters `?id=1` => {id: 1}
  query: { [key: string]: any };
  // model pages path you must have all models pages in same path to can move between them.
  // default `/admin/models/`
  pagesPath?: string;
  // in table pagination you can select pageSize you can pass this options here.
  // default: [10, 20, 30, 40, 50, 100]
  pageSizeOptions?: number[];
  // moving between table pages. we not show you all available pages we just see current page and other 3 options.
  // default: 4
  paginationOptions?: number;
  // it's function return object with react table columns https://github.com/tannerlinsley/react-table
  // default here: https://github.com/AhmedElywa/prisma-tools/blob/master/admin/src/PrismaTable/Table/Columns.tsx
  tableColumns?: GetColumnsPartial;
  // it's object with form input components for every field type we use this package https://react-hook-form.com/
  // default here: https://github.com/AhmedElywa/prisma-tools/blob/master/admin/src/PrismaTable/Form/Inputs.tsx
  formInputs?: Partial<FormInputs>;
}

type FormInputs = Record<'Default' | 'Editor' | 'Enum' | 'Object' | 'Date' | 'Boolean', React.FC<InputProps>>;

interface InputProps {
  field: SchemaField;
  value: any;
  error: any;
  // import { FormContextValues } from 'react-hook-form';
  register: FormContextValues['register'];
  setValue: FormContextValues['setValue'];
  disabled: boolean;
}

// import {Column,UseFiltersColumnOptions,UseSortByColumnOptions} from 'react-table';
type Columns = Record<
  'boolean' | 'number' | 'enum' | 'DateTime' | 'object' | 'string' | 'list',
  Column & UseFiltersColumnOptions<any> & UseSortByColumnOptions<any>
>;

export type GetColumnsPartial = (field: SchemaField, model?: SchemaModel) => Partial<Columns>;
```

### Generate pages

Now we need to generate a page for every model with our prisma table here `src/components/PrismaTable.tsx`.

update `scripts/generateAdmin.ts` file.

```ts{6}
import { buildSettingsSchema, generatePages } from '@prisma-tools/admin/dist/generateAdmin';

buildSettingsSchema();

// adding after build schema function
generatePages();
```

**generatePages** accept an object with custom settings.

- **outPut** path for output pages. where you need to generate this pages. default `src/pages/admin/models/`.
- **schema** if your `schema.json` file not in `/prisma/` folder you need to import this object and add here.

```ts{2,5}
import { Schema } from '@prisma-tools/admin';
import defaultSchema from '../server/prisma/schema.json';

generatePages({
  schema: defaultSchema as Schema,
});
```

- **pageContent** it's your generated page content as string. default:

```
import React from 'react';
import PrismaTable from 'Components/PrismaTable';

const #{id}: React.FC = () => {
  return <PrismaTable model="#{id}" />;
};

export default #{id};
```

will replace `#{id}` to model name.

You can now generate pages by this command:

```shell
yarn generate:admin
```

### Add pages to menu

In my examples I use `Menu` component from `oah-ui` package.

Menu component accept array of items we will add our pages to this array.

In our examples you will find this file in this path `src/Layouts/Admin/menuItem.ts`

```ts
import { MenuItemType } from 'oah-ui';

const items: MenuItemType[] = [
  { title: 'Home Page', icon: { name: 'home' }, link: { href: '/admin' } },
  {
    title: 'Models',
    icon: { name: 'layers-outline' },
    children: [
      { title: 'Users', link: { href: '/admin/models/User' } },
      {
        title: 'Posts',
        link: { href: '/admin/models/Post' },
      },
    ],
  },
];
export default items;
```

</MdxCard>

<MdxCard>

## GraphQL CRUD system

Ok now I have tables to manage my db what if I need to add more logic functions and need to build query body.

like this

```graphql
query findManyUser(
  $where: UserWhereInput
  $orderBy: UserOrderByInput
  $cursor: UserWhereUniqueInput
  $skip: Int
  $take: Int
) {
  findManyUser(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
    ...User
  }
}
```

> NOTE: I create query string in `.graphql` files because I use [`graphql-codegen`](https://graphql-code-generator.com/docs/plugins/typescript-react-apollo) CLI to auto generate `@apollo/client` react hook.

Now you need to add one more function to generator file.

update `scripts/generateAdmin.ts` file.

```ts{7}
import { buildSettingsSchema, generatePages, generateGraphql } from '@prisma-tools/admin/dist/generateAdmin';

buildSettingsSchema();

generatePages();

generateGraphql();
```

after adding `generateGraphql` function run this command:

```shell
yarn generate:admin
```

**User model result**

```graphql
fragment UserFields on User {
  id
  email
  name
  password
  createdAt
  groupId
}

fragment User on User {
  ...UserFields
  group {
    ...GroupFields
  }
}

query findOneUser($where: UserWhereUniqueInput!) {
  findOneUser(where: $where) {
    ...User
  }
}

query findManyUser(
  $where: UserWhereInput
  $orderBy: UserOrderByInput
  $cursor: UserWhereUniqueInput
  $skip: Int
  $take: Int
) {
  findManyUser(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
    ...User
  }
}

query findManyUserCount(
  $where: UserWhereInput
  $orderBy: UserOrderByInput
  $cursor: UserWhereUniqueInput
  $skip: Int
  $take: Int
) {
  findManyUserCount(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take)
}

mutation createOneUser($data: UserCreateInput!) {
  createOneUser(data: $data) {
    ...User
  }
}

mutation updateOneUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
  updateOneUser(where: $where, data: $data) {
    ...User
  }
}

mutation deleteOneUser($where: UserWhereUniqueInput!) {
  deleteOneUser(where: $where) {
    id
  }
}

mutation deleteManyUser($where: UserWhereInput) {
  deleteManyUser(where: $where) {
    count
  }
}

mutation updateManyUser($where: UserWhereInput, $data: UserUpdateManyMutationInput!) {
  updateManyUser(where: $where, data: $data) {
    count
  }
}
```

### Api

**generateGraphql** accept an object with custom settings.

```typescript
interface Options {
  // schema object imported from `schema.json` file if this file not in default path `/prisma/schema.json`
  schema?: Schema;
  // .graphql files output for queries and mutations default './src/graphql'
  graphqlOutput: string;
  // exclude fields from all models
  fieldsExclude: string[];
  // exclude fields from one or more models will merge it with general fieldsExclude
  excludeFieldsByModel: { [modelName: string]: string[] };
  // exclude all model file by adding his name as string.
  // exclude queries or mutations for one or more models by add object.
  modelsExclude: (string | { name: string; queries?: boolean; mutations?: boolean })[];
  // disable all queries for all models
  disableQueries?: boolean;
  // disable all mutations for all models
  disableMutations?: boolean;
  // exclude queries and mutations by his name for one or more model it's object with key : model name value array of QueriesAndMutations type
  excludeQueriesAndMutationsByModel: {
    [modelName: string]: QueriesAndMutations[];
  };
  // exclude queries and mutations by his name for all models array of QueriesAndMutations type
  excludeQueriesAndMutations: QueriesAndMutations[];
}

type QueriesAndMutations =
  | 'findOne'
  | 'findMany'
  | 'findCount'
  | 'createOne'
  | 'updateOne'
  | 'deleteOne'
  | 'updateMany'
  | 'deleteMany';
```

**Example**

```ts
generateGraphql({
  // will exclude updatedAt and createdAt fields from all models fragment
  graphqlOutput: ['updatedAt', 'createdAt'],
  // will exclude password from user fragment
  excludeFieldsByModel: {
    User: ['password'],
  },
  // will exclude all Admin model file.
  // will exclude all mutations for Post model
  modelsExclude: ['Admin', { name: 'Post', mutations: true }],
  // will exclude updateMany and deleteMany from all models
  excludeQueriesAndMutations: ['updateMany', 'deleteMany'],
});
```

</MdxCard>
