#### choose
```xml
<select id="getUserList" resultType="User">
  SELECT * FROM users
  <where>
    <choose>
      <when test="enabled != null and enabled">
        AND enabled = 1
      </when>
      <when test="enabled != null and !enabled">
        AND enabled = 0
      </when>
      <otherwise>
        AND enabled = 1
      </otherwise>
    </choose>
  </where>
</select>
```
* `choose相当于switch`
* `此时的when相当于case`
* `otherwise相当于default`



