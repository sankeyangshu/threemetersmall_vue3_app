<!--
 * @Description: 订单页面
 * @Author: 王振
 * @Date: 2021-06-25 12:48:38
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-25 12:48:51
-->
<template>
  <div class="placeOrder">
    <!-- 订单详情头部导航栏 开始 -->
    <van-nav-bar title="订单详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 订单详情头部导航栏 结束 -->

    <!-- 送货地址 开始 -->
    <div class="myAddress">
      <div class="address">
        <div class="left__icon">
          <van-icon name="location-o" size="36" />
        </div>
        <div class="myInfo">
          <div class="myInfo__detail">
            <span>一号</span>
            <span>12345678912</span>
          </div>
          <div class="myInfo__address">宿迁市洋河新区电商产业园105号</div>
        </div>
        <div class="right__icon">
          <van-icon name="arrow" size="36" />
        </div>
      </div>
    </div>
    <!-- 送货地址 结束 -->

    <!-- 商品 开始 -->
    <van-card
      num="2"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
    />
    <!-- 商品 结束 -->

    <!-- 配送方式 开始 -->
    <van-cell-group>
      <van-cell title="应付金额">
        <div class="total__price">￥123.00</div>
      </van-cell>
      <van-cell title="商品总价" value="￥123.00" />
      <van-cell title="运费" value="￥0.00" />
      <van-cell title="发票信息" value="不需要发票" />
    </van-cell-group>
    <!-- 配送方式 结束 -->

    <!-- 订单金额 开始 -->
    <div class="sumbit">
      <van-button type="primary" block color="#d81d1d">提交订单</van-button>
    </div>
    <!-- 订单金额 结束 -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "PlaceOrder",
  setup() {
    const router = useRouter();
    const onClickLeft = () => {
      router.back();
    };
    return { onClickLeft };
  },
});
</script>

<style lang="scss" scoped>
@import "@/style/viriables.scss";
@import "@/style/mixins.scss";
.placeOrder {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: $bgColor;
}
.myAddress {
  background-color: #fff;
  padding: 20px 20px;
  margin-bottom: 20px;
  .address {
    display: flex;
    align-items: center;
    .left__icon {
      height: 120px;
      @include center;
    }

    .myInfo {
      width: 94%;
      height: 120px;
      display: flex;
      flex-direction: column;
      .myInfo__detail {
        height: 60px;
        display: flex;
        align-items: center;
        span {
          margin-right: 20px;
          font-size: 28px;
          font-weight: bold;
          color: #232323;
        }
      }
      .myInfo__address {
        height: 60px;
        font-size: 28px;
        color: #232323;
      }
    }

    .right__icon {
      height: 120px;
      @include center;
    }
  }
}
.van-card {
  background-color: #fff;
}
.van-cell-group {
  margin: 20px 0;
}
.total__price {
  color: #e21323;
}
.sumbit {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
