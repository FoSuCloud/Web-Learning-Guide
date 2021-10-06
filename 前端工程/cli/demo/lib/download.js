const {promisify} = require('util')
// const ora = require('ora')

module.exports.clone = async function(repo,desc,opt,fn){
    const download = promisify(require('download-git-repo'))
    // 添加一个进度条,一直在执行中，添加...
    // const process = ora(`✈️下载.....${repo}`)
    // process.start();
    await download(repo,desc,opt,fn)
    // process.success()
}
