const express = require('express');
const router = express.Router();
const Game = require('../models/game');

// GET all games
/**
 * @swagger
 * /games:
 *   get:
 *     summary: Get all games
 *     responses:
 *       200:
 *         description: Returns an array of all games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/', async (req, res) => {
    try {
      const games = await Game.find();
      res.json(games);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });  

// GET a single game by gameId
/**
 * @swagger
 * /games/{gameId}:
 *   get:
 *     summary: Get a single game by gameId
 *     parameters:
 *       - in: path
 *         name: gameId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the game to get
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       404:
 *         description: Game not found
 *       500:
 *         description: Internal server error
 */
router.get('/:gameId', getGame, (req, res) => {
  res.json(res.game);
});

// CREATE a new game
/**
 * @swagger
 * /games:
 *   post:
 *     summary: Create a new game
 *     description: Create a new game with the provided properties
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gameId:
 *                 type: number
 *                 description: The ID of the game
 *                 example: 123
 *               player1Id:
 *                 type: number
 *                 description: The ID of the first player
 *                 example: 1
 *               player2Id:
 *                 type: number
 *                 description: The ID of the second player
 *                 example: 2
 *               leagueGame:
 *                 type: boolean
 *                 description: Indicates if the game is a league game or not
 *                 example: true
 *               gameType:
 *                 type: string
 *                 description: The type of the game (e.g. singles, doubles)
 *                 example: singles
 *               ruleType:
 *                 type: string
 *                 description: The type of the game rules (e.g. WATL, IATF)
 *                 example: WATL
 *               rounds:
 *                 type: number
 *                 description: The number of rounds in the game
 *                 example: 10
 *               winningScore:
 *                 type: number
 *                 description: The winning score for the game
 *                 example: 21
 *               player1Score:
 *                 type: number
 *                 description: The score of the first player
 *                 example: 21
 *               player2Score:
 *                 type: number
 *                 description: The score of the second player
 *                 example: 19
 *               player1Sticks:
 *                 type: number
 *                 description: The number of sticks for the first player
 *                 example: 3
 *               player2Sticks:
 *                 type: number
 *                 description: The number of sticks for the second player
 *                 example: 2
 *               player1Drops:
 *                 type: number
 *                 description: The number of drops for the first player
 *                 example: 0
 *               player2Drops:
 *                 type: number
 *                 description: The number of drops for the second player
 *                 example: 1
 *               seasonName:
 *                 type: string
 *                 description: The name of the season
 *                 example: Fall 2022
 *               seasonId:
 *                 type: number
 *                 description: The ID of the season
 *                 example: 456
 *     responses:
 *       201:
 *         description: The newly created game
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       400:
 *         description: Bad request. Some required fields may be missing or invalid.
 *       500:
 *         description: Internal server error. Something went wrong on the server.
 */
router.post('/', async (req, res) => {
  const game = new Game({
    gameId: req.body.gameId,
    player1Id: req.body.player1Id,
    player2Id: req.body.player2Id,
    leagueGame: req.body.leagueGame,
    gameType: req.body.gameType,
    ruleType: req.body.ruleType,
    rounds: req.body.rounds,
    winningScore: req.body.winningScore,
    player1Score: req.body.player1Score,
    player2Score: req.body.player2Score,
    player1Sticks: req.body.player1Sticks,
    player2Sticks: req.body.player2Sticks,
    player1Drops: req.body.player1Drops,
    player2Drops: req.body.player2Drops,
    seasonName: req.body.seasonName,
    seasonId: req.body.seasonId
  });

  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a game by gameId
/**
 * @swagger
 * /games/{gameId}:
 *   patch:
 *     summary: Update a game by gameId
 *     description: Update a specific game using its gameId.
 *     tags:
 *       - Games
 *     parameters:
 *       - name: gameId
 *         in: path
 *         description: The ID of the game to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: The fields to update for the game
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gameId:
 *                 type: integer
 *               player1Id:
 *                 type: integer
 *               player2Id:
 *                 type: integer
 *               leagueGame:
 *                 type: boolean
 *                 description: Indicates if the game is part of a league
 *               gameType:
 *                 type: string
 *                 description: The type of game played
 *               ruleType:
 *                 type: string
 *                 description: The rule set used for the game
 *               rounds:
 *                 type: integer
 *                 description: The number of rounds in the game
 *               winningScore:
 *                 type: integer
 *                 description: The score needed to win the game
 *               player1Score:
 *                 type: integer
 *                 description: The score of player 1
 *               player2Score:
 *                 type: integer
 *                 description: The score of player 2
 *               player1Sticks:
 *                 type: integer
 *                 description: The number of sticks thrown by player 1
 *               player2Sticks:
 *                 type: integer
 *                 description: The number of sticks thrown by player 2
 *               player1Drops:
 *                 type: integer
 *                 description: The number of drops by player 1
 *               player2Drops:
 *                 type: integer
 *                 description: The number of drops by player 2
 *               seasonName:
 *                 type: string
 *                 description: The name of the season the game was played in
 *               seasonId:
 *                 type: integer
 *                 description: The ID of the season the game was played in
 *     responses:
 *       '200':
 *         description: A successful response, returns the updated game object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       '400':
 *         description: Bad request, invalid fields provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Description of the error
 *       '404':
 *         description: Game not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Description of the error
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description of the error
 */
router.patch('/:gameId', getGame, async (req, res) => {
  if (req.body.gameId != null) {
    res.game.gameId = req.body.gameId;
  }
  if (req.body.player1Id != null) {
    res.game.player1Id = req.body.player1Id;
  }
  if (req.body.player2Id != null) {
    res.game.player2Id = req.body.player2Id;
  }
  if (req.body.leagueGame != null) {
    res.game.leagueGame = req.body.leagueGame;
  }
  if (req.body.gameType != null) {
    res.game.gameType = req.body.gameType;
  }
  if (req.body.ruleType != null) {
    res.game.ruleType = req.body.ruleType;
  }
  if (req.body.rounds != null) {
    res.game.rounds = req.body.rounds;
  }
  if (req.body.winningScore != null) {
    res.game.winningScore = req.body.winningScore;
  }
  if (req.body.player1Score != null) {
    res.game.player1Score = req.body.player1Score;
  }
  if (req.body.player2Score != null) {
    res.game.player2Score = req.body.player2Score;
  }
  if (req.body.player1Sticks != null) {
    res.game.player1Sticks = req.body.player1Sticks;
  }
  if (req.body.player2Sticks != null) {
    res.game.player2Sticks = req.body.player2Sticks;
  }
  if (req.body.player1Drops != null) {
    res.game.player1Drops = req.body.player1Drops;
  }
  if (req.body.player2Drops != null) {
    res.game.player2Drops = req.body.player2Drops;
  }
  if (req.body.seasonName != null) {
    res.game.seasonName = req.body.seasonName;
  }
  if (req.body.seasonId != null) {
    res.game.seasonId = req.body.seasonId;
  }
  res.game.dateUpdated = Date.now();
  try {
    const updatedGame = await res.game.save();
    res.json(updatedGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one game
/**
 * @swagger
 * /games/{id}:
 *   delete:
 *     summary: Delete a single game by gameId
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the game to delete
 *     responses:
 *       200:
 *         description: The deleted game
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message confirming the game has been deleted
 *       404:
 *         description: The game with the specified ID was not found
 */
router.delete('/:id', getGame, async (req, res) => {
  try {
    await res.game.remove();
    res.json({ message: 'Game deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Bulk Delete
/**
 * @swagger
 * /games/{ids}:
 *   delete:
 *     summary: Delete multiple games by gameIds
 *     tags:
 *       - Games
 *     parameters:
 *       - in: path
 *         name: ids
 *         required: true
 *         description: Comma-separated list of gameIds to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Number of games deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 n:
 *                   type: number
 *                   description: Number of games deleted
 *                 ok:
 *                   type: number
 *                   description: Indicates if the operation was successful (1) or not (0)
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.delete('/games/:ids', async (req, res) => {
    const { gameIds } = req.body;
    try {
      const result = await Game.deleteMany({ gameId: { $in: gameIds } });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });  

async function getGame(req, res, next) {
  try {
    game = await Game.findById(req.params.id);
    if (game == null) {
      return res.status(404).json({ message: 'Cannot find game' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.game = game;
  next();
}

module.exports = router;