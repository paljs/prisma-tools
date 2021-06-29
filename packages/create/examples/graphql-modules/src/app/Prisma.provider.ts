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
}
