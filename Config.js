var Config={
    baseUrl:"http://localhost:3000",
    dbConfig:{
        connectionLimit : 100,
        host: 'localhost',  
        user: 'root',  
        password: 'iitms!123',  
        database: 'netra',
        multipleStatements: true 
    },
    secretKey:'okijima'
}

module.exports=Config;