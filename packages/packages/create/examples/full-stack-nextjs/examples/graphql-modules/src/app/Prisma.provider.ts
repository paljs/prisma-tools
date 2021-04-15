import { PrismaDelete, onDeleteArgs } from '@paljs/plugins';
import { Injectable, OnDestroy } from 'graphql-modules';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaProvider extends PrismaClient implements OnDestroy {
  constructor() {
    super();
    this.$connect();
  }
  onDestroy(): void {
    this.$disconnect();
  }

  async onDelete(args: onDeleteArgs) {
    const prismaDelete = new PrismaDelete(this);
    await prismaDelete.onDelete(args);
  }
}
