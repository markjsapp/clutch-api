const mongoose = require('mongoose');

const seasonSchema = new mongoose.Schema({
  seasonId: {
    type: Number,
    required: true,
    unique: true
  },
  seasonName: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  games: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  }],
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateUpdated: {
    type: Date,
    default: Date.now
  }
});

const Season = mongoose.model('Season', seasonSchema);

module.exports = Season;