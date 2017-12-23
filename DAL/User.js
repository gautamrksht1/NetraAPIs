
var dbPool = require('../DB/DBConn');
var User = {  
    getAllUser: function(callback) { 
        dbPool.getConnection(function(err, connection) {
            console.log('inside getAllUser err= :'+err);
            if(err==null){
            // Use the connection if noo err is set
            connection.query('Select FirstName,LastName,Email from user', function (error, results, fields) {
                // And done with the connection.
                connection.release();             
                // Handle error after the release.
                callback(error,results);             
                // Don't use the connection here, it has been returned to the pool.
              });
            }       
          });
          },  
    Login:function(credential,callback){
        dbPool.getConnection(function(err, connection) {
            console.log('inside login err= :'+err);
            if(err==null){
            // Use the connection if noo err is set    
            connection.query('SET @StatusID = 0;CALL netra.Login(?,?,@StatusID);SELECT @StatusID;',[credential.username,credential.password], function (error, results, fields) {
                // And done with the connection.
                connection.release();             
                // Handle error after the release.
                callback(error,results);             
                // Don't use the connection here, it has been returned to the pool.
              });
            }       
          });
    },
    getUserId: function(id, callback) {  
        dbPool.getConnection(function(err, connection) {
            if(err==null){
            // Use the connection
            connection.query("select * from user where ID=?",id, function (error, results, fields) {
                // And done with the connection.
                connection.release();             
                // Handle error after the release.
                callback(error,results);             
                // Don't use the connection here, it has been returned to the pool.
              });
            }       
          });          
    },  
    registerUser: function(User, callback) { //startDbConn();
        dbPool.getConnection(function(err, connection) {
            if(err==null){
                            // Use the connection
            connection.query("SET @StatusID = 0;CALL netra.AddNewUser(?,?,?,?,@StatusID);SELECT @StatusID;", [User.FirstName, User.LastName,User.Email,User.password], function (error, results, fields) {
                // And done with the connection.
                connection.release();             
                // Handle error after the release.
                callback(error,results);             
                // Don't use the connection here, it has been returned to the pool.
              }); 
            }      
          });  
        },  
    deleteUser: function(id, callback) {  
        dbPool.getConnection(function(err, connection) {
            // Use the connection
            if(err==null){
            connection.query("delete from user where Id=?", [id], function (error, results, fields) {
                // And done with the connection.
                connection.release();             
                // Handle error after the release.
                callback(error,results);             
                // Don't use the connection here, it has been returned to the pool.
              });   
            }    
          });        //
    },
    putUserActivate:function(User,callback){
        dbPool.getConnection(function(err, connection) {
            if(err==null){
            // Use the connection
            connection.query("SET @StatusCode = 0;CALL netra.ActivateEmail(?,?,@StatusCode);SELECT @StatusCode;", [User.ID,User.EmailActivationUid], function (error, results, fields) {
                // And done with the connection.
                connection.release();             
                // Handle error after the release.
                callback(error,results);             
                // Don't use the connection here, it has been returned to the pool.
              });  
            }     
          });  
        //console.log(User);
      }      
};  

module.exports = User;  
