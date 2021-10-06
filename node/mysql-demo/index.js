// 参考 https://blog.csdn.net/qq_21976063/article/details/103799848
async function createDatabase(){
    // 1。配置数据库连接
    const mysql = require('mysql2/promise')
// 数据库连接配置
    const cfg = {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'demo'
    }

    const connection = await mysql.createConnection(cfg)
    console.log('连接成功')
    // 2。创建数据表
    // async function createTable(){
    //     // 创建table
    //     const CREATE_SQL = `CREATE TABLE IF NOT EXISTS demo(
    //                   id INT NOT NULL AUTO_INCREMENT,
    //                   message VARCHAR(45) NULL,
    //                   PRIMARY KEY(id)
    // )`
    //     let res = await connection.execute(CREATE_SQL)
    //     console.log('创建:', res)
    // }
    // createTable()

    // 3. 插入数据
    // async function insertData(values){
    //     let SQL = `INSERT INTO demo(message) VALUES(?)`
    //     let res = await connection.execute(SQL,[values])
    //     console.log('插入:',res)
    // }
    // insertData('数据3')
    // 4. 查询数据
    async function queryData(){
        let SQL = 'select * from demo'
        let [rows] = await connection.execute(SQL)
        console.log('rows',JSON.stringify(rows))
         // [{"id":1,"message":"数据"},{"id":2,"message":"数据"},{"id":3,"message":"数据3"}]
    }
    queryData()
}
createDatabase()


