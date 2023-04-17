const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  playerId: {
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
    required: false
  },
  totalLosses: {
    type: Number,
    required: false
  },
  winPercent: {
    type: Number,
    required: false
  },
  killshots: {
    type: Number,
    required: false
  },
  killshotPercent: {
    type: Number,
    required: false
  },
  averageScore: {
    type: Number,
    required: false
  },
  dateCreated: {
    type: Date,
    required: false
  },
  dateUpdated: {
    type: Date,
    //update the logic for this later
    required: false
  },
  numberOfGamesPlayed: {
    type: Number,
    required: false
  },
  perfectGames: {
    type: Number,
    required: false
  },
  perfectMatches: {
    type: Number,
    required: false
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
    required: false
  },
  seasonsPlayed: {
    type: Number,
    required: false
  },
  leagueMemberId: {
    type: Number,
    required: false
  },
  nickname: {
    type: String,
    required: false
  },
  profilePicture: {
    type: Buffer,
    required: false
  },
  throwsMade: {
    type: Number,
    required: false
  },
  bullseyes: {
    type: Number,
    required: false
  },
  unicorns: {
    type: Number,
    required: false
  },
  totalTies: {
    type: Number,
    required: false
  },
  oddBallThrows: {
    type: Number,
    required: false
  },
  drops: {
    type: Number,
    required: false
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;