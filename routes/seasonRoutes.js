const express = require('express');
const router = express.Router();
const Season = require('../models/season');

/**
 * @swagger
 * /seasons:
 *   get:
 *     summary: Get all seasons
 *     description: Retrieve a list of all seasons in the database
 *     tags:
 *       - Seasons
 *     responses:
 *       200:
 *         description: A list of seasons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Season'
 */
router.get('/', async (req, res) => {
  try {
    const seasons = await Season.find();
    res.json(seasons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /seasons/{id}:
 *   get:
 *     summary: Get a single season by ID
 *     description: Retrieve a single season from the database by its ID
 *     tags:
 *       - Seasons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the season to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single season object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Season'
 *       404:
 *         description: Season not found
 */
router.get('/:id', getSeason, (req, res) => {
  res.json(res.season);
});

/**
 * @swagger
 * /seasons:
 *   post:
 *     summary: Create a new season
 *     description: Creates a new season with the specified data
 *     tags:
 *       - Seasons
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Season'
 *     responses:
 *       201:
 *         description: The newly created season
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Season'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
  const season = new Season(req.body);

  try {
    const newSeason = await season.save();
    res.status(201).json(newSeason);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /seasons/{id}:
 *   put:
 *     summary: Update a season by ID
 *     description: Update an existing season in the database by its ID
 *     tags:
 *       - Seasons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the season to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Season object to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Season'
 *     responses:
 *       200:
 *         description: An updated season object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Season'
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Season not found
 */
router.put('/:id', getSeason, async (req, res) => {
  Object.assign(res.season, req.body);

  try {
    const updatedSeason = await res.season.save();
    res.json(updatedSeason);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @swagger
 * /seasons/{id}:
 *   delete:
 *     summary: Delete a season by ID
 *     description: Delete a season from the database by ID
 *     tags:
 *       - Seasons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the season to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Season deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message confirming that the season was deleted successfully
 *                   example: Season deleted
 *       404:
 *         description: Season not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the specified season was not found
 *                   example: Season not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that an error occurred while deleting the season
 *                   example: An error occurred while deleting the season
 */
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