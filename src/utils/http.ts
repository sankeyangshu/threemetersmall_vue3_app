/*
 * @Description: 封装api请求方法
 * @Author: 王振
 * @Date: 2021-06-25 12:33:08
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-19 16:46:41
 */

//1.导入封装好的axios实例
import request from "./request";

//包裹请求方法的容器
const http = {
  /**
   * @description: 封装get请求方法
   * @param {string} url 请求地址
   * @param {any} params 请求参数
   */
  get(url: string, params?: any) {
    const config: any = {
      method: "get", // `method` 是创建请求时使用的方法
      url: url, // `url` 是用于请求的服务器 URL
    };
    if (params) {
      config.params = params;
    }
    return request(config);
  },

  /**
   * @description: 封装post方法
   * @param {string} url 请求地址
   * @param {any} params 请求参数
   */
  post(url: string, params: any) {
    const config: any = {
      method: "post",
      url: url,
    };
    if (params) {
      config.data = params;
    }
    return request(config);
  },

  /**
   * @description: 封装patch方法
   * @param {string} url 请求地址
   * @param {any} params 请求参数
   */
  patch(url: string, params: any) {
    const config: any = {
      method: "patch",
      url: url,
    };
    if (params) {
      config.data = params;
    }
    return request(config);
  },

  /**
   * @description: 封装delete方法
   * @param {string} url 请求地址
   * @param {any} params 请求参数
   */
  delete(url: string, params: any) {
    const config: any = {
      method: "delete",
      url: url,
    };
    if (params) {
      config.params = params;
    }
    return request(config);
  },
};

//导出
export default http;
