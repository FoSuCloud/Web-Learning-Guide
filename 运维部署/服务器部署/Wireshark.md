## Wireshark
* Wireshark是一个抓包工具&数据包分析工具。可以很方便的看到数据包的走向。可以看到tcp三握手，四挥手等过程

### 面板
（1）Frame: 物理层的数据帧概况
（2）Ethernet II: 数据链路层以太网帧头部信息
（3）Internet Protocol Version 4: 互联网层IP包头部信息
（4）Transmission Control Protocol: 传输层T的数据段头部信息，此处是TCP
（5）Hypertext Transfer Protocol: 应用层的信息，此处是HTTP协议

####   裁剪数据包
* cd /Applications/Wireshark.app/Contents/MacOS
* sudo editcap -A "2023-08-24 20:33:29" -B "2023-08-24 20:33:33" /Users/xielipei/Desktop/debug-api-gateway.pcap /Users/xielipei/Desktop/edited.pcap

#### tcp临时端口
在抓包时看到每次使用的源端口都是一个新的端口是正常的。这些新的端口被称为临时端口范围或短暂端口范围。
在 TCP 协议中，临时端口范围是用于客户端发起的临时连接的端口范围。当客户端应用程序发起网络连接时，操作系统会为其分配一个未被使用的临时端口号。这个临时端口号通常在一个合理的范围内，例如在 Linux 中，范围通常是 32768 到 61000。
客户端使用临时端口与服务器端的目标端口进行通信，建立 TCP 连接。
`完成通信后，临时端口会被操作系统回收，并可以再次被分配给其他客户端连接。`
