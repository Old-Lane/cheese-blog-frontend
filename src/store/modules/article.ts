import {defineStore} from "pinia";

interface ArticleState {
    content: string
}

export const useArticleStore = defineStore('article', {
    state: () : ArticleState => {
        return {
            content: ''
        }
    },
    getters: {
        getContent() : string {
            return this.content
        }
    },
    actions: {
        setContent(content: string) : void {
            this.content = content
        },
    }
})