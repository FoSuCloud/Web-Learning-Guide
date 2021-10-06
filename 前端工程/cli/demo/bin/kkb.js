#!/usr/bin/env node

// #!/usr/bin/env node  指定解释器类型为node

// sudo npm link 把指令链接到全局

const program = require('commander')
// 策略模式
program.version(require('../package').version)
// kkb init xxx然后就可以触发该action动作
program.command('init <name>')
    .description('init project')
    .action(require('../lib/init'));

// 刷新路由,
// todo `注意需要先重新sudo npm link链接新的指令`
program.command('refresh')
    .description('refresh routers')
    .action(require('../lib/refresh'));
program.parse(process.argv)
// console.log(process.argv)
// 第一个值是解释器，之后的值都是命令参数
// [ '/usr/local/bin/node', '/usr/local/bin/kkb' ]
