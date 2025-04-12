
const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

const api = require('./routes/api');

const fetchOutputRoute = require('./routes/fetch-output');

const { fetchOutput } = require('./controllers/fetchOutput');

app.use('/', api);

app.use('/', fetchOutputRoute);

fetchOutput();

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
  console.log(`Running on port : ${PORT}`)
})
