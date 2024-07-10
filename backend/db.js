"use strict";
/** Database setup for jobly. */
const { Client } = require("pg");
const { DB_USERNAME, DB_PASSWORD, DATABASE_URL, PORT } = require("./config");

// Ensure port is for PostgreSQL connection, not the application server port
const dbPort = 5432;

let db = new Client({
  user: DB_USERNAME,
  host: 'localhost',
  password: DB_PASSWORD,
  database: DATABASE_URL,
  port: dbPort
});

db.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = db;
