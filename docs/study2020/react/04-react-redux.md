# React-redux

[[TOC]]

```js
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options]);
```

## mapStateToProps

```js
function mapStateToProps(state, [ownProps]) {
  return {};
}
```

## mapDispatchToProps

mapDispatchToProps 的作用是将 dispatch 作为 props 传递给 WrappedComponent 组件。**它可以是一个函数，也可以是一个对象**

若果传递的是一个对象，那么键值应该是一个函数，用来描述 action 的生成。也就是说，每个定义在该对象中的函数都将被当做 Redux action create(构造器)，其中所定义的方法名将作为属性名被合并到组件的 props 中

```js
const mapDispatchToProps = onFirst:(data)=>{
  type: "FIRST_ACTION",
  data: data
}
```

如果 mapDispatchToProps 传递的是一个函数，那么这个函数将接收 dispatch 方法以及容器组件的 props 作为参数，最终也返回一个对象

````js
const mapDispatchToProps = (dispatch,ownProps)=> {
  return {
    onFirstAct: ()=>dispatch({
      type: "FIRST_ACTION",
      data: ownProps.data
    })
  }
}

## Demo

```js
// react-and-redux/chapter-03/react-redux/src/Store.js
mport {createStore} from 'redux';
import reducer from './Reducer.js';

const initValues = {
  'First': 0,
  'Second': 10,
  'Third': 20
};

const store = createStore(reducer, initValues);

export default store;
````

```js
// react-and-redux/chapter-03/react-redux/src/Reducer.js
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
// react-and-redux/chapter-03/react-redux/src/ActionTypes.js
export const INCREMENT = "increment";

export const DECREMENT = "decrement";
```

```js
// react-and-redux/chapter-03/react-redux/src/Actions.js
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

```js
// react-and-redux/chapter-03/react-redux/src/views/Counter.js
import React, { PropTypes } from "react";
import * as Actions from "../Actions.js";
import { connect } from "react-redux";

const buttonStyle = {
  margin: "10px"
};

function Counter({ caption, onIncrement, onDecrement, value }) {
  return (
    <div>
      <button style={buttonStyle} onClick={onIncrement}>
        +
      </button>
      <button style={buttonStyle} onClick={onDecrement}>
        -
      </button>
      <span>
        {caption} count: {value}
      </span>
    </div>
  );
}

Counter.propTypes = {
  caption: PropTypes.string.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    value: state[ownProps.caption]
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onIncrement: () => {
      dispatch(Actions.increment(ownProps.caption));
    },
    onDecrement: () => {
      dispatch(Actions.decrement(ownProps.caption));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

```js
// react-and-redux/chapter-03/react-redux/src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import ControlPanel from "./views/ControlPanel";
import store from "./Store.js";

import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <ControlPanel />
  </Provider>,
  document.getElementById("root")
);
```
