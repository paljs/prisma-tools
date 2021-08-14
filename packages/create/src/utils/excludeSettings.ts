import { Frameworks } from '../index';

const adminExclude = {
  files: ['admin', 'adminSettings.json', 'PrismaTable.tsx', 'layouts'],
  packages: ['@paljs/admin'],
};

const materialExclude = {
  files: ['tailwind.config.js', 'postcss.config.js', 'tailwind', 'theme'],
  packages: ['postcss', 'tailwindcss', '@heroicons/react', 'autoprefixer', '@chakra-ui/react', '@emotion/react', '@emotion/styled', 'framer-motion'],
};

const tailwindExclude = {
  files: ['material', '_document.tsx', 'signup.tsx', 'theme.ts', 'theme'],
  packages: ['@material-ui/core', '@material-ui/icons', '@chakra-ui/react', '@emotion/react', '@emotion/styled', 'framer-motion'],
};

const chakraExclude = {
  files: ['material', '_document.tsx', 'signup.tsx', 'theme.ts', 'tailwind.config.js', 'postcss.config.js', 'tailwind'],
  packages: ['postcss', 'tailwindcss', '@heroicons/react', 'autoprefixer', '@material-ui/core', '@material-ui/icons'],
};

export const framework: {
  [key in Frameworks]: { app: string; files: string[]; packages: string[] };
} = {
  'Material UI': {
    app: '_appM.tsx',
    files: materialExclude.files.concat(adminExclude.files),
    packages: materialExclude.packages.concat(adminExclude.packages),
  },
  'Material UI + PrismaAdmin UI': {
    app: '_appMA.tsx',
    ...materialExclude,
  },
  'Tailwind CSS': {
    app: '_appT.tsx',
    files: tailwindExclude.files.concat(adminExclude.files),
    packages: tailwindExclude.packages.concat(adminExclude.packages),
  },
  'Tailwind CSS + PrismaAdmin UI': {
    app: '_appTA.tsx',
    ...tailwindExclude,
  },
  'Chakra UI': {
    app: '_appC.tsx',
    files: chakraExclude.files.concat(adminExclude.files),
    packages: chakraExclude.packages.concat(adminExclude.packages),
  },
  'Chakra UI + PrismaAdmin UI': {
    app: '_appCA.tsx',
    ...chakraExclude,
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
