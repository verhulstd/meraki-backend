require('dotenv').config()

var knex = require('knex')(require('../knexfile')[process.env.NODE_ENV]);

module.exports = knex