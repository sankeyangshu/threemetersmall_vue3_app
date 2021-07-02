<!--
 * @Description: 商品详情页
 * @Author: 王振
 * @Date: 2021-06-25 12:45:01
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-02 13:48:09
-->
<template>
  <div class="goodsDetails">
    <!-- 头部导航条 开始 -->
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      fixed
      placeholder
      @click-left="onClickLeft"
    />
    <!-- 头部导航条 结束 -->

    <!-- 轮播图 开始 -->
    <van-swipe :autoplay="3000" lazy-render class="goodsDetails__swipe">
      <van-swipe-item>
        <img :src="goodsImg" class="goodsDetails__img" />
      </van-swipe-item>
    </van-swipe>
    <!-- 轮播图 结束 -->

    <!-- 商品名称 开始 -->
    <div class="product">
      <div class="product__price">
        <div class="proice__left">
          <span class="left__goodsPrice">￥{{ goodsPrice }}</span>
          <span class="left__linePrice">原价{{ linePrice }}</span>
        </div>
        <div class="price__right">已售{{ goodsSales }}件</div>
      </div>
      <div class="product__title">{{ goodsName }}{{ goodsInfo }}</div>
    </div>
    <!-- 商品名称 结束 -->

    <!-- 商品规格 开始 -->
    <sku :skuData="sku" :skuImg="goodsImg" :skuTitle="goodsName" :skuPrice="goodsPrice"></sku>
    <!-- 商品规格 结束 -->

    <!-- 商品详情 开始 -->
    <div class="product__details">
      <div class="details__title">商品详情</div>
      <div class="details__img">
        <van-image width="100%" fit="fill" :src="goodsDetail" />
      </div>
    </div>
    <!-- 商品详情 结束 -->

    <!-- 购买商品 开始 -->
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-action-bar-icon icon="cart-o" text="购物车" />
      <van-action-bar-button type="warning" text="加入购物车" />
      <van-action-bar-button type="danger" text="立即购买" />
    </van-action-bar>
    <!-- 购买商品 结束 -->
  </div>
</template>

<script lang="ts">
import Sku from "@/components/Sku.vue";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getGoodsDetailAPI } from "@/api/goods";

//返回上一级
const useReturnLevel = () => {
  const router = useRouter();
  const onClickLeft = () => {
    router.back();
  };
  return onClickLeft;
};

//获取商品详情
const useSeeProductDetail = () => {
  const route = useRoute();
  const goodsid = route.query.id; //获取列表页面传递的商品id

  const content = reactive({
    goodsName: "", //商品名称
    goodsInfo: "", //商品介绍
    goodsPrice: "", //商品价格
    linePrice: "", //商品原价
    goodsSales: "", //已售出多少
    sku: [], //商品sku
    goodsImg: "", //轮播图
    goodsDetail: "", //商品详情
  });

  onMounted(async () => {
    //获取后端传递的商品详情数据
    await getGoodsDetailAPI({ id: Number(goodsid) }).then((res) => {
      content.goodsName = res.data.goodsName;
      content.goodsInfo = res.data.goodsInfo;
      content.goodsPrice = res.data.goodsPrice;
      content.linePrice = res.data.linePrice;
      content.goodsSales = res.data.goodsSales;
      content.goodsImg = res.data.goodsImg;
      content.goodsDetail = res.data.goodsDetail;
      content.sku = res.data.sku;
    });
  });

  const { goodsName, goodsInfo, goodsPrice, linePrice, goodsSales, goodsImg, goodsDetail, sku } =
    toRefs(content);
  return { goodsName, goodsInfo, goodsPrice, linePrice, goodsSales, goodsImg, goodsDetail, sku };
};

export default defineComponent({
  components: { Sku },
  name: "GoodsDetails",
  setup() {
    const onClickLeft = useReturnLevel(); //返回上一级
    const { goodsName, goodsInfo, goodsPrice, linePrice, goodsSales, goodsImg, goodsDetail, sku } =
      useSeeProductDetail();
    return {
      onClickLeft,
      goodsName,
      goodsInfo,
      goodsPrice,
      linePrice,
      goodsSales,
      goodsImg,
      goodsDetail,
      sku,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/style/viriables.scss";
@import "@/style/mixins.scss";
.goodsDetails {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: $bgColor;
}
.goodsDetails__swipe {
  width: 100%;
  margin-bottom: 20px;
  background-color: #fff;
  .goodsDetails__img {
    width: 100%;
    height: 400px;
  }
}
.product {
  width: 100%;
  height: 160px;
  margin-bottom: 20px;
  background-color: #fff;
  .product__price {
    height: 60px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .proice__left {
      width: 70%;
      .left__goodsPrice {
        margin-right: 20px;
        font-size: 36px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: #d81d1d;
      }
      .left__linePrice {
        font-size: 24px;
        color: #747474;
        text-decoration: line-through;
      }
    }

    .price__right {
      width: 30%;
      height: 6px;
      line-height: 6px;
      text-align: right;
      color: #999;
    }
  }

  .product__title {
    height: 100px;
    padding: 0 20px;
    font-size: 28px;
    font-family: SourceHanSansCN;
    font-weight: 400;
    color: #666666;
    @include ellipsis-2;
  }
}

.produce__sku {
  margin-bottom: 20px;
  .sku__title {
    margin-right: 8px;
    font-size: 28px;
    color: #999;
    vertical-align: middle;
  }
  .sku__detail {
    font-size: 28px;
    color: #333;
    vertical-align: middle;
  }
}

.product__details {
  width: 100%;
  margin-bottom: 100px;
  .details__title {
    width: 100%;
    height: 100px;
    background-color: #fff;
    @include center;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: $fontColor;
  }

  .details__img {
    width: 100%;
  }
}
</style>
