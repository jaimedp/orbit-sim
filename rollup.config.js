import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';

export default {
  entry: 'src/js/index.js',
  dest: 'build/js/main.min.js',
  format: 'iife',
  sourceMap: true,
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    eslint({
      exclude: [
        'src/css/**',
      ]
    }),
  ],
};