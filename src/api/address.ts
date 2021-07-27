/*
 * @Description: 用户收货地址接口管理
 * @Author: 王振
 * @Date: 2021-06-25 12:37:27
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-27 15:10:44
 */

//导入http
import http from "../utils/http";
//导入参数类型
import { addressParams, updateAddressParams } from "@/types";
//删除地址和获取地址详情数据共用类型
interface deleteAddressType {
  id: number; //地址id
}

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

/**
 * @description: 获取用户收货地址详情
 * @param {deleteAddressType} params 请求参数
 * @return 返回用户收货地址详情
 */
export function getAddressDetailAPI(params: deleteAddressType) {
  return http.get("/api/address/getaddressdetail", params);
}

/**
 * @description: 用户修改收货地址
 * @param {updateAddressParams} params 请求参数
 * @return 返回修改结果
 */
export function patchAddressAPI(params: updateAddressParams) {
  return http.patch("/api/address/modifyaddress", params);
}

/**
 * @description: 用户删除地址
 * @param {deleteAddressType} params 请求参数
 * @return 返回删除结果
 */
export function deleteAddressAPI(params: deleteAddressType) {
  return http.delete("/api/address/deladdress", params);
}
