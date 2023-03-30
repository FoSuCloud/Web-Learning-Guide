## assembly.xml
* `assembly.xml 是 Maven Assembly 插件的一个配置文件，用于将多个文件或目录打包成一个归档文件（如 zip、tar.gz、jar 等）。`
* 该文件通常放置在项目的 src/assembly 目录下，用于指定打包的规则和内容。

* assembly.xml 文件中包含多个 <assembly> 元素，每个 <assembly> 元素对应一种打包规则，指定了归档文件的格式、文件名、依赖关系等信息。
* 在 <assembly> 元素内部，可以使用多个 <fileSet>、<dependencySet>、<file> 等元素来指定打包内容的来源。

* 下面是一个简单的 assembly.xml 文件示例，用于将项目中的所有 .class 文件打包成一个 jar 包：
```xml
<assembly>
  <id>jar-with-classes</id>
  <formats>
    <format>jar</format>
  </formats>
  <includeBaseDirectory>false</includeBaseDirectory>
  <fileSets>
    <fileSet>
      <directory>${project.build.outputDirectory}</directory>
      <outputDirectory>/</outputDirectory>
      <includes>
        <include>**/*.class</include>
      </includes>
    </fileSet>
  </fileSets>
</assembly>
```

* id 元素指定了该打包规则的 ID
* `<formats> 元素指定了打包的格式`为 jar
* includeBaseDirectory 元素指定打包时是否包含基本目录
* fileSets 元素内部使用一个 `<fileSet> 元素，指定了打包的来源目录` 为 ${project.build.outputDirectory},包含了所有 .class 文件
* files 元素指定了一个或多个文件， `每个 file 元素指定了一个文件` 



