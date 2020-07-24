# 体验 Vue Function API

>最近 Vue 官方公布了 Vue 3.0 最重要的[RFC：Function-based component API](https://github.com/vuejs/rfcs/blob/function-apis/active-rfcs/0000-function-api.md#comparison-with-react-hooks)，并发布了兼容 Vue 2.0 版本的 [plugin：vue-function-api](https://github.com/vuejs/composition-api)，可用于提前体验 Vue 3.0 版本的 Function-based component API。笔者出于学习的目的，提前在项目中尝试了[vue-function-api](https://github.com/vuejs/composition-api)。

笔者计划写两篇文章，本文为笔者计划的第一篇，主要为笔者在体验 Vue Function API 的学习心得。第二篇计划写阅读[vue-function-api](https://github.com/vuejs/composition-api)的核心部分代码原理，包括`setup`、`observable`、`lifecycle`。

本文阅读时间约为15~20分钟。

### 概述

Vue 2.x 及以前的高阶组件的组织形式或多或少都会面临一些问题，特别是在需要处理重复逻辑的项目中，一旦开发者组织项目结构组织得不好，组件代码极有可能被人诟病为“胶水代码”。而在 Vue 2.x 及之前的版本，解决此类问题的办法大致是下面的方案：

* [mixin](https://vuejs.org/v2/guide/mixins.html#ad)
* [函数式组件](https://vuejs.org/v2/guide/render-function.html#Functional-Components)
* [slots](https://vuejs.org/v2/guide/components-slots.html#ad)

笔者维护的项目也需要处理大量复用逻辑，在这之前，笔者一直尝试使用`mixin`的方式来实现组件的复用。有些问题也一直会对开发者和维护者造成困惑，如一个组件同时`mixin`多个组件，很难分清对应的属性或方法写在哪个`mixin`里。其次，`mixin`的命名空间冲突也可能造成问题。难以保证不同的`mixin`不用到同一个属性名。为此，官方团队提出函数式写法的意见征求稿，也就是[RFC：Function-based component API](https://github.com/vuejs/rfcs/blob/function-apis/active-rfcs/0000-function-api.md#comparison-with-react-hooks)。使用函数式的写法，可以做到更灵活地复用组件，开发者在组织高阶组件时，不必在组件组织上考虑复用，可以更好地把精力集中在功能本身的开发上。

>注：本文只是笔者使用[vue-function-api](https://github.com/vuejs/composition-api)提前体验 Vue Function API ，而这个 API 只是 Vue 3.0 的 RFC，而并非与最终 Vue 3.x API 一致。发布后可能有不一致的地方。

### 在 Vue 2.x 中使用
---

要想提前在`Vue 2.x`中体验 Vue Function API ，需要引入[vue-function-api](https://github.com/vuejs/composition-api)，基本引入方式如下：
```js
import Vue from 'vue';
import { plugin as VueFunctionApiPlugin } from 'vue-function-api';

Vue.use(VueFunctionApiPlugin);
```

### 基本组件示例
---

先来看一个基本的例子：
```html
<template>
    <div>
        <span>count is {{ count }}</span>
        <span>plusOne is {{ plusOne }}</span>
        <button @click="increment">count++</button>
    </div>
</template>

<script>
import Vue from 'vue';
import { value, computed, watch, onMounted } from 'vue-function-api';

export default {
    setup(props, context) {
        // reactive state
        const count = value(0);
        // computed state
        const plusOne = computed(() => count.value + 1);
        // method
        const increment = () => {
            count.value++;
        };
        // watch
        watch(
            () => count.value * 2,
            val => {
                console.log(`count * 2 is ${val}`);
            }
        );
        // lifecycle
        onMounted(() => {
            console.log(`mounted`);
        });
        // expose bindings on render context
        return {
            count,
            plusOne,
            increment,
        };
    },
};
</script>

```

### 详解
---

**setup**

`setup`函数是Vue Function API 构建的函数式写法的主逻辑，当组件被创建时，就会被调用，函数接受两个参数，分别是父级组件传入的`props`和当前组件的上下文`context`。看下面这个例子，可以知道在`context`中可以获取到下列属性值：

```js
const MyComponent = {
    props: {
        name: String
    },
    setup(props, context) {
        console.log(props.name);
        // context.attrs
        // context.slots
        // context.refs
        // context.emit
        // context.parent
        // context.root
    }
}
```
**value & state**

`value`函数创建一个包装对象，它包含一个响应式属性`value`：
![](https://user-gold-cdn.xitu.io/2019/8/11/16c8116df1bbe3f2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

那么为何要使用`value`呢，因为在`JavaScript`中，基本类型并没有引用，为了保证属性是响应式的，只能借助包装对象来实现，这样做的好处是组件状态会以引用的方式保存下来，从而可以被在`setup`中调用的不同的模块的函数以参数的形式传递，既能复用逻辑，又能方便地实现响应式。

直接获取包装对象的值必须使用`.value`，但是，如果包装对象作为另一个响应式对象的属性，`Vue`内部会通过[proxy](https://github.com/vuejs/composition-api/blob/6ce30bfb6452984fb8b33df9ed633d3375e9b406/src/wrappers/AbstractWrapper.ts#L15-L20)来自动展开包装对象。同时，在模板渲染的上下文中，也会被自动展开。

```js
import { state, value } from 'vue-function-api';
const MyComponent = {
    setup() {
        const count = value(0);
        const obj = state({
            count,
        });
        console.log(obj.count) // 作为另一个响应式对象的属性，会被自动展开

        obj.count++ // 作为另一个响应式对象的属性，会被自动展开
        count.value++ // 直接获取响应式对象，必须使用.value

        return {
            count,
        };
    },
    template: `<button @click="count++">{{ count }}</button>`,
};
```
如果某一个状态不需要在不同函数中被响应式修改，可以通过`state`创建响应式对象，这个`state`创建的响应式对象并不是包装对象，不需要使用`.value`来取值。

**watch & computed**

`watch`和`compute`d的基本概念与 Vue 2.x 的`watch`和`computed`一致，`watch`可以用于追踪状态变化来执行一些后续操作，`computed`用于计算属性，用于依赖属性发生变化进行重新计算。

`computed`返回一个只读的包装对象，和普通包装对象一样可以被`setup`函数返回，这样就可以在模板上下文中使用`computed`属性。可以接受两个参数，第一个参数返回当前的计算属性值，当传递第二个参数时，`computed`是可写的。

```js
import { value, computed } from 'vue-function-api';

const count = value(0);
const countPlusOne = computed(() => count.value + 1);

console.log(countPlusOne.value); // 1

count.value++;
console.log(countPlusOne.value); // 2

// 可写的计算属性值
const writableComputed = computed(
    // read
    () => count.value + 1,
    // write
    val => {
        count.value = val - 1;
    },
);
```

`watch`第一个参数和 类似，返回被监听的包装对象属性值，不过另外需要传递两个参数：第二个参数是回调函数，当数据源发生变化时触发回调函数，第三个参数是`options`。其默认行为与 Vue 2.x 有所不同：

* lazy：是否会在组件创建时就调用一次回调函数，与 Vue 2.x 相反，lazy默认是false，默认会在组件创建时调用一次。
* deep：与 Vue 2.x 的 deep 一致
* flush：有三个可选值，分别为 'post'（在渲染后，即nextTick后才调用回调函数），'pre'（在渲染前，即nextTick前调用回调函数），'sync'（同步触发）。默认值为'post'。

```js
// double 是一个计算包装对象
const double = computed(() => count.value * 2);

watch(double, value => {
    console.log('double the count is: ', value);
}); // -> double the count is: 0

count.value++; // -> double the count is: 2
```
当`watch`多个被包装对象属性时，参数均可以通过数组的方式进行传递，同时，与 Vue 2.x 的`vm.$watch`一样，`watch`返回取消监听的函数：

```js
const stop = watch(
    [valueA, () => valueB.value],
    ([a, b], [prevA, prevB]) => {
        console.log(`a is: ${a}`);
        console.log(`b is: ${b}`);
    }
);

stop();
```

>注意：在[RFC：Function-based component API](https://github.com/vuejs/rfcs/blob/function-apis/active-rfcs/0000-function-api.md#comparison-with-react-hooks)初稿中，有提到[effect-cleanup](https://github.com/vuejs/rfcs/blob/function-apis/active-rfcs/0000-function-api.md#effect-cleanup)，是用于清理一些特殊情况的副作用的，目前已经在提案中被取消了。

**生命周期**

所有现有的生命周期都有对应的钩子函数，通过`onXXX`的形式创建，但有一点不同的是，`destoryed`钩子函数需要使用`unmounted`代替：

```js
import { onMounted, onUpdated, onUnmounted } from 'vue-function-api';

const MyComponent = {
    setup() {
        onMounted(() => {
            console.log('mounted!');
        });
        onUpdated(() => {
            console.log('updated!');
        });
        // destroyed 调整为 unmounted
        onUnmounted(() => {
            console.log('unmounted!');
        });
    },
};
```

### 一些思考
---

上面的详解部分，主要抽取的是 Vue Function API 的常见部分，并非[RFC：Function-based component API](https://github.com/vuejs/rfcs/blob/function-apis/active-rfcs/0000-function-api.md#comparison-with-react-hooks)的全部，例如其中的依赖注入，TypeScript类型推导等优势，在这里，由于篇幅有限，想要了解更多的朋友，可以点开[RFC：Function-based component API](https://github.com/vuejs/rfcs/blob/function-apis/active-rfcs/0000-function-api.md#comparison-with-react-hooks)查看。个人也在[Function-based component API](https://github.com/vuejs/rfcs/issues/55)讨论区看到了更多地一些意见：


* 由于底层设计，在setup取不到[组件实例this](https://github.com/vuejs/composition-api/issues/50)的问题，这个问题在笔者尝试体验时也遇到了，期待正式发布的 Vue 3.x 能够改进这个问题。


* 对于基本类型的值必须使用包装对象的问题：在 RFC 讨论区，为了同时保证`TypeScript`类型推导、复用性和保留`Vue`的数据监听，包装属性必须使用`.value`来取值是讨论最激烈的


* 关于包装对象`value`和`state`方法命名不清晰可能导致开发者误导等问题，已经在[Amendment proposal to Function-based Component API](https://github.com/vuejs/rfcs/issues/63)这个提议中展开了讨论：

```js
setup() {
    const state = reactive({
        count: 0,
    });

    const double = computed(() => state.count * 2);

    function increment() {
        state.count++;
    }

    return {
        ...toBindings(state), // retains reactivity on mutations made to `state`
        double,
        increment,
    };
}
```

* 引入`reactive` API 和 `binding` API，其中`reactive` API 类似于 `state` API ， `binding` API 类似于 `value` API。

* 之前使用的方法名`state`在 Vue 2.x 中可能被用作组件状态对象，导致变量命名空间的冲突问题，团队认为将`state` API 更名为 `reactive` 更为优雅。开发者能够写出`const state = ...` ，然后通过`state.xxxx`这种方式来获取组件状态，这样也相对而言自然一些。

* `value`方法用于封装基本类型时，确实会出现不够优雅的`.value`的情况，开发者可能会在直接对包装对象取值时忘记使用`.value`，修正方案提出的 `reactive` API，其含义是创建响应式对象，初始化状态`state`就使用`reactive`创建，可保留每项属性的`getter`和`setter`，这么做既满足类型推导，也可以保留响应式引用，从而可在不同模块中共享状态值的引用。

* 但`reactive`可能导致下面的问题，需要引入`binding` API。 解决，如使用`reactive`创建的响应式对象，对其使用拓展运算符`...`时，则会丢失对象的`getter`和`setter`，提供`toBindings`方法能够保留状态的响应式。

下一篇文章中，笔者将阅读[vue-function-api](https://github.com/vuejs/composition-api)的核心部分代码原理，包括`setup`、`observable`、`lifecycle`等，从内部探索 Vue Function API 可能带给我们的改变。

当然，目前 Vue Function API 还处在讨论阶段，Vue 3.0 还处在开发阶段，还是期待下半年 Vue 3.0 的初版问世吧，希望能给我们带来更多的惊喜。
