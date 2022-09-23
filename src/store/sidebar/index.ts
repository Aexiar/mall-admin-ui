import {_GettersTree, defineStore} from "pinia";
import {StateType, ActionType} from '@/types/sidebar'

export const useSidebarStore = defineStore<string, StateType, _GettersTree<StateType>, ActionType>('sidebar', {
        state: () => {
            return {
                sidebarOpened: false
            }
        },
        actions: {
            toggleSidebarOpened(): void {
                this.sidebarOpened = !this.sidebarOpened
            }
        },
        getters: {
            sidebarOpenedGetter() {
                return this.sidebarOpened
            }
        },
        persist: {
            enabled: true,
            strategies: [
                {
                    storage: localStorage,
                    paths: ['sidebarOpened']
                }
            ],
        },
    }
)

