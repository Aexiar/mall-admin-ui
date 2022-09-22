import {AdminLoginType, AminLoginReturnType} from "@/types/ums/admin";
import request from '@/utils/request'

// 登录的方法
export const adminLoginAPI:(data:AdminLoginType) => PromiseResult<AminLoginReturnType> = (data) => {
  return request.post("/ums/admin/doLogin", data);
};
