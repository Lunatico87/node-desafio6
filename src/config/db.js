const { Pool } = require("pg");

const config = {
  host: "localhost",
  user: "postgres",
  password: "123456",
  database: "softjobs",
  port: 5432,
  allowExitOnIdle: true,
}

const pool = new Pool(config);

module.exports = pool;

