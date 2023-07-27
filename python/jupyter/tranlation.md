## 翻译流程
1、前端jupyterlab项目启动会发送请求api/translations, 然后需要翻译的地方执行 trans.__ 即可
2、后端 jupyterlab_server 包接收请求 https://github.com/jupyterlab/jupyterlab_server
jupyterlab_server/translation_utils.py, get_language_pack函数
3、然后会走到https://github.com/jupyterlab/language-packs/releases?page=7
需要本地先安装对应语言的包，例如jupyterlab-language-pack-zh-CN
4、然后就会响应一个json数据

