const express = require('express');
const router = express.Router();
const Season = require('../models/season');

// GET /seasons - Retrieve all seasons
router.get('/', async (req, res) => {
  try {
    const seasons = await Season.find();
    res.json(seasons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /seasons/:id - Retrieve a specific season by ID
router.get('/:id', getSeason, (req, res) => {
  res.json(res.season);
});

// POST /seasons - Create a new season
router.post('/', async (req, res) => {
  const season = new Season(req.body);

  try {
    const newSeason = await season.save();
    res.status(201).json(newSeason);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /seasons/:id - Update a season by ID
router.put('/:id', getSeason, async (req, res) => {
  Object.assign(res.season, req.body);

  try {
    const updatedSeason = await res.season.save();
    res.json(updatedSeason);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /seasons/:id - Delete a season by ID
router.delete('/:id', getSeason, async (req, res) => {
  try {
    await res.season.remove();
    res.json({ message: 'Season deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a season by ID
async function getSeason(req, res, next) {
  try {
    const season = await Season.findById(req.params.id);
    if (season == null) {
      return res.status(404).json({ message: 'Season not found' });
    }
    res.season = season;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;