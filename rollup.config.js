import typescript from 'rollup-plugin-typescript2';

const plugins = [
  typescript({
    typescript: require('typescript'),
    check: false,
    clean: true,
  }),
];

export default [
  {
    input: 'src/index.ts',
    output: { format: 'cjs', file: `dist/index.js` },
    plugins,
    external: [
      'graphql-fields',
      '@prisma/client',
      'prettier',
      '@nexus/schema',
      'fs',
    ],
  },
];
