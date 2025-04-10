const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PORT,
});

const fetchProbAndTestCases = async (problem) => {
  try{
    let result = await pool.query(`SELECT * FROM problems WHERE title = $1`, [problem]);

    return result.rows[0];
  }
  catch(err){
    console.log(err.message);
  }
}

module.exports = { fetchProbAndTestCases };
