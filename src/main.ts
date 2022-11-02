
import { createApp } from 'vue'
import App from './App.vue'
// 引入状态管理
import { setupStore } from '@/store'
import router from './router/index'
import '@/styles/reset.scss'
import 'virtual:svg-icons-register'
import svgIcon from "@/components/SvgIcon.vue";
import {createDiscreteApi} from "naive-ui";
import '@/plugins/windi.css'
import '@/router/guard/index'
import 'vfonts/OpenSans.css'
// 独立API
const { message, notification, dialog, loadingBar } = createDiscreteApi(["message", "dialog", "notification", 'loadingBar'])



const app = createApp(App)
app.use(router)
setupStore(app)
// 全局提供属性
app.provide("message", message)
app.provide("notification", notification)
app.provide("dialog", dialog)
app.provide("loadingBar", loadingBar)

app.component('svg-icon', svgIcon)

app.mount('#app')