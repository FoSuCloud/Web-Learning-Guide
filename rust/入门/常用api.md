#### 程序入口
* `每个rs文件的入口都是 main 函数`

#### println!
* `println! 用于将文本打印到控制台的 宏`

#### 双引号
* `rust中的字符串需要使用双引号`

#### 注释
被编译器忽略的 常规注释：
// Line comments which go to the end of the line.
/* Block comments which go to the closing delimiter. */
解析为 HTML 库 文档的文档注释：
/// Generate library docs for the following item.
//! Generate library docs for the enclosing item.

#### 格式化打印
* 打印由一系列macros定义的处理[std::fmt]("https://doc.rust-lang.org/std/fmt/") ，其中一些包括：
```text
format!: 将格式化文本写入String
print!: 相同，format!但文本打印到控制台 (io::stdout)。
println!: 相同，print!但附加了一个换行符。
eprint!: 相同，print!但文本打印到标准错误 (io::stderr)。
eprintln!: 相同，eprint!但附加了一个换行符。
```
```rust
fn hello() {
    // In general, the `{}` will be automatically replaced with any
    // arguments. These will be stringified.
    println!("{} days", 31);

    // Positional arguments can be used. Specifying an integer inside `{}`
    // determines which additional argument will be replaced. Arguments start
    // at 0 immediately after the format string
    println!("{0}, this is {1}. {1}, this is {0}", "Alice", "Bob");

    // As can named arguments.
    println!("{subject} {verb} {object}",
             object="the lazy dog",
             subject="the quick brown fox",
             verb="jumps over");

    // Different formatting can be invoked by specifying the format character after a
    // `:`.
    println!("Base 10:               {}",   69420); //69420
    println!("Base 2 (binary):       {:b}", 69420); //10000111100101100
    println!("Base 8 (octal):        {:o}", 69420); //207454
    println!("Base 16 (hexadecimal): {:x}", 69420); //10f2c
    println!("Base 16 (hexadecimal): {:X}", 69420); //10F2C


    // You can right-justify text with a specified width. This will
    // output "    1". (Four white spaces and a "1", for a total width of 5.)
    println!("{number:>5}", number=1); //    1

    // You can pad numbers with extra zeroes,
    //and left-adjust by flipping the sign. This will output "10000".
    println!("{number:0<5}", number=1); // 10000

    // You can use named arguments in the format specifier by appending a `$`
    println!("{number:0>width$}", number=1, width=5); // 00001


    // Rust even checks to make sure the correct number of arguments are
    // used.
    // println!("My name is {0}, {1} {0}", "Bond");
    // 执行之后提示 note: positional arguments are zero-based 因为少了一个参数

    // Only types that implement fmt::Display can be formatted with `{}`. User-
    // defined types do not implement fmt::Display by default

    #[allow(dead_code)]
    struct Structure(i32); // 没有使用到的代码

    // This will not compile because `Structure` does not implement
    // fmt::Display
    //println!("This struct `{}` won't print...", Structure(3));
    // TODO ^ Try uncommenting this line

    // For Rust 1.58 and above, you can directly capture the argument from a
    // surrounding variable. Just like the above, this will output
    // "    1". 4 white spaces and a "1".
    let number: f64 = 1.0;
    let width: usize = 5;
    println!("{number:>width$}"); // 1
}
```
