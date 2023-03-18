## lombok
* lombok通过注解的方式，自动生成java类的代码，从而减少了开发人员重复的工作和冗长的代码

* Lombok可以生成一些常见的Java类的代码，如`Getter和Setter方法、构造函数、日志记录器（Logger）`等。通过使用注解，可以使Java类的代码更加简洁易读

* 例如，使用 `@Data 注解`可以
* 自动生成Getter和Setter方法、toString 方法、equals 和 hashCode 方法，而不需要手动编写这些代码。

#### 一个使用Lombok注解的Java类示例
```java
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SampleData {
    private String modelName;
    private String name;
}
```
* `@Data：自动生成Getter、Setter、equals、hashCode、toString等常用方法；`
  `@Builder：自动生成Builder模式的构造方法，方便构造带有多个参数的对象；`
  @AllArgsConstructor：自动生成包含所有字段的构造方法；
  @NoArgsConstructor：自动生成无参构造方法。
* `最终会生成一个无参构造函数，一个使用Builder模式的包含所有参数的构造函数`
* Builder模式的使用方式：
```text
SampleData sampleData = SampleData.builder()
                                  .modelName("modelA")
                                  .name("data1")
                                  .build();
```
* `经过 Lombok 插件进行增强处理，这个类最终生成的代码如下：`
```java
public class SampleData {
    private String modelName;
    private String name;
//    一个无参构造函数
    public SampleData() {
    }
//    一个使用Builder模式的包含所有参数的构造函数
    @Builder
    public SampleData(String modelName, String name) {
        this.modelName = modelName;
        this.name = name;
    }

    public String getModelName() {
        return this.modelName;
    }

    public String getName() {
        return this.name;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof SampleData)) return false;
        final SampleData other = (SampleData) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$modelName = this.getModelName();
        final Object other$modelName = other.getModelName();
        if (this$modelName == null ? other$modelName != null : !this$modelName.equals(other$modelName)) return false;
        final Object this$name = this.getName();
        final Object other$name = other.getName();
        if (this$name == null ? other$name != null : !this$name.equals(other$name)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof SampleData;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $modelName = this.getModelName();
        result = result * PRIME + ($modelName == null ? 43 : $modelName.hashCode());
        final Object $name = this.getName();
        result = result * PRIME + ($name == null ? 43 : $name.hashCode());
        return result;
    }

    public String toString() {
        return "SampleData(modelName=" + this.getModelName() + ", name=" + this.getName() + ")";
    }
}
```



