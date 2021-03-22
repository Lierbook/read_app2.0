const debug = process.env.NODE_ENV !== 'production'
var webpack = require('webpack')
module.exports = {
  
  //部署应用包时的基本URL，如果是生产环境，部署到 /cli-study/dist 路径；如果是开发环境，部署到根路径
  publicPath: !debug
    ? '/cli-study/dist'
    : '/',
  //输出文件路径
  outputDir: 'dist',
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  filenameHashing: true,
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 是否使用包含运行时编译器的Vue构建版本，设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: true,
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [],
  // 生产环境不需要sourceMap
  productionSourceMap: false,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  },
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 3333,
    https: false,
    hotOnly: false,
    proxy: {
      //凡是请求以wechat开头的都会使用下面的代理服务器
      '/wechat/*': {
        target: 'https://wechat.idejian.com/api/', // 目标服务器地址
        secure: false,                    // 目标服务器地址是否是安全协议
        changeOrigin: true,               // 是否修改来源, 为true时会让目标服务器以为是webpack-dev-server发出的请求!服务端和服务端的请求是没有跨域的
      },
      '/keyword/*': {
        target: 'https://m.ximalaya.com//discovery-category/', // 目标服务器地址
        secure: false,                    // 目标服务器地址是否是安全协议
        changeOrigin: true,               // 是否修改来源, 为true时会让目标服务器以为是webpack-dev-server发出的请求!服务端和服务端的请求是没有跨域的
      },
      '/v1/*': {
        target: 'https://mobile.ximalaya.com/mobile/', // 目标服务器地址
        secure: false,                    // 目标服务器地址是否是安全协议
        changeOrigin: true,               // 是否修改来源, 为true时会让目标服务器以为是webpack-dev-server发出的请求!服务端和服务端的请求是没有跨域的
      },
      '/playpage/*': {
        target: 'https://mobile.ximalaya.com/v1/track/ca/', // 目标服务器地址
        secure: false,                    // 目标服务器地址是否是安全协议
        changeOrigin: true,               // 是否修改来源, 为true时会让目标服务器以为是webpack-dev-server发出的请求!服务端和服务端的请求是没有跨域的
      },
      '/book/*': {
        target: 'http://localhost:3000/', // 目标服务器地址
        secure: false,                    // 目标服务器地址是否是安全协议
        changeOrigin: true,               // 是否修改来源, 为true时会让目标服务器以为是webpack-dev-server发出的请求!服务端和服务端的请求是没有跨域的
      },
      
    }
  }
}
