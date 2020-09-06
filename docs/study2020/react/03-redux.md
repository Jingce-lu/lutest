# Redux

Redux 三个基本原则：

- 唯一数据源（Single Source of Truth）
- 保持状态只读（State in read-only）
- 数据改变只能通过纯函数完成（Changes are made with pure functions）

虽然利用 `Dispatcher` 的 `waitFor` 方法可以保证多个 Store 之间的更新顺序，但是会产生不同 Store 之间的显示依赖关系，**redux 解决方法是整个应用只保持一个 Store,所有组件的数据源就是这个 Store 上的状态**

在 Redux 中，每个 reducer 的函数签名如下所示：

```js
reducer(state, action);
```

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
