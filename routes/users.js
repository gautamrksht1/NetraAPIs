var express = require('express');
//var NodeSession = require('node-session');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var cors = require('cors'); 
var Config=require('../Config');
var User = require('../DAL/User'); 
var transporter=require('../EmailConfig/MailConfig'); 
var mailOptions=require('../EmailConfig/MailOptions'); 

//var session = new NodeSession({secret: 'Q3UBzdH9GAUTAMTKbi5MTPyChpzXLsTD'});

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
/* GET users listing. */
router.get('/:id?', function(req, res, next) {  
  if (req.params.id) {  
    User.getUserId(req.params.id, function(err, rows) {  
          if (err) {  
              res.json(err);  
          } else {  
              res.json(rows);  
          }  
      });  
  } else {  
    User.getAllUser(function(err, rows) {  
          if (err) {  
              res.json(err);  
          } else {  
              res.json(rows);  
          }  
         
      });  
  }  
});
router.post('/Login',function(req, res, next){
    var StatusID;
    console.log('inside login api');
    console.log(req.body);
     if (req.body)
      { 

        User.Login(req.body,function(errors,results){
            if(errors)
            {        
                res.statusCode=500;        
                res.json(errors); 

            }else {
                results[2].forEach( (row) => { 
                    StatusID=row["@StatusID"];            
                    if(StatusID==1)
                    {   
                        // session.startSession(req, res, function(){
                        //     console.log('session started');
                        //   });                   
                        // req.session.put('UserID', req.body.username);
                        // var sessionValue = req.session.get('UserID', 'null');
                         // create a token
                         var token = jwt.sign({ id: req.body.username }, Config.secretKey, {
                            expiresIn: 60 // expires in 60 secs
                          });
                         res.status(200).send({ auth: true, token: token });
                        //res.json(sessionValue);
                        //res.statusCode=200;
                     }
                     else if(StatusID==0){
                        res.statusCode=400;
                        res.json({ errors:'In valid Username or password' });
                    }
                    else {
                        res.status(500);
                       // res.statusCode=500;
                       res.json({ errors:'Some server error occured' });
                        console.log('in status=2');
                    }

              });
        }
});
}
});
      
router.post('/Register', function(req, res, next) {  
  // res.json(req.body);
  var status='';
  var StatusID=0;
  User.registerUser(req.body,function(error, rows) {  
   
      if (error) {  
          res.json(error);  
      } else {  
        rows[2].forEach( (row) => { 
            StatusID=row["@StatusID"];            
            if(StatusID==1)
            {   
                res.json(row);
                res.statusCode=200;
                console.log('in status=1');
            }
            else if(StatusID==0){
                res.statusCode=400;
                res.json({ errors:'Email ID exists' });
            }
            else {
                res.status(500);
               // res.statusCode=500;
               res.json({ errors:'Some server error occured' });
                console.log('in status=2');
            }
            console.log('status: '+status);
            console.log('UserID= '+StatusID);
     })     
    
        }  
  });
 
  console.log('mailOptions1: '+mailOptions.from.toString());
 if(StatusID==1){ transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          console.log('mailOptions2: '+mailOptions);
        console.log('error '+error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }); }
});
router.put('/Activation/Id/:ID/Uid/:UID',function(req, res, next){
   // User.startDbConn();
    console.log('inside put');
    var StatusID;
   // res.send(req.params);
    if (req.params.ID && req.params.UID) {
        var uriParams = {             
                "EmailActivationUid": req.params.UID,
                "ID": req.params.ID
            }
        }; 
        User.putUserActivate(uriParams,function(errors, rows){

            if(errors)
            {                
                res.json(errors); 
            }else {  
                rows[2].forEach( (row) => { 
                    StatusID=row["@StatusCode"];            
                    if(StatusID==1)
                    {   
                        res.json({message:'Account SuccessFully Activated'});
                        res.statusCode=200;
                       console.log('in status=1');
                    }
                    else if(StatusID==0){
                        res.statusCode=400;
                        res.json({ errors:'Email ID Already Activated' });
                    }
                    else {
                        res.status(500);
                       // res.statusCode=500;
                       res.json({ errors:'Some server error occured' });
                    }
                  
             })     
            
                } 
          
        });
    });  


module.exports = router;
