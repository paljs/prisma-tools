import { GenerateTypeScript } from '../src';
import { join } from 'path';

test('generate typescript types from prisma schema', () => {
  const generate = new GenerateTypeScript(join(__dirname, './schemas/schema.prisma')).run();
  expect(generate).toMatchInlineSnapshot(`
    "export interface User {
    id: number
    createdAt: Date
    email: string
    name?: string
    password: string
    permissions: any
    posts?: Post[]
    }

    export interface Post {
    id: number
    published: boolean
    title: string
    author?: User
    authorId?: number
    createdAt: Date
    updatedAt: Date
    }

    export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    }"
  `);
});
