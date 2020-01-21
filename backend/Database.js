var mongoose = require('mongoose');
const timeZone = require('mongoose-timezone');

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
      date: Date,
      metadata: {
        region: String,
        lon: Number,
        lat: Number,
        ip: String
      }
    });
    wordSchema.plugin(timeZone);
  },
  newRecord: function(email, region, lon, lat, word, thought, clientIp) {
    return new Promise((resolve, reject) => {
      var wordOfDay = mongoose.model(word, wordSchema);
      // const date = Date(new Date().toLocaleString('en-NZ', { timeZone: 'Pacific/Auckland' }));
      // console.log("new Date() ",date);
      var record = {
        user_email: email,
        word: word,
        thought: thought,
        date: new Date(),
        metadata: {
          region: region,
          lon: lon,
          lat: lat,
          ip: clientIp
        }
      }
      console.log('save new record as', record)
      var wordRecord = new wordOfDay(record);
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
