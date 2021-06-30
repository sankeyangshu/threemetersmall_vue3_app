<!--
 * @Description: 分类页面
 * @Author: 王振
 * @Date: 2021-06-25 10:38:57
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-30 16:48:19
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
        <li
          :class="{ 'left-active': currentIndex == item.id }"
          v-for="item in categoryList"
          :key="item.id"
          @click="OnClickSelectMenu(item.id)"
        >
          {{ item.categoryName }}
        </li>
      </ul>
    </div>
    <!-- 一级类别 结束 -->

    <!-- 二级类别 开始 -->
    <section class="category__right">
      <div class="right__total">
        <div v-for="(items, index) in categoryList" :key="index">
          <div v-if="currentIndex == items.id">
            <div class="category__right__grid" v-for="item in items.content" :key="item.id">
              <van-image width="120" height="120" fit="contain" :src="item.categoryImg" />
              <span>{{ item.categoryName }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 二级类别 结束 -->
  </div>

  <!-- 底部tab 开始 -->
  <bottom-tabs :currentIndex="1"></bottom-tabs>
  <!-- 底部tab 结束 -->
</template>

<script lang="ts">
import BottomTabs from "@/components/BottomTabs.vue";
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import { getCategoryListAPI } from "@/api/category";

//获取分类列表和切换一级分类列表逻辑
const useCategoryList = () => {
  const content = reactive({
    categoryList: [], //分类列表
    currentIndex: 1, //选中的分类下标
  });

  //获取分类列表
  onMounted(async () => {
    const { data } = await getCategoryListAPI();
    content.categoryList = data;
  });

  //切换分类列表
  const OnClickSelectMenu = (index: number) => {
    content.currentIndex = index;
  };

  const { categoryList, currentIndex } = toRefs(content);
  return { categoryList, currentIndex, OnClickSelectMenu };
};

export default defineComponent({
  name: "Category",
  components: { BottomTabs },
  setup() {
    const keyword = ref(" "); //搜索关键词
    const { categoryList, currentIndex, OnClickSelectMenu } = useCategoryList(); // 获取分类列表
    return { keyword, categoryList, currentIndex, OnClickSelectMenu };
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
