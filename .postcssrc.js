/*
  PostCss配置文件
*/
module.exports = {
  plugins: {
    // 配置要使用的 PostCss插件
    // 作用：生成浏览器 CSS 样式规则前缀
    // 由于VueCLI脚手架 内部已经配置了 autoprefixer 插件
    // 当我们再配置的时候发生了冲突
    /* 'autoprefixer': { // autoprefixer 插件的配置
      // 配置要兼容到的环境信息
      browsers: ['Android >= 4.0', 'iOS >= 8']
    }, */
    // 配置使用 postcss-pxtorem 插件
    'postcss-pxtorem': {
      /*
        lib-flexible 的REM 适配方案：把一行分为10份， 每份就是十份之一
        所以 routValue 应该设置为你的设计稿宽度的十分之一
        但是我们的设计稿是 750 ，所以应该设置 750/10 = 75即 1rem = 75px
        但是 Vant 建议设置 37.5 为什么呢？ => 因为 Vant是基于 375写的
        所以 rootValue必须设置为 37.5，唯一的缺点就是我们设计稿的尺寸都必须 除以2
        更好的解决方案：
          如果是 Vant 的样式，就按照37.5来转换
          如果是 我们自己的样式，就按照设计稿的 十分之一 - 75来转换
        查阅postCss文档发现 - routValue 支持两种类型：
          数字：固定的数值(不适合)
          函数：其返回值可以动态处理，postcss-pxtorem 处理每个 CSS文件的时候都会调用rootValue这个函数
      */
      rootValue ({ file }) {
        // console.log('调用的文件：' + file);
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*'],
      // 配置不要转换为rem的文件
      exclude: 'github-markdown'
    }
  }
}
