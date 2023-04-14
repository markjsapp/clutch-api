const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  player_id: {
    type: Number,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['player', 'admin', 'league_captain'],
    required: true
  },
  totalWins: {
    type: Number,
    required: true
  },
  totalLosses: {
    type: Number,
    required: true
  },
  winPercent: {
    type: Number,
    required: true
  },
  killshots: {
    type: Number,
    required: true
  },
  killshotPercent: {
    type: Number,
    required: true
  },
  averageScore: {
    type: Number,
    required: true
  },
  dateCreated: {
    type: Date,
    required: true
  },
  dateUpdated: {
    type: Date,
    required: true
  },
  numberOfGamesPlayed: {
    type: Number,
    required: true
  },
  perfectGames: {
    type: Number,
    required: true
  },
  perfectMatches: {
    type: Number,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  highScore: {
    type: Number,
    required: true
  },
  seasonsPlayed: {
    type: Number,
    required: true
  },
  leagueMemberId: {
    type: Number,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  profilePicture: {
    type: Buffer,
    required: true
  },
  throwsMade: {
    type: Number,
    required: true
  },
  bullseyes: {
    type: Number,
    required: true
  },
  unicorns: {
    type: Number,
    required: true
  },
  totalTies: {
    type: Number,
    required: true
  },
  oddBallThrows: {
    type: Number,
    required: true
  },
  drops: {
    type: Number,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;