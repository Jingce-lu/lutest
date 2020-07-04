# Add 2020 Html

[[toc]]

## 1. 语义化

见名知意，方便多人认识，且命名统一，简洁，易于重构代码

## 2. 新标签新特性

新增特性

- canvas
- svg
- video
- drag & drop
- localStorage/sessionStorage
- 语义化标签: header/nav/section/article/footer
- input 类型: date/datetime/email/range

移除元素

- applet
- big
- font
- frame/frameset

## 3. input 和 textarea 的区别

input

- 是单行文本框，不会换行。
- 通过 size 属性指定显示字符的长度，注意：当使用 css 限定了宽高，那么 size 属性就不再起作用。
- value 属性指定初始值，Maxlength 属性指定文本框可以输入的最长长度。
- 可以通过 width 和 height 设置宽高，但是也不会增加行数。

textarea

- 是多行文本输入框，文本区中可容纳无限数量的文本，其中的文本的默认字体是等宽字体（通常是 Courier），
- 可以通过 cols 和 rows 属性来规定 textarea 的尺寸，不过更好的办法是使用 CSS 的 height 和 width 属性

## 4. 用一个 div 模拟 textarea 的实现

作为多行文本域功能来讲，textarea 满足了我们大部分的需求。然而，textarea 有一个不足就是不能像普通 div 标签一样高度可以跟随内容自适应。textarea 总是很自信地显摆它的滚动条，高度固执地岿然不动。

要解决这个问题很简单，一个普通的 block 元素上加个`contenteditable="true"`就 ok 了。

```css
.textarea {
  min-height: 100px;
  border: 1px solid #a0b3d6;
  width: 300px;
  font-size: 14px;
  max-height: 300px;
  overflow-y: auto;
}
```

```html
<!--用div模拟textarea-->
<div class="textarea" contenteditable="true"></div>
```

## 5. 移动设备忽略将页面中的数字识别为电话号码的方法

```html
<meta name="format-detection" content="telephone=no" />
```

meta 标签中`format-detection`翻译成中文的意思是“格式检测”，是用来检测 html 里的文本格式的，还包括：

```jsx
<meta name="format-detection" content="telephone=no" />
//禁止把数字转化为拨号链接
<meta name="format-detection" content="email=no" /> //禁止邮箱,禁止发送邮件
<meta name="format-detection" content="adress=no" /> //禁止地址跳转至地图
<meta name="format-detection" content="telephone=no,email=no,adress=no" />
//合并写法
```

## 6. 为什么用 token 不用 cookie

- 浏览器发送请求的时候不会自动带上 token，而 cookie 在浏览器发送请求的时候会被自动带上。
- csrf 就是利用的这一特性，所以 token 可以防范 csrf，而 cookie 不能。
- token 机制是通过验证签名方式来识别用户状态的，服务端需要做的工作是 token 的签署与验证，不需要维持会话状态，也就是说基于 token 方式的验证是无状态的，也不依赖于 cookie。

## 7. 前端如何进行 seo 优化

- 合理的 title、description、keywords：搜索对着三项的权重逐个减小，title 值强调重点即可；description 把页面内容高度概括，不可过分堆砌关键词；keywords 列举出重要关键词。
- 语义化的 HTML 代码，符合 W3C 规范：语义化代码让搜索引擎容易理解网页
- 重要内容 HTML 代码放在最前：搜索引擎抓取 HTML 顺序是从上到下，保证重要内容一定会被抓取
- 重要内容不要用 js 输出：爬虫不会执行 js 获取内容
- 少用 iframe：搜索引擎不会抓取 iframe 中的内容
- 非装饰性图片必须加 alt
- 提高网站速度：网站速度是搜索引擎排序的一个重要指标

## 8. 前后端分离的项目如何 seo

- 使用 prerender。但是回答 prerender，面试官肯定会问你，如果不用 prerender，让你直接去实现，好的，请看下面的第二个答案。
- 先去 www.baidu.com/robots.txt 找出常见的爬虫，然后在 nginx 上判断来访问页面用户的 User-Agent 是否是爬虫，如果是爬虫，就用 nginx 方向代理到我们自己用 nodejs + puppeteer 实现的爬虫服务器上，然后用你的爬虫服务器爬自己的前后端分离的前端项目页面，增加扒页面的接收延时，保证异步渲染的接口数据返回，最后得到了页面的数据，返还给来访问的爬虫即可。

## 9. 在浏览器端，用 js 存储 2 万个小球的信息，包含小球的大小，位置，颜色等，如何做到对这 2 万条小球信息进行最优检索和存储

- 用 ArrayBuffer 实现极致存储
- 哈夫曼编码 + 字典查询树实现更优索引
- 用 bit-map 实现大数据筛查
- 用 hash 索引实现简单快捷的检索
- 用 IndexedDB 实现动态存储扩充浏览器端虚拟容量
- 用 iframe 的漏洞实现浏览器端 localStorage 无限存储，实现 2 千万小球信息存储

## 10. 如何尽可能流畅的实现这 2 万小球在浏览器中，以直线运动的动效显示出来

- 使用 GPU 硬件加速
- 使用 webGL
- 使用 assembly 辅助计算，然后在浏览器端控制动画帧频
- 用 web worker 实现 javascript 多线程，分块处理小球
- 用单链表树算法和携程机制，实现任务动态分割和任务暂停、恢复、回滚，动态渲染和处理小球

```js
setTimeout(() => {
  // 插入十万条数据
  const total = 10000;
  // 一次插入 20 条，如果觉得性能不好就减少
  const once = 20;
  // 渲染数据总共需要几次
  const loopCount = total / once;
  let countOfRender = 0;
  let ul = document.querySelector("ul");
  function add() {
    // 优化性能，插入不会造成回流
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < once; i++) {
      const li = document.createElement("li");
      li.innerText = Math.floor(Math.random() * total);
      fragment.appendChild(li);
    }
    ul.appendChild(fragment);
    countOfRender += 1;
    loop();
  }
  function loop() {
    if (countOfRender < loopCount) {
      window.requestAnimationFrame(add);
    }
  }
  loop();
}, 0);
```

## 11. 设计一个策略和方法，实现在 https 的前端项目里进行 http 请求

**get 请求**  
在没有 CSP(Content Security Policy)的考虑上, get 请求都是可以的

- img get
- script create
- iframe

**反向代理**

- 直接反向代理, 比如 nginx 代理, node 代理等等

**CORS**  
要发请求的域 设置 允许发请求的域(http) CORS 头

- Access-Control-Allow-Origin
- Access-Control-Allow-Methods
- Access-Control-Allow-Headers
- Access-Control-Max-Age

## 12. 如何劫持 https 的请求，提供思路

很多人在 google 上搜索“前端面试 + https 详解”，把答案倒背如流，但是问到如何劫持 https 请求的时候就一脸懵逼，是因为还是停留在 https 理论性阶段。

想告诉大家的是，就算是 https，也不是绝对的安全，以下提供一个本地劫持 https 请求的简单思路。

模拟中间人攻击，以百度为例

- 先用 OpenSSL 查看下证书，直接调用 openssl 库识别目标服务器支持的 SSL/TLS cipher suite
  > openssl s_client -connect www.baidu.com:443
- 用 sslcan 识别 ssl 配置错误，过期协议，过时 cipher suite 和 hash 算法
  > sslscan -tlsall www.baidu.com:443
- 分析证书详细数据
  > sslscan -show-certificate --no-ciphersuites www.baidu.com:443
- 生成一个证书
  > openssl req -new -x509 -days 1096 -key ca.key -out ca.crt
- 开启路由功能
  > sysctl -w net.ipv4.ip_forward=1
- 写转发规则，将 80、443 端口进行转发给 8080 和 8443 端口
  > iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8080  
  > iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to-ports 8443
- 最后使用 arpspoof 进行 arp 欺骗

## 13. 说说你对 HTML5 的 img 标签属性 srcset 和 sizes 的理解？都有哪些应用场景？

- sizes 属性规定被链接资源的尺寸。只有当被链接资源是图标时 (rel="icon")，才能使用该属性。
- srcset 属性用于浏览器根据宽、高和像素密度来加载相应的图片资源。可以适应不同屏幕，加载不同大小的图片。

应用场景：多用于响应式图片或不同像素密度设备的图片适配；

## 14. 你有用过 HTML5 中的 datalist 标签吗？说说你对它的理解

datalist 是 HTML5 新增的标签 用于在用户输入时给出一批建议数据 如果需要用到 datalist 请给对应的 input 的 list 属性和 datalist 的 ID 属性设置上一样的属性值 datalist 给出的选项用 option 包裹 选项值用 option 的 value 属性给出。

datalist 支持全局属性和事件属性。

- 标签规定了 标签中可能的选项列表；
- 标签中的 id 要与标签中的 list 相对应；

实例：

```html
<input list="browsers" />
<datalist id="browsers">
  <option value="Internet Explorer"> </option>
  <option value="Firefox"> </option>
  <option value="Chrome"> </option>
  <option value="Opera"> </option>
  <option value="Safari"> </option>
</datalist>
```

## 15. HTML5 的应用程序缓存与浏览器缓存有什么不同？

应用程序缓存是 HTML5 的重要特性之一，提供了离线使用的功能，让应用程序可以获取本地的网站内容，例如 HTML、CSS、图片以及 JavaScript。这个特性可以提高网站性能，它的实现借助于 manifest 文件，与传统浏览器缓存相比，它不强制用户访问的网站内容被缓存

1. 浏览器缓存针对单个文件,H5 离线缓存针对整个应用
2. H5 缓存断网还能用,浏览器缓存断网就用不了
3. H5 缓存核心是 applicationCache 对象,浏览器缓存核心是 cache-control

发现`application cache`这个标准居然被废弃了；被`Service Workers`标准给替代了；

## 16. 简述下 HTML 的快捷键属性是哪个？并举例说明有什么用？

`accesskey`属性目前是 h5 标准中的一个全局快捷键访问属性，通过在任意元素上注入`accesskey`属性值，在浏览器中触发相应的快捷键，即可实现对相应元素的`focus`或`click`；

```jsx {4}
<a
  href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/accesskey"
  target="_blank"
  accesskey="x"
>快捷键x：accesskey</a>
<div accesskey="z" onclick="this.style.color = 'red';">快捷键z：变红</div>
```

## 17. 用 HTML5 实现手机摇一摇功能你有做过吗？你知道它的原理吗？

利用 html5 实现类似微信的手机摇一摇功能，并播放音乐。

1. `deviceOrientation`：封装了方向传感器数据的事件，可以获取手机静止状态下的方向数据，例如手机所处角度、方位、朝向等。
2. `deviceMotion`：封装了运动传感器数据的事件，可以获取手机运动状态下的运动加速度等数据。

```js
var SHAKE_THRESHOLD = 3000;
var last_update = 0;
var x = (y = z = last_x = last_y = last_z = 0);
function init() {
  if (window.DeviceMotionEvent) {
    window.addEventListener("devicemotion", deviceMotionHandler, false);
  } else {
    alert("not support mobile event");
  }
}
function deviceMotionHandler(eventData) {
  var acceleration = eventData.accelerationIncludingGravity;
  var curTime = new Date().getTime();
  if (curTime - last_update > 100) {
    var diffTime = curTime - last_update;
    last_update = curTime;
    x = acceleration.x;
    y = acceleration.y;
    z = acceleration.z;
    var speed =
      (Math.abs(x + y + z - last_x - last_y - last_z) / diffTime) * 10000;

    if (speed > SHAKE_THRESHOLD) {
      alert("摇动了");
      media.setAttribute(
        "src",
        "http://211.148.5.228:8002/Pages/test/Kalimba.mp3"
      );
      media.load();
      media.play();
    }
    last_x = x;
    last_y = y;
    last_z = z;
  }
}
```

Html：

```html
<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>摇一摇功能</title>
    <script type="text/javascript">
      //Javascript
    </script>
  </head>
  <body οnlοad="init()">
    <p>用力摇一摇你手机</p>
    <audio
      style="display:hiden"
      id="musicBox"
      preload="metadata"
      controls
      src="http://211.148.5.228:8002/Pages/test/Kalimba.mp3"
      autoplay="false"
    ></audio>
  </body>
</html>
```

## 18. a 标签下的`href="javascript:void(0)"`起到了什么作用？说说你对`javascript:void(0)`的理解？

javascript:是伪协议，表示 url 的内容通过 javascript 执行。void(0)表示不作任何操作，这样会防止链接跳转到其他页面。这么做往往是为了保留链接的样式，但不让链接执行实际操作，

## 19. 举例说明你对 HTML5 的 ruby 标签的理解，都有哪些应用场景？

标签定义 ruby 注释（中文注音或字符）。

在东亚使用，显示的是东亚字符的发音。

与 以及 标签一同使用：

ruby 元素由一个或多个字符（需要一个解释/发音）和一个提供该信息的 rt 元素组成，还包括可选的 rp 元素，定义当浏览器不支持 "ruby" 元素时显示的内容。 (摘自博客)

```html
<section>
  <ruby class="spz">
    <rb>茕</rb>
    <rt>qióng</rt>
    <rb>茕</rb>
    <rt>qióng</rt>
    <rb>孑</rb>
    <rt>jié</rt>
    <rb>立</rb>
    <rt>lì</rt>
    <rb>沆</rb>
    <rt>hàng</rt>
    <rb>瀣</rb>
    <rt>xiè</rt>
    <rb>一</rb>
    <rt>yī</rt>
    <rb>气</rb>
    <rt>qì</rt>
  </ruby>
  <ruby class="spz">
    <rb>踽</rb>
    <rt>jǔ</rt>
    <rb>踽</rb>
    <rt>jǔ</rt>
    <rb>独</rb>
    <rt>dú</rt>
    <rb>行</rb>
    <rt>xíng</rt>
    <rb>醍</rb>
    <rt>tí</rt>
    <rb>醐</rb>
    <rt>hú</rt>
    <rb>灌</rb>
    <rt>guàn</rt>
    <rb>顶</rb>
    <rt>dǐng</rt>
  </ruby>
  <ruby class="spz">
    <rb>绵</rb>
    <rt>mián</rt>
    <rb>绵</rb>
    <rt>mián</rt>
    <rb>瓜</rb>
    <rt>guā</rt>
    <rb>瓞</rb>
    <rt>dié</rt>
    <rb>奉</rb>
    <rt>fèng</rt>
    <rb>为</rb>
    <rt>wéi</rt>
    <rb>圭</rb>
    <rt>guī</rt>
    <rb>臬</rb>
    <rt>niè</rt>
  </ruby>
  <ruby class="spz">
    <rb>龙</rb>
    <rt>lóng</rt>
    <rb>行</rb>
    <rt>xíng</rt>
    <rb>龘</rb>
    <rt>dá</rt>
    <rb>龘</rb>
    <rt>dá</rt>
    <rb>犄</rb>
    <rt>jī</rt>
    <rb>角</rb>
    <rt>jiǎo</rt>
    <rb>旮</rb>
    <rt>gā</rt>
    <rb>旯</rb>
    <rt>lá</rt>
  </ruby>
</section>
```

## 20. HTML5 标准提供了哪些新的 API？你有用过哪些？

- 两个选择器 API
  1. `document.querySelector()`
  2. `document.querySelectAll()`
- 地理定位 API
  - `getCurrrentPosition()`
- 多媒体 API
  - `<video></video>`
  - `<audio></audio>`
- 拖放
  ```html
  <div ondrop="drop(event)" ondragover="allowDrop(event)"></div>
  <div draggable="true" ondragstart="drag(event)"></div>
  ```
- 文件
  - `window.requestFileSystem()`
- XHR2
  ```js
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "@Url.Action("Upload")")
  ```
- 本地存储 API
  - `localStorage`
  - `sessionStorage`
- canvas
  ```html
  <canvas id="myCanvas" width="200" height="100"></canvas>
  ```
- svg
  ```html
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <circle
      cx="100"
      cy="50"
      r="40"
      stroke="black"
      stroke-width="2"
      fill="red"
    />
  </svg>
  ```

## 21. 网站的 TDK 该怎么设置？它有什么作用？

TDK 是一个缩写，T(title),D(description),K(keywords)，用于网络搜索引擎优化 seo，它是 seo 中页面的描述和关键词设置，也被称为 seo 界的三个标签。

```html
<title>测试</title>
<meta name="Description" content="测试" />
<meta name="Keywords" content="测试" />
```

## 22. HTML 如何创建分区响应图？

分区响应图:一张图片,分成多个模块,点击模块可以链接到不同的 URL 地址,

实现: 使用 `map`,`area`

```html
<p>
  <img src="./1.png" usemap="#myMap" />
</p>
<map name="myMap">
  <area href="http://baidu.com" shape="rect" coords="50,106,220,273" />
  <area href="http://google.com" shape="rect" coords="260,106,430,275" />
  <area href="http://juejin.im" shape="default" />
</map>
```

## 23. 富文本编辑器的实现原理吗？

1. `contenteditable`(HTML)属性：一个全局枚举属性，用于表示元素是否可编辑；该属性可被继承。
2. `caret-color`(CSS)属性：可设置编辑区域内的可插入光标的颜色；
3. `Window.getSelection()`方法：返回一个 Selection 对象，表示用户选择的文本范围或光标的当前位置；利用该方法可以对选中的文字进行样式设置，或在光标处插入内容等操作。

富文本编辑器基本上都是调用这个指令，完全不需要手动判断选中区域

```js
document.execCommand(aCommandName, aShowDefaultUI, aValueArgument);
```

比如

```js
document.execCommand('bold',false');
//切换选中区域的粗体样式
```

## 24. form-data、x-www-form-urlencoded、raw、binary 的区别

同：

- 发送请求的方式

异：

1. multipart/form-data 其请求内容格式为 Content-Type: multipart/form-data,用来指定请求内容的数据编码格式，一般用来文件上传。
2. application/x-www-form-urlencoded 是 post 的默认格式，使用 js 中 URLencode 转码方法。
3. raw 可上传任意格式的文本，可以上传 text、json、xml、html 等各种文本类型。
4. binary 等同于 Content-Type:application/octet-stream，只可上传二进制数据。

## 25. 举例说明如何使用纯 html 怎么实现下拉提示的功能？

datalist 标签

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <label for="favorite_team">Favorite Team:</label>
    <!-- 注意input的list属性与datalist的id属性进行绑定 -->
    <input type="text" name="team" id="favorite_team" list="team_list" autocomplete="off">
    <datalist id="team_list">
        <!-- 指定了value值之后，value和innerHTML类似于标题与副标题之间的关系，选中后input的值是value -->
        <option value="A">Aus Tigers</option>
        <option value="B">Detroit Lions</option>
        <option value="C">Detroit Pistons</option>
        <option value="D">Detroit Red Wings</option>
        <option value="E">Detroit Tigers</option>
    </datalist>
</datalist>
</body>

</html>
```

## 26. HTML5 如何调用摄像头？

有两种 API

- navigator.getUserMedia(已废弃，不建议使用)
  ```js
  var constraints = {
    video: true,
    audio: false
  };
  var media = navigator.getUserMedia(
    constraints,
    function(stream) {
      var v = document.getElementById("v");
      var url = window.URL || window.webkitURL;
      v.src = url ? url.createObjectURL(stream) : stream;
      v.play();
    },
    function(error) {
      console.log("ERROR");
      console.log(error);
    }
  );
  ```
- navigator.mediaDevices.getUserMedia
  ```js
  const constraints = {
    video: true,
    audio: false
  };
  let promise = navigator.mediaDevices.getUserMedia(constraints);
  promise
    .then(stream => {
      let v = document.getElementById("v");
      // 旧的浏览器可能没有srcObject
      if ("srcObject" in v) {
        v.srcObject = stream;
      } else {
        // 防止再新的浏览器里使用它，应为它已经不再支持了
        v.src = window.URL.createObjectURL(stream);
      }
      v.onloadedmetadata = function(e) {
        v.play();
      };
    })
    .catch(err => {
      console.error(err.name + ": " + err.message);
    });
  ```

## 27. 你有使用过 HTML5 的 output 吗？说说它的作用是什么？

- 定义表单输出
- 它有以下属性
  - for: `<element_id>` 定义输出域相关的一个或多个元素
  - form: `<form_id>` 定义输入字段所属的一个或多个表单
  - name: 定义对象的唯一名称。（表单提交时使用）
- Demo
  ```js
  <form id="form" oninput="x.value=parseInt(a.value)+parseInt(b.value)">
      0<input type="range" id="a" value="50">100
      +<input type="number" id="b" value="50">
  </form>
  =<output form="form" name="x" for="a b"></output>
  ```

## 28. 你有使用过 HTML5 的 dialog 标签吗？说说看，它有什么特点？

dialog 是 html5.2 的规范，浏览器兼容性比较差，常用的特性就这些

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      dialog {
        border-color: red;
      }

      dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
      }
    </style>
  </head>

  <body>
    <button id="btn">TEST</button>
    <dialog id="dialog">
      12
      <button id="close">close</button>
    </dialog>
    <script>
      var dialogEl = document.querySelector("#dialog");
      var btnEl = document.querySelector("#btn");
      var closeEl = document.querySelector("#close");

      btnEl.addEventListener("click", e => {
        // dialogEl.show(); // 打开dialog
        dialogEl.showModal(); // 打开dialog，有蒙版
      });

      closeEl.addEventListener("click", e => {
        dialogEl.close("testValue");
        console.log(dialogEl.returnValue); // 'testValue'
      });

      dialogEl.addEventListener("close", e => {
        console.log("close event");
      });

      dialogEl.addEventListener("cancel", e => {
        // 按下ESC同时也会触发close事件
        console.log("enter ESC key event");
        // 以下可选代码
        dialogEl.close("testValue2"); //
        console.log(e.target.returnValue); // 'testValue2'
      });
    </script>
  </body>
</html>
```

## 29. 如何自动转移到新的页面？

- `window.location.href = 'https://www.google.com'`;
- 在`<head>`内引入`<meta http-equiv="refresh" content="0; url=http://example.com/">`
  content 内第一个参数是延迟，单位秒，0 为立即跳转
  参数 url 是跳转地址

## 30. 在使用 HTML5 时有哪些规则需要遵守？

html5 规范：

1. 使用正确的文档类型,
2. 使用小写元素名
3. 关闭所有 HTML 元素
4. 关闭空的 HTML 元素
5. 使用小写属性名
6. 避免一行代码过长
7. 空行和缩进, 不要无缘无故添加空行, 为每个逻辑功能块添加空行，这样更易于阅读。
8. alt 标签不为空
9. 结构、表现、行为三者分离
   尽量在文档和模板中只包含结构性的 HTML；而将所有表现代码，移入样式表中；将所有动作行为，移入脚本之中。
   在此之外，为使得它们之间的联系尽可能的小，在文档和模板中也尽量少地引入样式和脚本文件。
10. HTML 只关注内容

js 规范

1. 避免全局命名空间污染
2. 严格模式
3. 变量声明 - 总是使用 var 来声明变量，并且使用单 var 模式（将所有的变量在函数最前面只使用一个 var 定义）
4. js 声明提前
5. 使用严格等

## 31. wbr 和 br 标签的区别是什么？

`<wbr>`是 html5 中的新元素。有人翻译成：软换行。

html4 中`<br/>`表示换行，`<br/>`表示必须换行。而`<wbr>`意思是在浏览器窗口或父级窗口宽度足够的情况下，不换行；在宽度不足的情况下，在加了`<wbr>`处主动换行。

例子：

`<p>To learn AJAX, you must be familiar with the XMLHttpRequest Object.To learn AJAX, you must be familiar with the XMLHttp<wbr>Request Object.</p>`

当正常情况下英文宽度过小，不足以在行末书写完一个词时，就将行末整个词放到下一行，实现换行，但是加入上面位置的`<wbr>`时，软换行就能收主动拆分单词，可以在支持 HTML5 的浏览器中测试（IE 系列除了 9 都不支持，可以用 Chrome）。
这个`<wbr>`好像对字符型的语言用处挺大，但是对于想中文这种字，貌似没多大用处。

## 32. 说说你是怎么实现页面阻尼效果的？

首先什么是阻尼效果？上网查阅：

> 阻尼（英语：damping）是指任何振动系统在振动中，由于外界作用和/或系统本身固有的原因引起的振动幅度逐渐下降的特性，以及此一特性的量化表征。

简单来说，就是界面滑动到了最底部或最顶部仍可以比实际的内容多滑动一段距离然后回弹的弹性效果。 从效果中可以看出，有三个重点：

- 滑动到最顶部或最底部才出现。
- 表现出比实际的内容多滑动一段距离，实际操作知道，多滑动的距离即是手指在屏幕上滑动的距离。
- 放开手之后，有回弹效果。

已经知道什么是阻尼效果了，现在思考如何去实现。 对于第二点，我们可以监听 `touchstart`, `touchmove`, `touchend` 事件，跟鼠标拖拽的原理类似：

1. touchstart 时，记下起点位置；
2. touchmove 实时计算滑动的距离。
3. touchend 时，能得到最终的滑动距离，跟设定的阈值比较。进入到页面自动控制阶段：大于阈值则让页面滑动到下一页，小于阈值则恢复到起始位置。

在我实现的过程中，想过两种方案。

1. 利用 Js 大致思路是，通过监测滚轮事件，检测到页面已经滑动到最底部（最顶部同理），计算手指在页面的滑动距离，touchmove 事件触发时，给下面的阻尼带增加 padding-bottom，造成页面跟着手指多滑动一段距离的假象。 缺点：利用 js 实现动画比较耗费性能。
2. 利用 css 第二个方案采用 css 动画，页面多滑动一段距离，实际上也可以通过把页面往手指滑动的方向 translate 一段距离，这个时候页面只要背景色相同，也可以实现相同效果。 因为 translate 可以出发浏览器硬件加速，可以保证性能。

通过监测滚动条的位置判断是否到达底部

```js
$(document).scroll(() => {
  isBottom = document.scrollTop() >= $(document).height() - $(window).height();
});
```

## 33. 怎样实现每次页面打开时都清除本页缓存？

1. 用 HTML 标签设置 HTTP 头信息

   ```html
   <head>
     <meta http-equiv="Pragma" content="no-cache" />
     <meta http-equiv="Cache-Control" content="no-cache" />
     <meta http-equiv="Expires" content="0" />
   </head>
   ```

   说明：HTTP 头信息“Expires”和“Cache-Control”为应用程序服务器提供了一个控制浏览器和代理服务器上缓存的机制。HTTP 头信息 Expires 告诉代理服务器它的缓存页面何时将过期。HTTP1.1 规范中新定义的头信息 Cache-Control 可以通知浏览器不缓存任何页面。当点击后退按钮时，浏览器重新访问服务器已获取页面。如下是使用 Cache-Control 的基本方法：

   - no-cache:强制缓存从服务器上获取新的页面
   - no-store: 在任何环境下缓存不保存任何页面

2. 在需要打开的 url 后面增加一个随机的参数：
   增加参数前：`url=test/test.jsp`

   增加参数后：`url=test/test.jsp?ranparam=random()`

   说明：因为每次请求的 url 后面的参数不一样，相当于请求的是不同的页面，用这样的方法来曲线救国，清除缓存

3. chrome：
   现在新版的 Chrome 在 developer Tools（F12 调出来）的 Settings（右下角有个齿轮标志）中有了个 Disable cache 选项。勾了便可以。

4. ajax 方法

   1. 方式一：用 ajax 请求服务器最新文件，并加上请求头 If-Modified-Since 和 Cache-Control,如下:
      ```js
      $.ajax({
        url:'www.haorooms.com',
        dataType:'json',
        data:{},
        beforeSend :function(xmlHttp){
            xmlHttp.setRequestHeader("If-Modified-Since","0");
            xmlHttp.setRequestHeader("Cache-Control","no-cache");
        },
        success:function(response){
            //操作
        }
        async:false
      });
      ```
   2. 方法二，直接用 cache:false,
      ```js
      $.ajax({
        url: "www.haorooms.com",
        dataType: "json",
        data: {},
        cache: false,
        ifModified: true,
        success: function(response) {
          //操作
        },
        async: false
      });
      ```

5. 用随机数，随机数也是避免缓存的一种很不错的方法！
   URL 参数后加上 "?ran=" + Math.random(); //当然这里参数 ran 可以任意取了<br>
   eg:<br>
   `<script> document.write("<s"+"cript type='text/javascript' src='/js/test.js?"+Math.random()+"'></scr"+"ipt>"); </script>`

   其他的类似，只需在地址后加上`+Math.random()` <br>
   注意：因为`Math.random()` 只能在 Javascript 下起作用，故只能通过 Javascript 的调用才可以

   方法四：用随机时间，和随机数一样。

   在 URL 参数后加上 `"?timestamp=" + new Date().getTime();`

## 34. table 由哪几部分组成？

```jsx
<caption></caption> // 定义表格的标题
<tfoot></tfoot> // 定义表格的页脚
<thead></thead> // 定义表格的页眉
<col></col> // 定义用于表格列的属性
<colgroup></colgroup> // 定义表格列的组

<th></th>
<tr></tr>
<td></td>
```

## 35. 如何能防止网页禁止被 iframe 嵌入呢？

X-Frame-Options: deny

补充一个：X-Frame-Options: SAMEORIGIN

```js
if (self != top) {
  top.location = self.location;
}
```

```js
try {
  top.location.hostname;
  if (top.location.hostname != window.location.hostname) {
    top.location.href = window.location.href;
  }
} catch (e) {
  top.location.href = window.location.href;
}
```

## 36. 怎么让 table 的 thead 不动，tbody 出现滚动条呢？

```css {4,11,15}
table tbody {
  display: block;
  height: 195px;
  overflow-y: scroll;
}

table thead,
tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

table thead {
  width: calc(100% - 1em);
}

table thead th {
  background: #ccc;
}
```

## 37. 怎么让整个页面从 iframe 中跳出来？

```js
window.onload = function() {
  document.querySelector("button").addEventListener("click", () => {
    window.location.href = document.querySelector("iframe").src;
  });
};
```

```js
window.parent.frames.location.href = "../welcome.html";
```

```js
function show() {
  var showdiv = document.createElement("div");
  showdiv.setAttribute("id", "topdiv");
  showdiv.setAttribute(
    "style",
    "position:absolute;z-index:999;width:300px;height:300px;"
  );
  var tt = document.createTextNode("我是iframe弹出层");
  window.parent.document.body.appendChild(showdiv).appendChild(tt);
}
```

## 38. canvas 有哪些可以提升性能的优化方法？

1. 离屏渲染
2. 分层画布
3. 一次性绘制
4. 使用 requestAnimationFrame 执行动画

   ```js
   (function() {
     var lastTime = 0;
     var vendors = ["ms", "moz", "webkit", "o"];
     for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
       window.requestAnimationFrame =
         window[vendors[x] + "RequestAnimationFrame"];
       window.cancelAnimationFrame =
         window[vendors[x] + "CancelAnimationFrame"] ||
         window[vendors[x] + "CancelRequestAnimationFrame"];
     }

     if (!window.requestAnimationFrame)
       window.requestAnimationFrame = function(callback, element) {
         var currTime = new Date().getTime();
         var timeToCall = Math.max(0, 16 - (currTime - lastTime));
         var id = window.setTimeout(function() {
           callback(currTime + timeToCall);
         }, timeToCall);
         lastTime = currTime + timeToCall;
         return id;
       };

     if (!window.cancelAnimationFrame)
       window.cancelAnimationFrame = function(id) {
         clearTimeout(id);
       };
   })();
   ```

5. 减少调用 canvas 的 api

   ```js
   // 错误代码：
   for (var i = 0; i < points.length - 1; i++) {
     var p1 = points[i];
     var p2 = points[i + 1];
     context.beginPath();
     context.moveTo(p1.x, p1.y);
     context.lineTo(p2.x, p2.y);
     context.stroke();
   }

   // 正确代码：
   context.beginPath();
   for (var i = 0; i < points.length - 1; i++) {
     var p1 = points[i];
     var p2 = points[i + 1];
     context.moveTo(p1.x, p1.y);
     context.lineTo(p2.x, p2.y);
   }
   context.stroke();
   ```

6. 尽量少改变 canvas 状态

   ```js
   // 错误代码：
   for (var i = 0; i < STRIPES; i++) {
     context.fillStyle = i % 2 ? COLOR1 : COLOR2;
     context.fillRect(i * GAP, 0, GAP, 480);
   }

   // 正确代码：
   context.fillStyle = COLOR1;
   for (var i = 0; i < STRIPES / 2; i++) {
     context.fillRect(i * 2 * GAP, 0, GAP, 480);
   }
   context.fillStyle = COLOR2;
   for (var i = 0; i < STRIPES / 2; i++) {
     context.fillRect((i * 2 + 1) * GAP, 0, GAP, 480);
   }
   ```

7. 重新渲染的范围尽量小

   ```js
   // 错误代码：
   context.fillRect(0, 0, canvas.width, canvas.height);

   // 正确代码：
   context.fillRect(20, 20, 100, 100);
   ```

8. 复杂场景使用多层画布
   ```html
   <canvas width="600" height="400" style="position: absolute; z-index: 0">
   </canvas>
   <canvas width="600" height="400" style="position: absolute; z-index: 1">
   </canvas>
   ```
9. 不要使用阴影
   ```js
   context.shadowOffsetX = 5;
   context.shadowOffsetY = 5;
   context.shadowBlur = 4;
   context.shadowColor = "rgba(255, 0, 0, 0.5)";
   context.fillRect(20, 20, 150, 100);
   ```
10. 清空画布
    三种方法性能，性能依次提高
    ```js
    context.fillRect();
    context.clearRect();
    canvas.width = canvas.width; // 一种画布专用的技巧
    ```

## 39. 如何将图片画到 canvas 上？都有哪些方法？

① 在画布上定位图像：context.drawImage(img,x,y)<br>
② 在画布上定位图像，并规定图像的宽度和高度：context.drawImage(img,x,y,width,height)<br>
③ 剪切图像，并在画布上定位被剪切的部分：context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height)

## 40. HTML5 如何隐藏 video 元素的控制栏、全屏按钮？

1. 怎么查看 video 内部构造<br>
   chrome 下，开发者工具 setting Preferences Elements 勾选 “Show user agent shadow DOM”
2. 隐藏 video 功能按钮

   ```css
   /*video默认全屏按钮*/
   video::-webkit-media-controls-fullscreen-button {
     display: none !important;
   }

   /*video默认aduio音量按钮*/
   video::-webkit-media-controls-mute-button {
     display: none !important;
   }

   /*video默认setting按钮*/
   video::-internal-media-controls-overflow-button {
     display: none !important;
   }

   /*腾讯云点播禁用firefox全屏、设置按钮*/
   .trump-button[sub-component="fullscreen_btn"],
   .trump-button[now="fullscreen"] {
     display: none !important;
   }
   .trump-button[sub-component="setting"] {
     display: none !important;
   }

   /*禁用video的controls（要慎重！不要轻易隐藏掉，会导致点击视频不能播放）*/
   video::-webkit-media-controls {
     display: none !important;
   }
   ```

3. 删掉下载/全屏等按钮

   ```html
   <video
     controls
     controlsList="nofullscreen nodownload noremote footbar"
   ></video>
   ```

## 41. 怎么下载一个 zip 文件？

- a 标签加 download 属性
  ```html
  <!-- download:指定下载文件的文件名 -->
  <a href="http://somehost/somefile.zip" download="filename.zip"
    >Download file</a
  >
  ```
- 文件流的方式
  ```js
  var a = document.createElement("a");
  var url = window.URL.createObjectURL(blob);
  var filename = "what-you-want.txt";
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
  ```
- 注意：Bolb 的方式构建完 blob 对象后才会转换成文件，所以尽量使用 a 标签的形式进行下载

## 42. 用 js 实现一个复制粘贴的功能

核心代码应该就是

```js
obj.select(); //通过选中对象再执行复制命令
document.execCommand("Copy");
```

```js
(function() {
  const createInput = html => {
    let inputEl = document.createElement("input");
    inputEl.setAttribute("type", "input");
    inputEl.value = html;
    return inputEl;
  };
  var key = "￥5uA302Tea83￥";
  var inputEl = createInput(key);
  document.body.appendChild(inputEl);
  inputEl.select();
  document.execCommand("copy");
})();
```

## 43. 写一个方法获取 div 的宽高

```js
const getElementHeightWidth = e => {
  return {
    height: e.offsetHeight,
    width: e.offsetWidth
  };
};
```

```js
const getElementWidthAndHeight = el => {
  const { width, height } = el.getBoundingClientRect();
  return { width, height };
};
```

## 44. 写一个让一句话随着鼠标移动的小插件

```js
function mousemoveWithText(text, options) {
  options = options || {};
  const $el = text instanceof HTMLElement ? text : createElement();
  const pos = { x: -9999, y: -9999 };
  // TODO: 移动后才第一次能显示，有点糟糕
  window.onmousemove = handleMove;

  setTextPosition();
  (function loop() {
    setTextPosition();
    // TODO: 如果需要销毁，需要存变量
    requestAnimationFrame(loop);
  })();

  function createElement() {
    const $el = document.createElement("div");
    $el.innerText = text;
    $el.style.position = "fixed";
    $el.style.pointerEvents = "none";
    document.body.appendChild($el);
    return $el;
  }

  function handleMove(e) {
    pos.x = e.clientX;
    pos.y = e.clientY;
    // TODO: 超出屏幕应隐藏，不然会造成比如 scroller-x 超出
  }

  function setTextPosition() {
    const { x, y } = pos;
    $el.style.left = x + 10 + "px";
    $el.style.top = y - 10 + "px";
  }
}

mousemoveWithText("xxxx");
```

## 45.
