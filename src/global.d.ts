// 初始化全局变量
// 使用了export就意味着将文件以模块的形式进行管理
import type {IApp} from "./config/app.ts";

declare global{
    // 定义全局类型的声明
    declare namespace GlobalType{
        // 定义全局对象键的类型
        type IKey = string|number
        // 定义全局对象值的类型
        type IRecord = Record<IKey, any>
    }
    const app: IApp
    interface Window{
        app: IApp
    }
}
// 扩展 Vue 组件实例的自定义属性类型​​
declare module 'vue'{
    interface ComponentCustomProperties{
        app: IApp
    }
}
export {}