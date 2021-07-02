<!--
 * @Description: 商品sku组件
 * @Author: 王振
 * @Date: 2021-07-01 10:04:40
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-02 14:03:33
-->
<template>
  <!-- 商品sku单元格 开始 -->
  <van-cell is-link class="produce__sku" @click="OnClickShowSku">
    <!-- 使用 title 插槽来自定义标题 -->
    <template #title>
      <span class="sku__title">选择：</span>
      <span class="sku__detail" v-for="(item, index) in skuData" :key="index">
        {{ item.skuTitle }}
      </span>
    </template>
  </van-cell>
  <!-- 商品sku单元格 结束 -->

  <!-- 商品sku弹出层 开始 -->
  <van-popup v-model:show="isShowSku" position="bottom" :style="{ height: '50%' }">
    <div class="sku">
      <div class="sku__total">
        <div class="sku__total__img">
          <van-image width="100%" height="100%" :src="skuImg" />
        </div>
        <div class="sku__total__detail">
          <div class="detail__content">
            {{ skuTitle }}
          </div>
          <div class="detail__price">￥{{ skuPrice }}</div>
          <div class="detail__sku">请选择<span>尺码</span></div>
        </div>
      </div>
      <div class="sku__list" v-for="(items, index) in skuData" :key="index">
        <div class="sku__list__title">{{ items.skuTitle }}</div>
        <div class="sku__list__spec">
          <div class="spec__item" v-for="(item, index) in items.skuList" :key="index">
            <span>{{ item }}</span>
          </div>
          <!-- <div class="spec__item spec__item-active">
            <span>红色</span>
          </div>
          <div class="spec__item spec__item-disabled">
            <span>灰色</span>
          </div> -->
        </div>
      </div>
      <div class="sku__num">
        <div class="num__title">购买数量</div>
        <van-stepper v-model="purchaseNum" />
      </div>
      <div class="sku__btn">
        <van-button type="primary" size="large" color="#3fbb47">加入购物车</van-button>
      </div>
    </div>
  </van-popup>
  <!-- 商品sku弹出层 结束 -->
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

//商品sku数据类型
interface skuPropsType {
  skuTitle: string;
  skuList: string[];
}

//商品sku弹出层显示和隐藏
const useShowSkuProp = () => {
  const isShowSku = ref(false); //控制商品sku弹出层的显示和隐藏
  const OnClickShowSku = () => {
    isShowSku.value = true;
  }; //显示商品sku弹出层
  return { isShowSku, OnClickShowSku };
};

export default defineComponent({
  name: "Sku",
  props: {
    skuData: {
      //商品sku数据
      required: true,
      type: Array as PropType<skuPropsType[]>,
    },
    skuImg: {
      //商品缩略图
      type: String,
    },
    skuTitle: {
      //商品名称
      type: String,
    },
    skuPrice: {
      //商品价格
      type: String,
    },
  },
  setup() {
    const purchaseNum = ref(1); //步进器由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数字。
    const { isShowSku, OnClickShowSku } = useShowSkuProp(); //商品sku弹出层显示和隐藏
    return { isShowSku, OnClickShowSku, purchaseNum };
  },
});
</script>

<style lang="scss" scoped>
@import "@/style/mixins.scss";
.produce__sku {
  margin-bottom: 20px;
  .sku__title {
    margin-right: 8px;
    font-size: 28px;
    color: #999;
    vertical-align: middle;
  }
  .sku__detail {
    margin-right: 10px;
    font-size: 28px;
    color: #333;
    vertical-align: middle;
  }
}

.sku {
  width: 100%;
  height: 100%;
  &__total {
    width: 90%;
    margin: 0 auto;
    padding: 20px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #dcdfe6;
    &__img {
      width: 120px;
      height: 120px;
      margin-right: 20px;
    }

    &__detail {
      width: 530px;
      height: 120px;
      display: flex;
      flex-direction: column;
      .detail__content {
        width: 530px;
        height: 60px;
        @include ellipsis-2;
        font-size: 26px;
      }

      .detail__price {
        height: 30px;
        line-height: 30px;
        font-size: 30px;
        color: #d81616;
      }

      .detail__sku {
        height: 30px;
        line-height: 30px;
        font-size: 20px;
        color: #909399;
        span {
          margin-left: 10px;
          font-size: 24px;
          color: #606266;
        }
      }
    }
  }

  &__list {
    width: 90%;
    margin: 0 auto;
    padding: 20px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #dcdfe6;
    &__title {
      height: 40px;
      line-height: 40px;
      margin-bottom: 20px;
      font-size: 26px;
      color: #606266;
    }

    &__spec {
      width: 100%;
      display: flex;
      flex-direction: row;
      .spec__item {
        display: inline-block;
        margin-right: 10px;
        border: 1px solid #303133;
        padding: 10px;
        span {
          cursor: pointer;
        }
      }
      .spec__item-active {
        border: 1px solid #303133;
        background-color: red;
        color: #fff;
      }
      .spec__item-disabled {
        color: #c0c4cc;
        cursor: not-allowed;
        background-image: none;
        background-color: #fff;
        border-color: #303133;
      }
    }
  }

  &__num {
    width: 90%;
    margin: 0 auto;
    padding: 20px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .num__title {
      font-size: 26px;
      color: #606266;
    }
  }

  &__btn {
    width: 100%;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    border: 1px solid #3fbb47;
  }
}
</style>
