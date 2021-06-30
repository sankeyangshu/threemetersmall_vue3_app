/*
 * @Description: 分类接口管理
 * @Author: 王振
 * @Date: 2021-06-30 16:11:49
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-30 16:13:02
 */

//导入http
import http from "../utils/http";

/**
 * @description: 获取分类列表
 * @return 返回分类列表
 */
export function getCategoryListAPI() {
  return http.get("/api/category/getcategory");
}
