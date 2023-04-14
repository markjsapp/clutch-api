const express = require('express');
const router = express.Router();
const Team = require('../models/teams');

// GET /teams
/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Get all teams
 *     description: Retrieve a list of all teams in the database
 *     tags: 
 *       - Teams
 *     responses:
 *       200:
 *         description: A list of teams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Team'
 */
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /teams/:id
/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: Get a single team by ID
 *     description: Retrieve a single team from the database by its ID
 *     tags: 
 *       - Teams
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the team to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single team object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       404:
 *         description: Team not found
 */
router.get('/:id', getTeam, (req, res) => {
  res.json(res.team);
});

// POST /teams
/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Create a new team
 *     description: Creates a new team with the specified name and members
 *     tags: 
 *       - Teams
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the team
 *               members:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     playerId:
 *                       type: number
 *                       description: The ID of the player
 *                     playerName:
 *                       type: string
 *                       description: The name of the player
 *             example:
 *               name: The Choppers
 *               members:
 *                 - playerId: 1
 *                   playerName: John
 *                 - playerId: 2
 *                   playerName: Jane
 *     responses:
 *       201:
 *         description: The newly created team
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
  const team = new Team({
    name: req.body.name,
    members: req.body.members
  });

  try {
    const newTeam = await team.save();
    res.status(201).json(newTeam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /teams/:id
/**
 * @swagger
 * /teams/{id}:
 *   put:
 *     summary: Update a team by ID
 *     description: Update an existing team in the database by its ID
 *     tags: 
 *       - Teams
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the team to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Team object to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TeamRequest'
 *     responses:
 *       200:
 *         description: An updated team object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Team not found
 */
router.put('/:id', getTeam, async (req, res) => {
    if (req.body.teamName != null) {
      res.team.teamName = req.body.teamName;
    }
    if (req.body.leagueId != null) {
      res.team.leagueId = req.body.leagueId;
    }
  
    try {
      const updatedTeam = await res.team.save();
      res.json(updatedTeam);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
// DELETE /teams/:id
/**
 * @swagger
 * /teams/{id}:
 *   delete:
 *     summary: Delete a team by ID
 *     description: Delete a team from the database by ID
 *     tags: 
 *       - Teams
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the team to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Team deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message confirming that the team was deleted successfully
 *                   example: Team deleted
 *       404:
 *         description: Team not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the specified team was not found
 *                   example: Team not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that an error occurred while deleting the team
 *                   example: An error occurred while deleting the team
 */
router.delete('/:id', getTeamAndCheckLeagues, async (req, res) => {
    try {
      await res.team.remove();
      res.json({ message: 'Team deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });  
  
// Middleware function to get a team by ID
async function getTeam(req, res, next) {
    try {
      const team = await Team.findById(req.params.id);
      if (team == null) {
        return res.status(404).json({ message: 'Team not found' });
      }
      res.team = team;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

// Middleware function to get a team by ID and check for related leagues
async function getTeamAndCheckLeagues(req, res, next) {
    try {
      const team = await Team.findById(req.params.id).populate('leagues');
      if (team == null) {
        return res.status(404).json({ message: 'Team not found' });
      }
      res.team = team;
      if (team.leagues.length > 0) {
        return res.status(400).json({ message: 'Team is part of one or more leagues and cannot be deleted' });
      }
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
}

module.exports = router;