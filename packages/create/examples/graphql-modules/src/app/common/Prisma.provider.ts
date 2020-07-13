import { PrismaDelete, onDeleteArgs } from '@paljs/plugins';
import { OnRequest, OnResponse } from '@graphql-modules/core';
import { PrismaClient } from '@prisma/client';
import { Injectable } from '@graphql-modules/di';

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

  async onDelete(args: onDeleteArgs) {
    const prismaDelete = new PrismaDelete(this);
    await prismaDelete.onDelete(args);
  }
}
