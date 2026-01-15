import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

const external = ['react', 'react-dom', 'react/jsx-runtime'];
const cliExternal = ['prompts', 'picocolors', 'fs', 'path'];

export default [
  // Core - ESM and CJS
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/index.mjs', format: 'esm', sourcemap: true },
      { file: 'dist/index.js', format: 'cjs', sourcemap: true },
    ],
    plugins: [typescript({ tsconfig: './tsconfig.build.json' })],
  },
  // React - ESM and CJS
  {
    input: 'src/react.ts',
    output: [
      { file: 'dist/react.mjs', format: 'esm', sourcemap: true },
      { file: 'dist/react.js', format: 'cjs', sourcemap: true },
    ],
    external,
    plugins: [typescript({ tsconfig: './tsconfig.build.json' })],
  },
  // CLI - CJS (for Node.js)
  {
    input: 'src/cli/index.ts',
    output: {
      file: 'dist/cli.js',
      format: 'cjs',
      sourcemap: true,
      banner: '#!/usr/bin/env node',
    },
    external: cliExternal,
    plugins: [typescript({ tsconfig: './tsconfig.build.json' })],
  },
  // Core types
  {
    input: 'src/index.ts',
    output: { file: 'dist/index.d.ts', format: 'esm' },
    plugins: [dts()],
  },
  // React types
  {
    input: 'src/react.ts',
    output: { file: 'dist/react.d.ts', format: 'esm' },
    external,
    plugins: [dts()],
  },
];
