/*
 * @Description: 工具类中公共的函数
 * @Author: 王振
 * @Date: 2021-06-25 12:41:28
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-25 12:41:44
 */

import store from "@/store";

/**
 * 验证是否已登录
 * @returns Boolean类型，用来判断是否已登录
 */
export const checkLogin = () => {
  return store.getters.token != "";
};
