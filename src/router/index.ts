/*
 * @Description: 项目路由总文件
 * @Author: 王振
 * @Date: 2021-06-25 09:44:20
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-25 10:25:52
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/home/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/category",
    name: "Category",
    component: () => import(/* webpackChunkName: "category" */ "../views/category/Category.vue"),
  },
  {
    path: "/flow",
    name: "Flow",
    component: () => import(/* webpackChunkName: "flow" */ "../views/flow/Flow.vue"),
  },
  {
    path: "/mine",
    name: "Mine",
    component: () => import(/* webpackChunkName: "mine" */ "../views/mine/Mine.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
