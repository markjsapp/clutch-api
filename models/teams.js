const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  leagueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'League',
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateUpdated: {
    type: Date,
    default: Date.now
  },
  gamesPlayed: {
    type: Number,
    required: false
  },
  winLossRecord: {
    wins: {
      type: Number,
      default: 0
    },
    losses: {
      type: Number,
      default: 0
    }
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teamLogo: {
    type: Buffer,
    required: false
  }  
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;