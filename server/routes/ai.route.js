const express = require('express');
const router = express.Router();
const { getSuggestions } = require('../controller');

router.post('/suggestions', getSuggestions);

module.exports = router;
