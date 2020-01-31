const EmailValidation = require('../util/EmailValidation');
const EmailServer = require('../util/EmailServer');
const Location = require('../util/Location');

module.exports = function(app) {
  const DB_operations = require('../Database');
  var dotenv = require('dotenv');
  dotenv.config();

  if (process.env.NODE_ENV === 'production') {
    console.log("DB_operations.connect(process.env.CONNECTION_STRING_PROD)")
    DB_operations.connect(process.env.CONNECTION_STRING_PROD);
  }
  else {
    console.log("DB_operations.connect(process.env.CONNECTION_STRING_DEV)")
    DB_operations.connect(process.env.CONNECTION_STRING_DEV);
  }

  app.get('/words', function(req, res) {    
    DB_operations.getWordsForTheWeek().then(response => {
      res.send(response)
    })
  })

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
          DB_operations.getSubmissionDetails(data.email, data.word)
            .then(result => {
              console.log("getSubmissionDetails results: ", result)
              // EmailServer.sendEmail(data.email, data.word, data.thought, data.region);
            })
          res.send(result);
        }
      });
  })
}
