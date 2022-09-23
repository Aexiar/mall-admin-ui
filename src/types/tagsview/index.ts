import {LocationQuery, RouteMeta, RouteParams, RouteRecordName} from "vue-router"
// Store 中的 State 的类型
export type StateType = {
    tagsViewList: string[],
    currentTagIndex: number
};

// Store 中的 Action 的类型
export interface ActionType {
    addTagsViewList(tag: TagViewType): void

    removeTag(tag: TagViewType): void

    removeRightTag(tag: TagViewType): void

    setCurrentTagIndex(tag: TagViewType): void

    clearAllTag(): void

    clear(): void
}

export type TagViewType = {
    fullPath: string,
    meta: RouteMeta,
    name: RouteRecordName | null | undefined,
    params: RouteParams,
    path: string,
    query: LocationQuery,
    title?: string | null | undefined
}

