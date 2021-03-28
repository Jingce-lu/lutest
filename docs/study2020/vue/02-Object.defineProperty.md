# Object.defineProperty

## observe
为了达到深层次拦截的目的，将Object.defineProperty的逻辑抽象为observe函数，用递归实现

```js
let data = {
  stage: "GitChat",
  course: {
    title: "开发进阶",
    author: "Ailjc",
  }
}

const observe = data => {
  if(!data || typeof data !=="object"){
    return
  }

  Object.keys(data).forEach(key=>{
    let currentValue = data[key]

    observe(currentValue)

    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get(){
        console.log(`getting ${key} value now, getting value is:`, currentValue);
        return currentValue
      },
      set(newValue) {
        currentValue = newValue;
        console.log(`setting ${key} value now, setting value is`,currentValue)
      }
    })
  })
}

observe(data)
```