<!--
 * @Description:个人中心页面
 * @Author: 王振
 * @Date: 2021-06-25 10:40:34
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-27 09:41:49
-->
<template>
  <div class="mine">
    <div class="total">
      <!-- 头像昵称 开始 -->
      <div class="personal__center">
        <div class="personal__center__avatarImg">
          <van-image
            round
            width="100"
            height="100"
            fit="fill"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
        <div class="personal__center__nickname">一号会员</div>
      </div>
      <!-- 头像昵称 结束 -->

      <!-- 订单 开始 -->
      <div class="order">
        <div class="total__order">
          <div class="order__title">我的订单</div>
          <div class="order__isLink">全部订单<van-icon name="arrow" /></div>
        </div>
        <van-grid class="grid__order">
          <van-grid-item icon="description" text="全部订单" to="Order" />
          <van-grid-item icon="balance-list-o" text="待付款" />
          <van-grid-item icon="logistics" text="待发货" />
          <van-grid-item icon="records" text="待收货" />
        </van-grid>
      </div>
      <!-- 订单 结束 -->
    </div>
    <!-- 收货地址、我的帮助 开始 -->
    <van-cell-group>
      <van-cell title="收货地址" icon="location-o" is-link to="AddressList" />
      <van-cell title="我的帮助" icon="question-o" is-link />
      <van-cell title="关于我们" icon="warning-o" is-link />
      <van-cell title="退出账号" icon="setting-o" is-link />
    </van-cell-group>
    <!-- 收货地址、我的帮助 结束 -->
  </div>

  <!-- 底部tab 开始 -->
  <bottom-tabs :currentIndex="3"></bottom-tabs>
  <!-- 底部tab 结束 -->
</template>

<script lang="ts">
import BottomTabs from "@/components/BottomTabs.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Mine",
  components: { BottomTabs },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import "@/style/viriables.scss";
@import "@/style/mixins.scss";
.mine {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 100px;
  right: 0;
  background-color: $bgColor;
  .total {
    width: 100%;
    margin-bottom: 160px;
    position: relative;
    .personal__center {
      width: 100%;
      height: 400px;
      background-color: #3fbb47;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      &__avatarImg {
        margin-left: 40px;
      }

      &__nickname {
        margin-left: 20px;
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: 400;
        color: $nickNameColor;
      }
    }
    .order {
      width: 90%;
      height: 260px;
      background-color: #fff;
      position: absolute;
      top: 280px;
      left: 36px;

      .total__order {
        height: 88px;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eee;
      }

      .grid__order {
        height: 172px;
      }
    }
  }
}
</style>
