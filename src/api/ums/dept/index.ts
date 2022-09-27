import request from "@/utils/request";
import {DeptListType, DeptReturnType} from "@/types/ums/dept";

/* 部门树 */
export const listTreeApi: (data: Partial<DeptListType>) => PromiseResult<DeptReturnType[]> = data => {
    return request.post(`/ums/dept/listTree`, {...data})
}
