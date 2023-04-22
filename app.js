const express = require('express');
const mongoose = require('mongoose');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const userRoutes = require('./routes/userRoutes');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
        },
        Team: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'The unique identifier for the team'
            },
            teamName: {
              type: 'string',
              description: 'The name of the team'
            },
            members: {
              type: 'array',
              description: 'The members of the team',
              items: {
                $ref: '#/components/schemas/User'
              }
            },
            leagueId: {
              type: 'string',
              description: 'The league ID the team belongs to'
            },
            dateCreated: {
              type: 'string',
              format: 'date-time',
              description: 'The date the team was created'
            },
            dateUpdated: {
              type: 'string',
              format: 'date-time',
              description: 'The date the team was last updated'
            },
            gamesPlayed: {
              type: 'integer',
              description: 'The number of games played by the team'
            },
            winLossRecord: {
              type: 'object',
              description: 'The win-loss record of the team',
              properties: {
                wins: {
                  type: 'integer',
                  description: 'The number of wins'
                },
                losses: {
                  type: 'integer',
                  description: 'The number of losses'
                }
              }
            },
            captain: {
              type: 'string',
              description: 'The ID of the team captain'
            },
            teamLogo: {
              type: 'string',
              format: 'binary',
              description: 'The binary representation of the team logo'
            }
          }
        },
        Season: {
          type: 'object',
          properties: {
            seasonId: {
              type: 'number',
              description: 'The unique identifier for the season'
            },
            seasonName: {
              type: 'string',
              description: 'The name of the season'
            },
            startDate: {
              type: 'string',
              format: 'date',
              description: 'The start date of the season'
            },
            endDate: {
              type: 'string',
              format: 'date',
              description: 'The end date of the season'
            },
            games: {
              type: 'array',
              description: 'The games played during the season',
              items: {
                type: 'object',
                properties: {
                  gameId: {
                    type: 'number',
                    description: 'The ID of the game'
                  },
                  gameName: {
                    type: 'string',
                    description: 'The name of the game'
                  }
                }
              }
            },
            dateCreated: {
              type: 'string',
              format: 'date-time',
              description: 'The date the season was created'
            },
            dateUpdated: {
              type: 'string',
              format: 'date-time',
              description: 'The date the season was last updated'
            }
          }
        }
      },
    },
  },
  apis: ['./routes/userRoutes.js',
  './routes/gameRoutes.js',
  './routes/leagueRoutes.js',
  './routes/leagueMemberRoutes.js',
  './routes/teamRoutes.js',
  './routes/season.js'
]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve Swagger JSON file
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Set up API routes
app.use('/users', userRoutes);

// Start the server
const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});