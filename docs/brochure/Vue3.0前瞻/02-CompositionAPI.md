# Composition API

在上一篇文章Vue 3.0 前瞻，体验 Vue Function API，笔者通过尝试[vue-function-api](https://github.com/vuejs/composition-api)，提前体验了Vue 3.0 即将发布的函数式API，在文章最后，笔者提出了一些思考。最近，Vue 官方发布了最新的3.0 API 修改草案，并在充分采纳社区的意见后，将Vue Function API 更正为 Vue Composition API，提供了在Vue 2.x 能够提前体验此API的库[@vue/composition-api](https://github.com/vuejs/composition-api)，笔者出于学习目的，提前体验了这个库。并结合上一篇文章，描述 Vue 官方团队在采纳社区意见后对 API 作出的一些更正。

本文主要分以下几个主题讨论最新的Composition API：

* reactive API
* ref API
* watch API变化
* computed API变化
* 生命周期钩子变化
* TypeScript和JSX支持

Composition API 可谓是修复了 Function API 诸多问题而提供的最新“修正案”，下面来看比起之前的[vue-function-api](https://github.com/vuejs/composition-api)，究竟修改了些什么呢？

### `state`更名为`reactive`
---

在[vue-function-api](https://github.com/vuejs/composition-api)中，通过`state`创建响应式对象，这个`state`创建的响应式对象并不是包装对象，不需要使用`.value`来取值。但问题在于：`state`通常会被用作描述 Vue 组件状态对象的变量名，容易对开发者造成误导，Vue官方团队认为将`state` API 更名为`reactive`更为优雅，`reactive`等价于 Vue 2.x 的`Vue.observable()`，用于获取一个对象的响应性代理对象：

```js
const obj = reactive({ count: 0 });
```

### value更名为ref，并提供isRef和toRefs

在[vue-function-api](https://github.com/vuejs/composition-api)中，通过`value`函数创建一个包装对象，它包含一个响应式属性`value`。在 Vue 官方团队充分采用社区意见后，将这个API更改为`ref`。`ref`用创建一个包装对象，只具备一个响应式属性`value`，如果将对象指定为`ref`的值，该对象将被`reactive`方法深度遍历。要知道， Composition API 之所以被提出和使用，就是为了让我们更加方便地进行组件复用，将状态经过函数式地传递过程中，由于`JavaScript`函数传参是值传递的，而基本类型不具备引用，为了保证属性的响应式，将使用`ref`来创建包装对象进行传递。

```js
const count = ref(0);
console.log(count.value); // 0

count.value++;
console.log(count.value); // 1
```
提供`isRef`，用于检查一个对象是否是`ref`对象：
```js
const unwrapped = isRef(foo) ? foo.value : foo;
```
如果读者你看到这里，可能就会比较疑惑了，究竟什么时候该使用`ref`，什么时候该使用`reactive`呢？其使用场景其实与我们所习惯的编码风格密切相关，通过下面的例子，我们能更好理解使用`ref`和`reactive`的区别：

```js
// 风格一：通过基本类型变量来声明状态
let x = 0;
let y = 0;

function updatePosition(e) {
 x = e.pageX;
 y = e.pageY;
}

// --- compared to ---

// 风格二：通过单一对象来声明状态
const pos = {
 x: 0,
 y: 0,
};

function updatePosition(e) {
 pos.x = e.pageX;
 pos.y = e.pageY;
}

```
如果开发者习惯风格一的写法，通常通过`ref`将基本类型的变量转化为响应式包装对象来使其具备响应式，而如果是风格二的话，只需要创建`reactive`对象。

然而，思考下面的场景：
```js
function useMousePosition() {
 const pos = reactive({
 x: 0,
 y: 0,
 });

 // ...
 return pos;
}

// consuming component
export default {
 setup() {
 // 对象解构将会导致响应式会被丢失
 const { x, y } = useMousePosition();
 return {
 x,
 y,
 };

 // 拓展运算符将导致响应式丢失
 return {
 ...useMousePosition()
 }

 // 只有这样才能保证响应式不被丢失
 // 通过pos.x的pos.y来取值才会保留x，y的响应式
 return {
 pos: useMousePosition()
 }
 }
};
```

通过上述的例子，要知道，我们没有办法通过编码风格的限制来保证通过组合函数返回的响应式状态不被丢失，Vue官方团队建议在组合函数中都通过返回`ref`对象来规避这一类问题，`toRef`便是做这一件事情的最好方式：
```js
function useMousePosition() {
 const pos = reactive({
 x: 0,
 y: 0
 });

 // ...
 return toRefs(pos);
}

// x 和 y 现在具备了响应式
const { x, y } = useMousePosition();
```
`toRefs`将`reactive`对象转换为普通对象，其中结果对象上的每个属性都是指向原始对象中相应属性的ref引用对象，这在组合函数返回响应式状态时非常有用，这样保证了开发者使用对象解构或拓展运算符不会丢失原有响应式对象的响应。

### `watch`可作用于单一函数
---

比起上一篇文章中介绍的`watch` API 的传参方式，最新的[@vue/composition-api](https://github.com/vuejs/composition-api)修正案中，`watch`的传递方式可以收敛为单一函数，Vue 3.x 将会在其依赖的响应式状态改变是执行`watch`的回调函数：

```js
const count = ref(0);

watch(() => console.log(count.value)); // 打印0

setTimeout(() => {
 count.value++; // 打印1
}, 100);

```

### `computed`可传入`get`和`set`，用于定义可更改的计算属性
---

基本示例如下所示，与 Vue 2.x 类似的，可以定义可更改的计算属性。

```js
const count = ref(1);
const plusOne = computed({
 get: () => count.value + 1,
 set: val => { count.value = val - 1 }
});

plusOne.value = 1;
console.log(count.value); // 0
```

### 生命周期钩子
---

比起[vue-function-api](https://github.com/vuejs/composition-api)，[@vue/composition-api](https://github.com/vuejs/composition-api)删除了`onBeforeCreate`和`onCreated`。因为`setup`总是在创建组件实例时调用，即`onBeforeCreate`之后和`onCreated`之前调用，因此`onBeforeCreate`和`onCreated`将可以使用`setup`进行代替。

### 使用TypeScript和JSX
---

`setup`现在支持返回一个渲染函数，这个函数返回一个JSX，JSX可以直接使用声明在`setup`作用域的响应式状态：
```js
export default {
 setup() {
 const count = ref(0);
 return () => (<div>{count.value}</div>);
 },
};
```
>注：如果使用`TypeScript`，同时希望使用需要在JSX命名空间内声明以下`interface`：

```js
// file: shim-tsx.d.ts
import Vue, { VNode } from 'vue';
import { ComponentRenderProxy } from '@vue/composition-api';

declare global {
 namespace JSX {
 // tslint:disable no-empty-interface
 interface Element extends VNode { }
 // tslint:disable no-empty-interface
 interface ElementClass extends ComponentRenderProxy { }
 interface ElementAttributesProperty {
 $props: any; // specify the property name to use
 }
 interface IntrinsicElements {
 [elem: string]: any;
 }
 }
}
```
此外，为了更好地配合 `TypeScript` 进行类型推断，Vue Composition API 推荐使用`createComponent`来定义一个组件，以便于Vue进行类型推导：
```js
import { createComponent } from 'vue';

export default createComponent({
 props: {
 foo: String,
 },
 setup(props) {
 console.log(props.foo);
 },
});
```
### 小结
---

本文是笔者上一篇文章Vue 3.0 前瞻，体验 Vue Function API的续篇，主要描述 Vue Composition API 对比 之前的草案 Vue Function API 的变化，可以看到Vue 官方针对社区建议修改了 Vue Function API 草案的诸多问题。下一篇文章中，笔者带来 Vue Composition API 的响应式对象原理解读，在解读学习过程中，加深对 Vue Composition API 的理解。
