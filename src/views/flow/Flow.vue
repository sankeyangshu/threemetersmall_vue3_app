<!--
 * @Description: 购物车页面
 * @Author: 王振
 * @Date: 2021-06-25 10:40:03
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-25 12:19:47
-->
<template>
  <div class="flow">
    <!-- 空状态 开始 -->
    <!-- <van-empty description="亲，购物车里还没有商品哦">
      <van-button round type="danger" class="bottom-button">去逛逛</van-button>
    </van-empty> -->
    <!-- 空状态 结束 -->

    <!-- 订单 开始 -->
    <div class="flow__list">
      <div class="list__details">
        <div class="details__check">
          <van-checkbox v-model="checked" checked-color="#ee0a24"></van-checkbox>
        </div>
        <div class="details__img">
          <van-image fit="fill" width="140" height="140" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </div>
        <div class="details__detail">
          <div class="detail__title">
            蓝之蓝蓝色瓶装经典Q7浓香型白酒500ml52度高端纯粮食酒2瓶装包邮
          </div>
          <div class="detail__sku">规格：红色</div>
          <div class="detail__price">
            <div class="price">￥123</div>
            <van-stepper v-model="value" disable-input />
          </div>
        </div>
      </div>
    </div>
    <!-- 订单 结束 -->

    <!-- 为你推荐 开始 -->
    <van-divider :style="{ color: '#999999', borderColor: '#999999', padding: '0 16px' }">
      <van-icon name="fire" color="#ee0a24" />为你推荐
    </van-divider>
    <good-list></good-list>
    <!-- 为你推荐 结束 -->

    <!-- 分割线 开始 -->
    <van-divider
      :style="{
        color: '#999999',
        borderColor: '#999999',
        padding: '0 16px',
        marginBottom: '100px',
      }"
    >
      我是有底线的
    </van-divider>
    <!-- 分割线 结束 -->

    <!-- 提交订单栏 开始 -->
    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked" checked-color="#ee0a24"> 全选 </van-checkbox>
    </van-submit-bar>
    <!-- 提交订单栏 结束 -->
  </div>

  <!-- 底部tab 开始 -->
  <bottom-tabs :currentIndex="2"></bottom-tabs>
  <!-- 底部tab 结束 -->
</template>

<script lang="ts">
import BottomTabs from "@/components/BottomTabs.vue";
import GoodList from "@/components/GoodList.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Flow",
  components: { BottomTabs, GoodList },
  setup() {
    const checked = ref(true);
    const value = ref(1); //当前输入的值
    return { checked, value };
  },
});
</script>

<style lang="scss" scoped>
@import "@/style/viriables.scss";
@import "@/style/mixins.scss";
.flow {
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 100px;
  right: 0;
  background-color: $bgColor;
}
.flow__list {
  width: 100%;
  background-color: #fff;
  margin-top: 10px;

  .list__details {
    padding: 10px;
    display: flex;
    align-items: center;
    .details__check {
      width: 66px;
      height: 180px;
      @include center;
      margin-right: 10px;
    }
    .details__img {
      width: 180px;
      height: 180px;
      margin-right: 20px;
    }
    .details__detail {
      height: 180px;
      display: flex;
      flex-direction: column;
      .detail__title {
        width: 280px;
        margin-bottom: 20px;
        font-size: 28px;
        font-weight: normal;
        color: #232323;
        @include ellipsis;
      }

      .detail__sku {
        width: 280px;
        margin-bottom: 20px;
        font-size: 28px;
        font-weight: normal;
        color: #999;
        @include ellipsis;
      }

      .detail__price {
        width: 320px;
        display: flex;
        justify-content: space-between;
        .price {
          width: 120px;
          font-size: 36px;
          font-family: SourceHanSansCN;
          font-weight: 400;
          color: #e21323;
        }
      }
    }
  }
}
.van-submit-bar {
  bottom: 100px;
}
.bottom-button {
  width: 320px;
  height: 80px;
}
</style>
