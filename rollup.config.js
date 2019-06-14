const commonjs = require('rollup-plugin-commonjs'),
    resolve = require('rollup-plugin-node-resolve'),
    babel = require('rollup-plugin-babel'),
    json = require('rollup-plugin-json');
const pkg = require('./package.json');

const year = new Date().getFullYear();
const banner = `/*!\n * ${pkg.name} v${pkg.version}\n * LICENSE : ${pkg.license}\n * (c) 2019-${year} Zhi Yang\n */`;

module.exports = {
    input: 'src/index.js',
    external: ['maptalks', 'proj4'],
    plugins: [
        json(),
        resolve(),
        commonjs(),
        babel({
            exclude:'node_modules/**/*'
        })
    ],
    output: [{
            format: 'umd',
            name: 'maptalks.proj4',
            globals: {
                proj4: 'proj4',
                maptalks: 'maptalks'
            },
            banner,
            file: pkg.main
        }
    ]
};