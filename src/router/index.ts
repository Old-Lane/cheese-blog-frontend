import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Layout from '@/layout/BaseLayout/index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Layout,
        redirect: '',
        children: [
            {
                path: '',
                name: 'Index',
                component: () => import('@/views/Home/index.vue')
            },
            {
                path: 'article/:id',
                name: 'ArticleDetail',
                component: () => import('@/views/ArticleDetail/index.vue')
            },
            {
                path: 'myClass',
                name: 'MyClass',
                component: () => import('@/views/MyClass/index.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login.vue')
    },
    {
        path: '/space/:uid',
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
                name: 'ArticleManager',
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
            {
                path: 'create/:id',
                name: 'Editor',
                component: () => import('@/views/CreateCenter/create/CreateArticle.vue')
            },
            {
                path: 'gradeHomework',
                name: 'GradeHomework',
                component: () => import('@/views/CreateCenter/GradeHomework/index.vue')
            },
            {
                path: '403',
                name: 'Platform403',
                component: () => import('@/views/error/403.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router
