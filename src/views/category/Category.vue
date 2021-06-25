<!--
 * @Description: 分类页面
 * @Author: 王振
 * @Date: 2021-06-25 10:38:57
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-25 12:08:41
-->
<template>
  <div class="category">
    <!-- 搜索框 开始 -->
    <van-search
      v-model="keyword"
      shape="round"
      background="#3fbb47"
      placeholder="请输入搜索关键词"
    />
    <!-- 搜索框 结束 -->

    <!-- 一级类别 开始 -->
    <div class="category__left">
      <ul class="left__total">
        <li class="left-active">手机数码</li>
        <li>新鲜水果</li>
        <li>日用百货</li>
        <li>精品服饰</li>
        <li>酒水滋补</li>
      </ul>
    </div>
    <!-- 一级类别 结束 -->

    <!-- 二级类别 开始 -->
    <section class="category__right">
      <ul class="right__total">
        <li class="category__right__grid">
          <van-image
            width="120"
            height="120"
            fit="contain"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <span>精致工艺</span>
        </li>
        <li class="category__right__grid">
          <van-image
            width="120"
            height="120"
            fit="contain"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <span>精致工艺</span>
        </li>
        <li class="category__right__grid">
          <van-image
            width="120"
            height="120"
            fit="contain"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <span>精致工艺</span>
        </li>
        <li class="category__right__grid">
          <van-image
            width="120"
            height="120"
            fit="contain"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <span>精致工艺</span>
        </li>
      </ul>
    </section>
    <!-- 二级类别 结束 -->
  </div>

  <!-- 底部tab 开始 -->
  <bottom-tabs :currentIndex="1"></bottom-tabs>
  <!-- 底部tab 结束 -->
</template>

<script lang="ts">
import BottomTabs from "@/components/BottomTabs.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Category",
  components: { BottomTabs },
  setup() {
    const keyword = ref(" "); //搜索关键词
    return { keyword };
  },
});
</script>

<style lang="scss" scoped>
@import "@/style/viriables.scss";
.category {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 100px;
  right: 0;
  background-color: $bgColor;
  .category__left {
    position: absolute;
    top: 112px;
    bottom: 0;
    overflow-y: scroll;
    width: 30%;
    background: #f6f6f9;
    .left__total {
      padding-bottom: 120px;
      .left-active {
        background: #fff;
        position: relative;
        color: $themeColor;
      }

      li {
        padding: 30px 8px;
        box-sizing: border-box;
        font-size: 28px;
        text-align: center;
        border-bottom: 1px solid #ececec;
      }
    }
  }
  .category__right {
    width: 70%;
    background: #fff;
    position: absolute;
    margin-left: 3px;
    right: 0;
    top: 112px;
    bottom: 0;
    overflow-y: scroll;
    .right__total {
      overflow: hidden;
      padding-bottom: 120px;
      .category__right__grid {
        width: 33.33%;
        float: left;
        text-align: center;
        box-sizing: border-box;
        position: relative;
        span {
          display: block;
          height: 60px;
          line-height: 60px;
          overflow: hidden;
          text-align: center;
          font-size: 24px;
        }
      }
    }
  }
}
</style>
