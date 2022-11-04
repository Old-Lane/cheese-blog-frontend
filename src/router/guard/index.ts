import router from '@/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {useUserStore} from "@/store/modules/user";
import {getUserInfoApi} from "@/api/login";
import Cookies from "js-cookie";
import {storeToRefs} from "pinia";

nProgress.configure({
    showSpinner: false
})

const whiteList = ['/login', '/'] // 不重定向白名单
const isLogin = Cookies.get('token')

// 全局前置守卫
router.beforeEach((to, from, next) => {
    nProgress.start()

    if (Cookies.get('token')) {
        if (to.path === '/login') {
            next({ path: '/' })
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
        }
    }

    next();
});

// 全局后置钩子
router.afterEach(() => {
    nProgress.done(true)
})