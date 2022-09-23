import {NavigationGuardNext, RouteLocationNormalized} from "vue-router"
import router from "@/router"
import {useAdminStore} from '@/store/ums/admin'
import NProgress from 'accessible-nprogress'
import 'accessible-nprogress/dist/accessible-nprogress.min.css'

// 白名单
const whiteList = ['/login']

// 路由前置守卫：实现认证拦截（认证：判断用户是否登录过，如果登录过，就放行；如果没有登录，则强制让其跳转到登录页面）
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    NProgress.start()
    const {tokenValue, username, avatar} = useAdminStore()
    if (tokenValue) { // 如果用户已经登录，则不允许进去登录页面，主要为了防止重复登录
        if (to.path === '/login') {
            next({name: 'home'}) // 强制进入首页
        } else {
            // 此处还可以向后端发送请求获取用户的信息，并存储到 store 中
            // 需要注意的是：需要判断之前是否获取过用户的信息，如果之前已经获取过，就不需要再向后端发送请求获取用户的信息了（简而言之，判断 Store 中是否有用户信息）。
            if (!username || !avatar) {
                await useAdminStore().profileAction()
            }
            next()
        }
    } else { // 如果用户没有登录，则只允许进入登录页面
        if (whiteList.includes(to.path)) { // 判断请求路径是否在白名单
            next() // 放行
        } else {
            next('/login')
        }
    }
    // 手动强制关闭，为了解决手动切换地址的时候，进度条不关闭的问题
    NProgress.done()
})

// 全局后置守卫
router.afterEach((to: RouteLocationNormalized) => {
    NProgress.done()
    document.title = to.meta.title as string || import.meta.env.VITE_APP_TITLE
})

export default router
