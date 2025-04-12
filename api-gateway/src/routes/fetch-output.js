const express = require('express');

const router = express.Router();

const { getLatestOutput } = require('../controllers/fetchOutput');

router.get('/v1/fetch-output', async(req, res) => {
  const output = getLatestOutput();

  res.status(200).json({ result: output });
})

module.exports = router;
