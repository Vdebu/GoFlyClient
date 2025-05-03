import userAPI, { type IUser } from '../api/UserAPI.ts'
import { changeLocale } from '../config/lpk'
import { LOGIN_TOKEN } from '../utils/Constants.ts'

let iLoginUser: IUser = {} as IUser
export const initLoginUserInfo = async () => {
  // 异步加载信息
  // 先判断是否已经登录了
  if (tools.Cookie.getItem(LOGIN_TOKEN)) {
    iLoginUser = await userAPI.getSelfInfo()
    console.log('user:', iLoginUser)
  }
}
export default {
  getLoginUser(): IUser {
    return iLoginUser
  },
  changeLocale,
}
