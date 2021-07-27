<!--
 * @Description: 购物车页面
 * @Author: 王振
 * @Date: 2021-06-25 10:40:03
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-27 11:51:40
-->
<template>
  <div class="flow">
    <!-- 空状态 开始 -->
    <van-empty description="亲，购物车里还没有商品哦" v-if="flowList.length == 0">
      <van-button round type="danger" class="bottom-button">去逛逛</van-button>
    </van-empty>
    <!-- 空状态 结束 -->

    <!-- 订单 开始 -->
    <div v-else>
      <van-swipe-cell v-for="item in flowList" :key="item.id">
        <div class="flow__list">
          <div class="list__details">
            <div class="details__check">
              <van-checkbox v-model="item.isChecked" checked-color="#ee0a24"></van-checkbox>
            </div>
            <div class="details__img" @click="OnClickViewDetail(item.goodsId)">
              <van-image fit="fill" width="140" height="140" :src="item.goodsImg" />
            </div>
            <div class="details__detail">
              <div class="detail__title">
                {{ item.goodsName }}
              </div>
              <div class="detail__sku">
                规格：<span v-for="(its, index) in item.spec" :key="index">{{ its }}</span>
              </div>
              <div class="detail__price">
                <div class="price">￥{{ item.goodsPrice }}</div>
                <van-stepper
                  v-model="item.goodsNumber"
                  max="99"
                  disable-input
                  @plus="OnPlusGoodsNum(item.id, item.goodsNumber)"
                  @minus="OnMinusGoodsNum(item.id, item.goodsNumber)"
                />
              </div>
            </div>
          </div>
        </div>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete__button"
            @click="OnClickDeleteCart(item.id)"
          />
        </template>
      </van-swipe-cell>
    </div>
    <!-- 订单 结束 -->

    <!-- 为你推荐 开始 -->
    <van-divider :style="{ color: '#999999', borderColor: '#999999', padding: '0 16px' }">
      <van-icon name="fire" color="#ee0a24" />为你推荐
    </van-divider>
    <good-list :goodsList="goodsList"></good-list>
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
    <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="allChecked" checked-color="#ee0a24"> 全选 </van-checkbox>
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
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";
import { getShoppingAPI, patchUpdateShopAPI, deleteShoppingAPI } from "@/api/shoppingcart";
import { getGoodsListAPI } from "@/api/goods";
import { useRouter } from "vue-router";
import { Toast } from "vant";

//购物车逻辑
const useShoppingCart = () => {
  const router = useRouter();
  const content = reactive({
    flowList: [], //购物车列表
  });

  //生命周期函数
  onMounted(async () => {
    //获取购物车列表数据
    getShoppingList();
  });

  //查看购物车商品详情
  const OnClickViewDetail = (id: number | string) => {
    router.push({
      name: "GoodsDetails",
      query: {
        id,
      },
    });
  };

  //获取购物车列表数据
  const getShoppingList = async () => {
    const { data } = await getShoppingAPI({
      pageIndex: 0,
      pageSize: 100,
    });
    if (data.shoppingList.length != 0) {
      content.flowList = data.shoppingList.map((res: any) => {
        res.spec = JSON.parse(res.spec);
        res.goodsPrice = res.goodsPrice * res.goodsNumber;
        return res;
      });
    }
  };

  //更新购物车数据-增加购物车商品数量
  const OnPlusGoodsNum = (id: number, num: number) => {
    patchUpdateShopAPI({
      id,
      goodsNumber: num + 1, //商品数量
    }).then(() => {
      //更新购物车列表数据
      getShoppingList();
    });
  };
  //更新购物车数据-减少购物车商品数量
  const OnMinusGoodsNum = (id: number, num: number) => {
    patchUpdateShopAPI({
      id,
      goodsNumber: num - 1, //商品数量
    }).then(() => {
      //更新购物车列表数据
      getShoppingList();
    });
  };

  //删除购物车数据
  const OnClickDeleteCart = (id: number) => {
    deleteShoppingAPI({ id }).then(() => {
      //更新购物车列表数据
      getShoppingList();
    });
  };

  //计算购物车商品总金额
  const totalPrice = computed(() => {
    const list = JSON.parse(JSON.stringify(content.flowList));
    let count = 0;
    if (list) {
      for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (element.isChecked) {
          count += element.goodsPrice;
        }
      }
    }
    return Number((count * 100).toFixed(2));
  });

  //计算购物车是否全选
  const allChecked = computed(() => {
    const list = JSON.parse(JSON.stringify(content.flowList));
    let result = true;
    if (list) {
      for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (!element.isChecked) {
          result = false;
        }
      }
    }
    return result;
  });

  //全选功能
  const OnChangeAllCheck = () => {
    console.log("checked");
  };

  //提交订单
  const onSubmit = () => {
    let result = content.flowList.some((val: any) => {
      return val.isChecked;
    });
    if (result) {
      router.push({
        name: "PlaceOrder",
        query: {
          list: JSON.stringify(content.flowList),
          totalPrice: Number(totalPrice),
        },
      });
    } else {
      Toast("请选择要购买的商品");
    }
  };

  const { flowList } = toRefs(content);
  return {
    flowList,
    totalPrice,
    allChecked,
    OnPlusGoodsNum,
    OnMinusGoodsNum,
    OnClickViewDetail,
    OnClickDeleteCart,
    OnChangeAllCheck,
    onSubmit,
  };
};

//获取为你推荐商品列表
const useGoodsList = () => {
  const content = reactive({
    goodsList: [], //商品列表数据
  });
  const data = { pageIndex: 0, pageSize: 10 }; //请求参数
  onMounted(async () => {
    await getGoodsListAPI(data).then((res) => {
      if (res.data.goodsList.length != 0) {
        content.goodsList = res.data.goodsList;
      }
    });
  });

  const { goodsList } = toRefs(content);
  return {
    goodsList,
  };
};

export default defineComponent({
  name: "Flow",
  components: { BottomTabs, GoodList },
  setup() {
    const {
      flowList,
      totalPrice,
      allChecked,
      OnPlusGoodsNum,
      OnMinusGoodsNum,
      OnClickViewDetail,
      OnClickDeleteCart,
      OnChangeAllCheck,
      onSubmit,
    } = useShoppingCart(); //购物车逻辑
    const { goodsList } = useGoodsList(); //获取为你推荐商品列表
    return {
      goodsList,
      totalPrice,
      allChecked,
      flowList,
      OnPlusGoodsNum,
      OnMinusGoodsNum,
      OnClickViewDetail,
      OnClickDeleteCart,
      OnChangeAllCheck,
      onSubmit,
    };
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
        span {
          margin-right: 10px;
        }
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
.delete__button {
  height: 100%;
}
.van-submit-bar {
  bottom: 100px;
}
.bottom-button {
  width: 320px;
  height: 80px;
}
</style>
