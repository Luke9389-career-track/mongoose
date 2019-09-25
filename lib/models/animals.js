const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const schema = new Schema({
  species: {
    type: String,
    required: true
  },
  appearances: {
    pattern: String,
    mainColor: {
      type: String,
      required: true
    }
  },
  numberOfEyes: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  hasTail: {
    type: Boolean,
    default: false
  },
  continents: [{
    type: String,
    enum: ['north america', 'south america', 'europe', 'asia', 'antarctica', 'australia', 'africa']
  }]
});

module.exports = mongoose.model('Animal', schema);