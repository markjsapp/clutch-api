const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
  league_id: {
    type: Number,
    required: true,
    unique: true
  },
  league_name: {
    type: String,
    required: true
  },
  league_type: {
    type: String,
    enum: ['STANDARD', 'DUO', 'OTHER'],
    required: true
  },
  rule_type: {
    type: String,
    enum: ['WATL', 'IATF', 'OTHER'],
    required: true
  },
  game_type: {
    type: String,
    required: true
  },
  number_of_matches: {
    type: Number,
    required: true
  },
  killshot_average: {
    type: Number,
    required: true
  },
  throw_average: {
    type: Number,
    required: true
  },
  score_average: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('League', leagueSchema);