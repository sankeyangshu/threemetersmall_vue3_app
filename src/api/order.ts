/*
 * @Description: 订单接口管理
 * @Author: 王振
 * @Date: 2021-07-27 16:40:15
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-27 16:58:57
 */

//导入http
import http from "../utils/http";

//订单列表页请求参数数据类型
interface orderListParams {
  pageIndex: number;
  pageSize: number;
}

//提交订单请求参数数据类型
interface addOrderType {
  addressId: number | string;
  goodsId: string;
  amountPayable: number;
  totalPrice: number;
  freightPrice: number;
  payStatus: number;
  orderStatus: number;
  isInvoice: boolean;
}

//修改订单请求参数数据类型
interface updateOrderType {
  id: number;
  payStatus?: number;
  orderStatus?: number;
}

//订单删除请求参数数据类型
interface orderDeleteParams {
  id: number;
}

/**
 * @description: 获取订单列表
 * @param {orderListParams} params 订单列表请求参数
 * @return 返回订单列表
 */
export function getOrderListAPI(params: orderListParams) {
  return http.get("/api/order/getOrder", params);
}

/**
 * @description: 新增订单
 * @param {addOrderType} params 请求参数
 * @return {*} 返回提交结果
 */
export function postAddOrderAPI(params: addOrderType) {
  return http.post("/api/order/addOrder", params);
}

/**
 * @description: 修改订单
 * @param {updateOrderType} params 请求参数
 * @return {*} 修改结果
 */
export function patchUpdateOrderAPI(params: updateOrderType) {
  return http.patch("/api/order/changeOrder", params);
}

/**
 * @description: 删除订单
 * @param {orderDeleteParams} params 请求参数
 * @return {*} 删除结果
 */
export function deleteOrderAPI(params: orderDeleteParams) {
  return http.delete("/api/order/deleteOrder", params);
}
