import { SchemaObject, Model, Enums, Field } from '@paljs/types';
import { PrismaReader } from './PrismaReader';

export class ConvertSchemaToObject extends PrismaReader {
  schemaObject: SchemaObject = {
    models: [],
    enums: [],
    dataSource: undefined,
    generators: [],
  };

  constructor(protected path: string) {
    super(path);
  }

  run() {
    this.getModels();
    this.getEnums();
    this.getDataSource();
    this.getGenerators();

    return this.schemaObject;
  }

  private getModels() {
    if (this.models) {
      for (const model of this.models) {
        const lines = this.blockLines(model);
        const modelObject: Model = {
          name: this.getClassName(lines),
          fields: [],
        };
        let documentation = '';
        for (let i = 1; i + 1 < lines.length; i++) {
          const line = this.lineArray(lines[i]);
          if (line[0].includes('//')) {
            documentation = documentation ? documentation + '\n' + line.join(' ') : line.join(' ');
          } else if (line[0].includes('@@')) {
            modelObject.map = this.getMap(lines[i]);
          } else {
            const type = this.getType(line);
            const field: Field = {
              name: line[0],
              type,
              isId: !!line.find((part) => part.startsWith('@id')),
              unique: !!line.find((part) => part.startsWith('@unique')),
              defaultValue: this.getDefaultValue(lines[i]),
              list: line[1].includes('[]'),
              required: !line[1].includes('[]') && !line[1].includes('?'),
              kind: this.getKind(type),
              documentation,
              map: this.getMap(lines[i]),
            };

            if (field.kind === 'object') {
              field.relation = this.getRelation(lines[i]);
            }
            modelObject.fields.push(field);
            documentation = '';
          }
        }
        modelObject.documentation = this.getModelDocumentation(modelObject.name);
        modelObject.fields
          .filter((item) => item.kind !== 'object')
          .forEach((item) => {
            let relationField = false;
            modelObject.fields
              .filter((field) => field.kind === 'object')
              .forEach((field) => {
                if (!relationField) {
                  relationField = !!field.relation?.fields?.includes(item.name);
                }
              });
            item.relationField = relationField;
          });
        this.schemaObject.models.push({ ...modelObject });
      }
    }
  }

  private getEnums() {
    if (this.enums) {
      for (const item of this.enums) {
        const lines = this.blockLines(item);
        const itemObject: Enums = {
          name: this.getClassName(lines),
          fields: [],
        };
        for (let i = 1; i + 1 < lines.length; i++) {
          const line = this.lineArray(lines[i]);
          !line[0].includes('//') && itemObject.fields.push(line[0]);
        }
        this.schemaObject.enums.push({ ...itemObject });
      }
    }
  }

  private getDataSource() {
    if (this.dataSource) {
      this.schemaObject.dataSource = this.dataSource.map((dataSource) => {
        return {
          provider: dataSource.match(/provider\s+=\s+"(\w+)"/)?.[1] || '',
          url: dataSource.match(/url\s+=\s+(.+)/)?.[1] || '',
        };
      })[0];
    }
  }

  private getGenerators() {
    if (this.generators) {
      this.schemaObject.generators = this.generators.map((generator) => {
        return {
          name: generator.match(/generator\s+(\w+)/)?.[1] || '',
          provider: generator.match(/provider\s+=\s+"(.+)"/)?.[1] || '',
        };
      });
    }
  }
}
