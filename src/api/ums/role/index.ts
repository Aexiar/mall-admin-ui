import request from "@/utils/request";
import {RolePageReturnType, RolePageType} from "@/types/ums/role";

/* 分页获取管理员数据 */
export const rolePageListApi: (data: Partial<RolePageType>) => PromiseResult<PaginationReturn<RolePageReturnType>> = data => {
    return request.post(`/ums/role/pageList/${data.pageNo}/${data.pageSize}`, {...data})
}
