import axios from 'axios';
import errorCode from "@/utils/errorCode"
import {createDiscreteApi} from 'naive-ui'
import Cookies from "js-cookie";
import {getToken} from "@/utils/auth";
import {useRouter} from "vue-router";
import router from "@/router";
// const {push} = useRouter()

const {message, notification, dialog, loadingBar} = createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar']
)

const CancelToken: any = axios.CancelToken; // axios 的取消请求

const service = axios.create({
    baseURL: '',
    // baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000,  // 超时时间
    withCredentials: true,
    validateStatus() {
        return true;
    },
});

// 防止重复提交 利用axios的cancelToken
let pending: any[] = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识

/**
 * 取消重复请求
 * @param config
 * @param f
 */
const removePending: any = (config: any, f: any) => {
    const flgUrl = config.url;
    if (pending.indexOf(flgUrl) !== -1) {
        if (f) {
            f('取消重复请求');
        } else {
            pending.splice(pending.indexOf(flgUrl), 1); // 删除记录
        }
    } else {
        if (f) {
            pending.push(flgUrl);
        }
    }
}

/**
 * 请求拦截器
 */
service.interceptors.request.use(
    (config: any) => {
        if (!config.neverCancel) {
            // 生成canalToken
            config.cancelToken = new CancelToken((c: any) => {
                // removePending(config, c);
            });
        }
        // 添加请求头以及其他逻辑处理
        // console.log(getToken())
        config.headers['Authorization'] = getToken();  // 设置请求头
        return config;
    },
    (error: any) => {
        Promise.resolve(error).then(r => {
        });
    }
);

/**
 * 响应拦截器
 */

service.interceptors.response.use(
    (response: any) => {
        removePending(response.config);
        const res = response.data;
        // 未设置状态码则默认成功状态
        const code = res.code || 200;
        // 获取错误信息
        // @ts-ignore
        const msg = errorCode[code] || res.message || errorCode['default']
        //后端code错误判断
        if (response.status === 403) {
            // router.push('/login')
        }
        if (response.status === 401) {
            Cookies.remove('token')
            Cookies.remove('userInfo')
            Cookies.remove('uid')
            message.error('无效的会话，或者会话已过期，请重新登录。')
            return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
            message.error(msg)
            return Promise.reject(new Error(msg))
        } else if (code !== 200) {
            message.error(msg)
            return Promise.reject('error')
        } else {
            return res
        }
    },
    (error: any) => {
        if (error.message.includes('timeout')) {   // 判断请求异常信息中是否含有超时timeout字符串
            message.error('请求超时，请稍后再试')
            return Promise.reject(error);          // reject这个错误信息
        }
        message.error('服务器连接失败，请稍后再试')
        // Http错误状态码处理
        return Promise.reject(error);
    }
);


export default service;

