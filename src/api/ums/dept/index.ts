import request from "@/utils/request";
import {AddType, DeptListType, DeptTreeReturnType, EditType} from "@/types/ums/dept";
import {ViewReturnType} from "@/types/ums/dept";

/* 部门树 */
export const deptListApi: (data: Partial<DeptListType>) => PromiseResult<DeptTreeReturnType[]> = data => {
    return request.post(`/ums/dept/list`, {...data})
}

/* 增加部门 */
export const deptAddApi: (data: Partial<AddType>) => PromiseResult<null> = (data) => {
    return request.post('/ums/dept/add', data)
}

/* 部门详情 */
export const deptViewApi: (id: string) => PromiseResult<ViewReturnType> = id => {
    return request.get(`/ums/dept/view/${id}`)
}

/* 部门编辑 */
export const deptEditApi: (data: EditType) =>PromiseResult<ViewReturnType>  = (data) => {
    return request.put(`/ums/dept/edit/`,data);
}

/* 部门删除 */
export const deptDeleteApi: (id: string) => PromiseResult<null> = (id: string) => {
    return request.delete(`/ums/dept/delete/${id}`)
}

