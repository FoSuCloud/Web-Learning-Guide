
```python
import torch
import threading
import time

def log():
    # 定义两个随机生成的矩阵 A 和 B
    A = torch.randn(1000, 1000)
    B = torch.randn(1000, 1000)

    # 使用 CUDA 加速计算
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    A = A.to(device)
    B = B.to(device)

    # 执行矩阵乘法运算
    C = torch.matmul(A, B)
    print('打印C', C)


def _test():
    for i in range(100):
    time.sleep(0.1)
    print('打印', i)
    log()

def main():
    t = threading.Thread(target=_test)
    t.start()


if __name__ == '__main__':
    main()

```
