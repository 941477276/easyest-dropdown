import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { exampleTransform } from './plugin/exampleTransform';
import { apiDocTransform } from './plugin/apiDocTransform';
import Components from 'unplugin-vue-components/vite';
import { BsVueResolver } from './plugin/unplugin-vue-components-resolver';

// https://vitejs.dev/config/
const imgSuffixs = ['.jpg', '.jpeg', '.gif', '.png', '.webp', '.bmp'];
const isDev = process.env.NODE_ENV == 'development';

export default defineConfig({
  base: './',
  server: {
    host: '0.0.0.0',
    port: 9527,
    open: true
  },
  plugins: [
    apiDocTransform(),
    exampleTransform(),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    vue({
      // 将 .vue、.md 结尾的文件都使用vue插件进行解析
      include: [/\.vue$/, /\.md$/]
    }),
    Components({
      dts: true,
      resolvers: [
        BsVueResolver({
          // exclude: ['BsButton'], // need to exclude auto-imported components
          importStyle: 'scss' // Which style file to import the component, optional values: boolean, scss, css. Import css style files by default
          // importCss: boolean, // Whether to import the css file of the component
          // importScss: boolean, // Whether to import the scss file of the component
          // resolveIcons: boolean, // Whether to automatically import the icons in the `vue3-bootstrap-icon` icon on demand
          // cjs: boolean, // Whether to import js files in commonjs format
          // packageName: string, // component library name, the default is: bts-vue
        })
      ]
    })
  ],
  build: {
    outDir: '../doc-dist',
    rollupOptions: {
      output: {
        entryFileNames: 'static/js/[name]-[hash].js',
        chunkFileNames: 'static/js/[name]-[hash].js',
        assetFileNames (assetInfo) {
          // console.log('assetInfo', assetInfo);
          let assetDir = '[ext]';
          let isImg = imgSuffixs.some(suffix => {
            return assetInfo.name?.endsWith(suffix);
          });
          if (isImg) {
            assetDir = 'img';
          }
          return `static/${assetDir}/[name]-[hash].[ext]`;
        }
      }
    }
  },
  esbuild: {
    drop: isDev ? [] : ['console', 'debugger'] // 移除代码中的console
  }
});
