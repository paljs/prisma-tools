import { PrismaReader } from '../src';
import { join } from 'path';

describe('test the Prisma Reader class', () => {
  const prismaReader = new PrismaReader(join(__dirname, './schemas/schema.prisma'));

  test('read prisma models', () => {
    expect(prismaReader.models).toMatchSnapshot();
  });

  test('read prisma enums', () => {
    expect(prismaReader.enums).toMatchSnapshot();
  });

  test('read prisma model documentation', () => {
    expect(prismaReader.getModelDocumentation('User')).toMatchSnapshot();
  });

  test('read prisma datasource', () => {
    expect(prismaReader.dataSource).toMatchSnapshot();
  });

  test('read prisma generators', () => {
    expect(prismaReader.generators).toMatchSnapshot();
  });

  test('read prisma datasource with url string', () => {
    const prismaReader = new PrismaReader(join(__dirname, './schemas/schema-datasource-with-url-string.prisma'));

    expect(prismaReader.dataSource).toMatchInlineSnapshot(`
      [
        "datasource db {
        provider = "postgresql"
        url      = "file:./dev.db"
      }
      ",
      ]
    `);
  });
});
