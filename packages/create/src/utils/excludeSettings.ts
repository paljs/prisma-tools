import { Frameworks } from '../index';

const adminExclude = {
  files: ['admin', 'adminSettings.json', 'PrismaTable.tsx', 'layouts'],
  packages: ['@paljs/admin'],
};

const materialExclude = {
  files: ['tailwind.config.js', 'postcss.config.js', 'tailwind'],
  packages: ['postcss', 'tailwindcss', '@heroicons/react', 'autoprefixer'],
};

const tailwindExclude = {
  files: ['material', '_document.tsx', 'signup.tsx'],
  packages: ['@material-ui/core', '@material-ui/icons'],
};

export const framework: {
  [key in Frameworks]: { app: string; files: string[]; packages: string[] };
} = {
  'Material UI': {
    app: '_appM.tsx',
    files: [...materialExclude.files, ...adminExclude.files],
    packages: [...materialExclude.packages, ...adminExclude.packages],
  },
  'Material UI + PrismaAdmin UI': {
    app: '_appMA.tsx',
    ...materialExclude,
  },
  'Tailwind CSS': {
    app: '_appT.tsx',
    files: [...tailwindExclude.files, ...adminExclude.files],
    packages: [...tailwindExclude.packages, ...adminExclude.packages],
  },
  'Tailwind CSS + PrismaAdmin UI': {
    app: '_appTA.tsx',
    ...tailwindExclude,
  },
};

export const getPath = (path: string, root: string) => {
  return path
    .replace(root, '')
    .replace('/multi_prisma', '')
    .replace('multi_', '')
    .replace(/components\/(\w+)/, 'components')
    .replace(/components\/(\w+)\/(\w+)/, 'components/$2')
    .replace(/layouts\/(\w+)/, 'layouts/Admin');
};
