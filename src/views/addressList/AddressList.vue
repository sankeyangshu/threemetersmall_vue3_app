<!--
 * @Description: 收货地址列表页面
 * @Author: 王振
 * @Date: 2021-06-25 12:44:04
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-27 14:39:20
-->

<template>
  <div class="addressList">
    <!-- 头部导航条 开始 -->
    <van-nav-bar title="我的地址" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 头部导航条 结束 -->

    <!-- 地址列表 开始 -->
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
    <!-- 地址列表 结束 -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import { getAddressListAPI } from "@/api/address";

interface addressList {
  id: number | string;
  name: string;
  tel: number | string;
  address: string;
  isDefault: boolean;
}

//返回上一级、新增地址等逻辑
const useReturnLevel = () => {
  const router = useRouter();
  //返回上一级
  const onClickLeft = () => {
    router.back();
  };
  //新增地址
  const onAdd = () => {
    router.push({
      name: "AddressEdit",
      query: {
        isAddressEdit: "notEdit", //是否是新增地址,notEdit代表是新增地址，edit代表是修改地址
      },
    });
  };
  return { onClickLeft, onAdd };
};

//获取地址列表数据
const useGetAddressList = () => {
  const content = reactive({
    chosenAddressId: 1, //当前选中地址的 id
    list: [], //收货地址列表
  });
  onMounted(async () => {
    const { data } = await getAddressListAPI();
    content.list = data;
  });
  const { chosenAddressId, list } = toRefs(content);
  return { chosenAddressId, list };
};

//编辑地址逻辑
const useUpdateAddress = () => {
  const router = useRouter();
  const onEdit = (item: addressList) => {
    router.push({
      name: "AddressEdit",
      query: {
        addressId: item.id, //地址id
        isAddressEdit: "edit", //是否是新增地址,notEdit代表是新增地址，edit代表是修改地址
      },
    });
  };
  return onEdit;
};

export default defineComponent({
  name: "AddressList",
  setup() {
    const { onClickLeft, onAdd } = useReturnLevel(); //返回上一级、新增地址
    const { chosenAddressId, list } = useGetAddressList(); //获取地址列表数据
    const onEdit = useUpdateAddress();

    return {
      onClickLeft,
      list,
      onAdd,
      onEdit,
      chosenAddressId,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/style/viriables.scss";
.addressList {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: $bgColor;
}
</style>
