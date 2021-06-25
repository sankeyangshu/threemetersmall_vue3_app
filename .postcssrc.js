/*
 * @Description: px转rem文件
 * @Author: 王振
 * @Date: 2021-06-25 10:02:21
 * @LastEditors: 王振
 * @LastEditTime: 2021-06-25 10:14:09
 */
module.exports = {
  plugins: {
    // 配置使用 autoprefixer 插件
    // 作用：生成浏览器 CSS 样式规则前缀
    // VueCLI 内部已经配置了 autoprefixer 插件
    // 所以又配置了一次，所以产生冲突了 所以需要删掉 'autoprefixer'
    //'autoprefixer': {
    //browsers: ['Android >= 4.0', 'iOS >= 8']
    //},
    // 配置使用 postcss-pxtorem 插件
    // 作用：把 px 转为 rem
    "postcss-pxtorem": {
      //通过查阅文档我们可以看到 rootValue 支持两种参数类型：
      //数字：固定值
      //函数：动态计算返回
      //postcss-pxtorem 处理每个 CSS 文件的时候都会来调用这个函数
      //它会把被处理的 CSS 文件相关的信息通过参数传递给该函数
      //rootValue: 37.5,
      rootValue({ file }) {
        //将 vant 组件 rem 设置成 37.5  自己写的样式设置为 75 这样就不需要考虑二倍图 除二了
        return file.indexOf("vant") !== -1 ? 37.5 : 75;
      },
      propList: ["*"],
    },
  },
};
