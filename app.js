const express = require('express');
const mongoose = require('mongoose');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const userRoutes = require('./routes/userRoutes');
const app = express();
require('dotenv').config();

// Set up MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Set up Swagger documentation
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Clutch API',
      version: '1.0.0',
      description: 'API for axe throwing',
    },
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            player_id: { type: 'integer' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            user_type: { type: 'string', enum: ['player', 'admin', 'league_captain'] },
            total_wins: { type: 'integer' },
            total_losses: { type: 'integer' },
            win_percent: { type: 'integer' },
            killshots: { type: 'integer' },
            killshot_percent: { type: 'integer' },
            average_score: { type: 'integer' },
            date_created: { type: 'string', format: 'date-time' },
            date_updated: { type: 'string', format: 'date-time' },
            number_of_games_played: { type: 'integer' },
            perfect_games: { type: 'integer' },
            perfect_matches: { type: 'integer' },
            phone_number: { type: 'integer' },
            email: { type: 'string', format: 'email' },
            high_score: { type: 'integer' },
            seasons_played: { type: 'integer' },
            league_member_id: { type: 'integer' },
            nickname: { type: 'string' },
            profile_picture: { type: 'string' },
            throws_made: { type: 'integer' },
            bullseyes: { type: 'integer' },
            unicorns: { type: 'integer' },
            total_ties: { type: 'integer' },
            odd_ball_throws: { type: 'integer' },
            drops: { type: 'integer' }
          },
        },
        Game: {
          type: 'object',
          properties: {
            game_id: { type: 'integer' },
            player_1_id: { type: 'integer' },
            player_2_id: { type: 'integer' },
            league_game: { type: 'boolean' },
            game_type: { type: 'string' },
            rule_type: { type: 'string' },
            rounds: { type: 'integer' },
            winning_score: { type: 'integer' },
            player_1_score: { type: 'integer' },
            player_2_score: { type: 'integer' },
            player_1_sticks: { type: 'integer' },
            player_2_sticks: { type: 'integer' },
            player_1_drops: { type: 'integer' },
            player_2_drops: { type: 'integer' },
            season_name: { type: 'string' },
            season_id: { type: 'integer' },
            date_created: { type: 'string', format: 'date-time' },
            date_updated: { type: 'string', format: 'date-time' }
          },
        },
        LeagueMember: {
          type: 'object',
          properties: {
            league_member_id: { type: 'integer' },
            league_id: { type: 'integer' },
            league_member_first_name: { type: 'string' },
            league_member_last_name: { type: 'string' },
            league_member_nickname: { type: 'string' },
            games_won_in_league: { type: 'integer' },
            games_lost_in_league: { type: 'integer' },
            games_tied_in_league: { type: 'integer' },
            date_joined: { type: 'string', format: 'date-time' },
          }
        },
        League: {
          type: 'object',
          properties: {
            league_id: {type: 'integer'},
            league_name: {type: 'string' },
            league_type: {type: 'string', enum: ['STANDARD', 'DUO', 'OTHER'] },
            rule_type: {type: 'string', enum: ['WATL', 'IATF', 'OTHER'] },
            game_type: {type: 'string'},
            number_of_matches: {type: 'integer'},
            killshot_average: {type: 'integer'},
            throw_average: {type: 'integer'},
            score_average: {type: 'integer'}
          }
        }
      },
    },
  },
  apis: ['./routes/userRoutes.js',
  './routes/gameRoutes.js',
  './routes/leagueRoutes.js',
  './routes/leagueMemberRoutes.js']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Set up API routes
app.use('/users', userRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});