import { GenerateTypeScript } from '../src';
import { join } from 'path';

test('generate typescript types from prisma schema', () => {
  const generate = new GenerateTypeScript(join(__dirname, './schemas/schema.prisma')).run();
  expect(generate).toMatchInlineSnapshot(`
    "export interface User {
    id: number
    createdAt: Date
    email: string
    name: string | null
    password: string
    permissions: any
    posts: Post[] | null
    }

    export interface Post {
    id: number
    published: boolean
    title: string
    author: User | null
    authorId: number | null
    createdAt: Date
    updatedAt: Date
    }

    export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    }"
  `);
});
