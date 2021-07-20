<!--
 * @Description: 首页
 * @Author: 王振
 * @Date: 2021-06-25 10:24:22
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-20 09:17:58
-->
<template>
  <div class="wrapper">
    <!-- 通知栏 开始 -->
    <van-notice-bar
      mode="closeable"
      left-icon="volume-o"
      text="该项目仅为示例项目，不用做商业用途，仅供学习！"
    />
    <!-- 通知栏 结束 -->

    <!-- 搜索框 开始 -->
    <van-search
      v-model="keyword"
      shape="round"
      background="#3fbb47"
      placeholder="请输入搜索关键词"
    />
    <!-- 搜索框 结束 -->

    <!-- 轮播图 开始 -->
    <van-swipe :autoplay="3000" lazy-render class="wrapper__swipe">
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" class="wrapper__swipe__img" />
      </van-swipe-item>
    </van-swipe>
    <!-- 轮播图 结束 -->

    <!-- 宫格 开始 -->
    <van-grid :border="false">
      <van-grid-item text="手机数码">
        <template #icon>
          <van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
        </template>
      </van-grid-item>
      <van-grid-item text="新鲜水果">
        <template #icon>
          <van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
        </template>
      </van-grid-item>
      <van-grid-item text="领券中心">
        <template #icon>
          <van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
        </template>
      </van-grid-item>
      <van-grid-item text="日用百货">
        <template #icon>
          <van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 宫格 结束 -->

    <!-- 猜你喜欢 开始 -->
    <van-divider :style="{ color: '#999999', borderColor: '#999999', padding: '0 16px' }">
      <van-icon name="fire" color="#ee0a24" />猜你喜欢
    </van-divider>
    <good-list :goodsList="goodsList"></good-list>
    <!-- 猜你喜欢 结束 -->

    <!-- 分割线 开始 -->
    <van-divider :style="{ color: '#999999', borderColor: '#999999', padding: '0 16px' }">
      我是有底线的
    </van-divider>
    <!-- 分割线 结束 -->
  </div>

  <!-- 底部tab 开始 -->
  <bottom-tabs :currentIndex="0"></bottom-tabs>
  <!-- 底部tab 结束 -->
</template>

<script lang="ts">
import BottomTabs from "@/components/BottomTabs.vue";
import GoodList from "@/components/GoodList.vue";
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import { getGoodsListAPI } from "@/api/goods";

//获取商品列表数据
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
  name: "Home",
  components: { BottomTabs, GoodList },
  setup() {
    const keyword = ref(""); //关键词
    const images = [
      "https://img.yzcdn.cn/vant/apple-1.jpg",
      "https://img.yzcdn.cn/vant/apple-2.jpg",
    ]; //轮播图

    const { goodsList } = useGoodsList(); //获取商品列表

    return { keyword, images, goodsList };
  },
});
</script>

<style lang="scss" scoped>
@import "@/style/viriables.scss";
@import "@/style/mixins.scss";
.wrapper {
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 100px;
  right: 0;
  background-color: $bgColor;

  .wrapper__swipe {
    margin: 10px auto;
    .wrapper__swipe__img {
      width: 100%;
      height: 300px;
    }
  }
}
</style>
