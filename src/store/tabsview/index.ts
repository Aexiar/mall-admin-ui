import {_GettersTree, defineStore} from "pinia";
import {StateType, ActionType, TabType} from '@/types/tabsview'

export const useTabsViewStore = defineStore<string, StateType, _GettersTree<StateType>, ActionType>('tabs-view', {
        state: () => {
            return {
                tabs: []
            }
        },
        actions: {
            addTab(data: TabType) {
                const tag = this.tabs.find(item => item.path == data.path);
                if (!tag) {
                    this.tabs.push(data)
                }
            },
            removeTab(path: string) {
                const index = this.tabs.findIndex(item => item.path == path);
                if (-1 !== index) {
                    this.tabs.splice(index, 1)
                }
            }
        },
        getters: {},
        persist: {
            enabled: true,
            strategies: [
                {
                    storage: localStorage,
                    paths: ['tabs']
                }
            ],
        },
    }
)

