<!--
 * @Description: 订单列表组件
 * @Author: 王振
 * @Date: 2021-06-25 12:38:13
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-25 12:38:30
-->
<template>
  <div class="total__order">
    <div class="order__state">
      <div class="state__num">单号：2132165457654545</div>
      <!-- <div class="state">待付款</div>
      <div class="state">代发货</div>
      <div class="state">待收货</div> -->
      <div class="state">交易成功</div>
    </div>
    <div class="order__goods">
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      />
    </div>
    <div class="order__price">
      <div class="price__num">共1件</div>
      <div class="price__total">应付总额：<span>￥123.00</span></div>
    </div>
    <div class="order__btn">
      <van-button type="default" size="small" class="btn"> 删除订单 </van-button>
      <van-button color="#d81d1d" size="small" class="btn"> 去付款 </van-button>
      <van-button color="#d81d1d" size="small" class="btn"> 催发货 </van-button>
      <van-button color="#d81d1d" size="small" class="btn"> 确认收货 </van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "OrderList",
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.total__order {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  .order__state {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d4d4d4;
    .state__num {
      font-size: 28px;
    }
    .state {
      font-size: 28px;
      color: #787878;
    }
  }

  .order__goods {
    border-bottom: 1px solid #d4d4d4;
  }

  .order__price {
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
    .price__num {
      margin: 0 10px;
      font-size: 28px;
    }
    .price__total {
      font-size: 28px;
      span {
        color: #d81d1d;
      }
    }
  }

  .order__btn {
    display: flex;
    justify-content: flex-end;
    .btn {
      margin-left: 20px;
    }
  }
}
.van-card {
  background-color: #fff;
}
</style>
