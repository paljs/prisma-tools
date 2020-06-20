import { writeFileSync, mkdirSync, existsSync } from 'fs';

export const createFile = (path: string, fileName: string, content: string) => {
  !existsSync(path) && mkdirSync(path, { recursive: true });
  writeFileSync(`${path}/${fileName}`, content);
};
