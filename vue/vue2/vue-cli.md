## vue-cli
* 真正的vue-cli代码在`packages/@vue/cli`
* 并不是在根目录，需要到packages/@vue/cli目录下面执行npm i ，这里才是想看的代码

## vue serve
```text
program
  .command('serve')
```
* `注意这个和npm run serve不一样`

## vue create app-name
```text
program
  .command('create <app-name>')
```
