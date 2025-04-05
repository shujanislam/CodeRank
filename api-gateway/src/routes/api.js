
const express  = require('express');

const router = express.Router();

const { apiController } = require('../controllers/apiController');

router.get('/v1/api', (req, res)=>{
  console.log('working');
})

router.post('/v1/api', (req, res)=>{
  const { language, problem, code } = req.body;

  apiController(language, problem, code);
})

module.exports = router;
