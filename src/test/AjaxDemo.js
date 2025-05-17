// 回调层级过深不利于维护

// 立即执行函数调用Ajax.get方法
;(function () {
  // 保证Ajax的调用顺序必须通过嵌套回调函数实现
  // 发送AJAX请求获取JSON数据
  // Ajax.get({
  //   // 请求地址
  //   url: 'data.json',
  //   msg: 'mikudayo',
  //   // 设置回调函数处理响应
  //   fnCb: function (stResText) {
  //     // 输出从服务器获取的数据
  //     console.log('第一次调用获取到的数据:', stResText)
  //     Ajax.get({
  //       // 请求地址
  //       url: 'data.json',
  //       msg: 'lukadayo',
  //       // 设置回调函数处理响应
  //       fnCb: function (stResText) {
  //         // 输出从服务器获取的数据
  //         console.log('第二次调用获取到的数据:', stResText)
  //         Ajax.get({
  //           // 请求地址
  //           url: 'data.json',
  //           msg: 'rindayo',
  //           // 设置回调函数处理响应
  //           fnCb: function (stResText) {
  //             // 输出从服务器获取的数据
  //             console.log('第三次调用获取到的数据:', stResText)
  //             console.log('update ui...')
  //           },
  //         })
  //       },
  //     })
  //   },
  // })
  const tqTask = new TaskQueue()
  // 第一个任务
  tqTask.appendTask(function (tqArgTask) {
    Ajax.getByTQ(tqTask, {
      url: 'data.json',
      msg: 'mikudayo',
    })
    tqTask.goNext()
  })
  // 对第一步拿到的数据进行处理
  tqTask.appendTask(function (tqArgTask) {
    let stResText = tqTask.getData('data')
    stResText += Math.random()
    tqTask.setData('miku', stResText)
  })
  // 第二个任务
  tqTask.appendTask(function (tqArgTask) {
    console.log('第一次调用获取到的数据:', tqTask.getData('data'))
    console.log('第一次调用处理后的数据:', tqTask.getData('miku'))
    Ajax.getByTQ(tqTask, {
      url: 'data.json',
      msg: 'lukadayo',
    })
    // 调用任务
    tqTask.goNext()
  })

  // 第三个任务
  tqTask.appendTask(function (tqArgTask) {
    console.log('第二次调用获取到的数据:', tqTask.getData('data'))
    Ajax.getByTQ(tqTask, {
      url: 'data.json',
      msg: 'rindayo',
    })
    tqTask.goNext()
  })
  // 检查数据
  tqTask.appendTask(function (tqArgTask) {
    console.log('第三次调用获取到的数据:', tqTask.getData('data'))
    console.log('update ui...')
  })
  // 执行任务
  tqTask.goNext()
})()
