/*
 * @Description: 购物车接口管理文件
 * @Author: 王振
 * @Date: 2021-07-19 14:07:57
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-20 13:13:50
 */

//导入http
import http from "../utils/http";

//购物车列表请求参数类型
interface shoppingListParams {
  pageIndex: number;
  pageSize: number;
}

//添加购物车商品
interface addShoppingType {
  goodsId: number; //商品id
  goodsName: string; //商品名称
  goodsImg: string; //商品头图
  goodsNumber: number; //商品数量
  goodsPrice: number; //商品价格
  spec: string; //商品规格
  isChecked: boolean; //是否选中该商品
  isDelete?: number; //是否删除了该商品
}

//更新购物车商品
interface updateShopType {
  id: number; //购物车id
  goodsNumber?: number; //商品数量
  isChecked?: boolean; //是否选中该商品
}

//删除购物车商品
interface deleteShopType {
  id: number; //购物车id
}

/**
 * @description: 获取购物车列表数据
 * @param {shoppingListParams} params 请求参数-页面，每页多少条
 * @return {*}
 */
export function getShoppingAPI(params: shoppingListParams) {
  return http.get("/api/shoppingcart/getshopping", params);
}

/**
 * @description: 添加购物车
 * @param {addShoppingType} params 请求参数
 * @return {*}
 */
export function postAddShoppingAPI(params: addShoppingType) {
  return http.post("/api/shoppingcart/addshopping", params);
}

/**
 * @description: 更新购物车
 * @param {updateShopType} params 请求参数
 * @return {*}
 */
export function patchUpdateShopAPI(params: updateShopType) {
  return http.patch("/api/shoppingcart/updateshopping", params);
}

/**
 * @description: 删除购物车
 * @param {deleteShopType} params 请求参数
 * @return {*}
 */
export function deleteShoppingAPI(params: deleteShopType) {
  return http.delete("/api/shoppingcart/deleteshopping", params);
}
