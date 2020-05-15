import { Options } from "./types";
import { writeFile, mkdir } from "fs";
import { createInput } from "./InputTypes";
import { formatter } from ".";

export const createCommon = (options: Options) => {
  mkdir(`${options.modelsOutput}/common`, () => {});
  writeFile(
    `${options.modelsOutput}/common/inputTypes.ts`,
    formatter(createInput()),
    () => {}
  );
  if (!options.excludeCommon) {
    writeFile(
      `${options.modelsOutput}/common/addSelect.ts`,
      formatter(`import { PrismaSelect } from '@prisma-tools/select';

    export const addSelect = (next) => async (root, args, context, info) => {
      const result = new PrismaSelect(info).value;
      if (Object.keys(result.select).length > 0) {
        args = {
          ...args,
          ...result,
        };
      }
      return next(root, args, context, info);
    };    
    `),
      () => {}
    );

    writeFile(
      `${options.modelsOutput}/common/Prisma.provider.ts`,
      formatter(`import DeleteCascade from '@prisma-tools/delete';
    import { OnRequest, OnResponse } from '@graphql-modules/core';
    import { PrismaClient } from '@prisma/client';
    import { Injectable } from '@graphql-modules/di';
    import onDeleteSchema from './onDeleteSchema';
    
    @Injectable()
    export class PrismaProvider extends PrismaClient
      implements OnRequest, OnResponse {
      constructor() {
        super();
      }
      onRequest() {
        this.connect();
      }
      onResponse() {
        this.disconnect();
      }
    
      async onDelete(modelName: string, whereInput: object, includeParent?: boolean) {
        const prismaDelete = new DeleteCascade(this, onDeleteSchema);
        await prismaDelete.cascade(modelName, whereInput, includeParent);
      }
    }
    `),
      () => {}
    );

    writeFile(
      `${options.modelsOutput}/common/onDeleteSchema.ts`,
      formatter(`const schema: { [key: string]: string[] } = {
    }
    export default schema
    `),
      () => {}
    );

    writeFile(
      `${options.modelsOutput}/common/common.module.ts`,
      formatter(`import { GraphQLModule } from '@graphql-modules/core';
    import { PrismaProvider } from './Prisma.provider';
    import typeDefs from './inputTypes';
    
    export const CommonModule = new GraphQLModule({
      typeDefs,
      providers: [PrismaProvider],
    });
    `),
      () => {}
    );
  }
};
