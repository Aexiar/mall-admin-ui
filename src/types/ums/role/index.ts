// 分页接口的数据类型
export type RolePageType = {
    // 角色名称
    roleName: string | null,
    // 角色编码
    roleCode: string | null,
    // 状态
    status: number,
    // 页码
    pageNo: number,
    // 每页显示条数
    pageSize: number
}

// 分页接口的返回值类型
export type RolePageReturnType = {
    // 主键
    id: string,
    // 角色名称
    roleName: string,
    // 角色编码
    roleCode: string,
    // 状态
    status: string,
    // 排序
    sort: string,
    // 创建时间
    created: string,
    // 更新时间
    updated: string
}

// 新增接口的数据类型
export type AddType = {
    // 角色名称
    roleName: string,
    // 角色编码
    roleCode: string,
    // 状态
    status: number,
    // 排序字段
    sort: number
}

// 查询接口的返回值类型
export type ViewReturnType = {
    // 主键
    id: string,
    // 角色名称
    roleName: string,
    // 角色编码
    roleCode: string,
    // 状态
    status: number,
    // 排序
    sort: number,
    // 创建时间
    created: string,
    // 更新时间
    updated: string
}

// 编辑接口的数据类型
export type EditType = {
    // 主键
    id: string,
    // 角色名称
    roleName: string,
    // 角色编码
    roleCode: string,
    // 状态
    status: number,
    // 排序
    sort: number,
}
