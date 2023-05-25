# @paljs/utils

## 5.3.1

### Patch Changes

- update prisma version to v4.14.1
- Updated dependencies
  - @paljs/types@5.3.1
  - @paljs/display@5.3.1

## 5.3.0

### Minor Changes

- Update packages, update prisma to version 4.11, update apollo server to version 4

### Patch Changes

- Updated dependencies
  - @paljs/display@5.3.0
  - @paljs/types@5.3.0

## 5.2.0

### Minor Changes

- upgrade prisma version

### Patch Changes

- Updated dependencies
  - @paljs/types@5.2.0
  - @paljs/display@5.2.0

## 5.1.0

### Minor Changes

- [nexus] use absolute path in reading the admin schema

### Patch Changes

- Updated dependencies
  - @paljs/display@5.1.0
  - @paljs/types@5.1.0

## 5.0.3

### Patch Changes

- [PrismaSelect] remove the main args from the object
- Updated dependencies
  - @paljs/display@5.0.3
  - @paljs/types@5.0.3

## 5.0.2

### Patch Changes

- fix prisma select plugin
- Updated dependencies
  - @paljs/display@5.0.2
  - @paljs/types@5.0.2

## 5.0.1

### Patch Changes

- fix admin build
- Updated dependencies
  - @paljs/display@5.0.1
  - @paljs/types@5.0.1

## 5.0.0

### Major Changes

- 49387d2: Re-build our project.

  - using `PNPM` instead of `Yarn`, `learn`
  - using the `Jest` framework to add some tests to our project.
  - using `GitHub Actions` for running tests.
  - upgrade to support `Prisma 4`.
  - using `graphql-parse-resolve-info` package in P`rismaSelect` plugin

  [docs] need to update

  [breaking changes] we have a lot of breaking changes

  - The config file name changed from `pal.(js|json)` to be `pal.config.(js|json)` to fix an issue with windows #230
  - `PrismaDelete` plugin totally removed, and we don't need it now Prisma support this option.
  - remove some options from the `nexus paljs plugin`

  ```
   // send custom dmmf if you have custom generated client path for generate input types
    dmmf?: DMMF.Document[];
    // take an array of field names to exclude from any input type
    excludeFields?: string[];
    // take a function and the input object as arg and return array of fields you want to generate
    filterInputs?: (input: DMMF.InputType) => DMMF.SchemaArg[];
    // by default when we create update inputs you will set data like {username: {set: "Ahmed"}} by making this option true you will be able to use it like {username: "Ahmed"} without set.
    // but you will also lose these options for number fields
    // increment: x: Adds x to the current value
    // decrement: x: Subtracts x from the current value
    // multiply: x: Multiplies the current value by x
    // divide: x: Divides the current value by x
    // set: x: Sets the value to x (equivalent to data: { age: 18 })
    doNotUseFieldUpdateOperationsInput?: boolean;
  ```

  We added them to `pal.config.js`

  ```
  excludeInputFields?: string[];
  filterInputs?: (input: DMMF.InputType) => DMMF.SchemaArg[];
  ```

  - SDL first update we changed our way to generate inputs from run time to file system, so we don't need to generate inputs every time we run the server.

  ```diff
  // src/graphql/typeDefs.ts
  - import { sdlInputs } from '@paljs/plugins';
  + import InputTypes from './InputTypes';

  - export default mergeTypeDefs([sdlInputs()]);
  + export default mergeTypeDefs([InputTypes]);
  ```

### Patch Changes

- Updated dependencies [49387d2]
  - @paljs/display@5.0.0
  - @paljs/types@5.0.0
