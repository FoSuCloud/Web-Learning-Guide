#### vcuda
* `vcuda是一种GPU虚拟化技术，它可以让虚拟机中的应用程序利用CUDA库来访问物理GPU的计算能力。`
* vcuda的主要思想是拦截和重定向CUDA API调用，将虚拟机中的CUDA命令和数据转发给物理GPU，由真正的GPU驱动和CUDA库来执行计算。

* vcuda的系统架构与NVIDIA的GRID架构类似，`采用一个Manager来管理GPU，Manager负责配置容器的GPU计算能力和显存资源，`
* 做到使用者无法使用多余申请的显存，GPU的平均使用率不会大幅超出申请值。
* vcuda的设计只侵入了CUDA层，用户的程序无需重新编译就可以运行在基于vcuda的GPU实现共享。

* vcuda是腾讯TKE团队的开源项目，可以在任意地方使用，不依赖任何云。
* 它与其他GPU虚拟化技术（如vGPU、cGPU等）有不同的优势和劣势，具体需要根据应用场景和需求来选择合适的方案。

#### gpu虚拟化
* `本来只有一个显存为8Gi的gpu,他只能给一个pod使用`
* `而有了gpu虚拟化就可以把一个显存为8Gi的gpu拆分为多片，例如32片，每片256MB`
* `然后如果我们创建一个显存为1Gi的pod,那么就可以创建8个！`


### nvidia-smi
* `查看显卡信息, 查看显卡版本`
* `看到0%，gpu利用率为0，但是gpu memory不为0；并且program存在程序，那么可能已经跑起来了，但是程序比较简单，不需要gpu，或者不需要1%利用率`


#### nvcc
* `nvcc --version：查看您的系统是否已经安装了CUDA工具包，并且显示其版本号`


### cuda 编程
* `.cu文件是cuda代码文件`


#### 编译文件
* `nvcc -arch=sm_86 -cudart=static -lcuda -lcudart -lcurand my_program.cu -o my_program`

* `简单的编码命令，nvcc gemm.cu -o gemm；`
* `编译后，执行 ./gemm 就可以看到结果了`





