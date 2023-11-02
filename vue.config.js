const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  outputDir: 'dist',  // 打包后的目录名称，可以自定义
  assetsDir: 'static',  // 静态资源目录(js,css,img,fonts)，需要保证和后端的配置一致，否则可能无法正常加载资源
  transpileDependencies: true,
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [
            {
              loader: 'raw-loader',
            },
          ],
        },
      ],
    },
  },
});