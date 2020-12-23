# react.js

[[toc]]

## 1. react issues

创建一个简单的示例重现问题，可以用 react 团队提供的现成的 JSFiddle 模板：
[https://jsfiddle.net/reactjs/69z2wepo/](https://jsfiddle.net/reactjs/69z2wepo/)

github 上提交问题：
[https://github.com/facebook/react/issues/new](https://github.com/facebook/react/issues/new)

方式二 fork 代码修改后发起 pull raquest

## 2.贡献代码开源

[https://github.com/facebook/react/label/good%20first%20issue](https://github.com/facebook/react/label/good%20first%20issue)

## 3. react 特点

- 声明式的视图层
- 简单的更新流程
- 灵活的渲染实现
- 高效的 DOM 操作
- 组件化
- 虚拟 DOM
- 单向数据流
- JSX 语法

## 4. ES6+语法简介

1. let、const
2. 箭头函数
3. 模板字符串
4. 结构赋值
5. rest 参数
6. 扩展运算符
7. class
8. import、export

## 5. JSX

- JSX 是一种用于描述 UI 的 Javascript 扩展语法
- JSX 的基本语法和 XML 语法相同，都是使用成对的标签构成一个树状结构的数据，例如
  ```js
  const element = (
    <div>
      <h1>Hello world! </h1>
    </div>
  );
  ```
- 在 JSX 语法中，使用的标签类型有两种： DOM 类型的标签（div、span 等）和 React 组件类型的标签
- JSX 可以使用 Javascript 表达式，因为本质上仍然是 Javascript

## 6. 组件的 state

组件的 state 是组件内部的状态，state 的变化最终将反映到组件 UI 的变化上

## 7. 组件的生命周期

1. 组件的挂载  
   React 将组件渲染 -> 构造 DOM 元素 -> 展示到页面的过程称为组件的挂载，一个组件的挂载会经历下面几个过程：

   - `constructor()`
   - `static getDerivedStateFromProps()`
   - `render()`
   - `componentDidMount()`

2. 数据的更新过程  
   组件挂载到 DOM 树之后，当界面进行交互动作时，组件 props 或 state 改变就会触发组件的更新。假如父组件 render()被调用，无论此时 props 是否有改变，在 render()中被渲染的子组件就会经历更新的过程。一个组件的数据更新会经历下面几个过程：

   - `static getDerivedStateFromProps()`
   - `shouldComponentUpdate()`
   - `componentWillUpdate()/UNSAFE_componentWillUpdate()`
   - `render()`
   - `getSnapShotBeforeUpdate()`
   - `componentDidUpdate()`

   1. **组件自身 `state` 更新**会依次一次执行：
      > shouldComponentUpdate() -> render() -> getSnapShotBeforeUpdate() -> componentDidUpdate()
   2. **父组件 `props` 更新**会依次执行：
      > static getDerivedStateFromProps() -> shouldComponentUpdate() -> render -> getSnapShotBeforeUpdate() -> componentDidUpdate()

3. 组件的卸载

   - componentWillUnmount()

4. 错误处理
   在渲染期间，生命周期方法或构造函数 constructor()中发生错误时将会调用 componentDidCatch()方法

## 8. 错误处理-错误边界（ErrorBoundaries）

错误边界是能够捕获子组件的错误并对其做优雅处理的组件，优雅的处理可以是错误日志、显示出错提示等，显然这比直接卸载组件要更加友好

```jsx
import React, { Component } from "react";

const Profile = ({ user }) => <div>name: {user.name}</div>;

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(err, info) {
    // 显示错误UI
    this.setState({ hasError: true });
    // 同时输出错误日志
    console.log(err, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Oops, something went wrong!</h1>;
    }
    return this.props.children;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { name: "react" }
    };
  }

  // 将user置为null，模拟异常
  onClick = () => {
    this.setState({ user: null });
  };

  render() {
    return (
      <div>
        <ErrorBoundary>
          <Profile user={this.state.user} />
        </ErrorBoundary>
        <button onClick={this.onClick}>更新</button>
      </div>
    );
  }
}

export default App;
```

## 9. Portals

Portals 特性让我们可以把组件渲染到当前组件树意外的 DOM 节点上，这个特性典型的应用场景是渲染应用的全局弹框，使用 Portals 后，任意组件都可以将弹框组件渲染到根节点上，以方便弹框的显示

```jsx
ReactDom.createPortals(child, container);
```

```jsx
import React, { Component } from "react";
import ReactDOM from "react-dom";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.container = document.createElement("div");
    document.body.appendChild(this.container);
  }

  componentWillUnmount() {
    document.body.removeChild(this.container);
  }

  render() {
    return ReactDOM.createPortal(
      <div className="modal">
        <span className="close" onClick={this.props.onClose}>
          &times;
        </span>
        <div className="content">{this.props.children}</div>
      </div>,
      this.container
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: true };
  }

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div>
        <h2>Dashboard</h2>
        {this.state.showModal && (
          <Modal onClose={this.closeModal}>Modal Dialog </Modal>
        )}
      </div>
    );
  }
}

export default App;
```

## 10. 高阶组件

使用场景：

1. 操纵 props
2. 通过 ref 访问组件实例
3. 组件状态提升
4. 用其它元素包装组件

## 11. React Router

React Router v4 是对 React Router 的一次彻底重构，采用动态路由，遵循 React 中一切皆组件的思想，每一个 Route(路由)都是一个普通的 React 组件

## 12. Redux

redux 三大原则

1. 唯一数据源
2. 状态是只读的
3. 应用状态的改变通过纯函数完成

## 13. 中间件与异步操作

applyMiddleware 函数

```js
import compose from "./compose";

export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args);
    let dispatch = store.dispatch;
    let chain = [];

    const middlewareAPI = {
      getState: store.getStore,
      dispatch: (...args) => dispatch(...args)
    };

    chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch
    };
  };
}
```

## 14. 事件系统

**合成事件的事件代理**

跟传统的事件的处理机制不同，React 把所有定义的事件都绑定到结构的最顶层。使用一个事件监听器 watch 所有事件，并且它内部包含一个映射表，记录了事件与组件事件处理函数的对应关系。当事件触发时，React 会根据映射关系找到真正的事件处理函数并调用。当组件被安装或被卸载时，对应的函数会被自动添加到事件监听器的内部映射表或者从表中删除

## 15. 受控组件和非受控组件

受控组件就是可以被 react 状态控制的组件  
在 react 中，Input textarea 等组件默认是非受控组件（输入框内部的值是用户控制，和 React 无关）。但是也可以转化成受控组件，就是通过 onChange 事件获取当前输入内容，将当前输入内容作为 value 传入，此时就成为受控组件。  
好处：可以通过 onChange 事件控制用户输入，使用正则表达式过滤不合理输入。

## 16. Flux

一个 Flux 应用包含四个部分

- `Dispatcher`: 处理动作分发，维持 Store 之间的依赖关系
- `Store`: 负责存储数据和处理数据相关逻辑
- `Action`: 驱动 Dispatcher 的 Javascript 对象
- `View`: 视图部分，负责显示用户界面

Flux:

1. Store 包含状态和更改逻辑
2. 有多个 Store
3. 所有 Store 都互不影响且是平级的
4. 有单一调度器
5. React 组件订阅 store
6. 状态是可变的

Flux 的最大特点，就是数据的"单向流动"。

1. 用户访问 View
2. View 发出用户的 Action
3. Dispatcher 收到 Action，要求 Store 进行相应的更新
4. Store 更新后，发出一个"change"事件
5. View 收到"change"事件后，更新页面

## 17. 扩展 Redux

两种扩展 Redux 的方法

1. 中间件
2. Store Enhancer

中间件的特点是：

- 中间件是独立的函数
- 中间件可以组合使用
- 中间件有一个统一的接口

```js
({ dispatch, getState }) => next => action => next(action);
```

redux-thunk

```js
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === "function") {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
}

const thunk = createThunkMiddleware();
export default thunk;
```

使用中间件

1. 第一种方法是用 Redux 提供的 applyMiddleware 来包装 createStore 产生一个新的创建 Store 的函数，以使用 redux-thunk 中间件为例

   ```js
   import { createStore, applyMiddleware } from "redux";
   import thunkMiddleware from "redux-thunk";

   const configureStore = applyMiddleware(thunkMiddleware)(createStore);
   const store = configureStore(reducer, initialStore);
   ```

2. 第二种方法也就是把 applyMiddleware 的结果当作 Store Enhancer，和其它 Enhancer 混合之后作为 createStore 参数传入
   以同时使用 redux-thunk 和 Redux Devtools 增强器为例，代码如下

   ```js
   import { createStore, applyMiddleware, compose } from "redux";
   import thunkMiddleware from "redux-thunk";

   const win = window;
   const storeEnhancers = compose(
     applyMiddleware(...middlewares),
     win && win.devToolsExtension ? win.devToolsExtension : f => f
   );
   const store = createStore(reducer, storeEnhancers);
   ```

## 18. shouldComponentUpdate 模拟 PuerComponent

```jsx
class Demo1 extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { props, state } = this;

    function shallowCompare(a, b) {
      return a === b || Object.keys(a).every(k => a[k] === b[k]);
    }

    return shallowCompare(nextProps, props) && shallowCompare(nextState, state);
  }
}

class Demo2 extends PuerComponent {}
```

## 19. 任意组件通讯

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
       event.sub("element2update", () => {
         console.log("element2 update");
       });
     }
   }

   // 另一个组件
   class Element2 extends Component {
     constructor() {
       // 发布消息
       setTimeout(function() {
         event.pub("element2update");
       }, 2000);
     }
   }
   ```

4. context 桥梁

   ```js
   import PropTypes from "prop-types";

   class Child extends Component {
     // 后代组件生命需要读取context上的数据
     static contextTypes = {
       text: PropTypes.string
     };

     render() {
       // 通过 this.context 读取 context 上的数据
       return <div>{this.context.text}</div>;
     }
   }

   class Ancestor extends Component {
     // 祖先组件生命需要context上放入数据
     static childContextTypes = {
       text: PropTypes.string
     };

     // 祖先组件往context上放入数据
     getChildContext() {
       return {
         text: "路小二"
       };
     }
   }
   ```

## 20.
