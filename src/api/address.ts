/*
 * @Description: 用户收货地址接口管理
 * @Author: 王振
 * @Date: 2021-06-25 12:37:27
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-25 12:37:46
 */

//导入http
import http from "../utils/http";
//导入参数类型
import { addressParams } from "@/types";

/**
 * @description: 获取用户收货地址列表
 * @return 返回用户收货地址列表
 */
export function getAddressListAPI() {
  return http.get("/api/address/getaddress");
}

/**
 * @description: 新增用户收货地址
 * @param {addressParams} params 收货地址参数
 * @return 返回新增地址是否成功的结果
 */
export function postAddNewAddressAPI(params: addressParams) {
  return http.post("/api/address/addaddress", params);
}
