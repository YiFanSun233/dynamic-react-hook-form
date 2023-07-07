import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import externals from 'rollup-plugin-node-externals';
import peerDeps from 'rollup-plugin-peer-deps-external';
import terser from '@rollup/plugin-terser';

export default {
  input: './src/index.ts',
  output: [{
    preserveModules: true,
    preserveModulesRoot: 'src',
    exports: 'named',
    dir: 'dist',
    format: 'es',
  }],
  plugins: [
    peerDeps(),
    // 自动将dependencies依赖声明为 externals
    externals({
      devDeps: false,
    }),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react', '@babel/preset-env']
    }),
    // 可使用 `import {module} from './file'` 替换 `import {module} from './file/index.js`
    resolve(),
    // 支持commonjs，包括第三方引入使用到commonjs语法
    commonjs(),
    typescript({
      tsconfig: 'tsconfig.json',
      clean: true
    }),
    terser()
  ]
};
