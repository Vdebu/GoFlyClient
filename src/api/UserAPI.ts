export interface IUser {
  id: number
  name: string
}
export default {
  // 使用Ajax封装一般返回一个Promise
  getSelfInfo(): Promise<IUser> {
    return Promise.resolve({
      id: 39,
      name: 'miku',
    })
  },
}
