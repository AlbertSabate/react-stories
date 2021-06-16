import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/ReactStories.tsx',
    output: [
      {
        name: 'ReactStories',
        dir: 'dist',
        format: 'cjs',
      },
      {
        file: 'dist/ReactStories.esm.js',
        format: 'esm',
      },
    ],
    plugins: [typescript({ include: ['./src/**/*.tsx'] })],
  },
];
