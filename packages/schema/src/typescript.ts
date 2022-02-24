import { Field, SchemaObject } from '@paljs/types';
import { ConvertSchemaToObject } from './json';

export class GenerateTypeScript {
  private schema: SchemaObject;
  private code: string[] = [];
  private scalar: { [key: string]: any } = {
    Int: 'number',
    Float: 'number',
    Decimal: 'number',
    BigInt: 'number',
    String: 'string',
    Boolean: 'boolean',
    DateTime: 'Date',
    Json: 'any',
  };
  constructor(path: string) {
    this.schema = new ConvertSchemaToObject(path).run();
  }

  run() {
    // generate models
    const models: string[] = [];
    this.schema.models.forEach((model) => {
      const fields: string[] = [`export interface ${model.name} {`];
      model.fields.forEach((field) => {
        fields.push(
          `${field.name}${field.required ? '' : '?'}: ${this.getType(field)}`,
        );
      });
      fields.push('}');
      models.push(fields.join('\n'));
    });
    this.code.push(models.join('\n\n'));

    // generate enums
    const enumsTypes: string[] = [];
    this.schema.enums.forEach((item) => {
      const values: string[] = [`export enum ${item.name} {`];
      item.fields.forEach((item2) => {
        values.push(`${item2} = "${item2}",`);
      });
      values.push('}');
      enumsTypes.push(values.join('\n'));
    });
    this.code.push(enumsTypes.join('\n\n'));

    return this.code.join('\n\n');
  }

  private getType(field: Field) {
    switch (field.kind) {
      case 'scalar':
        return `${this.scalar[field.type]}${field.list ? '[]' : ''}`;
      default:
        return `${field.type}${field.list ? '[]' : ''}`;
    }
  }
}
