import {
    AddType,
    AdminLoginType, AdminPageReturnType,
    AdminPageType,
    AminLoginReturnType,
    ChangePasswordType, EditType,
    ProfileReturnType, ViewReturnType
} from "@/types/ums/admin";
import request from "@/utils/request";

/* 登录 */
export const adminLoginApi: (data: AdminLoginType) => PromiseResult<AminLoginReturnType> = (data) => {
    return request.post("/ums/admin/doLogin", data);
};

/* 修改密码 */
export const changePasswordApi: (data: ChangePasswordType) => PromiseResult<null> = (data) => {
    return request.post('/ums/admin/changePassword', data)
}

/* 用户信息 */
export const profileApi: () => PromiseResult<ProfileReturnType> = () => {
    return request.get('/ums/admin/profile')
}

/* 退出登录 */
export const adminLogoutApi: () => PromiseResult<null> = () => {
    return request.post('/ums/admin/logout')
}

/* 分页获取管理员数据 */
export const adminPageListApi: (data: Partial<AdminPageType>) => PromiseResult<PaginationReturn<AdminPageReturnType>> = data => {
    return request.post(`/ums/admin/pageList/${data.pageNo}/${data.pageSize}`, {...data})
}

// 删除管理员数据
export const adminDeleteApi: (id: string) => PromiseResult<null> = (id: string) => {
    return request.delete(`/ums/admin/delete/${id}`)
}

// 管理员详情
export const adminViewApi: (id: string) => PromiseResult<ViewReturnType> = id => {
    return request.get(`/ums/admin/view/${id}`)
}

// 新增管理员
export const adminAddApi: (data: Partial<AddType>) => PromiseResult<null> = data => {
    return request.post(`/ums/admin/add`, {...data})
}

// 编辑管理员
export const adminEditApi: (data: Partial<EditType>, id: string) => PromiseResult<null> = (data, id) => {
    return request.put(`/ums/admin/edit/${id}`, {...data})
}
