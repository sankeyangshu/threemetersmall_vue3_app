/*
 * @Description: 响应参数数据类型
 * @Author: 王振
 * @Date: 2021-07-02 14:52:52
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-09 17:08:24
 */
/**
 * 商品列表和加载更多数据类型
 */
export interface goodsType<T> {
  goodsList: Array<T>;
  loading: boolean;
  finished: boolean;
}

/**
 * 商品列表数据类型
 */
export interface goodsListType {
  categoryId: number;
  id: number;
  goodsName: string;
  goodsInfo: string;
  goodsImg: string;
  goodsPrice: string | number;
  linePrice: string | number;
}

/**
 * 商品规格数据类型
 */
export interface specPropsType {
  skuImg: string[]; //规格图片
  skuPrice: number[]; //规格价格
  skuStock: number[]; //规格库存
  skuTitle: string; //规格标题
  specList: string[]; //规格值列表
}

/**
 * 商品sku列表数据类型
 */
export interface skuListType {
  id: number; //skuid
  spec: string[]; //sku排列组合
}
