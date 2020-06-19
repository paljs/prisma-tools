import { PrismaClient } from '@prisma/client';
import { SchemaObject, Field } from '@paljs/schema';

interface DeleteData {
  name: string;
  where: object;
}

export interface onDeleteArgs {
  model: string;
  where: object;
  deleteParent?: boolean;
}

/**
 * Handle all relation onDelete type
 * @param prisma - optional arg you can send your clint class.
 * @param schema - your schema.prisma converted object .
 * @example
 * const prisma = new PrismaClient({log: ['query']});
 * const prismaDelete = new PrismaDelete(prisma, schema);
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
export default class PrismaDelete {
  constructor(
    private prisma: any = new PrismaClient(),
    private schema: SchemaObject,
  ) {}

  private getModel(modelName: string) {
    return this.schema.models.find((item) => item.name === modelName);
  }

  private getModelName(modelName: string) {
    return modelName.charAt(0).toLowerCase() + modelName.slice(1);
  }

  private getFieldByType(modelName: string, fieldType: string) {
    return this.getModel(modelName)?.fields.find(
      (item) => item.type === fieldType,
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

  private async setFieldNull(modelName: string, field: Field, where: any) {
    const name = this.getModelName(modelName);
    const modelId = this.getModelIdFieldName(modelName);
    const fieldModelId = this.getModelIdFieldName(field.type);
    if (modelId && fieldModelId && !field.required) {
      const fieldSelect = field.list
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
        if (!(field.list && result[field.name].length === 0)) {
          await this.prisma[name].update({
            where: {
              [modelId]: result[modelId],
            },
            data: {
              [field.name]: {
                disconnect: field.list ? result[field.name] : true,
              },
            },
          });
        }
      }
    }
  }

  private async getDeleteArray(
    modelName: string,
    whereInput: object,
    includeParent = true,
  ) {
    const deleteArray: DeleteData[] = includeParent
      ? [
          {
            name: this.getModelName(modelName),
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
          deleteArray.push(
            ...(await this.getDeleteArray(cascadeField.type, {
              [childField.name]: whereInput,
            })),
          );
        }
      }
    }

    return deleteArray;
  }
  /**
   * Handle all relation onDelete type
   * @param onDeleteArgs - Object with model data.
   * @example
   * const prismaDelete = new PrismaDelete();
   * prismaDelete.onDelete({
   *  model: 'User',
   *  where: { id: 1 },
   *  deleteParent: true // if true will also delete user record default false
   * });
   *
   **/
  async onDelete({ model, where, deleteParent }: onDeleteArgs) {
    const results = (
      await this.getDeleteArray(model, where, !!deleteParent)
    ).reverse();
    for (const result of results) {
      await this.prisma[result.name].deleteMany({
        where: result.where,
      });
    }
  }
}
