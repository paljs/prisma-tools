import { dmmf } from '@prisma/client';
import { DMMF } from '@prisma/client/runtime';

export const schema: DMMF.Schema | undefined = dmmf?.schema;
export const dataModel: DMMF.Datamodel | undefined = dmmf?.datamodel;
export { DMMF };
