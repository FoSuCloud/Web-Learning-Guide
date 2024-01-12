* 需要在webpack.config.js配置
* `splitChunks.chunks = all`
* 这意味着 chunk 可以在异步和非异步 chunk 之间共享。将为项目注入所有生成的 vendor chunks。
* 也就是支持了异步import


