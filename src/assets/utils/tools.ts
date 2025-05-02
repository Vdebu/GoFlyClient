import cookies from 'js-cookie'
const iTools = {
    // 路由相关工具方法
    Router:{
    },
    // 状态管理
    Store:{

    },
    // 本地存储相关
    LocalStorage:{
        // 往本地添加新元素
        setItem(key: string, value: any) {
            // 以JSON形式传入数据
            localStorage.setItem(key,JSON.stringify(value))
        },
        getItem(key:string){
            const stValue = localStorage.getItem(key)
            // 尝试强制进行JSON转换在外部使用的时候直接当JSON用就好
            try {
                return JSON.parse(stValue as string)
            }catch (e){
                // 发生错误了直接返回取到的值
                return stValue
            }
        },
        removeItem(key:string){
            localStorage.removeItem(key)
        }
    },
    Cookie:{
        // 设置cookie(30天有效期)
        setItem(key: string, value: any) {
            cookies.set(key,value,{expires:30})
        },
        getItem(key: string,defaultValue:any): any {
            // 如果没有获取到key就使用defaultValue
            const stValue = cookies.get(key) || defaultValue
            // 强制进行JSON转换
            try {
                return JSON.parse(stValue)
            }catch (e){
                return stValue
            }
        },
        removeItem(key: string) {
            cookies.remove(key)
        }
    },
    Time:{

    },
    Dom:{

    }
}
// 导出类型
export type ITools = typeof iTools
export default iTools