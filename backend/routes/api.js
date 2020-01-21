const EmailValidation = require('../util/EmailValidation');
const EmailServer = require('../util/EmailServer');
const Location = require('../util/Location');

module.exports = function(app) {
  const DB_operations = require('../Database');
  var dotenv = require('dotenv');
  dotenv.config();

  DB_operations.connect(process.env.CONNECTION_STRING);

  app.get('/others/:word', function(req, res) {
    DB_operations.getOtherThoughtsOn(req.params.word).then(result => {
      res.json({thoughts: result.map(el => el.thought)});
    });
  })


  app.post('/new', function(req, res) {
    const data = req.body;
    if (!EmailValidation.EmailValidator.validateEmail(data.email)) {
      res.send('invalid email!');
      return;
    }
    DB_operations.newRecord(data.email, data.region, data.lon, data.lat, data.word,
      data.thought, req.clientIp)
      .then(result => {
        if (result.message === 'success') {
          console.log("if (result.message !== 'success')>> ",result);
          // EmailServer.sendEmail();
          res.send(result);
        }
      });
  })
}
