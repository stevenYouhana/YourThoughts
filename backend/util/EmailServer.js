var nodemailer = require('nodemailer');
const text = "A user has responded to a word!";
var dotenv = require('dotenv');
dotenv.config();

var auth= {
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASSWORD
}
console.log("auth: ",auth)
var transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  },
  tls: {
        rejectUnauthorized: false
    }
});


module.exports.sendEmail = function(email, word, thought, region) {
  var mailOptions = {
    from: process.env.MAIL_USER,
    to: 'stevenyouhana@gmail.com',
    subject: 'Speak Your Thoughts - new submission from ' + email,
    text: text + `\n\rUser: ${email} has commented on word "${word}"`
      +`\n\r\n\rThought: ${thought}`
      +`\n\r\n\rUser location: ${region}`
      +`\n\r\n\rYourthoughts development team`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
