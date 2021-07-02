<!--
 * @Description: 商品列表页
 * @Author: 王振
 * @Date: 2021-06-25 12:46:05
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-02 15:16:35
-->
<template>
  <div class="goodsList">
    <!-- 头部导航栏 开始 -->
    <van-nav-bar
      title="商品列表"
      left-text="返回"
      left-arrow
      fixed
      placeholder
      @click-left="onClickLeft"
    />
    <!-- 头部导航栏 结束 -->

    <!-- 搜索框 开始 -->
    <van-search v-model="value" placeholder="请输入搜索关键词" />
    <!-- 搜索框 结束 -->

    <!-- 商品列表 开始 -->
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
      <div v-for="item in goodsList" :key="item.id">
        <van-card
          :price="item.goodsPrice"
          :origin-price="item.linePrice"
          :desc="item.goodsInfo"
          :title="item.goodsName"
          :thumb="item.goodsImg"
          @click="OnClickGoodsDetails(item.id)"
        />
      </div>
    </van-list>
    <!-- 商品列表 结束 -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getGoodsListAPI } from "@/api/goods";
import { goodsType, goodsListType } from "@/types";

//返回上一级和查看商品详情
const useReturnLevel = () => {
  const router = useRouter();
  //返回上一级
  const onClickLeft = () => {
    router.back();
  };
  //查看商品详情
  const OnClickGoodsDetails = (id: number | string) => {
    router.push({
      name: "GoodsDetails",
      query: {
        id,
      },
    });
  }; //查看商品详情
  return { onClickLeft, OnClickGoodsDetails };
};

//获取商品列表和加载更多逻辑
const useGetGoodsList = () => {
  const route = useRoute();
  const { id } = route.query; //获取分类页面传递的分类id
  const data = { categoryId: Number(id), pageIndex: 0, pageSize: 10 }; //请求参数
  const content = reactive<goodsType<goodsListType>>({
    goodsList: [], //商品列表
    loading: false, //加载更多-是否处于加载状态
    finished: false, //加载更多-是否已加载完成
  });

  //当页面挂载时，触发该生命周期函数，获取列表数据
  onMounted(async () => {
    await getGoodsListAPI(data).then((res) => {
      content.goodsList = res.data.goodsList; // 获取后端传递的列表数据
    });
  });

  //上拉加载更多
  const onLoad = async () => {
    data.pageIndex++; //加载下一页
    await getGoodsListAPI(data).then((res) => {
      //判断数据是否全部加载完成
      if (res.data.isEmpty) {
        content.finished = true;
        return;
      }
      //获取到下一页数据
      content.goodsList = [...content.goodsList, ...res.data.goodsList];
      // 加载状态结束
      content.loading = false;
    });
  };

  const { goodsList, loading, finished } = toRefs(content);
  return { goodsList, loading, finished, onLoad };
};

export default defineComponent({
  name: "GoodsList",
  setup() {
    const { onClickLeft, OnClickGoodsDetails } = useReturnLevel(); // 返回上一级
    const value = ref("");
    const { goodsList, loading, finished, onLoad } = useGetGoodsList(); //获取商品列表数据和上拉加载更多

    return { value, onClickLeft, OnClickGoodsDetails, goodsList, loading, finished, onLoad };
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
  margin-bottom: 10px;
}
</style>
