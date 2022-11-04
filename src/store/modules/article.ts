import {defineStore} from "pinia";

interface ArticleState {
    content: string,
    isSave: boolean
}

export const useArticleStore = defineStore('article', {
    state: () : ArticleState => {
        return {
            content: '',
            isSave: false
        }
    },
    getters: {
        getContent() : string {
            return this.content
        },
        getIsSave(): boolean {
            return this.isSave
        }
    },
    actions: {
        setContent(content: string) : void {
            this.content = content
        },
        setIsSave(isSave: boolean) : void {
            this.isSave = isSave
        }
    }
})