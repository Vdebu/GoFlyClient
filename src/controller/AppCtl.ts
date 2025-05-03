import type { IUser } from '../api/UserAPI.ts'
import { changeLocale } from '../config/lpk'

let iLoginUser: IUser = {} as IUser

export default {
  getLoginUser(): IUser {
    return iLoginUser
  },
  changeLocale,
}
