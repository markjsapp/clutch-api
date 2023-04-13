const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  games: [
    {
      date: {
        type: Date,
        required: true
      },
      opponent: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        required: true
      },
      win: {
        type: Boolean,
        required: true
      },
      killshots: {
        type: Number,
        required: true
      }
    }
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
