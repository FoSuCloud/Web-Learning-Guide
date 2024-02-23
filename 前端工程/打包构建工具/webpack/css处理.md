#### webpack生产环境构建时为什么要将css文件提取成单独的文件
1. `更好的缓存`，当 CSS 和 JS 分开时，浏览器可以缓存 CSS 文件并重复使用，而不必重新加载，
* 也不用因为js内容的变化，导致css缓存失效
2. `更快的渲染速度`，浏览器是同时可以并行加载多个静态资源，当我们将css从js中抽离出来时，
* 能够加快js的加载与解析速度，最终加快页面的渲染速度
3. `更好的代码可读性`，独立的css文件更方便代码的阅读与调试

#### css在生产环境处理
* 执行顺序是 postcss-loader -> css-loader -> minicss-loader
* 输出产物分别是 `css->css (postcss-loader作用:兼容低浏览器) -> js(css-loader作用) ->css (minicss-loader作用：提取为单独的css文件)`
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          }
        ]
      },
    ],
 },
 plugins: [
   new MiniCssExtractPlugin(
      {
        filename: 'css/[name].[contenthash].css',
        chunkFilename: 'css/[name].[contenthash].css',
        experimentalUseImportModule: false
      }
    )
  ]
}
```

