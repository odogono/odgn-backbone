import Babel from 'rollup-plugin-babel';

export default {
    entry: 'src/index.js',
    globals: {
        underscore: '_'
    },
    plugins:[
        Babel({
            babelrc: false,
            sourceMap: true,
            presets:[
                'es2015-rollup'
            ]
        })
    ],
    targets:[
        {
            format: 'es',
            dest: 'dist/odgn-backbone-model.es2015.js'  
        },
        {
            format: 'umd',
            moduleName: 'ODGNBackboneModel',
            dest: 'dist/odgn-backbone-model.umd.js'
        }
    ],
    sourceMap:true
}