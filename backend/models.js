var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const words_today_schema = new Schema({
    words: Array
});

const thoughtSchema = new Schema({
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
const modelFor = word => {
    return mongoose.model(word, thoughtSchema);
}
const wordsModel = mongoose.model('words', words_today_schema);

module.exports = { wordsModel, modelFor }