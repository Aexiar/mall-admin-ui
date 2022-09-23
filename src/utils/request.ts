// 基于 axios 进行二次封装
import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios"
import {ElMessage} from 'element-plus'
import {useAdminStore} from '@/store/ums/admin'
import qs from 'qs'
import router from '@/router'
import {ReturnCodeEnum} from "@/types/enums";

// 给 axios 配置全局默认值
const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout: 3000
})

// 添加请求拦截器
instance.interceptors.request.use((config: AxiosRequestConfig) => {
    // 从 store 中获取 token
    const {tokenValue, tokenName} = useAdminStore()
    if (tokenValue) {
        config.headers = {[tokenName as string]: `Bearer ${tokenValue}`, ...config.headers}
    }
    // qs 是 axios 自带的序列化参数方式
    if (config.headers && config.headers["Content-Type"] &&
        config.headers["Content-Type"] === "application/x-www-form-urlencoded") {
        config.params = qs.stringify(config.params);
    }
    return config
}, (error: AxiosError) => {
    return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(async (response: AxiosResponse) => {
    const result: Result = response.data
    if (result.code === ReturnCodeEnum.SUCCESS_CODE) { // 请求成功，并且业务成功，返回解析后的数据
        return result
    } else { // 请求成功，业务失败，给出对应的提示
        if (result.code === ReturnCodeEnum.UNAUTHORIZED_CODE) { // 如果 token 过期，token 过时，token 无效等原因，就退出登录
            // 调用清空缓存操作
            const {clear} = useAdminStore()
            await clear();
            await router.push('/login')
            // 如果 401 不需要继续将下抛出异常，直接中断即可
            return new Promise(() => {
            })
        } else {
            ElMessage.error(result.msg) // 提示错误消息
        }
        return Promise.reject(result)
    }

}, (error: AxiosError) => { // 请求失败
    ElMessage.error(error.message) // 提示错误消息
    return new Promise(() => {
    })
})

export default instance
