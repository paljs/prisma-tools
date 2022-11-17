import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

export const createFile = (path: string, fileName: string, content: string) => {
  !existsSync(path) && mkdirSync(path, { recursive: true });
  !existsSync(join(path, fileName)) && writeFileSync(join(path, fileName), content);
};
