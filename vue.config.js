const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:8080/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
});