const express = require('express');
const router = express.Router();
const { processText } = require('./textProcessing');

router.post('/convert', processText);

module.exports = router;
