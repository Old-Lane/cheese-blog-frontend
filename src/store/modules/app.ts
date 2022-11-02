import {defineStore} from "pinia";
import { store } from '@/store'
import {darkTheme, GlobalTheme} from "naive-ui";
import {useCache} from "@/hook/web/useCache";

const { wsCache } = useCache()


interface AppState {
    isDark: boolean,
    theme: GlobalTheme | null
}

export const useAppStore = defineStore('app', {
    state: () : AppState => {
        return {
            isDark: wsCache.get('isDark') || false,
            theme: wsCache.get('isDark') ? darkTheme : null,
        }
    },
    getters: {
        getIsDark() : boolean {
            return this.isDark
        },
        getTheme() : GlobalTheme | null {
            return this.theme
        }
    },
    actions: {
        setIsDark(isDark : boolean): void {
            this.isDark = isDark
            if (this.isDark) {
                document.documentElement.classList.add('dark')
                document.documentElement.classList.remove('light')
            } else {
                document.documentElement.classList.add('light')
                document.documentElement.classList.remove('dark')
            }
            if (isDark) {
                this.setTheme(darkTheme)
            } else {
                this.setTheme(null)
            }
            wsCache.set('isDark', this.isDark)
        },
        setTheme(theme : GlobalTheme | null): void {
            this.theme = theme
        }
    }
})

export const useAppStoreWithOut = () => {
    return useAppStore(store)
}