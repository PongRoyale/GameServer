const Pool = require('pg').Pool

const pool = new Pool({
  host: 'gameserver_db_1',
  port: 5433,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB
})

module.exports = {
    pool
}