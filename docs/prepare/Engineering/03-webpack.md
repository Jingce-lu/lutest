# Webpack

[[toc]]

## 配置动态 Entry

假如项目里有多个页面需要为每个页面的入口配置一个 Entry ，但这些页面的数量可能会不断增长，则这时 Entry 的配置会受到到其他因素的影响导致不能写成静态的值。其解决方法是把 Entry 设置成一个函数去动态返回上面所说的配置，代码如下：

```js
// 同步函数
entry: () => {
  return {
    a: "./pages/a",
    b: "./pages/b"
  };
};
// 异步函数
entry: () => {
  return new Promise(resolve => {
    resolve({
      a: "./pages/a",
      b: "./pages/b"
    });
  });
};
```

## Loader 配置

rules 配置模块的读取和解析规则，通常用来配置 Loader。其类型是一个数组，数组里每一项都描述了如何去处理部分文件。 配置一项 rules 时大致通过以下方式：

1. 条件匹配：通过 `test` 、 `include` 、 `exclude` 三个配置项来命中 Loader 要应用规则的文件。
2. 应用规则：对选中后的文件通过 `use` 配置项来应用 Loader，可以只应用一个 Loader 或者按照从后往前的顺序应用一组 Loader，同时还可以分别给 Loader 传入参数。
3. 重置顺序：一组 Loader 的执行顺序默认是从右到左执行，通过 `enforce` 选项可以让其中一个 Loader 的执行顺序放到最前或者最后。

下面来通过一个例子来说明具体使用方法：

```js
module: {
  rules: [
    {
      // 命中 JavaScript 文件
      test: /\.js$/,
      // 用 babel-loader 转换 JavaScript 文件
      // ?cacheDirectory 表示传给 babel-loader 的参数，用于缓存 babel 编译结果加快重新编译速度
      use: ["babel-loader?cacheDirectory"],
      // 只命中src目录里的js文件，加快 Webpack 搜索速度
      include: path.resolve(__dirname, "src")
    },
    {
      // 命中 SCSS 文件
      test: /\.scss$/,
      // 使用一组 Loader 去处理 SCSS 文件。
      // 处理顺序为从后到前，即先交给 sass-loader 处理，再把结果交给 css-loader 最后再给 style-loader。
      use: ["style-loader", "css-loader", "sass-loader"],
      // 排除 node_modules 目录下的文件
      exclude: path.resolve(__dirname, "node_modules")
    },
    {
      // 对非文本文件采用 file-loader 加载
      test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
      use: ["file-loader"]
    }
  ];
}
```

在 Loader 需要传入很多参数时，你还可以通过一个 Object 来描述，例如在上面的 babel-loader 配置中有如下代码：

```js
use: [
  {
    loader: "babel-loader",
    options: {
      cacheDirectory: true
    },
    // enforce:'post' 的含义是把该 Loader 的执行顺序放到最后
    // enforce 的值还可以是 pre，代表把 Loader 的执行顺序放到最前面
    enforce: "post"
  }
  // 省略其它 Loader
];
```

## noParse

`noParse` 配置项可以让 Webpack 忽略对部分没采用模块化的文件的递归解析和处理，这样做的好处是能提高构建性能。 原因是一些库例如 jQuery 、ChartJS 它们庞大又没有采用模块化标准，让 Webpack 去解析这些文件耗时又没有意义。

`noParse` 是可选配置项，类型需要是 `RegExp`、`[RegExp]`、`function` 其中一个。

例如想要忽略掉 jQuery 、ChartJS，可以使用如下代码：

```js
// 使用正则表达式
noParse: /jquery|chartjs/;

// 使用函数，从 Webpack 3.0.0 开始支持
noParse: content => {
  // content 代表一个模块的文件路径
  // 返回 true or false
  return /jquery|chartjs/.test(content);
};
```

> 注意被忽略掉的文件里不应该包含 `import` 、 `require` 、 `define` 等模块化语句，不然会导致构建出的代码中包含无法在浏览器环境下执行的模块化语句。

## parser

因为 Webpack 是以模块化的 JavaScript 文件为入口，所以内置了对模块化 JavaScript 的解析功能，支持 AMD、CommonJS、SystemJS、ES6。 `parser` 属性可以更细粒度的配置哪些模块语法要解析哪些不解析，和 `noParse` 配置项的区别在于 `parser` 可以精确到语法层面， 而 `noParse` 只能控制哪些文件不被解析。 parser 使用如下：

```js {6}
module: {
  rules: [
    {
      test: /\.js$/,
      use: ["babel-loader"],
      parser: {
        amd: false, // 禁用 AMD
        commonjs: false, // 禁用 CommonJS
        system: false, // 禁用 SystemJS
        harmony: false, // 禁用 ES6 import/export
        requireInclude: false, // 禁用 require.include
        requireEnsure: false, // 禁用 require.ensure
        requireContext: false, // 禁用 require.context
        browserify: false, // 禁用 browserify
        requireJs: false // 禁用 requirejs
      }
    }
  ];
}
```

## CommonsChunkPlugin

```js {6}
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
  plugins: [
    // 所有页面都会用到的公共代码提取到 common 代码块中
    new CommonsChunkPlugin({
      name: "common",
      chunks: ["a", "b"]
    })
  ]
};
```

## Externals

Externals 用来告诉 Webpack 要构建的代码中使用了哪些不用被打包的模块，也就是说这些模版是外部环境提供的，Webpack 在打包时可以忽略它们。

有些 JavaScript 运行环境可能内置了一些全局变量或者模块，例如在你的 HTML HEAD 标签里通过以下代码：

```html
<script src="path/to/jquery.js"></script>
```

引入 jQuery 后，全局变量 `jQuery` 就会被注入到网页的 JavaScript 运行环境里。

如果想在使用模块化的源代码里导入和使用 jQuery，可能需要这样：

```js
import $ from "jquery";
$(".my-element");
```

构建后你会发现输出的 `Chunk` 里包含的 `jQuery` 库的内容，这导致 `jQuery` 库出现了 2 次，浪费加载流量，最好是 Chunk 里不会包含 jQuery 库的内容。

`Externals` 配置项就是为了解决这个问题。

通过 `externals` 可以告诉 Webpack JavaScript 运行环境已经内置了那些全局变量，针对这些全局变量不用打包进代码中而是直接使用全局变量。 要解决以上问题，可以这样配置 `externals`：

```js {2}
module.export = {
  externals: {
    // 把导入语句里的 jquery 替换成运行环境里的全局变量 jQuery
    jquery: "jQuery"
  }
};
```

## 多种配置类型

除了通过导出一个 Object 来描述 Webpack 所需的配置外，还有其它更灵活的方式，以简化不同场景的配置。 下面来一一介绍它们。

### 导出一个 Function

```js
const path = require("path");
const UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");

module.exports = function(env = {}, argv) {
  const plugins = [];

  const isProduction = env["production"];

  // 在生产环境才压缩
  if (isProduction) {
    plugins.push(
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
    );
  }

  return {
    // JS 执行入口文件
    entry: "./main.js",
    output: {
      // 把所有依赖的模块合并输出到一个 bundle.js 文件
      filename: "bundle.js",
      // 输出文件都放到 dist 目录下
      path: path.resolve(__dirname, "./dist")
    },
    plugins: plugins,
    // 在生成环境不输出 Source Map
    devtool: isProduction ? undefined : "source-map"
  };
};
```

在运行 Webpack 时，会给这个函数传入 2 个参数，分别是：

- `env`：当前运行时的 Webpack 专属环境变量，`env` 是一个 Object。读取时直接访问 Object 的属性，设置它需要在启动 Webpack 时带上参数。例如启动命令是 `webpack --env.production --env.bao=foo` 时，则 `env` 的值是 `{"production":"true","bao":"foo"}`。
- `argv`：代表在启动 Webpack 时所有通过命令行传入的参数，例如 `--config`、`--env`、`--devtool`，可以通过 `webpack -h` 列出所有 Webpack 支持的命令行参数。

就以上配置文件而言，在开发时执行命令 `webpack` 构建出方便调试的代码，在需要构建出发布到线上的代码时执行 `webpack --env.production` 构建出压缩的代码。

### 导出一个返回 Promise 的函数

在有些情况下你不能以同步的方式返回一个描述配置的 Object，Webpack 还支持导出一个返回 Promise 的函数，使用如下：

```js
module.exports = function(env = {}, argv) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        // ...
      });
    }, 5000);
  });
};
```

### 导出多份配置

除了只导出一份配置外，Webpack 还支持导出一个数组，数组中可以包含每份配置，并且每份配置都会执行一遍构建。

```js
module.exports = [
  // 采用 Object 描述的一份配置
  {
    // ...
  },
  // 采用函数描述的一份配置
  function() {
    return {
      // ...
    };
  },
  // 采用异步函数描述的一份配置
  function() {
    return Promise();
  }
];
```

以上配置会导致 Webpack 针对这三份配置执行三次不同的构建。

这特别适合于用 Webpack 构建一个要上传到 Npm 仓库的库，因为库中可能需要包含多种模块化格式的代码，例如 CommonJS、UMD。

## 管理多个单页应用

项目源码目录结构如下

```
├── pages
│   ├── index
│   │   ├── index.css // 该页面单独需要的 CSS 样式
│   │   └── index.js // 该页面的入口文件
│   └── login
│       ├── index.css
│       └── index.js
├── common.css // 所有页面都需要的公共 CSS 样式
├── google_analytics.js
├── template.html
└── webpack.config.js
```

从目录结构中可以看成出下几点要求：

- 所有单页应用的代码都需要放到一个目录下，例如都放在 pages 目录下；
- 一个单页应用一个单独的文件夹，例如最后生成的 index.html 相关的代码都在 index 目录下，login.html 同理；
- 每个单页应用的目录下都有一个 index.js 文件作为入口执行文件。

webpack.config.js

```js
const path = require("path");
const UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const { AutoWebPlugin } = require("web-webpack-plugin");

// 使用本文的主角 AutoWebPlugin，自动寻找 pages 目录下的所有目录，把每一个目录看成一个单页应用
const autoWebPlugin = new AutoWebPlugin("pages", {
  template: "./template.html", // HTML 模版文件所在的文件路径
  postEntrys: ["./common.css"], // 所有页面都依赖这份通用的 CSS 样式文件
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

google_analytics.js

```
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
```

```js
// pages/index/index.js
import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.css';

class App extends Component {
  render() {
    return <h1>Page Index</h1>
  }
}

render(<App/>, window.document.getElementById('app'));

// pages/index.css
h1 {
  background-color: blue;
}


// pages/login/index.js
import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.css';

class App extends Component {
  render() {
    return <h1>Page Login</h1>
  }
}

render(<App/>, window.document.getElementById('app'));

// pages/login/index.css
h1 {
  background-color: green;
}


// common.css
h1 {
  color: red;
}
```

template.html

```html
<html>
  <head>
    <meta charset="UTF-8" />
    <!--该页面所依赖的其它剩下的 CSS 注入的地方-->
    <!--STYLE-->
    <!--注入 google_analytics 中的 JS 代码-->
    <script src="./google_analytics.js?_inline"></script>
    <!--异步加载 Disqus 评论-->
    <script src="https://dive-into-webpack.disqus.com/embed.js" async></script>
  </head>
  <body>
    <div id="app"></div>
    <!--该页面所依赖的其它剩下的 JavaScript 注入的地方-->
    <!--SCRIPT-->
    <!--Disqus 评论容器-->
    <div id="disqus_thread"></div>
  </body>
</html>
```

## 使用 Webpack Dev Middleware

DevServer 是一个方便开发的小型 HTTP 服务器， DevServer 其实是基于 `webpack-dev-middleware` 和 `Expressjs` 实现的， 而 `webpack-dev-middleware` 其实是 `Expressjs` 的一个中间件。

也就是说，实现 DevServer 基本功能的代码大致如下：

```js
const express = require("express");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");

// 从 webpack.config.js 文件中读取 Webpack 配置
const config = require("./webpack.config.js");
// 实例化一个 Expressjs app
const app = express();

// 用读取到的 Webpack 配置实例化一个 Compiler
const compiler = webpack(config);
// 给 app 注册 webpackMiddleware 中间件
app.use(webpackMiddleware(compiler));
// 启动 HTTP 服务器，服务器监听在 3000 端口
app.listen(3000);
```

从以上代码可以看出，从 `webpack-dev-middleware` 中导出的 `webpackMiddleware` 是一个函数，该函数需要接收一个 `Compiler` 实例。 通过 Node.js API 启动 Webpack， Webpack API 导出的 webpack 函数会返回一个 Compiler 实例。

webpackMiddleware 函数的返回结果是一个 Expressjs 的中间件，该中间件有以下功能：

- 接收来自 Webpack Compiler 实例输出的文件，但不会把文件输出到硬盘，而是保存在内存中；
- 往 Expressjs app 上注册路由，拦截 HTTP 收到的请求，根据请求路径响应对应的文件内容；

通过 webpack-dev-middleware 能够将 DevServer 集成到你现有的 HTTP 服务器中，让你现有的 HTTP 服务器能返回 Webpack 构建出的内容，而不是在开发时启动多个 HTTP 服务器。 这特别适用于后端接口服务采用 Node.js 编写的项目。

Webpack Dev Middleware 支持的配置项 - 在 Node.js 中调用 webpack-dev-middleware 提供的 API 时，还可以给它传入一些配置项，方法如下：

```js
// webpackMiddleware 函数的第二个参数为配置项
app.use(
  webpackMiddleware(compiler, {
    // webpack-dev-middleware 所有支持的配置项
    // 只有 publicPath 属性为必填，其它都是选填项

    // Webpack 输出资源绑定在 HTTP 服务器上的根目录，
    // 和 Webpack 配置中的 publicPath 含义一致
    publicPath: "/assets/",

    // 不输出 info 类型的日志到控制台，只输出 warn 和 error 类型的日志
    noInfo: false,

    // 不输出任何类型的日志到控制台
    quiet: false,

    // 切换到懒惰模式，这意味着不监听文件变化，只会在请求到时再去编译对应的文件，
    // 这适合页面非常多的项目。
    lazy: true,

    // watchOptions
    // 只在非懒惰模式下才有效
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },

    // 默认的 URL 路径, 默认是 'index.html'.
    index: "index.html",

    // 自定义 HTTP 头
    headers: { "X-Custom-Header": "yes" },

    // 给特定文件后缀的文件添加 HTTP mimeTypes ，作为文件类型映射表
    mimeTypes: { "text/html": ["phtml"] },

    // 统计信息输出样式
    stats: {
      colors: true
    },

    // 自定义输出日志的展示方法
    reporter: null,

    // 开启或关闭服务端渲染
    serverSideRender: false
  })
);
```
