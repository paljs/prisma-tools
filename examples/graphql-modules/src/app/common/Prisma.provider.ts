import PrismaDelete, { onDeleteArgs } from '@prisma-tools/delete';
import { OnRequest, OnResponse } from '@graphql-modules/core';
import { PrismaClient } from '@prisma/client';
import { Injectable } from '@graphql-modules/di';
import { schema } from '../../schema';

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
    const prismaDelete = new PrismaDelete(this, schema);
    await prismaDelete.onDelete(args);
  }
}
