<!--
 * @Description: 底部导航栏组件
 * @Author: 王振
 * @Date: 2021-06-25 10:27:30
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-25 10:28:38
-->
<template>
  <div class="docker">
    <div
      v-for="(item, index) in dockerList"
      :class="{
        docker__item: true,
        'docker__item--active': index === currentIndex,
      }"
      :key="item.icon"
    >
      <router-link :to="item.to">
        <van-icon :name="item.icon" class="iconfont" />
        <div class="docker__title">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "BottomTabs",
  props: {
    currentIndex: {
      type: Number,
    },
  },
  setup() {
    const dockerList = [
      { icon: "shop-o", text: "首页", to: { name: "Home" } },
      { icon: "apps-o", text: "分类", to: { name: "Category" } },
      { icon: "shopping-cart-o", text: "购物车", to: { name: "Flow" } },
      { icon: "user-o", text: "我的", to: { name: "Mine" } },
    ];
    return {
      dockerList,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/style/viriables.scss";
.docker {
  display: flex;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 99px;
  border-top: 1px solid #f1f1f1;
  &__item {
    flex: 1;
    text-align: center;
    a {
      color: #333;
      text-decoration: none;
    }
    .iconfont {
      margin: 7px 0 2px 0;
      font-size: 40px;
    }
    &--active {
      a {
        color: $themeColor;
      }
    }
  }
  &__title {
    font-size: 50px;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>
