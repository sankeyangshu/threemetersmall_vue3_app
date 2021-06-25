<!--
 * @Description: 商品卡片
 * @Author: 王振
 * @Date: 2021-06-25 10:33:39
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-25 12:21:28
-->
<template>
  <!-- 商品卡片 开始 -->
  <div class="goods__list">
    <div class="goods" v-for="(item, index) in list" :key="index">
      <div class="goods__img">
        <van-image width="280" height="270" :src="item.headPicture" />
      </div>
      <div class="goods__title">{{ item.productTitle }}</div>
      <div class="goods__price">￥{{ item.newPrice }}</div>
    </div>
  </div>
  <!-- 商品卡片 结束 -->
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "GoodList",
  setup() {
    const list = reactive([
      {
        headPicture: "https://img.yzcdn.cn/vant/cat.jpeg",
        productTitle: "测试商品",
        newPrice: "100",
      },
      {
        headPicture: "https://img.yzcdn.cn/vant/cat.jpeg",
        productTitle: "测试商品",
        newPrice: "100",
      },
      {
        headPicture: "https://img.yzcdn.cn/vant/cat.jpeg",
        productTitle: "测试商品",
        newPrice: "100",
      },
      {
        headPicture: "https://img.yzcdn.cn/vant/cat.jpeg",
        productTitle: "测试商品",
        newPrice: "100",
      },
    ]);
    return { list };
  },
});
</script>

<style lang="scss" scoped>
@import "@/style/viriables.scss";
@import "@/style/mixins.scss";
.goods__list {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .goods {
    width: 49%;
    margin-bottom: 10px;
    background-color: #fff;
    .goods__img {
      margin-bottom: 8px;
      padding-top: 8px;
      @include center;
    }

    .goods__title {
      width: 90%;
      margin-bottom: 8px;
      padding-left: 16px;
      overflow: hidden;
      @include ellipsis-2;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      color: $fontColor;
    }

    .goods__price {
      width: 100%;
      margin-bottom: 10px;
      padding-left: 16px;
      @include ellipsis;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      color: $priceColor;
    }
  }
}
</style>
