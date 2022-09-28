import request from "@/utils/request";
import {AddType, DeptListType, DeptTreeReturnType} from "@/types/ums/dept";
import {ViewReturnType} from "@/types/ums/dept";

/* 部门树 */
export const deptListTreeApi: (data: Partial<DeptListType>) => PromiseResult<DeptTreeReturnType[]> = data => {
    return request.post(`/ums/dept/listTree`, {...data})
}

/* 增加部门 */
export const deptAddApi: (data: Partial<AddType>) => PromiseResult<null> = (data) => {
    return request.post('/ums/dept/add', data)
}

/* 部门详情 */
export const deptViewApi: (id: string) => PromiseResult<ViewReturnType> = id => {
    return request.get(`/ums/dept/view/${id}`)
}

