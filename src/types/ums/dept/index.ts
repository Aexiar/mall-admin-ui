// 列表接口的数据类型
export type DeptListType = {
    // 部门名称
    deptName: string | null,
    // 状态
    status: number,
}

// 列表接口的返回值数据类型
export type DeptTreeReturnType = {
    // 主键
    id: string,
    // 父级id
    parentId: string,
    // 部门名称
    deptName: string,
    // 负责人id
    principalId: string,
    // 负责人
    principal: string
    // 状态
    status: number,
    // 排序
    sort: number,
    // 是否根节点
    isRoot: boolean,
    // 创建时间
    created: string,
    // 子节点
    children?: DeptTreeReturnType[]
}

