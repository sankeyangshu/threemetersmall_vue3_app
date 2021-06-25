/*
 * @Description: 项目路由总文件
 * @Author: 王振
 * @Date: 2021-06-25 09:44:20
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-25 12:49:25
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/home/Home.vue";
import { checkLogin } from "@/utils/app";

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
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/login/Login.vue"),
  },
  {
    path: "/addressList",
    name: "AddressList",
    component: () =>
      import(/* webpackChunkName: "addressList" */ "../views/addressList/AddressList.vue"),
  },
  {
    path: "/addressEdit",
    name: "AddressEdit",
    component: () =>
      import(/* webpackChunkName: "addressEdit" */ "../views/addressEdit/AddressEdit.vue"),
  },
  {
    path: "/goodsList",
    name: "GoodsList",
    component: () => import(/* webpackChunkName: "goodsList" */ "../views/goodsList/GoodsList.vue"),
  },
  {
    path: "/goodsDetails",
    name: "GoodsDetails",
    component: () =>
      import(/* webpackChunkName: "goodsDetails" */ "../views/goodsDetails/GoodsDetails.vue"),
  },
  {
    path: "/order",
    name: "Order",
    component: () => import(/* webpackChunkName: "order" */ "../views/order/Order.vue"),
  },
  {
    path: "/placeOrder",
    name: "PlaceOrder",
    component: () =>
      import(/* webpackChunkName: "placeOrder" */ "../views/placeOrder/PlaceOrder.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

//判断用户是否登录
router.beforeEach((to, from, next) => {
  const isLogin = checkLogin(); //获取用户是否登录状态
  const { name } = to;
  const isLoginOrRegister = name === "Login";
  isLogin || isLoginOrRegister ? next() : next({ name: "Login" });
});

export default router;
