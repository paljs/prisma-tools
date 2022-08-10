import { GraphQLResolveInfo } from 'graphql';
import { DMMF } from '@prisma/client/runtime';
// @ts-ignore
import graphqlFields from 'graphql-fields';

/**
 * Convert `info` to select object accepted by `prisma client`.
 * @param info - GraphQLResolveInfo.
 * @example
 * // Graphql query
 * {
 *    findManyUser{
 *      id
 *      posts(where: { title: { contains: "a" } }, first: 10) {
 *        id
 *        comments{
 *          id
 *        }
 *      }
 *    }
 * }
 * // convert to
 * {
 *  select: {
 *    id: true,
 *    posts: {
 *      select: { id: true, comments: { select: { id: true } } },
 *      where: { title: { contains: "a" } },
 *      first: 10
 *    }
 *  }
 * }
 *
 * // Use
 *
 * const select = new PrismaSelect(info);
 *
 * prisma.user.findMany({
 *  ...args,
 *  ...select.value,
 * })
 *
 **/
export class PrismaSelect {
  private availableArgs = ['where', 'orderBy', 'skip', 'cursor', 'take'];
  private allowedProps = ['_count'];
  private isAggregate: boolean = false;

  constructor(
    private info: GraphQLResolveInfo,
    private options?: {
      defaultFields?: {
        [key: string]:
          | { [key: string]: boolean }
          | ((select: any) => { [key: string]: boolean });
      };
      dmmf?: Omit<DMMF.Document, 'schema'>[];
    },
  ) {}

  get value() {
    const returnType = this.info.returnType
      .toString()
      .replace(/]/g, '')
      .replace(/\[/g, '')
      .replace(/!/g, '');
    this.isAggregate = returnType.includes('Aggregate');
    return this.valueWithFilter(returnType);
  }

  get dataModel() {
    const models: DMMF.Model[] = [];
    if (this.options?.dmmf) {
      this.options?.dmmf.forEach((doc) => {
        models.push(...doc.datamodel.models);
      });
    } else {
      const { Prisma } = require('@prisma/client');
      if (Prisma.dmmf && Prisma.dmmf.datamodel) {
        models.push(...Prisma.dmmf.datamodel.models);
      }
    }
    return models;
  }

  get defaultFields() {
    return this.options?.defaultFields;
  }

  private get fields() {
    return graphqlFields(
      this.info,
      {},
      {
        excludedFields: ['__typename'],
        processArguments: true,
      },
    );
  }

  private static getModelMap(docs?: string, name?: string) {
    const value = docs?.match(/@PrismaSelect.map\(\[(.*?)\]\)/);
    if (value && name) {
      const asArray = value[1]
        .replace(/ /g, '')
        .split(',')
        .filter((v) => v);
      return asArray.includes(name);
    }
    return false;
  }

  private model(name?: string) {
    return this.dataModel.find(
      (item) =>
        item.name === name ||
        PrismaSelect.getModelMap(item.documentation, name),
    );
  }

  private field(name: string, model?: DMMF.Model) {
    return model?.fields.find((item) => item.name === name);
  }

  static isObject(item: any) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }

  static mergeDeep(target: any, ...sources: any[]): any {
    if (!sources.length) return target;
    const source: any = sources.shift();

    if (PrismaSelect.isObject(target) && PrismaSelect.isObject(source)) {
      for (const key in source) {
        if (PrismaSelect.isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          PrismaSelect.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }

    return PrismaSelect.mergeDeep(target, ...sources);
  }

  /**
   * Get nested value from select object.
   * @param field - name of field in select object.
   * @param filterBy - Model name as you have in schema.prisma file.
   * @param mergeObject
   * @example
   * // Graphql query
   * {
   *    findManyUser{
   *      id
   *      posts{
   *        id
   *        comments{
   *          id
   *        }
   *      }
   *    }
   * }
   *
   * // when you need to get more nested fields just add `.`
   * PrismaSelect.valueOf('posts.comments', 'Comment');
   * // return
   * { select: { id: true } }
   *
   * PrismaSelect.valueOf('posts', 'Post');
   *
   * // return
   * { select: { id: true, comments: { select: { id: true } } } }
   *
   **/
  valueOf(field: string, filterBy?: string, mergeObject: any = {}) {
    const splitItem = field.split('.');
    let newValue = this.getSelect(this.fields);
    for (const field of splitItem) {
      if (this.isAggregate && newValue.hasOwnProperty(field)) {
        newValue = newValue[field];
      } else if (
        !this.isAggregate &&
        newValue.hasOwnProperty('select') &&
        newValue.select.hasOwnProperty(field)
      ) {
        newValue = newValue.select[field];
      } else {
        return {};
      }
    }
    return filterBy
      ? PrismaSelect.mergeDeep(this.filterBy(filterBy, newValue), mergeObject)
      : newValue;
  }

  /**
   * Work with this method if your GraphQL type name not like Schema model name.
   * @param modelName - Model name as you have in schema.prisma file.
   * @example
   * // normal call
   * const select = new PrismaSelect(info).value
   *
   * // With filter will filter select object with provided schema model name
   * const select = new PrismaSelect(info).valueWithFilter('User');
   *
   **/
  valueWithFilter(modelName: string) {
    return this.filterBy(modelName, this.getSelect(this.fields));
  }

  private filterBy(modelName: string, selectObject: any) {
    const model = this.model(modelName);
    if (model && typeof selectObject === 'object') {
      let defaultFields = {};
      if (this.defaultFields && this.defaultFields[modelName]) {
        const modelFields = this.defaultFields[modelName];
        defaultFields =
          typeof modelFields === 'function'
            ? modelFields(selectObject.select)
            : modelFields;
      }
      const filteredObject = {
        ...selectObject,
        select: { ...defaultFields },
      };
      Object.keys(selectObject.select).forEach((key) => {
        if (this.allowedProps.includes(key)) {
          filteredObject.select[key] = selectObject.select[key];
        } else {
          const field = this.field(key, model);
          if (field) {
            if (field.kind !== 'object') {
              filteredObject.select[key] = true;
            } else {
              const subModelFilter = this.filterBy(
                field.type,
                selectObject.select[key],
              );
              if(subModelFilter === true){
                filteredObject.select[key] = true;
              } else if (Object.keys(subModelFilter.select).length > 0) {
                filteredObject.select[key] = subModelFilter;
              }
            }
          }
        }
      });
      return filteredObject;
    } else {
      return selectObject;
    }
  }

  private getSelect(fields: any) {
    const selectObject: any = this.isAggregate ? {} : { select: {} };
    Object.keys(fields).forEach((key) => {
      if (Object.keys(fields[key]).length === 0) {
        if (this.isAggregate) {
          selectObject[key] = true;
        } else {
          selectObject.select[key] = true;
        }
      } else if (key === '__arguments') {
        fields[key].forEach((arg: any) => {
          Object.keys(arg).forEach((key2) => {
            if (this.availableArgs.includes(key2)) {
              selectObject[key2] = arg[key2].value;
            }
          });
        });
      } else {
        if (this.isAggregate) {
          selectObject[key] = this.getSelect(fields[key]);
        } else {
          selectObject.select[key] = this.getSelect(fields[key]);
        }
      }
    });
    return selectObject;
  }
}
