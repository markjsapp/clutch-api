const express = require('express');
const router = express.Router();
const LeagueMember = require('../models/leagueMember');

// Get all league members
/**
 * @swagger
 * /leagueMembers:
 *   get:
 *     summary: Get all league members
 *     tags:
 *       - League Members
 *     responses:
 *       200:
 *         description: A list of league members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LeagueMember'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.get('/', async (req, res) => {
  try {
    const leagueMembers = await LeagueMember.find();
    res.json(leagueMembers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single league member by league_member_id
/**
 * @swagger
 * /league-members/{league_member_id}:
 *   get:
 *     summary: Get a single league member by league_member_id
 *     parameters:
 *       - in: path
 *         name: league_member_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the league member to retrieve
 *     responses:
 *       200:
 *         description: League member found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeagueMember'
 *       404:
 *         description: League member not found
 *       500:
 *         description: Internal server error
 */
router.get('/:league_member_id', getLeagueMember, (req, res) => {
  res.json(res.leagueMember);
});

// Create a new league member
/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new league member
 *     tags: 
 *       - League Members
 *     requestBody:
 *       description: Object containing details of the new league member
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               league_member_id:
 *                 type: integer
 *               league_id:
 *                 type: integer
 *               league_member_first_name:
 *                 type: string
 *               league_member_last_name:
 *                 type: string
 *               league_member_nickname:
 *                 type: string
 *               games_won_in_league:
 *                 type: integer
 *               games_lost_in_league:
 *                 type: integer
 *               games_tied_in_league:
 *                 type: integer
 *               date_joined:
 *                 type: string
 *                 format: date
 *             example:
 *               league_member_id: 1
 *               league_id: 1
 *               league_member_first_name: John
 *               league_member_last_name: Doe
 *               league_member_nickname: JD
 *               games_won_in_league: 10
 *               games_lost_in_league: 5
 *               games_tied_in_league: 3
 *               date_joined: 2023-04-14
 *     responses:
 *       201:
 *         description: New league member created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeagueMember'
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Invalid request body
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Internal server error
 */
router.post('/', async (req, res) => {
  const leagueMember = new LeagueMember({
    league_member_id: req.body.league_member_id,
    league_id: req.body.league_id,
    league_member_first_name: req.body.league_member_first_name,
    league_member_last_name: req.body.league_member_last_name,
    league_member_nickname: req.body.league_member_nickname,
    games_won_in_league: req.body.games_won_in_league,
    games_lost_in_league: req.body.games_lost_in_league,
    games_tied_in_league: req.body.games_tied_in_league,
    date_joined: req.body.date_joined
  });

  try {
    const newLeagueMember = await leagueMember.save();
    res.status(201).json(newLeagueMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a league member by league_member_id
/**
 * @swagger
 * /leagueMembers/{league_member_id}:
 *   patch:
 *     summary: Update a league member by league_member_id
 *     tags:
 *       - League Members
 *     parameters:
 *       - in: path
 *         name: league_member_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the league member to update
 *       - in: body
 *         name: leagueMember
 *         description: Fields for the league member resource
 *         schema:
 *           type: object
 *           properties:
 *             league_member_id:
 *               type: integer
 *             league_id:
 *               type: integer
 *             league_member_first_name:
 *               type: string
 *             league_member_last_name:
 *               type: string
 *             league_member_nickname:
 *               type: string
 *             games_won_in_league:
 *               type: integer
 *             games_lost_in_league:
 *               type: integer
 *             games_tied_in_league:
 *               type: integer
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 league_member_id:
 *                   type: integer
 *                 league_id:
 *                   type: integer
 *                 league_member_first_name:
 *                   type: string
 *                 league_member_last_name:
 *                   type: string
 *                 league_member_nickname:
 *                   type: string
 *                 games_won_in_league:
 *                   type: integer
 *                 games_lost_in_league:
 *                   type: integer
 *                 games_tied_in_league:
 *                   type: integer
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.patch('/:league_member_id', getLeagueMember, async (req, res) => {
  if (req.body.league_member_id != null) {
    res.leagueMember.league_member_id = req.body.league_member_id;
  }
  if (req.body.league_id != null) {
    res.leagueMember.league_id = req.body.league_id;
  }
  if (req.body.league_member_first_name != null) {
    res.leagueMember.league_member_first_name = req.body.league_member_first_name;
  }
  if (req.body.league_member_last_name != null) {
    res.leagueMember.league_member_last_name = req.body.league_member_last_name;
  }
  if (req.body.league_member_nickname != null) {
    res.leagueMember.league_member_nickname = req.body.league_member_nickname;
  }
  if (req.body.games_won_in_league != null) {
    res.leagueMember.games_won_in_league = req.body.games_won_in_league;
  }
  if (req.body.games_lost_in_league != null) {
    res.leagueMember.games_lost_in_league = req.body.games_lost_in_league;
  }
  if (req.body.games_tied_in_league != null) {
    res.leagueMember.games_tied_in_league = req.body.games_tied_in_league;
  }
  try {
    const updatedLeagueMember = await res.leagueMember.save();
    res.json(updatedLeagueMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one league member by league_member_id
/**
 * @swagger
 * /leagueMembers/{league_member_id}:
 *   delete:
 *     summary: Delete a single league member by league_member_id
 *     tags: 
 *       - League Members
 *     parameters:
 *       - in: path
 *         name: league_member_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the league member to delete
 *     responses:
 *       200:
 *         description: League member deleted
 *       404:
 *         description: League member not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:league_member_id', getLeagueMember, async (req, res) => {
  try {
    await res.leagueMember.remove();
    res.json({ message: 'League member deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Bulk delete league members by league_member_id
/**
 * @swagger
 * /leagueMembers:
 *   delete:
 *     summary: Delete multiple league members by their league_member_id
 *     tags:
 *       - LeagueMembers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               league_member_ids:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */
router.delete('/', async (req, res) => {
    const { league_member_ids } = req.body;
    try {
        const result = await LeagueMember.deleteMany({ league_member_id: { $in: league_member_ids } });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Middleware function to get a single league member by league_member_id
async function getLeagueMember(req, res, next) {
    let leagueMember;
    try {
      leagueMember = await LeagueMember.findOne({ league_member_id: req.params.league_member_id });
      if (leagueMember == null) {
        return res.status(404).json({ message: 'Cannot find league member' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.leagueMember = leagueMember;
    next();
}

module.exports = router;  