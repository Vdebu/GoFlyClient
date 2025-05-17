function TaskQueue() {
  // 队列
  this.giTask = []
  // 存储任务数据
  this.iData = {}
}
;(function () {
  // 向尾部添加任务
  TaskQueue.prototype.appendTask = function (fnTask) {
    // 如果不存在要调用的方法就直接返回
    if (!fnTask) {
      return
    }
    // 丢到队列尾部
    this.giTask.push(fnTask)
  }
  // 向头部添加任务
  TaskQueue.prototype.appendPreTask = function (fnTask) {
    // 如果不存在要调用的方法就直接返回
    if (!fnTask) {
      return
    }
    // 丢到队列尾部
    this.giTask.unshift(fnTask)
  }
  // 执行任务队列
  TaskQueue.prototype.goNext = function () {
    if (!this.giTask.length) {
      // 任务全都完成就返回
      return
    }
    // 从头部开始执行任务
    this.giTask.shift()(this)
  }
  // 存储相关的数据
  TaskQueue.prototype.setData = function (key, val) {
    if (!key) {
      return
    }
    // 插入
    this.iData[key] = val
  }
  TaskQueue.prototype.getData = function (key) {
    // if (!key) {
    //   return
    // }
    // // 返回数据
    // return this.iData[key]
    // 没传key默认返回undefined
    return this.iData[key]
  }
})()
