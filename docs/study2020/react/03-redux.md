# Redux

## 1. Redux 三个基本原则：

- 唯一数据源（Single Source of Truth）
- 保持状态只读（State in read-only）
- 数据改变只能通过纯函数完成（Changes are made with pure functions）

虽然利用 `Dispatcher` 的 `waitFor` 方法可以保证多个 Store 之间的更新顺序，但是会产生不同 Store 之间的显示依赖关系，**redux 解决方法是整个应用只保持一个 Store,所有组件的数据源就是这个 Store 上的状态**

## 2.Redux 架构整体思路

- 确定所需的状态数据
- 根据交互和业务需求，分析确定 action
- 根据不同的 action,完成 reducer 函数的编写
- 根据 reducer，等创建 store
- 订阅数据更新，完成视图渲染

## 3. 初识 store

store 是 Redux 中最核心的概念，是 Redux 架构的根本

store 是一个 Javascript 对象，里面包含了 dispatch 及获取页面状态数据树的方法等

```js
store = {
  dispatch,
  getState,
  subscribe,
  replaceReducer
};
```

- `dispatch(action)`: 派发 action
- `subscribe(listener)`: 订阅页面数据，即 store 中 state 的变化
- `getState`: 获取当前页面状态数据树，即 store 中的 state
- `replaceReducer(nextReducer)`: 一般开发用不到，社区一些热更新或者代码分离技术中可能会使用到

## 4. reducer

在 Redux 中，每个 reducer 的函数签名如下所示：

```js
reducer(state, action);
```

```js
const reducer = (previousState = 0, action) => {
  switch (action.type) {
    case "LIKE":
      return previousState + 1;
    case "UNLIKE":
      return previousState - 1;
    default:
      return previousState;
  }
};
```

## 5. Demo

```js
// react-and-redux/chapter-03/redux_basic/src/Store.js
import { createStore } from "redux";
import reducer from "./Reducer.js";

const initValues = {
  First: 0,
  Second: 10,
  Third: 20
};

const store = createStore(reducer, initValues);

export default store;
```

```js
// react-and-redux/chapter-03/redux_basic/src/ActionTypes.js
export const INCREMENT = "increment";

export const DECREMENT = "decrement";
```

```js
// react-and-redux/chapter-03/redux_basic/src/Reducer.js
import * as ActionTypes from "./ActionTypes.js";

export default (state, action) => {
  const { counterCaption } = action;

  switch (action.type) {
    case ActionTypes.INCREMENT:
      return { ...state, [counterCaption]: state[counterCaption] + 1 };
    case ActionTypes.DECREMENT:
      return { ...state, [counterCaption]: state[counterCaption] - 1 };
    default:
      return state;
  }
};
```

```js
// react-and-redux/chapter-03/redux_basic/src/Actions.js
import * as ActionTypes from "./ActionTypes.js";

export const increment = counterCaption => {
  return {
    type: ActionTypes.INCREMENT,
    counterCaption: counterCaption
  };
};

export const decrement = counterCaption => {
  return {
    type: ActionTypes.DECREMENT,
    counterCaption: counterCaption
  };
};
```

```js {20,25,30,49,53}
// react-and-redux/chapter-03/redux_basic/src/views/Counter.js
import React, { Component, PropTypes } from "react";

import store from "../Store.js";
import * as Actions from "../Actions.js";

const buttonStyle = {
  margin: "10px"
};

class Counter extends Component {
  constructor(props) {
    super(props);

    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getOwnState = this.getOwnState.bind(this);

    this.state = this.getOwnState();
  }

  getOwnState() {
    return {
      value: store.getState()[this.props.caption]
    };
  }

  onIncrement() {
    store.dispatch(Actions.increment(this.props.caption));
  }

  onDecrement() {
    store.dispatch(Actions.decrement(this.props.caption));
  }

  onChange() {
    this.setState(this.getOwnState());
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.caption !== this.props.caption ||
      nextState.value !== this.state.value
    );
  }

  componentDidMount() {
    store.subscribe(this.onChange);
  }

  componentWillUnmount() {
    store.unsubscribe(this.onChange);
  }

  render() {
    const value = this.state.value;
    const { caption } = this.props;

    return (
      <div>
        <button style={buttonStyle} onClick={this.onIncrement}>
          +
        </button>
        <button style={buttonStyle} onClick={this.onDecrement}>
          -
        </button>
        <span>
          {caption} count: {value}
        </span>
      </div>
    );
  }
}

Counter.propTypes = {
  caption: PropTypes.string.isRequired
};

export default Counter;
```

## 6.redux 源码

### 6.1 createStore

```js
const createStore = reducer => {
  let state;

  // listeners用来存储所有的监听函数
  let listeners = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
    // 每一次状态更新后，都需要调用listeners数组中的每一个监听函数
    listeners.forEach(listener => listener());
  };

  const subscribe = listener => {
    // subscribe 可能会被调用多次，每一次调用时，都将相关的监听函数存入listeners数组中
    listeners.push(listener);
    // 返回一个函数，进行取消订阅
    return () => {
      listeners = listeners.filter(item => item !== listener);
    };
  };

  return { getState, dispatch, subscribe };
};
```

### 6.2 combineReducers

```js
const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};
```

### 6.3 applyMiddleware

```js
export default funtion applyMiddleware(...middlewares){
  return next=>
    (reducer, intialState) => {
      var store = next(reducer, initialState);
      var dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: action=>dispatch(action)
      }

      chain = middlewares.map(middleware=>middleware(middlewareAPI))

      dispatch = compose(...chain, store.dispatch)

      return {
        ...store,
        dispatch
      }
    }
}
```

chain 数组中的每一项都是对原始 `dispatch` 的增强，并进行控制权转移，所以就有了`dispatch=compose(...chain, store.dispatch)`

```js
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
```

## 7.写一个中间件的固定套路模式

```js
const customMiddleware = store => next => action => {
  // ...
};
```
