import { Frameworks } from '../index';

// update to add new FrameWork
const adminExclude = {
  files: ['admin', 'adminSettings.json', 'PrismaTable.tsx', 'layouts'],
  packages: ['@paljs/admin'],
};

const materialExclude = {
  files: ['tailwind.config.js', 'postcss.config.js'],
  packages: [
    'postcss',
    'tailwindcss',
    '@heroicons/react',
    'autoprefixer',
    '@chakra-ui/react',
    '@emotion/react',
    '@emotion/styled',
    'framer-motion',
  ],
};

const tailwindExclude = {
  files: [],
  packages: [
    '@material-ui/core',
    '@material-ui/icons',
    '@chakra-ui/react',
    '@emotion/react',
    '@emotion/styled',
    'framer-motion',
  ],
};

const chakraExclude = {
  files: ['tailwind.config.js', 'postcss.config.js'],
  packages: ['postcss', 'tailwindcss', '@heroicons/react', 'autoprefixer', '@material-ui/core', '@material-ui/icons'],
};

export const framework: Record<
  Frameworks,
  {
    app: string;
    files: string[];
    packages: string[];
    folder: string;
  }
> = {
  'Material UI': {
    app: '_appM.tsx',
    folder: 'material',
    files: materialExclude.files.concat(adminExclude.files),
    packages: materialExclude.packages.concat(adminExclude.packages),
  },
  'Material UI + PrismaAdmin UI': {
    app: '_appMA.tsx',
    folder: 'material',
    ...materialExclude,
  },
  'Tailwind CSS': {
    app: '_appT.tsx',
    folder: 'tailwind',
    files: adminExclude.files,
    packages: tailwindExclude.packages.concat(adminExclude.packages),
  },
  'Tailwind CSS + PrismaAdmin UI': {
    app: '_appTA.tsx',
    folder: 'tailwind',
    ...tailwindExclude,
  },
  'Chakra UI': {
    app: '_appC.tsx',
    folder: 'chakra',
    files: chakraExclude.files.concat(adminExclude.files),
    packages: chakraExclude.packages.concat(adminExclude.packages),
  },
  'Chakra UI + PrismaAdmin UI': {
    app: '_appCA.tsx',
    folder: 'chakra',
    ...chakraExclude,
  },
};

export const getPath = (path: string, root: string, frameworkFolder: string) => {
  return path
    .replace(root, '')
    .replace('/multi_prisma', '')
    .replace('multi_', '')
    .replace(frameworkFolder + '/', '');
};
