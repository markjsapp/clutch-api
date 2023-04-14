const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  gameId: {
    type: Number,
    required: true,
    unique: true
  },
  player1Id: {
    type: Number,
    required: true
  },
  player2Id: {
    type: Number,
    required: true
  },
  leagueGame: {
    type: Boolean,
    required: true
  },
  gameType: {
    type: String,
    required: true
  },
  ruleType: {
    type: String,
    required: true
  },
  rounds: {
    type: Number,
    required: true
  },
  winningScore: {
    type: Number,
    required: true
  },
  player1Score: {
    type: Number,
    required: true
  },
  player2Score: {
    type: Number,
    required: true
  },
  player1Sticks: {
    type: Number,
    required: true
  },
  player2Sticks: {
    type: Number,
    required: true
  },
  player1Drops: {
    type: Number,
    required: true
  },
  player2Drops: {
    type: Number,
    required: true
  },
  seasonName: {
    type: String,
    required: true
  },
  seasonId: {
    type: Number,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateUpdated: {
    type: Date,
    default: Date.now
  }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;