# CSS

[[toc]]

## 1. 盒模型

1. css 盒模型由两个盒子组成，外在的控制是否换行的盒子，以及内在的控制元素内容的盒子。比如：display: inline-block, 则它的外在的盒子就是 inline 也就是不占据一行，而 block 则表示内部的元素具有块状特性。所以，display: inline 其实就是 display: inline-inline 的缩写，display: block 就是 display: block-block 的缩写。
2. 每一个内在的盒子有: width/height, padding, border, margin 这几个控制盒子大小的属性。其中 width/height 控制元素内容大小，padding 则控制元素内容到 border 线内侧距离，border 则是元素外围边框大小，而 margin 则是控制与其他元素的间距，它的背景透明。
3. 对于早期，计算一个元素的占据大小，需要通过 `width +2* padding + 2*border` 来计算，css3 中提出了 box-sizing：border-box，通过这样设置，就可以使元素最终的宽高就是设定的 width/height, 浏览器会根据 width/height, padding, border 的大小来自动调整内部元素的大小。

- **标准模式**: `box-sizing: content-box;` 宽高不包括内边距和边框
- **怪异模式**: `box-sizing: border-box`

## 2. 什么是 BFC、可以解决哪些问题

BFC 就是块级格式上下文，是页面盒模型布局中的一种 CSS 渲染模式，相当于一个独立的容器，里面的元素和外部的元素相互不影响。

创建 BFC 的方式有：

1. html 根元素
2. float 浮动
3. 绝对定位 position 的值为 fixed / absolute；
4. overflow 不为 visiable
5. display 为表格布局或者弹性布局  
   display 的值为 table-cell / table-caption / inline-block / flex / inline-flex。

BFC 主要的作用是：

- 清除浮动
- 防止同一 BFC 容器中的相邻元素间的外边距重叠问题

## 3. 垂直居中方法

1. 利用 flex 布局：
   ```css
   .father {
     display: flex;
     justify-content: center;
     align-items: center;
   }
   ```
2. 利用 transform 属性进行位移：
   ```css
   .father {
     position: relative;
   }
   .children {
     position: absolute;
     left: 50%;
     top: 50%;
     transform: translate(-50%, -50%);
   }
   ```
3. 利用 calc()
   ```html
   <div class="d0">
       <div class=d1""></div>
   </div>
   ```
   ```css
   .d0 {
     position: relative;
     width: 300px;
     height: 300px;
     border: 1px solid red;
   }
   .d1 {
     position: absolute;
     width: 100px;
     height: 100px;
     border: 1px solid blue;
     left: calc(50% - 50px);
     top: calc(50% - 50px);
   }
   ```
4. 通过 table 属性<br>
   实现未知宽高元素垂直水平居中,主要原理是将父元素设置为 table，子元素设置为 table-cell，利用 table 属性

   ```html
   <style>
     .parent {
       display: table;
       width: 100%;
       height: 400px;
       background: #666;
     }
     .children {
       display: table-cell;
       vertical-align: middle;
       text-align: center;
       background: red;
     }
   </style>
   ```

## 4. 三栏布局

三栏布局 - 左右容器固定，中间容器自适应

```html
<div class="container">
  <div class="left">left</div>
  <div class="main">main</div>
  <div class="right">right</div>
</div>
```

```css
/* 第一种方式：flex  */
.container {
  display: flex;
}
.left {
  flex-basis: 200px;
  background: green;
}
.main {
  flex: 1;
  background: red;
}
.right {
  flex-basis: 200px;
  background: green;
}

/* 第二种方式：position + margin  */
.left,
.right {
  position: absolute;
  top: 0;
  background: red;
}
.left {
  left: 0;
  width: 200px;
}
.right {
  right: 0;
  width: 200px;
}
.main {
  margin: 0 200px;
  background: green;
}

/* 第三种方式 float + margin  */
.left {
  float: left;
  width: 200px;
  background: red;
}
.main {
  margin: 0 200px;
  background: green;
}
.right {
  float: right;
  width: 200px;
  background: red;
}
```

圣杯布局和双飞翼布局解决的问题是一样的，就是两边顶宽，中间自适应的三栏布局，中间栏要在放在文档流前面以优先渲染。

区别：

- 圣杯布局，为了中间 div 内容不被遮挡，将中间 div 设置了左右 padding-left 和 padding-right 后，将左右两个 div 用相对布局 position: relative 并分别配合 right 和 left 属性，以便左右两栏 div 移动后不遮挡中间 div。
- 双飞翼布局，为了中间 div 内容不被遮挡，直接在中间 div 内部创建子 div 用于放置内容，在该子 div 里用 margin-left 和 margin-right 为左右两栏 div 留出位置。

## 5. 清除浮动的方法

1. 给每个盒子设定固定的 width 和 height，直到合适为止，这样的好处是简单方便，兼容性好，适合只改动少量内容不涉及盒子排布的版面，缺点是非自适应，浏览器的窗口大小直接影响用户体验。
2. 给外部的父盒子也添加浮动，让其也脱离标准文档流，这种方法方便，但是对页面的布局不是很友好，不易维护。
3. 给父盒子添加 overflow 属性。 overflow:auto; 有可能出现滚动条，影响美观。overflow:hidden; 可能会带来内容不可见的问题。
4. 父盒子里最下方引入清除浮动块。最简单的有：
   . 有很多人是这么解决的，但是并不推荐，因为其引入了不必要的冗余元素 。
5. after 伪类清除浮动。外部盒子的 after 伪元素设置 clear 属性。这是一种纯 CSS 的解决浮动造成盒子塌陷方法，没有引入任何冗余元素，但是低版本 IE 不兼容。

## 6. flex

flex 是一个 CSS 的 display 属性中新添加一个值。 随着 inline-flex 的使用，它将使它适用的元素成为一个 flex container（伸缩容器），而这个元素的每个子元素将成为 flex item（伸缩项目）

flex 属性是`flex-grow`, `flex-shrink` 和 `flex-basis` 属性的简写。

Flex 弹性盒布局<br>
注意：采用 flex 布局后，子元素的样式`float`、`clear`和`vertical-align`失效

Flex 容器属性
| 属性名称 | 说明 | 可选值 |
| ------ | ------- | ------------- |
| flex-direction | 决定主轴的方向(项目的排列方向) | row、row-revrse、column、column-reverse |
| flex-wrap | 默认情况下，项目都排在轴线上，如果超出一行，该属性定义如何换行 | nowrap、wrap、wrap-reverse |
| justify-content | 定义项目在主轴上的对齐方式 | flex-start、flex-end、center、space-between、space-around |
| align-items | 定义项目在交叉轴上的对齐方式 | flex-start、flex-end、center、baseline、stretch |
| align-content | 定义了多根轴线的对齐方式，如果项目只有一根轴线，该属性不起作用 | flex-start、flex-end、center、space-between、space-around、stretch |

Flex 项目属性
| 属性名称 | 说明 |
| -------- | ------------- |
| order | 定义项目的排列顺序，值越小，排列越靠前，默认值为 0 |
| flex-grow | 定义项目的放大比例，默认为 0 |
| flex-shrink | 定义项目的缩小比例，默认为 1 |
| flex-basis | 定义了在分配剩余空间之前，项目占据的主轴空间，浏览器根据这个属性值，计算主轴的剩余空间。默认值为"auto",即项目的实际大小 |
| align-self | 设置单个项目的对齐方式，可覆盖 Flex 容器设置的 align-items 属性。可选值 auto、flex-start、flex-end、center、baseline、stretch |

## 7. Css3 新增伪类伪元素

```
x:first-of-type → 选择属于其父元素的首个 <x> 元素的每个 <x> 元素
x:last-of-type → 选择属于其父元素的最后一个 <x> 元素的每个 <x> 元素
x:only-of-type 选择属于其父元素唯一的 <x> 元素的每个 <x> 元素
x:only-child 选择属于其父元素的唯一子元素的每个 <x> 元素
x:nth-child(1) 选择属于其父元素的第一个子元素的每个 <x> 元素

:enabled 每个已启用的元素（多用于表单元素 例如input）
:disabled 控制表单控件的禁用状态
:checked，单选框或复选框被选中
:before在元素之前添加内容（可用来做清除浮动）
:after在元素之后添加内容
```

伪类和伪元素的根本区别在于：**它们是否创造了新的元素(抽象)**。

## 8. position

position 属性共有 5 和属性值，分别如下

- relative 相对定位，相对于自身位置进行定位
- absolute 绝对定位，相对于 position 不为 static 的第一个父级元素进行定位
- fixed 固定定位。相对于浏览器窗口进行定位
- inherit 继承父级元素 position 属性值
- static 默认值，即没有定位，仍为文档流

## 9. Css3 有哪些新特性？

- 各种 css 选择器
- 圆角 border-radius
- 多列布局
- 文本效果
- 线性渐变
- 2D 转换
- 过渡 transition
- 动画 animation
- flex 布局
- 旋转 transform
- 媒体查询

## 10. Css 有哪些引入方式？通过 link 和@import 引入有什么区别？

Css 引入方式有 4 种 `内联`、`内嵌`、`外链`、`导入`

- `外链 link` 除了可以加载 css 之外,还可以定义 rss、rel 等属性，没有兼容性问题，支持使用 javascript 改变样式
- `@import` 是 css 提供的，只能用于加载 css，不支持通过 javascript 修改样式
- ▲ 页面被加载的时候，`link` 会被同时加载，而`@import`则需等到页面加载完后再加载，可能出现无样式网页

## 11. Css 优化，如何提高性能

- 避免过渡约束
- 避免后代选择符
- 避免链式选择符
- 使用紧凑的语法
- 避免不必要的命名空间
- 避免不必要的重复样式
- 使用具有语义的名字
- 避免使用 !important
- 尽可能地精简规则
- 修复解析错误
- 避免使用多种类型选择符
- 移除空的 css 规则
- 正确使用 display 属性
- 不滥用浮动
- 不滥用 web 字体
- 不声明过多 font-size
- 少使用 id 选择器
- 不给 h1-h6 定义过多样式
- 不重复定义 h1-h6
- 值为 0 时不需要任何单位
- 标准化各种浏览器前缀
- 遵守盒模型规则

## 12. PostCSS、Sass、Less 的异同，以及使用配置

- 编译环境不一样，Sass 的安装需要 Ruby 环境，是在服务端处理的，而 Less 是需要引入 less.js 来处理 Less 代码输出 css 到浏览器，也可以在开发环节使用 Less，然后编译成 css 文件，直接放到项目中；
- 变量符号不一样，Less 是@，而 Scss 是\$；
- 输出设置，Less 没有输出设置，Sass 提供 4 中输出选项：nested, compact, compressed 和 expanded；
- 处理条件语句，Sass 支持条件语句，可以使用`if{}else{}`,`for{}`循环等等。LESS 的条件语句使用有些另类，他不是我们常见的关键词 if 和 else if 之类，而其实现方式是利用关键词“when”；
- 引用外部文件，文件名如果以下划线\_开头的话，Sass 会认为该文件是一个引用文件，不会将其编译为 css 文件，ess 引用外部文件和 css 中的@import 没什么差异；
- 工具库的不同，Sass 有工具库 Compass, 简单说，Sass 和 Compass 的关系有点像 Javascript 和 jQuery 的关系,Compass 在 Sass 的基础上，封装了一系列有用的模块和模板，补充强化了 Sass 的功能。Less 有 UI 组件库 Bootstrap,Bootstrap 是 web 前端开发中一个比较有名的前端 UI 组件库，Bootstrap 的样式文件部分源码就是采用 Less 语法编写。

PostCSS 介绍

- PostCSS 的主要功能只有两个：第一个就是前面提到的把 CSS 解析成 JavaScript 可以操作的 AST，第二个就是调用插件来处理 AST 并得到结果。因此，不能简单的把 PostCSS 归类成 CSS 预处理或后处理工具。PostCSS 所能执行的任务非常多，同时涵盖了传统意义上的预处理和后处理。

PostCSS 使用

- PostCSS 一般不单独使用，而是与已有的构建工具进行集成。PostCSS 与主流的构建工具，如 Webpack、Grunt 和 Gulp 都可以进行集成。完成集成之后，选择满足功能需求的 PostCSS 插件并进行配置。现在经常用到的是基于 `PostCSS` 的 `Autoprefixer` 插件，使用方式可以在官网的插件库进行查询。下面是官网地址：

## 13. CSS 如何配置按需加载

1. 使用 require.js 按需加载 CSS

   ```js
   //模块test.js
   define(["css!../css/test.css"], function() {
     //先加载依赖样式
     var test = {};
     return test;
   });

   //配置
   require.config({
     map: {
       //map告诉RequireJS在任何模块之前，都先载入这个模块
       "*": {
         css: "lib/css"
       }
     },
     paths: {
       test: "lib/test"
     }
   });

   //调用
   require(["test"]);
   ```

2. webpack 配置 CSS 的按需加载
   ```js
   // 这里以ant desgin css 为例：
   {
     test: /\.(js|mjs|jsx|ts|tsx)$/,
     include: paths.appSrc,
     loader: require.resolve('babel-loader'),
     options: {
       customize: require.resolve(
         'babel-preset-react-app/webpack-overrides'
       ),
       plugins: [
         ["import",{libraryName: "antd", style: 'css'}],   //只需加一行，手动划重点antd按需加载
         [
           require.resolve('babel-plugin-named-asset-import'),
           {
             loaderMap: {
               svg: {
                 ReactComponent: '@svgr/webpack?-svgo,+ref![path]',
               },
             },
           },
         ],
       ],
       cacheDirectory: true,
       cacheCompression: isEnvProduction,
       compact: isEnvProduction,
     },
   }
   ```

## 14. rem 实现

比如说“魅族”移动端的实现方式，`viewport`也是固定的：
`<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">`。

通过以下代码来控制`rem`基准值(设计稿以 720px 宽度量取实际尺寸)

```js
!(function(d) {
  var c = d.document;
  var a = c.documentElement;
  var b = d.devicePixelRatio;
  var f;

  function e() {
    var h = a.getBoundingClientRect().width,
      g;
    if (b === 1) {
      h = 720;
    }
    if (h > 720) h = 720; //设置基准值的极限值
    g = h / 7.2;
    a.style.fontSize = g + "px";
  }

  if (b > 2) {
    b = 3;
  } else {
    if (b > 1) {
      b = 2;
    } else {
      b = 1;
    }
  }
  a.setAttribute("data-dpr", b);
  d.addEventListener(
    "resize",
    function() {
      clearTimeout(f);
      f = setTimeout(e, 200);
    },
    false
  );
  e();
})(window);
```

`css`通过`sass`预编译，设置量取的`px`值转化`rem`的变量`$px: (1/100)+rem;`

## 15. 使用 rem 单位进行界面的适配

这个适配的代码主要分为以下几步：

1. 设置基准字体大小
2. 设置界面尺寸变化事件的监听，刷新基准字体大小
3. 在布局中使用 rem 单位编写界面样式

代码如下：

```js
/*以下代码为不同屏幕下字体通过rem适配设计稿的方案
  @designWidth 设计稿的全屏宽度
  @maxWidth  适配的最大宽度
*/
(function(designWidth, maxWidth) {
  var doc = document,
    win = window;
  var docEl = doc.documentElement;
  var remStyle = document.createElement("style");
  //获取基准字体大小
  function refreshRem() {
    // var width = parseInt(window.screen.width); // uc有bug
    var width = docEl.getBoundingClientRect().width;
    if (!maxWidth) {
      maxWidth = 750;
    }
    if (width > maxWidth) {
      width = maxWidth;
    }
    var rem = (width / designWidth) * 100;
    //得到的rem基准字体大小，这里乘以100是为了适配有的浏览器不识别小数，会导致设置字体无效。
    //设置根元素html的字体大小为基准字体大小，在css中每rem就是这个值的大小。
    remStyle.innerHTML = "html{font-size:" + rem + "px;} ";
  }
  refreshRem();
  if (docEl.firstElementChild) {
    docEl.firstElementChild.appendChild(remStyle);
  } else {
    var wrap = doc.createElement("div");
    wrap.appendChild(remStyle);
    doc.write(wrap.innerHTML);
    wrap = null;
  }
  /* 以下为在不同的时机重新计算rem*/
  win.addEventListener(
    "resize",
    function() {
      // clearTimeout(tid); //防止执行两次
      // tid = setTimeout(refreshRem, 50);
      refreshRem();
    },
    false
  );

  win.addEventListener(
    "pageshow",
    function(e) {
      if (e.persisted) {
        // 浏览器后退的时候重新计算
        refreshRem();
        // clearTimeout(tid);
        // tid = setTimeout(refreshRem,50);
      }
    },
    false
  );
})(750, 750);
```

执行上面的代码之后，我们只需要将设计稿上的尺寸除以 100，并将单位换成 rem 即可；

比如：

设计稿给出

```css
div: {
  width: 100px;
  height: 100px;
}
```

那么我们需要写成：

```css
div: {
  width: 1rem;
  height: 1rem;
}
```

## 16. Rem 与 Px 的转换

### 一、sass 预处理器

1. **rem 在 @function 中的使用**  
   通过 `@function` 来实现 px 转为 rem 计算

   ```js
   @function pxTorem($px){ // $px 为需要转换的字号
       @return $px / 100px * 1rem;
   }
   ```

   ```SCSS
   // SCSS
   .header {
     font-size: pxTorem(100px);
   }

   // CSS
   .header {
     font-size: 1rem;
   }
   ```

2. **Sass 中 mixin 实现 rem**  
   简单 mixin，用来实现 font-size 的 px 转 rem：

   ```scss
   @mixin font-size($target) {
     font-size: $target;
     font-size: ($target / $browser-default-font-size) * 1rem;
   }
   ```

   在实际使用中，可以通过@include 调用定义好的@mixin font-size:

   ```scss
   //SCSS
   .footer {
     @include font-size(12px);
   }

   //CSS
   .footer {
     font-size: 12px;
     font-size: 0.75rem;
   }
   ```

   ```scss
   // 定义一个变量和一个mixin
   $baseFontSize: 16; //默认基准font-size
   @mixin px2rem($name, $px) {
     #{$name}: $px / $baseFontSize * 1rem;
   }

   // 使用示例：
   .container {
     @include px2rem(height, 240);
   }

   // scss翻译结果：
   .container {
     height: 3.2rem;
   }
   ```

3. **增强版 mixin 功能扩展**

   ```scss
   @mixin remCalc($property, $values...) {
     $max: length($values); //返回$values列表的长度值
     $pxValues: "";
     $remValues: "";

     @for $i from 1 through $max {
       $value: strip-units(
         nth($values, $i)
       ); //返回$values列表中的第$i个值，并将单位值去掉
       $browser-default-font-size: strip-units($browser-default-font-size);
       $pxValues: #{$pxValues + $value * $browser-default-font-size}px;

       @if $i < $max {
         $pxValues: #{$pxValues + " "};
       }
     }

     @for $i from 1 through $max {
       $value: strip-units(nth($values, $i));
       $remValues: #{$remValues + $value}rem;

       @if $i < $max {
         $remValues: #{$remValues + " "};
       }
     }

     #{$property}: $pxValues;
     #{$property}: $remValues;
   }
   ```

   在这个 remCalc()中定义了两个参数$property和$values...。其中$property表示的是样式属性，而$values...表示一个或者多个属性值。

   注：在上面定义的 remCalc 中使用了下自定义的函数 strip-units，主要用来去除单位，详细的请参阅 [Sass 基础——PX to EM Mixin 和@function](http://www.w3cplus.com/preprocessor/sass-px-to-em-with-mixin-and-function.html) 一文中的 strip-units 函数定义方法。

   px 转 rem 的 mixin 定义完成后，就可以通过@include 来引用：

   ```scss
   //SCSS
   .wrapper {
     @include remCalc(width, 45);
     @include remCalc(margin, 1, 0.5, 2, 3);
   }

   //CSS
   .wrapper {
     width: 720px;
     width: 45rem;
     margin: 16px 8px 32px 48px;
     margin: 1rem 0.5rem 2rem 3rem;
   }
   ```

### 二、less 预处理器

```less
// 定义一个变量, 注：移动端基于视觉稿横屏尺寸/100得出基准font-size
@baseFontSize: 16;
// rem转换函数
.px2rem(@name, @px) {
  @{name}: @px / @baseFontSize * 1rem;
}

// 使用示例
.container {
  .px2rem(font-size, 14);
}

// less翻译结果
.container {
  font-size: 0.85rem;
}
```

### 三、less webpack px 转 rem 插件

less px 转 rem 插件

以下为代码：文件名 pxToRem.js

```js
function Pxtorem(options = {}) {
  const defaultOptions = {
    basePx: options.basePx || 37.5, // 设计稿 跨度 /10
    precision: options.precision || false // px转成rem后的数字精度
  };
  this.options = Object.assign({}, defaultOptions, options);
}
Pxtorem.prototype.install = function(less, pluginsmannager, functionRegistry) {
  const that = this;
  functionRegistry.addMultiple({
    pxToRem(pxObject, precisionObject) {
      const {
        options: { basePx }
      } = that;
      let {
        options: { precision }
      } = that;
      const { value: px } = pxObject;
      precisionObject && (precision = precisionObject.value);
      let rem = px / basePx;
      if (precision !== false && typeof precision === "number") {
        rem = rem.toFixed(precision);
      }
      return `${rem}rem`;
    }
  });
};
// 数字精度转换
function controlPrecision(number, precision) {
  const numberStr = String(number);
  const numList = numberStr.split(".");
  const lastNumStr = numList[1];
  if (
    (lastNumStr && lastNumStr.length === 0) ||
    numberStr.length <= precision
  ) {
    return numberStr;
  }
  if (numberStr.length > precision) {
    const precisionLastNextBit = numberStr[precision];
    const num = Number(precisionLastNextBit);
    let outNumber = Number(numberStr.substr(0, precision));
    num >= 5 && outNumber++;
    return outNumber;
  }
}
module.exports = Pxtorem;
```

使用方法在 webpack 里配置

```js
const PxToRem = require('./pxToRem');
...
{
    loader: 'less-loader',
    options: {
      plugins: [
        PxToRem,
      ],
  }
...
```

less 中使用

```less
// less
.container {
  width: pxToRem(37.5px);
}

// 会转成
.container {
  width: 1rem;
}
```

### 四、stylus 预处理器

```styl
// 定义一个变量和一个mixin
$baseFontSize = 16; //默认基准font-size
px2rem(name, px){
  {name}: px / $baseFontSize * 1rem;
}

// 使用示例：
.container {
  px2rem('height', 240);
}

// stylus翻译结果：
.container {
  height: 3.2rem;
}
```

## 17. 移动端项目中 @2x 图 和 @3x 图 的使用（需要支持 css3）

### 一、通过 mixin,动态修改图标的背景图片。通过@media (媒体查询)，判断设备的 dpr

1. 通过 mixin,动态修改图标的背景图片。通过`@media (媒体查询)`，判断设备的 dpr。

   ```css
   @mixin bg-image($url) {
     background-image: url($url+"@2x.png");
     @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
       background-image: url($url+"@3x.png");
     }
   }
   ```

2. css 样式中调用 bg-image 方法
   ```sass
   div{
     width:30px;
     height:20px;
     background-size:30px  20px;
     background-repeat:no-repeat;
     @include bg-image('special_1');
   }
   ```

### 二、使用 CSS 的 DevicePixelRatio 媒查询属性

CSS 样式代码

```css
/*默认大小*/
.photo {
  background-image: url(image100.png);
}
/* 如果设备像素大于等于2，则用2倍图 */
@media screen and (-webkit-min-device-pixel-ratio: 2),
  screen and (min--moz-device-pixel-ratio: 2) {
  .photo {
    background-image: url(image200.png);
    background-size: 100px 100px;
  }
}
/* 如果设备像素大于等于3，则用3倍图 */
@media screen and (-webkit-min-device-pixel-ratio: 3),
  screen and (min--moz-device-pixel-ratio: 3) {
  .photo {
    background-image: url(image300.png);
    background-size: 100px 100px;
  }
}
.photo {
  width: 100px;
  height: 100px;
}
```

### 三、直接使用 IMG 的 SRCSET 属性

`<img width="100" height="100" src="image100.png" srcset="image200.png 2x,image300.png 3x"/>`

上面代码中，浏览器会通过 `srcset` 属性来自动选择 2X,3X 图，比如用 iPhone 6s Plus，就会自动选择 3x 的图像。

## 18. 移动端 border 的 1px 问题

构建 1 个伪元素，将它的长宽放大到 2 倍，边框宽度设置为 1px,再以 transform 缩放到 50%

1. 为了方便通用，使用 mixin 定义一个函数。

   ```sass
   @mixin border-1px($color) {
     position: relative;
     &:after{
       display: block;
       position: absolute;
       left: 0;
       bottom: 0;
       width: 100%;
       border-top: 1px solid $color;
       content: ' ';
     }
   }
   ```

2. 对 伪类 :after 进行缩放，以适应不同 dpr 的手机。通过 @media (媒体查询)，来确定 设备的 dpr。 为了方便调用，定义一个全局的 class (此处为 border-1px)

   ```sass
   /* 判断在不同dpr下的显示情况 */
   @media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5) {
     .border-1px{
       &::after{
         -webkit-transform: scaleY(0.7);
         transform: scaleY(0.7);
       }
     }
   }

   @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
     .border-1px{
       &::after{
         -webkit-transform: scaleY(0.5);
         transform: scaleY(0.5);
       }
     }
   }
   ```

3. html/css 样式调用.

   ```html
   <div class="tab border-1px">
     <div class="tab-item">
       <a v-link="{path:'/goods'}">商品</a>
     </div>
     <div class="tab-item">
       <a v-link="{path:'/ratings'}">评价</a>
     </div>
     <div class="tab-item">
       <a v-link="{path:'/seller'}">商家</a>
     </div>
   </div>
   ```

   ```sass
   .tab{
       display: flex;
       width: 100%;
       height: 40px;
       line-height: 40px;
       @include border-1px(rgba(7,17,27,0.1));
   }
   ```

## 19. 相邻的两个 inline-block 节点为什么会出现间隔，该如何解决

产生间隔的原因：

元素被当成行内元素排版的时候，原来 HTML 代码中的回车换行被转成一个空白符，在字体不为 0 的情况下，空白符占据一定宽度，所以 inline-block 的元素之间就出现了空隙。这些元素之间的间距会随着字体的大小而变化，当行内元素 font-size:16px 时，间距为 8px。

解决方案:

1. 给父级元素设置 font-size： 0；子元素设置相应的 font-size
2. 改变书写方式，元素间留白间距出现的原因就是标签段之间的空格，因此，去掉 HTML 中的空格，自然间距就消失了
3. margin 负值
4. 设置父元素，display:table 和 word-spacing

## 20. css3 中有哪些属性可以直接影响 JS 中的事件？（可以讲一下 pointer-events 和 touch-action 属性吗？）

css3 中有`两个`属性是可以直接影响到 JS 中的事件的，他们是`pointer-events`和`touch-action`。

- **pointer-events** CSS 属性指定在什么情况下 (如果有) 某个特定的图形元素可以成为鼠标事件的 target。当该属性值设定为 none 时 表示鼠标事件“穿透”该元素并且指定该元素“下面”的任何东西。

  需要注意的是，如果当前元素的 pointer-events 属性指定位 none，但是当其后代元素的 pointer-events 属性指定其他值时，鼠标事件可以指向后代元素，在这种情况下，鼠标事件将在捕获或冒泡阶段触发父元素的事件侦听器。

- **touch-action** 用于指定某个给定的区域是否允许用户操作，以及如何响应用户操作（比如浏览器自带的划动、缩放等）。

  最常见的用法是禁用元素（及其不可滚动的后代）上的所有手势，以使用自己提供的拖放和缩放行为（如地图或游戏表面）。

  ```css
  #map {
    touch-action: none;
  }
  ```

## 21. line-height

默认状态，浏览器使用 1.0-1.2 line-height, 这是一个初始值。你可以定义 line-height 属性来覆盖初始值：p｛line-height:140%｝

你可以有 5 种方式来定义 line-height。

1. line-height 可以被定义为：body{line-height:normal;}
2. line-height 可以被定义为：body{line-height:inherit;}
3. line-height 可以使用一个百分比的值 body{line-height:120%;}
4. line-height 可以被定义为一个长度值(px,em 等) body{line-height:25px;}
5. line-height 也可以被定义为纯数字， body{line-height:1.2}

对于 line-height 继承有点复杂。

1. 百分比： **计算出来的值会被层叠下去的元素所继承**
   <div align="center"><img :src="$withBase('/images/prepare/new/2020053001.png')" alt="prepare/new/2020053001.png"></div>
2. 长度： **长度值会被后代元素继承**
   <div align="center"><img :src="$withBase('/images/prepare/new/2020053002.png')" alt="prepare/new/2020053002.png"></div>
3. normal  
    跟着用户的浏览器走，且与元素字体关联
   <div align="center"><img :src="$withBase('/images/prepare/new/2020053003.png')" alt="prepare/new/2020053003.png"></div>
4. 纯数字 如 1.5  
    所有可继承元素根据 font-size 重新计算行高
   <div align="center"><img :src="$withBase('/images/prepare/new/2020053004.png')" alt="prepare/new/2020053004.png"></div>
   <div align="center"><img :src="$withBase('/images/prepare/new/2020053005.png')" alt="prepare/new/2020053005.png"></div>

## 22. 单行、多行文本溢出显示省略号（…）

```css
.one {
  overflow: hidden; /*超出部分隐藏*/
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  white-space: nowrap; /*规定段落中的文本不进行换行 */
  width: 250px; /*需要配合宽度来使用*/
  border: 1px solid red;
  font-size: 30px;
}

.multi {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
　-webkit-box-orient: vertical;
　-webkit-line-clamp: 3;
　　
　width: 250px;
　border: 1px solid red;
　font-size: 30px;　
}
```

## 23. 怎么让英文单词的首字母大写？

```css
.demo {
  text-transform: capitalize;
}
```

第一行文字的第一个字母大写。

```css
.demo::first-letter {
  text-transform: uppercase;
}
```

## 24. 遇到 overflow: scroll 不能平滑滚动怎么解决？

iphone 上解决方法是这样的，
`-webkit-overflow-scrolling: touch;`

## 25. 使用纯 CSS 代码实现动画的暂停与播放

一个属性：`animation-play-state` <br />
取值：paused（暂停）|running（播放）

hover 取代点击

```css
.stop:hover ~ .animation {
  animation-play-state: paused;
}
```

checked 伪类

radio 标签的 checked 伪类，加上实现点击响应

```css
#stop:checked ~ .animation {
  animation-play-state: paused;
}
#play:checked ~ .animation {
  animation-play-state: running;
}
```

## 26. transition、animation、transform 三者有什么区别？

`transition` 顾名思义,定义过渡动效;一般都是定义某些属性的过渡动效; <br />
`animation`: 定义动画,而不是简单的动效了; 必须通过一个 keframe 来指定动画过程;<br />
`transform`: 不定义任何动效或者动画; 只用来定义"变形"; 可以作为 keyframe 关键帧的动画效果;

## 27. 请举例说明 css 属性继承？

- **不可继承**：

  1. display：规定元素应该生成的框的类型
  2. 文本属性：
     - vertical-align：垂直文本对齐
     - text-decoration：规定添加到文本的装饰
     - text-shadow：文本阴影效果
     - white-space：空白符的处理
     - unicode-bidi：设置文本的方向
  3. 盒子模型的属性：width、height、margin 、margin-top、margin-right、margin-bottom、margin-left、border、border-style、border-top-style、border-right-style、border-bottom-style、border-left-style、border-width、border-top-width、border-right-right、border-bottom-width、border-left-width、border-color、border-top-color、border-right-color、border-bottom-color、border-left-color、border-top、border-right、border-bottom、border-left、padding、padding-top、padding-right、padding-bottom、padding-left
  4. 背景属性：background、background-color、background-image、background-repeat、background-position、background-attachment
  5. 定位属性：float、clear、position、top、right、bottom、left、min-width、min-height、max-width、max-height、overflow、clip、z-index
  6. 生成内容属性：content、counter-reset、counter-increment
  7. 轮廓样式属性：outline-style、outline-width、outline-color、outline
  8. 页面样式属性：size、page-break-before、page-break-after
  9. 声音样式属性：pause-before、pause-after、pause、cue-before、cue-after、cue、play-during

- **可继承**：

  1. 所有元素可继承：visibility 和 cursor
  2. 内联元素可继承：letter-spacing、word-spacing、white-space、line-height、color、font、 font-family、font-size、font-style、font-variant、font-weight、text- decoration、text-transform、direction
  3. 块状元素可继承：text-indent 和 text-align
  4. 列表元素可继承：list-style、list-style-type、list-style-position、list-style-image
  5. 表格元素可继承：border-collapse

## 28. 如何实现一个自适应的正方形

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
    <style>
      /* 都是像对于屏幕宽度的比例 */
      .square1 {
        width: 10%;
        height: 10vw;
        background: red;
      }
      /* margin/padding 百分比是相对父元素 width 的 */
      .square2 {
        width: 20%;
        height: 0;
        padding-top: 20%;
        background: orange;
      }
      /* 通过子元素 margin */
      .square3 {
        width: 30%;
        overflow: hidden; /* 触发 BFC */
        background: yellow;
      }
      .square3::after {
        content: "";
        display: block;
        margin-top: 100%; /* 高度相对于 square3 的 width */
      }
    </style>
  </head>
  <!-- 画一个正方形 -->
  <body>
    <div class="square1"></div>
    <div class="square2"></div>
    <div class="square3"></div>
  </body>
</html>
```

## 29. 实现一个三角形

```html
<!DOCTYPE html>
<html>
  <head>
    <title>三角形</title>
    <style type="text/css">
      .box1,
      .box2,
      .box3,
      .box4 {
        height: 0px;
        width: 0px;
        float: left;
        border-style: solid;
        margin: 10px;
      }

      .box1 {
        /* 等腰直角 */
        border-width: 100px;
        border-color: tomato transparent transparent transparent;
      }

      .box2 {
        /* 等边 */
        border-width: 100px 173px;
        border-color: transparent tomato transparent transparent;
      }

      .box3 {
        /* 等腰 */
        border-width: 100px 80px;
        border-color: transparent transparent tomato transparent;
      }

      .box4 {
        /* 其他 */
        border-width: 100px 90px 80px 70px;
        border-color: transparent transparent transparent tomato;
      }
    </style>
  </head>

  <body>
    <div class="box1"></div>
    <div class="box2"></div>
    <div class="box3"></div>
    <div class="box4"></div>
  </body>
</html>
```

## 30. 实现一个 1/4 圆、任意弧度的扇形

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      /* 通过 border 和 border-radius 实现 1/4 圆 */
      .sector1 {
        height: 0;
        width: 0;
        border: 100px solid;
        border-radius: 50%;
        border-color: turquoise tomato tan thistle;
      }
      /* 类似三角形的做法加上父元素 overflow: hidden; 也可以实现任意弧度圆 */
      .sector2 {
        height: 100px;
        width: 200px;
        border-radius: 100px 100px 0 0;
        overflow: hidden;
      }
      .sector2::after {
        content: "";
        display: block;
        height: 0;
        width: 0;
        border-style: solid;
        border-width: 100px 58px 0;
        border-color: tomato transparent;
        transform: translate(42px, 0);
      }
      /* 通过子元素 rotateZ 和父元素 overflow: hidden 实现任意弧度扇形（此处是60°） */
      .sector3 {
        height: 100px;
        width: 100px;
        border-top-right-radius: 100px;
        overflow: hidden;
        /* background: gold; */
      }
      .sector3::after {
        content: "";
        display: block;
        height: 100px;
        width: 100px;
        background: tomato;
        transform: rotateZ(-30deg);
        transform-origin: left bottom;
      }
      /* 通过 skewY 实现一个60°的扇形 */
      .sector4 {
        height: 100px;
        width: 100px;
        border-top-right-radius: 100px;
        overflow: hidden;
      }
      .sector4::after {
        content: "";
        display: block;
        height: 100px;
        width: 100px;
        background: tomato;
        transform: skewY(-30deg);
        transform-origin: left bottom;
      }
      /* 通过渐变设置60°扇形 */
      .sector5 {
        height: 200px;
        width: 200px;
        background: tomato;
        border-radius: 50%;
        background-image: linear-gradient(150deg, transparent 50%, #fff 50%),
          linear-gradient(90deg, #fff 50%, transparent 50%);
      }
    </style>
  </head>
  <body>
    <div style="display: flex; justify-content: space-around;">
      <div class="sector1"></div>
      <div class="sector2"></div>
      <div class="sector3"></div>
      <div class="sector4"></div>
      <div class="sector5"></div>
    </div>
  </body>
</html>
```

## 31. CSS 实现宽度自适应 100%，宽高 16:9 的比例的矩形

如果宽为 100%，高为 100/16\*9 = 56.25%

```css
* {
  margin: 0;
  padding: 0;
}
div {
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  background-color: red;
}
```

## 32. 用 CSS 绘制一个红色的爱心

```css
.heart {
  position: relative;
  width: 100px;
  height: 90px;
}

.heart:before,
.heart:after {
  position: absolute;
  content: "";
  left: 50px;
  top: 0;
  width: 50px;
  height: 80px;
  background: red;
  border-radius: 50px 50px 0 0;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
}

.heart:after {
  left: 0;
  transform: rotate(45deg);
  transform-origin: 100% 100%;
}
```

## 33. 请使用 css 画一个圆，方法可以多种

```html
<div class="circle"></div>
```

1. border-radius
   ```css
   .cirlce {
     width: 10vw;
     height: 10vw;
     background: gray;
     border-radius: 50%;
   }
   ```
2. clip-path
   ```css
   .circle {
     width: 10vw;
     height: 10vw;
     background: gray;
     clip-path: circle();
   }
   ```
3. svg background
   ```css
   .circle {
     width: 10vw;
     height: 10vw;
     background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50%25' cy='50%25' r='50%25' fill='gray'/%3E%3C/svg%3E");
   }
   ```
4. radial-gradient
   ```css
   .circle {
     width: 10vw;
     height: 10vw;
     background: radial-gradient(gray 70%, transparent 70%);
   }
   ```
5. font
   ```css
   .circle::after {
     content: "●";
     font-size: 10vw; /*字体实际大小*/
     line-height: 1;
   }
   ```
6. mix-blend-mode
   ```css
   .circle {
     width: 10vw;
     height: 10vw;
     background: gray;
   }
   .circle::after {
     content: "";
     display: block;
     width: 10vw;
     height: 10vw;
     mix-blend-mode: lighten;
     background: radial-gradient(#000 70%, #fff 70%);
   }
   ```

## 34. 当全国哀悼日时，怎么让整个网站变成灰色呢？

CSS filter `grayscale`

```css
body {
  -webkit-filter: grayscale(1);
  filter: grayscale(1);
}

/* OR */

body {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
}
```

## 35. 使用:valid 和:invalid 来校验表单

```html
<div class="bruce flex-ct-x">
  <form class="form-validation">
    <div>
      <label>名字</label>
      <input
        type="text"
        placeholder="请输入你的名字(1到10个中文)"
        pattern="^[\u4e00-\u9fa5]{1,10}$"
        required
      />
    </div>
    <div>
      <label>手机</label>
      <input
        type="text"
        placeholder="请输入你的手机"
        pattern="^1[3456789]\d{9}$"
        required
      />
    </div>
    <div>
      <label>简介</label>
      <textarea required></textarea>
    </div>
  </form>
</div>
```

```scss
.form-validation {
  width: 500px;
  div {
    margin-top: 10px;
    &:first-child {
      margin-top: 0;
    }
  }
  label {
    display: block;
    padding-bottom: 5px;
    font-weight: bold;
    font-size: 16px;
  }
  input,
  textarea {
    display: block;
    padding: 0 20px;
    outline: none;
    border: 1px solid #ccc;
    width: 100%;
    height: 40px;
    caret-color: $blue;
    transition: all 300ms;
    &:valid {
      border-color: $green;
      box-shadow: inset 5px 0 0 $green;
    }
    &:invalid {
      border-color: $red;
      box-shadow: inset 5px 0 0 $red;
    }
  }
  textarea {
    height: 122px;
    resize: none;
    line-height: 30px;
    font-size: 16px;
  }
}
```

## 36. 写一个动画，向上匀速移动 100px，向下以 1.5 倍速度移动 200px，一直反复循环

```html
<!DOCTYPE html>
<html>
  <head>
    <title></title>
    <style>
      html,
      body {
        height: 100%;
        width: 100%;
      }
      body {
        position: relative;
      }
      .box {
        width: 100px;
        height: 100px;
        background-color: red;
        position: absolute;
        left: 50%;
        top: 50%;
        /* transform: translate(-50%, -50%); */
        margin: -50px 0 0 -50px;
        /* animation: move 1.5s linear, movefast 1s 1.5s linear;
      animation-iteration-count:infinite, infinite; */
        animation-name: move, movefast;
        animation-duration: 2s, 2s;
        animation-timing-function: linear, linear;
        animation-delay: 0, 2s;
        animation-iteration-count: infinite, infinite;
        animation-fill-mode: forwards, backwards;
      }
      @keyframes move {
        100% {
          margin-top: -100px;
        }
      }
      @keyframes movefast {
        0 {
          transform: translateY(0);
        }
        50% {
          transform: translateY(0);
        }
        100% {
          transform: translateY(100px);
        }
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
  </body>
</html>
```

## 37. table 去除边框的方法有哪些？

1. `border-style: hidden;`
2. `border: 0;`
3. `border: hidden;`
4. `border-width: 0;`
5. `border: transparent;`

## 38. 解释下为什么`〈p〉 〈/p〉`会换两行？

```css
p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
```

查阅 p 标签的用户代理可知，默认上下 margin 为 1em，所以等效于两行字那么高。
`margin-block-start /end`等效于上下外边距
`margin-inline-start/end`等效于左右外边距

## 39. 标准模式和怪异模式

- document.compatMode 属性可以判断是否是标准模式，当 document.compatMode 为“CSS1Compat”，是标准模式，“BackCompat”是怪异模式。
- 怪异模式是为了兼容旧版本的浏览器, 因为 IE 低版本 document.documentElement.clientWidth 获取不到
- 怪异模式盒模型: box-sizing: border-box; 标准模式: box-sizing: content-box

## 40. overflow 原理

overflow: hidden 能清除块内子元素的浮动影响. 因为该属性进行超出隐藏时需要计算盒子内所有元素的高度, 所以会隐式清除浮动

## 41. 关于 vh, vw

- vw：viewpoint width，视窗宽度，1vw 等于视窗宽度的 1%。
- vh：viewpoint height，视窗高度，1vh 等于视窗高度的 1%。
- vmin：vw 和 vh 中较小的那个。
- vmax：vw 和 vh 中较大的那个。
