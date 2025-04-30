import sysCfg, {type ISysCfg, type ISysCfgBModItem} from './syscfg'
const app = {
    // 使用泛型函数获取对应的配置信息
    getConfig<T>(key:keyof ISysCfg):T{
        return sysCfg[key] as unknown as T
    },
    // 判断哪些业务模块是开启的(这里能自动推断返回类型就不显示指定了)
    checkBModIsEnable(stModuleName:string){
        // 获取业务模块列表
        const bModNames: ISysCfgBModItem[] = app.getConfig<ISysCfgBModItem[]>('bModNames')
        // 传入模块的名称与当前名称匹配且为开启状态
        if (bModNames.find(item => item.name == stModuleName && item.enable)){
            return true
        }
        return false
    }
}

// 检索变量中的元素类型并导出
export type IApp = typeof app

// 导出方法很关键
// 直接导出app对象，而不是包含app的对象，否则相关方法无法进行调用
export default app