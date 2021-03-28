
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
      set(newValue){
        currentValue = newValue;
        console.log(`setting ${key} value now, setting value is`,currentValue)
      }
    })
  })
}