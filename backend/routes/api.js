

module.exports = function(app) {
  const DB_operations = require('../Database');
  var dotenv = require('dotenv');
  dotenv.config();

  DB_operations.connect(process.env.CONNECTION_STRING);

  app.get('/others/:word', function(req, res) {
    console.log("app.get('/others/:word', function(req, res): ",req.params.word);
    DB_operations.getOtherThoughtsOn(req.params.word).then(result => {
      res.json({thoughts: result.map(el => el.thought)});
    });
  })

  app.post('/new', function(req, res) {
    console.log("app.get('/new', function(req, res): ",req.body);
    const data = req.body;
    DB_operations.newRecord(data.email, data.lon, data.lat, data.word, data.thought)
      .then(result => {
        if (result.message !== 'success') res.send(result.toStirng());
        console.log('confirm saved');
      });
    res.send('new record route!');
  })

}
