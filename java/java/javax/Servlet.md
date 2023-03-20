## Servlet


#### @HttpServletRequest
* HttpServletRequest是Java Servlet API中的一个接口，它代表HTTP请求。
* 当客户端向服务器发送HTTP请求时，`该请求被封装在一个HttpServletRequest对象中，然后Servlet容器将该对象传递给相应的Servlet来处理请求。`

* 下面是一些HttpServletRequest接口中常用的方法：
  getMethod(): 获取HTTP请求的方法，如GET、POST等。
  getRequestURL(): 获取请求的URL，不包括查询参数部分。
  getQueryString(): 获取请求的查询参数部分，以字符串形式返回。
  getParameter(String name): 获取请求参数的值，参数名通过name指定。
  getHeader(String name): 获取指定名称的请求头信息。
  getCookies(): 获取包含在请求中的所有cookie。
  getSession(): 获取与此请求关联的会话，如果没有会话则创建一个新的会话。
  setAttribute(String name, Object value): 将一个对象存储在request作用域中，通过指定的名称来标识该对象。

#### @HttpServletResponse
* `HttpServletResponse 封装了向客户端发送数据、发送响应头，发送响应状态码的方法`














