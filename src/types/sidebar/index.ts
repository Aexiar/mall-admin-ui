// Store 中的 State 的类型
export type StateType = {
    // 侧边栏
    sidebarOpened: boolean
};

// Store 中的 Action 的类型
export interface ActionType {
    // 切换侧边栏状态
    toggleSidebarOpened: () => void
}
