# Webpack 优化

[[toc]]

## 1. 缩小文件搜索范围

Webpack 启动后会从配置的 Entry 出发，解析出文件中的导入语句，再递归的解析。 在遇到导入语句时 Webpack 会做两件事情：

1. 根据导入语句去寻找对应的要导入的文件。例如 `require('react')` 导入语句对应的文件是 `./node_modules/react/react.js`，`require('./util')` 对应的文件是 `./util.js`。
2. 根据找到的要导入文件的后缀，使用配置中的 Loader 去处理文件。例如使用 ES6 开发的 JavaScript 文件需要使用 babel-loader 去处理。

以上两件事情虽然对于处理一个文件非常快，但是当项目大了以后文件量会变的非常多，这时候构建速度慢的问题就会暴露出来。 虽然以上两件事情无法避免，但需要尽量减少以上两件事情的发生，以提高速度。

接下来一一介绍可以优化它们的途径。

### 1.1 优化 loader 配置

由于 Loader 对文件的转换操作很耗时，需要让尽可能少的文件被 Loader 处理。

使用 `Loader` 时可以通过 `test` 、 `include` 、 `exclude` 三个配置项来命中 Loader 要应用规则的文件。 为了尽可能少的让文件被 Loader 处理，可以通过 `include` 去命中只有哪些文件需要被处理。

以采用 ES6 的项目为例，在配置 babel-loader 时，可以这样：

```js
module.exports = {
  module: {
    rules: [
      {
        // 如果项目源码中只有 js 文件就不要写成 /\.jsx?$/，提升正则表达式性能
        test: /\.js$/,
        // babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
        use: ["babel-loader?cacheDirectory"],
        // 只对项目根目录下的 src 目录中的文件采用 babel-loader
        include: path.resolve(__dirname, "src")
      }
    ]
  }
};
```

> 可以适当的调整项目的目录结构，以方便在配置 Loader 时通过 `include` 去缩小命中范围。

### 1.2 优化 resolve.modules 配置

`resolve.modules` 用于配置 Webpack 去哪些目录下寻找第三方模块。

`resolve.modules` 的默认值是 `['node_modules']`，含义是先去当前目录下的 `./node_modules` 目录下去找想找的模块，如果没找到就去上一级目录 `../node_modules` 中找，再没有就去 `../../node_modules` 中找，以此类推，这和 Node.js 的模块寻找机制很相似。

当安装的第三方模块都放在项目根目录下的 `./node_modules` 目录下时，没有必要按照默认的方式去一层层的寻找，可以指明存放第三方模块的绝对路径，以减少寻找，配置如下：

```js
module.exports = {
  resolve: {
    // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
    // 其中 __dirname 表示当前工作目录，也就是项目根目录
    modules: [path.resolve(__dirname, "node_modules")]
  }
};
```

### 1.3 优化 resolve.mainFields 配置

`resolve.mainFields` 用于配置第三方模块使用哪个入口文件。

安装的第三方模块中都会有一个 `package.json` 文件用于描述这个模块的属性，其中有些字段用于描述入口文件在哪里，`resolve.mainFields` 用于配置采用哪个字段作为入口文件的描述。

可以存在多个字段描述入口文件的原因是因为有些模块可以同时用在多个环境中，针对不同的运行环境需要使用不同的代码。 以 isomorphic-fetch 为例，它是 fetch API 的一个实现，但可同时用于浏览器和 Node.js 环境。 它的 `package.json` 中就有 2 个入口文件描述字段：

```json
{
  "browser": "fetch-npm-browserify.js",
  "main": "fetch-npm-node.js"
}
```

> isomorphic-fetch 在不同的运行环境下使用不同的代码是因为 fetch API 的实现机制不一样，在浏览器中通过原生的 `fetch` 或者 `XMLHttpRequest` 实现，在 Node.js 中通过 `http` 模块实现。

resolve.mainFields 的默认值和当前的 `target` 配置有关系，对应关系如下：

- 当 `target` 为 `web` 或者 `webworker` 时，值是 `["browser", "module", "main"]`
- 当 `target` 为其它情况时，值是 `["module", "main"]`

以 target 等于 `web` 为例，Webpack 会先采用第三方模块中的 `browser` 字段去寻找模块的入口文件，如果不存在就采用 `module` 字段，以此类推。

为了减少搜索步骤，在你明确第三方模块的入口文件描述字段时，你可以把它设置的尽量少。 由于大多数第三方模块都采用 `main` 字段去描述入口文件的位置，可以这样配置 Webpack：

```js
module.exports = {
  resolve: {
    // 只采用 main 字段作为入口文件描述字段，以减少搜索步骤
    mainFields: ["main"]
  }
};
```

> 使用本方法优化时，需要考虑到所有运行时依赖的第三方模块的入口文件描述字段，就算有一个模块搞错了都可能会造成构建出的代码无法正常运行。

### 1.4 优化 resolve.alias 配置

resolve.alias 配置项通过别名来把原导入路径映射成一个新的导入路径。

在实战项目中经常会依赖一些庞大的第三方模块，以 React 库为例，安装到 node_modules 目录下的 React 库的目录结构如下：

```
├── dist
│   ├── react.js
│   └── react.min.js
├── lib
│   ... 还有几十个文件被忽略
│   ├── LinkedStateMixin.js
│   ├── createClass.js
│   └── React.js
├── package.json
└── react.js
```

可以看到发布出去的 React 库中包含两套代码：

- 一套是采用 CommonJS 规范的模块化代码，这些文件都放在 `lib` 目录下，以 `package.json` 中指定的入口文件 `react.js` 为模块的入口。
- 一套是把 React 所有相关的代码打包好的完整代码放到一个单独的文件中，这些代码没有采用模块化可以直接执行。其中 `dist/react.js` 是用于开发环境，里面包含检查和警告的代码。`dist/react.min.js` 是用于线上环境，被最小化了。

默认情况下 Webpack 会从入口文件 `./node_modules/react/react.js` 开始递归的解析和处理依赖的几十个文件，这会时一个耗时的操作。 通过配置 `resolve.alias` 可以让 Webpack 在处理 React 库时，直接使用单独完整的 `react.min.js` 文件，从而跳过耗时的递归解析操作。

相关 Webpack 配置如下：

```js
module.exports = {
  resolve: {
    // 使用 alias 把导入 react 的语句换成直接使用单独完整的 react.min.js 文件，
    // 减少耗时的递归解析操作
    alias: {
      react: path.resolve(__dirname, "./node_modules/react/dist/react.min.js") // react15
      // 'react': path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'), // react16
    }
  }
};
```

> 除了 React 库外，大多数库发布到 Npm 仓库中时都会包含打包好的完整文件，对于这些库你也可以对它们配置 alias。
>
> 但是对于有些库使用本优化方法后会影响到 `Tree-Shaking` 去除无效代码的优化，因为打包好的完整文件中有部分代码你的项目可能永远用不上。 一般对整体性比较强的库采用本方法优化，因为完整文件中的代码是一个整体，每一行都是不可或缺的。 但是对于一些工具类的库，例如 `lodash`，你的项目可能只用到了其中几个工具函数，你就不能使用本方法去优化，因为这会导致你的输出代码中包含很多永远不会执行的代码。

### 1.5 优化 resolve.extensions 配置

在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试询问文件是否存在。 `resolve.extensions` 用于配置在尝试过程中用到的后缀列表，默认是：

```js
extensions: [".js", ".json"];
```

也就是说当遇到 `require('./data')` 这样的导入语句时，Webpack 会先去寻找 `./data.js` 文件，如果该文件不存在就去寻找 `./data.json` 文件，如果还是找不到就报错。

如果这个列表越长，或者正确的后缀在越后面，就会造成尝试的次数越多，所以 resolve.extensions 的配置也会影响到构建的性能。 在配置 resolve.extensions 时你需要遵守以下几点，以做到尽可能的优化构建性能：

- 后缀尝试列表要尽可能的小，不要把项目中不可能存在的情况写到后缀尝试列表中。
- 频率出现最高的文件后缀要优先放在最前面，以做到尽快的退出寻找过程。
- 在源码中写导入语句时，要尽可能的带上后缀，从而可以避免寻找过程。例如在你确定的情况下把 require('./data') 写成 require('./data.json')。

相关 Webpack 配置如下：

```js
module.exports = {
  resolve: {
    // 尽可能的减少后缀尝试的可能性
    extensions: [".js"]
  }
};
```

### 1.6 优化 module.noParse 配置

module.noParse 配置项可以让 Webpack 忽略对部分没采用模块化的文件的递归解析处理，这样做的好处是能提高构建性能。 原因是一些库，例如 jQuery 、ChartJS， 它们庞大又没有采用模块化标准，让 Webpack 去解析这些文件耗时又没有意义。

在上面的 优化 resolve.alias 配置 中讲到单独完整的 react.min.js 文件就没有采用模块化，让我们来通过配置 module.noParse 忽略对 react.min.js 文件的递归解析处理， 相关 Webpack 配置如下：

```js
const path = require("path");

module.exports = {
  module: {
    // 独完整的 `react.min.js` 文件就没有采用模块化，忽略对 `react.min.js` 文件的递归解析处理
    noParse: [/react\.min\.js$/]
  }
};
```

> 注意被忽略掉的文件里不应该包含 import 、 require 、 define 等模块化语句，不然会导致构建出的代码中包含无法在浏览器环境下执行的模块化语句。

### 1.7 Demo

```js
const path = require("path");

module.exports = {
  // JS 执行入口文件
  entry: "./src/main.js",
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: "bundle.js",
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, "./dist")
  },
  resolve: {
    // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
    modules: [path.resolve(__dirname, "node_modules")],
    // 只采用 main 字段作为入口文件描述字段，以减少搜索步骤
    mainFields: ["main"],
    // 使用 alias 把导入 react 的语句换成直接使用单独完整的 react.min.js 文件，减少耗时的递归解析操作
    alias: {
      react: path.resolve(__dirname, "./node_modules/react/dist/react.min.js"),
      "react-dom": path.resolve(
        __dirname,
        "./node_modules/react-dom/dist/react-dom.min.js"
      )
    },
    // 尽可能的减少后缀尝试的可能性
    extensions: ["js"]
  },
  module: {
    // 独完整的 `react.min.js` 文件就没有采用模块化，忽略对 `react.min.js` 文件的递归解析处理
    noParse: [/react\.min\.js$/],
    rules: [
      {
        // 如果项目源码中只有 js 文件就不要写成 /\.jsx?$/，提升正则表达式性能
        test: /\.js$/,
        // babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
        use: ["babel-loader?cacheDirectory"],
        // 只对项目根目录下的 src 目录中的文件采用 babel-loader
        include: path.resolve(__dirname, "src")
      }
    ]
  }
};
```

## 2. 使用 DllPlugin

### 2.1 认识 DLL

在介绍 `DllPlugin` 前先给大家介绍下 DLL。 用过 Windows 系统的人应该会经常看到以 `.dll` 为后缀的文件，这些文件称为动态链接库，在一个动态链接库中可以包含给其他模块调用的函数和数据。

要给 Web 项目构建接入动态链接库的思想，需要完成以下事情：

- 把网页依赖的基础模块抽离出来，打包到一个个单独的动态链接库中去。一个动态链接库中可以包含多个模块。
- 当需要导入的模块存在于某个动态链接库中时，这个模块不能被再次被打包，而是去动态链接库中获取。
- 页面依赖的所有动态链接库需要被加载。

为什么给 Web 项目构建接入动态链接库的思想后，会大大提升构建速度呢？

原因在于包含大量复用模块的动态链接库只需要编译一次，在之后的构建过程中被动态链接库包含的模块将不会在重新编译，而是直接使用动态链接库中的代码。 由于动态链接库中大多数包含的是常用的第三方模块，例如 react、react-dom，只要不升级这些模块的版本，动态链接库就不用重新编译。

### 2.2 接入 Webpack

Webpack 已经内置了对动态链接库的支持，需要通过 2 个内置的插件接入，它们分别是：

- `DllPlugin` 插件：用于打包出一个个单独的动态链接库文件。
- `DllReferencePlugin` 插件：用于在主要配置文件中去引入 DllPlugin 插件打包好的动态链接库文件。

下面以基本的 React 项目为例，为其接入 DllPlugin，在开始前先来看下最终构建出的目录结构：

```
├── main.js
├── polyfill.dll.js
├── polyfill.manifest.json
├── react.dll.js
└── react.manifest.json
```

其中包含两个动态链接库文件，分别是：

- polyfill.dll.js 里面包含项目所有依赖的 polyfill，例如 Promise、fetch 等 API。
- react.dll.js 里面包含 React 的基础运行环境，也就是 react 和 react-dom 模块。

以 react.dll.js 文件为例，其文件内容大致如下：

```js
var _dll_react = (function(modules) {
  // ... 此处省略 webpackBootstrap 函数代码
})([
  function(module, exports, __webpack_require__) {
    // 模块 ID 为 0 的模块对应的代码
  },
  function(module, exports, __webpack_require__) {
    // 模块 ID 为 1 的模块对应的代码
  }
  // ... 此处省略剩下的模块对应的代码
]);
```

可见一个动态链接库文件中包含了大量模块的代码，这些模块存放在一个数组里，用数组的索引号作为 ID。 并且还通过 `_dll_react` 变量把自己暴露在了全局中，也就是可以通过 `window._dll_react` 可以访问到它里面包含的模块。

其中 `polyfill.manifest.json` 和 `react.manifest.json` 文件也是由 `DllPlugin` 生成出，用于描述动态链接库文件中包含哪些模块， 以 `react.manifest.json` 文件为例，其文件内容大致如下：

```js
{
  // 描述该动态链接库文件暴露在全局的变量名称
  "name": "_dll_react",
  "content": {
    "./node_modules/process/browser.js": {
      "id": 0,
      "meta": {}
    },
    // ... 此处省略部分模块
    "./node_modules/react-dom/lib/ReactBrowserEventEmitter.js": {
      "id": 42,
      "meta": {}
    },
    "./node_modules/react/lib/lowPriorityWarning.js": {
      "id": 47,
      "meta": {}
    },
    // ... 此处省略部分模块
    "./node_modules/react-dom/lib/SyntheticTouchEvent.js": {
      "id": 210,
      "meta": {}
    },
    "./node_modules/react-dom/lib/SyntheticTransitionEvent.js": {
      "id": 211,
      "meta": {}
    },
  }
}
```

可见 `manifest.json` 文件清楚地描述了与其对应的 `dll.js` 文件中包含了哪些模块，以及每个模块的路径和 ID。

`main.js` 文件是编译出来的执行入口文件，当遇到其依赖的模块在 `dll.js` 文件中时，会直接通过 `dll.js` 文件暴露出的全局变量去获取打包在 `dll.js` 文件的模块。 所以在 index.html 文件中需要把依赖的两个 `dll.js` 文件给加载进去，`index.html` 内容如下：

```html
<html>
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <div id="app"></div>
    <!--导入依赖的动态链接库文件-->
    <script src="./dist/polyfill.dll.js"></script>
    <script src="./dist/react.dll.js"></script>
    <!--导入执行入口文件-->
    <script src="./dist/main.js"></script>
  </body>
</html>
```

以上就是所有接入 DllPlugin 后最终编译出来的代码，接下来教你如何实现。

### 2.3 构建出动态链接库文件

构建输出的以下这四个文件

```
├── polyfill.dll.js
├── polyfill.manifest.json
├── react.dll.js
└── react.manifest.json
```

和以下这一个文件

```
├── main.js
```

是由两份不同的构建分别输出的。

动态链接库文件相关的文件需要由一份独立的构建输出，用于给主构建使用。新建一个 Webpack 配置文件 `webpack_dll.config.js` 专门用于构建它们，文件内容如下：

```js
const path = require("path");
const DllPlugin = require("webpack/lib/DllPlugin");

module.exports = {
  // JS 执行入口文件
  entry: {
    // 把 React 相关模块的放到一个单独的动态链接库
    react: ["react", "react-dom"],
    // 把项目需要所有的 polyfill 放到一个单独的动态链接库
    polyfill: ["core-js/fn/object/assign", "core-js/fn/promise", "whatwg-fetch"]
  },
  output: {
    // 输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称，
    // 也就是 entry 中配置的 react 和 polyfill
    filename: "[name].dll.js",
    // 输出的文件都放到 dist 目录下
    path: path.resolve(__dirname, "dist"),
    // 存放动态链接库的全局变量名称，例如对应 react 来说就是 _dll_react
    // 之所以在前面加上 _dll_ 是为了防止全局变量冲突
    library: "_dll_[name]"
  },
  plugins: [
    // 接入 DllPlugin
    new DllPlugin({
      // 动态链接库的全局变量名称，需要和 output.library 中保持一致
      // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
      // 例如 react.manifest.json 中就有 "name": "_dll_react"
      name: "_dll_[name]", //这个name要与output中的library同名
      // 描述动态链接库的 manifest.json 文件输出时的文件名称
      path: path.join(__dirname, "dist", "[name].manifest.json")
    })
  ]
};
```

### 2.4 使用动态链接库文件

构建出的动态链接库文件用于给其它地方使用，在这里也就是给执行入口使用。

用于输出 main.js 的主 Webpack 配置文件内容如下：

```js
const path = require("path");
const DllReferencePlugin = require("webpack/lib/DllReferencePlugin");

module.exports = {
  entry: {
    // 定义入口 Chunk
    main: "./main.js"
  },
  output: {
    // 输出文件的名称
    filename: "[name].js",
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        // 项目源码使用了 ES6 和 JSX 语法，需要使用 babel-loader 转换
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: path.resolve(__dirname, "node_modules")
      }
    ]
  },
  plugins: [
    // 告诉 Webpack 使用了哪些动态链接库
    new DllReferencePlugin({
      // 描述 react 动态链接库的文件内容
      manifest: require("./dist/react.manifest.json")
    }),
    new DllReferencePlugin({
      // 描述 polyfill 动态链接库的文件内容
      manifest: require("./dist/polyfill.manifest.json")
    })
  ],
  devtool: "source-map"
};
```

> 注意：在 `webpack_dll.config.js` 文件中，DllPlugin 中的 name 参数必须和 output.library 中保持一致。 原因在于 DllPlugin 中的 name 参数会影响输出的 manifest.json 文件中 name 字段的值， 而在 `webpack.config.js` 文件中 DllReferencePlugin 会去 manifest.json 文件读取 name 字段的值， 把值的内容作为在从全局变量中获取动态链接库中内容时的全局变量名。

### 2.5 执行构建

在修改好以上两个 Webpack 配置文件后，需要重新执行构建。 重新执行构建时要注意的是需要先把动态链接库相关的文件编译出来，因为主 Webpack 配置文件中定义的 DllReferencePlugin 依赖这些文件。

执行构建时流程如下：

1. 如果动态链接库相关的文件还没有编译出来，就需要先把它们编译出来。方法是执行 `webpack --config webpack_dll.config.js` 命令。
2. 在确保动态链接库存在时，才能正常的编译出入口执行文件。方法是执行 webpack 命令。这时你会发现构建速度有了非常大的提升。

### 3. 使用 HappyPack

```js
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HappyPack = require("happypack");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
        use: ["happypack/loader?id=babel"],
        // 排除 node_modules 目录下的文件，node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
        exclude: path.resolve(__dirname, "node_modules")
      },
      {
        // 把对 .css 文件的处理转交给 id 为 css 的 HappyPack 实例
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ["happypack/loader?id=css"]
        })
      }
    ]
  },
  plugins: [
    new HappyPack({
      // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      id: "babel",
      // 如何处理 .js 文件，用法和 Loader 配置中一样
      loaders: ["babel-loader?cacheDirectory"],
      // 使用共享进程池中的子进程去处理任务
      threadPool: happyThreadPool
      // ... 其它配置项
    }),
    new HappyPack({
      id: "css",
      // 如何处理 .css 文件，用法和 Loader 配置中一样
      loaders: ["css-loader"],
      // 使用共享进程池中的子进程去处理任务
      threadPool: happyThreadPool
    }),
    new ExtractTextPlugin({
      filename: `[name].css`
    })
  ]
};
```

以上代码有两点重要的修改：

1. 在 Loader 配置中，所有文件的处理都交给了 `happypack/loader` 去处理，使用紧跟其后的 querystring `?id=babel` 去告诉 happypack/loader 去选择哪个 HappyPack 实例去处理文件。
2. 在 Plugin 配置中，新增了两个 HappyPack 实例分别用于告诉 happypack/loader 去如何处理 .js 和 .css 文件。选项中的 `id` 属性的值和上面 querystring 中的 `?id=babel` 相对应，选项中的 loaders 属性和 Loader 配置中一样。

在实例化 HappyPack 插件的时候，除了可以传入 `id` 和 `loaders` 两个参数外，HappyPack 还支持如下参数：

- `threads` 代表开启几个子进程去处理这一类型的文件，默认是 3 个，类型必须是整数。
- `verbose` 是否允许 HappyPack 输出日志，默认是 true。
- `threadPool` 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多，相关代码如下：

## 4. 使用 ParallelUglifyPlugin

在使用 Webpack 构建出用于发布到线上的代码时，都会有压缩代码这一流程。 最常见的 JavaScript 代码压缩工具是 UglifyJS，并且 Webpack 也内置了它。

当 Webpack 有多个 JavaScript 文件需要输出和压缩时，原本会使用 UglifyJS 去一个个挨着压缩再输出， 但是 ParallelUglifyPlugin 则会开启多个子进程，把对多个文件的压缩工作分配给多个子进程去完成，每个子进程其实还是通过 UglifyJS 去压缩代码，但是变成了并行执行。 所以 ParallelUglifyPlugin 能更快的完成对多个文件的压缩工作。

使用 `ParallelUglifyPlugin` 也非常简单，把原来 Webpack 配置文件中内置的 UglifyJsPlugin 去掉后，再替换成 ParallelUglifyPlugin，相关代码如下：

```js
const path = require("path");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");

module.exports = {
  plugins: [
    // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
    new ParallelUglifyPlugin({
      // 传递给 UglifyJS 的参数
      uglifyJS: {
        output: {
          // 最紧凑的输出
          beautify: false,
          // 删除所有的注释
          comments: false
        },
        compress: {
          // 在UglifyJs删除没有用到的代码时不输出警告
          warnings: false,
          // 删除所有的 `console` 语句，可以兼容ie浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true
        }
      }
    })
  ]
};
```

在通过 `new ParallelUglifyPlugin()` 实例化时，支持以下参数：

- `test`：使用正则去匹配哪些文件需要被 ParallelUglifyPlugin 压缩，默认是 `/.js\$/`，也就是默认压缩所有的 .js 文件。
- `include`：使用正则去命中需要被 ParallelUglifyPlugin 压缩的文件。默认为 []。
- `exclude`：使用正则去命中不需要被 ParallelUglifyPlugin 压缩的文件。默认为 []。
- `cacheDir`：缓存压缩后的结果，下次遇到一样的输入时直接从缓存中获取压缩后的结果并返回。cacheDir 用于配置缓存存放的目录路径。默认不会缓存，想开启缓存请设置一个目录路径。
- `workerCount`：开启几个子进程去并发的执行压缩。默认是当前运行电脑的 CPU 核数减去 1。
- `sourceMap`：是否输出 Source Map，这会导致压缩过程变慢。
- `uglifyJS`：用于压缩 ES5 代码时的配置，Object 类型，直接透传给 UglifyJS 的参数。
- `uglifyES`：用于压缩 ES6 代码时的配置，Object 类型，直接透传给 UglifyES 的参数。

webpack.config.js

```js
const path = require("path");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");

module.exports = {
  entry: "./main.js",
  output: {
    filename: "bundle.js", // 给输出的文件名称加上 hash 值
    path: path.resolve(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        // 排除 node_modules 目录下的文件，node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
        exclude: path.resolve(__dirname, "node_modules")
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      // 定义 NODE_ENV 环境变量为 production 去除 react 代码中的开发时才需要的部分
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
    new ParallelUglifyPlugin({
      // 缓存压缩后的结果，下次遇到一样的输入时直接从缓存中获取压缩后的结果返回
      // cacheDir 用于配置缓存存放的目录路径
      cacheDir: ".uglify-cache",
      uglifyJS: {
        output: {
          // 最紧凑的输出
          beautify: false,
          // 删除所有的注释
          comments: false
        },
        compress: {
          // 在UglifyJs删除没有用到的代码时不输出警告
          warnings: false,
          // 删除所有的 `console` 语句，可以兼容ie浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true
        }
      }
    })
  ]
};
```

## 5. 使用自动刷新

在开发阶段，修改源码是不可避免的操作。 对于开发网页来说，要想看到修改后的效果，需要刷新浏览器让其重新运行最新的代码才行。 借助自动化的手段，可以把这些重复的操作交给代码去帮我们完成，在监听到本地源码文件发生变化时，自动重新构建出可运行的代码后再控制浏览器刷新。

Webpack 把这些功能都内置了，并且还提供多种方案可选。

### 5.1 文件监听

文件监听是在发现源码文件发生变化时，自动重新构建出新的输出文件。

Webpack 官方提供了两大模块，一个是核心的 webpack，一个是使用 DevServer 中提到的 webpack-dev-server 扩展模块。 而文件监听功能是 webpack 模块提供的。

Webpack 支持文件监听相关的配置项如下：

```js
module.export = {
  // 只有在开启监听模式时，watchOptions 才有意义
  // 默认为 false，也就是不开启
  watch: true,
  // 监听模式运行时的参数
  // 在开启监听模式时，才有意义
  watchOptions: {
    // 不监听的文件或文件夹，支持正则匹配
    // 默认为空
    ignored: /node_modules/,
    // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
    // 默认为 300ms
    aggregateTimeout: 300,
    // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
    // 默认每隔1000毫秒询问一次
    poll: 1000
  }
};
```

要让 Webpack 开启监听模式，有两种方式：

在配置文件 `webpack.config.js` 中设置 `watch: true`。
在执行启动 Webpack 命令时，带上 `--watch` 参数，完整命令是 `webpack --watch`。

### 5.2 文件监听工作原理

在 Webpack 中监听一个文件发生变化的原理是定时的去获取这个文件的最后编辑时间，每次都存下最新的最后编辑时间，如果发现当前获取的和最后一次保存的最后编辑时间不一致，就认为该文件发生了变化。 配置项中的 `watchOptions.poll` 就是用于控制定时检查的周期，具体含义是每隔多少毫秒检查一次。

当发现某个文件发生了变化时，并不会立刻告诉监听者，而是先缓存起来，收集一段时间的变化后，再一次性告诉监听者。 配置项中的 `watchOptions.aggregateTimeout` 就是用于配置这个等待时间。 这样做的目的是因为我们在编辑代码的过程中可能会高频的输入文字导致文件变化的事件高频的发生，如果每次都重新执行构建就会让构建卡死。

对于多个文件来说，原理相似，只不过会对列表中的每一个文件都定时的执行检查。 但是这个需要监听的文件列表是怎么确定的呢？ 默认情况下 Webpack 会从配置的 Entry 文件出发，递归解析出 Entry 文件所依赖的文件，把这些依赖的文件都加入到监听列表中去。 可见 Webpack 这一点还是做的很智能的，不是粗暴的直接监听项目目录下的所有文件。

由于保存文件的路径和最后编辑时间需要占用内存，定时检查周期检查需要占用 CPU 以及文件 I/O，所以最好减少需要监听的文件数量和降低检查频率。

### 5.3 优化文件监听性能

在明白文件监听工作原理后，就好分析如何优化文件监听性能了。

开启监听模式时，默认情况下会监听配置的 Entry 文件和所有其递归依赖的文件。 在这些文件中会有很多存在于 `node_modules` 下，因为如今的 Web 项目会依赖大量的第三方模块。 在大多数情况下我们都不可能去编辑 `node_modules` 下的文件，而是编辑自己建立的源码文件。 所以一个很大的优化点就是忽略掉 `node_modules` 下的文件，不监听它们。相关配置如下：

```js
module.export = {
  watchOptions: {
    // 不监听的 node_modules 目录下的文件
    ignored: /node_modules/
  }
};
```

采用这种方法优化后，你的 Webpack 消耗的内存和 CPU 将会大大降低。

除了忽略掉部分文件的优化外，还有如下两种方法：

- `watchOptions.aggregateTimeout` 值越大性能越好，因为这能降低重新构建的频率。
- `watchOptions.poll` 值越大越好，因为这能降低检查的频率。

但两种优化方法的后果是会让你感觉到监听模式的反应和灵敏度降低了。

### 5.4 自动刷新浏览器

监听到文件更新后的下一步是去刷新浏览器，webpack 模块负责监听文件，webpack-dev-server 模块则负责刷新浏览器。 在使用 webpack-dev-server 模块去启动 webpack 模块时，webpack 模块的监听模式默认会被开启。 webpack 模块会在文件发生变化时告诉 webpack-dev-server 模块。

### 5.5 自动刷新的原理

控制浏览器刷新有三种方法：

1. 借助浏览器扩展去通过浏览器提供的接口刷新，WebStorm IDE 的 LiveEdit 功能就是这样实现的。
2. 往要开发的网页中注入代理客户端代码，通过代理客户端去刷新整个页面。
3. 把要开发的网页装进一个 iframe 中，通过刷新 iframe 去看到最新效果。

## 6. 开启模块热替换

要做到实时预览，除了在 5.5 使用自动刷新中介绍的刷新整个网页外，DevServer 还支持一种叫做模块热替换(Hot Module Replacement)的技术可在不刷新整个网页的情况下做到超灵敏的实时预览。 原理是当一个源码发生变化时，只重新编译发生变化的模块，再用新输出的模块替换掉浏览器中对应的老模块。

模块热替换技术的优势有：

- 实时预览反应更快，等待时间更短。
- 不刷新浏览器能保留当前网页的运行状态，例如在使用 Redux 来管理数据的应用中搭配模块热替换能做到代码更新时 Redux 中的数据还保持不变。

总的来说模块热替换技术很大程度上的提高了开发效率和体验。

### 6.1 模块热替换的原理

模块热替换的原理和自动刷新原理类似，都需要往要开发的网页中注入一个代理客户端用于连接 DevServer 和网页， 不同在于模块热替换独特的模块替换机制。

DevServer 默认不会开启模块热替换模式，要开启该模式，只需在启动时带上参数 `--hot`，完整命令是 `webpack-dev-server --hot`。

除了通过在启动时带上 --hot 参数，还可以通过接入 Plugin 实现，相关代码如下：

```js
const HotModuleReplacementPlugin = require("webpack/lib/HotModuleReplacementPlugin");

module.exports = {
  entry: {
    // 为每个入口都注入代理客户端
    main: [
      "webpack-dev-server/client?http://localhost:8080/",
      "webpack/hot/dev-server",
      "./src/main.js"
    ]
  },
  plugins: [
    // 该插件的作用就是实现模块热替换，实际上当启动时带上 `--hot` 参数，会注入该插件，生成 .hot-update.json 文件。
    new HotModuleReplacementPlugin()
  ],
  devServer: {
    // 告诉 DevServer 要开启模块热替换模式
    hot: true
  }
};
```

在启动 Webpack 时带上参数 --hot 其实就是自动为你完成以上配置。

## 7. 使用 Tree Shaking

Tree Shaking 可以用来剔除 JavaScript 中用不上的死代码。它依赖静态的 ES6 模块化语法，例如通过 import 和 export 导入导出。

首先，为了把采用 ES6 模块化的代码交给 Webpack，需要配置 Babel 让其保留 ES6 模块化语句，修改 .babelrc 文件为如下：

```json
{
  "presets": [
    [
      "env",
      {
        "modules": false
      }
    ]
  ]
}
```

其中 `"modules": false` 的含义是关闭 Babel 的模块转换功能，保留原本的 ES6 模块化语法。

配置好 Babel 后，重新运行 Webpack，在启动 Webpack 时带上 `--display-used-exports` 参数，以方便追踪 Tree Shaking 的工作， 这时你会发现在控制台中输出了如下的日志：

```
> webpack --display-used-exports
bundle.js  3.5 kB       0  [emitted]  main
   [0] ./main.js 41 bytes {0} [built]
   [1] ./util.js 511 bytes {0} [built]
       [only some exports used: funcA]
```

以 `redux` 库为例，其发布到 Npm 上的目录结构为：

```
node_modules/redux
|-- es
|   |-- index.js # 采用 ES6 模块化语法
|-- lib
|   |-- index.js # 采用 ES5 模块化语法
|-- package.json
```

package.json 文件中有两个字段：

```json
{
  "main": "lib/index.js", // 指明采用 CommonJS 模块化的代码入口
  "jsnext:main": "es/index.js" // 指明采用 ES6 模块化的代码入口
}
```

Resolve mainFields 中曾介绍过 mainFields 用于配置采用哪个字段作为模块的入口描述。 为了让 Tree Shaking 对 redux 生效，需要配置 Webpack 的文件寻找规则为如下：

```js
module.exports = {
  resolve: {
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    mainFields: ["jsnext:main", "browser", "main"]
  }
};
```

以上配置的含义是优先使用 `jsnext:main` 作为入口，如果不存在 `jsnext:main` 就采用 `browser` 或者 `main` 作为入口。 虽然并不是每个 Npm 中的第三方模块都会提供 ES6 模块化语法的代码，但对于提供了的不能放过，能优化的就优化。

```js
const path = require("path");

module.exports = {
  entry: "./main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist")
  },
  resolve: {
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    mainFields: ["jsnext:main", "browser", "main"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: path.resolve(__dirname, "node_modules")
      }
    ]
  }
};
```

```json
{
  "name": "dive-into-webpack",
  "version": "1.0.0",
  "scripts": {
    "build": "webpack --display-used-exports --optimize-minimize"
  },
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-env": "^1.6.0",
    "webpack": "^3.4.0"
  }
}
```

## 8. 提取公共代码

Webpack 内置了专门用于提取多个 Chunk 中公共部分的插件 CommonsChunkPlugin，CommonsChunkPlugin 大致使用方法如下：

```js
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

new CommonsChunkPlugin({
  // 从哪些 Chunk 中提取
  chunks: ["a", "b"],
  // 提取出的公共部分形成一个新的 Chunk，这个新 Chunk 的名称
  name: "common"
});
```

```js
const path = require("path");
const UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const { AutoWebPlugin } = require("web-webpack-plugin");

// 使用本文的主角 AutoWebPlugin，自动寻找 pages 目录下的所有目录，把每一个目录看成一个单页应用
const autoWebPlugin = new AutoWebPlugin("pages", {
  template: "./template.html", // HTML 模版文件所在的文件路径
  // 提取出所有页面公共的代码
  commonsChunk: {
    name: "common" // 提取出公共代码 Chunk 的名称
  }
});

module.exports = {
  // AutoWebPlugin 会找为寻找到的所有单页应用，生成对应的入口配置，
  // autoWebPlugin.entry 方法可以获取到生成入口配置
  entry: autoWebPlugin.entry({
    // 这里可以加入你额外需要的 Chunk 入口
    base: "./base.js"
  }),
  output: {
    filename: "[name]_[chunkhash:8].js", // 给输出的文件名称加上 hash 值
    path: path.resolve(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        // 排除 node_modules 目录下的文件，node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
        exclude: path.resolve(__dirname, "node_modules")
      },
      {
        test: /\.css/, // 增加对 CSS 文件的支持
        // 提取出 Chunk 中的 CSS 代码到单独的文件中
        use: ExtractTextPlugin.extract({
          use: ["css-loader?minimize"] // 压缩 CSS 代码
        })
      }
    ]
  },
  plugins: [
    autoWebPlugin,
    // 为了从 common 中提取出 base 也包含的部分
    new CommonsChunkPlugin({
      // 从 common 和 base 两个现成的 Chunk 中提取公共的部分
      chunks: ["common", "base"],
      // 把公共的部分放到 base 中
      name: "base"
    }),
    new ExtractTextPlugin({
      filename: `[name]_[contenthash:8].css` // 给输出的 CSS 文件名称加上 hash 值
    }),
    new DefinePlugin({
      // 定义 NODE_ENV 环境变量为 production 去除 react 代码中的开发时才需要的部分
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    // 压缩输出的 JS 代码
    new UglifyJsPlugin({
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所有的 `console` 语句，可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true
      }
    })
  ]
};
```

## 9. 分割代码按需加载

### 9.1 如何使用按需加载

在给单页应用做按需加载优化时，一般采用以下原则：

- 把整个网站划分成一个个小功能，再按照每个功能的相关程度把它们分成几类。
- 把每一类合并为一个 Chunk，按需加载对应的 Chunk。
- 对于用户首次打开你的网站时需要看到的画面所对应的功能，不要对它们做按需加载，而是放到执行入口所在的 Chunk 中，以降低用户能感知的网页加载时间。
- 对于个别依赖大量代码的功能点，例如依赖 Chart.js 去画图表、依赖 flv.js 去播放视频的功能点，可再对其进行按需加载。

被分割出去的代码的加载需要一定的时机去触发，也就是当用户操作到了或者即将操作到对应的功能时再去加载对应的代码。 被分割出去的代码的加载时机需要开发者自己去根据网页的需求去衡量和确定。

由于被分割出去进行按需加载的代码在加载的过程中也需要耗时，你可以预言用户接下来可能会进行的操作，并提前加载好对应的代码，从而让用户感知不到网络加载时间。

### 9.2 用 Webpack 实现按需加载

Webpack 内置了强大的分割代码的功能去实现按需加载，实现起来非常简单。

举个例子，现在需要做这样一个进行了按需加载优化的网页：

- 网页首次加载时只加载 main.js 文件，网页会展示一个按钮，main.js 文件中只包含监听按钮事件和加载按需加载的代码。
- 当按钮被点击时才去加载被分割出去的 show.js 文件，加载成功后再执行 show.js 里的函数。

```js
// 其中 main.js 文件内容如下：
window.document.getElementById("btn").addEventListener("click", function() {
  // 当按钮被点击后才去加载 show.js 文件，文件加载成功后执行文件导出的函数
  import(/* webpackChunkName: "show" */ "./show").then(show => {
    show("Webpack");
  });
});

// show.js 文件内容如下：
module.exports = function(content) {
  window.alert("Hello " + content);
};
```

代码中最关键的一句是 `import(/* webpackChunkName: "show" */ './show')`，Webpack 内置了对 `import(*)` 语句的支持，当 Webpack 遇到了类似的语句时会这样处理：

- 以 `./show.js` 为入口新生成一个 Chunk；
- 当代码执行到 `import` 所在语句时才会去加载由 Chunk 对应生成的文件。
- `import` 返回一个 `Promise`，当文件加载成功时可以在 `Promise` 的 `then` 方法中获取到 show.js 导出的内容。

> `/* webpackChunkName: "show" */` 的含义是为动态生成的 Chunk 赋予一个名称，以方便我们追踪和调试代码。 如果不指定动态生成的 Chunk 的名称，默认名称将会是 [id].js。 `/* webpackChunkName: "show" */` 是在 Webpack3 中引入的新特性，在 Webpack3 之前是无法为动态生成的 Chunk 赋予名称的。

### 9.3 按需加载与 ReactRouter

在实战中，不可能会有上面那么简单的场景，接下来举一个实战中的例子：对采用了 `ReactRouter` 的应用进行按需加载优化。 这个例子由一个单页应用构成，这个单页应用由两个子页面构成，通过 ReactRouter 在两个子页面之间切换和管理路由。

这个单页应用的入口文件 main.js 如下：

```js
import React, { PureComponent, createElement } from "react";
import { render } from "react-dom";
import { HashRouter, Route, Link } from "react-router-dom";
import PageHome from "./pages/home";

/**
 * 异步加载组件
 * @param load 组件加载函数，load 函数会返回一个 Promise，在文件加载完成时 resolve
 * @returns {AsyncComponent} 返回一个高阶组件用于封装需要异步加载的组件
 */
function getAsyncComponent(load) {
  return class AsyncComponent extends PureComponent {
    componentDidMount() {
      // 在高阶组件 DidMount 时才去执行网络加载步骤
      load().then(({ default: component }) => {
        // 代码加载成功，获取到了代码导出的值，调用 setState 通知高阶组件重新渲染子组件
        this.setState({
          component
        });
      });
    }

    render() {
      const { component } = this.state || {};
      // component 是 React.Component 类型，需要通过 React.createElement 生产一个组件实例
      return component ? createElement(component) : null;
    }
  };
}

// 根组件
function App() {
  return (
    <HashRouter>
      <div>
        <nav>
          <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
          <Link to="/login">Login</Link>
        </nav>
        <hr />
        <Route exact path="/" component={PageHome} />
        <Route
          path="/about"
          component={getAsyncComponent(
            // 异步加载函数，异步地加载 PageAbout 组件
            () => import(/* webpackChunkName: 'page-about' */ "./pages/about")
          )}
        />
        <Route
          path="/login"
          component={getAsyncComponent(
            // 异步加载函数，异步地加载 PageAbout 组件
            () => import(/* webpackChunkName: 'page-login' */ "./pages/login")
          )}
        />
      </div>
    </HashRouter>
  );
}

// 渲染根组件
render(<App />, window.document.getElementById("app"));
```

以上代码中最关键的部分是 `getAsyncComponent` 函数，它的作用是配合 `ReactRouter` 去按需加载组件，具体含义请看代码中的注释。

由于以上源码需要通过 Babel 去转换后才能在浏览器中正常运行，需要在 Webpack 中配置好对应的 babel-loader，源码先交给 babel-loader 处理后再交给 Webpack 去处理其中的 `import(*)` 语句。 但这样做后你很快会发现一个问题：Babel 报出错误说不认识 `import(*)` 语法。 导致这个问题的原因是 `import(*)` 语法还没有被加入到 ECMAScript 标准中去， 为此我们需要安装一个 Babel 插件 `babel-plugin-syntax-dynamic-import`，并且将其加入到 `.babelrc` 中去：

```json
{
  "presets": ["env", "react"],
  "plugins": ["syntax-dynamic-import"]
}
```

执行 Webpack 构建后，你会发现输出了三个文件：

- `main.js`：执行入口所在的代码块，同时还包括 PageHome 所需的代码，因为用户首次打开网页时就需要看到 PageHome 的内容，所以不对其进行按需加载，以降低用户能感知到的加载时间；
- `page-about.js`：当用户访问 `/about` 时才会加载的代码块；
- `page-login.js`：当用户访问 `/login` 时才会加载的代码块。

同时你还会发现 page-about.js 和 page-login.js 这两个文件在首页是不会加载的，而是会当你切换到了对应的子页面后文件才会开始加载。

## 10. 开启 Scope Hoisting

Scope Hoisting 可以让 Webpack 打包出来的代码文件更小、运行的更快， 它又译作 "作用域提升"，是在 Webpack3 中新推出的功能。

### 10.1 认识 Scope Hoisting

让我们先来看看在没有 Scope Hoisting 之前 Webpack 的打包方式。

假如现在有两个文件分别是 `util.js`:

```js
export default "Hello,Webpack";
```

和入口文件 `main.js`:

```js
import str from "./util.js";
console.log(str);
```

以上源码用 Webpack 打包后输出中的部分代码如下：

```js
[
  function(module, __webpack_exports__, __webpack_require__) {
    var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(1);
    console.log(__WEBPACK_IMPORTED_MODULE_0__util_js__["a"]);
  },
  function(module, __webpack_exports__, __webpack_require__) {
    __webpack_exports__["a"] = "Hello,Webpack";
  }
];
```

在开启 Scope Hoisting 后，同样的源码输出的部分代码如下：

```js
[
  function(module, __webpack_exports__, __webpack_require__) {
    var util = "Hello,Webpack";
    console.log(util);
  }
];
```

从中可以看出开启 Scope Hoisting 后，函数申明由两个变成了一个，util.js 中定义的内容被直接注入到了 main.js 对应的模块中。 这样做的好处是：

- 代码体积更小，因为函数申明语句会产生大量代码；
- 代码在运行时因为创建的函数作用域更少了，内存开销也随之变小。

Scope Hoisting 的实现原理其实很简单：分析出模块之间的依赖关系，尽可能的把打散的模块合并到一个函数中去，但前提是不能造成代码冗余。 因此只有那些被引用了一次的模块才能被合并。

由于 Scope Hoisting 需要分析出模块之间的依赖关系，因此源码必须采用 `ES6` 模块化语句，不然它将无法生效。

### 10.2 使用 Scope Hoisting

要在 Webpack 中使用 Scope Hoisting 非常简单，因为这是 Webpack 内置的功能，只需要配置一个插件，相关代码如下：

```js
const ModuleConcatenationPlugin = require("webpack/lib/optimize/ModuleConcatenationPlugin");

module.exports = {
  plugins: [
    // 开启 Scope Hoisting
    new ModuleConcatenationPlugin()
  ]
};
```

同时，考虑到 Scope Hoisting 依赖源码需采用 ES6 模块化语法，还需要配置 `mainFields`。 原因 TreeShaking 中提到过：因为大部分 Npm 中的第三方库采用了 CommonJS 语法，但部分库会同时提供 ES6 模块化的代码，为了充分发挥 Scope Hoisting 的作用，需要增加以下配置：

```js
module.exports = {
  resolve: {
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    mainFields: ["jsnext:main", "browser", "main"]
  }
};
```

对于采用了非 ES6 模块化语法的代码，Webpack 会降级处理不使用 Scope Hoisting 优化，为了知道 Webpack 对哪些代码做了降级处理， 你可以在启动 Webpack 时带上 `--display-optimization-bailout` 参数，这样在输出日志中就会包含类似如下的日志：

```
[0] ./main.js + 1 modules 80 bytes {0} [built]
    ModuleConcatenation bailout: Module is not an ECMAScript module
```

其中的 ModuleConcatenation bailout 告诉了你哪个文件因为什么原因导致了降级处理。

也就是说要开启 Scope Hoisting 并发挥最大作用的配置如下：

```js
const ModuleConcatenationPlugin = require("webpack/lib/optimize/ModuleConcatenationPlugin");

module.exports = {
  resolve: {
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    mainFields: ["jsnext:main", "browser", "main"]
  },
  plugins: [
    // 开启 Scope Hoisting
    new ModuleConcatenationPlugin()
  ]
};
```

## 11. 优化总结

### 11.1 侧重优化开发体验的配置文件 webpack.config.js：

```js
const path = require("path");
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const { AutoWebPlugin } = require("web-webpack-plugin");
const HappyPack = require("happypack");

// 自动寻找 pages 目录下的所有目录，把每一个目录看成一个单页应用
const autoWebPlugin = new AutoWebPlugin("./src/pages", {
  // HTML 模版文件所在的文件路径
  template: "./template.html",
  // 提取出所有页面公共的代码
  commonsChunk: {
    // 提取出公共代码 Chunk 的名称
    name: "common"
  }
});

module.exports = {
  // AutoWebPlugin 会找为寻找到的所有单页应用，生成对应的入口配置，
  // autoWebPlugin.entry 方法可以获取到生成入口配置
  entry: autoWebPlugin.entry({
    // 这里可以加入你额外需要的 Chunk 入口
    base: "./src/base.js"
  }),
  output: {
    filename: "[name].js"
  },
  resolve: {
    // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
    // 其中 __dirname 表示当前工作目录，也就是项目根目录
    modules: [path.resolve(__dirname, "node_modules")],
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件，使用 Tree Shaking 优化
    // 只采用 main 字段作为入口文件描述字段，以减少搜索步骤
    mainFields: ["jsnext:main", "main"]
  },
  module: {
    rules: [
      {
        // 如果项目源码中只有 js 文件就不要写成 /\.jsx?$/，提升正则表达式性能
        test: /\.js$/,
        // 使用 HappyPack 加速构建
        use: ["happypack/loader?id=babel"],
        // 只对项目根目录下的 src 目录中的文件采用 babel-loader
        include: path.resolve(__dirname, "src")
      },
      {
        test: /\.js$/,
        use: ["happypack/loader?id=ui-component"],
        include: path.resolve(__dirname, "src")
      },
      {
        // 增加对 CSS 文件的支持
        test: /\.css$/,
        use: ["happypack/loader?id=css"]
      }
    ]
  },
  plugins: [
    autoWebPlugin,
    // 使用 HappyPack 加速构建
    new HappyPack({
      id: "babel",
      // babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
      loaders: ["babel-loader?cacheDirectory"]
    }),
    new HappyPack({
      // UI 组件加载拆分
      id: "ui-component",
      loaders: [
        {
          loader: "ui-component-loader",
          options: {
            lib: "antd",
            style: "style/index.css",
            camel2: "-"
          }
        }
      ]
    }),
    new HappyPack({
      id: "css",
      // 如何处理 .css 文件，用法和 Loader 配置中一样
      loaders: ["style-loader", "css-loader"]
    }),
    // 4-11提取公共代码
    new CommonsChunkPlugin({
      // 从 common 和 base 两个现成的 Chunk 中提取公共的部分
      chunks: ["common", "base"],
      // 把公共的部分放到 base 中
      name: "base"
    })
  ],
  watchOptions: {
    // 4-5使用自动刷新：不监听的 node_modules 目录下的文件
    ignored: /node_modules/
  }
};
```

### 11.2 侧重优化输出质量的配置文件 webpack-dist.config.js：

```js
const path = require("path");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const ModuleConcatenationPlugin = require("webpack/lib/optimize/ModuleConcatenationPlugin");
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { AutoWebPlugin } = require("web-webpack-plugin");
const HappyPack = require("happypack");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");

// 自动寻找 pages 目录下的所有目录，把每一个目录看成一个单页应用
const autoWebPlugin = new AutoWebPlugin("./src/pages", {
  // HTML 模版文件所在的文件路径
  template: "./template.html",
  // 提取出所有页面公共的代码
  commonsChunk: {
    // 提取出公共代码 Chunk 的名称
    name: "common"
  },
  // 指定存放 CSS 文件的 CDN 目录 URL
  stylePublicPath: "//css.cdn.com/id/"
});

module.exports = {
  // AutoWebPlugin 会找为寻找到的所有单页应用，生成对应的入口配置，
  // autoWebPlugin.entry 方法可以获取到生成入口配置
  entry: autoWebPlugin.entry({
    // 这里可以加入你额外需要的 Chunk 入口
    base: "./src/base.js"
  }),
  output: {
    // 给输出的文件名称加上 Hash 值
    filename: "[name]_[chunkhash:8].js",
    path: path.resolve(__dirname, "./dist"),
    // 指定存放 JavaScript 文件的 CDN 目录 URL
    publicPath: "//js.cdn.com/id/"
  },
  resolve: {
    // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
    // 其中 __dirname 表示当前工作目录，也就是项目根目录
    modules: [path.resolve(__dirname, "node_modules")],
    // 只采用 main 字段作为入口文件描述字段，以减少搜索步骤
    mainFields: ["jsnext:main", "main"]
  },
  module: {
    rules: [
      {
        // 如果项目源码中只有 js 文件就不要写成 /\.jsx?$/，提升正则表达式性能
        test: /\.js$/,
        // 使用 HappyPack 加速构建
        use: ["happypack/loader?id=babel"],
        // 只对项目根目录下的 src 目录中的文件采用 babel-loader
        include: path.resolve(__dirname, "src")
      },
      {
        test: /\.js$/,
        use: ["happypack/loader?id=ui-component"],
        include: path.resolve(__dirname, "src")
      },
      {
        // 增加对 CSS 文件的支持
        test: /\.css$/,
        // 提取出 Chunk 中的 CSS 代码到单独的文件中
        use: ExtractTextPlugin.extract({
          use: ["happypack/loader?id=css"],
          // 指定存放 CSS 中导入的资源（例如图片）的 CDN 目录 URL
          publicPath: "//img.cdn.com/id/"
        })
      }
    ]
  },
  plugins: [
    autoWebPlugin,
    // 4-14开启ScopeHoisting
    new ModuleConcatenationPlugin(),
    // 4-3使用HappyPack
    new HappyPack({
      // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      id: "babel",
      // babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
      loaders: ["babel-loader?cacheDirectory"]
    }),
    new HappyPack({
      // UI 组件加载拆分
      id: "ui-component",
      loaders: [
        {
          loader: "ui-component-loader",
          options: {
            lib: "antd",
            style: "style/index.css",
            camel2: "-"
          }
        }
      ]
    }),
    new HappyPack({
      id: "css",
      // 如何处理 .css 文件，用法和 Loader 配置中一样
      // 通过 minimize 选项压缩 CSS 代码
      loaders: ["css-loader?minimize"]
    }),
    new ExtractTextPlugin({
      // 给输出的 CSS 文件名称加上 Hash 值
      filename: `[name]_[contenthash:8].css`
    }),
    // 4-11提取公共代码
    new CommonsChunkPlugin({
      // 从 common 和 base 两个现成的 Chunk 中提取公共的部分
      chunks: ["common", "base"],
      // 把公共的部分放到 base 中
      name: "base"
    }),
    new DefinePlugin({
      // 定义 NODE_ENV 环境变量为 production 去除 react 代码中的开发时才需要的部分
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    // 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
    new ParallelUglifyPlugin({
      // 传递给 UglifyJS 的参数
      uglifyJS: {
        output: {
          // 最紧凑的输出
          beautify: false,
          // 删除所有的注释
          comments: false
        },
        compress: {
          // 在UglifyJs删除没有用到的代码时不输出警告
          warnings: false,
          // 删除所有的 `console` 语句，可以兼容ie浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true
        }
      }
    })
  ]
};
```
