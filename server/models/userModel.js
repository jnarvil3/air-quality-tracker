const { Pool } = require('pg');

// This is the current postgreSQL instance schema: 
// 1. userID (int)
// 2. username (varchar)
// 3. password (varchar)
// 4. city (varchar)
// 5. threshold (varchar)

// URI to my specific postgreSQL instance
const PG_URI = 'postgres://lyyraypv:ZeQGMA7M_x2MrZy0iGludmb4Bnl8_gQK@jelani.db.elephantsql.com/lyyraypv';

// Connects our database instance to Node.js
const pool = new Pool({
  connectionString: PG_URI
});

// Exports the database so it can be referenced in other server files
module.exports = {
  // Defines the database query function 
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};