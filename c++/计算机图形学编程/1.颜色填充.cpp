#include <GL/glew.h>
#include <GLFW/glfw3.h>
#include <iostream>

void render()
{
    glClearColor(0.2f, 0.3f, 0.3f, 1.0f);
    glClear(GL_COLOR_BUFFER_BIT);

    // 绘制代码
}

int main()
{
    if (!glfwInit())
    {
        std::cerr << "Failed to initialize GLFW" << std::endl;
        return -1;
    }
    // GLFW_CONTEXT_VERSION_MAJOR和GLFW_CONTEXT_VERSION_MINOR是用来指定OpenGL上下文的版本号的，这里设置为4.1，表示要求使用OpenGL 4.1版本
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 4);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 1);
    // GLFW_OPENGL_FORWARD_COMPAT是用来指定OpenGL上下文是否支持向前兼容模式的，这里设置为GL_TRUE，表示要求使用向前兼容模式，也就是不支持已经废弃的功能
    glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);
    // GLFW_OPENGL_PROFILE是用来指定OpenGL上下文的配置文件的，这里设置为GLFW_OPENGL_CORE_PROFILE，表示要求使用核心配置文件，也就是只支持现代化的功能
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
    // 创建一个800*600大小的窗口,窗口名称是GLEW Demo
    GLFWwindow* window = glfwCreateWindow(800, 600, "GLEW Demo", NULL, NULL);
    if (!window)
    {
        std::cerr << "Failed to create GLFW window" << std::endl;
        glfwTerminate();
        return -1;
    }
    // 将OpenGL的上下文 与指定窗口关联 并且在当前线程上激活该上下文
    // 一个上下文只能在一个线程上被激活,并且每个线程只能有一个被激活的上下文
    glfwMakeContextCurrent(window);

    // GLenum err = glewInit(); 这行代码是用来初始化GLEW库的，GLEW是一个用来管理OpenGL扩展的库，它可以检测当前平台支持的OpenGL功能，并提供相应的函数指针和宏定义。
    // glewInit函数会返回一个枚举值，表示初始化是否成功，如果成功则返回GLEW_OK，否则返回一个错误码。
    GLenum err = glewInit();
    if (err != GLEW_OK)
    {
        std::cerr << "Failed to initialize GLEW: " << glewGetErrorString(err) << std::endl;
        return -1;
    }
    //
    std::cout << "GLEW version: " << glewGetString(GLEW_VERSION) << std::endl;
    std::cout << "OpenGL version: " << glGetString(GL_VERSION) << std::endl;

    // glfwWindowShouldClose 是否检测到关闭窗口的事件
    while (!glfwWindowShouldClose(window))
    {
        render(); // 渲染
        // glfwSwapInterval()命令和glfwSwapBuffers()命令用来开启垂直同步，因为GLFW窗口默认是双缓冲[插图]的
        glfwSwapBuffers(window); // 绘制屏幕
        glfwPollEvents(); // 处理窗口相关事件 例如点击事件
    }
    // 分别调用glfwDestroyWindow()和glfwTerminate()通知GLFW销毁窗口并终止运行。
    glfwTerminate(); // 终止运行

    return 0;
}

