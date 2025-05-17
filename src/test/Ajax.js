// 使用闭包封装Ajax对象
const Ajax = (function () {
  // 定义Ajax对象的公共方法
  return {
    // 实现GET请求方法
    get: function (iOption) {
      // 如果参数不存在则初始化为空对象
      iOption = iOption || {}
      // 没有url则终止执行
      if (!iOption.url) {
        return
      }
      // 判断有没有msg有就进行输出
      iOption.msg && console.log(iOption.msg)
      // 创建XHR对象准备发送请求
      const xhr = new XMLHttpRequest()
      xhr.open('GET', iOption.url, true)

      // 使用回调函数处理请求状态变化
      xhr.onreadystatechange = function () {
        // 判断请求是否完成
        if (4 !== xhr.readyState) {
          return // 请求未完成
        }

        // 判断HTTP状态码
        if (200 === xhr.status) {
          // 请求成功，调用回调函数并传递响应数据
          setTimeout(iOption.fnCb && iOption.fnCb(xhr.responseText), 2000)
        }
      }

      // 发送GET请求（无请求体）
      xhr.send(null)
    },
    getByTQ: function (tqTask, iOption) {
      // 如果参数不存在则初始化为空对象
      iOption = iOption || {}
      // 没有url则终止执行
      if (!iOption.url) {
        return
      }
      // 判断有没有msg有就进行输出
      iOption.msg && console.log(iOption.msg)
      // 创建XHR对象准备发送请求
      const xhr = new XMLHttpRequest()
      xhr.open('GET', iOption.url, true)

      // 使用回调函数处理请求状态变化
      xhr.onreadystatechange = function () {
        // 判断请求是否完成
        if (4 !== xhr.readyState) {
          return // 请求未完成
        }

        // 判断HTTP状态码
        if (200 === xhr.status) {
          // 请求成功，调用回调函数并传递响应数据
          setTimeout(function () {
            // 准备好数据
            tqTask.setData('data', xhr.responseText)
            // 执行任务
            tqTask.goNext()
          }, 50000)
        }
      }

      // 发送GET请求（无请求体）
      xhr.send(null)
    },
  }
})() // 修正：使用立即执行函数表达式正确初始化Ajax对象
