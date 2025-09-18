## 部署
* 对于小企业来说,使用ollama + open WebUI是一套比较简单的方案
* ollam简化llm在本地环境中的运行和管理,open Web UI提供了前端页面
* https://github.com/open-webui/open-webui


```shell
docker run -d \
  --name open-webui \
  -p 3000:8080 \
  -e OLLAMA_BASE_URL=http://host.docker.internal:11434 \
  -v open-webui:/app/backend/data \
  --restart always \
  ghcr.io/open-webui/open-webui:main
```

