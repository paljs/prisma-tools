import { PrismaClient } from '@prisma/client';
import { dataModel, DMMF } from './schema';

interface DeleteData {
  name: string;
  where: object;
}

export interface onDeleteArgs {
  model: string;
  where?: any;
  deleteParent?: boolean;
}

interface BatchPayload {
  count: number;
}

/**
 * Handle all relation onDelete type
 * @param prisma - optional arg you can send your client class.
 * @param options - optional arg you can send your custom options { dmmf?: DMMF.Document }.
 * @example
 * const prisma = new PrismaClient({log: ['query']});
 * const prismaDelete = new PrismaDelete(prisma);
 *
 * // or new PrismaDelete(); we will create new client and use
 *
 * // use onDelete method
 * prismaDelete.onDelete({
 *  model: 'User',
 *  where: { id: 1 },
 *  deleteParent: true // if true will also delete user record default false
 * });
 *
 **/
export class PrismaDelete {
  constructor(
    private prisma: any = new PrismaClient(),
    private options?: { dmmf?: DMMF.Document },
  ) {}

  get dataModel() {
    return this.options?.dmmf?.datamodel || dataModel;
  }

  private getModel(modelName: string) {
    return this.dataModel?.models.find((item) => item.name === modelName);
  }

  private static getModelName(modelName: string) {
    return modelName.charAt(0).toLowerCase() + modelName.slice(1);
  }

  private getFieldByType(modelName: string, fieldType: string) {
    return this.getModel(modelName)?.fields.find(
      (item) => item.type === fieldType && !item.isList,
    );
  }

  private getModelIdFieldName(modelName: string) {
    return this.getModel(modelName)?.fields.find((item) => item.isId)?.name;
  }

  private getOnDeleteFields(modelName: string, type: 'SET_NULL' | 'CASCADE') {
    return this.getModel(modelName)?.fields.filter(
      (item) =>
        item.documentation?.includes('@onDelete') &&
        item.documentation?.includes(type),
    );
  }

  private async setFieldNull(modelName: string, field: DMMF.Field, where: any) {
    const name = PrismaDelete.getModelName(modelName);
    const modelId = this.getModelIdFieldName(modelName);
    const fieldModelId = this.getModelIdFieldName(field.type);
    if (modelId && fieldModelId && !field.isRequired) {
      const fieldSelect = field.isList
        ? { [field.name]: { select: { [fieldModelId]: true } } }
        : {};
      const results = await this.prisma[name].findMany({
        where,
        select: {
          [modelId]: true,
          ...fieldSelect,
        },
      });
      for (const result of results) {
        if (!(field.isList && result[field.name].length === 0)) {
          await this.prisma[name].update({
            where: {
              [modelId]: result[modelId],
            },
            data: {
              [field.name]: {
                disconnect: field.isList ? result[field.name] : true,
              },
            },
          });
        }
      }
    }
  }

  private async getDeleteArray(
    modelName: string,
    whereInput: any,
    includeParent = true,
  ) {
    const deleteArray: DeleteData[] = includeParent
      ? [
          {
            name: PrismaDelete.getModelName(modelName),
            where: whereInput,
          },
        ]
      : [];

    const nullFields = this.getOnDeleteFields(modelName, 'SET_NULL');
    if (nullFields) {
      for (const nullField of nullFields) {
        await this.setFieldNull(modelName, nullField, whereInput);
      }
    }

    const cascadeFields = this.getOnDeleteFields(modelName, 'CASCADE');
    if (cascadeFields) {
      for (const cascadeField of cascadeFields) {
        const childField = this.getFieldByType(cascadeField.type, modelName);
        if (childField) {
          if (cascadeField.type !== modelName) {
            deleteArray.push(
              ...(await this.getDeleteArray(cascadeField.type, {
                [childField.name]: whereInput,
              })),
            );
          } else {
            deleteArray.push({
              name: PrismaDelete.getModelName(modelName),
              where: {
                [childField.name]: whereInput,
              },
            });
          }
        }
      }
    }

    return deleteArray;
  }
  /**
   * Handle all relation onDelete type
   * @param onDeleteArgs - Object with model data.
   * @return count of deleted records if deleteParent is true
   * @example
   * const prismaDelete = new PrismaDelete();
   * prismaDelete.onDelete({
   *  model: 'User',
   *  where: { id: 1 },
   *  deleteParent: true // if true will also delete user record default false
   * });
   *
   **/
  async onDelete({
    model,
    where,
    deleteParent,
  }: onDeleteArgs): Promise<BatchPayload | void> {
    const results = (
      await this.getDeleteArray(model, where, !!deleteParent)
    ).reverse();
    for (let i = 0; i < results.length; ++i) {
      if (i + 1 === results.length && deleteParent) {
        return await this.prisma[results[i].name].deleteMany({
          where: results[i].where,
        });
      } else {
        await this.prisma[results[i].name].deleteMany({
          where: results[i].where,
        });
      }
    }
  }
}
