<!--
 * @Description: 新增地址页面
 * @Author: 王振
 * @Date: 2021-06-25 12:42:57
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-27 15:30:18
-->
<template>
  <div class="addressEdit">
    <!-- 头部导航条 开始 -->
    <van-nav-bar :title="navTitle" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 头部导航条 结束 -->

    <!-- 新增地址 开始 -->
    <div v-if="isEdit">
      <van-address-edit
        :area-list="areaList"
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
      />
    </div>
    <!-- 新增地址 结束 -->

    <!-- 修改地址 开始 -->
    <div v-else>
      <van-address-edit
        :area-list="areaList"
        :address-info="addressInfo"
        show-delete
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSecondSave"
        @delete="onDelete"
      />
    </div>
    <!-- 修改地址 结束 -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { areaList } from "@vant/area-data"; //导入省市区数据
import { addressParams, updateAddressParams } from "@/types"; //导入参数类型
import {
  postAddNewAddressAPI,
  getAddressDetailAPI,
  patchAddressAPI,
  deleteAddressAPI,
} from "@/api/address"; //导入接口管理文件
import { Toast } from "vant";

//返回上一级,判断是新增地址还是修改地址等功能
const useReturnLevel = () => {
  const router = useRouter();
  const route = useRoute();
  const isEdit = ref(true); //是否是新增地址
  const navTitle = ref("新增地址"); //导航栏标题
  const content = reactive({
    addressInfo: {}, //收货人信息初始值
  });
  //返回上一级
  const onClickLeft = () => {
    router.back();
  };
  //判断是否是新增地址
  onMounted(async () => {
    const edit = route.query.isAddressEdit;
    if (edit === "edit") {
      //修改地址，显示修改地址组件
      isEdit.value = false;
      //修改导航条标题
      navTitle.value = "修改地址";
      //获取地址详情信息
      await getAddressDetailAPI({ id: Number(route.query.addressId) }).then((res) => {
        content.addressInfo = res.data;
      });
    }
  });
  const { addressInfo } = toRefs(content);
  return { onClickLeft, isEdit, navTitle, addressInfo };
};

//新增地址和修改地址，删除地址逻辑
const useNewAddress = () => {
  const router = useRouter();

  //新增地址
  const onSave = async (content: addressParams) => {
    try {
      await postAddNewAddressAPI(content);
      Toast("成功");
      router.back();
    } catch (err) {
      //添加地址失败
      Toast(err.message);
      return err; //抛出异常
    }
  };

  //修改地址
  const onSecondSave = async (content: updateAddressParams) => {
    await patchAddressAPI(content).then(() => {
      Toast("修改成功");
      router.back();
    });
  };

  //删除地址
  const onDelete = async (content: updateAddressParams) => {
    await deleteAddressAPI({ id: content.id }).then(() => {
      Toast("删除成功");
      router.back();
    });
  };

  return { onSave, onSecondSave, onDelete };
};

export default defineComponent({
  name: "AddressEdit",
  setup() {
    const { onClickLeft, isEdit, navTitle, addressInfo } = useReturnLevel(); //返回上一级
    const { onSave, onSecondSave, onDelete } = useNewAddress();

    return {
      areaList,
      onClickLeft,
      onSave,
      onSecondSave,
      onDelete,
      isEdit,
      navTitle,
      addressInfo,
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
