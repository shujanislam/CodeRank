
const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));

const api = require('./routes/api');

app.use('/', api);

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
  console.log('Running on port : 8080')
})
