/*
 * @Description: 响应参数数据类型
 * @Author: 王振
 * @Date: 2021-07-02 14:52:52
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-02 14:54:40
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
