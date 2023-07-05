const path = require('path');
const fs = require('fs');
const { defineConfig, build } = require('vite');
const vue = require('@vitejs/plugin-vue');
const vueJsx = require('@vitejs/plugin-vue-jsx');
const utils = require('./utils');
// const os = require('os');
const nodeCMD = require('node-cmd');

// 外部依赖列表
const externalList = ['vue', '@vue/shared'];

// 修改作为外部依赖的文件后缀名为.js的rollup插件
const modifyExternalImportFileExtToJs = function () {
  let externalSuffixs = ['.vue', '.ts', '.tsx', '.jsx', '.scss'];
  let excludeFiles = ['/version.ts', '/version'];
  return {
    name: 'modify-external-import-file-ext-to-js',
    resolveId: {
      order: 'pre', // 该钩子函数必须提前运行，否则不会执行到
      handler (source, importer, options) {
        // console.log('source: ', source);
        let isExcludeFile = excludeFiles.some(fileName => source.endsWith(fileName));
        if (isExcludeFile) {
          return;
        }
        let isExternalListExternal = externalList.some(externalItem => source.startsWith(externalItem));
        // 将src目录下的所有文件及vue3-bootstrap-icon图标都视为外部依赖
        if ((source.startsWith('./') || source.startsWith('../')) || isExternalListExternal) {
          let result = {
            external: true,
            id: source
          };
          let isExternal = externalSuffixs.some(suffix => source.endsWith(suffix));
          // 修改打包后的文件中的外部依赖导入的后缀名为js，否则在使用时会报错
          if (isExternal) {
            let newSource = source;
            /* if (source.endsWith('.scss')) {
              newSource = newSource.replace('.scss', '.css');
            } else {
              newSource = newSource.replace('.vue', '.js');
              newSource = newSource.replace('.ts', '.js');
              newSource = newSource.replace('.tsx', '.js');
              newSource = newSource.replace('.js', '.js');
            } */
            newSource = newSource.replace('.vue', '.js');
            newSource = newSource.replace('.ts', '.js');
            newSource = newSource.replace('.tsx', '.js');
            newSource = newSource.replace('.js', '.js');
            result.id = newSource;
          }
          // console.log('result', result);
          return result;
        }
      }
    }
  };
};

/**
 * 将vue、ts、tsx、js文件转成js
 * @param entry 入口文件
 * @param outDir 输出目录
 * @param fileName 输出的文件名称
 * @param formats 打包后的js的格式，支持es、cjs、amd、iife、umd、system
 */
async function buildVueFileToJs (entry, outDir, fileName, formats = 'es') {
  const rollupOptions = {
    // 确保外部化处理那些你不想打包进库的依赖
    // external: ['vue', 'dayjs', 'vue3-bootstrap-icon', 'bignumber.js', 'async-validator', '@popperjs/core'],
    external: externalList,
    output: {
      globals: {
        vue: 'Vue' // 在 umd / iife 模式 中，将vue作为外部依赖
      }
    }
    // plugins: [modifyExternalImportFileExtToJs()]
  };
  await build(defineConfig({
    configFile: false,
    publicDir: false,
    plugins: [vue(), vueJsx()],
    logLevel: 'warn',
    build: {
      target: 'es2015',
      rollupOptions,
      emptyOutDir: false,
      lib: {
        entry: entry,
        name: fileName,
        fileName: fileName,
        formats: Array.isArray(formats) ? formats : [formats]
      },
      outDir: outDir
    },
    css: {
      postcss: {
        plugins: [
          require('autoprefixer')({
            overrideBrowserslist: [
              'Android 4.1',
              'iOS 7.1',
              'ie >= 10',
              '> 0.3%'
            ],
            grid: true
          })
        ]
      }
    },
    esbuild: {
      drop: ['console', 'debugger'] // 移除代码中的console
    }
  }));
}

/* buildVueFileToJs(
  path.resolve(__dirname, '../src/components/bs-button/style/bs-button.scss'),
  path.resolve(__dirname, '../es/components/bs-button/style'),
  'bs-button',
  'es'
); */

/**
 * 构建css
 * @param entry
 * @param outDir
 * @param fileName
 * @param formats
 * @returns {Promise<void>}
 */
async function buildCss (entry, outDir, fileName, formats = 'es') {
  await buildVueFileToJs(
    entry,
    outDir,
    fileName,
    formats
  );
  let { dir: entryFileDir } = path.parse(entry);
  // vite构建scss文件后会生成 {fileName}.js、style.css，这里我们需要将{fileName}.js删掉，style.css重命名为{fileName}.scss
  utils.deleteFile(`${outDir}${path.sep}${fileName}.mjs`);
  utils.deleteFile(`${outDir}${path.sep}${fileName}.js`);
  // 重命名style.css为{fileName}.css
  let styleFilePath = `${outDir}${path.sep}style.css`;
  if (fs.existsSync(styleFilePath)) {
    fs.renameSync(`${outDir}${path.sep}style.css`, `${outDir}${path.sep}${fileName}.css`);
  }
  // 复制index.ts到目标目录
  // utils.copy(`${entryFileDir}${path.sep}index.ts`, `${outDir}${path.sep}index.ts`);
  // 复制源scss到目标目录
  // utils.copy(entry, `${outDir}${path.sep}${fileName}.scss`);
};

/* buildCss(
  path.resolve(__dirname, '../src/components/bs-button/style/bs-button.scss'),
  path.resolve(__dirname, '../es/components/bs-button/style'),
  'bs-button',
  'es'
); */

/**
 *  生成 .d.ts 类型文件并拷贝到目标目录
 * @param globby
 * @param targetDir
 */
function doTsc (globby, targetDir) {
  console.log('生成ts类型文件中...');
  let startTime = new Date().getTime();
  let tsFilePaths = globby.globbySync('(src/**/*-types.ts)|src/components/**/(components|index|types).ts|src/utils/*.ts|src/hooks/*.ts');
  // console.log(tsFilePaths);
  // return;
  // 使用vue-tsc生成ts类型文件
  nodeCMD.runSync(`vue-tsc ${tsFilePaths.join(' ')} --declaration --emitDeclarationOnly`);
  let descFileNames = ['bs-dropdown-transition-types.d', 'BsDropdownTransition.d', 'index.d', 'useDropdownDirection.d'];
  // 复制ts类型文件到目标目录
  globby.globbySync('src/**/*.d.ts').forEach(filePath => {
    // console.log(filePath);
    if (filePath.endsWith('declaration.d.ts') || filePath.endsWith('shims-vue.d.ts')) {
      return;
    }
    let { dir, name } = path.parse(filePath);
    // utils.copy(filePath, filePath.replace('src/', targetDir + '/').replace('.vue', ''));
    if (descFileNames.includes(name)) {
      utils.copy(filePath, path.resolve(__dirname, `../${targetDir}/${name}.ts`).replace('.vue', ''));
    }
    utils.deleteFile(filePath);
  });
  console.log(`生成ts类型文件完成，耗时：${new Date().getTime() - startTime}ms！`);
}

/**
 * 构建组件库
 * @param format 打包后的格式
 * @returns {Promise<void>}
 */
async function buildLib (format = 'es') {
  // 用于模式匹配目录文件
  const globby = await import('globby');
  const targetFileParentDir = format == 'cjs' ? 'lib' : 'es';

  let targetDir = path.resolve(__dirname, `../vue3/${targetFileParentDir}`);
  let name = 'easyest-dropdown';
  await buildVueFileToJs(
    path.resolve(__dirname, '../src/components/bs-dropdown-transition/index.ts'),
    targetDir,
    'index',
    format
  );
  // console.log('filePath', filePath);
  // 构建组件目录下的scss文件
  await buildCss(
    path.resolve(__dirname, '../src/components/bs-dropdown-transition/easy-dropdown-transition.scss'),
    targetDir,
    name,
    format
  );

  // 重命名.mjs为.js
  if (format == 'es') {
    let startTime = new Date().getTime();
    let mjsFilePaths = globby.globbySync('vue3/es/**/*.mjs');
    console.log('重命名.mjs为.js中...', mjsFilePaths);
    mjsFilePaths.forEach(mjsFilePath => {
      fs.renameSync(mjsFilePath, mjsFilePath.replace('.mjs', '.js'));
    });
    console.log(`重命名.mjs为.js完成，耗时：${new Date().getTime() - startTime}ms！`);
  }
  // 生成 .d.ts 文件
  doTsc(globby, 'vue3/' + targetFileParentDir);
};

// buildLib();
// buildLib('cjs');

/**
 * 构建浏览器可直接访问的js库
 * @param format 构建的js库格式，支持iife、umd
 * @returns {Promise<void>}
 */
async function buildDistLib (format) {
  const outDir = path.resolve(__dirname, '../dist');
  if (!format || (format && (format != 'iife' && format != 'umd'))) {
    format = 'umd';
  }
  await build(defineConfig({
    configFile: false,
    publicDir: false,
    plugins: [vue(), vueJsx()],
    // logLevel: 'warn',
    build: {
      target: 'es2015',
      sourcemap: true,
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        // external: ['vue', 'dayjs', 'vue3-bootstrap-icon', 'bignumber.js', 'async-validator', '@popperjs/core'],
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue' // 在 umd / iife 模式 中，将vue作为外部依赖
          }
          // exports: 'default' // 使用默认导出
        },
        plugins: [
          {
            writeBundle (options) { // 文件写入磁盘后的回调函数
              // 重命名js文件
              fs.renameSync(path.resolve(outDir, 'easyest-dropdown.umd.js'), path.resolve(outDir, 'easyest-dropdown.js'));
              fs.renameSync(path.resolve(outDir, 'easyest-dropdown.umd.js.map'), path.resolve(outDir, 'easyest-dropdown.js.map'));
            }
          }
        ]
      },
      emptyOutDir: false,
      lib: {
        entry: path.resolve(__dirname, '../src/components/bs-dropdown-javascript/easyest-dropdown.ts'),
        name: 'easyestDropdown',
        fileName: 'easyest-dropdown',
        formats: [format]
      },
      outDir
    },
    define: {
      'process.env': {}
    },
    css: {
      postcss: {
        plugins: [
          require('autoprefixer')({
            overrideBrowserslist: [
              'Android 4.1',
              'iOS 7.1',
              'ie >= 10',
              '> 0.3%'
            ],
            grid: true
          })
        ]
      }
    },
    esbuild: {
      drop: ['console', 'debugger'] // 移除代码中的console
    }
  }));

  /**
   * 构建css完成后的插件
   * @param fileName 文件名称
   * @returns {{writeBundle(*): void}}
   */
  let onGenerateCssEnd = function (fileName) {
    return {
      writeBundle (options) { // 文件写入磁盘后的回调函数
        let jsFilePath = path.resolve(outDir, `./${fileName}.mjs`);
        // 删除构建css后余留的js文件
        utils.deleteFile(jsFilePath);
        // 重命名style.css为bts-vue.css
        fs.renameSync(path.resolve(outDir, 'style.css'), path.resolve(outDir, `${fileName}.css`));
      }
    };
  };

  /**
   * 构建dist css
   * @param entry 入口文件
   * @param fileName css文件名称
   * @returns {Promise<void>}
   */
  let buildDistCss = async function (entry, fileName) {
    await build(defineConfig({
      configFile: false,
      publicDir: false,
      plugins: [vue(), vueJsx()],
      logLevel: 'warn',
      build: {
        target: 'es2015',
        rollupOptions: {
          plugins: [onGenerateCssEnd(fileName)]
        },
        emptyOutDir: false,
        lib: {
          entry: entry,
          name: fileName,
          fileName: fileName,
          formats: ['es']
        },
        outDir
      },
      css: {
        postcss: {
          plugins: [
            require('autoprefixer')({
              overrideBrowserslist: [
                'Android 4.1',
                'iOS 7.1',
                'ie >= 10',
                '> 0.3%'
              ],
              grid: true
            })
          ]
        }
      }
    }));
  };

  let tscFilePath = path.resolve(__dirname, '../src/components/bs-dropdown-javascript/easyest-dropdown.d.ts');
  // 生成ts类型描述文件
  await nodeCMD.runSync('tsc ./src/components/bs-dropdown-javascript/easyest-dropdown.ts --declaration --emitDeclarationOnly');
  utils.copy(tscFilePath, path.resolve(__dirname, '../dist/easyest-dropdown.d.ts'));
  utils.deleteFile(tscFilePath);

  await buildDistCss(path.resolve(__dirname, '../src/components/bs-dropdown-transition/easy-dropdown-transition.scss'), 'easyest-dropdown');
}

// buildDistLib();

;(async function (){
  let args = process.argv.slice(2);
  let formatParamNameIndex = args.findIndex(paramName => paramName === '--format');
  let format = '';
  if (formatParamNameIndex > -1) {
    format = args[formatParamNameIndex + 1];
  }
  if (format) {
    console.log(`【构建 ${format} 格式组件】`);
    if (format != 'iife' && format != 'umd') {
      await buildLib(format);
    } else {
      await buildDistLib(format);
    }
  } else {
    console.log('【构建所有格式组件】');
    await buildDistLib();
    await buildLib('es');
    await buildLib('cjs');
  }
})();
