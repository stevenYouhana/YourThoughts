
var mongoose = require('mongoose');

var wordSchema;
module.exports = {
  connect: function(CONNECTION_STRING) {
    console.log("connect: function()")
    mongoose.connect(CONNECTION_STRING, {useUnifiedTopology: true, useNewUrlParser: true});
    var db = mongoose.connection;
    // mongoose.pluralize(null);  Model name with no 's' at end
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log('connection successful!');

    });
    wordSchema = new mongoose.Schema({
      user_email: String,
      word: String,
      thought: String,
      lon: Number,
      lat: Number
    });
  },
  newRecord: function(email, lon, lat, word, thought) {
    return new Promise((resolve, reject) => {
      var wordOfDay = mongoose.model(word, wordSchema);
      console.info('WORD: '+word)
      console.log('save new record as', {
        user_email: email,
        word: word,
        thought: thought,
        lon: lon,
        lat: lat
      })
      var wordRecord = new wordOfDay({
        user_email: email,
        word: word,
        thought: thought,
        lon: lon,
        lat: lat
      });
      wordRecord.save(function(err, record) {
        if (err) {
          console.error(err);
          reject(Error(err))
            .catch(error => console.log("new record error: ",error.message));
        }
        console.info(record," saved!");
        resolve({message: 'success'});
      });
    });
  },
  getOtherThoughtsOn: function(word) {
    console.log("find for "+word);
    return new Promise((resolve, reject) => {
      var wordOfDay = mongoose.model(word, wordSchema);
      wordOfDay.find({}, function(err, doc) {
        if (err) reject(Error(err))
          .catch(error => console.log("getOtherThoughtsOn word: ", error.message));
        resolve(doc);
      });
    });

  }
}
