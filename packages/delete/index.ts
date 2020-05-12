import { dmmf, PrismaClient } from "@prisma/client";
import { DMMF } from "@prisma/client/runtime";

const datamodel: DMMF.Datamodel = dmmf.datamodel;

interface DeleteData {
  name: string;
  where: object;
}

type Schema = { [key: string]: string[] };

export default class DeleteCascade {
  constructor(private prisma: any, private schema: Schema) {}

  private getFieldByName(modelName: string, fieldName: string) {
    return this.getModel(modelName)?.fields.find(
      (item) => item.name === fieldName
    );
  }

  private getModel(modelName: string) {
    return datamodel.models.find((item) => item.name === modelName);
  }

  private getFieldByType(modelName: string, fieldType: string) {
    return this.getModel(modelName)?.fields.find(
      (item) => item.type === fieldType
    );
  }

  private getDeleteArray(
    modelName: string,
    whereInput: object,
    includeParent = true
  ) {
    const deleteArray: DeleteData[] = includeParent
      ? [
          {
            name: modelName.charAt(0).toLowerCase() + modelName.slice(1),
            where: whereInput,
          },
        ]
      : [];

    const modelRelations = this.schema[modelName];
    if (modelRelations) {
      modelRelations.forEach((item) => {
        const parentField = this.getFieldByName(modelName, item);
        if (parentField) {
          const childField = this.getFieldByType(parentField.type, modelName);
          if (childField) {
            deleteArray.push(
              ...this.getDeleteArray(parentField.type, {
                [childField.name]: whereInput,
              })
            );
          }
        }
      });
    }
    return deleteArray;
  }

  async cascade(modelName: string, whereInput: object, includeParent = true) {
    const results = this.getDeleteArray(
      modelName,
      whereInput,
      includeParent
    ).reverse();
    for (const result of results) {
      await this.prisma[result.name].deleteMany({
        where: result.where,
      });
    }
  }
}
