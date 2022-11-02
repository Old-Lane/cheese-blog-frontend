import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Layout from '@/layout/BaseLayout/index.vue'
import Cookies from "js-cookie";
import {useUserStore} from "@/store/modules/user";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Layout,
        children: []
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login.vue')
    },
    {
        path: '/:uid',
        name: 'PersonalCenter',
        component: () => import('@/layout/PersonalCenterLayout/index.vue'),
        children: [
            {
                path: '',
                name: 'PersonalIndex',
                component: () => import('@/views/PersonalCenter/src/index.vue')
            },
            {
                path: 'dynamic',
                name: 'PersonalDynamic',
                component: () => import('@/views/PersonalCenter/src/dynamic.vue')
            }
        ]
    },
    {
        path: '/platform',
        name: 'Platform',
        component: () => import('@/layout/CreateCenterLayout/index.vue'),
        redirect: '/platform/home',
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import('@/views/CreateCenter/home.vue')
            },
            {
                path: 'manager',
                name: 'Article',
                children: [
                    {
                        path: '',
                        name: 'content',
                        component: () => import('@/views/CreateCenter/manager/content/index.vue'),
                        children: [
                            {
                                path: 'article',
                                name: 'Article',
                                component: () => import('@/views/CreateCenter/manager/content/ArticleManager.vue')
                            },
                        ]
                    },
                    {
                        path: 'comment',
                        name: 'Comment',
                        component: () => import('@/views/CreateCenter/manager/content/CommentManager.vue')
                    },
                ]
            },
            {
                path: 'create',
                name: 'Create',
                component: () => import('@/views/CreateCenter/create/CreateArticle.vue')
            },

        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router
