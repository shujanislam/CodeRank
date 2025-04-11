const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

const fetchProblems = async (req, res) => {
  try {
    const problems = await pool.query('SELECT * FROM problems');

    if (problems.rows.length > 0) {
      res.status(200).json(problems.rows);
    } else {
      res.status(404).json({ message: 'No problems found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { fetchProblems };
