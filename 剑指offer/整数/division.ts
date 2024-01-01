/*
* dividend 除数
* divisor 被除数
* */
function division(dividend: number,  divisor: number) {
    // 1. 全部转换为 负数， 正数转负数会存在溢出情况
    // 2. 除法 其实等于 多次减法
    // 3. 但是没法用加法， 所以可以 设计为 tmp=(a+a), 如果(除数-tmp)>tmp， a = tmp; tmp = (a+a) 的形式
    // O(n), O(log^n)
}
