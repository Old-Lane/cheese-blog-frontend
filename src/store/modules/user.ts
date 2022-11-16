import Cookies from "js-cookie";
import {defineStore} from "pinia";

interface UserState {
    user: User,
    isLogin: boolean
}
interface User {
    id: string,
    avatar: string,
    username: string,
    nickname: string,
    email: string,
    role: string
}

export const useUserStore = defineStore('user',{
    state: () : UserState => {
        return {
            user: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')!) : {},
            isLogin: false
        }
    },
    getters: {
        getUser() : User {
            return this.user
        },
        getIsLogin() : boolean {
            return this.isLogin
        }
    },
    actions: {
        setUser: function (user: User) : void {
            // @ts-ignore
            this.user = user
        },
        setIsLogin(isLogin : boolean): void {
            this.isLogin = isLogin
        },
    },
})