var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const words_today_schema = new Schema({
    words: Array
});

const wordsModel = mongoose.model('words', words_today_schema);


module.exports = { wordsModel }