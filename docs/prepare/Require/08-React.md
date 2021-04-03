# React

[[toc]]

## 1. React 生命周期有哪些，16 版本生命周期发生了哪些变化？

### 15 生命周期

<img :src="$withBase('/images/prepare/require/1909151.jpg')" alt="images/prepare/require/1909151.jpg">

- 初始化阶段

  - `constructor` 构造函数
  - `getDefaultProps props`默认值
  - `getInitialState state`默认值

- 挂载阶段

  - `componentWillMount` 组件初始化渲染前调用
  - `render` 组件渲染
  - `componentDidMount`组件挂载到 `DOM`后调用

- 更新阶段

  - `componentWillReceiveProps` 组件将要接收新 props 前调用
  - `shouldComponentUpdate` 组件是否需要更新
  - `componentWillUpdate` 组件更新前调用
  - `render` 组件渲染
  - `componentDidUpdate` 组件更新后调用

- 卸载阶段
  - `componentWillUnmount` 组件卸载前调用

### 16 生命周期

<img :src="$withBase('/images/prepare/require/1909152.jpg')" alt="images/prepare/require/1909152.jpg">

- 初始化阶段

  - `constructor` 构造函数
  - `getDefaultProps props`默认值
  - `getInitialState state`默认值

- 挂载阶段

  - `static getDerivedStateFromProps(props,state)`
  - `render`
  - `componentDidMount`

  > `getDerivedStateFromProps`：组件每次被 `rerender`的时候，包括在组件构建之后(虚拟 `dom`之后，实际 `dom`挂载之前)，每次获取新的 `props`或 `state`之后；每次接收新的`props`之后都会返回一个对象作为新的 `state`，返回 null 则说明不需要更新 `state`；配合 `componentDidUpdate`，可以覆盖 `componentWillReceiveProps`的所有用法

- 更新阶段

  - `static getDerivedStateFromProps(props,state)`
  - `shouldComponentUpdate`
  - `render`
  - `getSnapshotBeforeUpdate(prevProps,prevState)`
  - `componentDidUpdate`

  > `getSnapshotBeforeUpdate`：触发时间: `update`发生的时候，在 `render`之后，在组件 `dom`渲染之前；返回一个值，作为 `componentDidUpdate`的第三个参数；配合 `componentDidUpdate`, 可以覆盖 `componentWillUpdate`的所有用法

- 卸载阶段

  - `componentWillUnmount`

- 错误处理
  - `componentDidCatch`

**React16**新的生命周期弃用了 `componentWillMount`、`componentWillReceivePorps`，`componentWillUpdate`新增了 `getDerivedStateFromProps`、`getSnapshotBeforeUpdate`来代替弃用的三个钩子函数。

> **React16**并没有删除这三个钩子函数，但是不能和新增的钩子函数混用， **React17**将会删除这三个钩子函数，新增了对错误的处理（ `componentDidCatch`）

## 2. redux 与 flux 的区别

- redux 与 flux 很像，主要区别在于 flux 有多个可以改变应用状态的 store，它通过事件来触发这些变化，组件可以订阅这些时间来和当前状态同步。
- redux 中没有分发器 dispatcher，但在 flux 中 dispatcher 被用来传递数据到注册的回调事件，另一个不同的是 flux 中有很多扩展是可用的，这也带来了一些混乱与矛盾。
- 在 redux 中只能定义一个可以更新状态的 store，flux 中可以定义多个仓库。
- redux 把 store 和 dispatcher 合并，结构更加简单清晰，新增 state，对状态管理更加明确。

Flux:

1. Store 包含状态和更改逻辑
2. 有多个 Store
3. 所有 Store 都互不影响且是平级的
4. 有单一调度器
5. React 组件订阅 store
6. 状态是可变的

Redux:

1. Store 和更改逻辑是分开的
2. 只有一个 Store
3. 带有分层 reducer 的单一 Store
4. 没有调度器的概念
5. 容器组件是有联系的
6. 状态是不可改变的

Flux 的最大特点，就是数据的"单向流动"。

1. 用户访问 View
2. View 发出用户的 Action
3. Dispatcher 收到 Action，要求 Store 进行相应的更新
4. Store 更新后，发出一个"change"事件
5. View 收到"change"事件后，更新页面

## 3. Redux

### redux 整个工作流程：

1. 首先，用户（通过 View）发出 Action，发出方式就用到了 dispatch 方法。
   ```js
   store.dispatch(action);
   ```
2. 然后，Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action，Reducer 会返回新的 State
   ```js
   let nextState = todoApp(previousState, action);
   ```
3. State 一旦有变化，Store 就会调用监听函数 ~~来更新 View~~。
   ```js
   // 设置监听函数
   store.subscribe(listener);
   ```
   listener 可以通过 store.getState()得到当前状态。如果使用的是 React，这时可以触发重新渲染 View。
   ```js
   function listerner() {
     let newState = store.getState();
     component.setState(newState);
   }
   ```

### redux 的三个原则:

- **单一数据源**  
   整个应用的 state 被存储在一个 Object tree 中，且只存在于唯一的 Store 中。单一状态树可以更容易地跟踪随时间的变化，并调试或检查应用程序。
- **状态是只读的**  
   唯一改变 state 的方法就是触发 action，action 是一个用于描述发生事件的普通对象，视图部分只需要表达想要修改的意图，所有修改都会被集中化处理。
- **使用纯函数执行修改**  
   为了指定状态树如何通过操作进行转换，实现根据 action 修改 state 值, 需要编写 Reducer,它是一个纯函数，接收先前的 state 和 action 返回新的 state ,随着应用的变大，你可以将它拆成多个小的 Reducer ,分别独立操作 state tree 中的不同部分。

### redux 中的 reducer 为什么必须（最好）是纯函数

reducer 的职责不允许有副作用，副作用简单来说就是不确定性，如果 reducer 有副作用，那么返回的 state 就不确定，

## 4. mobx 原理

Mobx 最关键的函数在于 autoRun，举个例子，它可以达到这样的效果：

```js
const obj = observable({
  a: 1,
  b: 2,
});

autoRun(() => {
  console.log(obj.a);
});

obj.b = 3; // 什么都没有发生
obj.a = 2; // observe 函数的回调触发了，控制台输出：2
```

我们发现这个函数非常智能，用到了什么属性，就会和这个属性挂上钩，从此一旦这个属性发生了改变，就会触发回调，通知你可以拿到新值了。没有用到的属性，无论你怎么修改，它都不会触发回调，这就是神奇的地方。

autoRun 的用途  
使用 autoRun 实现 mobx-react 非常简单，核心思想是将组件外面包上 autoRun，这样代码中用到的所有属性都会像上面 Demo 一样，与当前组件绑定，一旦任何值发生了修改，就直接 forceUpdate，而且精确命中，效率最高。

依赖收集  
autoRun 的专业名词叫做依赖收集，也就是通过自然的使用，来收集依赖，当变量改变时，根据收集的依赖来判断是否需要更新。

## 5. Taro 原理

Taro 是一套遵循 React 语法规范的 多端开发 解决方案

编译的基本流程

编译可以分为五个基本步骤:`词法分析`、`语法分析`、`语义分析`及`中间代码的生成优化`、`目标代码的生成`。这是每个编译器都必须的基本步骤和流程, 从源头输入高级语言源程序输出目标语言代码。

1. **词法分析**  
   词法分析器是通过词法分析程序对构成源程序的字符串从左到右的扫描, 逐个字符地读, 识别出每个单词符号, 识别出的符号一般以二元式形式输出, 即包含符号种类的编码和该符号的值。词法分析器一般以函数的形式存在, 供语法分析器调用。当然也可以一个独立的词法分析器程序存在。完成词法分析任务的程序称为词法分析程序或词法分析器或扫描器。
2. **语法分析**  
   语法分析是编译过程的第二个阶段。这阶段的任务是在词法分析的基础上将识别出的单词符号序列组合成各类语法短语, 如“语句”, “表达式”等.语法分析程序的主要步骤是判断源程序语句是否符合定义的语法规则, 在语法结构上是否正确。而一个语法规则又称为文法, 乔姆斯基将文法根据施加不同的限制分为 0 型、1 型、2 型、3 型文法, 0 型文法又称短语文法, 1 型称为上下文有关文法, 2 型称为上下文无关文法, 3 型文法称为正规文法, 限制条件依次递增。
3. **语义分析**  
   词法分析注重的是每个单词是否合法, 以及这个单词属于语言中的哪些部分。语法分析的上下文无关文法注重的是输入语句是否可以依据文法匹配产生式。那么, 语义分析就是要了解各个语法单位之间的关系是否合法。实际应用中就是对结构上正确的源程序进行上下文有关性质的审查, 进行类型审查等。
4. **中间代码生成与优化**  
   在进行了语法分析和语义分析阶段的工作之后, 有的编译程序将源程序变成一种内部表示形式, 这种内部表示形式叫做中间语言或中间表示或中间代码。所谓“中间代码”是一种结构简单、含义明确的记号系统, 这种记号系统复杂性介于源程序语言和机器语言之间, 容易将它翻译成目标代码。另外, 还可以在中间代码一级进行与机器无关的优化。
5. **目标代码的生成**  
   根据优化后的中间代码, 可生成有效的目标代码。而通常编译器将其翻译为汇编代码, 此时还需要将汇编代码经汇编器汇编为目标机器的机器语言。
6. **出错处理**  
   编译的各个阶段都有可能发现源码中的错误, 尤其是语法分析阶段可能会发现大量的错误, 因此编译器需要做出错处理, 报告错误类型及错误位置等信息。

## 6. react 项目中，constructor(){ this.target = this.func.bind(this); }, JSX 里 onChange={this.target}的写法，为什么要比非 bind 的 func = () => {}的写法效率高 请解释其中的原理

bind 之后锁定了上下文，不用向上查找

箭头函数每次 render 都是新的，this.target 一直都是同一个，箭头函数会造成不必要的 diff

## 7. 组件更新触发顺序如何

父子组件加载和更新顺序和 vue 差不多，都是父组件先进入子组件完成后才会挂载完成父组件

父组件 A,子组件 B

1. **初次渲染时**  
   componentWillMount(A) -> render(A) -> componentWillMount(B) -> render(B) -> componentDidMount(B) -> componentDidMount(A)
2. **父组件中的状态更新时**  
   componentWillReceiveProps(A) -> shouldComponentUpdate【返回 true】(A) -> componentWillUpdate(A) -> Rerender(A) -> componentWillReceiveProps(B) -> shouldComponentUpdate【返回 true】(B) -> componentWillUpdate(B) -> Rerender(B) -> componentDidUpdate(B) -> componentDidUpdate(A)
3. **当父组件发生变化时，子组件需要重新渲染，此时会触发下面的函数**
   - componentWillReceiveProps(B)
   - shouldComponentUpdate(B)
   - componentWillUpdate(B)
   - render(B)
   - componentDidUpdate(B)
4. **当自身状态发生变化时，也就是调用 setState 时，会触发下面的函数**
   - shouldComponentUpdate()
   - componentWillUpdate()
   - render()
   - componentDidUpdate()
5. **调用 foreUpdate 会发生强制更新，此时会触发下面的函数**
   - componentWillUpdate()
   - render()
   - componentUpdate()

## 8. React 的合成事件机制

- react 事件机制分为两个部分：1、事件注册 2、事件分发
- 事件注册部分，所有的事件都会注册到 document 上，拥有统一的回调函数 dispatchEvent 来执行事件分发
- 事件分发部分，首先生成合成事件，注意同一种事件类型只能生成一个合成事件 Event，如 onclick 这个类型的事件，dom 上所有带有通过 jsx 绑定的 onClick 的回调函数都会按顺序（冒泡或者捕获）会放到 Event.\_dispatchListeners 这个数组里，后面依次执行它。

## 9. React 的事件处理机制是什么？

从官方代码中我们可以看到 React 的事件处理系统流程，由 DOM 触发事件，ReactEvent Listener 监听到事件，转换为 ReactEvent 进行触发，而不同的事件又被 React 进行了封装，以不同的 Plugin 形式插入。

### 合成事件池

主要包含：

- addEventPoolingTo 将事件加入到事件池中
- getPooledEvent/releasePooledEvent 当我们将事件加入到事件池时，会同时添加这两个函数
- stopPropagation 和 preventDefault 是针对 native 事件
- 由于 react 中的合成事件是复用的，不同异步调用，如果想要持久化，可以调用其提供的 persist

### 合成事件 Vs 原生事件

由于 React 事件是挂在 document.body 上 React 合成事件和 DOM 原生事件混用须知

- 原生事件执行早于合成事件
- 阻止原生事件的冒泡也会阻止合成事件的执行
- React 中在代码中捕获事件早于冒泡事件执行

```js
// react中的事件处理过程
for (var i = 0; i < dispatchListeners.length; i++) {
  if (event.isPropagationStopped()) {
    break;
  }
  // Listeners and Instances are two parallel arrays that are always in sync.
  executeDispatch(event, simulated, dispatchListeners[i], dispatchInstances[i]);
}
```

## 10. react Fiber 架构分析

`react-fiber`是为了增强动画、布局、移动端手势领域的适用性，最重要的特性是对页面渲染的优化: 允许将渲染方面的工作拆分为多段进行。

React Fiber 的目标是提升对在动画，布局以及手势方面的友好度。它最重要的特性叫做"增量式/渐进式"渲染：即，将渲染工作分割为多个小块进行，并在各个帧之间传播。

其它关键的特性包括，

1. 拥有了暂停，中止以及当有更新来临的时候重新恢复工作的能力。
2. 不同的能力对于不同类型的更新分配不同的优先级。
3. 新的并发原语。

异步渲染 ui 的解决方案

Fiber 的解题思路： 将 计算任务 分给成一个个小任务，分批完成，在完成一个小任务后，将控制权还给浏览器，让浏览器利用间隙进行 UI 渲染。

react-fiber 可以为我们提供如下几个功能：

- 设置渲染任务的优先
- 采用新的 Diff 算法
- 采用虚拟栈设计允许当优先级更高的渲染任务和较低优先的任务之间来回切换

`Fiber` 如何做到异步渲染 `Virtual Dom` 和 `Diff` 算法

众所周知，画面每秒钟更新 60 次，页面在人眼中显得流畅，无明显卡顿。每秒 60 次，即 16ms 要更新一次页面，如果更新页面消耗的时间不到 16ms，那么在下一次更新时机来到之前会剩下一点时间执行其他的任务，只要保证及时在 16ms 的间隔下更新界面就完全不会影响到页面的流畅程度。fiber 的核心正是利用了 60 帧原则，实现了一个基于优先级和 requestIdleCallback 的循环任务调度算法。

```jsx
function fiber(剩余时间) {
  if (剩余时间 > 任务所需时间) {
    做任务;
  } else {
    requestIdleCallback(fiber);
    // requestIdleCallback 是浏览器提供的一个 api，可以让浏览器在空闲的时候执行回调，
    // 在回调参数中可以获取到当前帧剩余的时间，fiber 利用了这个参数，
    // 判断当前剩下的时间是否足够继续执行任务，
    // 如果足够则继续执行，否则暂停任务，
    // 并调用 requestIdleCallback 通知浏览器空闲的时候继续执行当前的任务
  }
}
```

## 11. react hooks

**动机**：

1. 在组件之间重用有状态逻辑很困难，Hooks 允许您在不更改组件层次结构的情况下重用有状态逻辑
2. 复杂的组件变得难以理解， Hooks 允许您根据相关内容（例如设置订阅或获取数据）将一个组件拆分为较小的函数，而不是基于生命周期方法强制拆分。您还可以选择使用 reducer 管理组件的本地 state(状态)，以使其更具可预测性。
3. Hooks 允许您在没有类的情况下使用更多 React 的功能

**hooks 原理**：

Hooks 是一种函数，该函数允许您从函数式组件 “勾住(hook into)” React 状态和生命周期功能。 Hooks 在类内部不起作用 - 它们允许你无需类就使用 React。

## 12. hooks 优缺点

**React Hooks 优点:**

1. **简洁，避免地狱式嵌套**  
    React Hooks 解决了 HOC 和 Render Props 的嵌套问题,更加简洁
   大量使用 HOC 的情况下让我们的代码变得嵌套层级非常深，使用 HOC，我们可以实现扁平式的状态逻辑复用，而避免了大量的组件嵌套。
2. **解耦**  
   React Hooks 可以更方便地把 UI 和状态分离,做到更彻底的解耦
3. **函数友好**  
   React Hooks 为函数组件而生,从而解决了类组件的几大问题:
   - this 指向容易错误
   - 分割在不同声明周期中的逻辑使得代码难以理解和维护
   - 代码复用成本高（高阶组件容易使代码量剧增）
4. **让组件更容易理解**  
   在使用 class 组件构建我们的程序时，他们各自拥有自己的状态，业务逻辑的复杂使这些组件变得越来越庞大，各个生命周期中会调用越来越多的逻辑，越来越难以维护。使用 Hook，可以让你更大限度的将公用逻辑抽离，将一个组件分割成更小的函数，而不是强制基于生命周期方法进行分割。
5. **减少状态逻辑复用的风险**  
   Hook 和 Mixin 在用法上有一定的相似之处，但是 Mixin 引入的逻辑和状态是可以相互覆盖的，而多个 Hook 之间互不影响，这让我们不需要在把一部分精力放在防止避免逻辑复用的冲突上。在不遵守约定的情况下使用 HOC 也有可能带来一定冲突，比如 props 覆盖等等，使用 Hook 则可以避免这些问题。
6. **组合**  
   Hooks 中可以引用另外的 Hooks 形成新的 Hooks,组合变化万千
7. **使用函数代替 class**  
   相比函数，编写一个 class 可能需要掌握更多的知识，需要注意的点也越多，比如 this 指向、绑定事件等等。另外，计算机理解一个 class 比理解一个函数更快。Hooks 让你可以在 classes 之外使用更多 React 的新特性。

**React Hooks 缺陷:**

- 额外的学习成本（Functional Component 与 Class Component 之间的困惑）
- 写法上有限制（不能出现在条件、循环中），并且写法限制增加了重构成本
- 破坏了 PureComponent、React.memo 浅比较的性能优化效果（为了取最新的 props 和 state，每次 render()都要重新创建事件处函数）
- 在闭包场景可能会引用到旧的 state、props 值
- 内部实现上不直观（依赖一份可变的全局状态，不再那么“纯”）
- React.memo 并不能完全替代 shouldComponentUpdate（因为拿不到 state change，只针对 props change）
  x

## 13. 请用 React Hooks 模拟生命周期

### componentDidMount

效果：通过 `useMount` 拿到 mount 周期才执行的回调函数。

```ts
useMount(() => {
  // quite similar to `componentDidMount`
});
```

实现：`componentDidMount` 等价于 `useEffect` 的回调（仅执行一次时），因此直接把回调函数抛出来即可。

```js
useEffect(() => void fn(), []);

// void关键字是javascript当中非常重要的关键字，该操作符指定要计算或运行一个表达式，但是不返回值。
```

### componentWillUnmount

效果：通过 `useUnmount` 拿到 unmount 周期才执行的回调函数。

```ts
useUnmount(() => {
  // quite similar to `componentWillUnmount`
});
```

实现：`componentWillUnmount` 等价于 `useEffect` 的回调函数返回值（仅执行一次时），因此直接把回调函数返回值抛出来即可。

```ts
useEffect(() => fn, []);
```

`componentWillUnmount`：相当于 useEffect 里面返回的 `cleanup` 函数

```js
// componentDidMount/componentWillUnmount
useEffect(() => {
  // 需要在 componentDidMount 执行的内容
  return function cleanup() {
    // 需要在 componentWillUnmount 执行的内容
  };
}, []);
```

### componentDidUpdate

效果：通过 `useUpdate` 拿到 didUpdate 周期才执行的回调函数。

```ts
useUpdate(() => {
  // quite similar to `componentDidUpdate`
});
```

实现：`componentDidUpdate` 等价于 `useMount` 的逻辑每次执行，除了初始化第一次。因此采用 mouting flag（判断初始状态）+ 不加限制参数确保每次 rerender 都会执行即可。

```js {3}
function useUpdate(fn) {
  // useRef 创建一个引用
  const mounting = useRef(true);
  useEffect(() => {
    if (mounting.current) {
      mounting.current = false;
    } else {
      fn();
    }
  });
}
```

### Force Update

效果：这个最有意思了，我希望拿到一个函数 `update`，每次调用就强制刷新当前组件。

```ts
const update = useUpdate();
```

实现：我们知道 `useState` 下标为 1 的项是用来更新数据的，而且就算数据没有变化，调用了也会刷新组件，所以我们可以把返回一个没有修改数值的 `setValue`，这样它的功能就仅剩下刷新组件了。

```ts
const useUpdate = () => useState(0)[1];
```

> 对于 `getSnapshotBeforeUpdate`, `getDerivedStateFromError`, `componentDidCatch` 目前 Hooks 是无法模拟的。

### isMounted

很久以前 React 是提供过这个 API 的，后来移除了，原因是可以通过 `componentWillMount` 和 `componentWillUnmount` 推导。自从有了 React Hooks，支持 isMount 简直是分分钟的事。

效果：通过 `useIsMounted` 拿到 `isMounted` 状态。

```ts
const isMounted = useIsMounted();
```

实现：看到这里的话，应该已经很熟悉这个套路了，`useEffect` 第一次调用时赋值为 true，组件销毁时返回 false，注意这里可以加第二个参数为空数组来优化性能。

```ts
const [isMount, setIsMount] = useState(false);
useEffect(() => {
  if (!isMount) {
    setIsMount(true);
  }
  return () => setIsMount(false);
}, []);
return isMount;
```

## 14. Hooks api

### useCallback 记忆函数

useCallback：如果你需要一个不会随着组件更新而重新创建的 callback

效果：通过 `useInputValue()` 拿到 Input 框当前用户输入的值，而不是手动监听 onChange 再腾一个 `otherInputValue` 和一个回调函数把这一堆逻辑写在无关的地方。

```tsx
let name = useInputValue('Jamie');
// name = { value: 'Jamie', onChange: [Function] }
return <input {...name} />;
```

可以看到，这样不仅没有占用组件自己的 state，也不需要手写 onChange 回调函数进行处理，这些处理都压缩成了一行 use hook。

实现：读到这里应该大致可以猜到了，利用 `useState` 存储组件的值，并抛出 `value` 与 `onChange`，监听 `onChange` 并通过 `setValue` 修改 `value`, 就可以在每次 `onChange` 时触发调用组件的 rerender 了。

```tsx
function useInputValue(initialValue) {
  let [value, setValue] = useState(initialValue);
  let onChange = useCallback(function (event) {
    setValue(event.currentTarget.value);
  }, []);

  return {
    value,
    onChange,
  };
}
```

这里要注意的是，我们对组件增强时，**组件的回调一般不需要销毁监听，而且仅需监听一次，这与 DOM 监听不同**，因此大部分场景，我们需要利用 `useCallback` 包裹，并传一个空数组，来保证永远只监听一次，而且不需要在组件销毁时注销这个 callback。

### useContext 减少组件层级

在以前组件树种，跨层级祖先组件想要给孙子组件传递数据的时候，除了一层层 props 往下透传之外，我们还可以使用 React Context API 来帮我们做这件事

```jsx
const { Provider, Consumer } = React.createContext(null);
function Bar() {
  return <Consumer>{color => <div>{color}</div>}</Consumer>;
}
function Foo() {
  return <Bar />;
}
function App() {
  return (
    <Provider value={'grey'}>
      <Foo />
    </Provider>
  );
}
```

通过 React createContext 的语法，在 APP 组件中可以跨过 Foo 组件给 Bar 传递数据。而在 React Hooks 中，我们可以使用 `useContext` 进行改造

```jsx
const colorContext = React.createContext('gray');
function Bar() {
  const color = useContext(colorContext);
  return <div>{color}</div>;
}
function Foo() {
  return <Bar />;
}
function App() {
  return (
    <colorContext.Provider value={'red'}>
      <Foo />
    </colorContext.Provider>
  );
}
```

传递给 useContext 的是 context 而不是 consumer，返回值即是想要透传的数据了。用法很简单，使用 useContext 可以解决 Consumer 多状态嵌套的问题

```jsx
function HeaderBar() {
  return (
    <CurrentUser.Consumer>
      {user =>
        <Notifications.Consumer>
          {notifications =>
            <header>
              Welcome back, {user.name}!
              You have {notifications.length} notifications.
            </header>
          }
      }
    </CurrentUser.Consumer>
  );
}
```

而使用 useContext 则变得十分简洁，可读性更强且不会增加组件树深度。

```jsx
function HeaderBar() {
  const user = useContext(CurrentUser);
  const notifications = useContext(Notifications);
  return (
    <header>
      Welcome back, {user.name}! You have {notifications.length} notifications.
    </header>
  );
}
```

### useReducer

以下是用 reducer 重写 useState 一节的计数器示例：

```js {17}
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
```

### useMemo 记忆组件

useCallback 的功能完全可以由 useMemo 所取代，如果你想通过使用 useMemo 返回一个记忆函数也是完全可以的。

```js
useCallback(fn, inputs) is equivalent to useMemo(() => fn, inputs).
```

```js
function App() {
  const memoizedHandleClick = useMemo(
    () => () => {
      console.log('Click happened');
    },
    []
  ); // 空数组代表无论什么情况下该函数都不会发生改变
  return <SomeComponent onClick={memoizedHandleClick}>Click Me</SomeComponent>;
}
```

唯一的区别是：**useCallback 不会执行第一个参数函数，而是将它返回给你，而 useMemo 会执行第一个函数并且将函数执行结果返回给你**。所以在前面的例子中，可以返回 handleClick 来达到存储函数的目的。

所以 useCallback 常用记忆事件函数，生成记忆后的事件函数并传递给子组件使用。而 useMemo 更适合经过函数计算得到一个确定的值，比如记忆组件。

```js
function Parent({ a, b }) {
  // Only re-rendered if `a` changes:
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // Only re-rendered if `b` changes:
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  );
}
```

当 a/b 改变时，child1/child2 才会重新渲染。从例子可以看出来，只有在第二个参数数组的值发生变化时，才会触发子组件的更新。

### useRef 保存引用值

useRef 跟 createRef 类似，都可以用来生成对 DOM 对象的引用

```js
import React, { useState, useRef } from 'react';
function App() {
  let [name, setName] = useState('Nate');
  let nameRef = useRef();
  const submitButton = () => {
    setName(nameRef.current.value);
  };
  return (
    <div className="App">
      <p>{name}</p>

      <div>
        <input ref={nameRef} type="text" />
        <button type="button" onClick={submitButton}>
          Submit
        </button>
      </div>
    </div>
  );
}
```

useRef 返回的值传递给组件或者 DOM 的 ref 属性，就**可以通过 ref.current 值访问组件或真实的 DOM 节点**，重点是组件也是可以访问到的，从而可以对 DOM 进行一些操作，比如监听事件等等。

当然 useRef 远比你想象中的功能更加强大，useRef 的功能有点像类属性，或者说您想要在组件中记录一些值，并且这些值在稍后可以更改。

利用 useRef 就可以绕过 Capture Value 的特性。可以认为 ref 在所有 Render 过程中保持着唯一引用，因此所有对 ref 的赋值或取值，拿到的都只有一个最终状态，而不会在每个 Render 间存在隔离。

React Hooks 中存在 Capture Value 的特性：

```js
function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      alert('count: ' + count);
    }, 3000);
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>增加 count</button>
      <button onClick={() => setCount(count - 1)}>减少 count</button>
    </div>
  );
}
```

先点击增加 button，后点击减少 button，3 秒后先 alert 1，后 alert 0，而不是 alert 两次 0。这就是所谓的 capture value 的特性。而在**类组件**中 3 秒后输出的就是修改后的值，因为这时候**message 是挂载在 this 变量上，它保留的是一个引用值**，对 this 属性的访问都会获取到最新的值，类组件举例，在线 Demo。讲到这里你应该就明白了，useRef 创建一个引用，就可以有效规避 React Hooks 中 Capture Value 特性。

```js
function App() {
  const count = useRef(0);

  const showCount = () => {
    alert('count: ' + count.current);
  };

  const handleClick = number => {
    count.current = count.current + number;
    setTimeout(showCount, 3000);
  };

  return (
    <div>
      <p>You clicked {count.current} times</p>
      <button onClick={() => handleClick(1)}>增加 count</button>
      <button onClick={() => handleClick(-1)}>减少 count</button>
    </div>
  );
}
```

只要将赋值与取值的对象变成 useRef，而不是 useState，就可以躲过 capture value 特性，在 3 秒后得到最新的值。

### useImperativeHandle 透传 Ref

通过 useImperativeHandle 用于让父组件获取子组件内的索引

```js
import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
function ChildInputComponent(props, ref) {
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => inputRef.current);
  return <input type="text" name="child input" ref={inputRef} />;
}
const ChildInput = forwardRef(ChildInputComponent);
function App() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div>
      <ChildInput ref={inputRef} />
    </div>
  );
}
```

通过这种方式，App 组件可以获得子组件的 input 的 DOM 节点。

### useLayoutEffect 同步执行副作用

大部分情况下，使用 useEffect 就可以帮我们处理组件的副作用，但是如果想要同步调用一些副作用，比如对 DOM 的操作，就需要使用 useLayoutEffect，useLayoutEffect 中的副作用会在 DOM 更新之后同步执行。

```js
function App() {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const title = document.querySelector('#title');
    const titleWidth = title.getBoundingClientRect().width;
    console.log('useLayoutEffect');
    if (width !== titleWidth) {
      setWidth(titleWidth);
    }
  });
  useEffect(() => {
    console.log('useEffect');
  });
  return (
    <div>
      <h1 id="title">hello</h1>
      <h2>{width}</h2>
    </div>
  );
}
```

在上面的例子中，useLayoutEffect 会在 render，DOM 更新之后同步触发函数，会优于 useEffect 异步触发函数。

## 15. useEffect 和 useLayoutEffect 有什么区别？

**简单来说就是调用时机不同，`useLayoutEffect`和原来`componentDidMount` & `componentDidUpdate`一致，在 react 完成 DOM 更新后马上同步调用的代码，会阻塞页面渲染。而 useEffect 是会在整个页面渲染完才会调用的代码。**

官方建议优先使用`useEffect`

在实际使用时如果想**避免页面抖动**（在`useEffect`里修改 DOM 很有可能出现）的话，可以把需要操作 DOM 的代码放在`useLayoutEffect`里。

不过`useLayoutEffect`在服务端渲染时会出现一个 warning，要消除的话得用 useEffect 代替或者推迟渲染时机。

## 16. 自定义 Hook

自定义`hooks`可以说成是一种约定而不是功能。当一个函数以`use`开头并且在函数内部调用其他 hooks，那么这个函数就可以成为自定义 hooks，比如说`useSomething`。

自定义 Hooks 可以封装状态，能够更好的实现状态共享。

我们来封装一个数字加减的 Hook

```js
const useCount = num => {
  let [count, setCount] = useState(num);
  return [count, () => setCount(count + 1), () => setCount(count - 1)];
};
```

这个自定义 Hook 内部使用 useState 定义一个状态，返回一个数组，数组中有状态的值、状态++的函数，状态--的函数。

```js
const CustomComp = () => {
  let [count, addCount, redCount] = useCount(1);

  return (
    <>
      <h1>{count}</h1>
      <button onClick={addCount}> + </button>
      <button onClick={redCount}> - </button>
    </>
  );
};
```

主函数中使用解构赋值的方式接受这三个值使用，这是一种非常简单的自定义 Hook。如果项目大的话使用自定义 Hook 会抽离可以抽离公共代码，极大的减少我们的代码量，提高开发效率。

## 17. 如何管理 redux 之间不同模块的数据

1. 利用 store 存储数据信息，利用 store.getState()得到当前的状态值
   导入 redux 中的 createStore 方法,创建一个 store
   ```js
   import { createStore } from 'redux';
   const store = createStore();
   ```
2. state 是 store 某一个时刻的数据值，store 里面的数据变更会触发 store.subscribe 中回调函数，在里面设置 setState 引发 view 更新
3. 定义 action 类型 type 和携带的数据，action 是一个对象里面必须有 type 属性,它标识了 action 类型名称，也可以用函数生成 action
   ```js
   const action = {
     type: 'CHANGE',
     data: 'data',
   };
   //another way to create a action with function
   function actionsCreator(obj) {
     return {
       type: 'CHANGE',
       name: obj.name,
       pass: obj.pass,
     };
   }
   ```
4. view 中触发 store 改变。store.dispatch(action)给 dispatch 方法传入 action 来更新 store 中数据（dispatch 是触发更新，action 是定义更新类型，action 类似于定义 domEvent 中的事件类型 click 、onload、onchange······有很多类型,但是触发还需要调用 store.dispatch）
5. 在 createStore 中传入一个函数作为参数（必须），这个函数是 reducer，定义 dispatch 某个 action 后 state 针对这个 action 如何更新.
   reducer(initialState,action)。由于它的功能是根据初始 state 和 action 类型生成更新后的 state,它接收初始 initialState,action 作为参数

## 18. 讲一下使用 redux-saga 控制数据流的具体需求的实现

redux-saga 写一个 hellosaga
跟 redux-thunk,redux-saga 是控制执行的 generator，在 redux-saga 中 action 是原始的 js 对象，把所有的异步副作用操作放在了 saga 函数里面。这样既统一了 action 的形式，又使得异步操作集中可以被集中处理。

redux-saga 是通过 genetator 实现的，如果不支持 generator 需要通过插件 babel-polyfill 转义。我们接着来实现一个输出 hellosaga 的例子。

1. 创建一个 helloSaga.js 文件
   ```js
   export function* helloSaga() {
     console.log('Hello Sagas!');
   }
   ```
2. 在 redux 中使用 redux-saga 中间件  
   在 main.js 中：
   ```js
   import { createStore, applyMiddleware } from 'redux';
   import createSagaMiddleware from 'redux-saga';
   import { helloSaga } from './sagas';
   const sagaMiddleware = createSagaMiddleware();
   const store = createStore(reducer, applyMiddleware(sagaMiddleware));
   sagaMiddleware.run(helloSaga);
   //会输出Hello, Sagas!
   ```

和调用 redux 的其他中间件一样，如果想使用 redux-saga 中间件，那么只要在 applyMiddleware 中调用一个 createSagaMiddleware 的实例。唯一不同的是需要调用 run 方法使得 generator 可以开始执行。

## 19. redux 与 mobx 的区别?

两者对比:

- 都有统一维护管理应用状态的能力
- 设计思想的不同
  - Redux 更多的是遵循函数式编程思想
  - Mobx 设计更多偏向于面向对象编程和响应式编程，通常将状态包装成可观察对象，一旦状态对象变更，就能自动获得更新。
- 对 store 管理的不同
  - Redux 将所有共享的数据集中在一个大的 store 中，统一管理
  - Mobx 是按模块将状态划分出多个独立的 store 进行管理
- 数据可变性的不同
  - redux 使用 plain object 保存数据，需要手动处理变化后的操作；
  - mobx 适用 observable 保存数据，数据变化后自动处理响应的操作
  - Redux 强调的是对象的不可变性，不能直接操作状态对象，而是在原来状态对象的基础上返回一个新的状态对象，最后返回应用的上一状态
  - Mobx 中可以直接使用新值更新状态对象
- mobx 相对来说比较简单，在其中有很多的抽象，mobx 更多的使用面向对象的编程思维；redux 会比较复杂，因为其中的函数式编程思想掌握起来不是那么容易，同时需要借助一系列的中间件来处理异步和副作用
- mobx 中有更多的抽象和封装，调试会比较困难，同时结果也难以预测；而 redux 提供能够进行时间回溯的开发工具，同时其纯函数以及更少的抽象，让调试变得更加的容易

场景辨析:

基于以上区别,我们可以简单得分析一下两者的不同使用场景.

- mobx 更适合数据不复杂的应用: mobx 难以调试,很多状态无法回溯,因为数据只有一份引用，面对复杂度高的应用时,往往力不从心.
- redux 适合有回溯需求的应用: 比如一个画板应用、一个表格应用，很多时候需要撤销、重做等操作，由于 redux 不可变的特性，天然支持这些操作.
- mobx 适合短平快的项目: mobx 上手简单,样板代码少,可以很大程度上提高开发效率.
- 当然 mobx 和 redux 也并不一定是非此即彼的关系,你也可以在项目中用 redux 作为全局状态管理,用 mobx 作为组件局部状态管理器来用.

## 20. Redux 和 vuex 有什么区别？

vuex 改进了 redux 中的`action`和`reducer`函数，以`mutation`变化函数取代`reducer`，无需 switch，只需在对应的 mutation 函数里改变 state 值即可。

## 21. Redux 的中间件

Redux middleware 提供了一个分类处理 action 的机会

redux 中间件指的是 action 和 store 之间。即 dispatch 的封装和升级。

redux 中关于 applyMiddleware 的源码

```js
export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    // 利用传入的createStore和reducer和创建一个store
    const store = createStore(...args);
    let dispatch = () => {
      throw new Error();
    };
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args),
    };
    // 让每个 middleware 带着 middlewareAPI 这个参数分别执行一遍
    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    // 接着 compose 将 chain 中的所有匿名函数，组装成一个新的函数，即新的 dispatch
    dispatch = compose(...chain)(store.dispatch);
    return {
      ...store,
      dispatch,
    };
  };
}
```

applyMiddleware 这个函数的核心就在于在于组合 compose，通过将不同的 middlewares 一层一层包裹到原生的 dispatch 之上，然后对 middleware 的设计采用柯里化的方式，以便于 compose ，从而可以动态产生 next 方法以及保持 store 的一致性。

```js
const doNothingMidddleware = ({ dispatch, getState }) => next => action =>
  next(action);
```

**redux-thunk 实现**

```js
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
}
const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
export default thunk;
```

**redux-logger 雏形**

```js
const addLoggingToDispatch = store => {
  const next = store.dispatch;

  if (!console.group) {
    return next;
  }

  // 返回的函数就是添加更新日志之后的全新dispatch
  return action => {
    // 按照action类型进行输出分组，保证同一个action下拥有相同的日志title
    console.group(action.type);
    // 打印更新前的state
    console.log('%c previous state', 'color: gray', store.getState());
    // 打印当前action
    console.log('%c action', 'color: blue', action);

    // 调用原始的dispatch并记录返回值
    const returnValue = next(action);

    // 打印更新后的state
    console.log('%c next state', 'color: green', store.getState());

    console.group(action.type);

    return returnValue;
  };
};
```

## 22. 为什么 redux 能做到局部渲染呢？

Redux 将 React 组件分为容器型组件和展示型组件。容器型组件一般通过 connet 函数生成，它订阅了全局状态的变化，通过 mapStateToProps 函数，我们可以对全局状态进行过滤，只返回该容器型组件关注的局部状态：

```js
function mapStateToProps(state) {
  return { todos: state.todos };
}
module.exports = connect(mapStateToProps)(TodoApp);
```

每一次全局状态变化都会调用所有容器型组件的 mapStateToProps 方法，该方法返回一个常规的 Javascript 对象，并将其合并到容器型组件的 props 上。

而展示型组件不直接从 global state 获取数据，其数据来源于父组件。当容器型组件对应 global state 有变化时，它会将变化传播到其所有的子组件(一般为展示型组件)。简单来说容器型组件与展示型组件是父子关系

## 23. mapStateToProps 和 mapDispatchToProps

```js
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = ({paymentApproval}) => ({paymentApproval});

const mapDispatchToProps = dispatch => bindActionCreators({
    paymentApprovalSpecialGet,  paymentapprovalclear
}, dispatch);


// or
const mapDispatchToProps = (dispatch, ownProps) => return {
  onFirstAct: () => dispatch({
    type: "FIRST_ACTION",
    data: ownProps.data
  })
}
```

## 24. Redux connect 方法隐藏的性能优化思想

对于复杂类型，比如在 mapStateToProps 中导出一个对象，则比较的是内存地址，而不是“值是否相等”

```js
connect(state => ({
  computedDate: {
    height: state.height,
    width: state.width,
  },
}))(someComponent);
```

官方对 connect 的语法应用解读为：

```js
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options]);
```

秘密就在最后一个参数 options 中：

```js
[options] = {
  pure = true,
  areStatesEqual = strictEqual,
  areOwnPropsEqual = shallowEqual,
  areStatePropsEqual = shallowEqual,
  areMergePropsEqual = shallowEqual,
  ...extraOptions
}
```

在 options 中，支持自定义`areStatesEqual`函数，以便进行前后两次 state 比较。 areStatesEqual 函数接收两个参数，第一个是前一个 state,第二个是后一个 state。 如果该函数的返回值为 true, 那么 mapStateToProps 方法便不再执行，以为规避了不必要的渲染。

结合场景，我们可以通过以下代码来实现

```js
connect(
  state => ({
    computedData: {
      height: state.height,
      width: state.width,
    },
  }),
  [mapDispatchToProps],
  [mergeProps],
  {
    areStatesEqual: (prev, next) => {
      return prev.height === next.height && prev.widht === next.width;
    },
  }
)(someComponent);
```

## 25. compose 方法接收了 chain 数组和原始的 store.dispatch 方法

```js
export default function compose(...) {
  if(funcs.length === 0) {
    return arg => arg
  }

  if(funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```

实际上 compose 方法就是把多个中间件串联起来, 就像：

```js
middlewareA(middlewareB(middlewareC(store.dispatch)));
```

这是只有三个中间件 middlewareA、 middlewareB、 middlewareC 的情况，关于更多中间的情况，依次类推

## 26. React 中的 refs 在源码中是如何创建的

Refs 是 React 提供给我们安全的访问 DOM 元素或者某个组件实例的句柄,我们可以为元素添加 ref 属性然后在回调函数中接收该元素在 DOM 树中的句柄,该值会作为回调函数的第一个参数的返回.

**用法**  
我们在 getRender()返回的 JSX 中，可以在标签中加入 ref 属性，然后通过 refs.ref 就可以访问到我们的 Component 了，例如。

```js
class Parent extends React.Component {
  getRender() {
    <div>
      <Child ref="child" />
    </div>;
  }

  componentDidMount() {
    // 通过refs可以拿到子元素,然后就可以访问到子元素的方法了
    let child = this.refs.child;
    child.test();
  }
}

class Child extends React.Component {
  test() {
    console.log('child method called by ref');
  }
}
```

### attachRef 将子组件引用保存到父组件 refs 对象中

refs 的用法很简单，只需要 JSX 中定义好 ref 属性即可。那么首先一个问题来了，refs 这个对象在哪儿定义的呢？还记得 createClass 方法的 constructor 吧，它里面会定义并初始化 refs 对象。源码如下

```js
createClass: function (spec) {
    // 自定义React类的构造方法，通过它创建一个React.Component对象
    var Constructor = identity(function (props, context, updater) {

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      // refs初始化为一个空对象
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      // 调用getInitialState初始化state
      this.state = null;
      var initialState = this.getInitialState ? this.getInitialState() : null;
      this.state = initialState;
    });
    ...
}
```

从上面代码可见，每次创建自定义组件的时候，都会初始化一个为空的 refs 对象。那么第二个问题来了，ref 字符串所指向的对象的引用，是什么时候加入到 refs 对象中的呢？答案就在 ReactCompositeComponent 的 attachRef 方法中，源码如下

```js
  attachRef: function(ref, component) {
    // getPublicInstance返回我们的父组件
    var inst = this.getPublicInstance();
    var publicComponentInstance = component.getPublicInstance();
    var refs = inst.refs === emptyObject ? (inst.refs = {}) : inst.refs;
    // 将子元素的引用，以ref属性为key,保存到父元素的refs对象中
    refs[ref] = publicComponentInstance;
  },
```

attachRef 方法又是什么时候被调用的呢？我们这儿就不源码分析了。大概说下，mountComponent 中，如果 element 的 ref 属性不为空，则会以 transaction 事务的方式调用 attachRefs 方法，而 attachRefs 方法中则会调用 attachRef 方法，将子组件的引用保存到父组件的 refs 对象中。

### detachRef 从父组件 refs 对象中删除子组件引用

对内存管理有些了解的同学肯定会有疑惑，既然父组件的 refs 中保存了子组件引用，那么当子组件被 unmountComponent 而销毁时，子组件的引用仍然保存在 refs 对象中，岂不是会导致内存泄漏？React 当然不会有这个 bug 了，秘密就在 detachRef 方法中，源码如下

```js
  detachRef: function(ref) {
    var refs = this.getPublicInstance().refs;
    // 从refs对象中删除key为ref子元素,防止内存泄漏
    delete refs[ref];
  },
```

代码很简单，delete 掉 ref 字符串指向的成员即可。至于 detachRef 的调用链，我们还得从 unmountComponent 方法说起。unmountComponent 会调用 detachRefs 方法，而 detachRefs 中则会调用 detachRef，从而将子元素引用从 refs 中释放掉，防止内存泄漏。也就是说在 unmountComponent 时，React 自动帮我们完成了子元素 ref 删除，防止内存泄漏。

## 27. React 中 constructor 中 super 的作用，super 是否一定要写 props，谈谈原因

- constructor( )——构造方法  
   这是 ES6 对类的默认方法，通过 new 命令生成对象实例时自动调用该方法。并且，该方法是类中必须有的，如果没有显示定义，则会默认添加空的 constructor( )方法。
- super( ) ——继承  
   在 class 方法中，继承是使用 extends 关键字来实现的。子类 必须 在 constructor( )调用 super( )方法，否则新建实例时会报错。  
   super() 可以让我们使用 this 来调用各种东西， 而 super(props)可以让我们在 this 的基础上使用构造函数里面的东西， 或者从父元素那边传过来的一些属性  
   如果只调用了 super()，那么 this.props 在 super()和构造函数结束之间仍是 undefined。

报错的原因是：子类是没有自己的 this 对象的，它只能继承自父类的 this 对象，然后对其进行加工，而 super( )就是将父类中的 this 对象继承给子类的。没有 super，子类就得不到 this 对象。

在 constructor 中使用 this.props 的时候，super 需要加入(props)

可以不写 constructor，一旦写了 constructor，就必须在此函数中写 super(),此时组件才有自己的 this，在组件的全局中都可以使用 this 关键字，否则如果只是 constructor 而不执行 super() 那么以后的 this 都是错的！！！

## 28. 谈谈 React 中受控组件和非受控组件以及 Vue 中双向绑定的区别

受控组件就是可以被 react 状态控制的组件  
在 react 中，Input textarea 等组件默认是非受控组件（输入框内部的值是用户控制，和 React 无关）。但是也可以转化成受控组件，就是通过 onChange 事件获取当前输入内容，将当前输入内容作为 value 传入，此时就成为受控组件。  
好处：可以通过 onChange 事件控制用户输入，使用正则表达式过滤不合理输入。

**双向数据绑定就是受控组件**

### 受控组件 DOM 操作、双向数据绑定

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Input extends Component {
  constructor() {
    super();
    this.state = { val: '' };
  }
  handleChange = event => {
    let val = event.target.value;
    this.setState({ val });
  };

  render() {
    return (
      <div>
        <p>{this.state.val}</p>
        <input
          type="text"
          value={this.state.val}
          onChange={this.handleChange}
        /> //input就是受控组件 被状态对象的属性控制
      </div>
    );
  }
}

ReactDOM.render(<Input />, window.app);
```

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Sum extends Component {
  constructor() {
    super();
    this.state = { a: 0, b: 0, result: 0 };
  }
  handleChangeA = event => {
    this.setState({
      a: parseInt(event.target.value),
      result: parseInt(event.target.value) + this.state.b,
    });
  };
  handleChangeB = event => {
    this.setState({
      b: parseInt(event.target.value),
      result: parseInt(event.target.value) + this.state.a,
    });
  };
  render() {
    return (
      <div>
        <input type="text" value={this.state.a} onChange={this.handleChangeA} />{' '}
        +
        <input
          type="text"
          value={this.state.b}
          onChange={this.handleChangeB}
        /> =
        <input type="text" value={this.state.result} />
      </div>
    );
  }
}

ReactDOM.render(<Sum />, window.app);
```

### 非受控组件 DOM 操作

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Sum extends Component {
  handleChange = event => {
    let a = parseInt(this.refs.a.value || 0);
    let b = parseInt(this.refs.b.value || 0);
    this.refs.result.value = a + b;
  };
  render() {
    return (
      //经过React封装可以onChange可以写在div上
      <div onChange={this.handleChange}>
        <input type="text" ref="a" /> +
        <input type="text" ref="b" /> =
        <input type="text" ref="result" />
      </div>
      //input是非受控组件，因为不受状态控制
    );
  }
}

ReactDOM.render(<Sum />, window.app);
```

## 29. 谈谈 jsx 的深刻认识，总结出优点

JSX 是一种 JavaScript 的语法扩展

使用 JSX 的优点

1. JSX 执行更快，因为它在编译为 JavaScript 代码后进行了优化
2. JSX 是类型安全的，在编译过程中就能发现错误
3. 使用 JSX 编写模板更简单快速

## 30. React 订阅(sub)/发布(pub)实现原理是什么

```js
class PubSub {
  constructor() {
    this.eventList = {};
  }

  on(eventName, handle) {
    if (!(eventName in this.eventList)) {
      this.eventList[eventName] = [];
    }

    this.eventList[eventName].push(handle);

    return this;
  }

  emit(eventName, ...data) {
    const currentEvent = this.eventList[eventName];

    if (Object.prototype.toString.call(currentEvent) !== '[object Array]') {
      return false;
    }

    currentEvent.forEach(item => {
      item.apply(null, data);
    });

    return this;
  }
}

const pubsub = new PubSub();

// 订阅A事件
pubsub.on('A', (...args) => {
  console.log(args);
});

// 订阅B事件
pubsub.on('B', (...args) => {
  console.log(args);
});

// 发布A事件
pubsub.emit('A', {
  name: 'zhaoyiming',
  work: 'FE',
});

// 发布B事件
pubsub.emit('B', 'event B');
```

## 31. 为什么不直接更新 state 状态，源码中式如何解读的？

setState 是组件原型链上的方法，参数为 partialState, callback，看样子长得还是比较 55 开的，参数也不多。提前预告几个参数，\_pendingStateQueue, dirtyComponents, isBatchingUpdates, internalInstance, transaction

```js
ReactComponent.prototype.setState = function (partialState, callback) {
  !(
    typeof partialState === 'object' ||
    typeof partialState === 'function' ||
    partialState == null
  )
    ? 'development' !== 'production'
      ? invariant(
          false,
          'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
        )
      : _prodInvariant('85')
    : void 0;
  this.updater.enqueueSetState(this, partialState);
  // 如果有回调函数，在状态进行更新后执行
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};
```

## 32. React 中调用 setState 之后发生了什么事情?

调用 setState >> 将传入参数与组件当前状态合并 >> 触发 Reconciliation 调和过程(生成最终状态) >> 高效构建虚拟 DOM,并准备 renderUI 界面 >> 计算新旧 DOM 异同 >> 根据异同进行 render 不同点 >> 完成按需更新

在代码中调用 setState 函数之后，React 会将传入的参数对象与组件当前的状态合并，然后触发所谓的调和过程（Reconciliation）。经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个 UI 界面。在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。

setState 通过一个队列机制实现 state 更新。当执行 setState 时，会将需要更新的 state 合并后放入状态队列，而不会立刻更新 this.state，队列机制可以高效地批量更新 state。如果不通过 setState 而直接修改 this.state 的值，那么该 state 将不会被放入状态队列中，当下次调用 setState 并对状态队列进行合并时，将会忽略之前直接被修改的 state,而造成无法预知的错误。因此，应该使用 setState 方法来更新 state,同时 React 也正是利用状态队列机制实现了 setState 的异步更新，避免频繁的重复更新 state。相关代码如下：

```js
// 将新的state合并到状态更新队列中
var nextState = this._processPendingState(nextProps, nextContext);

// 根据更新队列和 shouldComponentUpdate 的状态来判断是否需要更新组件
var shouldUpdate =
  this._pendingForceUpdate ||
  !inst.shouldComponentUpdate ||
  inst.shouldComponentUpdate(nextProps, nextState, nextContext);
```

## 33. react 中的 setState 批量更新的过程是什么？

在 React 的生命周期和合成事件执行前后都有相应的钩子，分别是`pre钩子`和`post钩子`，pre 钩子会调用`batchedUpdate`方法将`isBatchingUpdates`变量置为`true`，开启批量更新，而 post 钩子会将`isBatchingUpdates`置为`false`

`isBatchingUpdates`变量置为 true，则会走批量更新分支，setState 的更新会被存入队列中，待同步代码执行完后，再执行队列中的 state 更新。

而在原生事件和异步操作中，不会执行 pre 钩子，或者生命周期的中的异步操作之前执行了 pre 钩子，但是 pos 钩子也在异步操作之前执行完了，`isBatchingUpdates`必定为 false，也就不会进行批量更新。

## 34. 模态框 && 插槽(Portals)

```js
class Modal extends Component {
  componentDidMount() {
    this.modalTarget = document.createElement('div');
    this.modalTarget.className = 'modal';
    document.body.appendChild(this.modalTarget);
    this.renderModal();
  }
  componentWillUpdate() {
    this.renderModal();
  }
  componentWillUnmount() {
    ReactDom.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  renderModal() {
    ReactDom.render(<div>{this.props.children}</div>, this.modalTarget);
  }

  render() {
    return <noscript />;
  }
  // 在真正的render方法中，不渲染任何实质的内容，而是return <noscript />,或者直接return null
}
```

```js
render() {
  return ReactDom.createPortal(
    this.props.children,
    anyDomNode
  );
}
```

对于 `portal` 的一个典型用例是当父组件有 `overflow: hidden` 或 `z-index` 样式，但你需要子组件能够在视觉上 “`跳出(break out)`” 其容器。例如，对话框、hovercards 以及提示框。所以一般 react 组件里的模态框，就是这样实现的

1. 首先简单的介绍下 react 中的插槽（Portals），通过`ReactDOM.createPortal(child, container)`创建，是 ReactDOM 提供的接口，可以实现将子节点渲染到父组件 DOM 层次结构之外的 DOM 节点。
2. 第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 片段(fragment)。第二个参数（container）则是一个 DOM 元素。
3. 对于 portal 的一个典型用例是当父组件有 overflow: hidden 或 z-index 样式，但你需要子组件能够在视觉上 “跳出(break out)” 其容器。例如，对话框、hovercards 以及提示框。所以一般 react 组件里的模态框，就是这样实现的。

## 35. 在 react 使用 HOC 有遇到过哪些问题？如何解决？

1. 当有多个 HOC 一同使用时，无法直接判断子组件的 props 是哪个 HOC 负责传递的。
2. 重复命名的问题：若父子组件有同样名称的 props，或使用的多个 HOC 中存在相同名称的 props，则存在覆盖问题，而且 react 并不会报错。当然可以通过规范命名空间的方式避免。
3. 可以发现 HOC 产生了许多无用的组件，加深了组件层级。
4. 不要修改原始组件，使用组合进行功能扩展
5. 无关的 props 传入到原始组件
6. 包装组件的显示名称来方便调试
7. 不要在 render 方法里面调用 HOC 方法
8. 静态方法必须被拷贝

```javascript
import React, { Component } from 'react';

export default (WrappedComponent, name) => {
  class NewComponent extends Component {
    constructor() {
      super();
      this.state = { data: null };
    }

    componentWillMount() {
      let data = localStorage.getItem(name);
      this.setState({ data });
    }

    render() {
      return <WrappedComponent data={this.state.data} />;
    }
  }
  return NewComponent;
};
```

现在 `NewComponent` 会根据第二个参数 `name` 在挂载阶段从 LocalStorage 加载数据，并且 `setState` 到自己的 `state.data` 中，而渲染的时候将 `state.data` 通过 `props.data` 传给 `WrappedComponent`。

## 36. HOC

定义高阶组件的意义：

1.  重用代码
2.  修改现有 React 组件的行为

根据返回的新组件和传入组件的关系，高阶组件的实现方式可以分为两大类：

1.  代理方式的高阶组件
2.  继承方式的高级组件

代理方式的高阶组件可以应用在下列场景中：

1.  操纵 props
2.  访问 ref
3.  抽取状态
4.  包装组件

继承方式的高级组件可以应用于下列场景：

1. 操纵 props
   ```js
   function removeUserProp(WrappedComponent) {
     return class NewComponent extends WrappedComponent {
       render() {
         const { user, ...otherProps } = this.props;
         this.props = otherProps;
         return super.render();
       }
     };
   }
   ```
2. 操纵生命周期函数

   ```js
   // 例如定义一个高阶组件，让参数组件只有在用户登录时才显示
   const onlyForLoggedHOC = WrappgedComponent => {
     return class NewComponent extends WrappgedComponent {
       render() {
         if (this.props.loggedIn) {
           return super.render();
         } else {
           return null;
         }
       }
     };
   };
   ```

   又例如，我们可以重新定义 shouldComponentUpdate 函数，只要 prop 中的 useCache 不为逻辑 false 就不做重新渲染的动作，代码如下

   ```js
   const cacheHOC = WrappedComponent => {
     return class NewComponent extends WrappedComponent {
       shouldComponentUpdate(nextProps, nextState) {
         return !nextProps.useCache;
       }
     };
   };
   ```

代理方式和继承方式最大的区别： 是使用被包裹组件的方式

- 在代理方式下，render 函数中使用被包裹组件是通过 JSX 代码
  ```js
  return <WrappedComponent {....otherProps} />
  ```
- 在继承方式下，render 函数中渲染被包裹组件的代码如下：
  ```js
  return super.render();
  ```
- 在代理方式下 WrappedComponent 经历了一个完整的生命周期，但在继承方式下 super.render 只是一个生命周期中的一个函数而已； 在代理方式下产生的新组件和参数组件时两个不同的组件，一次渲染，两个组件都要经历各自的生命周期，继承方式下两者合二为一，只有一个生命周期

为了在开发和调试阶段更好的区别包装了不同组件的高阶组件，需要对高阶组件的显示名称做自定义处理，常用的处理方式是，把被包装组件的显示名称也包到高阶组件的显示名称中，以 withPersistentData 为例：

```js
function withPersistentData(WrappedComponent) {
  return class NewComponent extends Component {
    // 结合被包装组件的名称，自定义高阶组件的名称
    static dispalyName = `HOC(${getDisplayName(WrappedComponent)})`;

    render() {
      // ...
    }
  };
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
```

## 37. React 的单元测试

```js
import ShallowRenderer from 'react-test-renderer/shallow'; // ES6
var ShallowRenderer = require('react-test-renderer/shallow'); // ES5 with npm
```

例如，如果你有如下的组件：

```js
function MyComponent() {
  return (
    <div>
      <span className="heading">Title</span>
      <Subcomponent foo="bar" />
    </div>
  );
}
```

你可以使用断言：

```js
import ShallowRenderer from 'react-test-renderer/shallow';

// 测试代码:
const renderer = new ShallowRenderer();
renderer.render(<MyComponent />);
const result = renderer.getRenderOutput();

expect(result.type).toBe('div');
expect(result.props.children).toEqual([
  <span className="heading">Title</span>,
  <Subcomponent foo="bar" />,
]);
```

## 38. 怎样在 react 中使用 innerHTML？

```
<div dangerouslySetInnerHTML={{ __html: "<div>123</div>" }} />
```

## 39. Consumer

当 Provider 提供的值更改时，Consumer 必须重新渲染

```js
import React, { createContext } from 'react';

// 创建Context的唯一方法
const ThemeContext = createContext();

class App extends React.Component {
  state = {
    theme: 'red',
  };
  render() {
    const { theme } = this.state;
    return (
      // 使用 Context.Provider 包裹后续组件，value 指定值
      <ThemeContext.Provider value={theme}>
        {/* 当Context的Provider值更改时，Consumer 的值必须重新渲染 */}
        <button
          onClick={() => {
            this.setState({ theme: 'yellow' });
          }}
        >
          按钮
        </button>
        <Middle />
      </ThemeContext.Provider>
    );
  }
}

class Bottom extends React.Component {
  render() {
    return (
      // Context.Consumer Consumer消费者使用Context得值
      // 但子组件不能是其他组件，必须渲染一个函数，函数的参数就是Context得值
      <ThemeContext.Consumer>
        {theme => <h1>ThemeContext 的 值为 {theme}</h1>}
      </ThemeContext.Consumer>
    );
  }
}

class Middle extends React.Component {
  render() {
    return <Bottom />;
  }
}

export default App;
```

## 40. React.Suspense 和 React.lazy

### React.Suspense 和 React.lazy 使用

Suspense 指的是 React 在等待组件时“suspend（暂停）”渲染，并显示加载标识的新功能。 在 React 16.6 中，Suspense 只支持一个场景：使用 `React.lazy()` 和 `<React.Suspense>` 实现的懒加载组件。

关于 Suspense 的使用，先来看下示例代码

```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

`OtherComponent` 是通过懒加载加载进来的，所以渲染页面的时候可能会有延迟，但使用了`Suspense`之后，可优化交互。

在`<OtherComponent />`外面使用`Suspense`标签，并在 fallback 中声明 OtherComponent 加载完成前做的事，即可优化整个页面的交互

fallback 属性接受任何在组件加载过程中你想展示的 React 元素。你可以将 `Suspense` 组件置于懒加载组件之上的任何位置。你甚至可以用一个 `Suspense` 组件包裹多个懒加载组件。

```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```

### 手动实现一个 React.Suspense 组件，简单版本未考虑边界情况

```js
export class Suspense extends React.Component {
  state = {
    isLoading: false,
  };

  componentDidCatch(error) {
    if (typeof error.then === 'function') {
      this.setState({ isLoading: true });
      error.then(() => {
        this.setState({ isLoading: false });
      });
    }
  }

  render() {
    const { children, fallback } = this.props;
    const { isLoading } = this.state;

    return isLoading ? fallback : children;
  }
}
```

这段代码的核心思路就是，在首次渲染 Promise 出错时使用 componentDidCatch 进行捕获，然后通过状态切换渲染 fallback 组件；在 Promise 决议之后，通过状态切换渲染目标组件。

## 41. 用 shouldComponentUpdate 模拟 PureComponent

```js
class Demo1 extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { props, state } = this;

    function shallowCompare(a, b) {
      return a === b || Object.keys(a).every(k => a[k] === b[k]);
    }

    return shallowCompare(nextProps, props) && shallowCompare(nextState, state);
  }
}

class Demo2 extends React.PureComponent {}
```

## 42. 任意组件通讯

1. 利用共同祖先
2. 状态管理
3. 利用消息中间件，就是引入一个全局消息工具，两个组件通过这个全局消息工具进行通信

   ```js
   class EventEmitter {
     constructor() {
       this.eventMap = {};
     }
     sub(name, cb) {
       const eventList = (this.eventMap[name] = this.eventMap[name] || []);
       eventList.push(cb);
     }
     pub(name, ...data) {
       (this.evnetMap[name] || []).forEach(cb => cb(...data));
     }
   }

   // 全局消息工具
   const event = new EventEmitter();

   // 一个组件
   class Element1 extends Component {
     constructor() {
       // 订阅消息
       event.sub('element2update', () => {
         console.log('element2 update');
       });
     }
   }

   // 另一个组件
   class Element2 extends Component {
     constructor() {
       // 发布消息
       setTimeout(function () {
         event.pub('element2update');
       }, 2000);
     }
   }
   ```

4. context 桥梁

   ```js
   import PropTypes from 'prop-types';

   class Child extends Component {
     // 后代组件生命需要读取context上的数据
     static contextTypes = {
       text: PropTypes.string,
     };

     render() {
       // 通过 this.context 读取 context 上的数据
       return <div>{this.context.text}</div>;
     }
   }

   class Ancestor extends Component {
     // 祖先组件生命需要context上放入数据
     static childContextTypes = {
       text: PropTypes.string,
     };

     // 祖先组件往context上放入数据
     getChildContext() {
       return {
         text: '路小二',
       };
     }
   }
   ```

## 43. asyncComponent

```jsx
import React, { Component } from 'react';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null,
      };
    }

    componentDidMount() {
      importComponent().then(mod => {
        this.setState({
          // 同时兼容ES6和CommonJS的模块
          component: mod.default ? mod.default : mod,
        });
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
```

## 44. React 的 displayName 有什么作用？

定义调试时的组件 name

```js
function withHOC(WrapComponent) {
  // 此处未定义名称或者希望动态定义名称
  return class extends React.Component {
    // 定义displayName
    static displayName = `withHOC(${
      WrapComponent.displayName || WrapComponent.name
    })`;
    render() {
      console.log('inside HOC');
      return <WrapComponent {...this.props} />;
    }
  };
}

App = withHOC(App);
```

如果未定义 displayName，那么进行调试的时候，就会显示如下：

```js
// react自动定义名称
|---_class2
  |---App
    ...
```

定义 displayName 后，显示如下：

```jsx
|---withHOC(App)
  |---App
    ...
```

## 45. 你对 Time Slice 的理解?

时间分片

- React 在渲染（render）的时候，不会阻塞现在的线程
- 如果你的设备足够快，你会感觉渲染是同步的
- 如果你设备非常慢，你会感觉还算是灵敏的
- 虽然是异步渲染，但是你将会看到完整的渲染，而不是一个组件一行行的渲染出来
- 同样书写组件的方式

## 46. diff

### diff 策略

1. 策略一： Web UI 中 DOM 节点跨层级的移动特别少，可以忽略不计
2. 策略二： 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构
3. 策略三： 对于同一层级的一组子节点，他们可以通过唯一 id 进行区分

### Tree diff

基于策略一，React 对树的算法进行了简洁明了的优化，即对树进行分层比较，两棵树只会对同一层次的节点进行比较

既然 dom 节点跨层级的移动操作少到可以忽略不计，针对这一现象，React 通过 updateDepth 对 Virtual DOM 树进行层级控制，只会对相同层级的 DOM 节点进行比较，即同一个父节点下的所有子节点。当发现节点已经不存在时，则该节点及其子节点会被完全删除掉，不会用于进一步的比较。这样只需要对树进行一次遍历，便能完成整个 DOM 树的比较

### component diff

React 是基于组件构建应用的，对于组件间的比较所采取的策略也是非常简洁、高效的

- 如果是同一类型的组件，按照原策略继续比较 Virtual DOM 树即可
- 如果不是，则将该组件判断为 dirty component,从而替换整个组件下的所有子节点
- 对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切知道这点，那么就可以节省大量的 diff 运算时间。因此，React 允许用户通过 shouldComponentUpdate()来判断该组件是否需要进行 diff 算法分析

### element diff

当节点处于同一层级时，diff 提供了 3 种节点操作，分别为 `INSERT_MARKUP`(插入)、`MOVE_EXISTING`(移动)和`REMOVE_NODE`(删除)。

- **INSERT_MARKUP**: 新的组件类型不在旧集合里，即全新的节点，需要对新节点执行插入操作
- **MOVE_EXISTING**: 旧集合中有新组件类型，且 element 是可更新的类型， generateComponent-Children 已调用 receiveComponent,这种情况下 prevChild=nextChild,就需要做移动操作，可以服用以前的 DOM 节点
- **REMOVE_NODE**: 旧组件类型，在新集合里也有，但对应的 element 不同则不能直接复用和更新，需要执行删除操作，或者旧组件不在新集合里的，也需要执行删除操作

## 47. react 是如何防止 XSS 的

`reactElement` 对象还有一个`$$typeof`属性，它是一个 `Symbol` 类型的变量`Symbol.for('react.element')`，当环境不支持 Symbol 时，`$$typeof` 被赋值为 `0xeac7`。

这个变量可以防止 XSS。如果你的服务器有一个漏洞，允许用户存储任意 JSON 对象， 而客户端代码需要一个字符串，这可能为你的应用程序带来风险。JSON 中不能存储 `Symbol` 类型的变量，而 react 渲染时会把没有`\$\$typeof` 标识的组件过滤掉。

## 48. 为什么需要 Virtual DOM

virtual DOM 是将真实的 DOM 的数据抽取出来，以对象的形式模拟树形结构

虚拟 dom 是真实 dom 的映射，是一个 Object 对象模型，用来模拟真实 dom 节点的结构

1. 创建真实 DOM 的代价高：真实的 DOM 节点 node 实现的属性很多，而 vnode 仅仅实现一些必要的属性，相比起来，创建一个 vnode 的成本比较低。
2. 频繁的 DOM 操作会触发多次重绘及回流：使用 vnode ，相当于加了一个缓冲，让一次数据变动所带来的所有 node 变化，先在 vnode 中进行修改，然后 diff 之后对所有产生差异的节点集中一次对 DOM tree 进行修改，以减少浏览器的重绘及回流。
3. 更好的跨平台，虚拟 dom 由于本质是一个 js 对象，因此天生具备跨平台的能力，可以实现在不同平台的准确显示。
4. Virtual DOM 在性能上的收益并不是最主要的，更重要的是它使得 Vue、React 具备了现代框架应有的高级特性。

## 49. 解决 redux 刷新页面数据丢失问题

1. redux 状态的持久化，保证页面刷新或者关闭后能恢复状态

   ```js
   let initialState = {};
   if (localStorage.getItem('store')) {
     initialState = JSON.parse(localStorage.getItem('store'));
   }

   // 1. Initialize
   const app = dva({
     history: browserHistory,
     initialState: initialState,
   });

   window.onunload = function () {
     localStorage.setItem('store', JSON.stringify(app._store.getState()));
   };
   ```

2. 使用 redux-persist 持久化数据存储

   ```js
   // 1. 使用redux-persist持久化数据存储
   import { createStore } from 'redux';
   import reducer from '../reducer'; //引入deducer文件
   import { persistStore, persistReducer } from 'redux-persist';
   //  存储机制，可换成其他机制，当前使用sessionStorage机制
   import storageSession from 'redux-persist/lib/storage/session';
   // import storage from 'redux-persist/lib/storage'; //localStorage机制
   //import { AsyncStorage } from 'react-native'; //react-native
   // 数据对象
   const storageConfig = {
     key: 'root', // 必须有的
     storage: storageSession, // 缓存机制
     blacklist: ['name', 'age'], // reducer 里不持久化的数据,除此外均为持久化数据
   };

   // 或者
   const storageConfig = {
     key: 'root', // 必须有的
     storage: storageSession, // 缓存机制
     whitelist: ['name', 'age'], // reducer 里持久化的数据,除此外均为不持久化数据
   };
   const myPersistReducer = persistReducer(storageConfig, reducer);
   const store = createStore(myPersistReducer);
   export const persistor = persistStore(store);
   export default store;

   // 2.在入口文件index.js里面将PersistGate标签作为父标签，如下：
   import React from 'react';
   import ReactDOM from 'react-dom';
   import Router from './router';
   import { Provider } from 'react-redux';
   import { PersistGate } from 'redux-persist/lib/integration/react';
   import configStore from './redux/store';
   import { persistor } from './redux/store';

   ReactDOM.render(
     <Provider store={configStore}>
       <PersistGate loading={null} persistor={persistor}>
         <Router />
       </PersistGate>
     </Provider>,
     document.getElementById('root')
   );
   // 这就完成了通过redux-persist实现redux持久化本地数据存储。
   ```

## 50. vue、react 与 项目框架选择

1. vue 适合 webapp，适合做用户交互多、各种动态效果变化丰富的应用。特别是 PC、手机的网页版 商城等页面。  
   原因： vue 实现逻辑复杂的功能比较简单，跟写 js 似的，而且一些效果、过度感觉很舒服。社区这部分资源也比较多、
2. react 适合 oa 系统，适合 大批量的数据展示、适合做大型应用。特别适合公司的后台操作系统。  
   原因： react 对那种比较复杂的交互，实施起来比较麻烦，没有 vue 那么方便。再就是他的渲染原理是渲染整个组件树(除非你做详细设置),所以，一方面费性能，而且代码写起来，逻辑很复杂。但是 react 对批量数据操作很厉害。还有蚂蚁的 antd，顶一个。
3. 涉及到混合开发，我个人觉得看情况。纯 H5 的混合， 用 reactNative ；如果 50%左右那种，vue+react 都可以，具体情况分析吧；10%那种，啥也别用了，直接 html+js 接入页面。
4. 项目要求的比较高的项目适合用 react。 因为 react 的社区更活跃一些，尤其是各种 UI 框架比较稳定、系统，可以信赖。Vue 的社区也很活跃，相对来说各种组件五花八门，大多数不够完善、缺乏系统性和迭代。对于项目的后期维护或者新人入手都不友好。
5. 从应用上看。react 打出来的包会大一些，相对来说，Vue 打出来的包小一些。如果项目场景对加载速度有要求，建议用 Vue

## 51. react 和 vue 的区别

- **数据是否可变**: react 整体是函数式的思想，把组件设计成纯组件，状态和逻辑通过参数传入，所以在 react 中，是单向数据流，推崇结合 immutable 来实现数据不可变; vue 的思想是响应式的，也就是基于是数据可变的，通过对每一个属性建立 Watcher 来监听，当属性变化的时候，响应式的更新对应的虚拟 dom。总之，react 的性能优化需要手动去做，而 vue 的性能优化是自动的，但是 vue 的响应式机制也有问题，就是当 state 特别多的时候，Watcher 也会很多，会导致卡顿，所以大型应用（状态特别多的）一般用 react，更加可控。
- **通过 js 来操作一切，还是用各自的处理方式**: react 的思路是 all in js，通过 js 来生成 html，所以设计了 jsx，还有通过 js 来操作 css，社区的 styled-component、jss 等; vue 是把 html，css，js 组合到一起，用各自的处理方式，vue 有单文件组件，可以把 html、css、js 写到一个文件中，html 提供了模板引擎来处理。
- **类式的组件写法，还是声明式的写法**: react 是类式的写法，api 很少; 而 vue 是声明式的写法，通过传入各种 options，api 和参数都很多。所以 react 结合 typescript 更容易一起写，vue 稍微复杂。
- **扩展不同**: react 可以通过高阶组件（Higher Order Components--HOC）来扩展，而 vue 需要通过 mixins 来扩展。
- **什么功能内置，什么交给社区去做**: react 做的事情很少，很多都交给社区去做，vue 很多东西都是内置的，写起来确实方便一些，  
  比如 redux 的 combineReducer 就对应 vuex 的 modules，  
  比如 reselect 就对应 vuex 的 getter 和 vue 组件的 computed，  
  vuex 的 mutation 是直接改变的原始数据，而 redux 的 reducer 是返回一个全新的 state，所以 redux 结合 immutable 来优化性能，vue 不需要。

## 52. HOC、Render Props、Hook

### 一、HOC（高阶组件）

**高阶组件其实就是参数为组件，返回值为新组件的函数**。

高阶组件可以用到很多的场景中去，打印日志、提取公共函数、调用公共 api、渲染公共 UI 等等。

### 二、Render Props

React 官方给出的定义是：Render Props 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术

**render props 模式的应用，就是做一个 React 组件**

是把 S 封装成一个 component，同时这个 component 留了一个 props 用来接收需要渲染的组件。我认为下面这两种写法都是 render props，因为他们的结构基本一样，结果完全一样。

```js
// 第一种，就是官方文档的写法：
const S = ({ render }) => {
  const [state, setState] = useState('someValue');
  useEffect(() => {
    // ...some code...
    setState('anotherValue');
  });
  return render(state);
};

const A = ({ s }) => {
  return (
    <div>
      <div>{s}</div>
      <div>A</div>
    </div>
  );
};

const App = () => {
  return <S render={s => <A s={s} />} />;
};

//  第二种，也是可用的写法。
const S = ({ render }) => {
  const [state, setState] = useState('someValue');
  useEffect(() => {
    // ...some code...
    setState('anotherValue');
  });
  const Render = render;
  return <Render s={state} />;
};

const A = ({ s }) => {
  return (
    <div>
      <div>{s}</div>
      <div>A</div>
    </div>
  );
};

const App = () => {
  return <S render={A} />;
};
```

```jsx
import React from 'react';
import MousePoint from './MousePoint';
export default class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <MousePoint
          render={state => {
            return (
              <div>
                <span>鼠标横坐标是{state.positionX}</span>
                <span>鼠标纵坐标是{state.positionY}</span>
              </div>
            );
          }}
        />
      </div>
    );
  }
}
```

我们这里渲染一个 MousePoint 组件，这个组件接受一个 render props，这个 props 不是简单的属性或者对象，而是一个函数。

```js
import React from 'react';
export default class MousePoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positionX: 0,
      positionY: 0,
    };
  }
  componentDidMount() {
    document.addEventListener('mousemove', e => {
      this.setState({
        positionX: e.clientX,
        positionY: e.clientY,
      });
    });
  }

  render() {
    return <div>{this.props.render(this.state)}</div>;
  }
}
```

我们在 MousePoint 组件中去执行这个 render props，this.state 为参数，函数拿到这个值后，成功渲染出鼠标的位置信息。

在 React 中，props 可以传递任何对象，包括组件以及函数。通过这种自由组合的方式，我们能够实现非常功能。

说到这里，我们不得不提到 `this.props.children`

```jsx
import React from 'react';
export default class ChildComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.children}
        {this.props.render}
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <ChildComponent render={<p>This is a message</p>}>
        <p>Hello World</p>
      </ChildComponent>
    </div>
  );
}
```

这也是一种能够让我们封装代码的方式之一，不过一般用在样式的封装上。

`this.props.children` 指的就是组件 `start tag` 和 `end tag` 中间包括的部分。我们也可以通过 props 的方式去传递组件，像上面代码中 render 这样的方式。这就比较类似 Vue 中 slot。

### 三、Hook

它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

hooks 就是把 S 封装成 useS，也就是一个 custom hooks，然后在 A，B，或者 C 里面使用 useS

```js
const useS = () => {
  const [state, setState] = useState('someValue');
  useEffect(() => {
    // ...some code...
    setState('anotherValue');
  });
  return state;
};
const A = () => {
  const s = useS();
  return (
    <div>
      <div>{s}</div>
      <div>A</div>
    </div>
  );
};
```

```js
// /hooks/useMouse.js
import React, { useState, useEffect } from 'react';
export default () => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const getMousePosition = e => {
    setPositionX(e.clientX);
    setPositionY(e.clientY);
  };
  useEffect(() => {
    document.addEventListener('mousemove', getMousePosition);
    return () => {
      document.removeEventListener('mousemove', getMousePosition);
    };
  });
  return {
    positionX: positionX,
    positionY: positionY,
  };
};
```

```js
import React, { useState, useEffect } from 'react';
import useMousePosition from '../hooks/useMouse';

export default () => {
  const mousePosition = useMousePosition();
  return (
    <div>
      <span>鼠标的横坐标{mousePosition.positionX}</span>
      <span>鼠标的纵坐标{mousePosition.positionY}</span>
    </div>
  );
};
```

## 53. 请用 React 实现一个搜索框组件

功能包括：

- 输入文本字数限制
- 可配置输入文本约束，比如仅限输入数字
- 用户输入时可支持关键字搜索，并出现下拉框展示相关项

<div align="center"><img :src="$withBase('/images/prepare/new/2020050902.webp')" alt="images/prepare/new/2020050902.webp"></div>

粗略写

<div align="center"><img :src="$withBase('/images/prepare/new/2020050903.png')" alt="images/prepare/new/2020050903.png"></div>

```jsx
import React, { Component } from 'react';
import './input.css';

function debounce(fn, delay = 500) {
  let timeout = null;
  return function (e, ...args) {
    e.persist && e.persist();
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.call(this, e, ...args);
    }, delay);
  };
}

class Tips extends Component {
  render() {
    const { tipsList } = this.props;
    return tipsList && tipsList.length !== 0 ? (
      <div className="tips__container">
        {tipsList.map((item, index) => {
          return (
            <a href="#" key={index} className="link">
              {item}
            </a>
          );
        })}
      </div>
    ) : (
      <div />
    );
  }
}

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyWords: [
        '前端工程师1',
        '前端高级开发1',
        '后端工程师1',
        '测试开发1',
        '项目主管1',
        'dress',
        'Recent',
        '123456',
        'awdad1',
      ],
      inputValue: '',
      inputType: 'text',
      inputMaxLen: 20,
      wordsList: [],
    };
    this.handleInput = debounce(this.handleInput, 200);
    this.handleMaxLenChange = debounce(this.handleMaxLenChange, 400);
  }

  handleInput = e => {
    const {
      target: { value },
    } = e;
    const { keyWords } = this.state;
    const tipsList = !value
      ? []
      : keyWords.filter(item => {
          const res = item.search(new RegExp(value, 'i'));
          return res !== -1;
        });
    this.setState({
      inputValue: value,
      tipsList,
    });
  };

  handleTypeClick = e => {
    const {
      target: { name },
    } = e;
    this.setState({ inputType: name });
  };

  handleMaxLenChange = e => {
    const {
      target: { value },
    } = e;
    const { inputValue } = this.state;
    const newInputValue = inputValue.substr(0, +value);
    // 如果设置最大长度小于现在关键词的长度，则截取一下
    this.input.value = newInputValue;
    this.setState({ inputMaxLen: value, inputValue: newInputValue });
  };

  render() {
    const { tipsList, inputType, inputMaxLen } = this.state;
    return (
      <div className="container">
        <div className="control__container" onClick={this.handleTypeClick}>
          <button name="text">文本</button>
          <button name="number">数字</button>
          <span>最大长度: </span>
          <input
            type="number"
            placeholder="默认: 20"
            onInput={this.handleMaxLenChange}
          />
        </div>
        <div className="input__container">
          <div className="input__wrap">
            <input
              ref={input => (this.input = input)}
              placeholder="请输入关键词"
              type={inputType}
              maxLength={inputMaxLen}
              onInput={this.handleInput}
            />
            <button>搜索</button>
          </div>
          <Tips tipsList={tipsList} />
        </div>
      </div>
    );
  }
}
```

```css
.container {
  width: 600px;
  height: 400px;
  margin: 0 auto;
  padding: 30px;
  background: #fff;
}

.input__container {
  margin-top: 30px;
}

.input__wrap {
  display: flex;
  align-items: center;
}

.input__wrap input {
  box-sizing: border-box;
  width: 85%;
  height: 50px;
  padding: 0 10px;
  border: #666 1px solid;
  border-right: 0;
  outline: none;
}

.input__wrap button {
  cursor: pointer;
  box-sizing: border-box;
  width: 15%;
  height: 50px;
  color: #fff;
  font-size: 20px;
  border: none;
  border: #666 1px solid;
  outline: none;
  background: #1890ff;
}

.control__container {
  display: flex;
  align-items: center;
}

.control__container button {
  cursor: pointer;
  width: 50px;
  height: 30px;
  margin-right: 10px;
  color: #fff;
  outline: none;
  border: #333 1px solid;
  border-radius: 8px;
  background: #1890ff;
}

.control__container span {
  margin-left: auto;
  margin-right: 10px;
  color: #666;
  font-size: 14px;
}

.tips__container {
  overflow-y: scroll;
  max-height: 200px;
  border: #333 1px solid;
  border-top: 0;
}

.tips__container .link {
  display: block;
  height: 30px;
  padding: 5px 10px;
  color: #666;
  line-height: 30px;
  text-decoration: none;
}

.tips__container .link:hover {
  color: #fff;
  background: #666;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
}
```
