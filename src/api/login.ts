/*
 * @Description: 用户登录注册接口管理
 * @Author: 王振
 * @Date: 2021-06-25 12:35:20
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-25 12:37:08
 */

//导入http
import http from "../utils/http";
//导入请求参数类型
import { registerParams, loginParams } from "@/types";

/**
 * @description: 用户注册
 * @param {registerParams} params 用户注册请求的参数，账号和密码
 * @return  返回请求注册接口的结果
 */
export function postRegisterAPI(params: registerParams) {
  return http.post("/api/user/register", params);
}

/**
 * @description: 用户登录
 * @param {loginParams} params 用户登录请求参数，账号和密码
 * @return 返回请求登录接口的结果
 */
export function postLoginAPI(params: loginParams) {
  return http.post("/api/user/login", params);
}
