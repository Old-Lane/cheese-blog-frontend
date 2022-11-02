import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers'
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";
import WindiCSS from "vite-plugin-windicss"
import * as path from "path";

const pathSrc = resolve(__dirname, './src')
export default defineConfig({
    plugins: [
        vue(),
        WindiCSS(),
        AutoImport({
            imports: [
                'vue',
                {
                    'naive-ui': [
                        'useDialog',
                        'useMessage',
                        'useNotification',
                        'useLoadingBar'
                    ]
                }
            ],
            dts: resolve(pathSrc, 'auto-imports.d.ts'),
        }),
        Components({
            resolvers: [NaiveUiResolver()]
        }),
        createSvgIconsPlugin({
            // 指定需要缓存的图标文件夹
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
            // 指定symbolId格式
            symbolId: 'icon-[dir]-[name]'
        })
    ],
    resolve: {
        alias: {
            '@': pathSrc
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "./src/styles/index.scss";'
            }
        }
    },
    server: {
        port: 5000
    }
})
