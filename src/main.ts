/*
 * @Description:项目入口文件
 * @Author: 王振
 * @Date: 2021-06-25 09:44:20
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-20 08:57:55
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css"; //统一各个浏览器之间的显示差异
import "./style/base.scss";
import "lib-flexible/flexible"; //移动端分辨率适配—rem
import "vant/lib/index.css"; //全局导入vant
import {
  Button,
  Icon,
  Search,
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  Image as VanImage,
  Divider,
  Cell,
  CellGroup,
  Empty,
  NavBar,
  Tab,
  Tabs,
  AddressList,
  AddressEdit,
  Card,
  ActionBar,
  ActionBarIcon,
  ActionBarButton,
  Field,
  SubmitBar,
  Checkbox,
  CheckboxGroup,
  Stepper,
  Toast,
  NoticeBar,
  Popup,
  List,
  SwipeCell,
} from "vant";

const app = createApp(App); //创建实例

app
  .use(Button)
  .use(Icon)
  .use(Search)
  .use(Swipe)
  .use(SwipeItem)
  .use(Grid)
  .use(GridItem)
  .use(VanImage)
  .use(Divider)
  .use(Cell)
  .use(CellGroup)
  .use(Empty)
  .use(NavBar)
  .use(Tab)
  .use(Tabs)
  .use(AddressList)
  .use(AddressEdit)
  .use(Card)
  .use(ActionBar)
  .use(ActionBarIcon)
  .use(ActionBarButton)
  .use(Field)
  .use(SubmitBar)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Stepper)
  .use(Toast)
  .use(NoticeBar)
  .use(Popup)
  .use(List)
  .use(SwipeCell);
app.use(store);
app.use(router);
app.mount("#app");
