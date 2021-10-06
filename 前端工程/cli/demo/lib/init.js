// 打印欢迎界面
const {promisify} = require('util') // 封装同步函数为异步
const figlet  = promisify(require('figlet')) // 打印图案
const clear = require('clear') // 清空打印日志
const chalk = require('chalk') // 颜色
// 打印绿色日志
const log = content => console.log(chalk.green(content))
const {clone} =require('./download')
const open = require('open')

const spawn = async (...args) => {
    // 同步 Promise api
    const { spawn } = require('child_process')
    return new Promise(resolve => {
        const proc = spawn(...args)
        // 输出流 子进程 合并到 主进程
        proc.stdout.pipe(process.stdout) // 把子进程的正常流输入到主进程的正常流
        proc.stderr.pipe(process.stderr) // 把子进程的异常流输入到主进程的异常流
        proc.on('close', () => {
            resolve()
        })
    })

}

module.exports= async name => {
    clear()
    const data = await figlet('welcome')
    log(data)
    log('🚀创建项目'+ name)
    // 修改地址,注意，无论如何clone一定会执行回调函数！所以要在安装之后注释掉再执行
    // 注意看官网，例如github的格式是github:用户名/项目名称
    // await clone('github:FoSuCloud/rollup-demo',name,{clone:true},(err)=>{
    //     console.log(err ? 'Error' : 'Success')
    // })
    // // await clone('github:su37josephxia/vue-template',name)
    // 下载依赖 npm i
    // 子进程
    log('安装依赖...')
    // npm 判断,根据win平台
    // process.platform === 'win32' ? 'npm.cmd' : 'npm'
    console.log('name',`${name}`)
    // todo 为什么要使用child_process？
    await spawn('npm',['install'],{cwd:`${name}`})
    log('安装完成：' +
        'to get start' +
        '============' +
        'npm run dev' +
        '============')
    // 注意：clone不同的项目，下面的命令和打开的网址都是不一样的
    await spawn('npm',['run','dev'],{cwd:`${name}`})
    // 根据项目的不同决定是否需要open打开网址
    open('http://127.0.0.1:3000/public/index.html')
}
