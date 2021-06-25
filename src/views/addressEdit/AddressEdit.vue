<!--
 * @Description: 新增地址页面
 * @Author: 王振
 * @Date: 2021-06-25 12:42:57
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-25 12:43:37
-->
<template>
  <div class="addressEdit">
    <!-- 头部导航条 开始 -->
    <van-nav-bar title="新增地址" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 头部导航条 结束 -->

    <!-- 新增地址 开始 -->
    <van-address-edit
      :area-list="areaList"
      show-delete
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
    <!-- 新增地址 结束 -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { areaList } from "@vant/area-data"; //导入省市区数据
import { addressParams } from "@/types"; //导入参数类型
import { postAddNewAddressAPI } from "@/api/address"; //导入接口管理文件
import { Toast } from "vant";

//返回上一级
const useReturnLevel = () => {
  const router = useRouter();
  //返回上一级
  const onClickLeft = () => {
    router.back();
  };
  return onClickLeft;
};

//新增地址逻辑
const useNewAddress = () => {
  const router = useRouter();
  const onSave = async (content: addressParams) => {
    console.log(content);
    try {
      const res = await postAddNewAddressAPI(content);
      console.log(res);
    } catch (err) {
      //添加地址失败
      Toast(err.message);
      return err; //抛出异常
    }
    Toast("成功");
    router.back();
  }; //点击保存按钮时触发
  return onSave;
};

export default defineComponent({
  name: "AddressEdit",
  setup() {
    const onClickLeft = useReturnLevel(); //返回上一级
    const onSave = useNewAddress();

    const onDelete = () => {
      console.log("删除地址");
    }; //确认删除地址时触发

    return {
      areaList,
      onClickLeft,
      onSave,
      onDelete,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/style/viriables.scss";
.addressEdit {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: $bgColor;
}
</style>
