/*
 * @Description: getters文件
 * @Author: 王振
 * @Date: 2021-06-25 12:39:57
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-25 12:40:08
 */

const getters = {
  token: (state: any) => state.user.token, //用户唯一标识token
};

export default getters;
