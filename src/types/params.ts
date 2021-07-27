/*
 * @Description: 请求参数数据类型
 * @Author: 王振
 * @Date: 2021-06-25 12:36:06
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-27 14:46:38
 */

/**
 * 用户注册参数类型
 */
export interface registerParams {
  userName: string;
  password: string;
}

/**
 * 用户登录参数类型
 */
export interface loginParams {
  userName: string;
  password: string;
}

/**
 * 用户收货地址参数类型
 */
export interface addressParams {
  name: string;
  tel: string;
  province: string;
  city: string;
  county: string;
  addressDetail: string;
  areaCode: string;
  isDefault: boolean;
}

/**
 * 用户修改地址参数类型
 */
export interface updateAddressParams {
  id: number;
  name: string;
  tel: string;
  province: string;
  city: string;
  county: string;
  addressDetail: string;
  areaCode: string;
  isDefault: boolean;
}
