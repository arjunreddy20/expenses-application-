const express = require('express');
const router = express.Router();
const LeaderboardController = require('../controllers/leaderboardController');
const authenticate = require('../middleware/leaderAuthenticate');

router.get('/leaderboard', authenticate, LeaderboardController.getLeaderboard);

module.exports = router;