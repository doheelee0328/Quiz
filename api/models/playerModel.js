const mongoose = require('mongoose')

const Schema = mongoose.Schema

const playerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('player', playerSchema)
