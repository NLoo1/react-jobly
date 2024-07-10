"use strict";
/** Database setup for jobly. */
const { Client } = require("pg");
const { DB_USERNAME, DB_PASSWORD, DB_URI, PORT } = require("./config");

let db;
db = new Client({

  user: DB_USERNAME,
  host: 'localhost',
  password: DB_PASSWORD,
  database: DB_URI,
  port: PORT
});


db.connect()
.then(() => console.log('Connected to the database'))
.catch(err => console.error('Connection error', err.stack));

module.exports = db;