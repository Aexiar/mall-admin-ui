import {_GettersTree, defineStore} from "pinia";
import {StateType, ActionType} from '@/types/tabsview'

export const useTabsViewStore = defineStore<string, StateType, _GettersTree<StateType>, ActionType>('tabs-view', {
        state: () => {
            return {
                tabs: []
            }
        },
        actions: {
            addTab() {

            },
            removeTab() {

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

