import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

export const createFile = (path: string, fileName: string, content: string) => {
  void (!existsSync(path) && mkdirSync(path, { recursive: true }));
  void (!existsSync(join(path, fileName)) && writeFileSync(join(path, fileName), content));
};
