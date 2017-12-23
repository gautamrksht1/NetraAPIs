//[code language = "javascript"]  
var mysql = require('mysql');
var Config=require('../Config');
var pool = mysql.createPool(
     {

   connectionLimit : Config.dbConfig.connectionLimit,
    host:Config.dbConfig.host,  
    user: Config.dbConfig.user,  
    password: Config.dbConfig.password,  
    database: Config.dbConfig.database,
    multipleStatements: Config.dbConfig.multipleStatements  
}
);  

module.exports = pool;  
//[/code]  