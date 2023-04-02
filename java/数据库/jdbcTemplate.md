## jdbcTemplate
* Spring对JDBC的支持要归功于JdbcTemplate类。
* JdbcTemplate提供了一种特殊的方式，通过这种方式，开发人员在对关系型数据库执行SQL操作的时候，能够避免使用JDBC时常见的繁文缛节和样板式代码。
* `spring-boot中通过jdbc连接和操作关系型数据库(例如mysql)`

* 不使用jdbctemplate查询数据库
```text
@Override
public Optional<Ingredient> findById(String id) {
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        try {
        connection = dataSource.getConnection();
        statement = connection.prepareStatement(
        "select id, name, type from Ingredient where id = ?");
        statement.setString(1, id);
        resultSet = statement.executeQuery();
        Ingredient ingredient = null;
        if(resultSet.next()) {
        ingredient = new Ingredient(
        resultSet.getString("id"),
        resultSet.getString("name"),
        Ingredient.Type.valueOf(resultSet.getString("type")));
        }
        return Optional.of(ingredient);
        } catch (SQLException e) {
        // ??? What should be done here ???
        } finally {
        if (resultSet != null) {
        try {
        resultSet.close();
        } catch (SQLException e) {}
        }
        if (statement != null) {
        try {
        statement.close();
        } catch (SQLException e) {}
        }
        if (connection != null) {
        try {
        connection.close();
        } catch (SQLException e) {}
        }
        }
    return Optional.empty();
    }
```

* `使用jdbctemplate查询数据库`
```java
private JdbcTemplate jdbcTemplate;

public Optional<Ingredient> findById(String id) {
  List<Ingredient> results = jdbcTemplate.query(
      "select id, name, type from Ingredient where id = ?",
      this::mapRowToIngredient,
      id);
  return results.size() == 0 ?
          Optional.empty() :
          Optional.of(results.get(0));
}
private Ingredient mapRowToIngredient(ResultSet row, int rowNum)
    throws SQLException {
  return new Ingredient(
      row.getString("id"),
      row.getString("name"),
      Ingredient.Type.valueOf(row.getString("type")));
}
```







