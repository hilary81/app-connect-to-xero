const { Sequelize} = require('sequelize')

const db= new Sequelize(
    'demotable1', 'root', 'Abc123456*',{
        host: 'localhost',
        dialect:'mysql'
    },{ 
    pool:{
        max: 5, // max no of connection in pool
        min:0, //min no of connection in pool
        acquire: 30000, // max time in milisec that pool will try to get connection before throwing error
        idle: 10000  // max time in milisec that a connection can b e idle before being released
    }
})

module.exports = db;