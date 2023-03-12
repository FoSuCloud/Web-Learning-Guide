## jupyterlab本地前端调试
* [参考]("https://jupyterlab.readthedocs.io/en/stable/developer/contributing.html?highlight=jlpm#build-and-run-the-tests")
```sh
git clone https://github.com/<your-github-username>/jupyterlab.git
cd jupyterlab
pip install -e .
jlpm install
jlpm run build  # Build the dev mode assets (optional)
jlpm run build:core  # Build the core mode assets (optional)
jupyter lab build  # Build the app dir assets (optional)
```
* jupyterlab4.0.0需要使用v18版本：`nvm use v18.13.0 `

* 最后以开发模式启动 JupyterLab：
`jupyter lab --dev-mode`
* 但是需要注意，此时改了jupyterlab的代码之后需要执行`jupyter lab build`重新构建，才能使用最新的代码

* 如果您想更改 TypeScript 代码并即时重建（每次重建后都需要刷新页面）：
`jupyter lab --dev-mode --watch`，也就是改了代码之后不需要手动执行代码，但是需要等待compile success完成


#### 注意，如果修改了package的代码
* 教程 https://jupyterlab.readthedocs.io/en/latest/developer/contributing.html#installing-jupyterlab
  https://jupyterlab.readthedocs.io/en/latest/developer/contributing.html#setting-up-a-local-development-environment
* [ ] `修改了jupyterlab源码的话，就直接jlpm run build 然后再jupyter lab --dev-mode`



## 安装依赖库
* 本地调试，如果想执行
```text
import pandas as pd
dt = {
"one": [1, 2, 3, 4],
"two": [5, 6, 7, 9]
}

df = pd.DataFrame(dt, index=["a", "b", "c", "d"])
print(df)
```
* 会提示没有安装pandas
* 此时就在jupyterlab本地目录执行 `pip install pandas`

#### galata ui测试
* `注意，执行pip uninstall jupyterlab-language-pack-zh-CN 因为某些ui-test的case就是针对has-text来做的`
* `并且isActiveTab会一直错误`
---
* cd galata
* jlpm start `启动服务`
* jlpm run test `执行测试`
---
* `调试某个文件 jlpm run test:debug ./test/jupyterlab/settings.test.ts`
* `但是其实jupyterlab4.0是没有这个问题的，因为jupyterlab-language-pack-zh-CN没有对应的jupyterlab4.0的包`

### 给jupyterlab提pr之后添加标签
* `@meeseeksdev tag bug, 添加一个名为bug的标签`
* `@meeseeksdev untag bug, 删除一个名为bug的标签`


#### JupyterLab清除缓存
* 尝试清除 JupyterLab 缓存并重新启动 JupyterLab。可以使用以下命令清除缓存：
* `jupyter lab clean 删除staging缓存`

#### 更新ui快照
* `输入 bot please update snapshots`

#### jupyter lab build --debug
* `用于排查build 的错误，添加--debug参数`

撤回某次提交
git revert commit-id

git push 更新
