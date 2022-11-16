import request from "@/utils/request";

export const login = (user : object) => {
    return request({
        url: import.meta.env.VITE_BASE_URL_WEB + '/login/login',
        method: 'post',
        data: user
    })
}

export const code = (email : string) => {
    return request({
        url: import.meta.env.VITE_BASE_URL_WEB + '/login/code',
        method: 'post',
        params: {email}
    })
}

export const navApi = () => {
    return request({
        url: import.meta.env.VITE_BASE_URL_WEB + '/index/nav',
        method: 'get'
    })
}

export const logout = () => {
    return request({
        url: import.meta.env.VITE_BASE_URL_WEB + '/login/logout',
        method: 'post',
    })
}
