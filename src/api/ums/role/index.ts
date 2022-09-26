import request from "@/utils/request";
import {RolePageReturnType, RolePageType} from "@/types/ums/role";
import {AddType} from "@/types/ums/role";
import {ViewReturnType} from "@/types/ums/role";

/* 分页获取角色数据 */
export const rolePageListApi: (data: Partial<RolePageType>) => PromiseResult<PaginationReturn<RolePageReturnType>> = data => {
    return request.post(`/ums/role/pageList/${data.pageNo}/${data.pageSize}`, {...data})
}

/* 新增角色 */
export const roleAddApi: (data: Partial<AddType>) => PromiseResult<null> = data => {
    return request.post(`/ums/role/add`, {...data})
}

/* 角色详情 */
export const roleViewApi: (id: string) => PromiseResult<ViewReturnType> = id => {
    return request.get(`/ums/role/view/${id}`)
}
