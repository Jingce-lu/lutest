(window.webpackJsonp=window.webpackJsonp||[]).push([[221],{653:function(t,a,s){"use strict";s.r(a);var e=s(42),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"小程序开发中遇到的坑"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#小程序开发中遇到的坑"}},[t._v("#")]),t._v(" 小程序开发中遇到的坑")]),t._v(" "),s("p"),s("div",{staticClass:"table-of-contents"},[s("ul",[s("li",[s("a",{attrs:{href:"#_1-mpvue-相关"}},[t._v("1. mpvue 相关")])]),s("li",[s("a",{attrs:{href:"#_2-https-部署以及设置合法域名。"}},[t._v("2. https 部署以及设置合法域名。")])]),s("li",[s("a",{attrs:{href:"#_3-post-请求，json-数据格式转换"}},[t._v("3. post 请求，json 数据格式转换")])]),s("li",[s("a",{attrs:{href:"#_4-微信小程序谁是首页的问题"}},[t._v("4. 微信小程序谁是首页的问题")])]),s("li",[s("a",{attrs:{href:"#_5-微信小程序开发单位问题"}},[t._v("5. 微信小程序开发单位问题")])]),s("li",[s("a",{attrs:{href:"#_6-wxss-文件中不支持本地图片"}},[t._v("6. wxss 文件中不支持本地图片")])]),s("li",[s("a",{attrs:{href:"#_7-this-setdata-和直接赋值的区别"}},[t._v("7. this.setData 和直接赋值的区别")])]),s("li",[s("a",{attrs:{href:"#_8-cover-view-组件"}},[t._v("8. cover-view 组件")])]),s("li",[s("a",{attrs:{href:"#_9-微信小程序不能操作-dom-树"}},[t._v("9. 微信小程序不能操作 DOM 树")])]),s("li",[s("a",{attrs:{href:"#_10-微信小程序分享功能如何实现"}},[t._v("10. 微信小程序分享功能如何实现")])]),s("li",[s("a",{attrs:{href:"#_11-配置普通链接二维码规则需要注意的地方"}},[t._v("11. 配置普通链接二维码规则需要注意的地方")])]),s("li",[s("a",{attrs:{href:"#_12-地图导航等功能需要注意的地方"}},[t._v("12. 地图导航等功能需要注意的地方")])]),s("li",[s("a",{attrs:{href:"#_13-wx-showtoast-吐槽"}},[t._v("13. wx.showToast 吐槽")])]),s("li",[s("a",{attrs:{href:"#_14-添加点击事件"}},[t._v("14. 添加点击事件")])]),s("li",[s("a",{attrs:{href:"#_15-微信小程序-app-json-里-pages-数组中路径顺序问题"}},[t._v("15. 微信小程序 app.json 里 pages 数组中路径顺序问题")])]),s("li",[s("a",{attrs:{href:"#_16-微信小程序底部菜单-tabbar-跳转无法带参数问题"}},[t._v("16. 微信小程序底部菜单 tabBar 跳转无法带参数问题")])]),s("li",[s("a",{attrs:{href:"#_17-微信小程序使用-post-方法请求的问题"}},[t._v("17. 微信小程序使用 POST 方法请求的问题")])]),s("li",[s("a",{attrs:{href:"#_18-微信小程序标签层级问题。"}},[t._v("18. 微信小程序标签层级问题。")])]),s("li",[s("a",{attrs:{href:"#_19-iphone-手机：new-date-的坑"}},[t._v("19. iphone 手机：new Date()的坑")])]),s("li",[s("a",{attrs:{href:"#_20-text、view-中文-英文不自动换行问题"}},[t._v("20. text、view 中文/英文不自动换行问题")])]),s("li",[s("a",{attrs:{href:"#_21-第三方组件样式修改"}},[t._v("21. 第三方组件样式修改")])]),s("li",[s("a",{attrs:{href:"#_22-wxml-标签"}},[t._v("22. wxml 标签")])]),s("li",[s("a",{attrs:{href:"#_23-动画问题"}},[t._v("23. 动画问题")])]),s("li",[s("a",{attrs:{href:"#_24"}},[t._v("24.")])]),s("li",[s("a",{attrs:{href:"#_25"}},[t._v("25.")])]),s("li",[s("a",{attrs:{href:"#_26"}},[t._v("26.")])]),s("li",[s("a",{attrs:{href:"#_27"}},[t._v("27.")])]),s("li",[s("a",{attrs:{href:"#_28"}},[t._v("28.")])]),s("li",[s("a",{attrs:{href:"#_29"}},[t._v("29.")])]),s("li",[s("a",{attrs:{href:"#_30"}},[t._v("30.")])])])]),s("p"),t._v(" "),s("h2",{attrs:{id:"_1-mpvue-相关"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-mpvue-相关"}},[t._v("#")]),t._v(" 1. mpvue 相关")]),t._v(" "),s("ol",[s("li",[t._v("有时候明明设置 一个变量，当它为 false 的时候才展示某个元素，比如 isHide?hide:show，有时候会发现，在页面中，还是会先渲染出来一下，然后才被隐藏了，原因是，最开始的时候，data 数据还没有初始化完成，这个时候，isHide 是 undefined，undefined 变成 boolean 值，就是 false，所以最开始还是 show 了，为了解决这种情况，我们可以使用全等符号。 isHide=== true ?hide:show")]),t._v(" "),s("li",[s("code",[t._v("scroll-view")]),t._v(" 的属性设置，scroll-y 设置，不管我们设置 scroll-y=true 还是 false，其实都会滚动的，要想设置 scroll-y 为 false，我们需要用数据绑定的形式来设置才会起效:scroll-y=false")]),t._v(" "),s("li",[t._v("显示 "),s("code",[t._v("image")]),t._v(" 的时候，如果我们设置了 "),s("code",[t._v("mode=widthFix")]),t._v("，有时候在渲染的时候会看到图片有一个拉伸过程，然后才变成我们期望的大小，解决这个问题，可以给 image 添加 "),s("code",[t._v("height:auto")]),t._v("；或者使用 "),s("code",[t._v("background-image")]),t._v(" 来展示，需要注意的是 "),s("code",[t._v("background-image")]),t._v(" 不支持本地路径，可以支持本地 base64 或者服务器返回来的图片")]),t._v(" "),s("li",[t._v("在父组件跳转到子组件的时候，使用 "),s("code",[t._v("navigateTo")]),t._v(" 方法，携带参数，如果参数里面带特殊字符，会被截断，导致我们在子组件获取到的参数不正确。解决办法就是，通过 "),s("code",[t._v("encodeURIConponent")]),t._v("，对参数进行编码，然后在子组件再进行解码，其实跟我们 url 传递参数是一样的，都需要注意这一点。")]),t._v(" "),s("li",[t._v("cover-view 组件 IOS 可以支持滚动了，不过需要 7.0 以上版本的微信。")]),t._v(" "),s("li",[t._v("单页面目前也是可以支持自定义导航栏，同样需要 7.0 以上版本的微信。")]),t._v(" "),s("li",[t._v("mpvue 的坑，双向数据绑定的时候，有些安卓机会卡顿。可以通过防抖赋值或者 v-model.lazy，不使用双向绑定")]),t._v(" "),s("li",[s("code",[t._v("<cover-view></cover-view>")]),t._v("组件默认不换行，加上这一行代码，可以让它换行 white-space:pre-wrap;")])]),t._v(" "),s("h2",{attrs:{id:"_2-https-部署以及设置合法域名。"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-https-部署以及设置合法域名。"}},[t._v("#")]),t._v(" 2. https 部署以及设置合法域名。")]),t._v(" "),s("ol",[s("li",[t._v("小程序向后台请求接口必须使用 https，包括 web-view 里的网页，如果项目中有用到 web socket，那么也必须使用 wss 协议。https 证书一般会用第三方的。比如阿里云的。")]),t._v(" "),s("li",[t._v("在微信小程序管理后台，还需要配置合法域名。当然，在后台还没有部署 https 之前，我们也可以进行开发调试，只需要设置不校验合法域名，https 证书等即可。")])]),t._v(" "),s("h2",{attrs:{id:"_3-post-请求，json-数据格式转换"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-post-请求，json-数据格式转换"}},[t._v("#")]),t._v(" 3. post 请求，json 数据格式转换")]),t._v(" "),s("p",[t._v("当我们向后台进行 post 请求的时候，当我们的传输数据的格式为 json 的时候，需要设置")]),t._v(" "),s("blockquote",[s("p",[t._v("'content-type': 'application/x-www-form-urlencoded'")])]),t._v(" "),s("h2",{attrs:{id:"_4-微信小程序谁是首页的问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-微信小程序谁是首页的问题"}},[t._v("#")]),t._v(" 4. 微信小程序谁是首页的问题")]),t._v(" "),s("p",[t._v("当我们在开发原生应用的时候，我们一般会在程序的入口，设置我们程序的第一个页面，但是反观小程序，并没有找到类似的方法，原来在小程序中，app.json 文件中的 pages 数据的第一个元素，就是首页。但是，我们有时候会有这样的需求，微信扫码直接跳转小程序内部的指定页面，那么，这时，只需要在小程序管理后台，设置扫码打开的页面路径填好即可。")]),t._v(" "),s("h2",{attrs:{id:"_5-微信小程序开发单位问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-微信小程序开发单位问题"}},[t._v("#")]),t._v(" 5. 微信小程序开发单位问题")]),t._v(" "),s("p",[t._v("我们再开发 iOS 的时候默认使用 "),s("code",[t._v("pt")]),t._v("；在开发 Android 的时候，我们使用 "),s("code",[t._v("dp")]),t._v(",sp 等单位；在开发 web 的时候使用 em,rem 等单位。但是在我们的小程序里我们只要记住 "),s("code",[t._v("rpx")]),t._v(" 这一个单位就好了，这样我们开发出来的小程序就完美的运行在各式各样屏幕的手机上了。no!no!no，也是有特殊情况的，有时候我们就不能使用 rpx，比如使用到 "),s("code",[t._v("canvas")]),t._v(" 的时候，那么就只能使用 px 为单位，那么，如何做到屏幕适配呢？我的做法是使用 "),s("code",[t._v("wx.getSystemInfo")]),t._v(" 这个 api 来获取到运行手机的屏幕的宽度和高度，那么根据 UI 的标注图的屏幕宽高，就可以换算出一个比例来了。如果大家有更好的做法欢迎交流指正。")]),t._v(" "),s("h2",{attrs:{id:"_6-wxss-文件中不支持本地图片"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-wxss-文件中不支持本地图片"}},[t._v("#")]),t._v(" 6. wxss 文件中不支持本地图片")]),t._v(" "),s("p",[t._v("如果我们有一个需求：添加一张背景图，根据 web 开发思维，肯定是在 background-image:中设置本地图片的路径，但是在微信小程序上这是行不通的。微信小程序的 background-image 只支持网络图片。")]),t._v(" "),s("h2",{attrs:{id:"_7-this-setdata-和直接赋值的区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_7-this-setdata-和直接赋值的区别"}},[t._v("#")]),t._v(" 7. this.setData 和直接赋值的区别")]),t._v(" "),s("p",[t._v("这两者都可以造成 data 里数据的改变，但是 this.setData 赋值才会造成 wxml 里面数据的改变，也就是同步更新渲染界面，而直接赋值只会让 data 里数据发生变化，但是界面并不会改变。看代码：")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//wxml文件")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("text"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("我的名字是"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("text"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//js文件")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//数据源")]),t._v("\ndata"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onLoad")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("options")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'张三'")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//只会使data里数据发送改变，但是界面不会发生改变，界面仍显示”我的名字是“")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//打印出来的结果是”张三“")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setData")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'张三'")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//此时，界面数据才会发生改变，变成”我的名字是张三“")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br"),s("span",{staticClass:"line-number"},[t._v("18")]),s("br")])]),s("h2",{attrs:{id:"_8-cover-view-组件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_8-cover-view-组件"}},[t._v("#")]),t._v(" 8. cover-view 组件")]),t._v(" "),s("p",[t._v("这是小程序上特有的组件，它其实是由客户端创建的原生组件。这些组件有："),s("code",[t._v("cavans")]),t._v("，"),s("code",[t._v("map")]),t._v("，"),s("code",[t._v("vedio")]),t._v(" 等，如果想要在原生组件上覆盖组件的话，添加 view,text,button 都是行不通的，必须使用 "),s("code",[t._v("cover-view")]),t._v(" 和 "),s("code",[t._v("cover-image")]),t._v(" 组件，具体用法，可以参考微信小程序官方文档。下面我来说说 cover-view 中踩过的坑。cover-view 对 css 支持真的不太友好，虽然我们设置背景色，字体大小，宽高等都没啥问题，但是，")]),t._v(" "),s("ol",[s("li",[t._v("在 web 开发中，如果我们想要给文字设置删除线，那么使用 text-decoration 即可实现，但是抱歉，cover-view 不支持这个属性。")]),t._v(" "),s("li",[t._v("曾经我尝试给 "),s("code",[t._v("cover-image")]),t._v(" 添加旋转的动画，但是发现怎么都实现不了，我猜测可能也是不支持，后来换了其他方法实现这个需求了。")]),t._v(" "),s("li",[s("code",[t._v("cover-view")]),t._v(" 是有 hidden 属性的，但是我奇葩的发现了，在 ios10 系统上，cover-view 改变 hidden 属性的时候报错了，后来换成了 wx:if，就这样神奇的解决了。")]),t._v(" "),s("li",[t._v("使用 "),s("code",[t._v("cover-view")]),t._v(" 组件的时候，如果 cover-view 在模拟器上表现是好的，别忘了使用真机跑跑看，说不定会有意想不到的结果哦。")]),t._v(" "),s("li",[t._v("总之，使用 cover-view 的时候一定要小心谨慎。")])]),t._v(" "),s("h2",{attrs:{id:"_9-微信小程序不能操作-dom-树"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_9-微信小程序不能操作-dom-树"}},[t._v("#")]),t._v(" 9. 微信小程序不能操作 DOM 树")]),t._v(" "),s("p",[t._v("web 开发中，可以使用 "),s("code",[t._v("getElementById()")]),t._v("访问 "),s("code",[t._v("documnent")]),t._v(" 中的某一个元素，顾名思义，就是通过 id 来获取元素，但是微信小程序没有 "),s("code",[t._v("windows")]),t._v(" 对象，所以小程序不能直接操作 dom 树，小程序采用的都是 mvvm 的设计模式，数据双向绑定。类似于 vue.js 的写法。")]),t._v(" "),s("h2",{attrs:{id:"_10-微信小程序分享功能如何实现"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_10-微信小程序分享功能如何实现"}},[t._v("#")]),t._v(" 10. 微信小程序分享功能如何实现")]),t._v(" "),s("p",[t._v("微信有庞大的流量，既然有这么得天独厚的平台，那么在小程序开发分享功能也是水到渠成的。比如，要开发一个类似外卖平台发红包的功能，照以前开发 app 逻辑，app 客户端负责开发“发红包”的逻辑，集成分享的 sdk，把红包发出去即可，再使用 web 开发“领红包”的逻辑，也就是领红包的页面是一个 web 页面。一开始，我也是打算这么设计这个架构的。但是在 web 页面重新登录，在打开小程序，中间涉及到的登录流程又会显得比较复杂。后来参考了其他小程序的分享功能，把分享页面也定义成一个小程序原生页面，而不是小程序内的 web-view 页面。这样设计，实际开发后，发现其实简单了许多。")]),t._v(" "),s("h2",{attrs:{id:"_11-配置普通链接二维码规则需要注意的地方"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_11-配置普通链接二维码规则需要注意的地方"}},[t._v("#")]),t._v(" 11. 配置普通链接二维码规则需要注意的地方")]),t._v(" "),s("p",[t._v("这里有一个地方需要注意。开发小程序的时候，我们有一个使用微信扫码打开指定页面的需求。那么我们需要配置一个普通链接二维码规则，但是我们在开发测试的过程中，我们需要来测试我们的跳转功能是否好用。二维码规则需要发布才可以全网使用，测试链接也是只针对管理员开发者体验着等有效果。")]),t._v(" "),s("div",{attrs:{align:"center"}},[s("img",{attrs:{src:t.$withBase("/images/prepare/mobile/2020070601.webp"),alt:"prepare/mobile/2020070601.webp"}})]),t._v(" "),s("h2",{attrs:{id:"_12-地图导航等功能需要注意的地方"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_12-地图导航等功能需要注意的地方"}},[t._v("#")]),t._v(" 12. 地图导航等功能需要注意的地方")]),t._v(" "),s("p",[t._v("微信小程序集成地图功能非常简单，但是需要注意的是我们使用的是腾讯地图，也就是 "),s("code",[t._v("gcj02")]),t._v(" 坐标系，如果后台使用的是其他坐标系，那么我们需要转换。如果需要实现导航功能，那么小程序内的 map 组件是没有这个能力的，我们需要调用 "),s("code",[t._v("wx.openLocation")]),t._v(" 来实现，其实这个 api 是打开了微信内置的腾讯地图，这样，就是我们熟悉的微信导航服务了，可以在这里打开手机内的百度地图，高德地图，腾讯地图这些 app 来进行导航了。")]),t._v(" "),s("h2",{attrs:{id:"_13-wx-showtoast-吐槽"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_13-wx-showtoast-吐槽"}},[t._v("#")]),t._v(" 13. wx.showToast 吐槽")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("wx"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("showToast")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  title"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"成功"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  icon"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"success"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  duration"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2000")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br")])]),s("p",[t._v("微信提供的这个 api，默认的提示图标是一个小勾勾，但是即使不设置 icon，也会出现这个图标，这就很难受了。如果我想提示失败呢？你给我一个对勾的图标？我的解决办法就是自己写了一个 toast-view")]),t._v(" "),s("h2",{attrs:{id:"_14-添加点击事件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_14-添加点击事件"}},[t._v("#")]),t._v(" 14. 添加点击事件")]),t._v(" "),s("p",[t._v("在 wxml 文件中，text,image,view,button 等标签都可以添加点击事件。（ps:这点比移动开发中只有 button 才能添加点击事件，其他的只能添加手势方便了许多）使用 button 的时候有一点需要注意，那就是 button 有默认的样式，我们如果不需要这个样式，需要手动清除。")]),t._v(" "),s("h2",{attrs:{id:"_15-微信小程序-app-json-里-pages-数组中路径顺序问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_15-微信小程序-app-json-里-pages-数组中路径顺序问题"}},[t._v("#")]),t._v(" 15. 微信小程序 app.json 里 pages 数组中路径顺序问题")]),t._v(" "),s("p",[t._v("这个坑有点深，之前没注意，后来加了底部的 tabBar 才发现，原来这个顺序和底部的 tabBar 有很大关系。配置 tabBar 时，list 参数中的 pagePath 参数至少需要包含 app.json 里 pages 数组中的第一个路径，否则会导致 tabBar 不显示。")]),t._v(" "),s("h2",{attrs:{id:"_16-微信小程序底部菜单-tabbar-跳转无法带参数问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_16-微信小程序底部菜单-tabbar-跳转无法带参数问题"}},[t._v("#")]),t._v(" 16. 微信小程序底部菜单 tabBar 跳转无法带参数问题")]),t._v(" "),s("p",[t._v("开发微信小程序的都会碰到过，就是小程序底部菜单跳转的时候，是不能带参数的，这个问题也很好解决，直接把需要传递参数的页面在跳转前将数据添加到全局数据 app.js 里。需要接受参数的页面在 onShow 方法接收之前，添加到 app.js 的数据就可以了")]),t._v(" "),s("h2",{attrs:{id:"_17-微信小程序使用-post-方法请求的问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_17-微信小程序使用-post-方法请求的问题"}},[t._v("#")]),t._v(" 17. 微信小程序使用 POST 方法请求的问题")]),t._v(" "),s("p",[t._v("这个坑也是不小的坑，微信小程序发起 "),s("code",[t._v("wx.request()")]),t._v("方法请求，用 get 方法请求都没什么问题，但是用 post 方法请求时，就容易出现这样或那样的问题，原因是 "),s("code",[t._v("wx.request()")]),t._v("使用 post 方法请求时，还需要加上 header，"),s("code",[t._v("header[content-type]")]),t._v("值为 "),s("code",[t._v("application/x-www-form-urlencoded")]),t._v("，否则请求返回失败。")]),t._v(" "),s("h2",{attrs:{id:"_18-微信小程序标签层级问题。"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_18-微信小程序标签层级问题。"}},[t._v("#")]),t._v(" 18. 微信小程序标签层级问题。")]),t._v(" "),s("p",[t._v("做项目时，我们时常遇到标签层级问题，会惯性设置 z-index 的值，但是在微信小程序中有几个原生组件，如 textarea、canvas、map、video，其层级位于 webview 之上。也就是你给 view、text 等等非原生组件无论设置多大的 z-index 值都不行。")]),t._v(" "),s("p",[t._v("可行的解决方式：")]),t._v(" "),s("ol",[s("li",[t._v("使用 cover-view，它能覆盖在原生组件之上，但是有限制，cover-view 只可嵌套 cover-view、cover-image、button。")]),t._v(" "),s("li",[t._v("可在需要时，进行隐藏掉，对于 canvas 图可转为图片形式。")])]),t._v(" "),s("h2",{attrs:{id:"_19-iphone-手机：new-date-的坑"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_19-iphone-手机：new-date-的坑"}},[t._v("#")]),t._v(" 19. iphone 手机：new Date()的坑")]),t._v(" "),s("p",[t._v('解决：在 iphone 手机中，不能使用 new Date 处理"2020-01-01 12:12"格式的时间，而是要“2020/01/01 12:12”这种格式的才行，所以，我们可以使用正则表达式，把‘-’改为‘/’。具体如下')]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" date "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2020-01-01 12:12"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ndate "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Date")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("date"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("replace")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/-/g")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br")])]),s("h2",{attrs:{id:"_20-text、view-中文-英文不自动换行问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_20-text、view-中文-英文不自动换行问题"}},[t._v("#")]),t._v(" 20. text、view 中文/英文不自动换行问题")]),t._v(" "),s("p",[t._v("加如下 3 行样式即可。")]),t._v(" "),s("div",{staticClass:"language-css line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[s("span",{pre:!0,attrs:{class:"token selector"}},[t._v("text,\nview")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("word-wrap")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" break-word"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("word-break")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" break-all"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("white-space")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" pre-line"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br")])]),s("h2",{attrs:{id:"_21-第三方组件样式修改"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_21-第三方组件样式修改"}},[t._v("#")]),t._v(" 21. 第三方组件样式修改")]),t._v(" "),s("p",[t._v("以 iview webapp 为例，不能直接通过其 class 的类名直接修改组件样式，可通过 i-class 来给组件添加类名，通过 i-class 来修改样式。")]),t._v(" "),s("div",{staticClass:"language-vue line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-vue"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("i-page")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("i-class")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("ipage"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("current")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("{{ page }}"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("total")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("{{ total }}"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[s("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("bind:")]),t._v("change")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("handleChange"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n   "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("view")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("slot")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("prev"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("i-icon")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("type")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("return"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("i-icon")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n          上一页\n       "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("view")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n       "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("view")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("slot")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("next"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n          下一页\n       "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("i-icon")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("type")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("enter"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("i-icon")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n   "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("view")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("i-page")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("style")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token style"}},[s("span",{pre:!0,attrs:{class:"token language-css"}},[t._v("\n"),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".ipage")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("height")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 64px "),s("span",{pre:!0,attrs:{class:"token important"}},[t._v("!important")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("style")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br"),s("span",{staticClass:"line-number"},[t._v("17")]),s("br"),s("span",{staticClass:"line-number"},[t._v("18")]),s("br"),s("span",{staticClass:"line-number"},[t._v("19")]),s("br"),s("span",{staticClass:"line-number"},[t._v("20")]),s("br"),s("span",{staticClass:"line-number"},[t._v("21")]),s("br")])]),s("h2",{attrs:{id:"_22-wxml-标签"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_22-wxml-标签"}},[t._v("#")]),t._v(" 22. wxml 标签")]),t._v(" "),s("p",[t._v("wxml 的标签跟 html 里面的一些标签是一样的，就说 view 标签就相当于 div 标签，text 标签相当于 span 标签吧，然就是表单元素，这里就要注意了，在微信小程序中，表单元素都是原生组件，微信小程序中原生组件层级最高，所以在用 input，canvas，map 这些组件就要注意了。其中在样式上不支持 overflow-x/overflow-y，只可使用 overflow。")]),t._v(" "),s("p",[t._v("在 input 标签中会出现 placeholder 文字位置不固定，可使用使用 placeholder-class 属性修改 placeholder 样式。input 标签无法设置 font-family; 。对 input 直接 float：left 也是不行的，要在 input 外面套 view，然后对其进行浮动。")]),t._v(" "),s("p",[t._v("scroll-view 组件注意事项：")]),t._v(" "),s("ol",[s("li",[t._v("不要在 scroll-view 中使用 textarea、map、canvas、video 组件")]),t._v(" "),s("li",[t._v("scroll-into-view 的优先级高于 scroll-top。")]),t._v(" "),s("li",[t._v("在滚动 scroll-view 时会阻止页面回弹，所以在 scroll-view 中滚动，是无法触发 onPullDownRefresh。")])]),t._v(" "),s("p",[t._v("在 map 组件中只能使用 cover-view 标签，在 cover-view 标签下只能使用 cover-view 以及 cover-image 标签，这两种标签在样式上的问题非常多，不建议使用，问题")]),t._v(" "),s("ol",[s("li",[t._v('当使用 display:none;做隐藏的时候，其内容文字会出现在屏幕右上角，建议使用 wx:if="false"或 position:absolute;left:-1000rpx;这种方式做隐藏。')]),t._v(" "),s("li",[t._v("border 不支持单边。")]),t._v(" "),s("li",[t._v("不支持 padding 的使用，在安卓端会出现 padding 消失的问题。")])]),t._v(" "),s("h2",{attrs:{id:"_23-动画问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_23-动画问题"}},[t._v("#")]),t._v(" 23. 动画问题")]),t._v(" "),s("p",[t._v("在小程序中当有两个元素同时发生变化时，会出现冲突，导致其中一个变化，而另一个不做变化，所以要使用 setTimeout 方法避免元素同时出现变化。")]),t._v(" "),s("h2",{attrs:{id:"_24"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_24"}},[t._v("#")]),t._v(" 24.")]),t._v(" "),s("h2",{attrs:{id:"_25"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_25"}},[t._v("#")]),t._v(" 25.")]),t._v(" "),s("h2",{attrs:{id:"_26"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_26"}},[t._v("#")]),t._v(" 26.")]),t._v(" "),s("h2",{attrs:{id:"_27"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_27"}},[t._v("#")]),t._v(" 27.")]),t._v(" "),s("h2",{attrs:{id:"_28"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_28"}},[t._v("#")]),t._v(" 28.")]),t._v(" "),s("h2",{attrs:{id:"_29"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_29"}},[t._v("#")]),t._v(" 29.")]),t._v(" "),s("h2",{attrs:{id:"_30"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_30"}},[t._v("#")]),t._v(" 30.")])])}),[],!1,null,null,null);a.default=n.exports}}]);