const mongoose = require('mongoose');

const leagueMemberSchema = new mongoose.Schema({
  league_member_id: {
    type: Number,
    required: true,
    unique: true
  },
  league_id: {
    type: Number,
    required: true
  },
  league_member_first_name: {
    type: String,
    required: true
  },
  league_member_last_name: {
    type: String,
    required: true
  },
  league_member_nickname: {
    type: String,
    required: true
  },
  games_won_in_league: {
    type: Number,
    default: 0
  },
  games_lost_in_league: {
    type: Number,
    default: 0
  },
  games_tied_in_league: {
    type: Number,
    default: 0
  },
  date_joined: {
    type: Date,
    default: Date.now
  }
});

const LeagueMember = mongoose.model('LeagueMember', leagueMemberSchema);

module.exports = LeagueMember;