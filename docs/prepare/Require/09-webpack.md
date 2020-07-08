# Webpack

[[toc]]

## 1. webpack 热更新原理

1. 当修改了一个或多个文件；
2. 文件系统接收更改并通知 webpack；
3. webpack 重新编译构建一个或多个模块，并通知 HMR 服务器进行更新；
4. HMR Server 使用 webSocket 通知 HMR runtime 需要更新，HMR 运行时通过 HTTP 请求更新 jsonp；
5. HMR 运行时替换更新中的模块，如果确定这些模块无法更新，则触发整个页面刷新。

## 2. webpack 与 grunt、gulp 的不同？

Grunt、Gulp 是基于任务运行的工具：

它们会自动执行指定的任务，就像流水线，把资源放上去然后通过不同插件进行加工，它们包含活跃的社区，丰富的插件，能方便的打造各种工作流。

Webpack 是基于模块化打包的工具:

自动化处理模块,webpack 把一切当成模块，当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

因此这是完全不同的两类工具,而现在主流的方式是用 npm script 代替 Grunt、Gulp,npm script 同样可以打造任务流.

## 3. webpack、rollup、parcel 优劣？

**webpack**： 适用于大型复杂的前端站点构建: webpack 有强大的 loader 和插件生态, 打包后的文件实际上就是一个立即执行函数，这个立即执行函数接收一个参数，这个参数是模块对象，键为各个模块的路径，值为模块内容。立即执行函数内部则处理模块之间的引用，执行模块等,这种情况更适合文件依赖复杂的应用开发.

**rollup**： 适用于基础库的打包，如 vue、d3 等: Rollup 就是将各个模块打包进一个文件中，并且通过 Tree-shaking 来删除无用的代码,可以最大程度上降低代码体积,但是 rollup 没有 webpack 如此多的的如代码分割、按需加载等高级功能，其更聚焦于库的打包，因此更适合库的开发.

**parcel**：适用于简单的实验性项目: 他可以满足低门槛的快速看到效果,但是生态差、报错信息不够全面都是他的硬伤，除了一些玩具项目或者实验项目不建议使用

## 4. 有哪些常见的 Loader？

- file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
- url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
- source-map-loader：加载额外的 Source Map 文件，以方便断点调试
- image-loader：加载并且压缩图片文件
- babel-loader：把 ES6 转换成 ES5
- css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
- style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。
- eslint-loader：通过 ESLint 检查 JavaScript 代码

## 5. 有哪些常见的 Plugin？

- define-plugin：定义环境变量
- html-webpack-plugin：简化 html 文件创建
- uglifyjs-webpack-plugin：通过 UglifyES 压缩 ES6 代码
- webpack-parallel-uglify-plugin: 多核压缩,提高压缩速度
- webpack-bundle-analyzer: 可视化 webpack 输出文件的体积
- mini-css-extract-plugin: CSS 提取到单独的文件中,支持按需加载

## 6. 分别介绍 bundle，chunk，module 是什么

- bundle：是由 webpack 打包出来的文件
- chunk：代码块，一个 chunk 由多个模块组合而成，用于代码的合并和分割
- module：是开发中的单个模块，在 webpack 的世界，一切皆模块，一个模块对应一个文件，webpack 会从配置的 entry 中递归开始找出所有依赖的模块

## 7. Loader 和 Plugin 的不同？

**不同的作用**:

- **Loader**直译为"加载器"。Webpack 将一切文件视为模块，但是 webpack 原生是只能解析 js 文件，如果想将其他文件也打包的话，就会用到`loader`。 所以 Loader 的作用是让 webpack 拥有了加载和解析*非 JavaScript 文件*的能力。
- **Plugin**直译为"插件"。Plugin 可以扩展 webpack 的功能，让 webpack 具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

**不同的用法**:

- **Loader**在`module.rules`中配置，也就是说他作为模块的解析规则而存在。 类型为数组，每一项都是一个`Object`，里面描述了对于什么类型的文件（`test`），使用什么加载(`loader`)和使用的参数（`options`）
- **Plugin**在`plugins`中单独配置。 类型为数组，每一项是一个`plugin`的实例，参数都通过构造函数传入。

## 8. 如何用 webpack 来优化前端性能？

用 webpack 优化前端性能是指优化 webpack 的输出结果，让打包的最终结果在浏览器运行快速高效。

- 压缩代码:删除多余的代码、注释、简化代码的写法等等方式。可以利用 webpack 的`UglifyJsPlugin`和`ParallelUglifyPlugin`来压缩 JS 文件， 利用`cssnano`（css-loader?minimize）来压缩 css
- 利用 CDN 加速: 在构建过程中，将引用的静态资源路径修改为 CDN 上对应的路径。可以利用 webpack 对于`output`参数和各 loader 的`publicPath`参数来修改资源路径
- Tree Shaking: 将代码中永远不会走到的片段删除掉。可以通过在启动 webpack 时追加参数`--optimize-minimize`来实现
- Code Splitting: 将代码按路由维度或者组件分块(chunk),这样做到按需加载,同时可以充分利用浏览器缓存
- 提取公共第三方库: SplitChunksPlugin 插件来进行公共模块抽取,利用浏览器缓存可以长期缓存这些无需频繁变动的公共代码

## 9. 如何提高 webpack 的打包速度?

- happypack: 利用进程并行编译 loader,利用缓存来使得 rebuild 更快,遗憾的是作者表示已经不会继续开发此项目,类似的替代者是[thread-loader](https://github.com/webpack-contrib/thread-loader)
- [外部扩展(externals)](https://webpack.docschina.org/configuration/externals/): 将不怎么需要更新的第三方库脱离 webpack 打包，不被打入 bundle 中，从而减少打包时间,比如 jQuery 用 script 标签引入
- dll: 采用 webpack 的 DllPlugin 和 DllReferencePlugin 引入 dll，让一些基本不会改动的代码先打包成静态资源,避免反复编译浪费时间
- 利用缓存: `webpack.cache`、babel-loader.cacheDirectory、HappyPack.cache 都可以利用缓存提高 rebuild 效率
- 缩小文件搜索范围: 比如 babel-loader 插件,如果你的文件仅存在于 src 中,那么可以`include: path.resolve(__dirname, 'src')`,当然绝大多数情况下这种操作的提升有限,除非不小心 build 了 node_modules 文件

## 10. 如何提高 webpack 的构建速度？

1. 多入口情况下，使用`CommonsChunkPlugin`来提取公共代码
2. 通过`externals`配置来提取常用库
3. 利用`DllPlugin`和`DllReferencePlugin`预编译资源模块 通过`DllPlugin`来对那些我们引用但是绝对不会修改的 npm 包来进行预编译，再通过`DllReferencePlugin`将预编译的模块加载进来。
4. 使用`Happypack` 实现多线程加速编译
5. 使用`webpack-uglify-parallel`来提升`uglifyPlugin`的压缩速度。 原理上`webpack-uglify-parallel`采用了多核并行压缩来提升压缩速度
6. 使用`Tree-shaking`和`Scope Hoisting`来剔除多余代码

## 11. code split 介绍

为了减少 HTTP 请求，通常我们会讲所有代码打包到一个文件中，但是如果文件过大，也会影响页面的加载速度，尤其是会增加白屏时间，所以我们不妨将代码分成一块一块的；并且只在需要的时候去加载它；还可以利用浏览器将这些模块缓存起来；一般情况下分离有两种

- 将第三方代码从业务代码中抽离（verdor）
- 根据不同入口的业务代码按需加载（利用 import()语法）

## 12. webpack 优化

- loader 处理结果缓存

  1. babel-loader 缓存,通过`cacheDirectory`开启缓存
     ```js
     webpack.module.rules:{
       test: /\.js$/,
       use: [
         {
           loader: resolve('babel-loader'),
           options: {
             babelrc: false,
             // 将 babel 编译过的模块缓存在 webpack_cache 目录下，下次优先复用
             cacheDirectory: true,
           },
         },
       ]
     }
     ```
  2. eslint-loader 缓存,通过`cache`选项指定缓存路径；注：配置更后如果不起作用则需要将`cache`文件删除
     ```js
     webpack.module.rules:{
       test: /\.(js|vue)$/,
       enforce: 'pre',
       use: [
         {
           options: {
             // 启动缓存
             cache: true,
           },
           loader: require.resolve('eslint-loader'),
         },
       ]
     }
     ```
  3. css/scss 缓存通过 cache-loader 辅助构建结果缓存

- 缩小编译范围，减少不必要的编译工作

  1. 指定模块解析路径，加速模块查找
     ```js
     webpack.resolve: {  // 指定以下目录寻找第三方模块，避免webpack往父级目录递归搜索
       modules: {
         'node_modules',
         path.resolve(projectDir, 'src'),
         path.resolve(projectDir, 'node_modules')
       }
     }
     ```
  2. 忽略未用模块化的库，不去解析它们以提升编译速度
     ```js
     webpack.module: {
       noParse: /node_modules\/(jQuery|chart\.js)/,
     }
     ```
  3. 为 loader 添加`include/exclude`缩小 babel 的编译范围
     ```js
     webpack.module.rules: {
       test: /\.js$/,
         use: [{
           loader: 'babel-loader',
           query: {
             // 将 babel 编译过的模块缓存在 webpack_cache 目录下，下次优先复用
             cacheDirectory: './webpack_cache/',
           },
         }],
         // 减少 babel 编译范围，忘记设置会让 webpack 编译慢上好几倍
         include: path.resolve(__dirname, 'src'),
     }
     ```

- 通过`webpack-parallel-uglify-plugin`插件开启多个子线程压缩代码
- 通过`Happypack`开启多线程加速 loader 对文件的转换速度
  ```js
  module.exports = {
    module: {
      rules: [
        {
          test: /\.js?$/,
          use: ["happypack/loader?id=babel"],
          include: path.resolve(__dirname, "src")
        }
      ]
    },
    plugins: [
      new HappyPack({
        id: "babel",
        loaders: [
          {
            loader: "babel-loader",
            query: {
              cacheDirectory: "./webpack_cache/"
            }
          }
        ]
      })
    ]
  };
  ```
- 用`DllPlugin`和`DllReferencePlugin`提前打包公共模块；注：不建议将所有公共模块放在 dll 中，否则无法用 webpack 的`代码分割`和`按需加载`功能
- 使用`ModuleConcatenationPlugin`插件开启`scope-hoisting(作用域提升)`功能，尽可能的把打包出来的模块合并到一个函数中去（代码需要符合 es6 的 module 规范）
  > 注意： webpack4 中，去掉了这个插件改为`optimization.concatenateModules`配置，默认`在生产环境是开启的`
- 使用 ES6 模块来开启 `tree shaking`
- 按照路由拆分代码，实现按需加载
- 使用`webpack-bundle-analyzer对`打包文件进行分析，将大文件模块提取出来在 html 中单独加载
  webpack 配置：
  ```js
  // ...
  externals: {
      'element-ui': 'Element',
      'v-charts': 'VCharts'
  }
  ```
  html:
  ```html
  <script src="https://unpkg.com/element-ui@2.10.0/lib/index.js"></script>
  ```
  webpack 持久化缓存

## 13. loader 加载器

loader 本身是一个函数，用于对模块的源代码进行转换，在配置文件的 module.rules 中配置 loader。

### loader 特性

1. 执行顺序：默认从右到左，从下到上
2. 支持链式传递，支持同异步，命名约定为 `xxx-loader`

| 常用 loader         | 功能                                                                                                        |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| css-loader          | 处理 CSS 文件，如 @import/url 等                                                                            |
| style-loader        | 处理 CSS 文件插入到 html 中                                                                                 |
| post-loader         | 补全浏览器前缀，配合 autoprefixer 使用，并先于 css-loader 执行，额外配置文件 .bowerlistrc/postcss.config.js |
| less-loader         | 配合 less 处理                                                                                              |
| sass-loader         | 配合 sass 处理                                                                                              |
| babel-loader        | 处理 ES6 转换，@babel/core @babel/preset-env @babel/plugin-transform-runtime                                |
| eslint-loader       | 处理语法校验                                                                                                |
| file-loader         | 生成文件到 build 目录，并返回地址                                                                           |
| url-loader          | 能限制图片大小转换 base64，超出则类似 file-loader                                                           |
| html-withimg-loader | 处理 html 中的图片命名，与 file-loader 同步                                                                 |
| expose-loader       | 暴露给全局对象                                                                                              |

### loader 类型：

- 前置 loader `enforce: 'pre'` 优先执行
- 后置 loader `enforce: 'post'` 延后执行
- 普通 loader
- 内联 loader `expose?$!jquery`
- 行内 loader `inline-loader!./a.js`

## 14. plugin

plugin 本身是一个具有 `apply()` 方法的类，目的在于解决 loader 无法实现的其它问题。

| 常用 plugin                | 功能                                                |
| -------------------------- | --------------------------------------------------- |
| html-webpack-plugin        | 打包生成 html 文件                                  |
| mini-css-extract-plugin    | 将 CSS 文件抽离成单独文件以 link 方式插入到 html 中 |
| optimize-css-assets-plugin | 处理 CSS 压缩，使用该插件后，需自行处理 js 压缩     |
| uglify-js-plugin           | 处理 js 压缩                                        |
| clean-webpack-plugin       | 处理每次打包清除指定文件夹，默认是 dist             |
| copy-webpack-plugin        | 处理文件拷贝                                        |
| happpack                   | 多线程打包                                          |

webpack 本身也集成了部分常用的 plugin

| webpack/plugin | 功能                                             |
| -------------- | ------------------------------------------------ |
| BannerPlugin   | 向 js 文件插入注释内容                           |
| IgnorePlugin   | 忽略打包指定引用文件，如屏蔽 moment 全语言包引入 |
| DllPlugin      | 用于第三方分离打包                               |
| DefinePlugin   | 定义环境变量                                     |
| ProvidePlugin  | 暴露模块，不必通过 import/require 引用           |

## 15. devtool 的 sourceMap

| 类型                         | 功能                         |
| ---------------------------- | ---------------------------- |
| source-map                   | 增加映射文件，大而全         |
| eval-source-map              | 无单独文件，可显示行列       |
| cheap-module-source-map      | 单独映射文件，显示行不显示列 |
| cheap-module-eval-source-map | 无单独文件，有行无列         |

## 16. 全局变量引入，

- expose-loader 暴露到 window 上；
- webpack.ProvidePlugin 暴露到每个模块；
- CDN 外链与 import 共用时，使用 exteneral 避免重复打包

## 17. webpack-merge 区分打包环境

```js
// webpack.common.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist)
  }
}
```

```js
// webpack.dev.js
const webpackMerge = require('webpack-merge');
module.exports = webpackMerge(common, {
  mode: 'development',
  devServer: {
    port: '8080',
    contentBase: 'dist'
})
```

```js
// webpack.prod.js
const webpackMerge = require("webpack-merge");
module.exports = webpackMerge(common, {
  mode: "production",
  optimization: {
    minimize: true
  }
});
```

```
// 开发环境构建
webpack --config webpack.dev.js
// 生成环境构建
webpack --config webpack.prod.js
```

## 18. webpack 优化

### webpack 内置优化

- tree-shaking
- scope hosting 作用域提升

### 生产环境代码压缩

```js
// 处理 js/css 压缩
module.exports = {
  //...
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  }
};
```

### 抽取公共代码（多页面）

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: "initial",
          name: "common"
        },
        vendor: {
          chunks: "initial",
          test: /node_modules/,
          name: "vendor",
          priority: 1
        }
      }
    }
  }
};
```

### noParse 不解析包的依赖

```js
import $ from 'jquery
```

webpack 默认会去解析引用的包是否有依赖，如上 webpack 会去解析 jquery 这个包是否还有其它依赖项，但 jquery 是个独立的包，并没有其它依赖，因此可使用 noParse 让 webpack 构建时屏蔽对 jquery 包中依赖项进行检查和解析。

```js
module.exports = {
  //...
  module: {
    noParse: /jquery/ // 不去解析 jquery 中的依赖关系
    //...
  }
};
```

### include/exclude

缩小 loader 处理文件的范围：include 包含 / exclude 排除

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve("src"),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            preset: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};
```

### webpack.IgnorePlugin 忽略依赖文件

针对 moment 语言包全部引入的情况下，使用后需手动引入需要的语言包文件。

```js
// 使用 moment
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn"),
  moment()
    .endOf("day")
    .fromNow();
```

```js
// webpack 配置
module.exports = {
  //...
  plugins: [
    new webpack.IgnorePlugin(/\.\/locale/, /moment/)
    // 如果从 moment 中 引入了 ./locale/* 文件，就会自动屏蔽构建
  ]
};
```

### DllPlugin 单独打包第三方公共模块

针对第三包，在开发环境时无需频繁构建，因此可针对第三包单独构建，并生成映射。
[查看源码](https://github.com/ZengLingYong/Blog/tree/master/Webpack/DllPlugin)

### happypack 多线程打包

```js
const Happypack = require("happypack");
module.exports = {
  //...
  plugins: [
    new Happpack({
      id: "css",
      use: ["style-loader", "css-loader"]
    })
  ],
  module: {
    rules: [{ test: /\.css$/, use: "Happypack/loader?id=css" }]
  }
};
```

## 19. webpack 事件机制

Webpack 事件流机制核心：Tapable，类似 NodeJs 的 events 库，原理是 "发布订阅模式"

```js
const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParalleHook,
  AsyncParelleBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfailHook
} = require("tapable");
```

| Tabable 钩子             | 功能                                                                            |
| ------------------------ | ------------------------------------------------------------------------------- |
| SyncHook                 | 同步钩子，顺序执行 forEach                                                      |
| SyncBailHook             | 同步容断钩子，当某个 tap 事件有返回值时（非 undefined)，中断后续执行 do...while |
| SyncWaterfallHook        | 同步瀑布钩子，钩子回调函数数据往下传递 reduce                                   |
| SyncLoopHook             | 同步多次执行，当某个 tap 事件有返回值时（非 undefined)，循环执行                |
| AsyncParalleHook         | 异步并行钩子，每个 tapAsync 事件调用回调，所有都执行方可执行 caaSync 的回调     |
| AsyncParalleBailHook     | 异步并行容断钩子                                                                |
| AsyncSeriesHook          | 异步串行钩子                                                                    |
| AsyncSeriesBailHook      | 异步串行容断钩子                                                                |
| AsyncSeriesWaterfallHook | 异步串行瀑布钩子                                                                |

- Sync 同步钩子使用 `tap/call`
- Async 异步钩子使用 `tapAsync/callAsync` 和 `tapPromie/promise`

## 20. 打包体积 优化思路

1. 提取第三方库或通过引用外部文件的方式引入第三方库
2. 代码压缩插件 UglifyJsPlugin
3. 服务器启用 gzip 压缩
4. 按需加载资源文件 require.ensure
5. 优化 devtool 中的 source-map
6. 剥离 css 文件，单独打包
7. 去除不必要插件，通常就是开发环境与生产环境用同一套配置文件导致

## 21. 打包效率

1. 开发环境采用增量构建，启用热更新
2. 开发环境不做无意义的工作如提取 css 计算文件 hash 等
3. 配置 devtool
4. 选择合适的 loader
5. 个别 loader 开启 cache 如 babel-loader
6. 第三方库采用引入方式
7. 提取公共代码
8. 优化构建时的搜索路径 指明需要构建目录及不需要构建目录
9. 模块化引入需要的部分

## 22. Loader 编写一个 loader

loader 就是一个 node 模块，它输出了一个函数。当某种资源需要用这个 loader 转换时，这个函数会被调用。并且，这个函数可以通过提供给它的 this 上下文访问 Loader API。

reverse-txt-loader

```js
// reverse-txt-loader
// 定义
module.exports = function(src) {
  //src是原文件内容（abcde），下面对内容进行处理，这里是反转
  var result = src.split('').reverse().join('');
  //返回JavaScript源码，必须是String或者Buffer
  return `module.exports = '${result}'`;
}

// 使用
{
  test: /\.txt$/,
  use: [
    {
      './path/reverse-txt-loader'
     }
  ]
},
```

## 23. 定义环境变量

当我们在配置的时候，需要区分所配置的属性参数是属于生产环境还是开发环境。每个环境对应的配置都不同。这就是环境变量最重要的意义

当然，要实现上面所说的效果，就需要用到 webpack 内置插件`webpack.DefinePlugin`

环境变量配置

```js
//webpack.config.js
let webpack = require('webpack');
plugins:[
    new webpack.DefinePlugin({
        //DEV:'dev'//这样独到的DEV是dev，但是dev是变量，而不是字符串，如果要是字符串，那就应该写成“’dev‘”
		//上面的写法比较恶心，要用两个引号，那么可以换下面这种方式
		DEV:JSON.stringify('dev'),//解析出来的就是“’dev‘”
		EXPRESSION:'1+1',//这样解析出来就是2，而不是'1+1'，如果要解析出来是'1+1',那就应该写成JSON.stringify('1+1')
		FLAG：'true',//解析出来就是true
		//注意，这个大写的变量名称，是随你定义的
    })
]
```

## 24. 区分不同环境(生产与开发环境)

> 对 webpack.config.js 分成两个文件，一个用于开发，一个用于生产

```
项目根目录
    |
    --------webpack.base.js  //基本配置 公共配置 （原先我们写的webpack.config.js）
    |
    --------webpack.dev.js     //开发环境
    |
    --------weboack.prod.js    //生产环境
```

安装插件 `webpack-merge`: `npm i webpack-merge -D`

> 这个插件内部有个`smart`函数，其作用：`合并两个配置文件`

写开发环境和生产环境的配置文件

```js
//webpack.dev.js开发环境
let { smart } = require("webpack-merge");
let base = require("./webpack.base.js");

modules.exports = smart(base, {
  //这样就能够让后面的对象的属性覆盖到base对象的属性
  mode: "development",
  devServer: {},
  devtool: "source-map"
});
```

```js
//webpack.prod.js
let { smart } = require("webpack-merge");
let base = require("./webpack.base.js");

modules.exports = smart(base, {
  mode: "production",
  optioization: {
    minimizer: []
  },
  plugins: []
});
```

## 25. 打包多页应用

1. 首先，多页应用应该有多个 js 文件，那么新建如下：

   ```js
   src------index.js
         |
         ----other.js

   //index.js
   console.log('home');

   //other.js
   console.log('other');
   ```

2. 初始化这个项目
   ```bash
   npm init
   npm i webpack webpack-cli -D
   ```
3. 新建并配置 webpack.config.js

   1. 多入口文件，那么 entry 就不能写成字符串形式，应该是一个对象
   2. 出口，因为是多入口，所以出口也是多个，要配置成动态名字

   ```js
   let path = require("path");
   module.exports = {
     entry: {
       home: "./index.js",
       other: "./other.js"
     },
     output: {
       filename: "[name]:[hash:8].js",
       path: path.resolve(__dirname, "./dist")
     }
   };
   ```

4. 创建 html 文件

   ```
   node_modules
     |
   package.json
     |
   src------index.js
     |     |
     |      ----other.js
     |
   webpack.config.js
     |
   index.html
   ```

   > 虽然是多个入口 js，但是 html 创建只需要一个就可以了，然后更具多个入口 js，打包生成多个 html

由于是多个入口，根据插件要求，2 个入口就要 new 两次`HtmlWebpackPlugin`，然后分别配置

```js {3,6,7,14,19}
//webpack.config.js
let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: {
    home: "./index.js",
    other: "./other.js"
  },
  output: {
    filename: "[name]:[hash:8].js",
    path: path.resolve(__dirname, "./dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "home.html",
      chunks: ["home"] //chunks代表代码块，也就是说，home.html中引入的对应js是entry为home的js，如果要引入other.js，那么这里就写['other']；如果两个都要，那么就写成['home','other']
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "other.html",
      chunks: ["other"]
    })
  ]
};
```

## 26. Babel 的原理是什么?

babel 的转译过程也分为三个阶段，这三步具体是：

1. 解析 Parse: 将代码解析生成抽象语法树( 即 AST )，即词法分析与语法分析的过程
2. 转换 Transform: 对于 AST 进行变换一系列的操作，babel 接受得到 AST 并通过 babel-traverse 对其进行遍历，在此过程中进行添加、更新及移除等操作
3. 生成 Generate: 将变换后的 AST 再转换为 JS 代码, 使用到的模块是 babel-generator

<img :src="$withBase('/images/prepare/require/2019102401.png')" alt="images/prepare/require/2019102401.png">

## 27. 改造 webpack.config.js，实现多线程打包 js

```js
let HappyPack = require('happypack');

module.exports = {
  ...
  module: {
    rules: [{
      test: /\.js$/,
      use: 'HappyPack/loader?id=js' //这个id=js就代表这是打包js的
    }]
  },
  plugins: [
    new HappyPack({
      id: 'js', // 这个id: js就代表这是打包js的
      use: [{ //use是一个数组，这里写原先在rules的use里的loader配置
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/presets-env',
            '@babel/presets-react'
          ]
        }
      }]
    })
  ]
}
```

## 28. 实现 js 和 css 的多线程打包

```js
let HappyPack = require('happypack');

module.exports = {
  ...
  module: {
    rules: [{
        test: /\.js$/,
        use: 'HappyPack/loader?id=js' //这个id=js就代表这是打包js的
      },
      {
        test: /\.css$/,
        use: 'HappyPack/loader?id=css' //这个id=css就代表这是打包css的
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'css', // 这个id: js就代表这是打包js的
      use: ['style-loader', 'css-loader']
    }),
    new HappyPack({
      id: 'js', // 这个id: js就代表这是打包js的
      use: [{ //use是一个数组，这里写原先在rules的use里的loader配置
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/presets-env',
            '@babel/presets-react'
          ]
        }
      }]
    })
  ]
}
```

## 29. 懒加载

1. 案例情景：
   > 当我点击按钮的时候，需要动态去加载 resource.js，并读取该文件导出的内容

```js
//index.js
/*在页面上有一个按钮，点击按钮去加载资源resource.js*/
let button = document.createElement("button");

button.innerHTML = "点击";

button.addEventListener("click", function() {
  console.log("click");
  //es6草案中的语法,利用jsonp实现动态加载文件
  //直接使用不支持，需要利用语法动态导入的插件@babel/plugin-syntax-dynamic-import
  //vue的懒加载  react的懒加载都是这个原理，打包的时候会打包好resource.js文件，然后按需去动态加载
  import("./resource.js").then(data => {
    console.log(data.default); //数据是放在data的default属性里的
  });
});

document.body.appendChild(button);

//resource.js
export default "youhuaResource";
```

2. 在上述代码中，直接使用`import()`去动态加载资源，是 es6 草案中语法，并不是正式语法，所以直接使用会报错，需要配置相关的语法动态导入的插件`@babel/plugin-syntax-dynamic-import`，并在 webpack 中做简单配置:

```js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        }
      }
    ]
  },
  ...
}
```

3. 配置完后，`import()`动态加载返回的是一个`promise`，得到的数据是存在`.then`的回调函数的`data.default`属性中的。

## 30. babel-loader.js

```js
/**
 * babel-loader
 * 功能：转化 ES6
 * 包依赖：
 * 1. @babel/core
 * 2. @babel/preset-env
 * 3. loader-utils
 */

let babel = require("@babel/core");
let loaderUtils = require("loader-utils");

function loader(source) {
  let options = loaderUtils.getOptions(this);
  let cb = this.async();
  babel.transform(
    source,
    {
      ...options,
      filename: this.resourcePath.split("/").pop(),
      sourceMaps: true
    },
    (err, result) => {
      cb(null, result.code, result.map);
    }
  );
}

module.exports = loader;
```

## 31. banner-loader.js

```js
/**
 * banner-loader
 * 功能：向输出文件添加注释内容
 * 包依赖：
 * 1. loader-utils
 * 2. schema-utils 验证 options 参数
 */

let loaderUtls = require("loader-utils");
let validateOptions = require("schema-utils");
let fs = require("fs");

function loader(source) {
  this.cacheable && this.cacheable(false); // 不开启缓存
  let cb = this.async();
  let options = loaderUtls.getOptions(this);
  let schema = {
    type: "object",
    properties: {
      text: {
        type: "string"
      },
      filename: {
        type: "string"
      }
    }
  };
  validateOptions(schema, options, "banner-loader");

  if (options.filename) {
    // 将文件加入依赖，文件变化 webpack 会重新打包
    this.addDependency(options.filename);
    fs.readFile(options.filename, "utf8", (err, data) => {
      cb(err, `/**${data}**/${source}`);
    });
  } else {
    cb(null, `/**${options.text}**/${source}`);
  }
}

module.exports = loader;
```

## 32. file-loader.js

```js
/**
 * file-loader
 * 功能：根据文件生成一个 md5 发射到输出目录，返回当前文件路径
 * 包依赖：loader-utils
 */

let loaderUtils = require("loader-utils");

function loader(source) {
  let filename = loaderUtils.interpolateName(this, "[hash:8].[ext]", {
    content: source
  });

  this.emitFile(filename, source); // 发射文件到输出目录
  return `module.exports = "${filename}"`;
}
loader.raw = true; // source 已被转成二进制

module.exports = loader;
```

## 33. url-loader.js

```js
/**
 * url-loader
 * 功能：小于限制以 base64 插入文件，否则调用 file-loader 执行
 * 包依赖：
 * 1. loader-utils
 * 2. mime
 * 3. file-loader
 */

const loaderUtls = require("loader-utils");
const mime = require("mime");

function loader(source) {
  const { limit } = loaderUtls.getOptions(this);

  if (limit && limit > source.length) {
    return `module.exports="data:${mime.getType(
      this.resourcePath
    )};base64,${source.toString("base64")}"`;
  } else {
    return require("file-loader").call(this, source);
  }
}

loader.raw = true; // source 已被转成二进制

module.exports = loader;
```

## 34. loader 的执行顺序为什么是后写的先执行

其实为啥是从右往左，而不从左往右，只是 Webpack 选择了 compose 方式，而不是 pipe 的方式而已，在技术上实现从左往右也不会有难度

在 Uninx 有 pipeline 的概念，平时应该也有接触，比如 ps aux | grep node，这些都是从左往右的。

但是在函数式编程中有组合的概念，我们数学中常见的 f(g(x))，在函数式编程一般的实现方式是从右往左，如

```js
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const add1 = n => n + 1; //加1
const double = n => n * 2; // 乘2
const add1ThenDouble = compose(double, add1);
add1ThenDouble(2); // 6
// ((2 + 1 = 3) * 2 = 6)
```

这里可以看到我们先执行的加 1，然后执行的 double，在 compose 中是采用 reduceRight，所以我们传入参数的顺序编程了先传入 double，后传入 add1

那么其实也可以实现从左往右

```js
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const add1ThenDouble = pipe(add1, double);
add1ThenDouble(2); // 6
// ((2 + 1 = 3) * 2 = 6)
```

所以只不过 webpack 选择了函数式编程的方式，所以 loader 的顺序编程了从右往左，如果 webpack 选择了 pipe 的方式，那么大家现在写 loader 的时候的顺序就变成从左往右了

```js
compose: require("style-loader!css-loader!sass-loader!./my-styles.sass");

pipe: require("./my-styles.sass!sass-loader!css-loader!style-loader");
```

## 35. webpack 性能优化

优化可以从两个方面考虑，一个是`优化开发体验`，一个是`优化输出质量`。

**优化开发体验**

- 缩小文件搜索范围。涉及到 webpack 如何处理导入文件，不再赘述，不会的可以自行搜索。由于 loader 对文件转换操作很耗时，应该尽量减少 loader 处理的文件，可以使用 include 命中需要处理的文件，缩小命中范围。
- 使用 DllPlugin，提升构建速度
- 使用 happyPack 开启多线程
- 使用 UglifyJs 压缩代码(只支持 es5)，uglifyes 支持 es6，两个插件不能同时开启。使用 ParalellUgifyPlugin 开启多个子进程压缩，既支持 UglifyJs 又支持 uglifyes
- 使用自动刷新：监听到代码改变后，自动编译构建可运行代码并刷新页面
- 开启模块热替换:在不刷新网页的同时实现实时预览

**优化输出质量**减少首屏加载时间

- 区分环境
- 压缩代码
- CDN 加速
- 使用 Tree shaking
- 提取公共代码
- 按需加载
- 提升流畅度，即代码性能:
- 使用 PrePack 优化代码运行时的效率
- 开启 Scope Hoisting，让 webpack 打包出来的代码更小、运行更快

## 36. 有没有去研究 webpack 的一些原理和机制，怎么实现的

1. 解析 webpack 配置参数，合并从 shell 传入和 webpack.config.js 文件里配置的参数，生产最后的配置结果。
2. 注册所有配置的插件，好让插件监听 webpack 构建生命周期的事件节点，以做出对应的反应。
3. 从配置的 entry 入口文件开始解析文件构建 AST 语法树，找出每个文件所依赖的文件，递归下去。
4. 在解析文件递归的过程中根据文件类型和 loader 配置找出合适的 loader 用来对文件进行转换。
5. 递归完后得到每个文件的最终结果，根据 entry 配置生成代码块 chunk。
6. 输出所有 chunk 到文件系统。

## 37. webpack 运行流程

分为**初始化**、**编译**、**输出**三个阶段.

1. 初始化：
   1. 从配置文件和 shell 文件读取、合并参数；
   2. 加载 plugin
   3. 实例化 compiler
2. 编译
   1. 从 entry 发出，针对每个 module 串行调用对应 loader 翻译文件内容
   2. 找到 module 依赖的 module，递归进行编译处理
3. 输出
   1. 把编译后 module 组合成 chunk
   2. 把 chunk 转换成文件，输出到文件系统

## 38. webpack 的构建流程是什么?

Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
3. 确定入口：根据配置中的 entry 找出所有的入口文件；
4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
5. 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

## 39. webpack5 做了哪些事情

- 使用长期缓存提升编译速度
- 使用更好的算法和默认值来改善长期缓存
- 通过更好的 Tree Shaking 和 Code Generation 来改善 bundle 大小
- 重构内部结构，在不引入任何重大更改的情况下实现 v4 的功能
- 通过引入重大更改来为将来的功能做准备，以使我们能够尽可能长时间的使用 v5

## 40.
