/*
 * @Description: vuex的入口文件
 * @Author: 王振
 * @Date: 2021-06-25 09:44:20
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-25 12:41:05
 */
import { createStore } from "vuex";
import { user } from "./modules";
import getters from "./getters";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
  },
  getters,
});
