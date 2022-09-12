## env
* dotenv (https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use)
* dotenv-rails将按以下顺序覆盖（最高定义的变量覆盖较低）：
  层次优先级	文件名	环境	我.gitignore应该吗？	笔记
  第一名（最高）	.env.development.local	发展	是的！	环境特定设置的本地覆盖。
  第一	.env.test.local	测试	是的！	环境特定设置的本地覆盖。
  第一	.env.production.local	生产	是的！	环境特定设置的本地覆盖。
  第二	.env.local	无论文件在哪里	确实。	本地覆盖。该文件会为所有环境加载，除了 test.
  第三	.env.development	发展	不。	共享环境特定设置
  第三	.env.test	测试	不。	共享环境特定设置
  第三	.env.production	生产	不。	共享环境特定设置
  最后的	.env	所有环境	取决于（见下文）	原创®
* `也就是env文件的变量是所有环境共享的。`

## env原理
https://blog.csdn.net/sinat_17775997/article/details/125947034

## 添加变量
* 在package.json的script脚本执行中argv添加变量 `--build-model`
* `node --max_old_space_size=4096 build/dev-server.js --build-model fast`
* `相当于argv['buildModel'] 可以获取到值为fast`

## cross-env
* `cross-env可以让我们跨平台给变量赋值，而不用担心跨平台问题`
* `cross-env BABEL_ENV=test 相当于给process.env.BABEL_ENV赋值为test`

