<!--
 * @Description: 商品列表页
 * @Author: 王振
 * @Date: 2021-06-25 12:46:05
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-25 12:46:21
-->
<template>
  <div class="goodsList">
    <!-- 头部导航栏 开始 -->
    <van-nav-bar title="我的地址" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 头部导航栏 结束 -->

    <!-- 搜索框 开始 -->
    <van-search v-model="value" placeholder="请输入搜索关键词" />
    <!-- 搜索框 结束 -->

    <!-- 商品列表 开始 -->
    <van-card
      num="2"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      @click="OnClickGoodsDetails"
    />
    <!-- 商品列表 结束 -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "GoodsList",
  setup() {
    const router = useRouter();
    const value = ref("");
    const onClickLeft = () => {
      router.back();
    };
    const OnClickGoodsDetails = () => {
      router.push("GoodsDetails");
    }; //查看商品详情
    return { value, onClickLeft, OnClickGoodsDetails };
  },
});
</script>

<style lang="scss" scoped>
@import "@/style/viriables.scss";
.goodsList {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: $bgColor;
}
.van-card {
  background-color: #fff;
}
</style>
