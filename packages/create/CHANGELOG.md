# @paljs/create

## 8.1.0

### Minor Changes

- update prisma version

### Patch Changes

- Updated dependencies
  - @paljs/types@8.1.0
  - @paljs/display@8.1.0

## 8.0.1

### Patch Changes

- fix(admin): fix bug in admin disconntect
- Updated dependencies
  - @paljs/display@8.0.1
  - @paljs/types@8.0.1

## 8.0.0

### Major Changes

- Update the prisma version to 6 that have breaking changes

### Patch Changes

- Updated dependencies
  - @paljs/display@8.0.0
  - @paljs/types@8.0.0

## 7.1.0

### Minor Changes

- Upgrade Prisma dependencies and update test snapshots

  Updated Prisma-related dependencies from version 5.16.0 to 5.22.0. This change also includes updates to test snapshots to reflect recent modifications in model indexes and field defaults. The dependency react-hook-form is now specified with a flexible version range.

### Patch Changes

- Updated dependencies
  - @paljs/types@7.1.0
  - @paljs/display@7.1.0

## 7.0.2

### Patch Changes

- fixing sdl typescript
- Updated dependencies
  - @paljs/display@7.0.2
  - @paljs/types@7.0.2

## 7.0.1

### Patch Changes

- update prisma to load schema right
- Updated dependencies
  - @paljs/types@7.0.1
  - @paljs/display@7.0.1

## 7.0.0

### Major Changes

- We encourage you to update your applications to utilize the newest features and improvements.

  ## Key Changes

  - **Prisma (5.14):** We have upgraded Prisma to version 5.14 to leverage recent Prisma features and improvements.
  - **React (18):** We have also upgraded React to version 18 to take advantage of the latest React features.
  - **ESLint (9):** The project now uses ESLint version 9 for an improved and more effective linting process.

  ## Breaking Changes

  While making these changes, we had to introduce some breaking changes. As such, please exercise caution and test your applications thoroughly after the upgrade.

  ## Fixes

  We have fixed many issues in the process, optimizing our package to provide you with a smoother development experience.

  ***

  Please update your applications with these new versions and let us know if you encounter any issues. We always strive to improve our products and appreciate your feedback!

  (Note: Always back up your projects prior to applying any major updates to avoid unexpected data loss)

  Stay tuned for more updates!

### Patch Changes

- Updated dependencies
  - @paljs/display@7.0.0
  - @paljs/types@7.0.0

## 6.0.7

### Patch Changes

- Fix an issue in the select plugin options
- Updated dependencies
  - @paljs/types@6.0.7
  - @paljs/display@6.0.7

## 6.0.6

### Patch Changes

- Improve the select plugin option types and add exclude fields
- Updated dependencies
  - @paljs/types@6.0.6
  - @paljs/display@6.0.6

## 6.0.5

### Patch Changes

- make the findMany non null able
- Updated dependencies
  - @paljs/display@6.0.5
  - @paljs/types@6.0.5

## 6.0.4

### Patch Changes

- [admin] fix issue in the initial filter
- Updated dependencies
  - @paljs/display@6.0.4
  - @paljs/types@6.0.4

## 6.0.3

### Patch Changes

- [admin] fix filter and sort to use new Prisma v5 inputs
- Updated dependencies
  - @paljs/display@6.0.3
  - @paljs/types@6.0.3

## 6.0.2

### Patch Changes

- Update prisma v5.2
- Updated dependencies
  - @paljs/types@6.0.2
  - @paljs/display@6.0.2

## 6.0.1

### Patch Changes

- fix nexus generate types args
- Updated dependencies
  - @paljs/display@6.0.1
  - @paljs/types@6.0.1

## 6.0.0

### Major Changes

- Upgrade Prisma Version to V5 and fix all breaking changes

### Patch Changes

- Updated dependencies
  - @paljs/display@6.0.0
  - @paljs/types@6.0.0

## 5.3.3

### Patch Changes

- fix the DMMF type
- Updated dependencies
  - @paljs/display@5.3.3
  - @paljs/types@5.3.3

## 5.3.2

### Patch Changes

- upgrade the prisma version 15
- Updated dependencies
  - @paljs/types@5.3.2
  - @paljs/display@5.3.2

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

## 5.0.4

### Patch Changes

- [PrismaSelect] remove the main args from the object
- Updated dependencies
  - @paljs/display@5.0.3
  - @paljs/types@5.0.3

## 5.0.3

### Patch Changes

- fix prisma select plugin
- Updated dependencies
  - @paljs/display@5.0.2
  - @paljs/types@5.0.2

## 5.0.2

### Patch Changes

- update admin version

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
