<!--
 * @Description: 商品sku组件
 * @Author: 王振
 * @Date: 2021-07-01 10:04:40
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-19 14:05:04
-->
<template>
  <!-- 商品sku单元格 开始 -->
  <van-cell is-link class="produce__sku" @click="OnClickShowSku">
    <!-- 使用 title 插槽来自定义标题 -->
    <template #title>
      <span class="sku__title">选择：</span>
      <template v-if="!isShowSpec">
        <span class="sku__detail" v-for="(item, index) in specList" :key="index">
          {{ item.skuTitle }}
        </span>
      </template>
      <template v-else>
        <span class="sku__detail" v-for="item in selectSpec" :key="item">
          {{ item }}
        </span>
      </template>
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
          <div class="detail__sku">
            请选择<span v-for="item in selectSpec" :key="item">{{ item }}</span>
          </div>
        </div>
      </div>
      <div class="sku__list" v-for="(items, index) in specArray" :key="index">
        <div class="sku__list__title">{{ items.title }}</div>
        <div class="sku__list__spec">
          <div
            class="spec__item"
            v-for="(item, index) in items.list"
            :key="index"
            :class="[
              selectSpec[items.title] === item.name ? 'spec__item-active' : '',
              item.able ? '' : 'spec__item-disabled',
            ]"
          >
            <span @click="changeSpec(items.title, item.name, item.able)">{{ item.name }}</span>
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
        <van-button type="primary" size="large" color="#3fbb47" @click="OnClickSubmit(selectSpec)">
          确定
        </van-button>
      </div>
    </div>
  </van-popup>
  <!-- 商品sku弹出层 结束 -->
</template>

<script lang="ts">
import { Toast } from "vant";
import { defineComponent, PropType, reactive, ref, toRefs } from "vue";
import {
  specPropsType,
  skuListType,
  selectArrayType,
  specArrayType,
  selectI,
  selectSpecType,
} from "@/types";

//商品规格数据类型
export type specProps = specPropsType[];
//商品sku列表数据类型
export type skuListProps = skuListType[];

//商品sku规格选择逻辑
const useChoiceSku = (skuList: skuListProps, specList: specProps) => {
  const content = reactive<selectArrayType<specArrayType, skuListType, selectI>>({
    specArray: [], //规格数组
    skuArray: [], //sku数组
    selectSpec: {}, // 选择数据的对象
  });
  //处理数据
  content.skuArray = skuList;

  //初始化选择数据的对象
  specList.forEach((item) => {
    content.selectSpec = {
      [item.skuTitle]: "",
    };
  });

  //判断规格是否可以被选中
  const isAble = (key: string, value: string) => {
    // 深拷贝 避免被影响
    let copySelectSpec = JSON.parse(JSON.stringify(content.selectSpec));
    //赋值当前验证项
    copySelectSpec[key] = value;
    //判断是否存在符合条件的项
    let flag = content.skuArray.some((item) => {
      let i = 0;
      for (let k in copySelectSpec) {
        if (copySelectSpec[k] != "" && item.spec.includes(copySelectSpec[k])) {
          // console.log(item)
          i++;
        } else if (copySelectSpec[k] == "") {
          i++;
        }
      }
      // 符合下面条件就退出了 不符合会一直循环知道循环结束没有符合的条件就 return false 了
      // console.log(i)
      return i == specList.length;
    });
    // console.log(flag);
    return flag;
  };

  //将规格数据处理成我们视图所需要的数据格式
  content.specArray = specList.map((res) => {
    return {
      title: res.skuTitle,
      list: res.specList.map((its) => {
        return {
          name: its,
          able: isAble(res.skuTitle, its), //判断该规格是否可以选择
        };
      }),
    };
  });

  // 规格点击事件
  const changeSpec = (key: string, value: string, able: boolean) => {
    //不能被选中，直接返回
    if (!able) return;
    //可以被选中
    if (content.selectSpec[key] === value) {
      content.selectSpec[key] = "";
    } else {
      content.selectSpec[key] = value;
    }
    // forEach循环改变原数组
    content.specArray.forEach((item) => {
      item.list.forEach((its) => {
        its.able = isAble(item.title, its.name);
        // console.log(its.name, its.able);
      });
    });
  };

  const { specArray, skuArray, selectSpec } = toRefs(content);
  return {
    specArray,
    skuArray,
    selectSpec,
    changeSpec,
  };
};

//商品sku弹出层显示和隐藏和确认选中的的规格
const useSubmitSpec = (emit: (event: "SubmitSpec", ...args: unknown[]) => void) => {
  const isShowSku = ref(false); //控制商品sku弹出层的显示和隐藏
  const isShowSpec = ref(false); //判断商品sku单元格上标题显示内容
  const purchaseNum = ref(1); //步进器由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数字。

  //显示商品sku弹出层
  const OnClickShowSku = () => {
    isShowSku.value = true;
  };

  //确认选中的规格
  const OnClickSubmit = (spec: selectI) => {
    //判断是否选中了所有规格
    isShowSpec.value = Object.keys(spec).every((val: string) => {
      return spec[val] !== "";
    });
    if (isShowSpec.value) {
      let selectSpec: selectSpecType = {
        spec,
        purchaseNum: purchaseNum.value,
      };
      //选中了规格，隐藏sku弹出层
      isShowSku.value = false;
      emit("SubmitSpec", selectSpec);
    } else {
      Toast("请选择完整规格");
    }
  };
  return {
    isShowSku,
    isShowSpec,
    OnClickShowSku,
    purchaseNum,
    OnClickSubmit,
  };
};

export default defineComponent({
  name: "Sku",
  props: {
    specList: {
      //商品规格数据
      required: true,
      type: Array as PropType<specProps>,
    },
    skuList: {
      //商品sku数据
      required: true,
      type: Array as PropType<skuListProps>,
    },
    goodsId: {
      //商品id
      required: true,
      type: Number,
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
  emits: ["SubmitSpec"],
  setup(props, { emit }) {
    const { specArray, skuArray, selectSpec, changeSpec } = useChoiceSku(
      props.skuList,
      props.specList
    );
    const { isShowSku, isShowSpec, OnClickShowSku, purchaseNum, OnClickSubmit } =
      useSubmitSpec(emit);
    return {
      isShowSku,
      isShowSpec,
      OnClickShowSku,
      purchaseNum,
      specArray,
      skuArray,
      selectSpec,
      changeSpec,
      OnClickSubmit,
    };
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
