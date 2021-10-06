// 对象关系映射sequelize
// 参考：https://blog.csdn.net/qq_21976063/article/details/103733648

const Sequelize = require('sequelize')
// 1.建立连接
const sequelize = new Sequelize('demo','root','12345678',{
    host:'localhost',
    /* 数据库类型 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    dialect:'mysql'
})
console.log('连接建立成功')

// 2.建立模型
const Fruit = sequelize.define('Fruit',{
    // 定义主键为UUID，（如果没有定义，默认是id自增）
    id:{
        // 键的类型为UUID
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV1,
        primaryKey: true // 主键
    },
    name: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
},{
    // 是否创建createAt和updateAt字段（默认为true）
    timestamps: false,
    // 修改表名为复数，默认是false,也就是修改为复数
    freezeTableName: true,
    // 表名
    tableName: 'TBL_FRUIT'
})

// 2.同步，根据模型同步表到数据库中
async function sync(){
    // 同步数据库
    let ret = await Fruit.sync()
    /**
     Executing (default): CREATE TABLE IF NOT EXISTS `TBL_FRUIT` (`id` CHAR(36) BINARY , `name` VARCHAR(20) NOT NULL, `price` FLOAT NOT NULL, `stock` INTEGER DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB;
     Executing (default): SHOW INDEX FROM `TBL_FRUIT`
     * */
    // 强制同步:创建表之前先删除已存在的表
    // ret = await Fruit.sync({ force: true })
    console.log(ret)
}
// sync()

// 3。插入数据
async function insert(obj){
    let ret = await Fruit.create(obj)
    console.log('ret',ret)
}
// insert({name:'saas',price:33,stock:2})
/**
 * dataValues: {
    id: '2562e6f0-1a2a-11ec-b941-1bfe928458ad',
    name: 'saas',
    price: 33,
    stock: 2
  },
 ...
 * */

// 4.更新数据（例如只改变一条数据中的某个值）
async function update(){
    let ret = await Fruit.update({price:11},{
        where:{
            name:'a'
        }
    })
    console.log('update',ret)
}
// update()

// 5.查询数据
// 条件查询
async function query(){
    const Op = Sequelize.Op
    let ret = await Fruit.findAll({
        where: {
            // 价格小于100， 大于30
            price: { [Op.lt]: 100, [Op.gt]: 30 }
        }
    })
    console.log('query',JSON.stringify(ret, '', '\t'))
}
query()
