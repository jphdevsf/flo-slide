import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';
import { readFileSync } from 'fs';

// Read package.json manually to avoid ES module import issues
const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

const extensions = ['.js', '.jsx'];

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * Licensed under the ${pkg.license} License
 */`;

export default {
    input: 'src/index.js',
    output: [
        // UMD build for browser global
        {
            file: pkg.main,
            format: 'umd',
            name: 'FloSlide',
            banner,
            sourcemap: true,
            globals: {
                // Add any external dependencies here if needed
            }
        },
        // ESM build for modern bundlers
        {
            file: 'dist/flo-slide.esm.js',
            format: 'es',
            banner,
            sourcemap: true
        },
        // Minified version
        {
            file: 'dist/flo-slide.min.js',
            format: 'umd',
            name: 'FloSlide',
            banner,
            plugins: [terser()],
            sourcemap: true
        }
    ],
    external: [],
    plugins: [
        resolve({
            extensions
        }),
        commonjs(),
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        babel({
            extensions,
            babelHelpers: 'bundled',
            presets: [
                ['@babel/preset-env', {
                    modules: false,
                    targets: {
                        browsers: ['> 1%', 'last 2 versions']
                    }
                }]
            ],
            exclude: 'node_modules/**'
        })
    ]
};