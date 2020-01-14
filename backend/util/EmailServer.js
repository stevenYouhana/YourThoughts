var nodemailer = require('nodemailer');
const text = "A user has responded to a word";
var transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'f.kaweesa@outlook.com',
    pass: 'fkaweesa1234567890'
  },
  tls: {
        rejectUnauthorized: false
    }
});

var mailOptions = {
  from: 'f.kaweesa@outlook.com',
  to: 'stevenyouhana@hotmail.co.nz',
  subject: 'Speak Your Thoughts - new submission',
  text: text
};

module.exports.sendEmail = function() {
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
