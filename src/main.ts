/*
 * @Description:项目入口文件
 * @Author: 王振
 * @Date: 2021-06-25 09:44:20
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-25 10:01:39
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css"; //统一各个浏览器之间的显示差异
import "lib-flexible/flexible"; //移动端分辨率适配—rem
import "vant/lib/index.css"; //全局导入vant

const app = createApp(App); //创建实例

app.use(store);
app.use(router);
app.mount("#app");
