### log4j2
* 使用log4j2来做日志管理


#### Replace this use of System.out or System.err by a logger.
* 这是一个静态代码分析工具（如FindBugs，Checkstyle，SonarLint）经常会提示的警告信息，意思是不要直接使用System.out或者System.err输出日志信息，而应该使用一个logger来记录日志信息。
* 使用logger的好处是可以方便地进行日志级别控制、输出格式控制、日志信息保存到文件中等，比直接使用System.out或System.err更加灵活和方便。
* 使用logger可以使用Java标准库提供的java.util.logging.Logger类，也可以使用第三方日志框架，如log4j、logback等。







