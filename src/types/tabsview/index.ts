// Tab 的类型
export type TabType = {
    title: string,
    path: string
}

// Store 中的 State 的类型
export type StateType = {
    tabs: TabType[]
};

// Store 中的 Action 的类型
export interface ActionType {
    addTab: () => void,
    removeTab: () => void
}
