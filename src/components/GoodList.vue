<!--
 * @Description: 商品卡片
 * @Author: 王振
 * @Date: 2021-06-25 10:33:39
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-20 09:34:04
-->
<template>
  <!-- 商品卡片 开始 -->
  <div class="goods__list">
    <div class="goods" v-for="item in goodsList" :key="item.id" @click="OnClickViewDetail(item.id)">
      <div class="goods__img">
        <van-image width="280" height="270" :src="item.goodsImg" />
      </div>
      <div class="goods__title">{{ item.goodsName }}</div>
      <div class="goods__price">￥{{ item.goodsPrice }}</div>
    </div>
  </div>
  <!-- 商品卡片 结束 -->
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";

//商品列表数据类型
interface goodsListType {
  categoryId: number;
  goodsImg: string;
  goodsInfo: string;
  goodsName: string;
  goodsPrice: string | number;
  id: number;
  linePrice: string | number;
}

export default defineComponent({
  name: "GoodList",
  props: {
    goodsList: {
      required: true,
      type: Array as PropType<goodsListType[]>,
    },
  },
  setup() {
    const router = useRouter();
    //查看商品详情
    const OnClickViewDetail = (id: number) => {
      router.push({
        name: "GoodsDetails",
        query: {
          id,
        },
      });
    };
    return { OnClickViewDetail };
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
