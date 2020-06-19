import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { format, Options } from 'prettier';

export const createFileIfNotfound = (
  path: string,
  fileName: string,
  content: string,
) => {
  !existsSync(path) && mkdirSync(path, { recursive: true });
  !existsSync(`${path}/${fileName}`) &&
    writeFileSync(`${path}/${fileName}`, content);
};

export function formation(text: string, parser: Options['parser'] = 'babel') {
  return format(text, {
    singleQuote: true,
    semi: false,
    trailingComma: 'all',
    parser,
  });
}
