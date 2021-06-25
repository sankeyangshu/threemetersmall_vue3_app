<!--
 * @Description: 订单中心页面
 * @Author: 王振
 * @Date: 2021-06-25 12:47:57
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-25 12:48:12
-->
<template>
  <div class="order">
    <!-- 头部导航栏 开始 -->
    <van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 头部导航栏 结束 -->

    <!-- 标签页 开始 -->
    <van-tabs v-model:active="active">
      <van-tab title="全部订单">
        <order-list></order-list>
      </van-tab>
      <van-tab title="待付款">内容 2</van-tab>
      <van-tab title="待发货">内容 3</van-tab>
      <van-tab title="待收货">内容 4</van-tab>
    </van-tabs>
    <!-- 标签页 结束 -->
  </div>
</template>

<script lang="ts">
import { useRouter, useRoute } from "vue-router";
import { defineComponent, ref } from "vue";
import OrderList from "@/components/OrderList.vue";

export default defineComponent({
  name: "Order",
  components: { OrderList },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const active = ref(Number(route.params.active)); //当前激活标签对应的索引值，默认情况下启用第一个标签。
    const onClickLeft = () => {
      router.back();
    };
    return { active, onClickLeft };
  },
});
</script>

<style lang="scss" scoped>
@import "@/style/viriables.scss";
.order {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: $bgColor;
}
</style>
