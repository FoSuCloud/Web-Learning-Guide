#### page.pause()
* await page.pause(); // 在该位置停止测试，以便您可以检查页面状态和执行命令。
* 然后按 F8 继续执行测试的剩余部分

#### page.waitForTimeout(time)
* await page.waitForTimeout(5000) // 等待一段时间-再继续往下执行

#### page.evaluate(()=>{}) 在evaluate里面的浏览器环境执行代码
```js
        // evaluate里面的浏览器环境执行的代码
        await page.evaluate(() => {
            return Promise.all([
                window.galata.app,
                window.galata.app.commands.execute('application:change-language', { locale: 'zh-CN' })
            ]);
        });
```

#### xxx.type()
* `聚焦元素，然后为文本中的每个字符发送键下、键输入和键操作事件。`
* `await markdownFile.type('markdown cell');`


