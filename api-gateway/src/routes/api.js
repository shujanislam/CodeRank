
const express  = require('express');

const router = express.Router();

const { apiController } = require('../controllers/apiController');

const { fetchProblems } = require('../controllers/fetchProblems');

router.get('/v1/api', (req, res)=>{
  console.log('working');
})

router.post('/v1/api', (req, res)=>{
  const { language, problem, code } = req.body;

  apiController(language, problem, code);
})

router.get('/v1/api/problems', fetchProblems)

module.exports = router;
