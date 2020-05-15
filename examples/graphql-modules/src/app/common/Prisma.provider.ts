import DeleteCascade from "@prisma-tools/delete";
import { OnRequest, OnResponse } from "@graphql-modules/core";
import { PrismaClient } from "@prisma/client";
import { Injectable } from "@graphql-modules/di";
import onDeleteSchema from "./onDeleteSchema";

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

  async onDelete(
    modelName: string,
    whereInput: object,
    includeParent?: boolean
  ) {
    const prismaDelete = new DeleteCascade(this, onDeleteSchema);
    await prismaDelete.cascade(modelName, whereInput, includeParent);
  }
}
