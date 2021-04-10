var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const models = require('./models');
const timeZone = require('mongoose-timezone');

var wordSchema;
var selectedWordsSchema;
const WORDS_MODEL = "words";

module.exports = {
  connect: function(CONNECTION_STRING) {
    mongoose.connect(CONNECTION_STRING, {useUnifiedTopology: true, useNewUrlParser: true});
    var db = mongoose.connection;
    // mongoose.pluralize(null);  Model name with no 's' at end
    db.on('error', () => console.error("ERROR CONNECTION!")),//console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      mongoose.connection.on('connected', () => console.log("ON CONNECTED OK"))  
      console.log('connection successful!');
    });
    wordSchema = new Schema({
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
    selectedWordsSchema = new Schema({
      words: Array
    });
    wordSchema.plugin(timeZone);
  },
  newRecord: function(email, region, lon, lat, word, thought, clientIp) {
    return new Promise( (resolve, reject) => {
      var wordOfDay = mongoose.model(word, wordSchema);
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
            .catch(error => console.log("new record error: ", error.message));
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
  },
  getSubmissionDetails: function(userEmail, word) {
    return new Promise((resolve, reject) => {
      var wordOfDay = mongoose.model(word, wordSchema);
      wordOfDay.find({ email: userEmail }, function(err, doc) {
        if (err) reject(Error(err))
          .catch(error => console.log("getOtherThoughtsOn word: ", error.message));
        resolve(doc);
      });
    });
  },
  getWordsForTheWeek: function() {
    return new Promise((resolve, reject) => {
      // var wordsForTheWeek = mongoose.model(WORDS_MODEL, selectedWordsSchema, WORDS_MODEL);
      models.wordsModel.find( {}, function(err, doc) {
        if (err) reject(Error(err))
          .catch(error => console.error("getWordsForTheWeek(): ", error.message));
          try {
            console.log("getWordsForTheWeek() >>", doc[0].words);
            setTimeout(() => resolve(doc[0].words), 100);
          }
          catch (e) {
            console.log("trouble finding words from DB");
            resolve(["No words today :("])
          }
      })
    });
  },
  testFetch: function() {
    console.log('test')
    // let wordSchema = Schema({
    //   words: Array
    // });
    // let model = mongoose.model('words', wordSchema);
    // const words = ['faith', 'vibez', 'feelings', 'time', 'emotion'];
    
  }
}
