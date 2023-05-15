#include <stdio.h>
#include <unistd.h> // 引入这个头文件，用来调用sleep函数

// 这是一个在GPU上运行的函数，叫做kernel
__global__ void add(int *a, int *b, int *c)
{
    // 计算线程的全局索引
    int id = threadIdx.x + blockIdx.x * blockDim.x;
    int r = rand() % 10 + 1;
    // 把结果存储到c[id]指向的内存中
    c[id] = a[id] * r + b[id] / r;
}

int main()
{
    // 定义三个整数数组的大小
    int N = 10240;
    // 定义三个整数数组变量
    int a[N];
    int b[N];
    int c[N];

    // 定义三个指针变量，用来指向GPU上的内存
    int *dev_a;
    int *dev_b;
    int *dev_c;

    // 在GPU上分配三块内存，大小为N个整数，把地址赋给dev_a, dev_b, dev_c
    cudaMalloc(&dev_a, N * sizeof(int));
    cudaMalloc(&dev_b, N * sizeof(int));
    cudaMalloc(&dev_c, N * sizeof(int));

    // 定义一个无限循环
    while (1)
    {
        // 用随机数初始化a和b数组
        for (int i = 0; i < N; i++)
        {
            a[i] = rand() % 100;
            b[i] = rand() % 100;
        }

        // 把CPU上的a和b数组中的数据复制到GPU上的内存中
        cudaMemcpy(dev_a, a, N * sizeof(int), cudaMemcpyHostToDevice);
        cudaMemcpy(dev_b, b, N * sizeof(int), cudaMemcpyHostToDevice);

        // 调用add函数，在GPU上执行，传入dev_a, dev_b, dev_c作为参数
        // 使用320个线程和320个块，总共10240个线程
        add<<<320, 320>>>(dev_a, dev_b, dev_c);

        // 把GPU上的内存中的数据复制到CPU上的c数组中
        cudaMemcpy(c, dev_c, N * sizeof(int), cudaMemcpyDeviceToHost);

        // 打印结果
        for (int i = 0; i < N; i++)
        {
            printf("%d + %d = %d\n", a[i], b[i], c[i]);
        }

        // 等待一秒
        sleep(1);
    }

    // 释放GPU上的内存
    cudaFree(dev_a);
    cudaFree(dev_b);
    cudaFree(dev_c);

    return 0;
}
