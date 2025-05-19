import userAPI, { type IUser } from '../api/UserAPI.ts'
import { changeLocale, mergeLpk } from '../config/lpk'
import { LOGIN_PATH, LOGIN_TOKEN } from '../utils/Constants.ts'

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
  mergeLpk,
  redirectToLogin() {
    // 跳转到登录页面
    document.location.href = LOGIN_PATH
  },
}
