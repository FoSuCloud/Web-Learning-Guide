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

### 给jupyterlab提pr之后添加标签
* `@meeseeksdev tag bug, 添加一个名为bug的标签`
* `@meeseeksdev untag bug, 删除一个名为bug的标签`

### 进行ui测试
*  `进入目录 cd galata`
* `yarn run build`
* 首先启动服务 `jupyter lab --config jupyter_server_test_config.py`
* `执行ui测试 yarn run test`

#### ui测试debug
* `npx playwright test ./test/jupyterlab/font-size.test.ts --headed --debug`
