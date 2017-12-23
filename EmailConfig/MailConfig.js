var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  host:'smtp.gmail.com',
  // port:25,
  secure:true,
  auth: {
    user: 'gautamrksht2@gmail.com',
    pass: 'gau123abcpqr'
  }
});

module.exports=transporter;