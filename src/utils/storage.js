/* 封装本地存储模块操作 */

// 存储数据
const setItem = (key, value) => {
  // 当一个值被typeof时，若其为对象或数组返回值为object
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 获取数据
const getItem = key => {
  const data = window.localStorage.getItem(key)
  // 使用try...catch的意义
  // 由于本地存储的是字符串，那么就很难判断该字符串是不是JSON格式的字符串，所以很难使用typeof
  // 而使用try...catch当try中的data不是JSON格式的字符串会报错就会被catch捕获原样输出data
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

// 删除数据
const delItem = key => {
  window.localStorage.removeItem(key)
}

export { setItem, getItem, delItem }
