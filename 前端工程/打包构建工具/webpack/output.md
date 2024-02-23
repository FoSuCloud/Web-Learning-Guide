## output

#### 输出到一个文件
```javascript
module.exports = {
  output: {
    filename: 'bundle.js',
  },
};
```

#### 多个入口点
* 如果有多个入口点，但是希望都输出到一个文件里面，结果会报错，需要按照下面的方式，允许输出多个文件
```javascript
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
};
```

#### CDN
```javascript
module.exports = {
  //...
  output: {
    path: '/home/proj/cdn/assets/[fullhash]',
    publicPath: 'https://cdn.example.com/assets/[fullhash]/',
  },
};
```
* `publicPath改为具体的网址，那么就会在生成的资源资源href/src前面添加该URL前缀`
* 例如ico的路径就变为了 `https://cdn.example.com/assets/favicon.ico`
```
<!DOCTYPE html><html ...
<link rel=icon type=image/x-icon href=https://cdn.example.com/assets/favicon.ico>
<title>...</title>
...
</html>
```

