const express = require('express');
const router = express.Router();
const Leagues = require('../models/leagues');

// GET /leagues
/**
 * @swagger
 * /leagues:
 *   get:
 *     summary: Get all leagues
 *     description: Retrieve a list of all leagues in the database
 *     responses:
 *       200:
 *         description: A list of leagues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/League'
 */
router.get('/', async (req, res) => {
  try {
    const leagues = await Leagues.find();
    res.json(leagues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /leagues/:id
/**
 * @swagger
 * /leagues/{id}:
 *   get:
 *     summary: Get a single league by ID
 *     description: Retrieve a single league from the database by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the league to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single league object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/League'
 *       404:
 *         description: League not found
 */
router.get('/:id', getLeague, (req, res) => {
  res.json(res.league);
});

// POST /leagues
/**
 * @swagger
 * /leagues:
 *   post:
 *     summary: Create a new league
 *     description: Creates a new league with the specified details
 *     tags:
 *       - Leagues
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LeagueRequest'
 *     responses:
 *       201:
 *         description: The newly created league
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/League'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
  const league = new Leagues({
    league_id: req.body.league_id,
    league_name: req.body.league_name,
    league_type: req.body.league_type,
    rule_type: req.body.rule_type,
    game_type: req.body.game_type,
    number_of_matches: req.body.number_of_matches,
    killshot_average: req.body.killshot_average,
    throw_average: req.body.throw_average,
    score_average: req.body.score_average
  });

  try {
    const newLeague = await league.save();
    res.status(201).json(newLeague);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /leagues/:id
/**
 * @swagger
 * /leagues/{id}:
 *   put:
 *     summary: Update a league by ID
 *     description: Update an existing league in the database by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the league to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: League object to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LeagueRequest'
 *     responses:
 *       200:
 *         description: An updated league object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/League'
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: League not found
 */
router.put('/:id', getLeague, async (req, res) => {
  if (req.body.league_id != null) {
    res.league.league_id = req.body.league_id;
  }
  if (req.body.league_name != null) {
    res.league.league_name = req.body.league_name;
  }
  if (req.body.league_type != null) {
    res.league.league_type = req.body.league_type;
  }
  if (req.body.rule_type != null) {
    res.league.rule_type = req.body.rule_type;
  }
  if (req.body.game_type != null) {
    res.league.game_type = req.body.game_type;
  }
  if (req.body.number_of_matches != null) {
    res.league.number_of_matches = req.body.number_of_matches;
  }
  if (req.body.killshot_average != null) {
    res.league.killshot_average = req.body.killshot_average;
  }
  if (req.body.throw_average != null) {
    res.league.throw_average = req.body.throw_average;
  }
  if (req.body.score_average != null) {
    res.league.score_average = req.body.score_average;
  }

  try {
    const updatedLeague = await res.league.save();
    res.json(updatedLeague);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /leagues/:id
/**
 * @swagger
 * /leagues/{id}:
 *   delete:
 *     summary: Delete a league by ID
 *     description: Delete a league from the database by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the league to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: League deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message confirming that the league was deleted successfully
 *                   example: League deleted
 *       404:
 *         description: League not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the specified league was not found
 *                   example: League not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that an error occurred while deleting the league
 *                   example: An error occurred while deleting the league
 */
router.delete('/:id', getLeague, async (req, res) => {
  try {
    await res.league.remove();
    res.json({ message: 'League deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a league by ID
async function getLeague(req, res, next) {
  try {
    const league = await League.findById(req.params.id);
    if (league == null) {
      return res.status(404).json({ message: 'League not found' });
    }
    res.league = league;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;