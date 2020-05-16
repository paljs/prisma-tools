import { PrismaClient } from '@prisma/client';
import DeleteCascade from '@prisma-tools/delete';
import schema from './onDeleteSchema';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  onDelete: DeleteCascade;
}

export function createContext(): Context {
  return {
    prisma,
    onDelete: new DeleteCascade(prisma, schema),
  };
}
