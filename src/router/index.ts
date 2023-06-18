import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
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
                path: 'tag/:tag',
                name: 'Tag',
                component: () => import('@/views/Tag/index.vue')
            },
            {
                path: 'myClass',
                name: 'MyClass',
                component: () => import('@/views/MyClass/index.vue')
            },
            {
                path: '/space/:uid',
                name: 'PersonalCenter',
                redirect: '',
                component: () => import('@/views/PersonalCenter/index.vue'),
                children: [
                    {
                        path: '',
                        name: 'PersonalIndex',
                        component: () => import('@/views/PersonalCenter/components/ContentInfo/article.vue')
                    },
                    {
                        path: 'dynamic',
                        name: 'PersonalDynamic',
                        component: () => import('@/views/PersonalCenter/components/ContentInfo/dynamic.vue')
                    },
                    {
                        path: 'column',
                        name: 'PersonalColumn',
                        component: () => import('@/views/PersonalCenter/components/ContentInfo/column.vue')
                    },
                    {
                        path: 'friends',
                        name: 'PersonalFriends',
                        component: () => import('@/views/PersonalCenter/components/ContentInfo/friends.vue')
                    },
                    {
                        path: 'fans',
                        name: 'PersonalFans',
                        component: () => import('@/views/PersonalCenter/components/ContentInfo/fans.vue')
                    },
                    {
                        path: 'collect',
                        name: 'PersonalCollect',
                        component: () => import('@/views/PersonalCenter/components/ContentInfo/Collect.vue')
                    }
                ]
            },
            {
                path: 'collection/:id',
                name: 'Collection',
                component: () => import('@/views/Collection/index.vue')
            },
            {
                path: 'setting',
                name: 'Setting',
                component: () => import('@/views/Setting/index.vue'),
                redirect: '/setting/profile',
                children: [
                    {
                        path: 'profile',
                        name: 'Profile',
                        component: () => import('@/views/Setting/components/Profile.vue')
                    },
                    {
                        path: 'account',
                        name: 'Account',
                        component: () => import('@/views/Setting/components/Account.vue')
                    }
                ]
            },
            {
                path: 'chat',
                name: 'Chat',
                component: () => import('@/views/Chat/index.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login.vue')
    },
    /* {
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
    }, */
    {
        path: '/platform',
        name: 'Platform',
        component: () => import('@/layout/CreateCenterLayout/index.vue'),
        redirect: '/platform/home',
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import('@/views/CreateCenter/Home/home.vue')
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
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router
