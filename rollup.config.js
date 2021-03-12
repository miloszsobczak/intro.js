import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';
import commonjs from 'rollup-plugin-commonjs';
import progress from 'rollup-plugin-progress';
import json from '@rollup/plugin-json';
import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';
import autoprefixer from 'autoprefixer';
import normalize from 'postcss-normalize';
import clean from 'postcss-clean';
import postcss from 'rollup-plugin-postcss';
import { version } from './package.json';

const inputPath = './src'
const outputPath = './dist';

const banner = `/*!
 * Intro.js v${version}
 * https://introjs.com
 *
 * Copyright (C) 2012-2021 Afshin Mehrabani (@afshinmeh).
 * https://raw.githubusercontent.com/usablica/intro.js/master/license.md
 *
 * Date: ${new Date().toUTCString()}
 */
`;

const jsPlugins = [
  json(),
  resolve(),
  progress(),
  filesize({
    showGzippedSize: true,
  }),
  commonjs()
];

const postCSSPlugins = [
  normalize,
  autoprefixer
]

export default [
  {
    input: `${inputPath}/styles/introjs-rtl.scss`,
    output: {
      file: `${outputPath}/minified/introjs-rtl.min.css`,
      format: 'es'
    },
    plugins: [
      postcss({
        sourceMap: true,
        extract: true,
        plugins: [
          ...postCSSPlugins,
          clean
        ]
      })
    ]
  },
  {
    input: `${inputPath}/styles/introjs-rtl.scss`,
    output: {
      file: `${outputPath}/introjs-rtl.css`,
      format: 'es'
    },
    plugins: [
      postcss({
        extract: true,
        plugins: postCSSPlugins
      })
    ]
  },
  {
    input: `${inputPath}/styles/introjs.scss`,
    output: {
      file: `${outputPath}/introjs.css`,
      format: 'es'
    },
    plugins: [
      postcss({
        extract: true,
        plugins: postCSSPlugins
      })
    ]
  },
  {
    input: `${inputPath}/styles/introjs.scss`,
    output: {
      file: `${outputPath}/minified/introjs.min.css`,
      format: 'es'
    },
    plugins: [
      postcss({
        extract: true,
        sourceMap: true,
        plugins: [
          ...postCSSPlugins,
          clean
        ]
      })
    ]
  },
  {
    input: `${inputPath}/index.js`,
    output: {
      file: `${outputPath}/${pkg.main.replace(/\.es5.js$/, '.js')}`,
      format: 'umd',
      banner,
      name: 'introJs'
    },
    plugins: jsPlugins
  },
  {
    input: `${inputPath}/index.js`,
    output: {
      file: `${outputPath}/${pkg.main}`,
      format: 'umd',
      banner,
      name: 'introJs'
    },
    plugins: [
      ...jsPlugins,
      babel({
        exclude: 'node_modules/**'
      })
    ]
  },
  {
    input: `${inputPath}/index.js`,
    output: {
      file: `${outputPath}/minified/${pkg.main.replace(/\.es5.js$/, '.js')}`,
      banner,
      format: 'umd',
      name: 'introJs'
    },
    plugins: [
      ...jsPlugins,
      terser()
    ]
  },
  {
    input: `${inputPath}/index.js`,
    output: {
      file: `${outputPath}/minified/${pkg.main}`,
      banner,
      format: 'umd',
      name: 'introJs'
    },
    plugins: [
      ...jsPlugins,
      babel({
        exclude: 'node_modules/**'
      }),
      terser()
    ]
  }
];

