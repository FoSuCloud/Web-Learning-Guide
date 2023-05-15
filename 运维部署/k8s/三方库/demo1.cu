#include <stdio.h>

// 这是一个在GPU上运行的函数，叫做kernel
__global__ void add(int a, int b, int *c)
{
    // 计算a + b，并把结果存储到c指向的内存中
    *c = a + b;
}

int main()
{
    // 定义三个整数变量
    int a = 2;
    int b = 7;
    int c;

    // 定义一个指针变量，用来指向GPU上的内存
    int *dev_c;

    // 在GPU上分配一块内存，大小为一个整数，把地址赋给dev_c
    cudaMalloc(&dev_c, sizeof(int));

    // 调用add函数，在GPU上执行，传入a, b, dev_c作为参数
    add<<<1, 1>>>(a, b, dev_c);

    // 把GPU上的内存中的数据复制到CPU上的变量c中
    cudaMemcpy(&c, dev_c, sizeof(int), cudaMemcpyDeviceToHost);

    // 打印结果
    printf("%d + %d = %d\n", a, b, c);

    // 释放GPU上的内存
    cudaFree(dev_c);

    return 0;
}
