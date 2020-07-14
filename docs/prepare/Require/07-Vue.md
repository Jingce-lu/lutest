# Vue

[[toc]]

## 1. “谈谈你对 keep-alive 的了解？”

如果你需要在组件切换的时候，保存一些组件的状态防止多次渲染，就可以使用 `keep-alive` 组件包裹需要保存的组件。

对于 `keep-alive` 组件来说，它拥有两个独有的生命周期钩子函数，分别为 `activated` 和 `deactivated` 。用 `keep-alive` 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 `deactivated` 钩子函数，命中缓存渲染后会执行 `actived` 钩子函数。

> keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。
> 在 vue 2.1.0 版本之后，keep-alive 新加入了两个属性: include(包含的组件缓存) 与 exclude(排除的组件不缓存，优先级大于 include) 。

1. `<keep-alive>`是 `Vue` 源码中实现的一个全局抽象组件，通过自定义 `render` 函数并且利用了插槽来实现数据缓存和更新。它的定义在`src/core/components/keep-alive.js` 中：
   ```js
   export default {
     name: 'keep-alive',
     abstract: true,
     ...
   }
   ```
2. 所有的抽象组件是通过定义`abstract`选项来声明的。抽象组件不渲染真实`DOM`，且不会出现在父子关系的路径上（`initLifecycle`会忽略抽象组件），相关代码片段：
   ```js
   if (parent && !options.abstract) {
     // abstract 即 `options.abstract`
     // while 循环查找第一个非抽象的父组件
     while (parent.$options.abstract && parent.$parent) {
       parent = parent.$parent;
     }
     parent.$children.push(vm);
   }
   ```
3. 跟 keep-alive 有关的生命周期是哪些？描述下这些生命周期

- activated： 页面第一次进入的时候，钩子触发的顺序是 created->mounted->activated
- deactivated: 页面退出的时候会触发 deactivated，当再次前进或者后退的时候只触发 activated

## 2. “了解 Vue2.6+新全局 API：Vue.observable()吗？”

让一个对象可响应。Vue 内部会用它来处理 data 函数返回的对象。  
返回的对象可以直接用于渲染函数和计算属性内，并且会在发生改变时触发相应的更新。也可以作为最小化的跨组件状态存储器，用于简单的场景：

Vue2.6+新的全局 API 是`Vue.observable()`,它的使用方式：

```js
import vue from vue;
const state = Vue.observable ({
   counter: 0,
});
export default {
   render () {
     return (
       <div>
         {state.counter}
           <button v-on:click={() => {state.counter ++; }}>
           Increment counter
         </ button>
       </ div>
     );
   },
};
```

而它定义在`/src/core/global-api/index.js`第 48 行：

```js
import { observe } from "core/observer/index";
// ...
// 2.6 explicit observable API
Vue.observable = <T>(obj: T): T => {
  observe(obj);
  return obj;
};
```

## 3. vue 生命周期（钩子函数）

**问题**:

请说一下 vue 的生命周期函数（钩子函数）。

**期望答案**:

beforeCreate、created（此时需说明可以在 created 中首次拿到 data 中定义的数据）、beforeMount、mounted（此时需说明 dom 树渲染结束，可访问 dom 结构）、beforeUpdate、updated、beforeDestroy、destroyed

- `beforeCreate`是 new Vue()之后触发的第一个钩子，在当前阶段 data、methods、computed 以及 watch 上的数据和方法都不能被访问。**vue 实例的挂载元素\$el 和数据对象 data 都为 undefined，还未初始化**。
- `created`在实例创建完成后发生，当前阶段已经完成了数据观测，也就是可以使用数据，更改数据，在这里更改数据不会触发 updated 函数。可以做一些初始数据的获取，在当前阶段无法与 Dom 进行交互，如果非要想，可以通过 vm.\$nextTick 来访问 Dom。 **vue 实例的数据对象 data 有了，\$el 还没有**。
- `beforeMount`发生在挂载之前，在这之前 template 模板已导入渲染函数编译。而当前阶段虚拟 Dom 已经创建完成，即将开始渲染。在此时也可以对数据进行更改，不会触发 updated。**vue 实例的\$el 和 data 都初始化了，但还是挂载之前为虚拟的 dom 节点，data.message 还未替换**。
- `mounted`在挂载完成后发生，在当前阶段，真实的 Dom 挂载完毕，数据完成双向绑定，可以访问到 Dom 节点，使用\$refs 属性对 Dom 进行操作。**vue 实例挂载完成，data.message 成功渲染**。
- `beforeUpdate`发生在更新之前，也就是响应式数据发生更新，虚拟 dom 重新渲染之前被触发，你可以在当前阶段进行更改数据，不会造成重渲染。
- `updated`发生在更新完成之后，当前阶段组件 Dom 已完成更新。要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新。
- `beforeDestroy`发生在实例销毁之前，在当前阶段实例完全可以被使用，我们可以在这时进行善后收尾工作，比如清除计时器。
- `destroyed`发生在实例销毁之后，这个时候只剩下了 dom 空壳。组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁。

## 4. computed 中的 getter 和 setter

**问题**: 说一下`computed`中的`getter`和`setter`。

**问题描述** <br />
很多情况，我问到这个问题的时候对方的回答都是 vue 的 getter 和 setter、订阅者模式之类的回答，我就会直接说问的并不是这个，而是 computed，直接让对方说 computed 平时怎么使用，很多时候得到的回答是 computed 的默认方式，只使用了其中的 getter，就会继续追问如果想要再把这个值设置回去要怎么做，当然一般会让问到这个程度的这个问题他都答不上来了。

期望答案

```js
// 直接复制的官网示例
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

<p style="color: red">Vue 中的 computed 是如何实现的</p>
computed本身是通过代理的方式代理到组件实例上的，所以读取计算属性的时候，执行的是一个内部的getter，而不是用户定义的方法。

computed 内部实现了一个惰性的 watcher，在实例化的时候不会去求值，其内部通过 dirty 属性标记计算属性是否需要重新求值。当 computed 依赖的任一状态（不一定是 return 中的）发生变化，都会通知这个惰性 watcher，让它把 dirty 属性设置为 true。所以，当再次读取这个计算属性的时候，就会重新去求值。

惰性 watcher/计算属性在创建时是不会去求值的，是在使用的时候去求值的。

## 5. 如何 watch 监听一个对象内部的变化。

**问题描述** <br />
这个问题我感觉是一个不应该不会的问题，可是我遇到的人大部分都没有给出我所期望的答案，有些人会说直接监听 obj，好一点的会说直接点出来监听 obj.key，但是很少有人回答 deep，开始我还会去问 immediate，但是太多人不知道了，所以后来我就只问监听对象了，只有回答出 deep 的才会去问 immediate 的作用。

**期望答案**
如果只是监听 obj 内的某一个属性变化，可以直接 obj.key 进行监听。

```js
watch: {
  'obj.question': function (newQuestion, oldQuestion) {
    this.answer = 'Waiting for you to stop typing...'
    this.debouncedGetAnswer()
  }
}
```

如果对整个 obj 深层监听

```js
watch: {
  obj: {
      handler: function (newQuestion, oldQuestion) {
        this.answer = 'Waiting for you to stop typing...'
        this.debouncedGetAnswer()
      },
      deep: true,
      immediate: true
  }
}
```

immediate 的作用：当值第一次进行绑定的时候并不会触发 watch 监听，使用 immediate 则可以在最初绑定的时候执行。

## 6. v-for 循环 key 的作用

**问题**<br />
v-for 循环时为什么要加 key。

**问题描述**<br />
问这个问题时，好多人再先回答的都是页面有警告，编辑器有提示，我会直接说不考虑报错和提示的问题，或者会问如果不加 key 的话，页面会不会出现什么异常情况。有的人会说是一个标识，标识他的唯一性，我会继续追问为什么要标识唯一性呢，不加又怎么样？

**期望答案**<br />
vue 的 dom 渲染是虚拟 dom，数据发生变化时，diff 算法会只比较更改的部分，如果数据项的顺序被改变，Vue 将不是移动 DOM 元素来匹配数据项的改变，而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。举例说明：有一个列表我们现在在中间插入了一个元素，diff 算法会默认复用之前的列表并在最后追加一个，如果列表存在选中一类的状态则会随着复用出现绑定错误的情况而不是跟着原元素，key 的作用就可以给他一个标识，让状态跟着数据渲染。（这一块是我自己的一个大概理解，表述不太清楚，具体的可以去查一下文档，本文就不具体描述此问题了。）

## 7. \$nextTick

**问题**<br />
`$nextTick`用过吗，有什么作用。

**问题描述**<br />
问到这个问题时，很多人都会说到可以处理异步，而往下追问为什么要用 nextTick，他解决了什么问题，不用他会怎么样的时候就很多人说不上来了。

**期望答案**<br />
在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。(官网解释)  
解决的问题：有些时候在改变数据后立即要对 dom 进行操作，此时获取到的 dom 仍是获取到的是数据刷新前的 dom，无法满足需要，这个时候就用到了\$nextTick。

```js
// 修改数据
vm.msg = "Hello";
// DOM 还没有更新
Vue.nextTick(function() {
  // DOM 更新了
});

// 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)
Vue.nextTick().then(function() {
  // DOM 更新了
});
```

**实现原理**

在下次 DOM 更新循环结束之后执行延迟回调。nextTick 主要使用了宏任务和微任务。根据执行环境分别尝试采用

- Promise
- MutationObserver
- setImmediate
- 如果以上都不行则采用 setTimeout

定义了一个异步方法，多次调用 nextTick 会将方法存入队列中，通过这个异步方法清空当前队列。

**vue 的 this.\$nextTick 是如何设计的**

1. 先判断是否原生支持 promise，如果支持，则利用 promise 来触发执行回调函数;
2. 否则，如果支持 MutationObserver，则实例化一个观察者对象，观察文本节点发生变化时，触发执行所有回调函数。
3. 如果都不支持，则利用 setTimeout 设置延时为 0。

## 8. 组件间的传值

**问题** <br />
说一下组件间的传值方式，你知道的所有方式都说一下

**问题描述** <br />
这个问题其实就是想看官方文档有没有具体看过，因为很多传值方式官方文档上有描述，但是项目中用的相对较少。

基本都能回答上来，父传子：props；子传父：\$emit；兄弟：eventbus；vuex；有一些会说到 sessionStorage 和 localStorage、路由传参（这个答案其实并不是我想要问的，不过也可以实现一定的传值）

以下传值方式的具体使用方式本文不具体描述了，后面会再写一篇关于传值方式的文章，到时候再附上链接。

**期望答案**

1. `provide / inject` <br />
   这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。
2. `Vue.observable` <br />
   让一个对象可响应。Vue 内部会用它来处理 data 函数返回的对象。
   返回的对象可以直接用于渲染函数和计算属性内，并且会在发生改变时触发相应的更新。也可以作为最小化的跨组件状态存储器，用于简单的场景：

   ```js
   const state = Vue.observable({ count: 0 });

   const Demo = {
     render(h) {
       return h(
         "button",
         {
           on: {
             click: () => {
               state.count++;
             }
           }
         },
         `count is: ${state.count}`
       );
     }
   };
   ```

3. `$attrs` <br />
   包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="\$attrs" 传入内部组件——在创建高级别的组件时非常有用。
4. `$listeners` <br />
   包含了父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件——在创建更高层次的组件时非常有用。
5. `props`
6. `$emit`
7. `eventbus`
8. `vuex`
9. `$parent / $children / ref`

## 9. 谈谈你对 MVVM 开发模式的理解

MVVM 分为 Model、View、ViewModel 三者。

- `Model`：代表数据模型，数据和业务逻辑都在 Model 层中定义；
- `View`：代表 UI 视图，负责数据的展示；
- `ViewModel`：负责监听 Model 中数据的改变并且控制视图的更新，处理用户交互操作；

Model 和 View 并无直接关联，而是通过 ViewModel 来进行联系的，Model 和 ViewModel 之间有着双向数据绑定的联系。因此当 Model 中的数据改变时会触发 View 层的刷新，View 中由于用户交互操作而改变的数据也会在 Model 中同步。

这种模式实现了 Model 和 View 的数据自动同步，因此开发者只需要专注对数据的维护操作即可，而不需要自己操作 dom。

mvc 和 mvvm 其实区别并不大。都是一种设计思想。主要就是 mvc 中 Controller 演变成 mvvm 中的 viewModel。**mvvm 主要解决了 mvc 中大量的 DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验**。

区别：vue 数据驱动，通过数据来显示视图层而不是节点操作。  
场景：数据操作比较多的场景，更加便捷

## 10. 简述 Vue 的响应式原理

当一个 Vue 实例创建时，vue 会遍历 data 选项的属性，用 `Object.defineProperty` 将它们转为`getter/setter`并且在内部追踪相关依赖，在属性被访问和修改时通知变化。 每个组件实例都有相应的 watcher 程序实例，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新。

**ADD 200620**

首先是观察者，observer 它利用 `Object.defineProperty` 去拿到 data 依赖，然后遍历子集依赖， `set` 拿到说有子依赖， 就告诉订阅者 `watcher`，每收集一个子依赖就 `new` 一个订阅者，最后订阅者被收集起来，`dep` 就是个收集器，是个集合或者数组。然后通过编译器 cimpile 去拿组件里所有我们定义的 template dom, 这里需要区分 nodetype，因为 vue 模版或者是指令都是自己定义好的，如 v-text 双括号这些，然后和 dep 里的收集做一个匹配，render 到我们 index.html 定义的 app 里去

总结一下就是收集数据依赖，然后装到订阅器里，匹配 dom 中的指令，进行赋值。

这是双向绑定，然后每次修改数据呢？ 会有一个 `dom diff` 的过程。当我们第一次渲染 dom 的时候，会把 dom 转成一个 vdom 对象，是个 js 对象，当修改数据的时候，会走 vue 的 update 钩子，首先通过拿到修改后的数据依赖，生成一份新的 vdom 对象，和旧的 vdom 比较，比较是一个逐层比较的过程，走 patch 方法，相同不管，不同直接新生成一个，把旧的移除，把新的放进去。然后去比较下一层，会有一个 updatechildren 的过程。children 可能会是多个，所以我们给每个孩子定义索引，新旧比较，相同不管，不同新的孩子插入到旧孩子前一个索引下标出，旧孩子移除。前面比较的同时后面也开始比较，一直到 startindex 大于等于 endindex 表示比较完了，然后我们就知道哪里变了，只把变了的 vdom render 成真正的 dom 就可以了

## 11. Vue 的双向数据绑定原理是什么

vue.js 是**采用数据劫持结合发布者-订阅者模式的方式**，通过`Object.defineProperty()`来劫持各个属性的`setter`，`getter`，在数据变动时发布消息给订阅者，触发相应的监听回调。

具体实现步骤，感兴趣的可以看看:

1. 当把一个普通 Javascript 对象传给 Vue 实例来作为它的 data 选项时，Vue 将遍历它的属性，用 Object.defineProperty 都加上 setter 和 getter 这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化
2. compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
3. Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要做的事情是:
   1. 在自身实例化时往属性订阅器(dep)里面添加自己
   2. 自身必须有一个 update()方法
   3. 待属性变动 dep.notice()通知时，能调用自身的 update()方法，并触发 Compile 中绑定的回调，则功成身退。
4. MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据 model 变更的双向绑定效果

```js
//vue实现数据双向绑定的原理就是用Object.defineproperty()重新定义（set方法）对象设置属性值和（get方法）获取属性值的操纵来实现的。
//Object.property()方法的解释：Object.property(参数1，参数2，参数3)  返回值为该对象obj
//其中参数1为该对象（obj），参数2为要定义或修改的对象的属性名，参数3为属性描述符，属性描述符是一个对象，主要有两种形式：数据描述符和存取描述符。这两种对象只能选择一种使用，不能混合使用。而get和set属于存取描述符对象的属性。
//这个方法会直接在一个对象上定义一个新属性或者修改对象上的现有属性，并返回该对象。

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body>
    <div id="myapp">
        <input v-model="message" /><br>
        <span v-bind="message"></span>
    </div>
    <script type="text/javascript">
        var model = {
            message: ""
        };
        var models = myapp.querySelectorAll("[v-model=message]");
        for (var i = 0; i < models.length; i++) {
            models[i].onkeyup = function() {
                model[this.getAttribute("v-model")] = this.value;
            }
        }
        // 观察者模式 / 钩子函数
        // defineProperty 来定义一个对象的某个属性
        Object.defineProperty(model, "message", {
            set: function(newValue) {
                var binds = myapp.querySelectorAll("[v-bind=message]");
                for (var i = 0; i < binds.length; i++) {
                    binds[i].innerHTML = newValue;
                };
                var models = myapp.querySelectorAll("[v-model=message]");
                for (var i = 0; i < models.length; i++) {
                    models[i].value = newValue;
                };
                this.value = newValue;
            },
            get: function() {
                return this.value;
            }
        })
</script>
</body>
</html>
```

```js
// 依赖收集
// 简化版
var obj = {};
var name;
//第一个参数：定义属性的对象。
//第二个参数：要定义或修改的属性的名称。
//第三个参数：将被定义或修改的属性描述符。
Object.defineProperty(obj, "data", {
  //获取值
  get: function() {
    return name;
  },
  //设置值
  set: function(val) {
    name = val;
    console.log(val);
  }
});
//赋值调用set
obj.data = "aaa";
//取值调用get
console.log(obj.data);

// 详细版
myVue.prototype._obverse = function(obj) {
  // obj = {number: 0}
  var value;
  for (key in obj) {
    //遍历obj对象
    if (obj.hasOwnProperty(key)) {
      value = obj[key];
      if (typeof value === "object") {
        //如果值是对象，则递归处理
        this._obverse(value);
      }
      Object.defineProperty(this.$data, key, {
        //关键
        enumerable: true,
        configurable: true,
        get: function() {
          console.log(`获取${value}`);
          return value;
        },
        set: function(newVal) {
          console.log(`更新${newVal}`);
          if (value !== newVal) {
            value = newVal;
          }
        }
      });
    }
  }
};
```

## 12. Vue 中如何在组件内部实现一个双向数据绑定？

假设有一个输入框组件，用户输入时，同步父组件页面中的数据。

具体思路：父组件通过`props`传值给子组件，子组件通过 `$emit` 来通知父组件修改相应的 props 值，具体实现如下：

```js
import Vue from "vue";

const component = {
  props: ["value"],
  template: `
    <div>
      <input type="text" @input="handleInput" :value="value">
    </div>
  `,
  data() {
    return {};
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    }
  }
};

new Vue({
  components: {
    CompOne: component
  },
  el: "#root",
  template: `
    <div>
      <comp-one :value="value" @input="value = arguments[0]"></comp-one>
    </div>
  `,
  data() {
    return {
      value: "123"
    };
  }
});
```

可以看到，当输入数据时，父子组件中的数据是同步改变的：

<div align="center"><img :src="$withBase('/images/prepare/require/2020050705.webp')" alt="prepare/require/2020050705.webp"></div>

<div align="center"><img :src="$withBase('/images/prepare/require/2020050706.png')" alt="prepare/require/2020050706.png"></div>

我们在父组件中做了两件事，一是给子组件传入 props，二是监听 input 事件并同步自己的 value 属性。那么这两步操作能否再精简一下呢？答案是可以的，你只需要修改父组件：

```js
template: `
  <div>
    <!--<comp-one :value="value" @input="value = arguments[0]"></comp-one>-->
    <comp-one v-model="value"></comp-one>
  </div>
`;
```

v-model 实际上会帮我们完成上面的两步操作。

相当于`v-bind:value="xxx"` 和 `@input`，意思是绑定了一个 value 属性的值，子组件可对 value 属性监听，通过`$emit('input', xxx)`的方式给父组件通讯。

v-model 本质就是一个语法糖，可以看成是`value + input`方法的语法糖。可以通过 model 属性的`prop`和`event`属性来进行自定义。原生的 v-model，会根据标签的不同生成不同的事件和属性。

## 13. Vue 中给 data 中的对象属性添加一个新的属性时会发生什么，如何解决？

示例：

```vue
<template>
  <div>
    <ul>
      <li v-for="value in obj" :key="value">
        {{ value }}
      </li>
    </ul>
    <button @click="addObjB">添加obj.b</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      obj: {
        a: "obj.a"
      }
    };
  },
  methods: {
    addObjB() {
      this.obj.b = "obj.b";
      console.log(this.obj);
    }
  }
};
</script>
```

点击 button 会发现， obj.b 已经成功添加，但是视图并未刷新

原因在于在 Vue 实例创建时， obj.b 并未声明，因此就没有被 Vue 转换为响应式的属性，自然就不会触发视图的更新，这时就需要使用 Vue 的全局 api—— `$set()`：

```js
ddObjB(){
  //  this.obj.b = 'obj.b'
  this.$set(this.obj, 'b', 'obj.b')
  console.log(this.obj)
}
```

`$set()` 方法相当于手动的去把 obj.b 处理成一个响应式的属性，此时视图也会跟着改变了

## 14. \$set

**问题** <br />
vue 中的 `$set` 用过吗，为什么要用它，解决了什么问题

**问题描述** <br />
这个问题知道的人就基本都能说出来，但是不知道的就是一点不了解，有的还会说到 es6 的 set 结构

**期望答案** <br />
向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性 (比如 this.myObject.newProperty = 'hi')（官方示例）

我自己的理解就是，在 vue 中对一个对象内部进行一些修改时，vue 没有监听到变化无法触发视图的更新，此时来使用 `$set` 来触发更新，使视图更新为最新的数据。

## 15. delete 和 Vue.delete 删除数组的区别

`delete`只是被删除的元素变成了 `empty/undefined` 其他的元素的键值还是不变。

`Vue.delete` 直接删除了数组 改变了数组的键值。

```js
var a = [1, 2, 3, 4];
var b = [1, 2, 3, 4];

delete a[1];
console.log(a); // [1, empty, 3, 4]

this.$delete(b, 1);
console.log(b); // [1, 3, 4]
```

## 16. Proxy 相比于 defineProperty 的优势

`Object.defineProperty()` 的问题主要有三个：

- 不能监听数组的变化
- 必须遍历对象的每个属性
- 必须深层遍历嵌套的对象

`Proxy` 在 ES2015 规范中被正式加入，它有以下几个特点：

- 针对对象：针对整个对象，而不是对象的某个属性，所以也就不需要对 keys 进行遍历。这解决了上述 Object.defineProperty() 第二个问题
- 支持数组：Proxy 不需要对数组的方法进行重载，省去了众多 hack，减少代码量等于减少了维护成本，而且标准的就是最好的。

## 17. proxy 支持的方法有

1. `get()`：拦截对象属性的读取。
2. `set()`：拦截对象属性的设置。
3. `apply()`：拦截函数的调用、call 和 apply 操作。
4. `has()`：即判断对象是否具有某个属性时，这个方法会生效，返回一个布尔值。它有两个参数：目标对象、需查询的属性名。
5. `construct()`：用于拦截 new 命令。参数：`target`(目标对象)、`args`(构造函数的参数对象)、`newTarget`(创建实例对象时，`new`命令作用的构造函数)。
6. `deleteProperty()`：拦截`delete proxy[propKey]`的操作，返回一个布尔值。
7. `defineProperty()`：拦截`object.definePropert`y 操作
8. `getOwnPropertyDescriptor()`：拦截`object.getownPropertyDescriptor()`，返回一个属性描述对象或者`undefined`。
9. `getPrototypeOf()`：用来拦截获取对象原型。可以拦截`Object.prototype.__proto__`、 `Object.prototype.isPrototypeOf()`、 `Object.getPrototypeOf()`、 `Reflect.getPrototypeOf()`、 `instanceof`
10. `isExtensible()`：拦截`Object.isExtensible`操作，返回布尔值。
11. `ownKeys()`：拦截对象自身属性的读取操作。可拦截`Object.getOwnPropertyNames()`、 `Object.getOwnPropertySymbols()`、 `Object.keys()`、 `for...in`循环。
12. `preventExtensions()`：拦截`Object.preventExtensions()`，返回一个布尔值。
13. `setPrototypeOf()`：拦截`Object.setPrototypeOf`方法。
14. `revocable()`：返回一个可取消的`proxy`实例。

> demo

```vue
<body>
    <input type="text" id="input">
    <p id="p"></p>
</body>
<script>
const input = document.getElementById("input");
const p = document.getElementById("p");
const obj = {};

const newObj = new Proxy(obj, {
  get: function(target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function(target, key, value, receiver) {
    console.log(target, key, value, receiver);
    if (key === "text") {
      input.value = value;
      p.innerHTML = value;
    }
    return Reflect.set(target, key, value, receiver);
  }
});

input.addEventListener("keyup", function(e) {
  newObj.text = e.target.value;
});
</script>
```

## 18. “Vue-router 路由模式有几种？”

三种 `"hash" | "history" | "abstract"`，一般人只知道两种`"hash" | "history"`。

这里贴出源码：

```js
switch (mode) {
  case "history":
    this.history = new HTML5History(this, options.base);
    break;
  case "hash":
    this.history = new HashHistory(this, options.base, this.fallback);
    break;
  case "abstract":
    this.history = new AbstractHistory(this, options.base);
    break;
  default:
    if (process.env.NODE_ENV !== "production") {
      assert(false, `invalid mode: ${mode}`);
    }
}
```

mode:

类型: string

默认值: `"hash" (浏览器环境) | "abstract" (Node.js 环境)`

可选值: `"hash" | "history" | "abstract`" 配置路由模式:

- `hash`: 使用 `URL hash` 值来作路由。支持所有浏览器，包括不支持 `HTML5 History Api` 的浏览器。
- `history`: 依赖 HTML5 History API 和服务器配置。查看 HTML5 History 模式。
- `abstract`: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式.

## 19. vue-router 有哪几种导航守卫?

- 全局守卫
- 路由独享守卫
- 路由组件内的守卫

### 19.1. 全局守卫

vue-router 全局有三个守卫：

- router.beforeEach 全局前置守卫 进入路由之前
- router.beforeResolve 全局解析守卫(2.5.0+) 在 beforeRouteEnter 调用之后调用
- router.afterEach 全局后置钩子 进入路由之后

使用方法:

```js
// main.js 入口文件
import router from "./router"; // 引入路由
router.beforeEach((to, from, next) => {
  next();
});
router.beforeResolve((to, from, next) => {
  next();
});
router.afterEach((to, from) => {
  console.log("afterEach 全局后置钩子");
});
```

### 19.2. 路由独享守卫

如果你不想全局配置守卫的话，你可以为某些路由单独配置守卫

```js
const router = new VueRouter({
  routes: [
    {
      path: "/foo",
      component: Foo,
      beforeEnter: (to, from, next) => {
        // 参数用法什么的都一样,调用顺序在全局前置守卫后面，所以不会被全局守卫覆盖
        // ...
      }
    }
  ]
});
```

### 19.3. 路由组件内的守卫

1. beforeRouteEnter 进入路由前, 在路由独享守卫后调用 **不能** 获取组件实例 `this`，组件实例还没被创建
2. beforeRouteUpdate (2.2) 路由复用同一个组件时, 在当前路由改变，但是该组件被复用时调用 可以访问组件实例 `this`
3. beforeRouteLeave 离开当前路由时, 导航离开该组件的对应路由时调用，可以访问组件实例 `this`

## 20. Vue 的路由实现：hash 模式 和 history 模式

### 20.1. hash 模式

在浏览器中符号`“#”`，#以及#后面的字符称之为 hash，用`window.location.hash`读取；

特点：hash 虽然在 URL 中，但不被包括在 HTTP 请求中；用来指导浏览器动作，对服务端安全无用，hash 不会重加载页面。

hash 模式下，仅 hash 符号之前的内容会被包含在请求中，如 `http://www.baidu.com`，因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回 404 错误。

### 20.2. history 模式

history 采用 HTML5 的新特性；且提供了两个新方法：`pushState()`，`replaceState()` 可以对浏览器历史记录栈进行修改，以及`popState`事件的监听到状态变更。

history 模式下，前端的 URL 必须和实际向后端发起请求的 URL 一致，如 `http://www.xxx.com/items/id`。后端如果缺少对 `/items/id` 的路由处理，将返回 404 错误。Vue-Router 官网里如此描述：“不过这种模式要玩好，还需要后台配置支持……所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。”

## 21. vue-router 的原理，history 模式和 hash 模式的区别，为什么 history 模式是先进行 app 内模块的切换再去手动更新路由

vue-router 通过 hash 与 History interface 两种方式实现前端路由，更新视图但不重新请求页面”是前端路由原理的核心之一，目前在浏览器环境中这一功能的实现主要有两种方式

hash ---- 利用 URL 中的 hash（“#”）

history --- 利用 History interface 在 HTML5 中新增的方法, 主要有`history.pushState()`和`history.replaceState()`

## 22. 怎样动态加载路由？

```js
$router.addRoutes([
  {
    path: "/home",
    component: home
  }
]);
```

```js
[
  path: '/home',
  component: require.ensure([], (require) => {
      resolve(require('@/page/home.vue'))
  })
]
```

看到这里，你会发现，其实我们写个函数，传进去字符串，然后拼接一下就可以了

```js
function getViews(path) {
  return resolve => {
    require.ensure([], require => {
      resolve(require("@/page/" + path + ".vue"));
    });
  };
}
```

如果是添加到子路由，我的办法的是这样的：

例如把服务器请求过来的数据添加到 / 节点上

```js
$router.addRoutes([
  {
    path: "/",
    component: resolve => require(["@/components/Layout"], resolve),
    meta: { title: "Layout" },
    children: dataRouter
  }
]);
```

## 23. 怎么实现路由懒加载呢？

import 异步加载

```js
const component = () => import("./....");
```

## 24. vuex 的 action 和 mutation 的特性是什么？有什么区别？

- action： 通过执行 `commit()`来触发`mutation`的调用, 间接更新 state ，
  组件中通过\$store.dispatch('action 名称') 触发 action，
  可以包含异步代码(定时器, ajax)
- mutation 是一个对象 包含多个直接更新 state 的方法(回调函数) ，只能包含同步的代码, 不能写异步代码

**Action**

- 一些对 State 的异步操作可放在 Action 中，并通过在 Action 中 commit Mutation 变更状态
- Action 可通过 store.dispatch() 方法触发，或者通过 mapActions 辅助函数将 vue 组件的 methods 映射成 store.dispatch() 调用

**Mutation**

- 在 vuex 的严格模式下，Mutaion 是 vuex 中改变 State 的唯一途径
- Mutation 中只能是同步操作
- 通过 store.commit() 调用 Mutation

## 25. vuex 是什么？怎么使用？哪种功能场景使用它？

**vuex 的使用流程是**:

1. 组件 `dispatch` 一个 `action`，
2. 然后 `store` 处理这个 `action`，在对应的 `action handler` 里写业务逻辑，
3. 之后调用对应的 `mutation` 更新数据 `state`。

- vuex 就是一个仓库，仓库里放了很多对象。其中 state 就是数据源存放地，对应于一般 vue 对象里面的 data
- state 里面存放的数据是响应式的，vue 组件从 store 读取数据，若是 store 中的数据发生改变，依赖这相数据的组件也会发生更新
- 它通过 mapState 把全局的 state 和 getters 映射到当前组件的 computed 计算属性

**Vuex 有 5 种属性**: 分别是 `state`、`getter`、`mutation`、`action`、`module`;

1. **state**  
   Vuex 使用单一状态树,即每个应用将仅仅包含一个 store 实例，但单一状态树和模块化并不冲突。存放的数据状态，不可以直接修改里面的数据。
2. **mutations**  
   mutations 定义的方法动态修改 Vuex 的 store 中的状态或数据。
3. **getters**  
   类似 vue 的计算属性，主要用来过滤一些数据。
4. **action**  
   actions 可以理解为通过将 mutations 里面处里数据的方法变成可异步的处理数据的方法，简单的说就是异步操作数据。view 层通过 store.dispath 来分发 action。

vuex 一般用于中大型 web 单页应用中对应用的状态进行管理，对于一些组件间关系较为简单的小型应用，使用 vuex 的必要性不是很大，因为完全可以用组件 prop 属性或者事件来完成父子组件之间的通信， **vuex 更多地用于解决跨组件通信以及作为数据中心集中式存储数据**。

- **使用 Vuex 解决非父子组件之间通信问题**  
   vuex 是通过将 state 作为数据中心、各个组件共享 state 实现跨组件通信的，此时的数据完全独立于组件，因此将组件间共享的数据置于 State 中能有效解决多层级组件嵌套的跨组件通信问题。

- **vuex 作为数据存储中心**  
   vuex 的 State 在单页应用的开发中本身具有一个“数据库”的作用，可以将组件中用到的数据存储在 State 中，并在 Action 中封装数据读写的逻辑。这时候存在一个问题，一般什么样的数据会放在 State 中呢？ 目前主要有两种数据会使用 vuex 进行管理：

  1.  组件之间全局共享的数据
  2.  通过后端异步请求的数据

  比如做加入购物车、登录状态等都可以使用 Vuex 来管理数据状态。

## 26. 你有写过自定义指令吗？自定义指令的生命周期（钩子函数）有哪些？

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive("focus", {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el) {
    // 聚焦元素
    el.focus();
  }
});
```

钩子函数

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
- `componentUpdated`：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
- `unbind`：只调用一次，指令与元素解绑时调用。

## 27. vue 如何监听键盘事件？

- @keyup.enter
- 直接全局监听

## 28. watch 和计算属性有什么区别？

1. 一个是侦听属性，一个是计算属性
2. 一个是为了应对复杂的逻辑计算，一个是对数据的变化作出反应
3. 一个是只有当缓存改变时才执行，一个是只要从新渲染就会执行
4. 一个有缓存，一个没有缓存

## 29. 为什么 data 属性必须声明为返回一个初始数据对应的函数呢？

对象为引用类型，当重用组件时，由于数据对象都指向同一个 data 对象，当在一个组件中修改 data 时，其他重用的组件中的 data 会同时被修改；而使用返回对象的函数，由于每次返回的都是一个新对象（Object 的实例），引用地址不同，则不会出现这个问题。

一个组件被复用多次的话，也就会创建多个实例。本质上，这些实例用的都是同一个构造函数。如果 data 是对象的话，对象属于引用类型，会影响到所有的实例。所以为了保证组件不同的实例之间 data 不冲突，data 必须是一个函数。

<p style="color:red">组件中 data 什么时候可以使用对象</p>

组件复用时所有组件实例都会共享 `data`，如果 `data` 是对象的话，就会造成一个组件修改 `data` 以后会影响到其他所有组件，所以需要将 `data` 写成函数，每次用到就调用一次函数获得新的数据。

当我们使用 `new Vue()` 的方式的时候，无论我们将 `data` 设置为对象还是函数都是可以的，因为 `new Vue()` 的方式是生成一个根组件，该组件不会复用，也就不存在共享 `data` 的情况了。

## 30. 分别说说 vue 能监听到数组或对象变化的场景，还有哪些场景是监听不到的？无法监听时有什么解决方案？

vue 能够监听数组变化的场景

1. 通过**赋值的形式**改变正在被监听的数组；
2. 通过`splice(index,num,val)`的形式改变正在被监听的数组；
3. 通过数组的**push 的形式**改变正在被监听的数组；

vue 无法监听的数组变化的场景

1. 通过**数组索引**改变数组元素的值；
2. 改变数组的长度；

VUE 解决无法监听数组变化的方法

1. this.\$set(arr, index, newVal);
2. 通过 splice（index，num，val）
3. 使用临时变量作为中转，重新赋值数组；

## 31. 在 vue 项目中如何引入第三方库（比如 jQuery）？有哪些方法可以做到？

1. 绝对路径直接引入<br />
   在 index.html 中用 script 引入<br />
   `<script src="./static/jquery-1.12.4.js"></script>`<br />
   然后在 webpack 中配置 external<br />
   `externals: { 'jquery': 'jQuery' }`<br />
   在组件中使用时 import<br />
   `import $ from 'jquery'`

2. 在 webpack 中配置 alias
   ```js
   resolve: {
     extensions: ['.js', '.vue', '.json'],
     alias: {
       '@': resolve('src'),
       'jquery': resolve('static/jquery-1.12.4.js')
     }
   }
   ```
   然后在组件中 import
3. 在 webpack 中配置 plugins<br />
   `plugins: [ new webpack.ProvidePlugin({ $: 'jquery' }) ]`

   全局使用，但在使用 eslint 情况下会报错，需要在使用了 \$ 的代码前添加 /_ eslint-disable_/ 来去掉 ESLint 的检查。

## 32. 怎么给 vue 定义全局的方法？

- Vue.prototype[key] = tools[key]
- Vue.mixin(mixin) 全局混入 mixin
- Vue.use(plugin)
- // 创建全局方法 this.$root.$on('test', callback) , this.$root.$off 关闭,this.$root.$emit 触发

## 33. 你了解什么是高阶组件吗？可否举个例子说明下？

vue 高阶组件的认识，在 React 中组件是以复用代码实现的，而 Vue 中是以 mixins 实现，并且官方文档中也缺少一些高阶组件的概念,因为在 vue 中实现高阶组很困难，并不像 React 简单,其实 vue 中 mixins 也同样可以代替,在读了一部分源码之后,对 vue 有了更深的认识

所谓高阶组件其实就是一个高阶函数, 即返回一个组件函数的函数，Vue 中怎么实现呢？ 注意 高阶组件有如下特点

1. 高阶组件(HOC)应该是无副作用的纯函数，且不应该修改原组件,即原组件不能有变动
2. 高阶组件(HOC)不关心你传递的数据(props)是什么，并且新生成组件不关心数据来源
3. 高阶组件(HOC)接收到的 props 应该透传给被包装组件即直接将原组件 prop 传给包装组件
4. 高阶组件完全可以添加、删除、修改 props

高阶组件举例

Base.vue

```vue
<template>
  <div>
    <p @click="Click">props: {{ test }}</p>
  </div>
</template>
<script>
export default {
  name: "Base",
  props: {
    test: Number
  },
  methods: {
    Click() {
      this.$emit("Base-click");
    }
  }
};
</script>
```

Vue 组件主要就是三点：`props`、`event` 以及 `slots`。对于 Base 组件 组件而言，它接收一个数字类型的 props 即 test，并触发一个自定义事件，事件的名称是：Base-click，没有 slots。我们会这样使用该组件：

```vue
<Base @Base-click="xxxx" :test="100" /></Base>
```

现在我们需要 base-component 组件每次挂载完成的时候都打印一句话：haha，同时这也许是很多组件的需求，所以按照 mixins 的方式，我们可以这样做，首先定义个 mixins

```js
export default consoleMixin {
  mounted () {
    console.log('haha')
  }
}
```

然后在 Base 组件中将 consoleMixin 混入：

```vue {12}
<template>
  <div>
    <p @click="Click">props: {{ test }}</p>
  </div>
</template>
<script>
export default {
  name: "Base",
  props: {
    test: Number
  },
  mixins: [consoleMixin],
  methods: {
    Click() {
      this.$emit("Base-click");
    }
  }
};
</script>
```

这样使用 Base 组件的时候，每次挂载完成之后都会打印一句 haha，不过现在我们要使用高阶组件的方式实现同样的功能，  
回忆高阶组件的定义：接收一个组件作为参数，返回一个新的组件，那么此时我们需要思考的是，在 Vue 中组件是什么？Vue 中组件是函数，不过那是最终结果，比如我们在单文件组件中的组件定义其实就是一个普通的选项对象，如下：

```js
export default {
  name: 'Base',
  props: {...},
  mixins: [...]
  methods: {...}
}
```

```js
export default function Console(BaseComponent) {
  return {
    template: '<wrapped v-on="$listeners" v-bind="$attrs"/>',
    components: {
      wrapped: BaseComponent
    },
    mounted() {
      console.log("haha");
    }
  };
}
```

[剩余。。。](https://blog.csdn.net/z609373067/article/details/81258966)

```js {6,7,15,19}
function WithConsole(WrappedComponent) {
  return {
    mounted() {
      console.log("I have already mounted");
    },
    props: WrappedComponent.props,
    render(h) {
      // 将 this.$slots 格式化为数组，因为 h 函数第三个参数是子节点，是一个数组
      const slots = Object.keys(this.$slots)
        .reduce((arr, key) => arr.concat(this.$slots[key]), [])
        // 手动更正 context
        .map(vnode => {
          vnode.context = this._self; //绑定到高阶组件上(默认 子组件找的是父组件)
          return vnode;
        });

      return h(
        WrappedComponent,
        {
          on: this.$listeners,
          props: this.$props,
          // 透传 scopedSlots
          scopedSlots: this.$scopedSlots,
          attrs: this.$attrs
        },
        slots
      );
    }
  };
}
```

## 34. vue 要做权限管理该怎么做？如果控制到按钮级别的权限怎么做？

封装了一个指令权限，能简单快速的实现按钮级别的权限判断。 [v-permission](https://github.com/PanJiaChen/vue-element-admin/tree/master/src/directive/permission)

```js
// permission.js
import store from "@/store";

export default {
  inserted(el, binding, vnode) {
    const { value } = binding;
    const roles = store.getters && store.getters.roles;

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value;

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role);
      });

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`);
    }
  }
};

// index.js
import permission from "./permission";

const install = function(Vue) {
  Vue.directive("permission", permission);
};

if (window.Vue) {
  window["permission"] = permission;
  Vue.use(install); // eslint-disable-line
}

permission.install = install;
export default permission;
```

使用

```html
<template>
  <!-- Admin can see this -->
  <el-tag v-permission="['admin']">admin</el-tag>

  <!-- Editor can see this -->
  <el-tag v-permission="['editor']">editor</el-tag>

  <!-- Editor can see this -->
  <el-tag v-permission="['admin','editor']"
    >Both admin or editor can see this</el-tag
  >
</template>

<script>
  // 当然你也可以为了方便使用，将它注册到全局
  import permission from "@/directive/permission/index.js"; // 权限判断指令
  export default {
    directives: { permission }
  };
</script>
```

## 35. Vue 自定义组件

在用 vue 构建项目的过程中，我们有时会用到别人开发的组件如 vue-router；使用他人组件的正常步骤如下：

1. 命令行进行安装，执行 install；
2. 在 vue 项目中的入口文件 main.js 中，进行导入；
3. 然后用 Vue.use(plugin)引入该组件。

我们也可以创造属于自己的组件，具体步骤如下：

1. 在 components 文件中创建 test 文件；
2. 在 test 文件中，创建 index.js 和 Test.vue；
3. Test.vue 中的代码如下：
   ```vue
   <template>
     <div>
       <div>实现自定义组件</div>
     </div>
   </template>
   <script>
   export default {
     data() {
       return {
         msg: "hello vue"
       };
     },
     components: {}
   };
   </script>
   <style></style>
   ```
4. test 文件夹下的 index.js 中的代码如下：
   ```js {3,4}
   import MyTest from "./Test.vue";
   const Test = {
     install(Vue) {
       Vue.component("Test", MyTest);
     }
   };
   export default Test;
   ```
5. 入口文件 main.js 进行相关的配置：
   ```js
   import Test from "./components/test";
   Vue.use(Test);
   ```
6. 如此这般，就可以在其它组件中正常使用，如下：
   ```vue
   <template>
     <div class="hello">
       <Test></Test>
     </div>
   </template>
   ```

自定义组件 Test 的内容("实现自定义组件")将会展示出来。

**注**：

- test 文件指的是自定义组件文件夹；
- index.js 指的是组件的入口加载文件；
- Test.vue 指的是组件模板。

## 36. 你有自己用 vue 写过 UI 组件库吗？

```js {9}
import Buttonn from "./button/index.vue";
import Icon from "./icon";

// 所有组件列表
const components = [Buttonn, Icon];
const install = function(Vue) {
  // 遍历并注册所有组件
  components.map(component => {
    Vue.component(component.name, component);
  });
};
// 检测是否为vue环境
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

// export 一个包含install函数的对象
export default {
  install
};
```

在 vue 的 main.js 里面引入并使用

```js {6}
import Vue from "vue";
import App from "./App";
import router from "./router";
import install from "../packages";

Vue.use(install);

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
```

UI 组件中的 button 组件

```vue
<template>
  <button :type="nativeType" :class="[{ nativeType }]">
    <span>主要按钮</span>
  </button>
</template>
<script>
export default {
  name: "Buttonn",
  props: {
    type: {
      type: String,
      default: "default"
    }
  }
};
</script>
<style>
.primary {
  padding: 12px 20px;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #dcdfe6;
}
</style>
```

## 37. 怎么监听 vuex 数据的变化？

通过 computed + watch

```js
  //利用计算属性
  computed: {
    listData() {
      return this.$store.state.listData;
    }
  },
  //监听执行
  watch: {
    listData(val) {
      // 写上你需要的东西
    }
  }
```

## 38. ElementUI 怎么修改组件的默认样式？

- 第一直接按照 element 默认修改主题的方式, 直接修改配置
- 第二直接覆盖样式
- .el-table >>> .el-table\_\_header 用>>>穿透
- 还有一种方法：`.el-table /deep/{}` 把要改的写在里面。

## 39. 你有二次封装过 ElementUI 组件吗？

```vue
<template>
  <el-input
    placeholder="价格"
    v-model="current"
    :disabled="disabled"
    :maxlength="8"
    @change="change"
  ></el-input>
</template>
<script>
export default {
  props: {
    value: Number,
    disabled: Boolean
  },
  data() {
    return {
      current: ""
    };
  },
  watch: {
    value(val) {
      if (val > 0) {
        this.current = (val / 100).toFixed(2);
      } else {
        this.current = "";
      }
    }
  },
  created() {
    if (this.value > 0) {
      this.current = (this.value / 100).toFixed(2);
    } else {
      this.current = "";
    }
  },
  methods: {
    change() {
      let value = this.current * 100 || 0;
      this.current = (value / 100).toFixed(2);
      this.$emit("input", value.toFixed(0) * 1);
    }
  }
};
</script>
```

## 40. vue 的 diff 算法

### pre

- diff 算法比较新旧节点的时候，比较只会在同层级进行, 不会跨层级比较。
- 当数据发生改变时，set 方法会让调用 Dep.notify 通知所有订阅者 Watcher，订阅者就会调用 patch 给真实的 DOM 打补丁，更新相应的视图。

Vue2 的 Virtual DOM 借鉴了开源库 [snabbdom](https://github.com/snabbdom/snabbdom) 的实现。

Virtual DOM 本质就是用一个原生的 JS 对象去描述一个 DOM 节点。是对真实 DOM 的一层抽象。(也就是源码中的 VNode 类，它定义在 src/core/vdom/vnode.js 中。)

VirtualDOM 映射到真实 DOM 要经历 VNode 的 create、diff、patch 等阶段。

patchVnode

当我们确定两个节点值得比较之后我们会对两个节点指定 patchVnode 方法。那么这个方法做了什么呢？

```js
patchVnode (oldVnode, vnode) {
    const el = vnode.el = oldVnode.el
    let i, oldCh = oldVnode.children, ch = vnode.children
    if (oldVnode === vnode) return
    if (oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text) {
        api.setTextContent(el, vnode.text)
    }else {
        updateEle(el, vnode, oldVnode)
        if (oldCh && ch && oldCh !== ch) {
            updateChildren(el, oldCh, ch)
        }else if (ch){
            createEle(vnode) //create el's children dom
        }else if (oldCh){
            api.removeChildren(el)
        }
    }
}
```

这个函数做了以下事情：

- 找到对应的真实 dom，称为 el
- 判断 Vnode 和 oldVnode 是否指向同一个对象，如果是，那么直接 return
- 如果他们都有文本节点并且不相等，那么将 el 的文本节点设置为 Vnode 的文本节点。
- 如果 oldVnode 有子节点而 Vnode 没有，则删除 el 的子节点
- 如果 oldVnode 没有子节点而 Vnode 有，则将 Vnode 的子节点真实化之后添加到 el
- 如果两者都有子节点，则执行 updateChildren 函数比较子节点，这一步很重要

### Vue2.x 和 Vue3.x 渲染器的 diff 算法分别说一下

简单来说，diff 算法有以下过程

- 同级比较，再比较子节点
- 先判断一方有子节点一方没有子节点的情况(如果新的 children 没有子节点，将旧的子节点移除)
- 比较都有子节点的情况(核心 diff)
- 递归比较子节点

正常 Diff 两个树的时间复杂度是`O(n^3)`，但实际情况下我们很少会进行`跨层级的移动DOM`，所以 Vue 将 Diff 进行了优化，从`O(n^3) -> O(n)`，只有当新旧 children 都为多个子节点时才需要用核心的 Diff 算法进行同层级比较。

Vue2 的核心 Diff 算法采用了`双端比较`的算法，同时从新旧 children 的两端开始进行比较，借助 key 值找到可复用的节点，再进行相关操作。相比 React 的 Diff 算法，同样情况下可以减少移动节点次数，减少不必要的性能损耗，更加的优雅。

Vue3.x 借鉴了 ivi 算法和 inferno 算法

在创建 VNode 时就确定其类型，以及在`mount/patch`的过程中采用`位运算`来判断一个 VNode 的类型，在这个基础之上再配合核心的 Diff 算法，使得性能上较 Vue2.x 有了提升。(实际的实现可以结合 Vue3.x 源码看。)

该算法中还运用了`动态规划`的思想求解最长递归子序列。

## 41. 你有使用做过 vue 与原生 app 交互吗？说说 vue 与 app 交互的方法

- jsBridge,建立连接，然后相互调用
- 用 WebViewJavascriptBridge

```js
export const connectWebViewJavascriptBridge = callback => {
  if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge);
  } else {
    document.addEventListener(
      "WebViewJavascriptBridgeReady",
      function() {
        callback(WebViewJavascriptBridge);
      },
      false
    );
  }
};
```

## 42. 说下$attrs和$listeners 的使用场景

一般我对一些 UI 库进行二次封装用，比如 element-ui，里面的组件不能满足自己的使用场景的时候，会二次封装，但是又想保留他自己的属性和方法，那么这个时候时候$attrs和$listners 是个完美的解决方案。

简单的例子，对 el-button 二次封装

```vue
<template>
  <el-button
    v-on="$listeners"
    v-bind="$attrs"
    :loading="loading"
    @click="myClick"
  ></el-button>
</template>
<script>
export default {
  name: 'mButton',
  inheritAttrs: false,
  props: {
    debounce: {
      type: [Boolean, Number]
    }
  },
  data() {
    return {
      timer: 0,
      loading: false
    }
  },
  methods: {
    myClick() {
      if (!this.debounce) {
        return this.loading = true clearTimeout(this.timer) this.timer = setTimeout(() => {
          this.loading = false
         }, typeof this.debounce === 'boolean' ? 500 : this.debounce)
      }
    }
  }
</script>
```

二次封装代码（limit-button）

```vue
<template>
  <el-button v-show="validButton" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </el-button>
</template>

<script>
import { mapGetters } from "vuex";
import env from "@/config/env";

export default {
  props: {
    // 按钮唯一标识
    buttonId: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters(["getUserBtns"]),
    validButton: function() {
      return env.debug ? true : this.getUserBtns[this.buttonId];
    }
  }
};
</script>
```

## 43. vue 如果想扩展某个现有的组件时，怎么做呢？

不对原组件进行更改的：

1. 使用 Vue.extend 直接扩展
2. 使用 Vue.mixin 全局混入
3. HOC 封装
4. 加 slot 扩展

### 请说下封装 vue 组件的过程？

1. 首先，组件可以提升整个项目的开发效率。能够把页面抽象成多个相对独立的模块，解决了我们传统项目开发：效率低、难维护、复用性等问题。
2. 然后，使用 `Vue.extend` 方法创建一个组件，然后使用 `Vue.component` 方法注册组件。子组件需要数据，可以在 props 中接受定义。而子组件修改好数据后，想把数据传递给父组件。可以采用 emit 方法。

## 44. vue 的属性名称与 method 的方法名称一样时会发生什么问题？

报错 "Method 'xxx' has already been defined as a data property"

键名优先级：props > data > methods

## 45. vue 给组件绑定自定义事件无效怎么解决？

两种方式

1. 组件外部加修饰符`.navtive`
2. 组件内部声明`$emit('自定义事件')`

## 46. vue 怎么实现强制刷新组件？

- 强制重新渲染 `this.$forceUpdate()`
- 强制重新刷新某组件
  ```js
  //模版上绑定key
  <SomeComponent :key="theKey"/>
  //选项里绑定data
  data(){
    return{
        theKey:0
    }
  }
  //刷新key达到刷新组件的目的
  theKey++;
  ```

## 47. 如何在子组件中访问父组件的实例？

vue 中如果父组件想调用子组件的方法，可以在子组件中加上 ref，然后通过 this.\$refs.ref.method 调用

Vue 中子组件调用父组件的方法，这里有三种方法提供参考：

1. 直接在子组件中通过 this.\$parent.event 来调用父组件的方法
2. 在子组件里用\$emit 向父组件触发一个事件，父组件监听这个事件
3. 父组件把方法传入子组件中，在子组件里直接调用这个方法

## 48. Vue.observable

类轻量级 vuex，用作状态管理。

让一个对象可响应。Vue 内部会用它来处理 data 函数返回的对象。  
返回的对象可以直接用于渲染函数和计算属性内，并且会在发生改变时触发相应的更新。也可以作为最小化的跨组件状态存储器，用于简单的场景

```js
//store.js
import Vue from "vue";

export let store = Vue.observable({
  count: 0,
  name: "张三"
});
export let mutations = {
  setCount(count) {
    store.count = count;
  },
  setName(name) {
    store.name = name;
  }
};
```

## 49. vue 父子组件生命周期执行顺序

一，加载渲染过程

父 beforeCreate=>父 created=>父 beforeMount=>子 beforeCreate=>子 created=>子 beforeMount=>子 mounted=>父 mounted

二，子组件更新过程

父 beforeUpdate=>子 beforeUpdate=>子 updated=>父 updated

三，父组件更新过程

父 beforeUpdate=>父 updated

四，销毁过程

父 beforeDestroy=>子 beforeDestroy=>子 destoryed=>父 destoryed

## 50. Vue 中组件生命周期调用顺序说一下

组件的调用顺序都是`先父后子`,渲染完成的顺序是`先子后父`。

组件的销毁操作是`先父后子`，销毁完成的顺序是`先子后父`。

- 加载渲染过程  
   父 beforeCreate->父 created->父 beforeMount->子 beforeCreate->子 created->子 beforeMount- >子 mounted->父 mounted
- 子组件更新过程  
   父 beforeUpdate->子 beforeUpdate->子 updated->父 updated
- 父组件更新过程  
   父 beforeUpdate -> 父 updated
- 销毁过程  
   父 beforeDestroy->子 beforeDestroy->子 destroyed->父 destroyed

## 51. vue 中监听数组内部元素

在 VUE 中，对数组的监听是浅监听，也就是它只能监听到数组的长度或者有无的变化，当我们修改数组中的某一个值时，也就是数组的长度状态并没有改变时，在正常情况下它是无法监听到的，在 watch 中我们知道可以使用 deep 属性进行深监听，那么在其他情况下呢？

我们有两种办法解决此问题

1. 通过原生的 js 对数组先进行切割，然后在添加新的内容（也就是我们要修改的内容）
   ```js
   array.splice(i, 1, newdata); //从i位置开始  删除1个元素并用newdata来替代它
   ```
2. 使用 vue 提供的函数\$set
   ```js
   $set(array, i, newdata); //把array数组的第i的值替换为newdata
   ```

## 52. Vue 中数组 push 实现 -- 数组方法拦截器

核心：通过建立原型拦截器，首先数组能够修改自身的方法有 push,pop,shift,unshift,splice,sort,resverse,通过重新定义上述方法中的内容，来实现调用上述方法时触发依赖，从而通知监听该数组的订阅者执行相应的更新函数。

一下为最小化的实现代码：

```js
const arrayPrtot = Array.prototype;
const arrayMethods = Object.create(arrayPrtot);
const orig = arrayPrtot.push; //缓存原始方法

Object.defineProperty(arrayMethods, "push", {
  value: function mutator(...args) {
    console.log("我使用了push改变了数组哦");
    return orig.apply(this, args);
  },
  enumerable: false,
  writable: true,
  configurable: true
});

var arr = [];
arr.__proto__ = arrayMethods; //给需要监听的数组加上拦截器
arr.push(1);
console.log(arr);
```

## 53. Vue Transition 源码底层原理

基本原理还是 CSS3 的 `transition`、`transform`、`animation` 这几个属性。用户定义过渡效果，Vue.js 进行处理。下面我们通过 `<transition>` 过渡的进入的过程看一下：

- 插入元素
- 解析 `<transition>` 标签，获取对应的过渡类名。这里默认就 `v-` 开头了。
- 为元素定义 v-enter 和 v-enter-active 两个类。`class="v-enter v-enter-active"`。
- 下一帧移除 v-enter，添加 v-enter-to。`class="v-enter-active v-enter-to"`。
- 获取过渡时间，延时执行回调函数。
- 回调函数中移除 v-enter、v-enter-active 和 v-enter-to 的这些过渡类名，完成过渡。
- 在整个过程中调用了 `beforeEnterHook` 、`enterHook`、`afterEnterHook`、`enterCancelledHook` 四个函数，执行相应的 JavaScript 钩子。

## 54. Vuex 的单向数据流模型；对比直接在 window 下用变量储存数据，使用状态管理库的优点在哪里

vuex 就是使用一个 store 对象来包含所有的应用层级状态，也就是数据的来源

统一管理和维护各个 vue 组件的可变化状态

单一状态树  
Vuex 使用的是单一状态树，用一个对象就包含了全部的应用层级状态。这也意味着每个应用将仅仅包含一个 store 的实列。  
Vuex 的状态存储是响应性的，因此从 store 实列中读取一个状态的最简单的方法是在计算属性返回某个状态。

Vuex 和一般的全局对象有以下几点不同：

1. Vuex 的状态存储是响应性的。  
   当 vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相对应的组件也就会得到相应的更新。
2. 我们不能直接修改 store 中的状态。  
   改变 store 中的状态的唯一途径是显示地提交(commit)mutations.

## 55. 介绍一下项目中单元测试的情况，用例有多少，如何运行

```js
import HelloWorld from "@/components/HelloWorld";
import Vue from "vue";
import { expect } from "chai";

describe("Hello World .vue", () => {
  it("传递属性后能否正常显示结果", () => {
    //测试组件的ui效果 是否和预期的一致
    // 原生自己测试vue
    // extend 方法可以根据实例创建一个类
    let Constructor = Vue.extend(HelloWorld);
    // 把组件进行挂载
    // vm.$el mocha 测试的时候集成了 jsdom
    let vm = new Constructor({
      propsData: {
        msg: "hello"
      }
    }).$mount();

    expect(vm.$el.querySelector("h1").innerHTML).to.be.contain("hello");
  });
});
```

```js
// 引用vue的测试工具
import { mount } from "@vue/test-utils";

describe("Hello World .vue", () => {
  let wrapper = mount(HelloWorld);
  wrapper.setProps({ msg: "hello" });
  expect(wrapper.find("h1")).to.be.contain("hello");
});
```

## 56. Vue3.x 响应式数据原理

Vue3.x 改用`Proxy`替代`Object.defineProperty`。因为 Proxy 可以直接监听对象和数组的变化，并且有多达 13 种拦截方法。并且作为新标准将受到浏览器厂商重点持续的性能优化。

## 57. Proxy 只会代理对象的第一层，那么 Vue3 又是怎样处理这个问题的呢？

判断当前`Reflect.get`的返回值是否为 Object，如果是则再通过`reactive`方法做代理， 这样就实现了深度观测。

监测数组的时候可能触发多次`get/set`，那么如何防止触发多次呢？

我们可以判断 key 是否为当前被代理对象`target`自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行`trigger`。

## 58. vue2.x 中如何监测数组变化

使用了函数劫持的方式，重写了数组的方法，Vue 将 data 中的数组进行了原型链重写，指向了自己定义的数组原型方法。这样当调用数组 api 时，可以通知依赖更新。如果数组中包含着引用类型，会对数组中的引用类型再次递归遍历进行监控。这样就实现了监测数组变化。

## 59. Vue 事件绑定原理说一下

原生事件绑定是通过 `addEventListener` 绑定给真实元素的，组件事件绑定是通过 Vue 自定义的`$on` 实现的。

## 60. Vue 模版编译原理知道吗，能简单说一下吗？

简单说，Vue 的编译过程就是将`template`转化为`render`函数的过程。会经历以下阶段：

- 生成 AST 树
- 优化
- codegen

首先解析模版，生成`AST语法树`(一种用 JavaScript 对象的形式来描述整个模板)。使用大量的正则表达式对模板进行解析，遇到标签、文本的时候都会执行对应的钩子进行相关处理。

Vue 的数据是响应式的，但其实模板中并不是所有的数据都是响应式的。有一些数据首次渲染后就不会再变化，对应的 DOM 也不会变化。那么优化过程就是深度遍历 AST 树，按照相关条件对树节点进行标记。这些被标记的节点(静态节点)我们就可以`跳过对它们的比对`，对运行时的模板起到很大的优化作用。

编译的最后一步是`将优化后的AST树转换为可执行的代码`。

## 61. 做过哪些 Vue 的性能优化？

1. 编码阶段
   - 尽量减少 data 中的数据，data 中的数据都会增加 getter 和 setter，会收集对应的 watcher
   - v-if 和 v-for 不能连用
   - 如果需要使用 v-for 给每项元素绑定事件时使用事件代理
   - SPA 页面采用 keep-alive 缓存组件
   - 在更多的情况下，使用 v-if 替代 v-show
   - key 保证唯一
   - 使用路由懒加载、异步组件
   - 防抖、节流
   - 第三方模块按需导入
   - 长列表滚动到可视区域动态加载
   - 图片懒加载
2. SEO 优化
   - 预渲染
   - 服务端渲染 SSR
3. 打包优化
   - 压缩代码
   - Tree Shaking/Scope Hoisting
   - 使用 cdn 加载第三方模块
   - 多线程打包 happypack
   - splitChunks 抽离公共文件
   - sourceMap 优化
4. 用户体验
   - 骨架屏
   - PWA

## 62. 开发时，改变数组或者对象的数据，但是页面没有更新如何解决？

1. 使用全局得 set 方法
   ```js
   this.$set(this.todos, 0, { name: "zhangsan", age: 15 });
   // 或者对象
   this.$set(this.obj, "key", value);
   ```
2. 强制更新
   ```js
   this.$forceUpdate();
   ```

## 63. vue 弹窗后如何禁止滚动条滚动？

从 `event.target` 入手  
 一种思路就是从事件入手，如果事件对象不是弹窗的话，就让它什么都不做。

```js
methods : {
  //禁止滚动
  stop(){
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='hidden';
        document.addEventListener("touchmove",mo,false);//禁止页面滑动
    },
    /***取消滑动限制***/
    move(){
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='';//出现滚动条
        document.removeEventListener("touchmove",mo,false);
    }
}
```

## 64. 如何在 vue 项目里正确地引用 jquery 和 jquery-ui 的插件

使用 vue-cli 构建的 vue 项目，webpack 的配置文件是分散在很多地方的，而我们需要修改的是 build/webpack.base.conf.js，修改两处的代码

```js
// 在开头引入webpack，后面的plugins那里需要
var webpack = require("webpack");
// resolve

module.exports = {
  // 其他代码...
  resolve: {
    extensions: ["", ".js", ".vue"],
    fallback: [path.join(__dirname, "../node_modules")],
    alias: {
      src: path.resolve(__dirname, "../src"),
      assets: path.resolve(__dirname, "../src/assets"),
      components: path.resolve(__dirname, "../src/components"),

      // webpack 使用 jQuery，如果是自行下载的
      // 'jquery': path.resolve(__dirname, '../src/assets/libs/jquery/jquery.min'),
      // 如果使用NPM安装的jQuery
      jquery: "jquery"
    }
  },

  // 增加一个plugins
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]

  // 其他代码...
};
```

这样就可以正确的使用 jQuery 了，比如我要引入 Bootstrap，我们在 vue 的入口 js 文件 src/main.js 开头加入

```js
// 使用Bootstrap
import "./assets/libs/bootstrap/css/bootstrap.min.css";
import "./assets/libs/bootstrap/js/bootstrap.min";
```

这样 Bootstrap 就正确的被引用并构建。  
 在比如使用 toastr 组件，只需要在需要的地方 import 进来，或者全局引入 css 在需要的地方引用 js，然后直接使用

```js
// 使用toastr
import "assets/libs/toastr/toastr.min.css";
import toastr from "assets/libs/toastr/toastr.min";

toastr.success("Hello");
```

## 65. vue 事件中传入\$event，使用 e.target 和 e.currentTarget 有什么区别？

在 vue 中绑定事件

```vue
<div class="outer" @click="handleClickEvent($event)">
  <div class="inner"></div>
</div>
```

```js
handleClickEvent(e) {
  console.log("arguments :", arguments[0]); //MouseEvent
  console.log("event :", e); //MouseEvent
  console.log("e.target :", e.target); // <div class="inner"></div>
  console.log("e.currentTarget :", e.currentTarget); //<div class="outer"><div class="inner"></div></div>
}
```

这样点击内部的 inner 也能触发事件,但是 e.target 和 e.currentTarget 指向不同的对象,currentTarge 是事件绑定的元素而 target 是鼠标触发的元素

- currentTarget：事件绑定的元素
- target:鼠标触发的元素
- currentTarget 始终是监听事件者，而 target 是事件的真正发出者

## 66. vue 渲染大量数据时应该怎么优化？

1. 按需加载局部数据, 虚拟列表，无限下拉刷新
2. js 运行异步处理:  
   分割任务，实现时间切片处理, 类似 react fiber, 每次执行记录时间, 超过一定执行时间则 settimeout 或 requestAnimation 推迟到下一个时间片,一般一个时间片为 16ms
3. 大量纯展示的数据,不需要追踪变化的 用 object.freeze 冻结

## 67. vue 如何优化首页的加载速度？vue 首页白屏是什么问题引起的？如何解决呢？

首页白屏的原因：

- 单页面应用的 html 是靠 js 生成，因为首屏需要加载很大的 js 文件(app.js vendor.js)，所以当网速差的时候会产生一定程度的白屏

解决办法：

1. 优化 webpack 减少模块打包体积，code-split 按需加载
2. 服务端渲染，在服务端事先拼装好首页所需的 html
3. 首页加 loading 或 骨架屏 （仅仅是优化体验）
4. 处理加载的时间片，合理安排加载顺序，尽量不要有大面积空隙
5. CDN 资源还是很重要的，最好分开，也能减少一些不必要的资源损耗
6. 使用 Quicklink，在网速好的时候 可以帮助你预加载页面资源
7. 骨架屏这种的用户体验的东西一定要上，最好借助 stream 先将这部分输出给浏览器解析
8. 合理使用 web worker 优化一些计算
9. 缓存一定要使用，但是请注意合理使用
10. 大概就这么多，最后可以借助一些工具进行性能评测，重点调优，例如使用 performance 自己实现下等

## 68. 解决 vuex 在页面刷新后数据丢失的问题

### 一、原因

js 代码是运行在内存中的，代码运行时的所有变量、函数也都是保存在内存中的。

刷新页面，以前申请的内存被释放，重新加载脚本代码，变量重新赋值，所以这些数据要想存储就必须存储在外部，例如：Local Storage、Session Storage、Index DB 等。这些都是浏览器提供的 API，让你可以将数据存储在硬盘上，做持久化存储。具体选择哪一个就根据你实际需求来选择。

### 二、解决方案

在客户端存储数据：

HTML5 提供了 2 种在客户端存储数据的新方法：`localStorage` 没有时间期限，除非将它移除，`sessionStorage` 即会话，当浏览器关闭时会话结束，有时间期限。

之前，这些都是由 cookie 完成的，但是 cookie 不适合大量数据的存储，因为它们由每个对服务器的请求来传递，这使得 cookie 速度很慢，而且效率不高。

web 存储分为 `localStorage` 个 `sessionStorage`。

**区别在于存储的有效期和作用域不同**。

- 通过 localStorage 存储的数据是永久性的，除非 web 应用刻意删除存储的数据，或者用户通过设置浏览器配置（浏览器提供的特定的 UI）来删除，否则数据将一直保存在用户的电脑上，永不过期。
- localStorage 的作用域是限定在文档源级别的。同源的文档间共享同样的 localStorage 数据（不论该源的脚本是否真正的访问 localStorage）。他们可以互相读取对方的数据，甚至可以覆盖对方的数据。但是，非同源的文档间互相都不能读取或者覆盖对方的数据。（即使他们运行的脚本是来自同一台第三方的服务器也不行）。
- sessionStorage 存储数据的有效期和存储数据的脚本所在的最顶层的窗口或者是浏览器标签页是一样的，一旦窗口或者标签页被永久关闭了，那么所有通过 sessionStorage 存储的数据也都被删除了。

我这里使用 sessionStorage，这里需要注意的是 vuex 中的变量是响应式的，而 sessionStorage 不是，当你改变 vuex 中的状态，组件会检测到改变，而 sessionStorage 就不会了，页面要重新刷新才可以看到改变，所以应让 vuex 中的状态从 sessionStorage 中得到，这样组件就可以响应式的变化

### 三、具体实现

应用背景是用户登入后保存状态，退出后移除状态

```js
//mutations
ADD_LOGIN_USER (state,data) {  //登入，保存状态
    sessionStorage.setItem("username", data);  //添加到sessionStorage
    sessionStorage.setItem("isLogin",true);
    state.username=data,             //同步的改变store中的状态
    state.isLogin=true
},
SIGN_OUT (state) {   //退出，删除状态
    sessionStorage.removeItem("username");  //移除sessionStorage
    sessionStorage.removeItem("isLogin");
    state.username=''                //同步的改变story中的状态
    state.isLogin=false
}
```

```js
//getters
isLogin (state) {
    if (!state.isLogin) {
        state.isLogin=sessionStorage.getItem('isLogin');   //从sessionStorage中读取状态
        state.username=sessionStorage.getItem('username');
    }
    return state.isLogin
}
```

总体的实现思路是让 vuex 中 store 的状态从 sessionStorage 取值，并和 sessionStorage 保持一致

```js
getters:{
    userInfo(state){
        if(!state.userInfo){
            state.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        }
        return state.userInfo
    }
},
mutations:{
    LOGIN:(state,data) => {
        state.userInfo = data;
        sessionStorage.setItem('userInfo',JSON.stringify(data));
    },
    LOGOUT:(state) => {
        state.userInfo = null;
        sessionStorage.removeItem('userInfo');
    }
},
```

### other

```js
const store = new Vuex.Store({
  // 定义状态
  state: {
    lang: localStorage.getItem("changeLang") || 'zh', //先去localStorage中获取数据
    myInfo: JSON.parse(localStorage.getItem("myInfo")) || {}, //这里使用JSON.parse是因为我localStorage中保存的是一个对象字符串
  },
  //修改状态
  mutations:{
    setInfo(state,info){
      localStorage.setItem('myInfo', JSON.stringify(info)); //将传递的数据先保存到localStorage中
      state.myInfo = info;// 之后才是修改state中的状态
    },
    changeLangEvent(state, type) {
      localStorage.setItem('changeLang', type);
      state.lang = type;
    },
  },
})
export default store;


// 组件中使用方法
let res = {
  name:'张三'，
  age:18
}
this.$store.commit('setInfo',res); //更新myInfo
```

### add

登录成功后将用户和菜单数据同步至 vuex

```js
this.$axios.post("/login", formdata).then(res => {
  if (res.data.code === 0) {
    // console.log(res.data)
    let user = res.data.data.userData;
    let menu = res.data.data.menuData;
    sessionStorage.setItem("un", encrypt("kim", user.name));
    //sessionStorage.set('uid', user.userId)
    this.$store.dispatch("set_user", user);
    this.$store.dispatch("set_menu", JSON.stringfy(menu));
    // 消息提示
    this.$message({
      showClose: false,
      message: res.data.msg,
      type: "success",
      duration: 3000
    });
    let router = this.$router;
    setTimeout(() => {
      router.push("/");
    }, 100);
  }
});
```

在菜单页面监听 vuex 中菜单数据

```js
mounted(){
  // 判断state是否存在菜单信息，有则在state中获取，没有则在sessionStorage中获取
  if(typeof this.$store.state.menu === 'string'){
    // console.log('state have menu')
    let menus = this.$store.state.menu
    this.items = this.getMenuData(JSON.parse(menus))
  } else {
    // state not have menu
    const sessionMenus = decrypt('kim', sessionStorage.getItem("menus"))
    if(sessionMunus && sessionMenus !== '[]'){
      let menus = JSON.parse(sessionMenus);
      this.items = this.getMenusData(JSON.parse(menus))
    }
  }
},
```

页面刷新的解决方案：

页面刷新的时候异步请求后台数据，然后动态更新 vuex 中的数据，其中会有一种情况就是，网络延迟、数据量大的问题。此时还没等 vuex 获取到后台返回的数据，页面就已经加载完成了，这样就会造成数据丢失。所以该解决方案就是，监听浏览器刷新前事件，在浏览器刷新之前就把 vuex 里的数据保存至 sessionStorage 中，刷新成功后如果异步请求的数据还没返回则直接获取 sessionStorage 里的数据，否则获取 vuex 里的数据。（只有刷新后还没取到后台数据，才会从 sessionStorage 里取。确保数据的安全性，就算获取 sessionStorage 里的数据也是安全的，因为每次刷新都会重新赋值，不必担心数据被篡改问题，其次就是对 sessionStorage 里的数据做了加密操作）

## 69. extend 能做什么

这个 API 很少用到，作用是扩展组件生成一个构造器，通常会与 `$mount` 一起使用。

```js
// 创建组件构造器
let Component = Vue.extend({
  template: "<div>test</div>"
});
// 挂载到 #app 上
new Component().$mount("#app");
// 除了上面的方式，还可以用来扩展已有的组件
let SuperComponent = Vue.extend(Component);
new SuperComponent({
  created() {
    console.log(1);
  }
});
new SuperComponent().$mount("#app");
```

## 70. mixin 和 mixins 区别

`mixin` 用于全局混入，会影响到每个组件实例，通常插件都是这样做初始化的。

```js
Vue.mixin({
  beforeCreate() {
    // ...逻辑
    // 这种方式会影响到每个组件的 beforeCreate 钩子函数
  }
});
```

虽然文档不建议我们在应用中直接使用 `mixin`，但是如果不滥用的话也是很有帮助的，比如可以全局混入封装好的 `ajax` 或者一些工具函数等等。

`mixins` 应该是我们最常使用的扩展组件的方式了。如果多个组件中有相同的业务逻辑，就可以将这些逻辑剥离出来，通过 `mixins` 混入代码，比如上拉下拉加载数据这种逻辑等等。

另外需要注意的是 `mixins` 混入的钩子函数会先于组件内的钩子函数执行，并且在遇到同名选项的时候也会有选择性的进行合并，具体可以阅读 文档。

## 71. vue.cli 中怎样使用自定义的组件？有遇到过哪些问题吗？

- 第一步：在 components 目录新建你的组件文件（smithButton.vue），script 一定要`export default {`
- 第二步：在需要用的页面（组件）中导入：`import smithButton from ‘../components/smithButton.vue’`
- 第三步：注入到 vue 的子组件的 components 属性上面,`components:{smithButton}`
- 第四步：在 template 视图 view 中使用，`<smith-button> </smith-button>`

问题有：smithButton 命名，使用的时候则 smith-button。

## 72. 聊聊你对 Vue.js 的 template 编译的理解？

简而言之，就是先转化成 AST 树，再得到的 render 函数返回 VNode（Vue 的虚拟 DOM 节点）

详情步骤：

- 首先，通过 compile 编译器把 template 编译成 AST 语法树（abstract syntax tree 即 源代码的抽象语法结构的树状表现形式），compile 是 createCompiler 的返回值，createCompiler 是用以创建编译器的。另外 compile 还负责合并 option。
- 然后，AST 会经过 generate（将 AST 语法树转化成 render funtion 字符串的过程）得到 render 函数，render 的返回值是 VNode，VNode 是 Vue 的虚拟 DOM 节点，里面有（标签名、子节点、文本等等）

## 73. 你觉得哪些项目适合 vue 框架？

1. 数据信息量比较多的，反之类似企业网站就无需此框架了。
2. 手机 web 和 app 应用多端共用一套界面的项目，因为使用 vue.cli+webpack 后的前端目录，非常有利于项目的跨平台部署。

## 74. redux 和 vuex 的区别

Redux

- 核心对象：store
- 数据存储：state
- 状态更新提交接口：==dispatch==
- 状态更新提交参数：带 type 和 payload 的==Action==
- 状态更新计算：==reducer==
- 限制：reducer 必须是纯函数，不支持异步
- 特性：支持中间件

VUEX

- 核心对象：store
- 数据存储：state
- 状态更新提交接口：==commit==
- 状态更新提交参数：带 type 和 payload 的 mutation==提交对象/参数==
- 状态更新计算：==mutation handler==
- 限制：mutation handler 必须是非异步方法
- 特性：支持带缓存的 getter，用于获取 state 经过某些计算后的值

**_Redux vs VUEX 对比分析_**

- Redux 是一个状态管理系统 vuex 有自动渲染的功能,所以不需要更新， 只能和 vue 配合
- store 和 state 是最基本的概念，VUEX 没有做出改变。其实 VUEX 对整个框架思想并没有任何改变，只是某些内容变化了名称或者叫法，通过改名，以图在一些细节概念上有所区分。
- **VUEX 弱化了 dispatch 的存在感**。VUEX 认为状态变更的触发是一次“提交”而已，而调用方式则是框架提供一个提交的 commit API 接口。
- **VUEX 取消了 Redux 中 Action 的概念**。不同于 Redux 认为状态变更必须是由一次"行为"触发，VUEX 仅仅认为在任何时候触发状态变化只需要进行 mutation 即可。Redux 的 Action 必须是一个对象，而 VUEX 认为只要传递必要的参数即可，形式不做要求。
- **VUEX 也弱化了 Redux 中的 reducer 的概念**。reducer 在计算机领域语义应该是"规约"，在这里意思应该是根据旧的 state 和 Action 的传入参数，"规约"出新的 state。在 VUEX 中，对应的是 mutation，即"转变"，只是根据入参对旧 state 进行"转变"而已。
- VUEX 支持 getter，运行中是带缓存的，算是对提升性能方面做了些优化工作，言外之意也是鼓励大家多使用 getter

React-Redux

- 状态注入组件：`<Provider/>`组件结合 `connect` 方法
- 容器组件：通过 `connect` 关联了 `state` 的组件，并被传入 `dispatch` 接口
- 展示组件：不与 `state` 或 `dispatch` 直接产生关系
- 特性：`connect` 支持 `mapStatesToProps` 方法，用于自定义映射

VUEX

- 状态注入组件：==`Vue.use(Vuex)`将 Vuex 应用为全局的 plugin，再将 store 对象传入根 VUE 实例==
- ==容器组件：没有这个概念==
- 展示组件：在组件中可以获取`this.$store.state.*`，也进行`this.$store.commit()`等等
- 特性：VUEX 提供 `mapState`，`mapGetter`，`mapMutation` 等方法，用于生成 store 内部属性对组件内部属性的映射

**React-Redux vs VUEX 对比分析**

通过使用方式上的较大差异，也可以看出理念上的不同。

- **和组件结合方式的差异**。VUE 通过 VUEX 全局插件的使用，结合将 store 传入根实例的过程，就可以使得 store 对象在运行时存在于任何 vue 组件中。而 React-Redux 则除了需要在较外层组件结构中使用`<Provider/>`以拿到 store 之外，还需要显式指定容器组件，即用 connect 包装一下该组件。这样看来我认为 VUE 是更推荐在使用了 VUEX 的框架中的每个组件内部都使用 store，而 React-Redux 则提供了自由选择性。而 VUEX 即不需要使用外层组件，也不需要类似 connect 方式将组件做一次包装，我认为出发点应该是可能是为了避免啰嗦。
- **容器组件的差异**。React-Redux 提倡容器组件和表现组件分离的最佳实践，而 VUEX 框架下不做区分，全都是表现（展示）组件。我觉得不分优劣，React-Redux 的做法更清晰、更具有强制性和规范性，而 VUEX 的方式更加简化和易于理解。

总的来说，就是谁包谁，谁插谁的问题。Redux 毕竟是独立于 React 的状态管理，它与 React 的结合则需要对 React 组件进行一下外包装。而 VUEX 就是为 VUE 定制，作为插件、以及使用插入的方式就可以生效，而且提供了很大的灵活性。

## 75. 登录验证拦截(通过 router)

1. 先设置 requireAuth:
   ```js
   routes = [
     {
       name: "detail",
       path: "/detail",
       meta: {
         requireAuth: true
       }
     },
     {
       name: "login",
       path: "/login"
     }
   ];
   ```
2. 再配置 router.beforeEach:
   ```js
   router.beforeEach((from, to, next) => {
     if (to.meta.requireAuth) {
       // 判断跳转的路由是否需要登录
       if (store.state.token) {
         // vuex.state判断token是否存在
         next(); // 已登录
       } else {
         next({
           path: "/login",
           query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
         });
       }
     } else {
       next();
     }
   });
   ```

## 76. vue 解除双向绑定

```js
let obj = JSON.parse(JSON.stringify(this.temp1));
```

## 77. vue 异步组件

为了简化，Vue 允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染

```js
Vue.component(
  "async-webpack-example",
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import("./my-async-component")
);
```
