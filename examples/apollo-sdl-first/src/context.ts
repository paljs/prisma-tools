import { PrismaClient } from "@prisma/client";
import DeleteCascade from "@prisma-tools/delete";
import schema from "./onDeleteSchema";

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  select: any;
  onDelete: DeleteCascade;
}

export function createContext(): Context {
  return {
    prisma,
    select: {},
    onDelete: new DeleteCascade(prisma, schema),
  };
}
