import path from 'path' 
import resolve from '@rollup/plugin-node-resolve' 
import rollupTypescript from 'rollup-plugin-typescript2' 
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel' 
import terser from '@rollup/plugin-terser'
import dts from 'rollup-plugin-dts';
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const isProduction = process.env.MINIFY === 'true'; // 參照package.json

const config = {
    // 入口文件，src/index.ts 
    input: path.resolve(__dirname, 'src/index.ts'), 

    // 输出文件 
    output: [ 
        { 
            // package.json 配置的 module 属性 
            file: isProduction ? './dist/output.min.js' : './dist/output.js', 
            format: 'cjs',
        },
    ], 
    plugins: [ 
        // 解析第三方依赖 
        resolve({
            browser:true
        }), 
        commonjs({ 
            include: 'node_modules/**', // 包含所有 node_modules 中的文件
            transformMixedEsModules: true, // 处理混合的 ES 模块和 CommonJS 模块
         }), // 雖然我們target是es, 但不知道為什麼還是需要commonjs的plugin，才能讓我們export async functions....
        // rollup 编译 typescript 
        rollupTypescript(),
        // babel 配置 
        babel({ 
            // 编译库使用 
            babelHelpers: 'runtime',
            // 只转换源代码，不转换外部依赖 
            exclude: 'node_modules/**', 
            // babel 默认不支持 ts 需要手动添加 
            extensions: [ 
                '.ts', 
            ], 
        }),
        isProduction &&  terser()
    ] 
} 
if (isProduction) { 
    config.plugins.push(terser({ 
        compress: { 
            pure_getters: true, 
            unsafe: true, 
            unsafe_comps: true, 
            warnings: false 
        } 
    })) 
}

const config2 = {
    input: path.resolve(__dirname, 'src/index.ts'),
    output: {
      file: `dist/output.d.ts`,
      format: 'cjs',
    },
    plugins: [dts()],
}

export default [config, config2];