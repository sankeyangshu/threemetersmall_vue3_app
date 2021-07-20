/*
 * @Description: 商品接口管理
 * @Author: 王振
 * @Date: 2021-07-01 17:28:25
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-19 15:38:14
 */

//导入http
import http from "../utils/http";

//商品列表页请求参数数据类型
interface goodsListParams {
  categoryId: number;
  pageIndex: number;
  pageSize: number;
}

//商品详情页请求参数数据类型
interface goodsDetailParams {
  id: number;
}

/**
 * @description: 获取商品列表数据
 * @param {goodsListParams} params 请求参数-分类id，页面，每页多少条
 * @return {*}
 */
export function getGoodsListAPI(params: goodsListParams) {
  return http.get("/api/goods/goodslist", params);
}

/**
 * @description: 获取商品详情数据
 * @param {goodsDetailParams} params 请求参数，商品id
 * @return {*}
 */
export function getGoodsDetailAPI(params: goodsDetailParams) {
  return http.get("/api/goods/goodsdetail", params);
}
