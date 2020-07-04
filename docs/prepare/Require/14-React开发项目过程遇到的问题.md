# 记录 React 开发项目过程遇到的问题(Webpack4/React16/antd 等)

[[toc]]

## 前言

自己搭的脚手架,坑都是一步一步踩完的;

技术栈: `react@16.6.0` / `react-router-dom@v4` / `webpack^4.23.1(babel7+)`

## 问题一:history 模式下,接口和请求冲突的问题

就是反向映射接口和请求的根路径重叠,如下:

```js
proxy: {
  '/': {
    target: 'http://192.168.31.100/api/web',
    changeOrigin: true,
    secure: false,
  }
},
```

这样映射会造成路由寻址不到…

这个问题我遇到的时候,浪费的挺多时间,最后发现还是有解的;

网上大多数人的写法就是,加个`prefix`(聚合一个前缀),然后用`pathRewrite`重写请求路径

```js
proxy: {
  '/api': {
    target: 'http://192.168.31.100/api/web',
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      '^/api': '/'
    },
  }
},
historyApiFallback: true
```

可这法子,不大适合我这边…能不能重叠又不影响,

翻了一些 Stack Overflow 上的问答和文档,发现还是有的.

下面的写法就是先判断是`html`请求还是其他请求,若是请求`html`则不反向代理

```js
proxy: {
  '/': {
    target: 'http://192.168.31.100/api/web',
    changeOrigin: true,
    secure: false,
    // pathRewrite: { '^/api': '/' },
    bypass: function(req, res, proxyOptions) {
      if (req.headers.accept.indexOf('html') !== -1) {
        console.log('Skipping proxy for browser request.');
        return '/index.html';
      }
    }
  }
},
historyApiFallback: true
```

## 问题二: 如何非 ts 下支持装饰器 , 以及常规的语法解析

因为用了`mobx`,实在不想用高阶函数的写法…一堆括号…

我是直接配置`babelrc`的. 跟随最新`babel 7`,装上这个依赖即可支持

- @babel/plugin-proposal-decorators – 装饰器支持
- @babel/plugin-syntax-dynamic-import – 动态引入相关代码,适用于代码分离
- babel/plugin-proposal-object-rest-spread – `...`的支持
- @babel/plugin-proposal-class-properties – `class`支持
- babel-plugin-import – 阿里出品的 `css` 按需加载
- react-hot-loader/babel – 配置 `react-hot-loader` 会用到

```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": [
            "last 3 versions",
            "safari >= 7"
          ]
        },
        "modules": false,
        "debug": false,
        "useBuiltIns": "usage"
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ],
    "@babel/plugin-proposal-object-rest-spread",
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": "css"
      }
    ],
    "@babel/plugin-syntax-dynamic-import",
    "react-hot-loader/babel"
  ]
}
```

## 问题三: mobx 实现路由基础鉴权

1. model

   ```js
   import { observable, action, computed, toJS } from "mobx";
   import API from "services"; // axios的封装

   class AuthModel {
     constructor() {}

     // 登录请求
     @action
     requestLogin = async values => {
       // 登录接口
       const data = await API.post("/admin/login", values);
       const AuthUserData = JSON.stringify(data);
       window.localStorage.setItem("AuthUserData", AuthUserData);
       window.location.href = "/";
     };

     // 退出登录
     @action
     requestLogout = async values => {
       this.UserData = {}; // 重置为空对象
       this.isPermission = false;
       window.localStorage.removeItem("AuthUserData");
       window.location.href = "/entrance/login";
     };

     @computed
     get isAuthenticated() {
       if (window.localStorage.getItem("AuthUserData")) {
         if (JSON.parse(window.localStorage.getItem("AuthUserData")).token) {
           return true;
         }
         return false;
       } else {
         return false;
       }
     }
   }

   const Auth = new AuthModel();

   export default Auth;
   ```

2. 在对应的入口引入,结合`react-route-dom`的`switch`跳转

   ```js
   import React, { Component } from "react";
   import { hot } from "react-hot-loader";
   import DevTools from "mobx-react-devtools";
   import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
   import { observer, inject } from "mobx-react";
   import "./App.css";
   import ErrorBoundary from "components/ErrorBoundary/ErrorBoundary";
   import asyncComponent from "components/asyncComponent/asyncComponent";

   // 登录注册找回密码
   const Entrance = asyncComponent(() => import("pages/Entrance/Entrance"));

   // 管理后台
   import AdminLayout from "pages/Layout/AdminLayout";

   @inject("auth")
   @observer
   export class App extends Component {
     constructor(props) {
       super(props);
     }
     componentDidMount = () => {};

     render() {
       const { isAuthenticated } = this.props.auth;
       return (
         <ErrorBoundary>
           <BrowserRouter>
             <div>
               <Switch>
                 <Route
                   path="/entrance"
                   render={() =>
                     isAuthenticated ? <Redirect exact to="/" /> : <Entrance />
                   }
                 />
                 <Route
                   path="/"
                   render={() =>
                     isAuthenticated ? (
                       <AdminLayout />
                     ) : (
                       <Redirect exact to="/entrance" />
                     )
                   }
                 />
               </Switch>
               {/**这里是开启了开发模式下显示mobx的devtool*/}
               {process.env.NODE_ENV === "development" ? <DevTools /> : null}
             </div>
           </BrowserRouter>
         </ErrorBoundary>
       );
     }
   }

   // react-hot-loader v4的写法
   export default hot(module)(App);
   ```

## 问题四: 加快开发模式下的编译,以及常规的美化输出

用了`happypack`来加快了`js`,`css`的便以速度(多进程);

给`css`也开启了`tree shaking`

我这个项目没有引入`less`或`sass`,用`styled-components@4`来写样式

webpack.base.config.js

```js
const webpack = require("webpack");
const path = require("path");

// 终端输出进度条
const WebpackBar = require("webpackbar");

// html模板
const HtmlWebpackPlugin = require("html-webpack-plugin");

// css 抽离
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 多进程编译
const HappyPack = require("happypack");
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});

// 给脚本预添加信息
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

// css tree shaking

const glob = require("glob");
const PurifyCSSPlugin = require("purifycss-webpack");

// 显示编译时间
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const chalk = require("chalk");

const config = {
  entry: [path.resolve(__dirname, "../src")],
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [path.resolve(__dirname, "../src"), "node_modules"],
    alias: {
      store: path.resolve(__dirname, "..", "src/store"),
      transition: path.resolve(__dirname, "..", "src/transition"),
      components: path.resolve(__dirname, "..", "src/components"),
      utils: path.resolve(__dirname, "..", "src/utils"),
      pages: path.resolve(__dirname, "..", "src/pages"),
      views: path.resolve(__dirname, "..", "src/views"),
      services: path.resolve(__dirname, "..", "src/services"),
      assets: path.resolve(__dirname, "..", "src/assets"),
      router: path.resolve(__dirname, "..", "src/router")
    }
  },
  performance: {
    hints: false
  },
  plugins: [
    // 显示打包时间
    new ProgressBarPlugin({
      format:
        "  build [:bar] " + chalk.green.bold(":percent") + " (:elapsed seconds)"
    }),
    // css tree shaking
    new PurifyCSSPlugin({
      // 路劲扫描 nodejs内置 路劲检查
      paths: glob.sync(path.join(__dirname, "pages/*/*.html"))
    }),
    // 进度条
    new WebpackBar(),
    // 定制全局变量
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    // 生成引用一个或多个出口文件的html，需要生成多少个 html 就 new 多少此该插件
    new HtmlWebpackPlugin({
      // 没有引入模板时的默认title，favicon也一样，但filename除外
      title: "index",
      favicon: path.resolve(__dirname, "../public/favicon.png"),
      // 定义插入到文档哪个节点，默认在body倒数位置
      inject: "body",
      filename: "index.html",
      template: path.resolve(__dirname, "../public/index.html"),
      // 压缩html文件
      // 详细的配置 https://github.com/kangax/html-minifier#options-quick-reference
      minify:
        process.env.NODE_ENV === "production"
          ? {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true
            }
          : {},
      // 在js文件后面加上一段hash码，默认为false
      hash: true
    }),
    new HappyPack({
      id: "js",
      threadPool: happyThreadPool,
      loaders: ["babel-loader?cacheDirectory=true"]
    }),
    new HappyPack({
      id: "css",
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: "css-loader",
          options: {
            importLoaders: 1 // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
          }
        },
        "postcss-loader"
      ]
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename:
        process.env.NODE_ENV !== "production"
          ? "static/css/[name].css"
          : "static/css/[name].[hash].css",
      chunkFilename:
        process.env.NODE_ENV !== "production"
          ? "static/css/[id].css"
          : "static/css/[id].[hash].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "../src")],
        exclude: /node_modules/,
        use: "happypack/loader?id=js"
      },
      {
        test: /\.css$/,
        loaders: [
          "style-loader",
          // {
          //     loader: 'css-loader',
          //     options: {
          //         importLoaders: 1 // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
          //     }
          // },
          // 'postcss-loader'
          "happypack/loader?id=css"
        ]
      },
      {
        test: /\.json$/,
        loader: "file-loader",
        options: {
          name: "json/[name].[ext]",
          outputPath: "static"
        }
      },
      {
        test: /\.(jpe?g|png|gif)(\?.*)?$/,
        include: [path.resolve(__dirname, "../src/assets/")],
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/images/[name].[ext]?[hash]",
              outputPath: "static"
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]",
              outputPath: "static"
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;
```

效果图如下

<img :src="$withBase('/images/prepare/require/2020010101.gif')" alt="prepare/require/2020010101.gif">

## 问题五: 用新的 getDerivedStateFromProps 取代 componentWillReceiveProps?

新的写法是组合写法,若是只用这个静态方法有时候会造成无限循环渲染,导致堆栈溢出

一旦用了`static getDerivedStateFromProps(nextProps, prevState)` ,必须返回一个值,

若是不更新`state`,那就返回 null;

有时候在这里返回新的`state`不够严谨,这时候就要结合`componentDidUpdate`来变得更可控

`componentDidUpdate = (prevProps, prevState, snapshot)` 这个生命周期的第三个参数

是用来捕获更新前的`state`(其实就是`getDerivedStateFromProps`返回的)

## 问题六：antd 上传组件结合 axios 上传失败

这个问题,挺坑的… `antd`官方文档说了可以设置`header`,

`header`为`form-data`就挂了(默认就是这个提交格式)

最终`axios`里面还要过滤下,在请求拦截器里面

```js
// 产生一个基于 axios 的新实例
const api = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? isDev : isProd, // 接口根路径
  timeout: 5000, // 超时时间
  withCredentials: true, // 是否跨站点访问控制请求,携带 cookie
  responseType: "json", // 响应数据格式
  headers: {
    // 设置请求头cd
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  }
});

// http请求拦截器
api.interceptors.request.use(
  config => {
    // 请求开始，蓝色过渡滚动条开始出现
    NProgress.start();
    if (window.localStorage.getItem("AuthUserData")) {
      let token =
        "不给你看 " +
        JSON.parse(window.localStorage.getItem("AuthUserData")).token;
      config.headers.Authorization = token;
    }

    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "patch"
    ) {
      //  这段就是问答的解决所在,识别为该格式的数据,不用`qs`编码,直接提交
      if (config.headers["Content-Type"] === "multipart/form-data") {
        return config;
      }

      // 若是需要对接口的字段进行序列化则可以使用一个迷你库
      // 在最顶部引入`qs`,序列化提交的数据
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    message.error(error);
    Promise.reject(error);
  }
);
```

## 问题七: Antd 及 moment 默认全局中文注入

```js
import React, {
  StrictMode,
  unstable_ConcurrentMode as ConcurrentMode
} from "react";
import ReactDOM from "react-dom";
import App from "App";

// mobx 注入
import { Provider } from "mobx-react"; // react mobx的耦合器
import RootStore from "store/store";

// 全局中文
import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import "moment/locale/zh-cn";

ReactDOM.render(
  <Provider {...RootStore}>
    <LocaleProvider locale={zh_CN}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById("root")
);
```

## ssr 项目中遇到的问题

1. 服务端如何写入数据到 store
2. 如何同步服务端的数据到客户端
