/*
 * @Description: 商品sku规格选择数据类型
 * @Author: 王振
 * @Date: 2021-07-12 17:04:20
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-19 14:04:21
 */

/**
 * 选择商品sku规格的数据类型
 */
export interface selectArrayType<T, I, J> {
  specArray: Array<T>; //规格数组
  skuArray: Array<I>; //sku数组
  selectSpec: J; // 选择数据的对象
}

/**
 * 格式化之后的商品规格值数据类型
 */
export interface specArrayType {
  title: string;
  list: { name: string; able: boolean }[];
}

/**
 * 格式化之后的选中sku对象的数据类型
 */
export interface selectI {
  [key: string]: string;
}

export interface selectSpecType {
  spec: selectI;
  purchaseNum: number;
}
