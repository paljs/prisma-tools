export interface Settings {
  prismaSelectDefaultFields?: { [key: string]: { [key: string]: boolean } };
  adminSchemaPath?: string;
  includeAdmin?: boolean;
}
