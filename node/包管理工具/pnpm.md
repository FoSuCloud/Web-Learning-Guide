## pnpm
* 应用在三方库(vue3),小demo中非常好，节省下载包大小

#### pnpm介绍
* 在 PNPM 中，依赖项通常是本地安装的，而不是全局安装的。
* 这意味着当您使用 PNPM 安装项目的依赖项时，这些依赖项将被安装到项目的特定目录中，而不是安装到全局目录。
与传统的包管理器（如 npm 和 Yarn）不同，PNPM 使用一种称为“符号链接”的技术来管理依赖项。
* `它将依赖项直接链接到每个项目的 node_modules 目录中，而不是将它们复制到全局目录`。这种做法具有以下优点：

1. 空间效率：由于依赖项被链接而不是复制，因此节省了磁盘空间。多个项目可以共享相同的依赖项，而无需重复存储。
2. 版本控制：每个项目都可以使用特定版本的依赖项，而不会受到全局依赖项版本的限制。这样可以更好地控制每个项目的依赖项版本。
3. 隔离性：每个项目都有其独立的 node_modules 目录，使得依赖项在项目之间的隔离性更好。一个项目的依赖项不会干扰其他项目的依赖项。


#### 如何把一个npm项目改为pnpm项目
1。 在项目的根目录中运行以下命令安装pnpm（如果你尚未安装它）
`npm install -g pnpm`
确保你已经在项目的根目录下关闭了所有正在运行的npm脚本和进程。

运行以下命令将项目的node_modules目录删除（这将清除当前的npm依赖项）：
`rm -rf node_modules`

运行以下命令将项目的package-lock.json或yarn.lock文件删除（这取决于你之前使用的是npm还是Yarn）：
`rm package-lock.json` 或 `rm yarn.lock`

运行以下命令将项目的依赖项重新安装，但这次使用pnpm：
`pnpm install`

#### 介绍下优缺点
pnpm是一个替代npm和Yarn的包管理工具，它有以下一些优点和缺点：
1. 优点：
空间效率高：pnpm使用了一种称为"硬链接"的机制，它在不同的项目之间共享相同的依赖项，从而减少了磁盘空间的占用。相比之下，npm和Yarn会为每个项目复制一份依赖项，导致磁盘占用更大。
安装速度快：由于pnpm的依赖项共享机制，当多个项目使用相同版本的依赖项时，它们不需要重复下载和安装，从而加快了安装速度。此外，pnpm还使用并发安装和增量安装等技术，进一步提高了安装速度。
内存占用低：pnpm在内存使用方面表现出色。它仅在内存中保留当前项目的依赖项，而不会像npm和Yarn那样加载整个依赖树，因此占用的内存更少。
更新依赖项更方便：pnpm可以通过简单的命令来更新所有项目的依赖项。它会检查每个项目的依赖项，并在必要时下载和更新。这比在每个项目中运行更新命令更为方便。

2. 缺点：
生态系统支持较差：尽管pnpm与npm和Yarn兼容，但由于它是相对较新的工具，某些较小或较旧的软件包可能不完全支持pnpm。这可能导致某些依赖项在使用pnpm时出现问题。
学习曲线：如果你已经习惯使用npm或Yarn，切换到pnpm可能需要一些时间来适应新的命令和工作流程。
集成工具支持不完整：一些集成开发环境（IDE）和构建工具可能对pnpm的支持不完全。虽然pnpm与npm和Yarn的基本用法类似，但在特定的工具和插件方面可能存在一些限制。
综上所述，pnpm在节省磁盘空间、加快安装速度和降低内存占用方面具有明显的优势。但是，由于其相对较新的地位和较小的生态系统，可能存在一些兼容性和集成工具支持方面的挑战。因此，在选择使用pnpm还是其他包管理工具时，需要根据具体项目需求和权衡不同方面的因素。


####  固定库的版本
在pnpm中，你可以通过使用锁定文件（lockfile）和package.json文件中的overrides字段来固定特定库的版本。具体步骤如下：

打开项目根目录下的package.json文件。
在dependencies或devDependencies中找到ansi库的入口，通常以"ansi": "版本号"的形式存在。
在package.json文件的顶层（与dependencies和devDependencies同级）添加一个名为overrides的字段，如果已存在，则添加到已有的字段中。
在overrides字段中，添加一个键值对，键是ansi，值是你想要固定的版本号，例如："ansi": "0.3.1"。
保存package.json文件。
在执行pnpm install命令时，pnpm会读取package.json文件中的overrides字段，并将指定库的版本固定为你所指定的版本。这样，即使其他依赖项要求使用不同版本的ansi库，pnpm也会优先使用你指定的版本。

请注意，使用overrides字段固定特定库的版本可能会导致依赖项之间的不兼容性问题。在固定版本时，务必谨慎考虑，并进行必要的测试和验证。

#### 查看 PNPM 中依赖项的链接路径
* `pnpm ls --depth=0`
* 输出可能如下所示：
```c
+-- dependency1@1.0.0 -> /path/to/dependency1
+-- dependency2@2.0.0 -> /path/to/dependency2
+-- dependency3@3.0.0 -> /path/to/dependency3
```

* `如果某个依赖项未被链接，而是被复制到每个项目的 node_modules 目录中`

#### 仓库地址
* /Users/xielipei/Library/pnpm


#### pnpm install
* `pnpm install执行之后，提示信息`
Packages: +1243
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Packages are hard linked from the content-addressable store to the virtual store.
Content-addressable store is at: /Users/xielipei/Library/pnpm/store/v3
Virtual store is at:             node_modules/.pnpm
Progress: resolved 1225, reused 1202, downloaded 23, added 1243, done
node_modules/.pnpm/vue-demi@0.14.5_vue@3.3.4/node_modules/vue-demi: Running postinstall script, done in 462ms

* 解释
  这段输出是 PNPM 安装包时的进度信息和一些说明。以下是对输出中的关键部分的解释：
Packages: +1243: 表示已添加/安装了 1243 个包。
Packages are hard linked from the content-addressable store to the virtual store.: 
* `表示已将包从内容可寻址存储硬链接到虚拟存储。`
Content-addressable store is at: `/Users/xielipei/Library/pnpm/store/v3`: 
* `表示内容可寻址存储的路径。这是 PNPM 存储已下载和缓存的包的位置。`
Virtual store is at: `node_modules/.pnpm: 表示虚拟存储的路径`。
* `这是 PNPM 在项目中创建的目录，用于保存已安装的包及其依赖项`。

